"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileSearch,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  SlidersHorizontal,
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-medium text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span className="text-slate-600">/</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-white">Job Intelligence</span>
              <Badge variant="proof" size="sm">
                Phase 7
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetJob}
              title="Reset job form"
              className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded-lg transition-colors text-xs flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>

            <Link href="/builder">
              <Button variant="secondary" size="sm" className="rounded-xl">
                <span>Resume Builder</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 flex flex-col w-full">
        {/* Page Title & Subtitle */}
        <div className="mb-6 space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight flex items-center gap-2.5">
            <FileSearch className="w-7 h-7 text-sky-400" />
            Job Intelligence & Requirement Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
            Extract structured role seniority, required vs. preferred skill hierarchies, and core responsibilities from any job description using our 1,000+ canonical skill ontology.
          </p>
        </div>

        {/* Mobile Viewport Tab Switcher */}
        <div className="flex lg:hidden bg-slate-900 border border-slate-800 rounded-xl p-1 mb-4">
          <button
            onClick={() => setMobileTab("input")}
            className={`flex-1 py-2 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
              mobileTab === "input"
                ? "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>1. Job Posting</span>
          </button>
          <button
            onClick={() => setMobileTab("intelligence")}
            className={`flex-1 py-2 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
              mobileTab === "intelligence"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>2. Extracted Intelligence {parsed ? `(${parsed.requiredSkills.length + parsed.preferredSkills.length})` : ""}</span>
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
