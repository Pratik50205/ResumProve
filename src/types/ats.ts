export interface ScoreBreakdown {
  requiredSkills: { score: number; max: number; matched: string[]; missing: string[] };
  keywordCoverage: { score: number; max: number; matched: string[]; missing: string[] };
  semanticSimilarity: { score: number; max: number; details: string };
  experienceRelevance: { score: number; max: number; details: string };
  educationMatch: { score: number; max: number; details: string };
  resumeStructure: { score: number; max: number; details: string };
}

export type MatchCategory = "Strong Match" | "Moderate Match" | "Low Match" | "Needs Optimization";

export interface ATSResult {
  overallScore: number; // 0 - 100
  category: MatchCategory;
  breakdown: ScoreBreakdown;
  matchedSkills: string[];
  missingRequiredSkills: string[];
  missingPreferredSkills: string[];
  semanticKeywordsFound: string[];
  recommendations: {
    id: string;
    type: "critical" | "important" | "suggestion";
    title: string;
    description: string;
    why: string; // Explainable AI rationale
    suggestedAction?: string;
  }[];
  analyzedAt: string;
}

export interface ResumeQualityScore {
  overallScore: number; // 0 - 100
  breakdown: {
    sectionCompleteness: number; // 0 - 100
    bulletQuality: number; // 0 - 100
    actionVerbStrength: number; // 0 - 100
    contentDensity: number; // 0 - 100
    formattingReadability: number; // 0 - 100
  };
  checks: {
    passed: string[];
    warnings: string[];
    improvements: string[];
  };
}
