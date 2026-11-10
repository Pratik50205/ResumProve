import React from "react";
import { TemplateProps, getFontFamilyClass, getSpacingStyles } from "./types";
import { formatDate } from "@/lib/utils";

export const AtsMinimalTemplate: React.FC<TemplateProps> = ({ resume, settings }) => {
  const primaryColor = settings?.primaryColor || resume.settings?.primaryColor || "#0f172a";
  const fontFamilyClass = getFontFamilyClass(settings?.fontFamily || resume.settings?.fontFamily);
  const spacing = getSpacingStyles(settings?.lineSpacing || resume.settings?.lineSpacing);

  const { personal, summary, experience, projects, education, skills, certifications } = resume;

  const standardSkillCategories = [
    { label: "Programming", list: skills?.programming },
    { label: "AI & ML", list: skills?.aiMl },
    { label: "Data Science", list: skills?.dataScience },
    { label: "Frontend", list: skills?.frontend },
    { label: "Backend", list: skills?.backend },
    { label: "Databases", list: skills?.databases },
    { label: "Cloud & DevOps", list: [...(skills?.cloud || []), ...(skills?.devops || [])] },
    { label: "Mobile", list: skills?.mobile },
    { label: "Testing & QA", list: skills?.testing },
    { label: "Security & Systems", list: [...(skills?.cybersecurity || []), ...(skills?.systemDesign || [])] },
    { label: "Tools", list: skills?.tools },
    { label: "Soft Skills", list: skills?.softSkills },
  ].filter((cat) => cat.list && cat.list.length > 0);

  return (
    <div className={`text-slate-900 ${fontFamilyClass} ${spacing.textLeading} select-text text-[11px]`}>
      {/* Header: Centered Classic ATS Format */}
      <header className={`text-center ${spacing.headerPadding} border-b border-slate-300`}>
        <h1 className="text-2xl font-bold uppercase tracking-wide text-slate-950 font-display">
          {personal.fullName || "Your Full Name"}
        </h1>
        {personal.title && (
          <p className="text-xs font-semibold text-slate-700 mt-1 uppercase tracking-wider">
            {personal.title}
          </p>
        )}

        {/* Contact Line with bullet separators */}
        <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[10.5px] text-slate-600 mt-2">
          {personal.location && <span>{personal.location}</span>}
          {personal.phone && (
            <>
              <span>•</span>
              <span>{personal.phone}</span>
            </>
          )}
          {personal.email && (
            <>
              <span>•</span>
              <a href={`mailto:${personal.email}`} className="text-slate-800 hover:underline">
                {personal.email}
              </a>
            </>
          )}
          {personal.linkedin && (
            <>
              <span>•</span>
              <a href={personal.linkedin} target="_blank" rel="noreferrer" className="text-slate-800 hover:underline">
                LinkedIn
              </a>
            </>
          )}
          {personal.github && (
            <>
              <span>•</span>
              <a href={personal.github} target="_blank" rel="noreferrer" className="text-slate-800 hover:underline">
                GitHub
              </a>
            </>
          )}
          {personal.portfolio && (
            <>
              <span>•</span>
              <a href={personal.portfolio} target="_blank" rel="noreferrer" className="text-slate-800 hover:underline">
                Portfolio
              </a>
            </>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {summary && summary.trim() && (
        <section className={spacing.sectionGap}>
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b-2"
            style={{ borderColor: primaryColor, color: primaryColor }}
          >
            Professional Summary
          </h2>
          <p className="text-slate-700 text-justify">{summary}</p>
        </section>
      )}

      {/* Skills Section */}
      {standardSkillCategories.length > 0 && (
        <section className={spacing.sectionGap}>
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b-2"
            style={{ borderColor: primaryColor, color: primaryColor }}
          >
            Technical & Domain Skills
          </h2>
          <div className="space-y-1">
            {standardSkillCategories.map((cat) => (
              <div key={cat.label} className="leading-snug">
                <span className="font-bold text-slate-950">{cat.label}: </span>
                <span className="text-slate-700">{(cat.list || []).join(", ")}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Work Experience */}
      {experience && experience.length > 0 && (
        <section className={spacing.sectionGap}>
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-2 border-b-2"
            style={{ borderColor: primaryColor, color: primaryColor }}
          >
            Professional Experience
          </h2>
          <div className={spacing.itemGap}>
            {experience.map((exp) => (
              <div key={exp.id} className="print-avoid-break">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="font-bold text-slate-950">{exp.company}</span>
                    {exp.location && <span className="text-slate-600"> — {exp.location}</span>}
                  </div>
                  <span className="font-semibold text-slate-700 text-[10.5px]">
                    {formatDate(exp.startDate)} – {exp.isCurrent ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>
                <div className="italic text-slate-800 font-medium mb-1">{exp.title}</div>

                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className={`list-disc list-outside ml-4 ${spacing.bulletGap} text-slate-700`}>
                    {exp.bullets.filter(Boolean).map((bullet, idx) => (
                      <li key={idx} className="pl-0.5">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className={spacing.sectionGap}>
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-2 border-b-2"
            style={{ borderColor: primaryColor, color: primaryColor }}
          >
            Technical Projects
          </h2>
          <div className={spacing.itemGap}>
            {projects.map((proj) => (
              <div key={proj.id} className="print-avoid-break">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="font-bold text-slate-950">{proj.name}</span>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <span className="text-slate-600 font-medium text-[10px]">
                        ({proj.technologies.join(", ")})
                      </span>
                    )}
                  </div>
                  {(proj.githubUrl || proj.liveUrl) && (
                    <div className="text-[10px] text-slate-600 flex gap-2">
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="hover:underline">
                          Code
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="hover:underline font-semibold">
                          Demo
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {proj.bullets && proj.bullets.length > 0 && (
                  <ul className={`list-disc list-outside ml-4 mt-1 ${spacing.bulletGap} text-slate-700`}>
                    {proj.bullets.filter(Boolean).map((bullet, idx) => (
                      <li key={idx} className="pl-0.5">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className={spacing.sectionGap}>
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-2 border-b-2"
            style={{ borderColor: primaryColor, color: primaryColor }}
          >
            Education
          </h2>
          <div className="space-y-1.5">
            {education.map((edu) => (
              <div key={edu.id} className="print-avoid-break flex items-baseline justify-between">
                <div>
                  <span className="font-bold text-slate-950">{edu.institution}</span>
                  <span className="text-slate-700"> — {edu.degree}</span>
                  {edu.fieldOfStudy && edu.fieldOfStudy !== edu.degree && (
                    <span className="text-slate-600"> in {edu.fieldOfStudy}</span>
                  )}
                  {edu.gpa && <span className="text-slate-600 font-mono text-[10px]"> (GPA: {edu.gpa})</span>}
                </div>
                <span className="text-slate-700 text-[10.5px] font-medium whitespace-nowrap">
                  {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section className={spacing.sectionGap}>
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b-2"
            style={{ borderColor: primaryColor, color: primaryColor }}
          >
            Certifications
          </h2>
          <div className="space-y-1">
            {certifications.map((cert) => (
              <div key={cert.id} className="print-avoid-break flex items-baseline justify-between text-slate-700">
                <div>
                  <span className="font-bold text-slate-950">{cert.name}</span>
                  <span> — {cert.issuer}</span>
                  {cert.credentialId && <span className="text-slate-500 font-mono text-[10px]"> (ID: {cert.credentialId})</span>}
                </div>
                {cert.issueDate && <span className="text-[10px] text-slate-600">{formatDate(cert.issueDate)}</span>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

