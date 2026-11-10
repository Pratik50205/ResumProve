/**
 * Rule-based NLP section detector for resumes.
 */

export type SectionType =
  | "header"
  | "summary"
  | "experience"
  | "projects"
  | "skills"
  | "education"
  | "certifications"
  | "unknown";

export interface DetectedSection {
  type: SectionType;
  heading: string;
  lines: string[];
  startIndex: number;
  endIndex: number;
}

const SECTION_PATTERNS: { type: SectionType; regex: RegExp }[] = [
  {
    type: "summary",
    regex: /^(professional|executive|career|personal|candidate)?\s*(summary|profile|objective|statement|about\s*(me)?|overview|biography)$/i,
  },
  {
    type: "experience",
    regex: /^(work|professional|career|relevant|employment|industry)?\s*(experience|history|background|employment|positions?\s*held|work)(\s*(&|and)\s*(leadership|contributions|roles))?$/i,
  },
  {
    type: "projects",
    regex: /^(key|technical|selected|academic|personal|featured|notable|coursework|capstone|hands-on)?\s*projects(\s*(&|and)\s*(systems|contributions|open\s*source|experience))?$/i,
  },
  {
    type: "skills",
    regex: /^(technical|core|key|domain|relevant|programming|software|it)?\s*(skills|proficiencies|competencies|technologies|tools(\s*(&|and)\s*(technologies|tools|languages|frameworks))?|tech\s*stack|areas\s*of\s*expertise|stack)$/i,
  },
  {
    type: "education",
    regex: /^(education|academic\s*(background|history|credentials|qualifications)|degrees?|academics?|qualifications|coursework(\s*(&|and)\s*education)?)$/i,
  },
  {
    type: "certifications",
    regex: /^(certifications?|licenses|credentials|training|certificates|courses|awards(\s*(&|and)\s*(certifications|honors|licenses))?)$/i,
  },
];

const INLINE_HEADER_REGEX = /^((?:professional\s+|executive\s+|career\s+|work\s+|technical\s+|key\s+|academic\s+)?(?:summary|profile|objective|statement|experience|history|projects|skills|competencies|technologies|education|certifications))\s*[:–—\-]\s*(.+)$/i;

export function detectSections(rawText: string): DetectedSection[] {
  // Preprocess lines: handle inline section headers (e.g. "Skills: React, Node, Python")
  const initialLines = rawText.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0);
  const lines: string[] = [];

  for (const line of initialLines) {
    const inlineMatch = line.match(INLINE_HEADER_REGEX);
    if (inlineMatch && inlineMatch[1] && inlineMatch[2]) {
      lines.push(inlineMatch[1].trim());
      lines.push(inlineMatch[2].trim());
    } else {
      lines.push(line);
    }
  }

  const detectedMarkers: { index: number; type: SectionType; heading: string }[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line || line.length > 55) continue; // Section headers are short lines

    // Clean punctuation or special characters (e.g. "## Experience", "--- Skills ---", "1. Education")
    let cleanLine = line
      .replace(/^[#*\-•>\s\d.]+|[:|\-—_=]+$/g, "")
      .trim();

    // Handle tracked letters (e.g. "E X P E R I E N C E" -> "EXPERIENCE")
    if (/^[A-Z](\s[A-Z]){2,}$/.test(cleanLine)) {
      cleanLine = cleanLine.replace(/\s+/g, "");
    }

    if (!cleanLine) continue;

    for (const pattern of SECTION_PATTERNS) {
      if (pattern.regex.test(cleanLine)) {
        detectedMarkers.push({
          index: i,
          type: pattern.type,
          heading: line,
        });
        break;
      }
    }
  }

  const sections: DetectedSection[] = [];

  // 1. Initial header section (from line 0 to the first detected section marker)
  if (detectedMarkers.length > 0 && detectedMarkers[0].index > 0) {
    sections.push({
      type: "header",
      heading: "Contact & Header",
      lines: lines.slice(0, detectedMarkers[0].index),
      startIndex: 0,
      endIndex: detectedMarkers[0].index - 1,
    });
  } else if (detectedMarkers.length === 0) {
    sections.push({
      type: "header",
      heading: "Contact & Header",
      lines,
      startIndex: 0,
      endIndex: lines.length - 1,
    });
  }

  // 2. Sections in between markers
  for (let m = 0; m < detectedMarkers.length; m++) {
    const current = detectedMarkers[m];
    const nextMarker = detectedMarkers[m + 1];
    const startIndex = current.index + 1;
    const endIndex = nextMarker ? nextMarker.index - 1 : lines.length - 1;

    sections.push({
      type: current.type,
      heading: current.heading,
      lines: lines.slice(startIndex, endIndex + 1).filter((l) => l.length > 0),
      startIndex,
      endIndex,
    });
  }

  return sections;
}

