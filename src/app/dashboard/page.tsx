"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, FileText, ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 flex flex-col items-center justify-center text-center">
      <div className="max-w-2xl mx-auto space-y-6">
        <Badge variant="brand" size="md">
          Phase 11 Target
        </Badge>
        <div className="w-16 h-16 rounded-3xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400 mx-auto">
          <Sparkles className="w-8 h-8" />
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-black text-white">
          Career Portfolio Dashboard
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          The central hub for managing multiple tailored resumes, version history, and saved job compatibility scans (Supabase RLS persistence scheduled for Phase 5 & 11).
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/">
            <Button variant="secondary" size="md">
              <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Home
            </Button>
          </Link>
          <Link href="/builder">
            <Button variant="primary" size="md">
              <span>Launch Builder</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
