"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileSearch,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useJobState } from "@/lib/job/useJobState";
import { JobInputPanel } from "@/components/analyzer/job-input-panel";
import { JobIntelligenceView } from "@/components/analyzer/job-intelligence-view";

export default function AnalyzerPage() {
  const {
    job,
    parsed,
    isAnalyzing,
    updateRawText,
    updateTitle,
    updateCompany,
    updateWorkplaceType,
    loadSampleJob,
    analyzeJob,
    addRequiredSkill,
    addPreferredSkill,
    removeSkill,
    toggleSkillRequirement,
    addResponsibility,
    removeResponsibility,
    resetJob,
  } = useJobState("stripe-fullstack");

  // Tab switch for mobile viewports
  const [mobileTab, setMobileTab] = useState<"input" | "intelligence">("input");

  return (
    <div className="flex-1 flex flex-col w-full py-6 sm:py-8">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col w-full">
        {/* In-page Breadcrumb & Actions Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <Link
                href="/"
                className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
              <span>/</span>
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                Job Intelligence Studio
              </span>
              <Badge variant="proof" size="sm">
                Phase 7
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-display text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
              <FileSearch className="w-7 h-7 text-sky-600 dark:text-sky-400 shrink-0" />
              <span>Job Intelligence & Requirements</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
              Extract structured role seniority, required vs. preferred skill hierarchies, and core responsibilities from any job description using our 1,000+ canonical skill ontology.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
            <button
              type="button"
              onClick={resetJob}
              title="Reset job form"
              className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60 rounded-xl transition-colors text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <Link href="/builder">
              <Button variant="secondary" size="sm" className="rounded-xl">
                <span>Resume Builder</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Viewport Tab Switcher */}
        <div className="flex lg:hidden bg-slate-200/80 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl p-1 mb-4">
          <button
            type="button"
            onClick={() => setMobileTab("input")}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
              mobileTab === "input"
                ? "bg-white dark:bg-sky-500/20 text-slate-900 dark:text-sky-300 shadow-sm border border-slate-200 dark:border-sky-500/30"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>1. Job Posting</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("intelligence")}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
              mobileTab === "intelligence"
                ? "bg-white dark:bg-emerald-500/20 text-slate-900 dark:text-emerald-300 shadow-sm border border-slate-200 dark:border-emerald-500/30"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              2. Extracted Intelligence{" "}
              {parsed ? `(${parsed.requiredSkills.length + parsed.preferredSkills.length})` : ""}
            </span>
          </button>
        </div>

        {/* Split-Screen Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 items-stretch">
          {/* Left Panel: Raw Input & Controls */}
          <div className={`${mobileTab === "input" ? "block" : "hidden"} lg:block h-full`}>
            <JobInputPanel
              rawText={job.rawText}
              title={job.title}
              company={job.company || ""}
              workplaceType={job.workplaceType || "Remote"}
              isAnalyzing={isAnalyzing}
              onRawTextChange={updateRawText}
              onTitleChange={updateTitle}
              onCompanyChange={updateCompany}
              onWorkplaceTypeChange={updateWorkplaceType}
              onSampleSelect={loadSampleJob}
              onAnalyze={() => {
                analyzeJob();
                setMobileTab("intelligence");
              }}
              onClear={() => updateRawText("")}
            />
          </div>

          {/* Right Panel: Structured Job Intelligence & Signals */}
          <div className={`${mobileTab === "intelligence" ? "block" : "hidden"} lg:block h-full`}>
            <JobIntelligenceView
              parsed={parsed}
              onAddRequiredSkill={addRequiredSkill}
              onAddPreferredSkill={addPreferredSkill}
              onRemoveSkill={removeSkill}
              onToggleSkillRequirement={toggleSkillRequirement}
              onAddResponsibility={addResponsibility}
              onRemoveResponsibility={removeResponsibility}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
