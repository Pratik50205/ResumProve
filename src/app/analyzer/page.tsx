"use client";

import React from "react";
import Link from "next/link";
import { BarChart3, Cpu, ShieldCheck, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AnalyzerPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 flex flex-col items-center justify-center text-center">
      <div className="max-w-2xl mx-auto space-y-6">
        <Badge variant="proof" size="md">
          Phase 7-9 Target
        </Badge>
        <div className="w-16 h-16 rounded-3xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mx-auto">
          <BarChart3 className="w-8 h-8" />
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-black text-white">
          Job Compatibility & Proof Engine
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          The 6-factor deterministic compatibility scanner, semantic matching, and cross-section Proof Score audit are configured and typed for integration in Phases 7-9.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/">
            <Button variant="secondary" size="md">
              <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Home
            </Button>
          </Link>
          <Link href="/templates">
            <Button variant="primary" size="md">
              <span>View Templates</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
