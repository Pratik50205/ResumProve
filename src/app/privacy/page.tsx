import React from "react";
import Link from "next/link";
import { ShieldCheck, Lock, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Privacy Policy | ResumProve",
  description: "ResumProve Privacy Policy: Zero AI training on your private career data, strict local encryption, and full data sovereignty.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      <div className="space-y-4 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <Badge variant="proof" size="md" className="gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Data Protection Standard
          </Badge>
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Effective Date: October 16, 2026 • Version 1.2
        </p>
      </div>

      <div className="surface-card rounded-3xl p-6 sm:p-10 space-y-8 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-brand-500" />
            1. Zero AI Model Training on User Data
          </h2>
          <p>
            Your resume content, work history, projects, and personal contact details are <strong>never</strong> used to train, retrain, or fine-tune public or third-party AI models. All semantic analysis and job compatibility calculations execute in ephemeral execution contexts.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            2. Local-First Storage & Encryption
          </h2>
          <p>
            By default, all resume drafts and modifications created in the builder are stored directly in your browser&apos;s local storage. When cloud synchronization is enabled, data is encrypted in transit via TLS 1.3 and at rest with AES-256 with strict Row-Level Security (RLS) policies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
            3. Information We Collect
          </h2>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 dark:text-slate-300">
            <li><strong>Account Data:</strong> Email address and authentication credentials if you choose to create a cloud account.</li>
            <li><strong>Resume Content:</strong> Professional details, work history, skills, and certifications provided directly by you.</li>
            <li><strong>Telemetry:</strong> Anonymized performance and error metrics strictly to ensure platform reliability. No tracking cookies are used for third-party ad targeting.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
            4. Full Data Sovereignty & Portability
          </h2>
          <p>
            You retain 100% intellectual property ownership of your resume and career data. You can export your data at any time in standard JSON or ATS-selectable vector PDF formats, or permanently delete your account and all associated records with immediate effect.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h2 className="font-display text-base font-bold text-slate-900 dark:text-white">
            5. Contact Privacy Office
          </h2>
          <p>
            For privacy inquiries, audit requests, or data deletion demands, reach out to our team at <code className="text-brand-600 dark:text-brand-400 font-mono">privacy@resumprove.com</code>.
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
