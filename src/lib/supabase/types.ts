import { Resume } from "@/types/resume";

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  plan: "free" | "pro" | "enterprise";
  created_at: string;
  updated_at: string;
}

export interface ResumeRow {
  id: string;
  user_id: string;
  title: string;
  slug: string | null;
  template: string;
  resume_data: Resume;
  completeness_score: number;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}

export interface ResumeVersionRow {
  id: string;
  resume_id: string;
  user_id: string;
  version_number: number;
  snapshot: Resume;
  change_summary: string | null;
  created_at: string;
}

export interface JobDescriptionRow {
  id: string;
  user_id: string;
  title: string;
  company: string | null;
  location: string | null;
  raw_text: string;
  parsed_requirements: Record<string, any>;
  seniority_level: string | null;
  created_at: string;
  updated_at: string;
}

export interface CompatibilityAnalysisRow {
  id: string;
  user_id: string;
  resume_id: string;
  job_id: string | null;
  overall_score: number;
  breakdown: Record<string, any>;
  matched_skills: string[];
  missing_skills: string[];
  recommendations: any[];
  created_at: string;
}

export interface ProofAnalysisRow {
  id: string;
  user_id: string;
  resume_id: string;
  proof_score: number;
  evidence_breakdown: Record<string, any>;
  unbacked_claims: any[];
  verified_claims: any[];
  created_at: string;
}
