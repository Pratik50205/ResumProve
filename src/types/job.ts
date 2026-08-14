export interface JobDescription {
  id?: string;
  userId?: string;
  title: string;
  company?: string;
  rawText: string;
  parsedData?: ParsedJob;
  createdAt?: string;
}

export interface SkillRequirement {
  name: string;
  normalizedName: string;
  category: string;
  isRequired: boolean;
  frequency: number;
}

export interface ParsedJob {
  role: string;
  seniority?: "Intern" | "Entry" | "Mid-Level" | "Senior" | "Lead" | "Principal";
  requiredSkills: SkillRequirement[];
  preferredSkills: SkillRequirement[];
  responsibilities: string[];
  technologies: string[];
  educationRequirement?: string;
  experienceYears?: number;
  domain?: string;
  behavioralKeywords: string[];
}
