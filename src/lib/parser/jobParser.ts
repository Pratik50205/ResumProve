import {
  ParsedJob,
  SkillRequirement,
  SeniorityLevel,
  WorkplaceType,
  ExperienceRequirement,
} from "@/types/job";
import {
  SKILL_KNOWLEDGE_BASE,
  findSkillsInText,
  normalizeSkillName,
  getSkillDefinition,
} from "@/data/skills";

interface SectionBounds {
  overview: string[];
  responsibilities: string[];
  requirements: string[];
  preferred: string[];
  benefits: string[];
}

/**
 * Splits raw job description text into distinct functional sections.
 */
function segmentJobSections(rawText: string): SectionBounds {
  const lines = rawText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  const sections: SectionBounds = {
    overview: [],
    responsibilities: [],
    requirements: [],
    preferred: [],
    benefits: [],
  };

  let currentSection: keyof SectionBounds = "overview";

  const overviewRegex =
    /^(?:about (?:the )?(?:role|job|team|company|us)|role overview|job summary|position overview|overview|who we are)\b[:\s]*/i;
  const responsibilitiesRegex =
    /^(?:responsibilities|what you(?:'ll| will) do|key responsibilities|core responsibilities|duties|what you'll achieve|your role|responsibilities & duties)\b[:\s]*/i;
  const requirementsRegex =
    /^(?:requirements|required qualifications|minimum qualifications|what you (?:need|bring)|what we(?:'re| are) looking for|must[- ]haves?|basic qualifications|who you are|qualifications)\b[:\s]*/i;
  const preferredRegex =
    /^(?:preferred qualifications|nice to haves?|bonus points|preferred skills|desired qualifications|plus if you have|additional qualifications|preferred experience)\b[:\s]*/i;
  const benefitsRegex =
    /^(?:benefits|perks|compensation|what we offer|why join us|our benefits|perks & benefits)\b[:\s]*/i;

  for (const line of lines) {
    if (preferredRegex.test(line)) {
      currentSection = "preferred";
      continue;
    } else if (requirementsRegex.test(line)) {
      currentSection = "requirements";
      continue;
    } else if (responsibilitiesRegex.test(line)) {
      currentSection = "responsibilities";
      continue;
    } else if (benefitsRegex.test(line)) {
      currentSection = "benefits";
      continue;
    } else if (overviewRegex.test(line)) {
      currentSection = "overview";
      continue;
    }

    sections[currentSection].push(line);
  }

  return sections;
}

/**
 * Extracts the job title from explicit tags or first lines.
 */
function extractJobTitle(lines: string[], defaultTitle?: string): string {
  if (defaultTitle && defaultTitle.trim().length > 0) {
    return defaultTitle.trim();
  }

  for (const line of lines.slice(0, 8)) {
    const titleMatch = line.match(
      /^(?:job title|title|role|position):\s*(.+)$/i
    );
    if (titleMatch && titleMatch[1]) {
      return titleMatch[1].trim();
    }
  }

  // Common title keywords check in the first few lines
  const titleKeywords =
    /(?:software engineer|frontend|backend|full[- ]?stack|machine learning|ai engineer|devops|data engineer|product manager|system architect|cloud architect|site reliability engineer|sre|mobile developer|ios|android|qa engineer)/i;

  for (const line of lines.slice(0, 5)) {
    if (titleKeywords.test(line) && line.length < 80) {
      // Clean leading hashes or bullets
      return line.replace(/^[\s#*•-]+/, "").trim();
    }
  }

  return lines[0] && lines[0].length < 80
    ? lines[0].replace(/^[\s#*•-]+/, "").trim()
    : "Software Engineer";
}

/**
 * Extracts company name if present.
 */
function extractCompany(lines: string[], defaultCompany?: string): string | undefined {
  if (defaultCompany && defaultCompany.trim().length > 0) {
    return defaultCompany.trim();
  }

  for (const line of lines.slice(0, 10)) {
    const compMatch = line.match(/^(?:company|employer|organization):\s*(.+)$/i);
    if (compMatch && compMatch[1]) {
      return compMatch[1].trim();
    }

    const atMatch = line.match(/^([A-Z][a-zA-Z0-9\s]{2,30})\s+(?:is looking for|is hiring|seeks)/i);
    if (atMatch && atMatch[1]) {
      return atMatch[1].trim();
    }

    const aboutMatch = line.match(/^About\s+([A-Z][a-zA-Z0-9\s.,]{2,35})$/i);
    if (aboutMatch && aboutMatch[1]) {
      return aboutMatch[1].trim();
    }
  }

  return undefined;
}

/**
 * Extracts location and workplace type (Remote / Hybrid / On-site).
 */
function extractLocationAndWorkplace(rawText: string): {
  location?: string;
  workplaceType: WorkplaceType;
} {
  const lower = rawText.toLowerCase();

  let workplaceType: WorkplaceType = "On-site";
  if (lower.includes("remote") || lower.includes("work from anywhere")) {
    workplaceType = "Remote";
  } else if (lower.includes("hybrid") || lower.includes("flexible work")) {
    workplaceType = "Hybrid";
  }

  const locationRegex =
    /(?:location|office|work location):\s*([a-zA-Z0-9\s,.-]{2,50})/i;
  const locMatch = rawText.match(locationRegex);

  let location: string | undefined = locMatch ? locMatch[1].trim() : undefined;

  if (!location) {
    const cityMatch = rawText.match(
      /\b(San Francisco|New York|Seattle|Austin|London|Berlin|Toronto|Bangalore|Singapore|Boston|Chicago|Los Angeles|Dublin)\b/i
    );
    if (cityMatch) {
      location = cityMatch[1];
    } else if (workplaceType === "Remote") {
      location = "Remote / Flexible";
    }
  }

  return { location, workplaceType };
}

/**
 * Detects Seniority Level from title and requirements.
 */
function extractSeniority(
  title: string,
  rawText: string,
  experienceMin?: number
): SeniorityLevel {
  const titleLower = title.toLowerCase();
  const textLower = rawText.toLowerCase();

  if (
    titleLower.includes("principal") ||
    titleLower.includes("staff") ||
    titleLower.includes("architect") ||
    titleLower.includes("director") ||
    titleLower.includes("head of") ||
    titleLower.includes("vp")
  ) {
    return "Principal";
  }

  if (
    titleLower.includes("lead") ||
    titleLower.includes("tech lead") ||
    titleLower.includes("team lead")
  ) {
    return "Lead";
  }

  if (
    titleLower.includes("senior") ||
    titleLower.includes("sr.") ||
    titleLower.includes(" sr ") ||
    (experienceMin !== undefined && experienceMin >= 5)
  ) {
    return "Senior";
  }

  if (
    titleLower.includes("intern") ||
    titleLower.includes("co-op") ||
    textLower.includes("internship program")
  ) {
    return "Intern";
  }

  if (
    titleLower.includes("junior") ||
    titleLower.includes("jr.") ||
    titleLower.includes("associate") ||
    titleLower.includes("entry") ||
    titleLower.includes("graduate") ||
    (experienceMin !== undefined && experienceMin <= 1)
  ) {
    return "Entry";
  }

  return "Mid-Level";
}

/**
 * Extracts experience requirements (min/max years).
 */
function extractExperience(rawText: string): {
  experienceYears?: number;
  experienceDetail?: ExperienceRequirement;
} {
  // Matches "5+ years", "3-5 years", "at least 4 years", "minimum 3 years"
  const rangeRegex =
    /(\d+)\s*(?:-|to|\+)\s*(\d+)?\s*(?:years|yrs)(?: of)?(?: relevant)?(?: professional| industry| work)? experience/i;
  const minRegex =
    /(?:minimum|at least)\s*(\d+)\s*(?:years|yrs)(?: of)?(?: relevant)?(?: professional| industry| work)? experience/i;
  const plusRegex = /(\d+)\+\s*(?:years|yrs)(?: of)? experience/i;

  let match = rawText.match(rangeRegex);
  if (!match) match = rawText.match(minRegex);
  if (!match) match = rawText.match(plusRegex);

  if (match) {
    const min = parseInt(match[1], 10);
    const max = match[2] ? parseInt(match[2], 10) : undefined;
    const text = match[0].trim();

    return {
      experienceYears: min,
      experienceDetail: { min, max, text },
    };
  }

  return {};
}

/**
 * Extracts educational prerequisites.
 */
function extractEducation(rawText: string): string | undefined {
  const eduPatterns = [
    /ph\.?d\.?(?:\s+(?:in|or)\s+[a-zA-Z\s]+)?/i,
    /master(?:'s)?\s+degree(?:\s+in\s+[a-zA-Z\s]+)?/i,
    /bachelor(?:'s)?\s+degree(?:\s+in\s+[a-zA-Z\s,]+(?:or equivalent)?)?/i,
    /b\.?s\.?\s+or\s+m\.?s\.?(?:\s+in\s+[a-zA-Z\s]+)?/i,
    /degree in computer science(?:,\s*engineering)?(?: or equivalent)?/i,
  ];

  for (const pattern of eduPatterns) {
    const match = rawText.match(pattern);
    if (match) {
      return match[0].trim();
    }
  }

  if (/computer science degree/i.test(rawText)) {
    return "Bachelor's degree in Computer Science or related field";
  }

  return undefined;
}

/**
 * Extracts discrete responsibility bullet points.
 */
function extractResponsibilities(lines: string[]): string[] {
  const items: string[] = [];

  for (const line of lines) {
    // Look for bullet-like lines or sentences
    const clean = line.replace(/^[\s*•\-–—\d.)]+/, "").trim();
    if (clean.length > 20 && clean.length < 300) {
      items.push(clean);
    }
  }

  return items.slice(0, 10);
}

/**
 * Detects domain and industry context.
 */
function detectDomain(rawText: string): string {
  const lower = rawText.toLowerCase();

  if (
    lower.includes("payment") ||
    lower.includes("fintech") ||
    lower.includes("banking") ||
    lower.includes("ledger") ||
    lower.includes("crypto") ||
    lower.includes("stripe")
  ) {
    return "Fintech & Payments";
  }
  if (
    lower.includes("llm") ||
    lower.includes("generative ai") ||
    lower.includes("machine learning") ||
    lower.includes("pytorch") ||
    lower.includes("model inference")
  ) {
    return "Artificial Intelligence & ML";
  }
  if (
    lower.includes("kubernetes") ||
    lower.includes("cloud platform") ||
    lower.includes("infrastructure") ||
    lower.includes("devops") ||
    lower.includes("sre")
  ) {
    return "Cloud & Platform Infrastructure";
  }
  if (
    lower.includes("snowflake") ||
    lower.includes("dbt") ||
    lower.includes("data warehouse") ||
    lower.includes("data pipeline") ||
    lower.includes("bigquery")
  ) {
    return "Data Engineering & Analytics";
  }
  if (
    lower.includes("security") ||
    lower.includes("soc 2") ||
    lower.includes("vulnerability") ||
    lower.includes("zero trust") ||
    lower.includes("penetration testing")
  ) {
    return "Cybersecurity & Identity";
  }
  if (
    lower.includes("e-commerce") ||
    lower.includes("retail") ||
    lower.includes("checkout") ||
    lower.includes("shopify")
  ) {
    return "E-Commerce & Retail";
  }
  if (
    lower.includes("health") ||
    lower.includes("medical") ||
    lower.includes("hipaa") ||
    lower.includes("patient")
  ) {
    return "HealthTech & Life Sciences";
  }

  return "Software & Technology";
}

/**
 * Extracts behavioral and cultural signals.
 */
function extractBehavioralKeywords(rawText: string): string[] {
  const lower = rawText.toLowerCase();
  const traits = [
    { name: "Cross-functional Leadership", pattern: /(?:cross-functional|collaborate with product|partner with design)/i },
    { name: "High Ownership", pattern: /(?:ownership|take ownership|end-to-end ownership|self-starter)/i },
    { name: "Fast-Paced Agility", pattern: /(?:fast-paced|rapid growth|high growth|startup environment)/i },
    { name: "First-Principles Thinking", pattern: /(?:first-principles|critical thinking|deep problem solving)/i },
    { name: "Mentorship", pattern: /(?:mentor|mentorship|grow other engineers|coach)/i },
    { name: "Scalability Mindset", pattern: /(?:scale to millions|high throughput|scalability|low latency)/i },
    { name: "Data-Driven Execution", pattern: /(?:data-driven|metrics-oriented|a\/b testing|rigorous analysis)/i },
    { name: "User Empathy", pattern: /(?:user-centric|customer empathy|user experience|obsessed with user)/i },
    { name: "Continuous Improvement", pattern: /(?:continuous improvement|post-mortem|engineering excellence)/i },
  ];

  const matched: string[] = [];
  for (const trait of traits) {
    if (trait.pattern.test(lower)) {
      matched.push(trait.name);
    }
  }

  return matched.slice(0, 6);
}

/**
 * Main Job Description Parser
 * Transforms arbitrary raw job text into deterministic, structured Job Intelligence.
 */
export function parseJobDescription(
  rawText: string,
  defaultTitle?: string,
  defaultCompany?: string
): ParsedJob {
  if (!rawText || rawText.trim().length === 0) {
    return {
      role: defaultTitle || "Software Engineer",
      company: defaultCompany,
      requiredSkills: [],
      preferredSkills: [],
      responsibilities: [],
      technologies: [],
      behavioralKeywords: [],
    };
  }

  const lines = rawText.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const sections = segmentJobSections(rawText);

  // 1. Role, Company, Location
  const role = extractJobTitle(lines, defaultTitle);
  const company = extractCompany(lines, defaultCompany);
  const { location, workplaceType } = extractLocationAndWorkplace(rawText);

  // 2. Experience & Seniority
  const { experienceYears, experienceDetail } = extractExperience(rawText);
  const seniority = extractSeniority(role, rawText, experienceYears);
  const educationRequirement = extractEducation(rawText);

  // 3. Section Text Blocks
  const reqText = sections.requirements.join("\n");
  const prefText = sections.preferred.join("\n");
  const respText = sections.responsibilities.join("\n");
  const overviewText = sections.overview.join("\n");

  // 4. Extract Skills by Context
  const requiredMatches = findSkillsInText(reqText);
  const preferredMatches = findSkillsInText(prefText);
  const generalMatches = findSkillsInText(rawText);

  const reqMap = new Map<string, SkillRequirement>();
  const prefMap = new Map<string, SkillRequirement>();

  // Tag mandatory skills in requirements section
  for (const m of requiredMatches) {
    reqMap.set(m.skill.name, {
      name: m.skill.name,
      normalizedName: normalizeSkillName(m.skill.name),
      category: m.skill.category,
      isRequired: true,
      frequency: m.count,
      importance: m.count > 1 ? "critical" : "high",
    });
  }

  // Tag bonus skills in preferred section
  for (const m of preferredMatches) {
    // If already in required, keep it required
    if (!reqMap.has(m.skill.name)) {
      prefMap.set(m.skill.name, {
        name: m.skill.name,
        normalizedName: normalizeSkillName(m.skill.name),
        category: m.skill.category,
        isRequired: false,
        frequency: m.count,
        importance: "medium",
      });
    }
  }

  // Handle remaining general skills:
  // If no explicit requirements section was demarcated, infer required vs preferred based on phrasing
  const hasDedicatedSections = sections.requirements.length > 0;
  for (const m of generalMatches) {
    if (reqMap.has(m.skill.name) || prefMap.has(m.skill.name)) {
      continue;
    }

    if (!hasDedicatedSections) {
      // Check surrounding sentences in raw text
      const escaped = m.skill.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const mustRegex = new RegExp(
        `(?:must have|required|proficient in|experience with|deep knowledge of)[^.]{0,80}\\b${escaped}\\b`,
        "i"
      );
      const bonusRegex = new RegExp(
        `(?:nice to have|plus|bonus|preferred|familiarity with)[^.]{0,80}\\b${escaped}\\b`,
        "i"
      );

      if (bonusRegex.test(rawText)) {
        prefMap.set(m.skill.name, {
          name: m.skill.name,
          normalizedName: normalizeSkillName(m.skill.name),
          category: m.skill.category,
          isRequired: false,
          frequency: m.count,
          importance: "low",
        });
      } else {
        reqMap.set(m.skill.name, {
          name: m.skill.name,
          normalizedName: normalizeSkillName(m.skill.name),
          category: m.skill.category,
          isRequired: true,
          frequency: m.count,
          importance: m.count >= 2 ? "high" : "medium",
        });
      }
    } else {
      // When sections existed, skills outside preferred/requirements get added as preferred/nice-to-have
      prefMap.set(m.skill.name, {
        name: m.skill.name,
        normalizedName: normalizeSkillName(m.skill.name),
        category: m.skill.category,
        isRequired: false,
        frequency: m.count,
        importance: "low",
      });
    }
  }

  const requiredSkills = Array.from(reqMap.values()).sort(
    (a, b) => b.frequency - a.frequency
  );
  const preferredSkills = Array.from(prefMap.values()).sort(
    (a, b) => b.frequency - a.frequency
  );

  // 5. Technologies list (unique set of all technical skills)
  const technologies = Array.from(
    new Set([
      ...requiredSkills.map((s) => s.name),
      ...preferredSkills.map((s) => s.name),
    ])
  );

  // 6. Responsibilities
  const responsibilities = extractResponsibilities(
    sections.responsibilities.length > 0 ? sections.responsibilities : lines.slice(3, 20)
  );

  // 7. Domain & Behavioral
  const domain = detectDomain(rawText);
  const behavioralKeywords = extractBehavioralKeywords(rawText);

  return {
    role,
    company,
    location,
    workplaceType,
    seniority,
    experienceYears,
    experienceDetail,
    educationRequirement,
    requiredSkills,
    preferredSkills,
    responsibilities,
    technologies,
    domain,
    behavioralKeywords,
    rawSections: {
      overview: overviewText,
      responsibilities: respText,
      requirements: reqText,
      preferred: prefText,
      benefits: sections.benefits.join("\n"),
    },
  };
}

