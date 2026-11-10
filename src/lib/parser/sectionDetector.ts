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
    regex: /^(professional|executive|career)?\s*(summary|profile|objective|about\s*(me)?|overview)$/i,
  },
  {
    type: "experience",
    regex: /^(work|professional|employment|career|relevant)?\s*(experience|history|background|employment)$/i,
  },
  {
    type: "projects",
    regex: /^(key|technical|selected|academic|personal|featured)?\s*projects(\s*(&|and)\s*(systems|contributions))?$/i,
  },
  {
    type: "skills",
    regex: /^(technical|core|key|domain|relevant)?\s*(skills|proficiencies|competencies|technologies|tools(\s*(&|and)\s*technologies)?)$/i,
  },
  {
    type: "education",
    regex: /^(education|academic\s*(background|history|credentials)|degrees?|academics?)$/i,
  },
  {
    type: "certifications",
    regex: /^(certifications?|licenses|credentials|training(\s*(&|and)\s*certifications)?)$/i,
  },
];

export function detectSections(rawText: string): DetectedSection[] {
  const lines = rawText.split(/\r?\n/).map((l) => l.trim());
  const detectedMarkers: { index: number; type: SectionType; heading: string }[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line || line.length > 55) continue; // Section headers are short lines

    // Clean punctuation or special characters (e.g. "## Experience", "--- Skills ---", "1. Education")
    const cleanLine = line
      .replace(/^[#*\-•>\s\d.]+|[:|\-—_=]+$/g, "")
      .trim();

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

