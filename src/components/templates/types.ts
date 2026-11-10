import { Resume, ResumeSettings } from "@/types/resume";

export interface TemplateProps {
  resume: Resume;
  settings?: ResumeSettings;
}

export function getFontFamilyClass(font?: string): string {
  switch (font) {
    case "Outfit":
      return "font-display";
    case "Roboto":
      return "font-roboto";
    case "Merriweather":
      return "font-merriweather";
    case "JetBrains Mono":
      return "font-mono";
    case "Inter":
    default:
      return "font-sans";
  }
}

export function getSpacingStyles(spacing?: string) {
  switch (spacing) {
    case "compact":
      return {
        sectionGap: "mb-3",
        itemGap: "space-y-1.5",
        bulletGap: "space-y-0.5",
        textLeading: "leading-snug",
        headerPadding: "pb-2 mb-2.5",
      };
    case "relaxed":
      return {
        sectionGap: "mb-6",
        itemGap: "space-y-4",
        bulletGap: "space-y-1.5",
        textLeading: "leading-loose",
        headerPadding: "pb-4 mb-4",
      };
    case "normal":
    default:
      return {
        sectionGap: "mb-4",
        itemGap: "space-y-2.5",
        bulletGap: "space-y-1",
        textLeading: "leading-relaxed",
        headerPadding: "pb-3 mb-3",
      };
  }
}

