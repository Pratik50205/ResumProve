import React from "react";
import { TemplateProps, getFontFamilyClass, getSpacingStyles } from "./types";
import { formatDate } from "@/lib/utils";
import { Mail, Phone, MapPin, Linkedin, Github, Globe, GraduationCap } from "lucide-react";

export const StudentFresherTemplate: React.FC<TemplateProps> = ({ resume, settings }) => {
  const primaryColor = settings?.primaryColor || resume.settings?.primaryColor || "#7c3aed";
  const fontFamilyClass = getFontFamilyClass(settings?.fontFamily || resume.settings?.fontFamily);
  const spacing = getSpacingStyles(settings?.lineSpacing || resume.settings?.lineSpacing);
  const showIcons = settings?.showIcons ?? resume.settings?.showIcons ?? true;

  const { personal, summary, experience, projects, education, skills, certifications, coursework } = resume;

  const standardSkillCategories = [
    { label: "Languages", list: skills?.programming },
    { label: "Core Concepts & AI", list: [...(skills?.aiMl || []), ...(skills?.dataScience || [])] },
    { label: "Web Technologies", list: [...(skills?.frontend || []), ...(skills?.backend || [])] },
    { label: "Databases & Cloud", list: [...(skills?.databases || []), ...(skills?.cloud || [])] },
    { label: "Developer Tools", list: skills?.tools },
  ].filter(cat => cat.list && cat.list.length > 0);

  return (
    <div className={`text-slate-900 ${fontFamilyClass} ${spacing.textLeading} select-text text-[11px]`}>
      {/* Header */}
      <header className={`text-center ${spacing.headerPadding} border-b-2`} style={{ borderColor: primaryColor }}>
        <h1 className="text-2xl font-black uppercase tracking-tight text-slate-950 font-display">
          {personal.fullName || "Your Full Name"}
        </h1>
        {personal.title && (
          <p className="text-xs font-semibold text-slate-700 mt-0.5 tracking-wide">
            {personal.title}
          </p>
        )}

        {/* Contact Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-3.5 gap-y-1 text-[10.5px] text-slate-600 mt-2">
          {personal.email && (
            <span className="flex items-center gap-1">
              {showIcons && <Mail className="w-3 h-3 text-slate-400 no-print" />}
              <a href={`mailto:${personal.email}`} className="text-slate-800 hover:underline">
                {personal.email}
              </a>
            </span>
          )}
          {personal.phone && (
            <span className="flex items-center gap-1">
              {showIcons && <Phone className="w-3 h-3 text-slate-400 no-print" />}
              <span>{personal.phone}</span>
            </span>
          )}
          {personal.location && (
            <span className="flex items-center gap-1">
              {showIcons && <MapPin className="w-3 h-3 text-slate-400 no-print" />}
              <span>{personal.location}</span>
            </span>
          )}
          {personal.github && (
            <span className="flex items-center gap-1">
              {showIcons && <Github className="w-3 h-3 text-slate-400 no-print" />}
              <a href={personal.github} target="_blank" rel="noreferrer" className="text-slate-800 hover:underline">
                github.com/{personal.github.replace(/^https?:\/\/(www\.)?github\.com\/?/, "")}
              </a>
            </span>
          )}
          {personal.linkedin && (
            <span className="flex items-center gap-1">
              {showIcons && <Linkedin className="w-3 h-3 text-slate-400 no-print" />}
              <a href={personal.linkedin} target="_blank" rel="noreferrer" className="text-slate-800 hover:underline">
                LinkedIn
              </a>
            </span>
          )}
          {personal.portfolio && (
            <span className="flex items-center gap-1">
              {showIcons && <Globe className="w-3 h-3 text-slate-400 no-print" />}
              <a href={personal.portfolio} target="_blank" rel="noreferrer" className="text-slate-800 hover:underline">
                Portfolio
              </a>
            </span>
          )}
        </div>
      </header>

      {/* Summary / Objective (if provided) */}
      {summary && summary.trim() && (
        <section className={spacing.sectionGap}>
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-1 border-b"
            style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
          >
            Academic & Career Focus
          </h2>
          <p className="text-slate-700 leading-relaxed text-justify">{summary}</p>
        </section>
      )}

      {/* 1. Education FIRST: Priority for Students & Freshers */}
      {education && education.length > 0 && (
        <section className={spacing.sectionGap}>
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-2 border-b flex items-center justify-between"
            style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
          >
            <span>Education & Academic Background</span>
            {showIcons && <GraduationCap className="w-3.5 h-3.5 text-slate-400 no-print" />}
          </h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="print-avoid-break space-y-0.5">
                <div className="flex items-baseline justify-between text-[11.5px]">
                  <div>
                    <span className="font-bold text-slate-950">{edu.institution}</span>
                    {edu.location && <span className="text-slate-500 italic text-[10px]"> — {edu.location}</span>}
                  </div>
                  <span className="text-slate-700 font-medium text-[10.5px]">
                    {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                  </span>
                </div>
                <div className="flex items-baseline justify-between text-slate-800 text-[11px]">
                  <span>
                    <strong className="font-semibold">{edu.degree}</strong>
                    {edu.fieldOfStudy && <span> in {edu.fieldOfStudy}</span>}
                  </span>
                  {edu.gpa && (
                    <span className="font-semibold text-slate-900 bg-slate-100 px-1.5 py-0.2 rounded text-[10px]">
                      GPA: {edu.gpa}
                    </span>
                  )}
                </div>
                {edu.honors && edu.honors.length > 0 && (
                  <p className="text-[10px] text-slate-600">
                    <span className="font-semibold text-slate-700">Honors & Awards: </span>
                    {edu.honors.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 2. Technical Skills */}
      {standardSkillCategories.length > 0 && (
        <section className={spacing.sectionGap}>
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b"
            style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
          >
            Technical & Foundational Skills
          </h2>
          <div className="space-y-1">
            {standardSkillCategories.map((cat) => (
              <div key={cat.label} className="leading-snug">
                <span className="font-bold text-slate-900 w-32 inline-block">{cat.label}: </span>
                <span className="text-slate-700">{(cat.list || []).join(", ")}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. Projects & Capstone Systems */}
      {projects && projects.length > 0 && (
        <section className={spacing.sectionGap}>
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-2 border-b"
            style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
          >
            Academic, Capstone & Open Source Projects
          </h2>
          <div className={spacing.itemGap}>
            {projects.map((proj) => (
              <div key={proj.id} className="print-avoid-break space-y-1">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="font-bold text-slate-950 text-[11.5px]">{proj.name}</span>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <span className="text-slate-600 font-mono text-[10px]">
                        | {proj.technologies.join(", ")}
                      </span>
                    )}
                  </div>
                  {(proj.githubUrl || proj.liveUrl) && (
                    <div className="text-[10px] text-slate-500 flex gap-2 no-print">
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="hover:underline font-medium">
                          Source
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="hover:underline font-semibold text-slate-700">
                          Live Demo
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {proj.bullets && proj.bullets.length > 0 && (
                  <ul className={`list-disc list-outside ml-4 ${spacing.bulletGap} text-slate-700 leading-relaxed`}>
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

      {/* 4. Practical Experience / Internships */}
      {experience && experience.length > 0 && (
        <section className={spacing.sectionGap}>
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-2 border-b"
            style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
          >
            Internships & Work Experience
          </h2>
          <div className={spacing.itemGap}>
            {experience.map((exp) => (
              <div key={exp.id} className="print-avoid-break space-y-1">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="font-bold text-slate-950">{exp.title}</span>
                    <span className="text-slate-700"> — {exp.company}</span>
                    {exp.location && <span className="text-slate-500 italic text-[10px]"> ({exp.location})</span>}
                  </div>
                  <span className="text-slate-600 text-[10.5px] font-medium whitespace-nowrap">
                    {formatDate(exp.startDate)} – {exp.isCurrent ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>

                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className={`list-disc list-outside ml-4 ${spacing.bulletGap} text-slate-700 leading-relaxed`}>
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

      {/* 5. Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="print-avoid-break">
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b"
            style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
          >
            Certifications & Training
          </h2>
          <div className="space-y-1">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex items-baseline justify-between text-slate-700">
                <div>
                  <span className="font-bold text-slate-900">{cert.name}</span>
                  <span> — {cert.issuer}</span>
                  {cert.credentialId && <span className="text-slate-500 font-mono text-[9.5px]"> (ID: {cert.credentialId})</span>}
                </div>
                {cert.issueDate && <span className="text-[10px] text-slate-500">{formatDate(cert.issueDate)}</span>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

