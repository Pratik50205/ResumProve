"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  ChevronRight,
  UserCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScoreRing } from "@/components/ui/score-ring";

type ProfileKey = "ml-engineer" | "full-stack" | "cloud-architect";

interface ProfileData {
  id: ProfileKey;
  label: string;
  role: string;
  candidate: string;
  compat: number;
  quality: number;
  proof: number;
  matchedCount: string;
  compatHigh: string;
  compatNotice: string;
  proofHighSkill: string;
  proofHighDesc: string;
  proofWarnSkill: string;
  proofWarnDesc: string;
  qualityMetrics: { label: string; score: string; color?: string }[];
}

const PROFILES: Record<ProfileKey, ProfileData> = {
  "ml-engineer": {
    id: "ml-engineer",
    label: "ML Engineer",
    role: "ML Engineer @ Stripe",
    candidate: "Alex Chen (Machine Learning Spec)",
    compat: 86,
    quality: 82,
    proof: 78,
    matchedCount: "14/16 Key Requirements",
    compatHigh:
      'Resume: "Developed predictive models using Python & PyTorch" aligns with Job: "Experience building production machine learning systems".',
    compatNotice:
      "Target role mentions distributed Kubernetes training. Add cluster orchestration evidence if applicable.",
    proofHighSkill: "PyTorch & Transformers",
    proofHighDesc:
      'Found in Skills, Apex Intelligence Experience, and VectorFlow Project with 32% latency reduction metric.',
    proofWarnSkill: "Docker / CI Pipelines",
    proofWarnDesc:
      "Listed in skills, but lacks quantifiable deployment metrics in recent experience.",
    qualityMetrics: [
      { label: "Action Verbs", score: "94%" },
      { label: "Density", score: "88%" },
      { label: "Structure", score: "100%" },
      { label: "Quantification", score: "72%", color: "text-amber-400" },
    ],
  },
  "full-stack": {
    id: "full-stack",
    label: "Full-Stack Dev",
    role: "Senior Full-Stack @ Linear",
    candidate: "Elena Rostova (Frontend & Distributed Systems)",
    compat: 92,
    quality: 89,
    proof: 85,
    matchedCount: "17/18 Key Requirements",
    compatHigh:
      'Resume: "Engineered real-time optimistic sync pipeline in TypeScript" matches Job: "High-performance collaborative client engine".',
    compatNotice:
      "Job spec prioritizes WebAssembly (WASM). Consider elevating your Rust/WASM side projects.",
    proofHighSkill: "Next.js & TypeScript",
    proofHighDesc:
      "Led migration of 200k MAU app to React Server Components with 40% initial load time reduction.",
    proofWarnSkill: "GraphQL Subscriptions",
    proofWarnDesc:
      "Referenced once in personal projects; add scale throughput metrics to reach High tier.",
    qualityMetrics: [
      { label: "Action Verbs", score: "96%" },
      { label: "Density", score: "92%" },
      { label: "Structure", score: "100%" },
      { label: "Quantification", score: "88%" },
    ],
  },
  "cloud-architect": {
    id: "cloud-architect",
    label: "Cloud Architect",
    role: "Cloud Architect @ AWS",
    candidate: "Marcus Vance (Infrastructure & SRE)",
    compat: 89,
    quality: 91,
    proof: 88,
    matchedCount: "15/17 Key Requirements",
    compatHigh:
      'Resume: "Designed multi-region Terraform IaC across 4 AWS availability zones" matches Job: "Zero-downtime resilient cloud topology".',
    compatNotice:
      "Role mentions FinOps cost governance. Emphasize your documented cloud billing reduction figures.",
    proofHighSkill: "Terraform & AWS EKS",
    proofHighDesc:
      "Orchestrated 120+ microservice environments with automated drift detection and 99.99% uptime SLA.",
    proofWarnSkill: "eBPF Observability",
    proofWarnDesc:
      "Mentioned in tooling section, but no corresponding incident response case study in experience.",
    qualityMetrics: [
      { label: "Action Verbs", score: "92%" },
      { label: "Density", score: "94%" },
      { label: "Structure", score: "100%" },
      { label: "Quantification", score: "90%" },
    ],
  },
};

export function Hero() {
  const [selectedProfile, setSelectedProfile] = useState<ProfileKey>("ml-engineer");
  const [activeTab, setActiveTab] = useState<"compatibility" | "proof" | "quality">("compatibility");

  const current = PROFILES[selectedProfile];

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      {/* Precision ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[360px] bg-gradient-to-r from-brand-600/15 via-purple-600/10 to-emerald-600/10 rounded-full blur-[140px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
          {/* Top Pill / Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/80 shadow-sm dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_2px_10px_rgba(0,0,0,0.5)] backdrop-blur-md"
          >
            <div className="flex items-center justify-center w-4 h-4 rounded-full bg-brand-500/20 text-brand-500 dark:text-brand-400">
              <Sparkles className="w-2.5 h-2.5" />
            </div>
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Deterministic Resume Intelligence & Career Optimization
            </span>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <Badge variant="proof" size="sm" className="py-0 px-2 text-[11px] gap-1 shadow-sm">
              <Lock className="w-2.5 h-2.5" /> Fact-Lock™
            </Badge>
          </motion.div>

          {/* Primary Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.08]"
          >
            Build a Resume That <br className="hidden sm:inline" />
            <span className="gradient-text-brand">Proves Your Potential.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed"
          >
            Understand your resume. Match it to target opportunities. Strengthen every bullet with verified evidence and <span className="text-slate-900 dark:text-white font-semibold">zero hallucinated claims</span>.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-3.5 pt-2 w-full sm:w-auto"
          >
            <Link href="/builder" className="w-full sm:w-auto">
              <Button size="lg" variant="primary" className="w-full sm:w-auto text-base">
                <span>Build My Resume</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
            <Link href="/analyzer" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base">
                <BarChartIcon className="w-4 h-4 mr-1.5 text-sky-500 dark:text-sky-400" />
                <span>Simulate Job Compatibility</span>
              </Button>
            </Link>
          </motion.div>

          {/* Trust Guarantees */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-medium text-slate-600 dark:text-slate-300"
          >
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Zero Fake AI Metrics</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Selectable ATS PDF Output</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Cross-Section Evidence Auditing</span>
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
          <div className="relative rounded-3xl p-1 bg-slate-200/80 dark:bg-gradient-to-b dark:from-slate-700/60 dark:via-slate-800/40 dark:to-slate-900/90 shadow-xl dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_20px_50px_-10px_rgba(0,0,0,0.7)]">
            <div className="rounded-[22px] bg-white/95 dark:bg-[#0c1220]/95 backdrop-blur-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800/80">
              
              {/* Card Header Bar with Interactive Role Switcher */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800/80 gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1" />
                  <span className="text-xs font-mono text-slate-700 dark:text-slate-300 font-semibold tracking-wide">
                    RESUMPROVE_INTELLIGENCE_CORE
                  </span>
                </div>

                {/* Role Switcher Pill Bar */}
                <div className="flex items-center flex-wrap gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 px-2 hidden sm:inline">
                    Simulate Profile:
                  </span>
                  {(Object.keys(PROFILES) as ProfileKey[]).map((key) => {
                    const prof = PROFILES[key];
                    const isSelected = selectedProfile === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedProfile(key)}
                        className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                          isSelected
                            ? "bg-brand-600 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_2px_8px_rgba(99,102,241,0.35)]"
                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/50"
                        }`}
                      >
                        {prof.label}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="proof" size="sm" className="gap-1 font-mono text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    FACT_LOCK_ACTIVE
                  </Badge>
                </div>
              </div>

              {/* Three Intelligence Score Ring Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-b border-slate-200 dark:border-slate-800/60">
                {/* Score 1: Compatibility */}
                <div
                  onClick={() => setActiveTab("compatibility")}
                  className={`cursor-pointer rounded-2xl p-5 transition-all flex flex-col items-center select-none ${
                    activeTab === "compatibility"
                      ? "bg-sky-50 dark:bg-slate-800/80 border border-sky-300 dark:border-sky-500/50 shadow-md dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_8px_24px_-4px_rgba(14,165,233,0.2)]"
                      : "bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800/30 hover:border-slate-300 dark:hover:border-slate-700/60"
                  }`}
                >
                  <ScoreRing score={current.compat} size="md" colorType="compat" showGrade />
                  <div className="mt-3 text-center">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">Job Compatibility</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Semantic + Required Skills Match</p>
                  </div>
                </div>

                {/* Score 2: Resume Quality */}
                <div
                  onClick={() => setActiveTab("quality")}
                  className={`cursor-pointer rounded-2xl p-5 transition-all flex flex-col items-center select-none ${
                    activeTab === "quality"
                      ? "bg-purple-50 dark:bg-slate-800/80 border border-purple-300 dark:border-purple-500/50 shadow-md dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_8px_24px_-4px_rgba(168,85,247,0.2)]"
                      : "bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800/30 hover:border-slate-300 dark:hover:border-slate-700/60"
                  }`}
                >
                  <ScoreRing score={current.quality} size="md" colorType="quality" showGrade />
                  <div className="mt-3 text-center">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">Resume Quality</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Structure, Action Verbs & Density</p>
                  </div>
                </div>

                {/* Score 3: Proof Score */}
                <div
                  onClick={() => setActiveTab("proof")}
                  className={`cursor-pointer rounded-2xl p-5 transition-all flex flex-col items-center select-none ${
                    activeTab === "proof"
                      ? "bg-emerald-50 dark:bg-slate-800/80 border border-emerald-300 dark:border-emerald-500/50 shadow-md dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_8px_24px_-4px_rgba(16,185,129,0.2)]"
                      : "bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800/30 hover:border-slate-300 dark:hover:border-slate-700/60"
                  }`}
                >
                  <ScoreRing score={current.proof} size="md" colorType="proof" showGrade />
                  <div className="mt-3 text-center">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">Proof Score™</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Evidence Backing for Stated Skills</p>
                  </div>
                </div>
              </div>

              {/* Dynamic Interactive Evidence Panel */}
              <div className="pt-6">
                <AnimatePresence mode="wait">
                  {activeTab === "compatibility" && (
                    <motion.div
                      key={`compat-${selectedProfile}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Cpu className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                          <span className="text-sm font-semibold text-slate-900 dark:text-white">Semantic Compatibility Analysis</span>
                          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono hidden sm:inline">({current.role})</span>
                        </div>
                        <span className="text-xs text-sky-600 dark:text-sky-400 font-mono font-semibold">Matched: {current.matchedCount}</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-slate-900/80 border border-emerald-300 dark:border-emerald-500/30 space-y-1.5 shadow-sm dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
                          <div className="flex items-center justify-between text-emerald-700 dark:text-emerald-400 font-semibold">
                            <span className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5" /> High Semantic Alignment
                            </span>
                            <span className="font-mono">{current.compat}%</span>
                          </div>
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{current.compatHigh}</p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-slate-900/80 border border-amber-300 dark:border-amber-500/30 space-y-1.5 shadow-sm dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
                          <div className="flex items-center justify-between text-amber-700 dark:text-amber-400 font-semibold">
                            <span className="flex items-center gap-1.5">
                              <AlertCircle className="w-3.5 h-3.5" /> Missing Role Keyword
                            </span>
                            <span className="font-mono">Suggestion</span>
                          </div>
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{current.compatNotice}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "proof" && (
                    <motion.div
                      key={`proof-${selectedProfile}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-sm font-semibold text-slate-900 dark:text-white">Cross-Section Evidence Verification</span>
                        </div>
                        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono font-semibold">Verified Backing: {current.proof}%</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-slate-900/80 border border-emerald-300 dark:border-emerald-500/30 space-y-1.5 shadow-sm dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
                          <div className="flex items-center justify-between text-emerald-800 dark:text-emerald-400 font-semibold">
                            <span>Primary Skill: {current.proofHighSkill}</span>
                            <Badge variant="proof" size="sm">Evidence: HIGH</Badge>
                          </div>
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{current.proofHighDesc}</p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-slate-900/80 border border-amber-300 dark:border-amber-500/30 space-y-1.5 shadow-sm dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
                          <div className="flex items-center justify-between text-amber-800 dark:text-amber-400 font-semibold">
                            <span>Secondary Skill: {current.proofWarnSkill}</span>
                            <Badge variant="warning" size="sm">Evidence: LOW</Badge>
                          </div>
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{current.proofWarnDesc}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "quality" && (
                    <motion.div
                      key={`quality-${selectedProfile}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          <span className="text-sm font-semibold text-slate-900 dark:text-white">Deterministic Quality Breakdown</span>
                        </div>
                        <span className="text-xs text-purple-600 dark:text-purple-400 font-mono font-semibold">Composite: {current.quality}/100</span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                        {current.qualityMetrics.map((qm, i) => (
                          <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
                            <span className="text-slate-500 dark:text-slate-400 text-[11px] block">{qm.label}</span>
                            <span className={`text-base font-bold font-display ${qm.color || "text-slate-900 dark:text-white"}`}>{qm.score}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom interactive action bar */}
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="text-slate-600 dark:text-slate-300 flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-brand-500 dark:text-brand-400 shrink-0" />
                  <span>Real-time intelligence model: <strong className="text-slate-900 dark:text-white">{current.candidate}</strong></span>
                </div>
                <Link href="/builder" className="text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 font-semibold flex items-center gap-1 group">
                  <span>Open in Interactive Builder</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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
