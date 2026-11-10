export type SeniorityLevel =
  | "Intern"
  | "Entry"
  | "Mid-Level"
  | "Senior"
  | "Lead"
  | "Principal";

export type WorkplaceType = "Remote" | "Hybrid" | "On-site";

export interface SkillRequirement {
  name: string;
  normalizedName: string;
  category: string;
  isRequired: boolean;
  frequency: number;
  importance?: "critical" | "high" | "medium" | "low";
}

export interface ExperienceRequirement {
  min: number;
  max?: number;
  text: string;
}

export interface ParsedJob {
  role: string;
  company?: string;
  location?: string;
  workplaceType?: WorkplaceType;
  seniority?: SeniorityLevel;
  requiredSkills: SkillRequirement[];
  preferredSkills: SkillRequirement[];
  responsibilities: string[];
  technologies: string[];
  educationRequirement?: string;
  experienceYears?: number;
  experienceDetail?: ExperienceRequirement;
  domain?: string;
  behavioralKeywords: string[];
  rawSections?: {
    overview?: string;
    responsibilities?: string;
    requirements?: string;
    preferred?: string;
    benefits?: string;
  };
}

export interface JobDescription {
  id?: string;
  userId?: string;
  title: string;
  company?: string;
  location?: string;
  workplaceType?: WorkplaceType;
  rawText: string;
  parsedData?: ParsedJob;
  createdAt?: string;
}
