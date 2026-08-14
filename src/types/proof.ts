export interface ClaimEvidence {
  claim: string; // e.g. "Python" or "Machine Learning"
  type: "skill" | "technology" | "responsibility" | "achievement";
  evidenceStrength: "high" | "medium" | "low" | "none";
  foundIn: {
    skillsSection: boolean;
    projects: { projectName: string; bulletMatched: string }[];
    experience: { company: string; bulletMatched: string }[];
    certifications: string[];
  };
  feedback: string;
}

export interface ProofBreakdown {
  skillEvidence: { score: number; max: 25; details: string };
  projectEvidence: { score: number; max: 25; details: string };
  experienceEvidence: { score: number; max: 20; details: string };
  achievementEvidence: { score: number; max: 15; details: string };
  consistency: { score: number; max: 15; details: string };
}

export interface ProofResult {
  overallScore: number; // 0 - 100
  breakdown: ProofBreakdown;
  claims: ClaimEvidence[];
  unsupportedClaims: {
    claim: string;
    suggestion: string;
    why: string;
  }[];
  verifiedClaimsCount: number;
  totalClaimsCount: number;
  factLockViolationsFound?: string[];
  analyzedAt: string;
}

export interface PlatformScores {
  jobCompatibility: number; // 0 - 100
  resumeQuality: number; // 0 - 100
  proofScore: number; // 0 - 100
  strongestArea: string;
  needsImprovement: string;
}
