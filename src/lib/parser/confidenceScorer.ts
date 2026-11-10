/**
 * Confidence Scoring Engine for extracted resume fields.
 */

import { Resume, ExtractedFieldConfidence } from "@/types/resume";

export interface ConfidenceAssessment {
  overall: number; // 0 - 100
  fields: Record<string, ExtractedFieldConfidence>;
}

export function calculateExtractionConfidence(resume: Resume): ConfidenceAssessment {
  const fields: Record<string, ExtractedFieldConfidence> = {};

  // 1. Full Name Confidence
  const name = resume.personal.fullName;
  const nameWords = name ? name.trim().split(/\s+/) : [];
  let nameConfidence = 0.5;
  if (nameWords.length >= 2 && nameWords.length <= 4 && name !== "Candidate Name" && name !== "Your Full Name") {
    nameConfidence = 0.98;
  } else if (nameWords.length > 0) {
    nameConfidence = 0.75;
  }
  fields.fullName = {
    field: "Full Name",
    value: name || "",
    confidence: nameConfidence,
    needsVerification: nameConfidence < 0.8,
  };

  // 2. Email Confidence
  const email = resume.personal.email;
  const hasEmail = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  fields.email = {
    field: "Email Address",
    value: email || "",
    confidence: hasEmail ? 0.99 : 0.0,
    needsVerification: !hasEmail,
  };

  // 3. Phone Confidence
  const phone = resume.personal.phone;
  const hasPhone = phone && phone.replace(/\D/g, "").length >= 7;
  fields.phone = {
    field: "Phone Number",
    value: phone || "",
    confidence: hasPhone ? 0.95 : 0.0,
    needsVerification: !hasPhone,
  };

  // 4. Summary Confidence
  const summary = resume.summary;
  const summaryLength = summary ? summary.trim().split(/\s+/).length : 0;
  let summaryConfidence = 0.0;
  if (summaryLength >= 25) summaryConfidence = 0.95;
  else if (summaryLength >= 10) summaryConfidence = 0.75;
  else if (summaryLength > 0) summaryConfidence = 0.5;

  fields.summary = {
    field: "Professional Summary",
    value: summary ? `${summaryLength} words extracted` : "None detected",
    confidence: summaryConfidence,
    needsVerification: summaryConfidence < 0.7,
  };

  // 5. Work Experience Confidence
  const expCount = resume.experience?.length || 0;
  let expConfidence = 0.0;
  if (expCount >= 2) {
    const hasBullets = resume.experience.every((e) => e.bullets && e.bullets.length > 0);
    expConfidence = hasBullets ? 0.96 : 0.8;
  } else if (expCount === 1) {
    expConfidence = 0.85;
  }
  fields.experience = {
    field: "Work Experience",
    value: `${expCount} role(s) detected`,
    confidence: expConfidence,
    needsVerification: expConfidence < 0.7,
  };

  // 6. Technical Skills Confidence
  const totalSkills = Object.values(resume.skills || {}).reduce((acc, cat) => {
    return acc + (Array.isArray(cat) ? cat.length : 0);
  }, 0);
  let skillsConfidence = 0.0;
  if (totalSkills >= 8) skillsConfidence = 0.98;
  else if (totalSkills >= 4) skillsConfidence = 0.85;
  else if (totalSkills > 0) skillsConfidence = 0.65;

  fields.skills = {
    field: "Skills & Proficiencies",
    value: `${totalSkills} categorized skills`,
    confidence: skillsConfidence,
    needsVerification: skillsConfidence < 0.7,
  };

  // 7. Education Confidence
  const eduCount = resume.education?.length || 0;
  let eduConfidence = 0.0;
  if (eduCount >= 1) {
    const hasDegree = resume.education.some((e) => e.degree && e.degree.length > 2);
    eduConfidence = hasDegree ? 0.95 : 0.75;
  }
  fields.education = {
    field: "Education",
    value: `${eduCount} institution(s) detected`,
    confidence: eduConfidence,
    needsVerification: eduConfidence < 0.7,
  };

  // Weighted overall calculation
  // Name 15%, Email 15%, Phone 10%, Experience 25%, Skills 20%, Education 15%
  const overallConfidence = Math.round(
    (nameConfidence * 0.15 +
      (hasEmail ? 0.99 : 0.4) * 0.15 +
      (hasPhone ? 0.95 : 0.5) * 0.1 +
      expConfidence * 0.25 +
      skillsConfidence * 0.2 +
      eduConfidence * 0.15) *
      100
  );

  return {
    overall: Math.min(Math.max(overallConfidence, 10), 99),
    fields,
  };
}

