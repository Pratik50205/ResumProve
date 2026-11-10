import React from "react";
import { TemplateProps, getFontFamilyClass, getSpacingStyles } from "./types";
import { formatDate } from "@/lib/utils";
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";

export const ModernProfessionalTemplate: React.FC<TemplateProps> = ({ resume, settings }) => {
  const primaryColor = settings?.primaryColor || resume.settings?.primaryColor || "#0284c7";
  const fontFamilyClass = getFontFamilyClass(settings?.fontFamily || resume.settings?.fontFamily);
  const spacing = getSpacingStyles(settings?.lineSpacing || resume.settings?.lineSpacing);
  const showIcons = settings?.showIcons ?? resume.settings?.showIcons ?? true;

  const { personal, summary, experience, projects, education, skills, certifications } = resume;

  const skillEntries = [
    { label: "Core", list: skills?.programming },
    { label: "Frameworks & AI", list: [...(skills?.aiMl || []), ...(skills?.frontend || []), ...(skills?.backend || [])] },
    { label: "Cloud & Data", list: [...(skills?.cloud || []), ...(skills?.databases || []), ...(skills?.dataScience || [])] },
    { label: "Tools", list: skills?.tools },
  ].filter((entry): entry is { label: string; list: string[] } => !!entry.list && entry.list.length > 0);

  return (
    <div className={`text-slate-900 ${fontFamilyClass} ${spacing.textLeading} select-text text-[11px]`}>
      {/* Top Header Banner */}
      <header className={`${spacing.headerPadding} border-b-2`} style={{ borderColor: primaryColor }}>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-slate-950 font-display">
              {personal.fullName || "Your Full Name"}
            </h1>
            <p className="text-xs font-bold uppercase tracking-wider mt-0.5" style={{ color: primaryColor }}>
              {personal.title || "Professional Title"}
            </p>
          </div>

          {/* Quick Contact Chips */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10.5px] text-slate-600 sm:text-right">
            {personal.email && (
              <span className="flex items-center gap-1">
                {showIcons && <Mail className="w-3 h-3 text-slate-400 no-print" />}
                <a href={`mailto:${personal.email}`} className="hover:underline">{personal.email}</a>
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
          </div>
        </div>

        {/* Links row */}
        {(personal.linkedin || personal.github || personal.portfolio) && (
          <div className="flex flex-wrap items-center gap-3 text-[10.5px] text-slate-600 mt-2 pt-1.5 border-t border-slate-100">
            {personal.linkedin && (
              <span className="flex items-center gap-1">
                {showIcons && <Linkedin className="w-3 h-3 text-slate-400 no-print" />}
                <a href={personal.linkedin} target="_blank" rel="noreferrer" className="text-slate-700 hover:underline">
                  LinkedIn
                </a>
              </span>
            )}
            {personal.github && (
              <span className="flex items-center gap-1">
                {showIcons && <Github className="w-3 h-3 text-slate-400 no-print" />}
                <a href={personal.github} target="_blank" rel="noreferrer" className="text-slate-700 hover:underline">
                  GitHub
                </a>
              </span>
            )}
            {personal.portfolio && (
              <span className="flex items-center gap-1">
                {showIcons && <Globe className="w-3 h-3 text-slate-400 no-print" />}
                <a href={personal.portfolio} target="_blank" rel="noreferrer" className="text-slate-700 hover:underline">
                  Portfolio
                </a>
              </span>
            )}
          </div>
        )}
      </header>

      {/* 2-Column Body Layout */}
      <div className="grid grid-cols-12 gap-5 mt-3.5">
        {/* Left Column (35%): Skills, Education, Certifications */}
        <aside className="col-span-12 sm:col-span-4 space-y-4 border-r-0 sm:border-r border-slate-200 sm:pr-4">
          {/* Skills */}
          {skillEntries.length > 0 && (
            <section>
              <h3
                className="text-[11px] font-bold uppercase tracking-wider pb-1 mb-2 border-b"
                style={{ color: primaryColor, borderColor: `${primaryColor}40` }}
              >
                Skills & Tech
              </h3>
              <div className="space-y-2">
                {skillEntries.map((cat) => (
                  <div key={cat.label} className="space-y-1">
                    <span className="font-bold text-[10px] text-slate-800 uppercase tracking-wide">
                      {cat.label}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {(cat.list || []).map((item, idx) => (
                        <span
                          key={idx}
                          className="bg-slate-100 text-slate-800 text-[10px] px-1.5 py-0.5 rounded font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <section>
              <h3
                className="text-[11px] font-bold uppercase tracking-wider pb-1 mb-2 border-b"
                style={{ color: primaryColor, borderColor: `${primaryColor}40` }}
              >
                Education
              </h3>
              <div className="space-y-2.5">
                {education.map((edu) => (
                  <div key={edu.id} className="print-avoid-break space-y-0.5">
                    <div className="font-bold text-slate-900 leading-tight">{edu.institution}</div>
                    <div className="text-slate-700 font-medium text-[10.5px]">{edu.degree}</div>
                    {edu.fieldOfStudy && (
                      <div className="text-slate-600 text-[10px]">{edu.fieldOfStudy}</div>
                    )}
                    <div className="text-[10px] text-slate-500 flex justify-between">
                      <span>{formatDate(edu.startDate)} – {formatDate(edu.endDate)}</span>
                      {edu.gpa && <span className="font-mono">GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <section>
              <h3
                className="text-[11px] font-bold uppercase tracking-wider pb-1 mb-2 border-b"
                style={{ color: primaryColor, borderColor: `${primaryColor}40` }}
              >
                Certifications
              </h3>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id} className="print-avoid-break space-y-0.5">
                    <div className="font-bold text-slate-900 text-[10.5px]">{cert.name}</div>
                    <div className="text-slate-600 text-[10px]">{cert.issuer}</div>
                    <div className="text-[9.5px] text-slate-500 flex justify-between">
                      {cert.issueDate && <span>{formatDate(cert.issueDate)}</span>}
                      {cert.credentialId && <span className="font-mono">ID: {cert.credentialId}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>

        {/* Right Main Column (65%): Summary, Experience, Projects */}
        <main className="col-span-12 sm:col-span-8 space-y-4">
          {/* Summary with left accent border */}
          {summary && summary.trim() && (
            <section className="bg-slate-50 p-2.5 rounded-sm border-l-2" style={{ borderColor: primaryColor }}>
              <h3 className="text-[10.5px] font-bold uppercase tracking-wider mb-1" style={{ color: primaryColor }}>
                Executive Summary
              </h3>
              <p className="text-slate-700 text-[11px] leading-relaxed">{summary}</p>
            </section>
          )}

          {/* Work Experience */}
          {experience && experience.length > 0 && (
            <section className={spacing.sectionGap}>
              <h3
                className="text-xs font-bold uppercase tracking-wider pb-1 mb-2.5 border-b"
                style={{ color: primaryColor, borderColor: `${primaryColor}40` }}
              >
                Experience & Impact
              </h3>
              <div className={spacing.itemGap}>
                {experience.map((exp) => (
                  <div key={exp.id} className="print-avoid-break space-y-1">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="font-bold text-slate-900 text-[11.5px]">{exp.title}</span>
                        <span className="text-slate-700 font-semibold"> • {exp.company}</span>
                        {exp.location && <span className="text-[10px] text-slate-500 italic"> ({exp.location})</span>}
                      </div>
                      <span className="text-[10.5px] font-medium text-slate-600 whitespace-nowrap">
                        {formatDate(exp.startDate)} – {exp.isCurrent ? "Present" : formatDate(exp.endDate)}
                      </span>
                    </div>

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
              <h3
                className="text-xs font-bold uppercase tracking-wider pb-1 mb-2.5 border-b"
                style={{ color: primaryColor, borderColor: `${primaryColor}40` }}
              >
                Key Projects & Systems
              </h3>
              <div className={spacing.itemGap}>
                {projects.map((proj) => (
                  <div key={proj.id} className="print-avoid-break space-y-1">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className="font-bold text-slate-900 text-[11.5px]">{proj.name}</span>
                        {proj.technologies && proj.technologies.length > 0 && (
                          <span className="text-[10px] text-slate-500 font-mono">
                            [{proj.technologies.slice(0, 5).join(", ")}]
                          </span>
                        )}
                      </div>
                      {(proj.githubUrl || proj.liveUrl) && (
                        <div className="text-[10px] text-slate-500 flex gap-2 no-print">
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
                      <ul className={`list-disc list-outside ml-4 ${spacing.bulletGap} text-slate-700`}>
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
        </main>
      </div>
    </div>
  );
};

