"use client";

import React, { useState } from "react";
import {
  Sparkles,
  ShieldCheck,
  Check,
  ArrowRight,
  RefreshCw,
  AlertTriangle,
  X,
  Zap,
  Cpu,
  Layers,
  Wand2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImprovementAction } from "@/types/ai";

interface BulletImproverModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalBullet: string;
  onApply: (improvedBullet: string) => void;
  context?: {
    role?: string;
    company?: string;
    skillsUsed?: string[];
  };
}

export function BulletImproverModal({
  isOpen,
  onClose,
  originalBullet,
  onApply,
  context,
}: BulletImproverModalProps) {
  const [selectedAction, setSelectedAction] = useState<ImprovementAction>("impact");
  const [improvedBullet, setImprovedBullet] = useState<string>("");
  const [changesSummary, setChangesSummary] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [safetyScore, setSafetyScore] = useState<number>(100);
  const [warnings, setWarnings] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleGenerate = async (action: ImprovementAction = selectedAction) => {
    setIsLoading(true);
    setErrorMessage(null);
    setSelectedAction(action);

    try {
      const res = await fetch("/api/ai/improve-bullet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originalBullet,
          action,
          context,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to generate improvement.");
      }

      setImprovedBullet(json.data.improvedBullet);
      setChangesSummary(json.data.changesSummary || "");
      if (json.data.audit) {
        setSafetyScore(json.data.audit.safetyScore);
        setWarnings(json.data.audit.warnings || []);
      }
    } catch (err: any) {
      console.error("AI Improvement error:", err);
      setErrorMessage(err.message || "Failed to communicate with AI engine.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    if (improvedBullet) {
      onApply(improvedBullet);
      onClose();
    }
  };

  const actionButtons: {
    id: ImprovementAction;
    label: string;
    desc: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    {
      id: "impact",
      label: "Impact Boost",
      desc: "Google X-Y-Z formula for measurable results",
      icon: Zap,
    },
    {
      id: "concise",
      label: "Concise & ATS",
      desc: "Trims passive words for fast recruiter scanning",
      icon: Wand2,
    },
    {
      id: "technical",
      label: "Technical Depth",
      desc: "Highlights mechanisms & architecture",
      icon: Cpu,
    },
    {
      id: "quantify-prompt",
      label: "Quantify Guided",
      desc: "Prompts for your verified percentages",
      icon: Layers,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-2xl w-full shadow-2xl overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                  Fact-Lock™ Bullet Improver
                </h3>
                <Badge variant="proof" size="sm" className="text-[10px]">
                  Zero Hallucinations
                </Badge>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {context?.role ? `${context.role} @ ${context.company || "Company"}` : "Experience bullet point"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* Original Statement Box */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Original Statement
            </span>
            <div className="p-3.5 rounded-2xl bg-slate-100/80 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
              {originalBullet}
            </div>
          </div>

          {/* Action Strategy Selector */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Choose Improvement Strategy
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {actionButtons.map((btn) => {
                const Icon = btn.icon;
                const isSelected = selectedAction === btn.id;
                return (
                  <button
                    key={btn.id}
                    onClick={() => handleGenerate(btn.id)}
                    disabled={isLoading}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-1 ${
                      isSelected
                        ? "bg-brand-500/10 border-brand-500/60 shadow-sm ring-1 ring-brand-500/30"
                        : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-brand-600 dark:text-brand-400" : "text-slate-400"}`} />
                      <span className="font-bold text-xs text-slate-900 dark:text-white truncate">
                        {btn.label}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                      {btn.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Improved Output Box */}
          {isLoading && (
            <div className="py-8 flex flex-col items-center justify-center space-y-2.5 text-center">
              <Loader2 className="w-6 h-6 animate-spin text-brand-500" />
              <span className="text-xs text-slate-500 font-medium">
                Piping through Fact-Lock™ guardrail filters...
              </span>
            </div>
          )}

          {!isLoading && improvedBullet && (
            <div className="space-y-3 animate-fade-in">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Fact-Lock™ Improved Suggestion
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{safetyScore}% Fact Safety</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-brand-500/[0.04] border border-brand-500/30 text-xs text-slate-900 dark:text-white font-medium leading-relaxed">
                  {improvedBullet}
                </div>
              </div>

              {changesSummary && (
                <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                  Rationale: {changesSummary}
                </p>
              )}

              {warnings.length > 0 && (
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-[11px] space-y-1">
                  {warnings.map((w, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{w}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {!isLoading && !improvedBullet && (
            <div className="py-6 text-center text-xs text-slate-400">
              Click any improvement strategy above to generate an elevated bullet point.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50 dark:bg-slate-950/60">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>

          <div className="flex items-center gap-2">
            {improvedBullet && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleGenerate(selectedAction)}
                className="gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Regenerate</span>
              </Button>
            )}

            <Button
              variant="primary"
              size="sm"
              onClick={handleApply}
              disabled={!improvedBullet || isLoading}
              className="gap-1.5 shadow-brand-500/20"
            >
              <span>Apply to Resume</span>
              <Check className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
