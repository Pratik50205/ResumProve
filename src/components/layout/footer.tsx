import React from "react";
import Link from "next/link";
import { ShieldCheck, Sparkles, Lock, Cpu, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-[#070a11] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-500 text-white">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-lg text-white">
                Resum<span className="text-brand-400">Prove</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The AI Resume Intelligence & Career Optimization Platform. Build, optimize, and prove your potential with deterministic scoring and verified evidence.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <Badge variant="proof" size="sm" className="gap-1 text-[11px]">
                <Lock className="w-3 h-3" /> Fact-Lock™ Verified
              </Badge>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-semibold text-slate-200 uppercase tracking-wider">
              Intelligence Platform
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/builder" className="hover:text-white transition-colors flex items-center gap-1">
                  AI Resume Builder
                </Link>
              </li>
              <li>
                <Link href="/analyzer" className="hover:text-white transition-colors flex items-center gap-1">
                  Job Compatibility Engine
                </Link>
              </li>
              <li>
                <Link href="/analyzer#proof-score" className="hover:text-white transition-colors flex items-center gap-1">
                  Proof Score & Evidence
                </Link>
              </li>
              <li>
                <Link href="/templates" className="hover:text-white transition-colors flex items-center gap-1">
                  ATS Minimal & Pro Templates
                </Link>
              </li>
            </ul>
          </div>

          {/* Differentiators */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-semibold text-slate-200 uppercase tracking-wider">
              Core Innovations
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5 text-slate-300">
                <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                <span>Semantic Job Matching</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Proof Evidence Engine</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Fact-Lock™ AI Guardrails</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <Cpu className="w-3.5 h-3.5 text-sky-400" />
                <span>Deterministic Scoring</span>
              </li>
            </ul>
          </div>

          {/* Architecture & Security */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-semibold text-slate-200 uppercase tracking-wider">
              Trust & Transparency
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Zero hallucination guarantee. We never invent fake metrics, fabricate companies, or add skills you do not possess.
            </p>
            <div className="pt-2 text-xs text-slate-500">
              Enterprise Grade Security & Row-Level Isolation.
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} ResumProve Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Security Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
