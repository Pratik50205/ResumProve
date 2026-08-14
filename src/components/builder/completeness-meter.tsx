"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Sparkles, ShieldCheck } from "lucide-react";
import { ResumeValidationResult } from "@/lib/validation/resumeValidation";
import { Badge } from "@/components/ui/badge";

interface CompletenessMeterProps {
  validation: ResumeValidationResult;
}

export function CompletenessMeter({ validation }: CompletenessMeterProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 85) return "from-emerald-500 to-teal-400";
    if (score >= 60) return "from-brand-500 to-indigo-400";
    return "from-amber-500 to-rose-400";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { label: "Interview Ready", variant: "proof" as const };
    if (score >= 70) return { label: "Good Foundation", variant: "brand" as const };
    return { label: "Incomplete", variant: "warning" as const };
  };

  const badge = getScoreBadge(validation.score);

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 shadow-lg backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider font-display">
                Resume Completeness
              </span>
              <Badge variant={badge.variant} size="sm" className="text-[10px] py-0 px-1.5">
                {badge.label}
              </Badge>
            </div>
            <span className="text-[11px] text-slate-400">
              {validation.items.filter(i => i.isComplete).length} of {validation.items.length} quality milestones met
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="font-display text-lg font-black text-white">
              {validation.score}%
            </span>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Toggle checklist details"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 rounded-full bg-slate-800 mt-3 overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${getScoreColor(validation.score)} transition-all duration-500`}
          style={{ width: `${validation.score}%` }}
        />
      </div>

      {/* Expandable Quality Checklist */}
      {isExpanded && (
        <div className="mt-4 pt-3 border-t border-slate-800 space-y-2 animate-fade-in text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {validation.items.map((item) => (
              <div
                key={item.id}
                className={`p-2.5 rounded-xl border flex items-start gap-2 ${
                  item.isComplete
                    ? "bg-slate-950/60 border-slate-800/80 text-slate-300"
                    : "bg-amber-500/5 border-amber-500/20 text-slate-200"
                }`}
              >
                {item.isComplete ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                )}
                <div className="space-y-0.5">
                  <span className={`font-medium ${item.isComplete ? "text-slate-300" : "text-white font-semibold"}`}>
                    {item.label}
                  </span>
                  {!item.isComplete && item.tip && (
                    <p className="text-[11px] text-amber-300/80 leading-tight">
                      {item.tip}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
