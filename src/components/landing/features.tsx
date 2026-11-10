"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  FileCode2,
  Cpu,
  ShieldCheck,
  Sparkles,
  LayoutTemplate,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function Features() {
  const features = [
    {
      icon: FileText,
      badge: "Builder",
      title: "Interactive Resume Builder",
      description:
        "Structured editor with live split-screen preview, instant reordering, and targeted bullet-level AI enhancements.",
      accent: "from-brand-500/20 to-indigo-500/10",
      border: "border-brand-500/30",
      iconColor: "text-brand-400",
      bullets: ["Split-screen live editor", "Granular bullet AI suggestions", "Sample profiles library"],
      link: "/builder",
    },
    {
      icon: FileCode2,
      badge: "Parser",
      title: "Multi-Format Document Parser",
      description:
        "Extracts structured data from PDF, DOCX, and TXT files with confidence scoring and an interactive review screen.",
      accent: "from-sky-500/20 to-cyan-500/10",
      border: "border-sky-500/30",
      iconColor: "text-sky-400",
      bullets: ["Section & entity detection", "Confidence ratings per field", "Safe non-destructive import"],
      link: "/builder?mode=import",
    },
    {
      icon: Cpu,
      badge: "Compatibility",
      title: "Job Compatibility Engine",
      description:
        "Deterministic 6-factor algorithm measuring required skills, keyword coverage, semantic similarity, and experience relevance.",
      accent: "from-purple-500/20 to-violet-500/10",
      border: "border-purple-500/30",
      iconColor: "text-purple-400",
      bullets: ["Semantic context matching", "Missing skills identification", "Explainable match breakdown"],
      link: "/analyzer",
    },
    {
      icon: ShieldCheck,
      badge: "Evidence",
      title: "The Proof Score™",
      description:
        "Scans your projects and experience bullets to verify whether claimed skills have backing evidence or need support.",
      accent: "from-emerald-500/20 to-teal-500/10",
      border: "border-emerald-500/30",
      iconColor: "text-emerald-400",
      bullets: ["Cross-section claim audit", "Evidence strength indicators", "Interview readiness insights"],
      link: "/analyzer#proof",
    },
    {
      icon: Sparkles,
      badge: "Optimization",
      title: "Fact-Lock™ AI Enhancer",
      description:
        "Rewrites bullets with high-impact action verbs and tighter phrasing while strictly respecting your factual source data.",
      accent: "from-amber-500/20 to-orange-500/10",
      border: "border-amber-500/30",
      iconColor: "text-amber-400",
      bullets: ["Action verb enhancement", "Zero fake metrics generated", "Interactive accept/reject"],
      link: "/builder",
    },
    {
      icon: LayoutTemplate,
      badge: "Templates",
      title: "ATS-Optimized Templates",
      description:
        "Modern templates designed for ATS parseability and clean browser PDF printing with selectable text.",
      accent: "from-rose-500/20 to-pink-500/10",
      border: "border-rose-500/30",
      iconColor: "text-rose-400",
      bullets: ["ATS Minimal & Modern Pro", "Customizable fonts & palettes", "Standard A4 print stylesheet"],
      link: "/templates",
    },
  ];

  return (
    <section className="py-20 lg:py-28 relative bg-slate-100/60 dark:bg-[#070a11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="default" size="md">
            Complete Platform Ecosystem
          </Badge>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Six Pillars of <br />
            <span className="gradient-text-brand">Resume Intelligence</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Every feature works together to transform your raw experience into an optimized, verifiable, ATS-friendly career portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:${f.border} p-6 sm:p-8 flex flex-col justify-between group hover:shadow-xl dark:hover:bg-slate-900/90 transition-all shadow-sm`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.accent} border border-slate-200 dark:border-slate-700/60 flex items-center justify-center ${f.iconColor}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <Badge variant="default" size="sm" className="text-slate-700 dark:text-slate-300">
                      {f.badge}
                    </Badge>
                  </div>

                  <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">
                    {f.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {f.description}
                  </p>

                  <ul className="space-y-2 pt-2 text-xs text-slate-600 dark:text-slate-300">
                    {f.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/80">
                  <Link
                    href={f.link}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Explore feature</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
