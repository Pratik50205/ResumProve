/**
 * Unified Resume Parser Orchestrator
 */

import { Resume, ResumeParseResult } from "@/types/resume";
import { extractRawTextFromFile } from "./extractText";
import { detectSections } from "./sectionDetector";
import {
  extractPersonalDetails,
  extractSummary,
  extractExperience,
  extractProjects,
  extractSkillsFromDocument,
  extractEducation,
  extractCertifications,
} from "./entityExtractor";
import { calculateExtractionConfidence } from "./confidenceScorer";

export async function parseResumeDocument(
  buffer: ArrayBuffer | Buffer,
  format: "pdf" | "docx" | "txt",
  fileName?: string
): Promise<ResumeParseResult> {
  // 1. Text Extraction
  const rawText = await extractRawTextFromFile(buffer, format);

  if (!rawText || rawText.trim().length < 50) {
    throw new Error(
      "The uploaded document contains insufficient text or could not be parsed. Please ensure it is not password-protected or scanned as pure image bitmaps."
    );
  }

  // 2. Section Detection
  const sections = detectSections(rawText);
  const detectedSectionNames = sections.map((s) => s.type);

  // Find individual section blocks
  const headerSection = sections.find((s) => s.type === "header");
  const summarySection = sections.find((s) => s.type === "summary");
  const experienceSection = sections.find((s) => s.type === "experience");
  const projectsSection = sections.find((s) => s.type === "projects");
  const skillsSection = sections.find((s) => s.type === "skills");
  const educationSection = sections.find((s) => s.type === "education");
  const certificationsSection = sections.find((s) => s.type === "certifications");

  // 3. Entity Extraction
  const personal = extractPersonalDetails(headerSection ? headerSection.lines : [], rawText);
  const summary = summarySection ? extractSummary(summarySection.lines) : "";
  const experience = experienceSection ? extractExperience(experienceSection.lines) : [];
  const projects = projectsSection ? extractProjects(projectsSection.lines) : [];
  const skills = extractSkillsFromDocument(skillsSection ? skillsSection.lines : [], rawText);
  const education = educationSection ? extractEducation(educationSection.lines) : [];
  const certifications = certificationsSection ? extractCertifications(certificationsSection.lines) : [];

  const resume: Resume = {
    title: personal.fullName ? `${personal.fullName}'s Resume` : "Imported Resume",
    personal,
    summary,
    experience,
    projects,
    education,
    skills,
    certifications,
    settings: {
      template: "tech-specialist",
      primaryColor: "#4f46e5",
      fontFamily: "Inter",
      fontSize: "base",
      lineSpacing: "normal",
      sectionOrder: ["summary", "skills", "experience", "projects", "education", "certifications"],
      showIcons: true,
    },
    updatedAt: new Date().toISOString(),
  };

  // 4. Confidence Evaluation
  const confidence = calculateExtractionConfidence(resume);

  return {
    resume,
    confidence,
    rawText,
    detectedSections: detectedSectionNames,
    sourceFormat: format,
    fileName,
  };
}

