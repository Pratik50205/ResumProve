import React from "react";
import Link from "next/link";
import { ShieldCheck, FileText, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Terms of Service | ResumProve",
  description: "ResumProve Terms of Service: Acceptable use, Fact-Lock honesty standards, service availability, and intellectual property terms.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      <div className="space-y-4 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <Badge variant="brand" size="md" className="gap-1.5">
            <FileText className="w-4 h-4" />
            Terms & Conditions
          </Badge>
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Terms of Service
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Last Updated: October 16, 2026 • Version 1.1
        </p>
      </div>

      <div className="surface-card rounded-3xl p-6 sm:p-10 space-y-8 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
            1. Agreement to Terms
          </h2>
          <p>
            By accessing or using the ResumProve platform, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must discontinue using our services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            2. Fact-Lock™ & Truthful Representation Guarantee
          </h2>
          <p>
            ResumProve is engineered to improve resume impact, formatting, and semantic matching without fabricating unverified claims. You agree to use the platform solely to represent genuine career experience, verified qualifications, and truthful metrics. Any attempt to use automated features to generate deceptive credentials is a violation of our fair-use policy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
            3. User Accounts & Security
          </h2>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use or security compromise.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
            4. Service Availability & Disclaimers
          </h2>
          <p>
            ResumProve provides resume analysis, scoring algorithms, and template rendering on an &quot;as is&quot; and &quot;as available&quot; basis. While our deterministic models are designed to maximize ATS parse rates and recruiter clarity, we do not guarantee employment, interview invitations, or specific hiring outcomes.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h2 className="font-display text-base font-bold text-slate-900 dark:text-white">
            5. Governing Law
          </h2>
          <p>
            These terms are governed by and construed in accordance with applicable commercial and consumer protection laws. Direct legal inquiries to <code className="text-brand-600 dark:text-brand-400 font-mono">legal@resumprove.com</code>.
          </p>
        </section>
      </div>

      <div className="flex justify-center sm:justify-start">
        <Link href="/">
          <Button variant="secondary" size="md">
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Overview
          </Button>
        </Link>
      </div>
    </div>
  );
}
