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
  const wordCount = rawText.trim() ? rawText.trim().split(/\s+/).length : 0;

  return (
    <div className="flex flex-col h-full bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
      {/* Top Header & Sample Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
        <div>
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-sky-400" />
            Job Description Input
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Paste any job posting or select an industry benchmark sample.
          </p>
        </div>

        {/* Benchmark Sample Dropdown */}
        <div className="flex items-center gap-2">
          <FolderOpen className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            defaultValue=""
            onChange={(e) => {
              if (e.target.value) {
                onSampleSelect(e.target.value);
                e.target.value = "";
              }
            }}
            className="text-xs bg-slate-800/90 border border-slate-700/80 text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-sky-500 hover:border-slate-600 transition-colors"
          >
            <option value="" disabled>
              Load Benchmark Sample...
            </option>
            {SAMPLE_JOBS.map((sample) => (
              <option key={sample.id} value={sample.id}>
                {sample.name} ({sample.company})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Optional Metadata Row (Title, Company, Workplace) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 pb-3">
        <div>
          <label className="block text-[11px] font-medium text-slate-400 mb-1">
            Job Title (Optional)
          </label>
          <div className="relative">
            <Briefcase className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="e.g. Senior Full Stack Engineer"
              className="w-full text-xs bg-slate-800/60 border border-slate-700/70 rounded-lg pl-8 pr-2.5 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-medium text-slate-400 mb-1">
            Company (Optional)
          </label>
          <div className="relative">
            <Building className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={company}
              onChange={(e) => onCompanyChange(e.target.value)}
              placeholder="e.g. Stripe, Anthropic"
              className="w-full text-xs bg-slate-800/60 border border-slate-700/70 rounded-lg pl-8 pr-2.5 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-medium text-slate-400 mb-1">
            Workplace Model
          </label>
          <div className="relative">
            <MapPin className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5 pointer-events-none" />
            <select
              value={workplaceType}
              onChange={(e) => onWorkplaceTypeChange(e.target.value as WorkplaceType)}
              className="w-full text-xs bg-slate-800/60 border border-slate-700/70 rounded-lg pl-8 pr-2.5 py-2 text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
            >
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Raw Text Area */}
      <div className="flex-1 flex flex-col min-h-[340px] relative mt-1">
        <textarea
          value={rawText}
          onChange={(e) => onRawTextChange(e.target.value)}
          placeholder="Paste full job description text here, including requirements, responsibilities, and qualifications..."
          className="flex-1 w-full p-3.5 text-xs font-mono leading-relaxed bg-slate-950/60 border border-slate-800/90 rounded-xl text-slate-200 placeholder-slate-500 resize-none focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 transition-colors"
        />

        {/* Word/Char Counter & Clear */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1">
          <div className="flex items-center gap-3">
            <span>{wordCount} words</span>
            <span>·</span>
            <span>{charCount} characters</span>
          </div>
          {rawText && (
            <button
              onClick={onClear}
              className="flex items-center gap-1 text-slate-400 hover:text-rose-400 transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear text</span>
            </button>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 mt-2 border-t border-slate-800/80 flex items-center justify-between gap-3">
        <span className="text-[11px] text-slate-400">
          Deterministic NLP + Canonical Skill Ontology
        </span>

        <Button
          onClick={onAnalyze}
          disabled={!rawText.trim() || isAnalyzing}
          variant="primary"
          size="md"
          className="rounded-xl px-5"
        >
          <Sparkles className="w-4 h-4 mr-1.5 text-sky-300" />
          <span>{isAnalyzing ? "Extracting Intelligence..." : "Extract Job Intelligence"}</span>
        </Button>
      </div>
    </div>
  );
};

