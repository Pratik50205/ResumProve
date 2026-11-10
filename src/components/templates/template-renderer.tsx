import React from "react";
import { Resume, ResumeSettings, TemplateId } from "@/types/resume";
import { AtsMinimalTemplate } from "./ats-minimal";
import { ModernProfessionalTemplate } from "./modern-professional";
import { TechSpecialistTemplate } from "./tech-specialist";
import { StudentFresherTemplate } from "./student-fresher";

interface TemplateRendererProps {
  resume: Resume;
  templateOverride?: TemplateId;
  settingsOverride?: Partial<ResumeSettings>;
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({
  resume,
  templateOverride,
  settingsOverride,
}) => {
  const mergedSettings: ResumeSettings = {
    template: templateOverride || resume.settings?.template || "tech-specialist",
    primaryColor: settingsOverride?.primaryColor || resume.settings?.primaryColor || "#4f46e5",
    fontFamily: settingsOverride?.fontFamily || resume.settings?.fontFamily || "Inter",
    fontSize: settingsOverride?.fontSize || resume.settings?.fontSize || "base",
    lineSpacing: settingsOverride?.lineSpacing || resume.settings?.lineSpacing || "normal",
    sectionOrder: settingsOverride?.sectionOrder || resume.settings?.sectionOrder || [
      "summary",
      "experience",
      "projects",
      "skills",
      "education",
      "certifications",
    ],
    showIcons: settingsOverride?.showIcons ?? resume.settings?.showIcons ?? true,
  };

  const templateId = mergedSettings.template;

  switch (templateId) {
    case "ats-minimal":
      return <AtsMinimalTemplate resume={resume} settings={mergedSettings} />;
    case "modern-professional":
      return <ModernProfessionalTemplate resume={resume} settings={mergedSettings} />;
    case "student-fresher":
      return <StudentFresherTemplate resume={resume} settings={mergedSettings} />;
    case "tech-specialist":
    default:
      return <TechSpecialistTemplate resume={resume} settings={mergedSettings} />;
  }
};

