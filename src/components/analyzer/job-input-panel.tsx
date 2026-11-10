"use client";

import React from "react";
import {
  FileText,
  Sparkles,
  Building,
  Briefcase,
  MapPin,
  Trash2,
  FolderOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkplaceType } from "@/types/job";
import { SAMPLE_JOBS } from "@/data/sampleJobs";

interface JobInputPanelProps {
  rawText: string;
  title: string;
  company: string;
  workplaceType: WorkplaceType;
  isAnalyzing: boolean;
  onRawTextChange: (text: string) => void;
  onTitleChange: (title: string) => void;
  onCompanyChange: (company: string) => void;
  onWorkplaceTypeChange: (type: WorkplaceType) => void;
  onSampleSelect: (sampleId: string) => void;
  onAnalyze: () => void;
  onClear: () => void;
}

export const JobInputPanel: React.FC<JobInputPanelProps> = ({
  rawText,
  title,
  company,
  workplaceType,
  isAnalyzing,
  onRawTextChange,
  onTitleChange,
  onCompanyChange,
  onWorkplaceTypeChange,
  onSampleSelect,
  onAnalyze,
  onClear,
}) => {
  const charCount = rawText.length;
  const wordCount = rawText.trim() ? rawText.trim().split(/\s+/).filter(Boolean).length : 0;

  const workplaceOptions: WorkplaceType[] = ["Remote", "Hybrid", "On-site"];

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition-colors">
      {/* 1. Header & Sample Selector Bar */}
      <div className="flex flex-col gap-2.5 pb-4 border-b border-slate-200 dark:border-slate-800/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white whitespace-nowrap">
                Job Description Input
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Paste any job posting or load a benchmark role.
              </p>
            </div>
          </div>

          {/* Benchmark Sample Dropdown */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto shrink-0">
            <FolderOpen className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <select
              defaultValue=""
              onChange={(e) => {
                if (e.target.value) {
                  onSampleSelect(e.target.value);
                  e.target.value = "";
                }
              }}
              className="text-xs bg-slate-100 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-sky-500 hover:border-slate-400 dark:hover:border-slate-600 transition-colors cursor-pointer"
            >
              <option value="" disabled>
                Load Benchmark Role...
              </option>
              {SAMPLE_JOBS.map((sample) => (
                <option key={sample.id} value={sample.id}>
                  {sample.name} ({sample.company})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 2. Metadata Form: Job Title & Company (2 columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3.5 pb-2">
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
            Job Title (Optional)
          </label>
          <div className="relative">
            <Briefcase className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="e.g. Senior Full Stack Engineer"
              className="w-full text-xs bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-lg pl-8 pr-2.5 py-2 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
            Company (Optional)
          </label>
          <div className="relative">
            <Building className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={company}
              onChange={(e) => onCompanyChange(e.target.value)}
              placeholder="e.g. Stripe, Anthropic"
              className="w-full text-xs bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-lg pl-8 pr-2.5 py-2 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Workplace Model Segmented Control */}
      <div className="flex items-center justify-between pb-3">
        <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          <span>Workplace Model:</span>
        </label>
        <div className="inline-flex p-0.5 rounded-lg bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
          {workplaceOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => onWorkplaceTypeChange(opt)}
              className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
                workplaceType === opt
                  ? "bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Main Raw Text Area */}
      <div className="flex-1 flex flex-col min-h-[300px] relative">
        <textarea
          value={rawText}
          onChange={(e) => onRawTextChange(e.target.value)}
          placeholder="Paste full job description text here, including requirements, responsibilities, and qualifications..."
          className="flex-1 w-full p-3.5 text-xs font-mono leading-relaxed bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/90 rounded-xl text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 resize-none focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 transition-colors"
        />

        {/* Word/Char Counter & Clear */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-2 px-1">
          <div className="flex items-center gap-3">
            <span>{wordCount} words</span>
            <span>·</span>
            <span>{charCount} characters</span>
          </div>
          {rawText && (
            <button
              onClick={onClear}
              className="flex items-center gap-1 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear text</span>
            </button>
          )}
        </div>
      </div>

      {/* 4. Action Footer */}
      <div className="pt-4 mt-2 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline">
          Deterministic NLP + 1,000+ Skill Ontology
        </span>

        <Button
          onClick={onAnalyze}
          disabled={!rawText.trim() || isAnalyzing}
          variant="primary"
          size="md"
          className="w-full sm:w-auto rounded-xl px-5"
        >
          <Sparkles className="w-4 h-4 mr-1.5 text-sky-300" />
          <span>{isAnalyzing ? "Extracting Intelligence..." : "Extract Job Intelligence"}</span>
        </Button>
      </div>
    </div>
  );
};
