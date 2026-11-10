"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  GraduationCap,
  MapPin,
  Building,
  Briefcase,
  Layers,
  Sparkles,
  Plus,
  X,
  ArrowUpDown,
  Copy,
  Check,
  ArrowRight,
  FileCheck2,
} from "lucide-react";
import { ParsedJob, SkillRequirement } from "@/types/job";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface JobIntelligenceViewProps {
  parsed: ParsedJob | undefined;
  onAddRequiredSkill: (skill: string) => void;
  onAddPreferredSkill: (skill: string) => void;
  onRemoveSkill: (skill: string, isRequired: boolean) => void;
  onToggleSkillRequirement: (skill: string) => void;
  onAddResponsibility: (bullet: string) => void;
  onRemoveResponsibility: (index: number) => void;
}

export const JobIntelligenceView: React.FC<JobIntelligenceViewProps> = ({
  parsed,
  onAddRequiredSkill,
  onAddPreferredSkill,
  onRemoveSkill,
  onToggleSkillRequirement,
  onAddResponsibility,
  onRemoveResponsibility,
}) => {
  const [newRequiredSkill, setNewRequiredSkill] = useState("");
  const [newPreferredSkill, setNewPreferredSkill] = useState("");
  const [newResponsibility, setNewResponsibility] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  if (!parsed) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[460px] bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl p-8 text-center">
        <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
          <FileCheck2 className="w-7 h-7" />
        </div>
        <h3 className="text-base font-semibold text-white mb-1.5">
          No Job Description Parsed Yet
        </h3>
        <p className="text-xs text-slate-400 max-w-sm leading-relaxed mb-4">
          Paste a target job posting in the editor or load a benchmark sample to extract seniority signals, required skills, and core responsibilities.
        </p>
      </div>
    );
  }

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(parsed, null, 2));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleAddReqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRequiredSkill.trim()) {
      onAddRequiredSkill(newRequiredSkill.trim());
      setNewRequiredSkill("");
    }
  };

  const handleAddPrefSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPreferredSkill.trim()) {
      onAddPreferredSkill(newPreferredSkill.trim());
      setNewPreferredSkill("");
    }
  };

  const handleAddRespSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newResponsibility.trim()) {
      onAddResponsibility(newResponsibility.trim());
      setNewResponsibility("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] space-y-5 overflow-y-auto">
      {/* 1. Header Card: Title, Company & Key Metadata */}
      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] space-y-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white tracking-tight">
                {parsed.role}
              </h2>
              {parsed.seniority && (
                <Badge variant="proof" size="sm">
                  {parsed.seniority} Level
                </Badge>
              )}
            </div>
            {parsed.company && (
              <p className="text-xs font-medium text-slate-400 flex items-center gap-1.5 mt-1">
                <Building className="w-3.5 h-3.5 text-slate-500" />
                {parsed.company}
              </p>
            )}
          </div>

          {/* Domain Tag */}
          {parsed.domain && (
            <Badge variant="outline" size="sm" className="bg-sky-500/10 text-sky-300 border-sky-500/20">
              {parsed.domain}
            </Badge>
          )}
        </div>

        {/* Badges Grid (Experience, Education, Workplace) */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          {parsed.experienceDetail?.text ? (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{parsed.experienceDetail.text}</span>
            </div>
          ) : parsed.experienceYears ? (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{parsed.experienceYears}+ Years Required</span>
            </div>
          ) : null}

          {parsed.educationRequirement && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
              <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
              <span className="truncate max-w-[220px]" title={parsed.educationRequirement}>
                {parsed.educationRequirement}
              </span>
            </div>
          )}

          {parsed.location && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                {parsed.workplaceType && parsed.workplaceType !== "On-site"
                  ? `${parsed.workplaceType} · `
                  : ""}
                {parsed.location}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 2. Behavioral Signals & Work Culture */}
      {parsed.behavioralKeywords && parsed.behavioralKeywords.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Execution Signals & Behavioral Attributes
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {parsed.behavioralKeywords.map((trait, idx) => (
              <span
                key={idx}
                className="inline-flex items-center text-[11px] font-medium px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 3. Required Skills (Must-Have) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Required Skills ({parsed.requiredSkills.length})
          </h3>
          <span className="text-[11px] text-slate-500">
            Click toggle to move to Preferred
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 min-h-[40px] p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
          {parsed.requiredSkills.length === 0 ? (
            <span className="text-xs text-slate-500 italic p-1">
              No mandatory skills detected. Add them below.
            </span>
          ) : (
            parsed.requiredSkills.map((skill) => (
              <div
                key={skill.name}
                className="group inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:border-emerald-500/50 transition-colors"
              >
                <span className="font-medium">{skill.name}</span>
                <span className="text-[10px] text-emerald-500/70 font-mono">
                  [{skill.category}]
                </span>

                {/* Move to Preferred Button */}
                <button
                  onClick={() => onToggleSkillRequirement(skill.name)}
                  title="Move to Preferred Skills"
                  className="opacity-60 hover:opacity-100 p-0.5 text-emerald-400 hover:text-amber-400 transition-opacity"
                >
                  <ArrowUpDown className="w-3 h-3" />
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => onRemoveSkill(skill.name, true)}
                  title="Remove skill"
                  className="opacity-60 hover:opacity-100 p-0.5 text-emerald-400 hover:text-rose-400 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Quick Add Required Skill */}
        <form onSubmit={handleAddReqSubmit} className="flex gap-2">
          <input
            type="text"
            value={newRequiredSkill}
            onChange={(e) => setNewRequiredSkill(e.target.value)}
            placeholder="+ Add required skill (e.g. TypeScript, Docker, SQL)..."
            className="flex-1 text-xs bg-slate-950/60 border border-slate-800/80 rounded-lg px-3 py-1.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <Button type="submit" variant="secondary" size="sm" className="rounded-lg px-3">
            <Plus className="w-3.5 h-3.5 mr-1" /> Add
          </Button>
        </form>
      </div>

      {/* 4. Preferred Skills (Nice-to-Have) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-amber-400" />
            Preferred / Bonus Skills ({parsed.preferredSkills.length})
          </h3>
          <span className="text-[11px] text-slate-500">
            Click toggle to promote to Required
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 min-h-[40px] p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
          {parsed.preferredSkills.length === 0 ? (
            <span className="text-xs text-slate-500 italic p-1">
              No bonus skills detected. Add them below.
            </span>
          ) : (
            parsed.preferredSkills.map((skill) => (
              <div
                key={skill.name}
                className="group inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:border-amber-500/50 transition-colors"
              >
                <span className="font-medium">{skill.name}</span>
                <span className="text-[10px] text-amber-500/70 font-mono">
                  [{skill.category}]
                </span>

                {/* Move to Required Button */}
                <button
                  onClick={() => onToggleSkillRequirement(skill.name)}
                  title="Promote to Required Skills"
                  className="opacity-60 hover:opacity-100 p-0.5 text-amber-400 hover:text-emerald-400 transition-opacity"
                >
                  <ArrowUpDown className="w-3 h-3" />
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => onRemoveSkill(skill.name, false)}
                  title="Remove skill"
                  className="opacity-60 hover:opacity-100 p-0.5 text-amber-400 hover:text-rose-400 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Quick Add Preferred Skill */}
        <form onSubmit={handleAddPrefSubmit} className="flex gap-2">
          <input
            type="text"
            value={newPreferredSkill}
            onChange={(e) => setNewPreferredSkill(e.target.value)}
            placeholder="+ Add preferred skill (e.g. GraphQL, Terraform)..."
            className="flex-1 text-xs bg-slate-950/60 border border-slate-800/80 rounded-lg px-3 py-1.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
          <Button type="submit" variant="secondary" size="sm" className="rounded-lg px-3">
            <Plus className="w-3.5 h-3.5 mr-1" /> Add
          </Button>
        </form>
      </div>

      {/* 5. Key Responsibilities Checklist */}
      {parsed.responsibilities && parsed.responsibilities.length > 0 && (
        <div className="space-y-2.5">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-sky-400" />
            Core Responsibilities ({parsed.responsibilities.length})
          </h3>

          <div className="space-y-1.5">
            {parsed.responsibilities.map((resp, idx) => (
              <div
                key={idx}
                className="group flex items-start justify-between gap-2 p-2.5 rounded-lg bg-slate-950/50 border border-slate-800/60 hover:border-slate-700/80 transition-colors"
              >
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-300 leading-relaxed">{resp}</p>
                </div>
                <button
                  onClick={() => onRemoveResponsibility(idx)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-rose-400 transition-opacity shrink-0"
                  title="Remove responsibility"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Quick Add Responsibility */}
          <form onSubmit={handleAddRespSubmit} className="flex gap-2">
            <input
              type="text"
              value={newResponsibility}
              onChange={(e) => setNewResponsibility(e.target.value)}
              placeholder="+ Add target responsibility statement..."
              className="flex-1 text-xs bg-slate-950/60 border border-slate-800/80 rounded-lg px-3 py-1.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
            <Button type="submit" variant="secondary" size="sm" className="rounded-lg px-3">
              <Plus className="w-3.5 h-3.5 mr-1" /> Add
            </Button>
          </form>
        </div>
      )}

      {/* 6. Action Footer & Navigation to Phase 8 Compatibility Matching */}
      <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          onClick={handleCopyJson}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-slate-800/50"
        >
          {isCopied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied JSON</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Structured JSON</span>
            </>
          )}
        </button>

        <Link href="/builder">
          <Button variant="primary" size="md" className="rounded-xl px-5">
            <span>Match with My Resume</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

