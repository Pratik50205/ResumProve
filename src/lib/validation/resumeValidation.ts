import { Resume } from "@/types/resume";

export interface ValidationItem {
  id: string;
  label: string;
  isComplete: boolean;
  category: "personal" | "summary" | "experience" | "projects" | "education" | "skills" | "certifications";
  tip?: string;
}

export interface ResumeValidationResult {
  score: number; // 0 to 100
  isValid: boolean;
  items: ValidationItem[];
  missingCritical: string[];
  totalSkillsCount: number;
  totalExperienceYears: number;
}

export function isValidEmail(email?: string): boolean {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidUrl(url?: string): boolean {
  if (!url) return true; // Optional fields are valid if blank
  const clean = url.trim();
  if (clean === "") return true;
  return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(clean);
}

export function validateResume(resume: Resume): ResumeValidationResult {
  const items: ValidationItem[] = [
    // Personal Details
    {
      id: "val-name",
      label: "Full Name Provided",
      isComplete: Boolean(resume.personal.fullName && resume.personal.fullName.trim().length >= 2),
      category: "personal",
      tip: "Add your official name at the top of your resume."
    },
    {
      id: "val-email",
      label: "Valid Email Address",
      isComplete: isValidEmail(resume.personal.email),
      category: "personal",
      tip: "Provide a clean, professional email (e.g. yourname@domain.com)."
    },
    {
      id: "val-phone",
      label: "Contact Phone Number",
      isComplete: Boolean(resume.personal.phone && resume.personal.phone.trim().length >= 7),
      category: "personal",
      tip: "Include a reachable phone number with country code if applicable."
    },
    {
      id: "val-location",
      label: "Location / City",
      isComplete: Boolean(resume.personal.location && resume.personal.location.trim().length >= 2),
      category: "personal",
      tip: "Specify City, State or Remote status."
    },
    {
      id: "val-title",
      label: "Professional Target Title",
      isComplete: Boolean(resume.personal.title && resume.personal.title.trim().length >= 3),
      category: "personal",
      tip: "Include your current or target job title (e.g. Machine Learning Engineer)."
    },

    // Summary
    {
      id: "val-summary",
      label: "Professional Summary",
      isComplete: Boolean(resume.summary && resume.summary.trim().length >= 40),
      category: "summary",
      tip: "Craft a 2–4 sentence summary highlighting key impact and focus area."
    },

    // Experience
    {
      id: "val-exp-exists",
      label: "Work Experience Added",
      isComplete: Boolean(resume.experience && resume.experience.length > 0),
      category: "experience",
      tip: "List at least one work experience or internship entry."
    },
    {
      id: "val-exp-bullets",
      label: "Action-Oriented Bullets",
      isComplete: Boolean(
        resume.experience &&
        resume.experience.length > 0 &&
        resume.experience.every((e) => e.bullets && e.bullets.length >= 2 && e.bullets.some(b => b.trim().length > 20))
      ),
      category: "experience",
      tip: "Ensure each role has at least 2 descriptive bullet points."
    },

    // Projects
    {
      id: "val-projects",
      label: "Key Technical Projects",
      isComplete: Boolean(
        resume.projects &&
        resume.projects.length > 0 &&
        resume.projects.some((p) => p.name.trim().length > 2 && p.bullets && p.bullets.length > 0)
      ),
      category: "projects",
      tip: "Showcase 1–3 projects with tech stacks and quantifiable outcomes."
    },

    // Education
    {
      id: "val-edu",
      label: "Education Details",
      isComplete: Boolean(
        resume.education &&
        resume.education.length > 0 &&
        resume.education.some((e) => e.institution.trim().length > 2 && e.degree.trim().length > 2)
      ),
      category: "education",
      tip: "Include your degree, major, university, and graduation year."
    },

    // Skills
    {
      id: "val-skills",
      label: "Categorized Technical Skills (5+ Skills)",
      isComplete: Boolean(countAllSkills(resume.skills) >= 5),
      category: "skills",
      tip: "Add at least 5 core technical skills across programming, tools, and databases."
    }
  ];

  const completedCount = items.filter(i => i.isComplete).length;
  const score = Math.round((completedCount / items.length) * 100);

  const missingCritical = items
    .filter(i => !i.isComplete && (i.id === "val-name" || i.id === "val-email" || i.id === "val-exp-exists" || i.id === "val-skills"))
    .map(i => i.label);

  return {
    score,
    isValid: score >= 60 && missingCritical.length === 0,
    items,
    missingCritical,
    totalSkillsCount: countAllSkills(resume.skills),
    totalExperienceYears: estimateExperienceYears(resume.experience)
  };
}

export function countAllSkills(skills?: Resume["skills"]): number {
  if (!skills) return 0;
  const standard = [
    ...(skills.programming || []),
    ...(skills.aiMl || []),
    ...(skills.dataScience || []),
    ...(skills.frontend || []),
    ...(skills.backend || []),
    ...(skills.databases || []),
    ...(skills.cloud || []),
    ...(skills.devops || []),
    ...(skills.tools || []),
    ...(skills.softSkills || [])
  ];
  const custom = (skills.custom || []).flatMap(c => c.skills);
  const unique = new Set([...standard, ...custom].map(s => s.trim().toLowerCase()).filter(Boolean));
  return unique.size;
}

function estimateExperienceYears(experience?: Resume["experience"]): number {
  if (!experience || experience.length === 0) return 0;
  return Math.min(15, experience.length * 1.5);
}
