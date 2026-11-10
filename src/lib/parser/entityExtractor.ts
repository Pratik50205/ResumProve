/**
 * Entity & Information Extractor for parsed resume sections.
 */

import {
  PersonalDetails,
  Experience,
  Project,
  Education,
  SkillGroups,
  Certification,
} from "@/types/resume";
import { SKILL_KNOWLEDGE_BASE, SkillDefinition } from "@/data/skills";

// Regular Expressions for Contact Information
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
const PHONE_REGEX = /(?:(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\+?\d{10,14})/;
const LINKEDIN_REGEX = /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([a-zA-Z0-9_.-]+)\/?/i;
const GITHUB_REGEX = /(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_.-]+)\/?/i;
const URL_REGEX = /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&//=]*)/i;

// Date range pattern for experiences & education
const DATE_RANGE_REGEX = /(?:(?:(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?|\b0?[1-9]\b|\b1[0-2]\b)[\/\s.-]*)?\b(19\d{2}|20\d{2})\b\s*(?:–|—|-|to|until)\s*(?:(?:(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?|\b0?[1-9]\b|\b1[0-2]\b)[\/\s.-]*)?(?:\b(19\d{2}|20\d{2})\b|present|current|now|ongoing)/i;
const SINGLE_YEAR_REGEX = /\b(19\d{2}|20\d{2})\b/;
const GPA_REGEX = /\b(?:gpa|cgpa)[:\s]*([0-4]\.\d{1,2}(?:\s*\/\s*4(?:\.0)?)?|[0-9]\.\d{1,2}\s*\/\s*10)\b/i;

// Bullet & Action Verb detection
const BULLET_PREFIX_REGEX = /^[•▪▫‣⁃➢➔✔\u2022\u25E6\u2023\u25AA\u25AB\-*+–—]\s*|^[0-9]+[.)]\s*/;
const ACTION_VERB_REGEX = /^(built|developed|designed|led|engineered|created|implemented|architected|optimized|maintained|collaborated|resolved|automated|delivered|managed|spearheaded|improved|trained|deployed|analyzed|established|directed|scaled|integrated|achieved|configured|orchestrated|headed|authored|researched|streamlined|formulated)\b/i;

export function extractPersonalDetails(headerLines: string[], allText: string): PersonalDetails {
  const textBlob = [...headerLines, allText.slice(0, 1500)].join(" ");

  // 1. Email
  const emailMatch = textBlob.match(EMAIL_REGEX);
  const email = emailMatch ? emailMatch[0].trim() : "";

  // 2. Phone (filter out dates like 2020-2024)
  const phoneMatches = textBlob.match(new RegExp(PHONE_REGEX, "g")) || [];
  const validPhone = phoneMatches.find((p) => !/^(19|20)\d{2}[-–](19|20)\d{2}$/.test(p.trim())) || "";
  const phone = validPhone.trim();

  // 3. LinkedIn
  const linkedinMatch = textBlob.match(LINKEDIN_REGEX);
  const linkedin = linkedinMatch
    ? (linkedinMatch[0].startsWith("http") ? linkedinMatch[0] : `https://${linkedinMatch[0]}`)
    : "";

  // 4. GitHub
  const githubMatch = textBlob.match(GITHUB_REGEX);
  const github = githubMatch
    ? (githubMatch[0].startsWith("http") ? githubMatch[0] : `https://${githubMatch[0]}`)
    : "";

  // 5. Portfolio / Website (non-linkedin, non-github)
  const allUrls = textBlob.match(new RegExp(URL_REGEX, "g")) || [];
  const portfolioUrl = allUrls.find(
    (u) => !u.includes("linkedin.com") && !u.includes("github.com") && !u.includes("mailto:")
  ) || "";

  // 6. Name & Title Heuristic
  // If headerLines is empty, fall back to the first 8 lines of the full text
  const candidateLines = headerLines.length > 0
    ? headerLines
    : allText.split(/\r?\n/).map((l) => l.trim()).filter(Boolean).slice(0, 8);

  let fullName = "";
  let title = "";

  for (let i = 0; i < Math.min(candidateLines.length, 6); i++) {
    const rawLine = candidateLines[i].trim();
    if (!rawLine) continue;

    // Skip lines that look like emails, URLs, pure numbers, or resume boilerplate
    if (
      EMAIL_REGEX.test(rawLine) ||
      rawLine.includes("@") ||
      rawLine.includes("http") ||
      PHONE_REGEX.test(rawLine) ||
      /^(curriculum\s+vitae|resume|cv)$/i.test(rawLine) ||
      rawLine.length > 45
    ) {
      continue;
    }

    // A valid name is usually 2 to 4 words, predominantly alphabetic
    const words = rawLine.split(/\s+/).filter(Boolean);
    const hasJobWord = /engineer|developer|analyst|manager|specialist|architect|designer|scientist|student/i.test(rawLine);

    if (!fullName && words.length >= 2 && words.length <= 4 && !hasJobWord) {
      fullName = rawLine.replace(/[,|•]/g, "").trim();
      continue;
    }

    // If we have a name, look for title in following line
    if (fullName && !title && words.length <= 6) {
      if (/engineer|developer|designer|architect|lead|specialist|scientist|consultant|manager|intern|full-stack|frontend|backend/i.test(rawLine)) {
        title = rawLine.replace(/[,|•]/g, "").trim();
        break;
      }
    }
  }

  // 7. Location Heuristic (Look for City, State / Country in header, rejecting tech terms)
  let location = "";
  const TECH_EXCLUSIONS = /\b(aws|azure|gcp|kubernetes|docker|python|java|react|node|c\+\+|sql|nosql|html|css|linux|git|rest|api|graphql|ci\/cd|devops|agile|scrum|data|cloud|web|mobile|architect)\b/i;

  for (const line of candidateLines) {
    if (line.toLowerCase().includes("skill") || line.toLowerCase().includes("experience") || line.toLowerCase().includes("technologies")) {
      continue;
    }

    // Pattern A: City, State Abbr (e.g. "San Francisco, CA", "Austin, TX")
    const stateMatch = line.match(/\b([A-Z][a-zA-Z\s.-]+),\s*([A-Z]{2})\b/);
    if (stateMatch && !TECH_EXCLUSIONS.test(stateMatch[0]) && !stateMatch[0].includes("University")) {
      location = stateMatch[0].trim();
      break;
    }

    // Pattern B: City, Country (e.g. "Bengaluru, India", "Toronto, Canada", "London, UK")
    const countryMatch = line.match(/\b([A-Z][a-zA-Z\s.-]+),\s*(USA|United States|India|Canada|UK|United Kingdom|Germany|France|Singapore|Australia|UAE|Netherlands|Japan)\b/i);
    if (countryMatch && !TECH_EXCLUSIONS.test(countryMatch[0]) && !countryMatch[0].includes("University")) {
      location = countryMatch[0].trim();
      break;
    }
  }

  return {
    fullName: fullName || "Candidate Name",
    title: title || "Professional Title",
    email,
    phone,
    location,
    linkedin,
    github,
    portfolio: portfolioUrl,
  };
}

export function extractSummary(lines: string[]): string {
  return lines
    .filter((l) => l.trim().length > 0)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

export function extractExperience(lines: string[]): Experience[] {
  const experiences: Experience[] = [];
  let currentExp: Partial<Experience> | null = null;
  let currentBullets: string[] = [];

  const commitCurrent = () => {
    if (currentExp && (currentExp.title || currentExp.company)) {
      experiences.push({
        id: `exp-${Date.now()}-${experiences.length}`,
        title: currentExp.title || "Software Engineer",
        company: currentExp.company || "Company",
        location: currentExp.location || "",
        startDate: currentExp.startDate || "2022",
        endDate: currentExp.endDate || "Present",
        isCurrent: currentExp.isCurrent ?? true,
        bullets: currentBullets.length > 0 ? currentBullets : ["Delivered core technical contributions."],
      });
    }
    currentExp = null;
    currentBullets = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const dateMatch = line.match(DATE_RANGE_REGEX);
    const isExplicitBullet = BULLET_PREFIX_REGEX.test(line);
    const isVerbBullet = ACTION_VERB_REGEX.test(line) && line.length > 20;
    const isBullet = isExplicitBullet || isVerbBullet;

    // If line has dates or title-like company line, start a new experience entry
    if (dateMatch && !isBullet) {
      commitCurrent();

      const matchedDates = dateMatch[0].split(/(?:–|-|to)/i).map((s) => s.trim());
      const startDate = matchedDates[0] || "2022";
      const endDate = matchedDates[1] || "Present";
      const isCurrent = /present|current/i.test(endDate);

      // Remaining text on line or previous line might be title / company
      let title = "";
      let company = "";
      let location = "";

      // 1. Check if the line itself contains delimiters (e.g. "Cloud Engineer at Google 2020 - Present")
      const rawNonDate = line.replace(dateMatch[0], "").trim();
      
      if (rawNonDate.includes(" at ")) {
        const parts = rawNonDate.split(/\s+at\s+/i);
        title = parts[0]?.trim() || "";
        company = parts[1]?.trim() || "";
      } else if (rawNonDate.includes(" | ")) {
        const parts = rawNonDate.split(/\s*\|\s*/).map((s) => s.trim()).filter(Boolean);
        title = parts[0] || "";
        company = parts[1] || "";
        if (parts[2]) location = parts[2];
      } else if (rawNonDate.includes(" - ")) {
        const parts = rawNonDate.split(/\s+-\s+/).map((s) => s.trim()).filter(Boolean);
        title = parts[0] || "";
        company = parts[1] || "";
      } else if (rawNonDate.includes(" – ")) {
        const parts = rawNonDate.split(/\s+–\s+/).map((s) => s.trim()).filter(Boolean);
        title = parts[0] || "";
        company = parts[1] || "";
      } else if (rawNonDate.includes(", ") && !rawNonDate.includes(" at ")) {
        const parts = rawNonDate.split(/,\s*/).map((s) => s.trim()).filter(Boolean);
        title = parts[0] || "";
        company = parts[1] || "";
      } else if (rawNonDate) {
        title = rawNonDate.replace(/[|•()]/g, " ").trim();
      }

      // 2. If title or company wasn't found on the date line, check previous line
      if ((!title || !company) && i > 0 && !BULLET_PREFIX_REGEX.test(lines[i - 1])) {
        const prevLine = lines[i - 1].trim();
        if (prevLine.includes(" at ")) {
          const parts = prevLine.split(/\s+at\s+/i);
          if (!title) title = parts[0].trim();
          if (!company) company = parts[1].trim();
        } else if (prevLine.includes(" | ")) {
          const parts = prevLine.split(/\s*\|\s*/).map((s) => s.trim());
          if (!title) title = parts[0];
          if (!company) company = parts[1] || "";
          if (!location && parts[2]) location = parts[2];
        } else if (prevLine.includes(" - ")) {
          const parts = prevLine.split(/\s+-\s+/).map((s) => s.trim());
          if (!title) title = parts[0];
          if (!company) company = parts[1] || "";
        } else if (!company) {
          company = prevLine;
        }
      }

      // Sanity swap: If company looks like a job title and title does not, swap them
      const TITLE_KEYWORDS = /engineer|developer|designer|architect|lead|manager|analyst|specialist|consultant|scientist|intern|director|head/i;
      if (TITLE_KEYWORDS.test(company) && !TITLE_KEYWORDS.test(title)) {
        const tmp = title;
        title = company;
        company = tmp;
      }

      currentExp = {
        title: title || "Software Engineer",
        company: company || "Organization",
        location,
        startDate,
        endDate,
        isCurrent,
      };
      continue;
    }

    if (isBullet) {
      const cleanBullet = line.replace(BULLET_PREFIX_REGEX, "").trim();
      if (cleanBullet) currentBullets.push(cleanBullet);
    } else if (currentExp && currentBullets.length > 0 && line.length > 0 && !dateMatch) {
      // Multi-line bullet continuation
      currentBullets[currentBullets.length - 1] += " " + line;
    } else if (currentExp && currentBullets.length === 0) {
      // Line might be title or location under company
      if (!currentExp.company || currentExp.company === "Organization") {
        currentExp.company = line;
      } else if (!currentExp.location) {
        currentExp.location = line;
      }
    }
  }

  commitCurrent();
  return experiences;
}

export function extractProjects(lines: string[]): Project[] {
  const projects: Project[] = [];
  let currentProj: Partial<Project> | null = null;
  let currentBullets: string[] = [];

  const commitProject = () => {
    if (currentProj && currentProj.name) {
      projects.push({
        id: `proj-${Date.now()}-${projects.length}`,
        name: currentProj.name,
        description: currentProj.description || "",
        technologies: currentProj.technologies || [],
        githubUrl: currentProj.githubUrl,
        liveUrl: currentProj.liveUrl,
        bullets: currentBullets.length > 0 ? currentBullets : ["Engineered system architecture."],
      });
    }
    currentProj = null;
    currentBullets = [];
  };

  for (const line of lines) {
    const isExplicitBullet = BULLET_PREFIX_REGEX.test(line);
    const isVerbBullet = ACTION_VERB_REGEX.test(line) && line.length > 20;
    const isBullet = isExplicitBullet || isVerbBullet;

    if (!isBullet && line.length < 80) {
      // Possible project heading line
      const techBracketMatch = line.match(/\[(.*?)\]|\((.*?)\)/);
      const technologies: string[] = [];

      if (techBracketMatch) {
        const rawTechs = techBracketMatch[1] || techBracketMatch[2] || "";
        rawTechs.split(/[,|•]/).forEach((t) => {
          const trimmed = t.trim();
          if (trimmed) technologies.push(trimmed);
        });
      }

      const projectName = line
        .replace(/\[(.*?)\]|\((.*?)\)/g, "")
        .replace(/[:|—–-].*$/, "")
        .trim();

      if (projectName && !/projects|technical/i.test(projectName)) {
        commitProject();
        currentProj = {
          name: projectName,
          technologies,
        };
        continue;
      }
    }

    if (isBullet && currentProj) {
      const clean = line.replace(BULLET_PREFIX_REGEX, "").trim();
      if (clean) currentBullets.push(clean);
    } else if (currentProj && currentBullets.length > 0 && line.length > 0) {
      // Multi-line project bullet continuation
      currentBullets[currentBullets.length - 1] += " " + line;
    }
  }

  commitProject();
  return projects;
}

export function extractSkillsFromDocument(skillsSectionLines: string[], fullDocumentText: string): SkillGroups {
  const combinedText = (skillsSectionLines.join(" ") + " " + fullDocumentText).toLowerCase();
  const detectedSkills = new Map<string, SkillDefinition>();

  // Cross-reference against our curated skill ontology
  for (const skillDef of SKILL_KNOWLEDGE_BASE) {
    const canonicalNameLower = skillDef.name.toLowerCase();
    
    // Check main name with word boundaries
    const escapedName = canonicalNameLower.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const nameRegex = new RegExp(`\\b${escapedName}\\b`, "i");

    if (nameRegex.test(combinedText)) {
      detectedSkills.set(skillDef.name, skillDef);
      continue;
    }

    // Check aliases
    for (const alias of skillDef.aliases) {
      const escapedAlias = alias.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const aliasRegex = new RegExp(`\\b${escapedAlias}\\b`, "i");
      if (aliasRegex.test(combinedText)) {
        detectedSkills.set(skillDef.name, skillDef);
        break;
      }
    }
  }

  // Also parse explicit comma-separated skills in the skills section
  const explicitTokens = skillsSectionLines
    .join(" ")
    .replace(/^.*?:/g, "")
    .split(/[,|•;]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 1 && s.length < 30);

  const skillGroups: SkillGroups = {
    programming: [],
    aiMl: [],
    dataScience: [],
    frontend: [],
    backend: [],
    databases: [],
    cloud: [],
    devops: [],
    tools: [],
    softSkills: [],
    mobile: [],
    testing: [],
    cybersecurity: [],
    systemDesign: [],
    management: [],
  };

  detectedSkills.forEach((def) => {
    switch (def.category) {
      case "Programming":
        skillGroups.programming.push(def.name);
        break;
      case "AI/ML":
        skillGroups.aiMl?.push(def.name);
        break;
      case "Data Science":
        skillGroups.dataScience?.push(def.name);
        break;
      case "Frontend":
        skillGroups.frontend?.push(def.name);
        break;
      case "Backend":
        skillGroups.backend?.push(def.name);
        break;
      case "Databases":
        skillGroups.databases?.push(def.name);
        break;
      case "Cloud":
        skillGroups.cloud?.push(def.name);
        break;
      case "DevOps":
        skillGroups.devops?.push(def.name);
        break;
      case "Tools":
        skillGroups.tools?.push(def.name);
        break;
      case "Soft Skills":
        skillGroups.softSkills?.push(def.name);
        break;
      case "Mobile":
        skillGroups.mobile?.push(def.name);
        break;
      case "Testing":
        skillGroups.testing?.push(def.name);
        break;
      case "Cybersecurity":
        skillGroups.cybersecurity?.push(def.name);
        break;
      case "System Design":
        skillGroups.systemDesign?.push(def.name);
        break;
      case "Management":
        skillGroups.management?.push(def.name);
        break;
    }
  });

  // If no programming skills were matched, add any explicit tokens
  if (skillGroups.programming.length === 0 && explicitTokens.length > 0) {
    skillGroups.programming = explicitTokens.slice(0, 8);
  }

  return skillGroups;
}

export function extractEducation(lines: string[]): Education[] {
  const educationList: Education[] = [];
  let currentEdu: Partial<Education> | null = null;

  for (const line of lines) {
    const isDegree = /bachelor|master|phd|doctor|b\.s|m\.s|b\.tech|m\.tech|associate|degree/i.test(line);
    const isInstitution = /university|institute|college|school|academy/i.test(line);
    const dateMatch = line.match(DATE_RANGE_REGEX) || line.match(SINGLE_YEAR_REGEX);
    const gpaMatch = line.match(GPA_REGEX);

    const fieldMatch = line.match(/\bin\s+([A-Za-z\s]+?)(?:\||–|-|,|\(|$)/i);
    const extractedField = fieldMatch ? fieldMatch[1].trim() : "";

    // If current line complements the active education entry (e.g. line 1 was university, line 2 is degree)
    if (currentEdu && ((!currentEdu.degree && isDegree) || (!currentEdu.institution && isInstitution))) {
      if (isDegree && !currentEdu.degree) {
        currentEdu.degree = line.replace(/[,|].*$/, "").trim();
      }
      if (isInstitution && !currentEdu.institution) {
        currentEdu.institution = line.replace(/[,|].*$/, "").trim();
      }
      if (gpaMatch && !currentEdu.gpa) currentEdu.gpa = gpaMatch[1];
      if (extractedField && (!currentEdu.fieldOfStudy || currentEdu.fieldOfStudy === "Computer Science")) {
        currentEdu.fieldOfStudy = extractedField;
      }
      if (dateMatch) {
        currentEdu.startDate = dateMatch[0].split(/–|-/)[0]?.trim() || currentEdu.startDate;
        currentEdu.endDate = dateMatch[0].split(/–|-/)[1]?.trim() || currentEdu.endDate;
      }
      continue;
    }

    if (isDegree || isInstitution) {
      if (currentEdu && currentEdu.institution && currentEdu.degree) {
        educationList.push({
          id: `edu-${Date.now()}-${educationList.length}`,
          institution: currentEdu.institution || "University",
          degree: currentEdu.degree || "Bachelor of Science",
          fieldOfStudy: currentEdu.fieldOfStudy || "Computer Science",
          startDate: currentEdu.startDate || "2019",
          endDate: currentEdu.endDate || "2023",
          gpa: currentEdu.gpa,
        });
        currentEdu = null;
      }

      // If line contains BOTH degree and institution (e.g. "Bachelor of Science in CS - Stanford University")
      if (isDegree && isInstitution) {
        let degreePart = "";
        let instPart = "";
        const parts = line.split(/\s*[-|–—]\s*|\s+at\s+|\s+from\s+|,\s*/).map((p) => p.trim()).filter(Boolean);
        for (const p of parts) {
          if (/bachelor|master|phd|doctor|b\.s|m\.s|b\.tech|m\.tech|associate|degree/i.test(p)) {
            if (!degreePart) degreePart = p;
          } else if (/university|institute|college|school|academy/i.test(p)) {
            if (!instPart) instPart = p;
          }
        }

        currentEdu = {
          institution: instPart || "University",
          degree: degreePart || "Bachelor of Science",
          fieldOfStudy: extractedField || "Computer Science",
          startDate: dateMatch ? dateMatch[0].split(/–|-/)[0]?.trim() || "2019" : "2019",
          endDate: dateMatch ? dateMatch[0].split(/–|-/)[1]?.trim() || "2023" : "2023",
          gpa: gpaMatch ? gpaMatch[1] : undefined,
        };
        continue;
      }

      currentEdu = {
        institution: isInstitution ? line.replace(/[,|].*$/, "").trim() : "",
        degree: isDegree ? line.replace(/[,|].*$/, "").trim() : "",
        fieldOfStudy: extractedField || "Computer Science",
        startDate: dateMatch ? dateMatch[0].split(/–|-/)[0]?.trim() || "2019" : "2019",
        endDate: dateMatch ? dateMatch[0].split(/–|-/)[1]?.trim() || "2023" : "2023",
        gpa: gpaMatch ? gpaMatch[1] : undefined,
      };
      continue;
    }

    if (currentEdu) {
      if (!currentEdu.institution && isInstitution) {
        currentEdu.institution = line;
      } else if (!currentEdu.gpa && gpaMatch) {
        currentEdu.gpa = gpaMatch[1];
      }
    }
  }

  if (currentEdu && (currentEdu.institution || currentEdu.degree)) {
    educationList.push({
      id: `edu-${Date.now()}-${educationList.length}`,
      institution: currentEdu.institution || "University",
      degree: currentEdu.degree || "Bachelor of Science",
      fieldOfStudy: currentEdu.fieldOfStudy || "Computer Science",
      startDate: currentEdu.startDate || "2019",
      endDate: currentEdu.endDate || "2023",
      gpa: currentEdu.gpa,
    });
  }

  return educationList;
}

export function extractCertifications(lines: string[]): Certification[] {
  const certs: Certification[] = [];

  for (const line of lines) {
    if (!line || line.length < 4 || /certifications/i.test(line)) continue;

    const parts = line.split(/[—–|•]/);
    const name = parts[0]?.trim();
    const issuer = parts[1]?.trim() || "Industry Authority";
    const dateMatch = line.match(SINGLE_YEAR_REGEX);

    if (name) {
      certs.push({
        id: `cert-${Date.now()}-${certs.length}`,
        name,
        issuer,
        issueDate: dateMatch ? dateMatch[0] : "2023",
      });
    }
  }

  return certs;
}

