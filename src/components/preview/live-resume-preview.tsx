"use client";

import React, { forwardRef } from "react";
import { Resume, TemplateId } from "@/types/resume";
import { formatDate } from "@/lib/utils";
import { Mail, Phone, MapPin, Linkedin, Github, Globe, ExternalLink } from "lucide-react";

interface LiveResumePreviewProps {
  resume: Resume;
  zoom?: number;
  templateOverride?: TemplateId;
}

export const LiveResumePreview = forwardRef<HTMLDivElement, LiveResumePreviewProps>(
  ({ resume, zoom = 100, templateOverride }, ref) => {
    const template = templateOverride || resume.settings?.template || "tech-specialist";
    const primaryColor = resume.settings?.primaryColor || "#4f46e5";

    const { personal, summary, experience, projects, education, skills, certifications } = resume;

    // Collect all skill tags grouped nicely
    const standardSkillCategories = [
      { label: "Programming", list: skills?.programming },
      { label: "AI & ML", list: skills?.aiMl },
      { label: "Data Science", list: skills?.dataScience },
      { label: "Frontend", list: skills?.frontend },
      { label: "Backend", list: skills?.backend },
      { label: "Databases", list: skills?.databases },
      { label: "Cloud & DevOps", list: [...(skills?.cloud || []), ...(skills?.devops || [])] },
      { label: "Tools", list: skills?.tools },
      { label: "Soft Skills", list: skills?.softSkills }
    ].filter(cat => cat.list && cat.list.length > 0);

    return (
      <div className="flex justify-center w-full overflow-auto p-2 sm:p-4">
        {/* Printable A4 Resume Canvas Container */}
        <div
          ref={ref}
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: "top center",
          }}
          className="w-[210mm] min-h-[297mm] bg-white text-slate-900 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.06)] ring-1 ring-slate-200/80 p-[18mm] sm:p-[20mm] rounded-sm transition-transform duration-150 print:shadow-none print:ring-0 print:m-0 print:p-0 print:w-full print:transform-none select-text"
        >
          {/* Header Area */}
          <header className="border-b pb-4 mb-4" style={{ borderColor: `${primaryColor}30` }}>
            <h1
              className="text-2xl font-black tracking-tight leading-tight uppercase font-display"
              style={{ color: primaryColor }}
            >
              {personal.fullName || "Your Full Name"}
            </h1>
            <h2 className="text-sm font-semibold text-slate-700 mt-0.5 tracking-wide">
              {personal.title || "Professional Title"}
            </h2>

            {/* Contact Details Bar */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-600 mt-2.5">
              {personal.email && (
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-slate-400 no-print" />
                  <a href={`mailto:${personal.email}`} className="hover:underline">{personal.email}</a>
                </span>
              )}
              {personal.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-400 no-print" />
                  <span>{personal.phone}</span>
                </span>
              )}
              {personal.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400 no-print" />
                  <span>{personal.location}</span>
                </span>
              )}
              {personal.linkedin && (
                <span className="flex items-center gap-1">
                  <Linkedin className="w-3 h-3 text-slate-400 no-print" />
                  <a href={personal.linkedin} target="_blank" rel="noreferrer" className="hover:underline text-slate-700">
                    LinkedIn
                  </a>
                </span>
              )}
              {personal.github && (
                <span className="flex items-center gap-1">
                  <Github className="w-3 h-3 text-slate-400 no-print" />
                  <a href={personal.github} target="_blank" rel="noreferrer" className="hover:underline text-slate-700">
                    GitHub
                  </a>
                </span>
              )}
              {personal.portfolio && (
                <span className="flex items-center gap-1">
                  <Globe className="w-3 h-3 text-slate-400 no-print" />
                  <a href={personal.portfolio} target="_blank" rel="noreferrer" className="hover:underline text-slate-700">
                    Portfolio
                  </a>
                </span>
              )}
            </div>
          </header>

          {/* Professional Summary */}
          {summary && summary.trim() && (
            <section className="mb-4">
              <h3
                className="text-xs font-bold uppercase tracking-wider mb-1.5 pb-0.5 border-b"
                style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
              >
                Professional Summary
              </h3>
              <p className="text-[11.5px] text-slate-700 leading-relaxed text-justify">
                {summary}
              </p>
            </section>
          )}

          {/* Technical Skills Section */}
          {standardSkillCategories.length > 0 && (
            <section className="mb-4">
              <h3
                className="text-xs font-bold uppercase tracking-wider mb-1.5 pb-0.5 border-b"
                style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
              >
                Technical & Domain Skills
              </h3>
              <div className="space-y-1 text-[11px]">
                {standardSkillCategories.map((cat) => (
                  <div key={cat.label} className="flex leading-tight">
                    <span className="font-bold text-slate-900 w-32 flex-shrink-0">
                      {cat.label}:
                    </span>
                    <span className="text-slate-700">
                      {(cat.list || []).join(", ")}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Work Experience Section */}
          {experience && experience.length > 0 && (
            <section className="mb-4">
              <h3
                className="text-xs font-bold uppercase tracking-wider mb-2 pb-0.5 border-b"
                style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
              >
                Professional Experience
              </h3>

              <div className="space-y-3">
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="font-bold text-xs text-slate-900">{exp.title}</span>
                        <span className="text-xs text-slate-700"> — {exp.company}</span>
                        {exp.location && <span className="text-[11px] text-slate-500 italic"> ({exp.location})</span>}
                      </div>
                      <span className="text-[11px] font-medium text-slate-600 whitespace-nowrap">
                        {formatDate(exp.startDate)} – {exp.isCurrent ? "Present" : formatDate(exp.endDate)}
                      </span>
                    </div>

                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="list-disc list-outside ml-4 space-y-0.5 text-[11px] text-slate-700 leading-relaxed">
                        {exp.bullets.filter(Boolean).map((bullet, bIdx) => (
                          <li key={bIdx} className="pl-0.5">
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

          {/* Projects Section */}
          {projects && projects.length > 0 && (
            <section className="mb-4">
              <h3
                className="text-xs font-bold uppercase tracking-wider mb-2 pb-0.5 border-b"
                style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
              >
                Key Projects & Systems
              </h3>

              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="space-y-1">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-slate-900">{proj.name}</span>
                        {proj.technologies && proj.technologies.length > 0 && (
                          <span className="text-[10px] text-slate-500 font-mono">
                            [{proj.technologies.join(", ")}]
                          </span>
                        )}
                      </div>
                      {proj.liveUrl || proj.githubUrl ? (
                        <div className="flex items-center gap-2 text-[10px] text-slate-500 no-print">
                          {proj.githubUrl && <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="hover:underline">Code</a>}
                          {proj.liveUrl && <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="hover:underline font-semibold">Demo</a>}
                        </div>
                      ) : null}
                    </div>

                    {proj.bullets && proj.bullets.length > 0 && (
                      <ul className="list-disc list-outside ml-4 space-y-0.5 text-[11px] text-slate-700 leading-relaxed">
                        {proj.bullets.filter(Boolean).map((bullet, bIdx) => (
                          <li key={bIdx} className="pl-0.5">
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

          {/* Education Section */}
          {education && education.length > 0 && (
            <section className="mb-4">
              <h3
                className="text-xs font-bold uppercase tracking-wider mb-1.5 pb-0.5 border-b"
                style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
              >
                Education
              </h3>

              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id} className="flex items-baseline justify-between text-[11.5px]">
                    <div>
                      <span className="font-bold text-slate-900">{edu.institution}</span>
                      <span className="text-slate-700"> — {edu.degree}</span>
                      {edu.fieldOfStudy && edu.fieldOfStudy !== edu.degree && (
                        <span className="text-slate-600"> ({edu.fieldOfStudy})</span>
                      )}
                      {edu.gpa && <span className="text-slate-500 font-mono text-[10.5px]"> • GPA: {edu.gpa}</span>}
                    </div>
                    <span className="text-[11px] text-slate-600 whitespace-nowrap">
                      {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications Section */}
          {certifications && certifications.length > 0 && (
            <section className="mb-2">
              <h3
                className="text-xs font-bold uppercase tracking-wider mb-1 pb-0.5 border-b"
                style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
              >
                Certifications & Credentials
              </h3>

              <div className="space-y-1 text-[11px]">
                {certifications.map((cert) => (
                  <div key={cert.id} className="flex items-baseline justify-between">
                    <div>
                      <span className="font-bold text-slate-900">{cert.name}</span>
                      <span className="text-slate-600"> — {cert.issuer}</span>
                      {cert.credentialId && (
                        <span className="text-slate-400 font-mono text-[10px]"> (ID: {cert.credentialId})</span>
                      )}
                    </div>
                    {cert.issueDate && (
                      <span className="text-[10.5px] text-slate-500 whitespace-nowrap">
                        {formatDate(cert.issueDate)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }
);

LiveResumePreview.displayName = "LiveResumePreview";
