"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  UploadCloud,
  Cpu,
  ShieldCheck,
  Target,
  Wand2,
  FileDown,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Workflow() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: "01",
      icon: UploadCloud,
      title: "Input or Parse Resume",
      shortDesc: "Upload existing PDF/DOCX or start with structured guided editor.",
      detail:
        "Our intelligent parser extracts work history, projects, degrees, and skills with individual confidence scores for non-destructive review.",
      badge: "Parsing Engine",
      color: "text-brand-400",
      bg: "bg-brand-500/10 border-brand-500/30",
    },
    {
      number: "02",
      icon: Cpu,
      title: "Deep Resume Intelligence",
      shortDesc: "Deterministic analysis of quality, structure, and action verbs.",
      detail:
        "The system scans formatting, bullet length, repetitive words, and content density, producing an actionable 0-100 Quality Score.",
      badge: "Quality Engine",
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/30",
    },
    {
      number: "03",
      icon: Target,
      title: "Job Compatibility Scan",
      shortDesc: "Paste target job description to measure semantic and keyword fit.",
      detail:
        "Extracts required skills, seniority, and domain terms, comparing them through normalized ontology and semantic vector logic.",
      badge: "Matching Engine",
      color: "text-sky-400",
      bg: "bg-sky-500/10 border-sky-500/30",
    },
    {
      number: "04",
      icon: ShieldCheck,
      title: "Proof Score & Evidence Audit",
      shortDesc: "Audit claims across experience bullets and projects.",
      detail:
        "Ensures every skill mentioned in your skills section is supported by projects or work achievements, preventing empty resume claims.",
      badge: "Evidence Engine",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/30",
    },
    {
      number: "05",
      icon: Wand2,
      title: "Fact-Lock™ AI Optimization",
      shortDesc: "Improve wording and action verbs with zero fake metrics.",
      detail:
        "AI proposes impact-driven rephrasings for individual bullets. You review and approve every change before it updates your resume.",
      badge: "AI Guardrails",
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/30",
    },
    {
      number: "06",
      icon: FileDown,
      title: "Export ATS-Grade PDF",
      shortDesc: "Switch templates instantly and download pure vector text PDFs.",
      detail:
        "HTML/CSS print-optimized rendering ensures ATS parsers can read every character with standard A4 margins and zero graphic distortion.",
      badge: "Export Engine",
      color: "text-rose-400",
      bg: "bg-rose-500/10 border-rose-500/30",
    },
  ];

  return (
    <section className="py-20 lg:py-28 relative border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-[#090d16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="proof" size="md">
            Seamless End-to-End Flow
          </Badge>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            How ResumProve <br />
            <span className="gradient-text-proof">Powers Your Career</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            From raw input to interview-ready, verified PDF in 6 precision steps.
          </p>
        </div>

        {/* Step Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
          {steps.map((s, index) => {
            const Icon = s.icon;
            const isSelected = activeStep === index;
            return (
              <button
                key={s.number}
                onClick={() => setActiveStep(index)}
                className={`p-3 rounded-2xl border text-left transition-all flex flex-col gap-2 ${
                  isSelected
                    ? "bg-white dark:bg-slate-800 border-brand-500/50 shadow-md shadow-brand-500/10"
                    : "bg-slate-100/70 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/80 hover:bg-slate-200/50 dark:hover:bg-slate-800/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-slate-500 dark:text-slate-400 font-bold">{s.number}</span>
                  <Icon className={`w-4 h-4 ${isSelected ? s.color : "text-slate-400 dark:text-slate-500"}`} />
                </div>
                <span className={`text-xs font-semibold line-clamp-1 ${isSelected ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400"}`}>
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Step Highlight Box */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-8 sm:p-10 shadow-xl dark:shadow-2xl backdrop-blur-xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-bold text-slate-500 dark:text-slate-400">
                  STEP {steps[activeStep].number}
                </span>
                <Badge variant="default" size="sm" className="border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  {steps[activeStep].badge}
                </Badge>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                {steps[activeStep].title}
              </h3>

              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                {steps[activeStep].detail}
              </p>

              <div className="pt-4 flex items-center gap-4">
                <Link href="/builder">
                  <Button variant="primary" size="md">
                    <span>Try This Step</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
                {activeStep < steps.length - 1 && (
                  <button
                    onClick={() => setActiveStep((prev) => prev + 1)}
                    className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    Next Step ({steps[activeStep + 1].number}) →
                  </button>
                )}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-400 font-semibold">STAGE PREVIEW</span>
                  <span className="text-emerald-600 dark:text-emerald-400 text-[11px] flex items-center gap-1 font-semibold">
                    <CheckCircle className="w-3 h-3" /> READY
                  </span>
                </div>
                <div className="space-y-2 text-slate-700 dark:text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Operation:</span>
                    <span className="text-slate-900 dark:text-slate-200 font-medium">{steps[activeStep].badge}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Execution:</span>
                    <span className="text-slate-900 dark:text-slate-200 font-medium">Deterministic + Fact-Lock</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">User Override:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">100% Control</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
