"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LayoutTemplate,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Eye,
  Sliders,
  FileCheck,
  Zap,
  Printer,
  ChevronRight,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TemplateId } from "@/types/resume";
import { SAMPLE_RESUMES } from "@/data/sampleResumes";
import { LiveResumePreview } from "@/components/preview/live-resume-preview";

interface TemplateMeta {
  id: TemplateId;
  name: string;
  tag: string;
  parseRate: string;
  recommendedFor: string;
  description: string;
  highlights: string[];
  color: string;
  sampleKey: string;
}

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>("tech-specialist");
  const [previewSampleKey, setPreviewSampleKey] = useState<string>("ml-engineer");
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);

  const templates: TemplateMeta[] = [
    {
      id: "ats-minimal",
      name: "ATS Minimal",
      tag: "Single-Column Standard",
      parseRate: "99.8%",
      recommendedFor: "Enterprise, Finance & Conservative Industries",
      description:
        "The gold standard for enterprise ATS scanners. Linear single-column flow with classic divider rules, standard bullet delimiters, and zero multi-column parsing traps.",
      highlights: [
        "100% linear single-column flow",
        "Universal parser compatibility (Workday, Taleo, Greenhouse)",
        "Compact text-density mode fits extensive careers on 1–2 pages",
        "Standard bullet structures for flawless OCR text extraction",
      ],
      color: "border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
      sampleKey: "data-analyst",
    },
    {
      id: "modern-professional",
      name: "Modern Professional",
      tag: "Executive 2-Column",
      parseRate: "97.4%",
      recommendedFor: "Managers, Full-Stack Devs & Product Leaders",
      description:
        "Sophisticated dual-column structure pairing an executive sidebar (skills, credentials, academics) with a high-impact career progression timeline.",
      highlights: [
        "Executive sidebar layout with high visual hierarchy",
        "Summary block with distinct left-edge branding accent",
        "Categorized skill pills and credential ID verification tags",
        "Balanced aesthetic that excels in human recruiter review",
      ],
      color: "border-sky-500/30 text-sky-600 dark:text-sky-400",
      sampleKey: "software-engineer",
    },
    {
      id: "tech-specialist",
      name: "Tech Specialist",
      tag: "Code & Projects Focused",
      parseRate: "98.2%",
      recommendedFor: "Software Engineers, ML/AI & Cloud Architects",
      description:
        "Engineered for deep technical roles. Positions programming stacks, repositories, live deployments, and measurable system impacts at the core.",
      highlights: [
        "Monospace typography accents for tech stacks & frameworks",
        "Dedicated repository source and live demo hyperlinks",
        "Prominent technical competencies block directly below header",
        "Engineered for metric-dense engineering bullets",
      ],
      color: "border-indigo-500/30 text-brand-600 dark:text-brand-400",
      sampleKey: "ml-engineer",
    },
    {
      id: "student-fresher",
      name: "Student / Fresher",
      tag: "Academics & Skills Focused",
      parseRate: "98.6%",
      recommendedFor: "Graduates, Interns & Career Changers",
      description:
        "Strategically puts education, honors, coursework, and capstone projects first, allowing early-career candidates to highlight academic excellence without extensive work history.",
      highlights: [
        "Education, GPA & Honors prominently positioned first",
        "Capstone and academic projects featured before internships",
        "Curated foundational tech proficiencies section",
        "Optimized to create a full 1-page resume without artificial fluff",
      ],
      color: "border-purple-500/30 text-purple-600 dark:text-purple-400",
      sampleKey: "fresher",
    },
  ];

  const activeTemplateMeta = templates.find((t) => t.id === selectedTemplate) || templates[0];
  const activeResumeData = SAMPLE_RESUMES[previewSampleKey] || SAMPLE_RESUMES["ml-engineer"];

  const handleOpenPreview = (tplId: TemplateId, sampleKey: string) => {
    setSelectedTemplate(tplId);
    setPreviewSampleKey(sampleKey);
    setIsPreviewOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3.5">
        <Badge variant="brand" size="md">
          Phase 3 Complete • Multi-Template Engine
        </Badge>
        <h1 className="font-display text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          ATS-Optimized Vector Templates
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
          Four distinct, production-grade templates sharing the unified ResumProve data model. Engineered with 100% selectable vector text, standard semantic hierarchies, and A4 print stylesheets.
        </p>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((tpl) => (
          <div
            key={tpl.id}
            className="rounded-3xl surface-card p-6 sm:p-7 flex flex-col justify-between space-y-5 border border-slate-200 dark:border-slate-800 hover:border-brand-500/40 transition-all duration-200 shadow-lg"
          >
            <div className="space-y-4">
              {/* Header row */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {tpl.tag}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-500/20">
                      {tpl.parseRate} ATS Score
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white pt-1">
                    {tpl.name}
                  </h3>
                </div>

                <div className="w-10 h-10 rounded-2xl bg-brand-50 dark:bg-brand-950/40 border border-brand-500/20 flex items-center justify-center text-brand-600 dark:text-brand-400 flex-shrink-0">
                  <LayoutTemplate className="w-5 h-5" />
                </div>
              </div>

              {/* Best for */}
              <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                <span className="font-bold text-slate-900 dark:text-slate-200">Recommended for: </span>
                {tpl.recommendedFor}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {tpl.description}
              </p>

              {/* Highlights List */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                {tpl.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleOpenPreview(tpl.id, tpl.sampleKey)}
                className="flex-1 gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Live Preview</span>
              </Button>

              <Link href={`/builder?template=${tpl.id}`} className="flex-1">
                <Button variant="primary" size="sm" className="w-full gap-1.5 shadow-brand-500/20">
                  <span>Use Template</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* ATS Verification Standards Card */}
      <div className="rounded-3xl surface-card p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span>ResumProve ATS Verification Guarantee</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Every template is continuously tested against leading applicant tracking engines to prevent silent filter rejections.
            </p>
          </div>
          <Link href="/builder">
            <Button variant="primary" size="md" className="gap-2">
              <span>Open Resume Builder</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-100/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-brand-500" /> Selectable Vector Text
            </span>
            <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
              Zero HTML-to-canvas rendering. Text is selectable, searchable, and machine-extractable.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-100/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-emerald-500" /> Semantic Hierarchy
            </span>
            <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
              Clean header levels (H1, H2, H3) and native list items ensure algorithmic parsers identify sections properly.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-100/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Printer className="w-4 h-4 text-sky-500" /> Vector Print Stylesheet
            </span>
            <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
              Pure `@media print` CSS engine ensuring exact A4 sizing without clipping or blurry rasterization.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-100/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-purple-500" /> Typography Customizer
            </span>
            <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
              Inter, Roboto, Outfit, Merriweather, and JetBrains Mono with 3 density presets (Compact, Normal, Relaxed).
            </p>
          </div>
        </div>
      </div>

      {/* Live Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                  <LayoutTemplate className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                    {activeTemplateMeta.name} Preview
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {activeTemplateMeta.tag} • {activeTemplateMeta.parseRate} ATS Score
                  </p>
                </div>
              </div>

              {/* Persona Switcher & Close */}
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex rounded-xl bg-slate-100 dark:bg-slate-800 p-0.5 text-xs">
                  {[
                    { key: "ml-engineer", label: "ML Engineer" },
                    { key: "software-engineer", label: "Software Engineer" },
                    { key: "data-analyst", label: "Data Analyst" },
                    { key: "fresher", label: "Fresher" },
                  ].map((p) => (
                    <button
                      key={p.key}
                      onClick={() => setPreviewSampleKey(p.key)}
                      className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                        previewSampleKey === p.key
                          ? "bg-brand-600 text-white shadow-sm"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                <Link href={`/builder?template=${selectedTemplate}`}>
                  <Button variant="primary" size="sm" className="gap-1.5 shadow-brand-500/20">
                    <span>Use in Builder</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>

                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Scaled Resume View */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-100 dark:bg-slate-950 flex justify-center">
              <div className="scale-75 sm:scale-90 origin-top">
                <LiveResumePreview
                  resume={activeResumeData}
                  templateOverride={selectedTemplate}
                  zoom={100}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
