export interface PersonalDetails {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  bio?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string; // e.g. "2023-01" or "Jan 2023"
  endDate: string; // e.g. "Present" or "2024-05"
  isCurrent: boolean;
  bullets: string[];
  technologies?: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  bullets: string[];
  startDate?: string;
  endDate?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string[];
  location?: string;
}

export type SkillCategory =
  | "Programming"
  | "AI/ML"
  | "Data Science"
  | "Frontend"
  | "Backend"
  | "Databases"
  | "Cloud"
  | "DevOps"
  | "Tools"
  | "Soft Skills";

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  level?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  evidenceStrength?: "low" | "medium" | "high";
}

export interface SkillGroups {
  programming: string[];
  aiMl?: string[];
  dataScience?: string[];
  frontend?: string[];
  backend?: string[];
  databases?: string[];
  cloud?: string[];
  devops?: string[];
  tools?: string[];
  softSkills?: string[];
  custom?: { category: string; skills: string[] }[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export type TemplateId =
  | "ats-minimal"
  | "modern-professional"
  | "tech-specialist"
  | "student-fresher";

export interface ResumeSettings {
  template: TemplateId;
  primaryColor: string;
  fontFamily: "Inter" | "Roboto" | "Outfit" | "Merriweather" | "JetBrains Mono";
  fontSize: "sm" | "base" | "lg";
  lineSpacing: "compact" | "normal" | "relaxed";
  sectionOrder: string[];
  showIcons: boolean;
}

export interface Resume {
  id?: string;
  userId?: string;
  title: string;
  personal: PersonalDetails;
  summary: string;
  experience: Experience[];
  projects: Project[];
  education: Education[];
  skills: SkillGroups;
  certifications: Certification[];
  achievements?: string[];
  coursework?: string[];
  languages?: string[];
  interests?: string[];
  settings?: ResumeSettings;
  createdAt?: string;
  updatedAt?: string;
}

export interface ExtractedFieldConfidence {
  field: string;
  value: string;
  confidence: number; // 0.0 - 1.0 (e.g. 0.96 for 96%)
  needsVerification?: boolean;
}

export interface ResumeParseResult {
  resume: Resume;
  confidence: {
    overall: number; // 0 - 100
    fields: Record<string, ExtractedFieldConfidence>;
  };
  rawText: string;
  detectedSections: string[];
  sourceFormat: "pdf" | "docx" | "txt";
  fileName?: string;
}
