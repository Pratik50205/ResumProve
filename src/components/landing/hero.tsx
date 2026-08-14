"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Lock,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  TrendingUp,
  Cpu,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScoreRing } from "@/components/ui/score-ring";

export function Hero() {
  const [activeTab, setActiveTab] = useState<"compatibility" | "proof" | "quality">("compatibility");

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      {/* Background radial gradient accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-brand-600/15 via-purple-600/10 to-emerald-600/10 rounded-full blur-[130px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
          {/* Top Pill / Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-md backdrop-blur-md"
          >
            <div className="flex items-center justify-center w-4 h-4 rounded-full bg-brand-500/20 text-brand-400">
              <Sparkles className="w-2.5 h-2.5" />
            </div>
            <span className="text-xs font-semibold text-slate-200">
              Next-Gen AI Resume Intelligence & Career Platform
            </span>
            <span className="text-slate-600">|</span>
            <Badge variant="proof" size="sm" className="py-0 px-2 text-[11px] gap-1">
              <Lock className="w-2.5 h-2.5" /> Fact-Lock™
            </Badge>
          </motion.div>

          {/* Primary Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08]"
          >
            Build a Resume That <br className="hidden sm:inline" />
            <span className="gradient-text-brand">Proves Your Potential.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed"
          >
            Understand your resume. Match it to target opportunities. Strengthen every bullet with verified evidence and <span className="text-white font-semibold">zero hallucinated facts</span>.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-3 pt-2 w-full sm:w-auto"
          >
            <Link href="/builder" className="w-full sm:w-auto">
              <Button size="lg" variant="primary" className="w-full sm:w-auto shadow-xl shadow-brand-500/30 text-base">
                <span>Build My Resume</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
            <Link href="/analyzer" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base">
                <BarChartIcon className="w-4 h-4 mr-1 text-sky-400" />
                <span>Analyze Job Compatibility</span>
              </Button>
            </Link>
          </motion.div>

          {/* Trust Guarantees */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-medium text-slate-400"
          >
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Zero Fake AI Metrics</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>ATS-Selectable PDF Output</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Semantic Similarity Engine</span>
            </div>
          </motion.div>
        </div>

        {/* Live Interactive Hero Intelligence Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 max-w-5xl mx-auto"
        >
          <div className="relative rounded-3xl p-1 bg-gradient-to-b from-slate-700/60 via-slate-800/40 to-slate-900/90 shadow-2xl shadow-brand-500/10">
            <div className="rounded-[22px] bg-[#0c1220]/95 backdrop-blur-2xl p-6 sm:p-8 border border-slate-800/80">
              {/* Card Header Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800/80 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <div className="h-4 w-[1px] bg-slate-800 mx-1" />
                  <span className="text-xs font-mono text-slate-400 font-semibold">
                    RESUMPROVE_INTELLIGENCE_CORE :: v1.0
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="proof" size="sm" className="gap-1 font-mono text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    FACT_LOCK_ACTIVE
                  </Badge>
                  <span className="text-xs text-slate-400 font-mono hidden sm:inline">Target: ML Engineer @ Stripe</span>
                </div>
              </div>

              {/* Three Intelligence Score Ring Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-b border-slate-800/60">
                {/* Score 1: Compatibility */}
                <div
                  onClick={() => setActiveTab("compatibility")}
                  className={`cursor-pointer rounded-2xl p-5 transition-all flex flex-col items-center ${
                    activeTab === "compatibility"
                      ? "bg-slate-800/70 border border-sky-500/40 shadow-lg shadow-sky-500/10"
                      : "bg-slate-900/40 border border-slate-800/60 hover:bg-slate-800/30"
                  }`}
                >
                  <ScoreRing score={86} size="md" colorType="compat" showGrade />
                  <div className="mt-3 text-center">
                    <h3 className="text-sm font-bold text-white font-display">Job Compatibility</h3>
                    <p className="text-xs text-slate-400 mt-1">Semantic + Required Skills Match</p>
                  </div>
                </div>

                {/* Score 2: Resume Quality */}
                <div
                  onClick={() => setActiveTab("quality")}
                  className={`cursor-pointer rounded-2xl p-5 transition-all flex flex-col items-center ${
                    activeTab === "quality"
                      ? "bg-slate-800/70 border border-purple-500/40 shadow-lg shadow-purple-500/10"
                      : "bg-slate-900/40 border border-slate-800/60 hover:bg-slate-800/30"
                  }`}
                >
                  <ScoreRing score={82} size="md" colorType="quality" showGrade />
                  <div className="mt-3 text-center">
                    <h3 className="text-sm font-bold text-white font-display">Resume Quality</h3>
                    <p className="text-xs text-slate-400 mt-1">Structure, Action Verbs & Density</p>
                  </div>
                </div>

                {/* Score 3: Proof Score */}
                <div
                  onClick={() => setActiveTab("proof")}
                  className={`cursor-pointer rounded-2xl p-5 transition-all flex flex-col items-center ${
                    activeTab === "proof"
                      ? "bg-slate-800/70 border border-emerald-500/40 shadow-lg shadow-emerald-500/10"
                      : "bg-slate-900/40 border border-slate-800/60 hover:bg-slate-800/30"
                  }`}
                >
                  <ScoreRing score={78} size="md" colorType="proof" showGrade />
                  <div className="mt-3 text-center">
                    <h3 className="text-sm font-bold text-white font-display">Proof Score</h3>
                    <p className="text-xs text-slate-400 mt-1">Evidence Backing for Stated Skills</p>
                  </div>
                </div>
              </div>

              {/* Dynamic Interactive Evidence Panel */}
              <div className="pt-6">
                {activeTab === "compatibility" && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-sky-400" />
                        <span className="text-sm font-semibold text-white">Semantic Compatibility Analysis</span>
                      </div>
                      <span className="text-xs text-sky-400 font-mono">Matched: 14/16 Key Requirements</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-3.5 rounded-xl bg-slate-900/70 border border-emerald-500/30 space-y-1.5">
                        <div className="flex items-center justify-between text-emerald-400 font-semibold">
                          <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Semantic Alignment High
                          </span>
                          <span className="font-mono">92%</span>
                        </div>
                        <p className="text-slate-300">
                          Resume: <span className="text-slate-100 font-mono italic">&quot;Developed predictive models using Python&quot;</span> aligns with Job: <span className="text-slate-100 font-mono italic">&quot;Experience building machine learning prediction systems&quot;</span>.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-900/70 border border-amber-500/30 space-y-1.5">
                        <div className="flex items-center justify-between text-amber-400 font-semibold">
                          <span className="flex items-center gap-1.5">
                            <AlertCircle className="w-3.5 h-3.5" /> Missing Target Keyword
                          </span>
                          <span className="font-mono">Notice</span>
                        </div>
                        <p className="text-slate-300">
                          Target role mentions <strong className="text-white">Kubernetes deployment</strong>. Add evidence in Experience if you have production experience.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "proof" && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm font-semibold text-white">Evidence & Proof Verification</span>
                      </div>
                      <span className="text-xs text-emerald-400 font-mono">Claim Backing: 78%</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-3.5 rounded-xl bg-slate-900/70 border border-emerald-500/30 space-y-1.5">
                        <div className="flex items-center justify-between text-emerald-400 font-semibold">
                          <span>Skill: PyTorch</span>
                          <Badge variant="proof" size="sm">Evidence: HIGH</Badge>
                        </div>
                        <p className="text-slate-300">
                          Found in Skills section, Experience (Apex Intelligence), and Project (VectorFlow). Strongly backed by concrete deliverables.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-900/70 border border-amber-500/30 space-y-1.5">
                        <div className="flex items-center justify-between text-amber-400 font-semibold">
                          <span>Skill: Docker</span>
                          <Badge variant="warning" size="sm">Evidence: LOW</Badge>
                        </div>
                        <p className="text-slate-300">
                          Found in Skills list, but no project bullet describes containerization workflows. Add one bullet with containerization context.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "quality" && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-semibold text-white">Deterministic Quality Breakdown</span>
                      </div>
                      <span className="text-xs text-purple-400 font-mono">Quality: 82/100</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                      <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                        <span className="text-slate-400 text-[11px] block">Action Verbs</span>
                        <span className="text-base font-bold text-white font-display">94%</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                        <span className="text-slate-400 text-[11px] block">Density</span>
                        <span className="text-base font-bold text-white font-display">88%</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                        <span className="text-slate-400 text-[11px] block">Structure</span>
                        <span className="text-base font-bold text-white font-display">100%</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                        <span className="text-slate-400 text-[11px] block">Quantification</span>
                        <span className="text-base font-bold text-amber-400 font-display">65%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom interactive action bar */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="text-slate-400 flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-brand-400" />
                  <span>Showing real-time analysis for Alex Chen (Sample Profile)</span>
                </div>
                <Link href="/builder" className="text-brand-400 hover:text-brand-300 font-semibold flex items-center gap-1">
                  <span>Open in Interactive Builder</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function BarChartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  );
}
