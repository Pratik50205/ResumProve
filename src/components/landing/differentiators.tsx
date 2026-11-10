"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Lock,
  ArrowRight,
  Check,
  X,
  Cpu,
  Fingerprint,
  FileSearch,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Differentiators() {
  return (
    <section className="py-20 lg:py-28 relative border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-[#090d16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="brand" size="md">
            Architectural Innovation
          </Badge>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Why ResumProve is <br />
            <span className="gradient-text-brand">Fundamentally Different</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Most tools are simplistic resume generators that invent fake metrics or perform naive keyword stuffing. ResumProve is an engineered career intelligence platform.
          </p>
        </div>

        {/* 3 Major Differentiator Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Differentiator 1: Semantic Compatibility */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl surface-card surface-card-hover p-8 flex flex-col justify-between relative overflow-hidden group hover:border-sky-500/50 transition-all"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-600 dark:text-sky-400 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]">
                  <Cpu className="w-6 h-6" />
                </div>
                <Badge variant="default" size="sm" className="border-sky-500/30 text-sky-700 dark:text-sky-400">
                  Differentiator A
                </Badge>
              </div>

              <div>
                <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Semantic Job Compatibility
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 leading-relaxed">
                  Understands underlying engineering concepts and ontology instead of shallow, fragile keyword exact-matches.
                </p>
              </div>

              {/* Visual Demonstration */}
              <div className="rounded-2xl bg-white dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800/90 p-4 space-y-3 font-mono text-xs shadow-sm dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
                <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-300">
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-semibold">Resume Content</span>
                  &quot;Developed predictive models using Python.&quot;
                </div>
                <div className="flex items-center justify-center text-sky-600 dark:text-sky-400">
                  <div className="flex items-center gap-1.5 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/25 text-[11px] font-semibold">
                    <Sparkles className="w-3 h-3" /> Semantic Match: 94%
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-300">
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-semibold">Job Requirement</span>
                  &quot;Experience building machine learning prediction systems.&quot;
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
              Evaluates contextual ontology, synonyms, and engineering toolchains automatically.
            </div>
          </motion.div>

          {/* Differentiator 2: Proof Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl surface-card surface-card-hover p-8 flex flex-col justify-between relative overflow-hidden group hover:border-emerald-500/50 transition-all"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <Badge variant="proof" size="sm">
                  Differentiator B
                </Badge>
              </div>

              <div>
                <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  The Proof Score™
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 leading-relaxed">
                  Measures how strongly your resume supports every skill claim with verifiable projects, experience bullets, and credentials.
                </p>
              </div>

              {/* Evidence Breakdown Demo */}
              <div className="rounded-2xl bg-white dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800/90 p-4 space-y-2.5 text-xs shadow-sm dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
                <div className="flex items-center justify-between text-slate-800 dark:text-slate-200">
                  <span className="font-medium">Skill Evidence</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">82%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "82%" }} />
                </div>

                <div className="flex items-center justify-between text-slate-800 dark:text-slate-200 pt-1">
                  <span className="font-medium">Project Evidence</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">91%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "91%" }} />
                </div>

                <div className="flex items-center justify-between text-slate-800 dark:text-slate-200 pt-1">
                  <span className="font-medium">Consistency Check</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">88%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "88%" }} />
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
              Never accuses the user—highlights claim gaps so you can strengthen evidence before interviews.
            </div>
          </motion.div>

          {/* Differentiator 3: Fact Lock Guardrails */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-3xl surface-card surface-card-hover p-8 flex flex-col justify-between relative overflow-hidden group hover:border-brand-500/50 transition-all"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-brand-500/15 border border-brand-400/30 flex items-center justify-center text-brand-600 dark:text-brand-400 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]">
                  <Lock className="w-6 h-6" />
                </div>
                <Badge variant="brand" size="sm">
                  Differentiator C
                </Badge>
              </div>

              <div>
                <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Fact-Lock™ Guardrails
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 leading-relaxed">
                  Strict zero-fabrication architecture. AI optimizes structure, verbs, and clarity, but never invents fake metrics or unworked jobs.
                </p>
              </div>

              {/* Comparison table inside card */}
              <div className="rounded-2xl bg-white dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800/90 p-4 space-y-2.5 text-xs shadow-sm dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
                <div className="flex items-center justify-between text-rose-600 dark:text-rose-400">
                  <span className="flex items-center gap-1.5 font-medium">
                    <X className="w-3.5 h-3.5 shrink-0" /> Fabricated Metrics (&quot;+37%&quot;)
                  </span>
                  <span className="font-bold uppercase text-[10px] px-1.5 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">Blocked</span>
                </div>
                <div className="flex items-center justify-between text-rose-600 dark:text-rose-400">
                  <span className="flex items-center gap-1.5 font-medium">
                    <X className="w-3.5 h-3.5 shrink-0" /> Phantom Tools & Skills
                  </span>
                  <span className="font-bold uppercase text-[10px] px-1.5 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">Blocked</span>
                </div>
                <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 pt-1.5 border-t border-slate-200 dark:border-slate-800/90">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Check className="w-3.5 h-3.5 shrink-0" /> Active Verbs & Impact
                  </span>
                  <span className="font-bold uppercase text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">Enabled</span>
                </div>
                <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Check className="w-3.5 h-3.5 shrink-0" /> Quantify Prompts for User
                  </span>
                  <span className="font-bold uppercase text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">Enabled</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
              Guarantees you can confidently defend every single bullet in technical interviews.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
