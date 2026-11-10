"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, FileText, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function CTA() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden bg-slate-50 dark:bg-[#090d16] border-t border-slate-200 dark:border-slate-800/80">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-950/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-3xl p-8 sm:p-14 bg-white dark:bg-gradient-to-b dark:from-slate-800/90 dark:via-slate-900/95 dark:to-[#090d16] border border-slate-200 dark:border-slate-700/80 shadow-xl dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_24px_60px_-12px_rgba(0,0,0,0.8)] space-y-6"
        >
          <div className="inline-flex items-center gap-2">
            <Badge variant="proof" size="md">
              <ShieldCheck className="w-3.5 h-3.5" /> Start Proving Your Potential Today
            </Badge>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
            Stop Guessing. <br />
            <span className="gradient-text-brand">Prove Your Career Value.</span>
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Join candidates using deterministic AI scoring, semantic job matching, and verifiable proof to land top-tier interviews with total confidence.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/builder" className="w-full sm:w-auto">
              <Button size="lg" variant="primary" className="w-full sm:w-auto text-base">
                <FileText className="w-4 h-4 mr-1.5" />
                <span>Build Resume Now</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
            <Link href="/analyzer" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base">
                <BarChart3 className="w-4 h-4 mr-1.5 text-sky-600 dark:text-sky-400" />
                <span>Try Instant Job Match</span>
              </Button>
            </Link>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800/60 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" /> No credit card required
            </span>
            <span>•</span>
            <span>Instant Demo Mode</span>
            <span>•</span>
            <span>Export Clean Vector PDF</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
