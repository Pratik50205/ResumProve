import {
  AIProvider,
  BulletImprovementRequest,
  BulletImprovementResponse,
  ImprovementAction,
  AIAnalysis,
} from "@/types/ai";
import { Resume } from "@/types/resume";
import { JobDescription } from "@/types/job";
import { auditFactLock } from "./factLockGuardrails";
import { ALL_ACTION_VERBS } from "@/data/actionVerbs";

export class MockAIProvider implements AIProvider {
  async improveBullet(req: BulletImprovementRequest): Promise<BulletImprovementResponse> {
    const original = req.originalBullet.trim();
    if (!original) {
      return {
        improvedBullet: "Architected high-throughput services with zero-downtime deployment pipelines.",
        actionUsed: req.action,
        changesSummary: "Generated baseline high-impact technical achievement.",
        factLockPreserved: true,
      };
    }

    let improved = original;

    // 1. Clean passive prefixes
    const passivePrefixes = [
      /^responsible for\s+/i,
      /^worked on\s+/i,
      /^helped to\s+/i,
      /^helped with\s+/i,
      /^assisted in\s+/i,
      /^assisted with\s+/i,
      /^participated in\s+/i,
      /^was involved in\s+/i,
      /^tasks included\s+/i,
    ];

    for (const prefix of passivePrefixes) {
      if (prefix.test(improved)) {
        improved = improved.replace(prefix, "");
        break;
      }
    }

    // Ensure first character is capitalized
    improved = improved.charAt(0).toUpperCase() + improved.slice(1);

    // 2. Apply Action Verb Enhancement
    const firstWord = improved.split(/\s+/)[0]?.toLowerCase();
    const isAlreadyActionVerb = ALL_ACTION_VERBS.some(
      (v) => v.toLowerCase() === firstWord
    );

    if (!isAlreadyActionVerb) {
      if (/develop|build|creat|cod/i.test(improved)) {
        improved = "Engineered " + improved.replace(/^[a-zA-Z]+\s+/, "");
      } else if (/lead|manag|supervis|head/i.test(improved)) {
        improved = "Spearheaded " + improved.replace(/^[a-zA-Z]+\s+/, "");
      } else if (/optimi|fast|speed|reduc/i.test(improved)) {
        improved = "Optimized " + improved.replace(/^[a-zA-Z]+\s+/, "");
      } else if (/design|architect/i.test(improved)) {
        improved = "Architected " + improved.replace(/^[a-zA-Z]+\s+/, "");
      } else {
        improved = "Delivered " + improved.replace(/^[a-zA-Z]+\s+/, "");
      }
    }

    // 3. Tailor according to action
    let changesSummary = "Strengthened active verb and structure.";

    switch (req.action) {
      case "impact":
        if (!improved.includes(" resulting in ") && !improved.includes(" achieving ")) {
          improved += ", accelerating production delivery and operational reliability.";
          changesSummary = "Applied Google X-Y-Z outcome framing.";
        }
        break;

      case "concise":
        // Eliminate filler adverbs
        improved = improved
          .replace(/\b(in order to|as well as|successfully|effectively|various|different)\b/gi, "")
          .replace(/\s{2,}/g, " ")
          .trim();
        changesSummary = "Trimmed filler phrases for razor-sharp ATS scanning.";
        break;

      case "technical":
        if (req.context?.skillsUsed && req.context.skillsUsed.length > 0) {
          const sampleSkills = req.context.skillsUsed.slice(0, 3).join(", ");
          improved += ` utilizing ${sampleSkills}.`;
          changesSummary = `Explicitly highlighted technical competencies (${sampleSkills}).`;
        } else {
          improved = improved.replace(/system|app/i, "distributed architecture");
          changesSummary = "Elevated architectural precision and engineering tone.";
        }
        break;

      case "quantify-prompt":
        if (!/\d+%|\$\d+/.test(improved)) {
          improved += ", boosting throughput by [X%] and cutting latency by [Y ms].";
          changesSummary = "Inserted Fact-Lock™ guided quantification placeholders for your actual verified metrics.";
        }
        break;

      case "grammar":
        improved = improved.replace(/\s+/g, " ").trim();
        if (!improved.endsWith(".")) improved += ".";
        changesSummary = "Enforced consistent punctuation and casing.";
        break;
    }

    // Run Fact-Lock audit
    const audit = auditFactLock(original, improved);

    return {
      improvedBullet: improved,
      actionUsed: req.action,
      changesSummary,
      suggestedQuantification: req.action === "quantify-prompt" ? "[X%] / [Y ms]" : undefined,
      factLockPreserved: audit.isSafe,
    };
  }

  async improveSummary(
    currentSummary: string,
    resume: Resume,
    tone: "technical" | "executive" | "fresher" | "tailored" = "technical",
    targetRole?: string
  ): Promise<string> {
    const name = resume.personal.fullName || "Candidate";
    const title = targetRole || resume.personal.title || "Software Engineer";
    const topSkills = [
      ...(resume.skills.programming || []),
      ...(resume.skills.aiMl || []),
      ...(resume.skills.cloud || []),
      ...(resume.skills.frontend || []),
    ].slice(0, 5).join(", ");

    if (tone === "executive") {
      return `Strategic ${title} with proven track record directing technical architecture, cross-functional engineering teams, and scalable product delivery. Expert in ${topSkills || "cloud infrastructure"} with emphasis on high-availability systems and data integrity.`;
    }

    if (tone === "fresher") {
      return `Motivated ${title} with rigorous foundational expertise in computer science, software engineering principles, and hands-on project delivery. Proficient in ${topSkills || "full-stack development"}, eager to drive immediate contributions to engineering initiatives.`;
    }

    // Technical / Standard
    return `Results-driven ${title} specializing in building scalable distributed systems and resilient software architectures. Deep expertise across ${topSkills || "modern software engineering stacks"} with commitment to Fact-Lock™ code quality and performance optimization.`;
  }

  async extractResume(rawText: string): Promise<Resume> {
    throw new Error("extractResume should use rule-based parseResumeDocument or Gemini AI.");
  }

  async analyzeResume(resume: Resume, job: JobDescription): Promise<AIAnalysis> {
    return {
      ats: {
        overallScore: 85,
        category: "Strong Match",
        breakdown: {
          requiredSkills: { score: 26, max: 30, matched: ["TypeScript", "React"], missing: ["Kubernetes"] },
          keywordCoverage: { score: 17, max: 20, matched: ["API", "CI/CD"], missing: ["Terraform"] },
          semanticSimilarity: { score: 18, max: 20, details: "Strong alignment with engineering requirements" },
          experienceRelevance: { score: 9, max: 10, details: "Senior engineering background matches level" },
          educationMatch: { score: 8, max: 10, details: "BS Computer Science satisfies degree criteria" },
          resumeStructure: { score: 9, max: 10, details: "Optimal single-column ATS structure" },
        },
        matchedSkills: ["React", "TypeScript", "Node.js"],
        missingRequiredSkills: ["Kubernetes"],
        missingPreferredSkills: ["Terraform"],
        semanticKeywordsFound: ["Full-Stack", "Architecture", "Microservices"],
        recommendations: [],
        analyzedAt: new Date().toISOString(),
      },
      proof: {
        overallScore: 82,
        breakdown: {
          skillEvidence: { score: 22, max: 25, details: "Core skills supported in experience" },
          projectEvidence: { score: 21, max: 25, details: "Projects substantiate full-stack claims" },
          experienceEvidence: { score: 17, max: 20, details: "Verified employer roles and dates" },
          achievementEvidence: { score: 11, max: 15, details: "Good quantification" },
          consistency: { score: 13, max: 15, details: "High date and title consistency" },
        },
        claims: [],
        unsupportedClaims: [],
        verifiedClaimsCount: 12,
        totalClaimsCount: 14,
        analyzedAt: new Date().toISOString(),
      },
      tailoredSuggestions: [],
    };
  }
}
