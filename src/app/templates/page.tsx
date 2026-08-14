"use client";

import React from "react";
import Link from "next/link";
import { LayoutTemplate, CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function TemplatesPage() {
  const templates = [
    {
      id: "ats-minimal",
      name: "ATS Minimal",
      tag: "Single-Column Standard",
      description: "Ultra clean, single-column layout engineered for highest parse-rate through enterprise ATS filters.",
      color: "border-slate-700",
    },
    {
      id: "modern-professional",
      name: "Modern Professional",
      tag: "Executive 2-Column",
      description: "Sophisticated dual-column structure highlighting summary metrics and career progression.",
      color: "border-brand-500/40",
    },
    {
      id: "tech-specialist",
      name: "Tech Specialist",
      tag: "Code & Projects Focused",
      description: "Prioritizes tech stacks, GitHub repositories, and system architecture accomplishments.",
      color: "border-purple-500/40",
    },
    {
      id: "student-fresher",
      name: "Student / Fresher",
      tag: "Academics & Skills Focused",
      description: "Emphasizes coursework, key projects, degrees, GPA, and foundational programming skills.",
      color: "border-emerald-500/40",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="brand" size="md">
          Phase 3 Target
        </Badge>
        <h1 className="font-display text-3xl sm:text-4xl font-black text-white">
          ATS-Optimized Templates
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Four distinct, production-grade templates sharing the unified ResumProve TypeScript data model.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {templates.map((tpl) => (
          <div
            key={tpl.id}
            className={`rounded-3xl bg-slate-900/60 border ${tpl.color} p-6 flex flex-col justify-between space-y-4 hover:bg-slate-900/90 transition-all`}
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300">
                <LayoutTemplate className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-white">{tpl.name}</h3>
              <Badge variant="default" size="sm" className="text-slate-300">
                {tpl.tag}
              </Badge>
              <p className="text-xs text-slate-400 leading-relaxed">{tpl.description}</p>
            </div>
            <div className="pt-3 border-t border-slate-800">
              <span className="text-[11px] text-slate-500 font-mono">Standard A4 Print Ready</span>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 flex justify-center">
        <Link href="/">
          <Button variant="secondary" size="md">
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
