import { Resume } from "./resume";
import { JobDescription } from "./job";
import { ATSResult } from "./ats";
import { ProofResult } from "./proof";

export type ImprovementAction =
  | "impact"
  | "concise"
  | "grammar"
  | "action-verbs"
  | "technical"
  | "quantify-prompt";

export interface BulletImprovementRequest {
  originalBullet: string;
  action: ImprovementAction;
  context?: {
    role?: string;
    company?: string;
    skillsUsed?: string[];
    userQuantificationHint?: string;
  };
}

export interface BulletImprovementResponse {
  improvedBullet: string;
  actionUsed: ImprovementAction;
  changesSummary: string;
  suggestedQuantification?: string;
  factLockPreserved: boolean;
}

export interface AIAnalysis {
  ats: ATSResult;
  proof: ProofResult;
  tailoredSuggestions: {
    section: string;
    currentText: string;
    suggestedText: string;
    rationale: string;
    factLockChecked: boolean;
  }[];
}

export interface AIProvider {
  improveBullet(
    req: BulletImprovementRequest
  ): Promise<BulletImprovementResponse>;

  improveSummary(
    currentSummary: string,
    resume: Resume,
    tone?: "technical" | "executive" | "fresher" | "tailored",
    targetRole?: string
  ): Promise<string>;

  extractResume(
    rawText: string
  ): Promise<Resume>;

  analyzeResume(
    resume: Resume,
    job: JobDescription
  ): Promise<AIAnalysis>;
}
