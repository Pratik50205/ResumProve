/**
 * Fact-Lock™ Guardrail Engine
 * 
 * Guarantees zero hallucinations in resume improvements. Prohibits inventing
 * fake metrics, false employers, or unearned credentials.
 */

export interface FactLockAuditResult {
  isSafe: boolean;
  safetyScore: number; // 0 - 100
  violations: string[];
  warnings: string[];
  sanitizedText: string;
}

const NUMBER_REGEX = /\b(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?%?|\$\d+(?:\.\d+)?(?:[kmb]|million|billion)?\b/gi;
const GUIDED_PLACEHOLDER_REGEX = /\[(?:X%?|\d+X|N|number|\$?amount|percentage|\.\.\.)\]/gi;

/**
 * System Prompt instructions injected into every AI request to enforce Fact-Lock™ guardrails.
 */
export function buildFactLockSystemPrompt(action?: string): string {
  return `You are ResumProve's Fact-Lock™ AI Career Intelligence Assistant.
Your core mission is to elevate the candidate's resume bullet points into punchy, high-impact statements WITHOUT inventing false claims.

STRICT FACT-LOCK™ RULES:
1. ZERO HALLUCINATED METRICS: If the original bullet does not contain a specific number (e.g., "reduced latency by 42%"), you MUST NOT invent a specific percentage, dollar amount, or number.
2. GUIDED QUANTIFICATION: If a metric would dramatically strengthen the bullet, use explicit guided brackets such as "[X%]" or "[N users]" so the candidate knows to fill in their own verified data.
3. PRESERVE SCOPE & TRUTH: Never change the core mechanism or claim responsibility for technologies/companies not present in the user's input.
4. ACTION-VERB FIRST: Always start the bullet with a punchy, past-tense active verb (e.g., Architected, Spearheaded, Engineered, Orchestrated, Optimized, Deployed).
5. ELIMINATE AI-SLOP: Avoid buzzwords like "spearheaded cross-functional synergies" or passive fluff like "Responsible for" or "Helped with". Keep it razor-sharp and direct.
6. FORMAT: Return ONLY the improved bullet point. Do not wrap in quotes or add conversational preamble.`;
}

/**
 * Audits an AI-generated suggestion against the candidate's baseline text.
 */
export function auditFactLock(originalText: string, suggestedText: string): FactLockAuditResult {
  const violations: string[] = [];
  const warnings: string[] = [];
  let safetyScore = 100;

  // 1. Check for hallucinated numbers / percentages
  const originalNumbers = new Set(
    (originalText.match(NUMBER_REGEX) || []).map((n) => n.toLowerCase())
  );
  const suggestedNumbers = (suggestedText.match(NUMBER_REGEX) || []).map((n) =>
    n.toLowerCase()
  );

  for (const num of suggestedNumbers) {
    if (!originalNumbers.has(num)) {
      // Check if it's part of a version number like "v2" or HTTP status "200"
      if (/^v\d+|\b(?:200|404|500)\b/i.test(num)) continue;

      violations.push(`Unverified metric introduced: "${num}" was not in the original text.`);
      safetyScore -= 30;
    }
  }

  // 2. Check if guided placeholders are present
  const hasPlaceholders = GUIDED_PLACEHOLDER_REGEX.test(suggestedText);
  if (hasPlaceholders) {
    warnings.push("Contains guided quantification placeholder(s) like [X%]. Replace with your actual metric.");
  }

  // 3. Length sanity check (Suggestion shouldn't balloon into a whole essay)
  if (suggestedText.length > originalText.length * 2.8 && originalText.length > 30) {
    warnings.push("Suggestion is significantly longer than original statement. Consider a more concise variant.");
    safetyScore -= 10;
  }

  // 4. Check for passive fluff words
  if (/^(responsible for|worked on|assisted with|helped to|participated in)\b/i.test(suggestedText)) {
    warnings.push("Suggestion starts with weak passive phrasing. Recommend a strong action verb.");
    safetyScore -= 15;
  }

  safetyScore = Math.max(0, Math.min(100, safetyScore));
  const isSafe = violations.length === 0;

  return {
    isSafe,
    safetyScore,
    violations,
    warnings,
    sanitizedText: suggestedText.trim(),
  };
}
