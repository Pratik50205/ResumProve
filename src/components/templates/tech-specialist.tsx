import React from "react";
import { TemplateProps, getFontFamilyClass, getSpacingStyles } from "./types";
import { formatDate } from "@/lib/utils";
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";

export const TechSpecialistTemplate: React.FC<TemplateProps> = ({ resume, settings }) => {
  const primaryColor = settings?.primaryColor || resume.settings?.primaryColor || "#4f46e5";
  const fontFamilyClass = getFontFamilyClass(settings?.fontFamily || resume.settings?.fontFamily);
  const spacing = getSpacingStyles(settings?.lineSpacing || resume.settings?.lineSpacing);
  const showIcons = settings?.showIcons ?? resume.settings?.showIcons ?? true;

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
    { label: "Soft Skills", list: skills?.softSkills }
  ].filter(cat => cat.list && cat.list.length > 0);

  return (
    <div className={`text-slate-900 ${fontFamilyClass} ${spacing.textLeading} select-text text-[11px]`}>
      {/* Header Area */}
      <header className={`border-b pb-3 mb-3`} style={{ borderColor: `${primaryColor}30` }}>
        <div className="flex justify-between items-baseline flex-wrap gap-2">
          <div>
            <h1
              className="text-2xl font-black tracking-tight leading-tight uppercase font-display"
              style={{ color: primaryColor }}
            >
              {personal.fullName || "Your Full Name"}
            </h1>
            <h2 className="text-xs font-bold text-slate-800 tracking-wider uppercase mt-0.5">
              {personal.title || "Software & AI Engineer"}
            </h2>
          </div>

          {/* Contact Details Bar */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10.5px] text-slate-600">
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
            {personal.github && (
              <span className="flex items-center gap-1">
                {showIcons && <Github className="w-3 h-3 text-slate-400 no-print" />}
                <a href={personal.github} target="_blank" rel="noreferrer" className="hover:underline text-slate-800 font-medium">
                  GitHub
                </a>
              </span>
            )}
            {personal.linkedin && (
              <span className="flex items-center gap-1">
                {showIcons && <Linkedin className="w-3 h-3 text-slate-400 no-print" />}
                <a href={personal.linkedin} target="_blank" rel="noreferrer" className="hover:underline text-slate-800 font-medium">
                  LinkedIn
                </a>
              </span>
            )}
            {personal.portfolio && (
              <span className="flex items-center gap-1">
                {showIcons && <Globe className="w-3 h-3 text-slate-400 no-print" />}
                <a href={personal.portfolio} target="_blank" rel="noreferrer" className="hover:underline text-slate-800 font-medium">
                  Portfolio
                </a>
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Professional Summary */}
      {summary && summary.trim() && (
        <section className={spacing.sectionGap}>
          <h3
            className="text-[11px] font-bold uppercase tracking-wider mb-1 pb-0.5 border-b"
            style={{ color: primaryColor, borderColor: `${primaryColor}25` }}
          >
            Engineering Profile
          </h3>
          <p className="text-[11px] text-slate-700 leading-relaxed text-justify">
            {summary}
          </p>
        </section>
      )}

      {/* Technical Skills Section - Highlighted Monospace & Category Tags */}
      {standardSkillCategories.length > 0 && (
        <section className={spacing.sectionGap}>
          <h3
            className="text-[11px] font-bold uppercase tracking-wider mb-1.5 pb-0.5 border-b"
            style={{ color: primaryColor, borderColor: `${primaryColor}25` }}
          >
            Core Technical Proficiencies
          </h3>
          <div className="space-y-1 text-[10.5px]">
            {standardSkillCategories.map((cat) => (
              <div key={cat.label} className="flex items-baseline leading-snug">
                <span className="font-bold text-slate-900 w-32 flex-shrink-0 text-[10.5px]">
                  {cat.label}:
                </span>
                <span className="text-slate-700 font-mono text-[10px]">
                  {(cat.list || []).join("  •  ")}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Work Experience Section */}
      {experience && experience.length > 0 && (
        <section className={spacing.sectionGap}>
          <h3
            className="text-[11px] font-bold uppercase tracking-wider mb-2 pb-0.5 border-b"
            style={{ color: primaryColor, borderColor: `${primaryColor}25` }}
          >
            Technical Experience & Systems Built
          </h3>

          <div className={spacing.itemGap}>
            {experience.map((exp) => (
              <div key={exp.id} className="print-avoid-break space-y-1">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="font-bold text-[11.5px] text-slate-950">{exp.title}</span>
                    <span className="text-[11.5px] text-slate-700"> — {exp.company}</span>
                    {exp.location && <span className="text-[10px] text-slate-500 italic"> ({exp.location})</span>}
                  </div>
                  <span className="text-[10px] font-mono font-medium text-slate-600 whitespace-nowrap">
                    {formatDate(exp.startDate)} – {exp.isCurrent ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>

                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className={`list-disc list-outside ml-4 ${spacing.bulletGap} text-[11px] text-slate-700 leading-relaxed`}>
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
        <section className={spacing.sectionGap}>
          <h3
            className="text-[11px] font-bold uppercase tracking-wider mb-2 pb-0.5 border-b"
            style={{ color: primaryColor, borderColor: `${primaryColor}25` }}
          >
            Architectural Projects & Open Source
          </h3>

          <div className={spacing.itemGap}>
            {projects.map((proj) => (
              <div key={proj.id} className="print-avoid-break space-y-1">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-bold text-[11.5px] text-slate-950">{proj.name}</span>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <span className="text-[10px] text-slate-500 font-mono">
                        [{proj.technologies.join(", ")}]
                      </span>
                    )}
                  </div>
                  {(proj.githubUrl || proj.liveUrl) && (
                    <div className="flex items-center gap-2 text-[10px] text-slate-600 no-print">
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="hover:underline font-mono">
                          Source
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="hover:underline font-semibold font-mono">
                          Deploy
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {proj.bullets && proj.bullets.length > 0 && (
                  <ul className={`list-disc list-outside ml-4 ${spacing.bulletGap} text-[11px] text-slate-700 leading-relaxed`}>
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
        <section className={spacing.sectionGap}>
          <h3
            className="text-[11px] font-bold uppercase tracking-wider mb-1.5 pb-0.5 border-b"
            style={{ color: primaryColor, borderColor: `${primaryColor}25` }}
          >
            Education & Academic Credentials
          </h3>

          <div className="space-y-1.5">
            {education.map((edu) => (
              <div key={edu.id} className="print-avoid-break flex items-baseline justify-between text-[11px]">
                <div>
                  <span className="font-bold text-slate-900">{edu.institution}</span>
                  <span className="text-slate-700"> — {edu.degree}</span>
                  {edu.fieldOfStudy && edu.fieldOfStudy !== edu.degree && (
                    <span className="text-slate-600"> ({edu.fieldOfStudy})</span>
                  )}
                  {edu.gpa && <span className="text-slate-500 font-mono text-[10px]"> • GPA: {edu.gpa}</span>}
                </div>
                <span className="text-[10px] font-mono text-slate-600 whitespace-nowrap">
                  {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications Section */}
      {certifications && certifications.length > 0 && (
        <section className="print-avoid-break">
          <h3
            className="text-[11px] font-bold uppercase tracking-wider mb-1 pb-0.5 border-b"
            style={{ color: primaryColor, borderColor: `${primaryColor}25` }}
          >
            Certifications & Technical Credentials
          </h3>

          <div className="space-y-1 text-[10.5px]">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex items-baseline justify-between">
                <div>
                  <span className="font-bold text-slate-900">{cert.name}</span>
                  <span className="text-slate-600"> — {cert.issuer}</span>
                  {cert.credentialId && (
                    <span className="text-slate-400 font-mono text-[9.5px]"> (ID: {cert.credentialId})</span>
                  )}
                </div>
                {cert.issueDate && (
                  <span className="text-[10px] font-mono text-slate-500 whitespace-nowrap">
                    {formatDate(cert.issueDate)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

