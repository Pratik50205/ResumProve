import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  AIProvider,
  BulletImprovementRequest,
  BulletImprovementResponse,
  AIAnalysis,
} from "@/types/ai";
import { Resume } from "@/types/resume";
import { JobDescription } from "@/types/job";
import { buildFactLockSystemPrompt, auditFactLock } from "./factLockGuardrails";
import { MockAIProvider } from "./mockProvider";

export class GeminiAIProvider implements AIProvider {
  private genAI: GoogleGenerativeAI | null = null;
  private mockFallback: MockAIProvider;

  constructor() {
    this.mockFallback = new MockAIProvider();
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "your-gemini-api-key" && !apiKey.includes("your-")) {
      this.genAI = new GoogleGenerativeAI(apiKey);
    }
  }

  isAvailable(): boolean {
    return this.genAI !== null;
  }

  async improveBullet(req: BulletImprovementRequest): Promise<BulletImprovementResponse> {
    if (!this.genAI) {
      return this.mockFallback.improveBullet(req);
    }

    try {
      const model = this.genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
          temperature: 0.3, // Low temperature for factual consistency
          maxOutputTokens: 200,
        },
      });

      const systemPrompt = buildFactLockSystemPrompt(req.action);
      const userPrompt = `ORIGINAL BULLET POINT:
"${req.originalBullet}"

TARGET ACTION: ${req.action.toUpperCase()}
CONTEXT:
Role: ${req.context?.role || "Not specified"}
Company: ${req.context?.company || "Not specified"}
Skills Used: ${req.context?.skillsUsed?.join(", ") || "None specified"}

Produce ONE single improved bullet point adhering strictly to Fact-Lock™ rules.`;

      const result = await model.generateContent({
        contents: [
          { role: "user", parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] },
        ],
      });

      const responseText = result.response.text().trim().replace(/^["']|["']$/g, "").replace(/^[•\-\*]\s*/, "");
      const audit = auditFactLock(req.originalBullet, responseText);

      return {
        improvedBullet: responseText,
        actionUsed: req.action,
        changesSummary: `Fact-Lock™ verified (${audit.safetyScore}% confidence).`,
        factLockPreserved: audit.isSafe,
      };
    } catch (err) {
      console.warn("Gemini API call failed, falling back to Mock AI Provider:", err);
      return this.mockFallback.improveBullet(req);
    }
  }

  async improveSummary(
    currentSummary: string,
    resume: Resume,
    tone: "technical" | "executive" | "fresher" | "tailored" = "technical",
    targetRole?: string
  ): Promise<string> {
    if (!this.genAI) {
      return this.mockFallback.improveSummary(currentSummary, resume, tone, targetRole);
    }

    try {
      const model = this.genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 300,
        },
      });

      const skillsList = [
        ...(resume.skills.programming || []),
        ...(resume.skills.aiMl || []),
        ...(resume.skills.cloud || []),
        ...(resume.skills.frontend || []),
      ].slice(0, 8).join(", ");

      const prompt = `You are ResumProve's Executive Career Architect.
Write a punchy, 3 to 4 sentence Professional Resume Summary for:
Candidate Name: ${resume.personal.fullName || "Candidate"}
Target Role: ${targetRole || resume.personal.title || "Software Engineer"}
Core Competencies: ${skillsList}
Target Tone: ${tone.toUpperCase()}
Existing Draft (if any): "${currentSummary}"

RULES:
- Maximum 60 words.
- Highlight core engineering philosophy, domain mastery, and commitment to verifiable results.
- Do not invent fictitious past employers.
- Return ONLY the summary paragraph without quotes or metadata.`;

      const result = await model.generateContent(prompt);
      return result.response.text().trim().replace(/^["']|["']$/g, "");
    } catch (err) {
      console.warn("Gemini summary failed, falling back to Mock:", err);
      return this.mockFallback.improveSummary(currentSummary, resume, tone, targetRole);
    }
  }

  async extractResume(rawText: string): Promise<Resume> {
    return this.mockFallback.extractResume(rawText);
  }

  async analyzeResume(resume: Resume, job: JobDescription): Promise<AIAnalysis> {
    return this.mockFallback.analyzeResume(resume, job);
  }
}

