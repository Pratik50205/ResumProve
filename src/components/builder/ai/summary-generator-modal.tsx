"use client";

import React, { useState } from "react";
import {
  Sparkles,
  ShieldCheck,
  Check,
  X,
  Loader2,
  Cpu,
  Briefcase,
  GraduationCap,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Resume } from "@/types/resume";

interface SummaryGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  resume: Resume;
  currentSummary: string;
  onApply: (summary: string) => void;
}

export function SummaryGeneratorModal({
  isOpen,
  onClose,
  resume,
  currentSummary,
  onApply,
}: SummaryGeneratorModalProps) {
  const [tone, setTone] = useState<"technical" | "executive" | "fresher" | "tailored">("technical");
  const [generatedSummary, setGeneratedSummary] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async (selectedTone: "technical" | "executive" | "fresher" | "tailored" = tone) => {
    setIsLoading(true);
    setErrorMessage(null);
    setTone(selectedTone);

    try {
      const res = await fetch("/api/ai/generate-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentSummary,
          resume,
          tone: selectedTone,
          targetRole: resume.personal.title,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to generate summary.");
      }

      setGeneratedSummary(json.data.summary);
    } catch (err: any) {
      console.error("AI Summary error:", err);
      setErrorMessage(err.message || "Failed to communicate with AI engine.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    if (generatedSummary) {
      onApply(generatedSummary);
      onClose();
    }
  };

  const tonePresets = [
    {
      id: "technical" as const,
      label: "Technical Specialist",
      desc: "Focuses on engineering rigor, frameworks & architecture",
      icon: Cpu,
    },
    {
      id: "executive" as const,
      label: "Executive & Strategic",
      desc: "Focuses on leadership, cross-functional delivery & scale",
      icon: Briefcase,
    },
    {
      id: "fresher" as const,
      label: "Graduate / Early Career",
      desc: "Emphasizes strong CS fundamentals and rapid adaptability",
      icon: GraduationCap,
    },
  ];

  const wordCount = (generatedSummary || currentSummary || "").trim().split(/\s+/).filter(Boolean).length;

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
                  Fact-Lock™ Summary Architect
                </h3>
                <Badge variant="proof" size="sm" className="text-[10px]">
                  Factual Context
                </Badge>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Crafts a concise 3–4 sentence executive summary based on your actual profile
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
          {/* Tone Selector */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Select Target Persona
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {tonePresets.map((t) => {
                const Icon = t.icon;
                const isSelected = tone === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleGenerate(t.id)}
                    disabled={isLoading}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-1.5 ${
                      isSelected
                        ? "bg-brand-500/10 border-brand-500/60 shadow-sm ring-1 ring-brand-500/30"
                        : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Icon className={`w-4 h-4 ${isSelected ? "text-brand-600 dark:text-brand-400" : "text-slate-400"}`} />
                      <span className="font-bold text-xs text-slate-900 dark:text-white truncate">
                        {t.label}
                      </span>
                    </div>
                    <span className="text-[10.5px] text-slate-500 dark:text-slate-400 leading-tight">
                      {t.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Loading */}
          {isLoading && (
            <div className="py-10 flex flex-col items-center justify-center space-y-2.5 text-center">
              <Loader2 className="w-7 h-7 animate-spin text-brand-500" />
              <span className="text-xs text-slate-500 font-medium">
                Synthesizing career trajectory & technical ontology...
              </span>
            </div>
          )}

          {/* Generated Text */}
          {!isLoading && generatedSummary && (
            <div className="space-y-2 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Generated Draft
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {wordCount} words (Ideal: 40–60)
                </span>
              </div>

              <textarea
                value={generatedSummary}
                onChange={(e) => setGeneratedSummary(e.target.value)}
                rows={4}
                className="w-full p-3.5 rounded-2xl bg-slate-100/70 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500 leading-relaxed font-sans"
              />

              <div className="flex items-center gap-2 text-[11px] text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Fact-Lock™ Guaranteed: Grounded strictly in your skills and background.</span>
              </div>
            </div>
          )}

          {!isLoading && !generatedSummary && (
            <div className="py-6 text-center text-xs text-slate-400">
              Select any persona above to draft an ATS-tailored professional summary.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50 dark:bg-slate-950/60">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>

          <div className="flex items-center gap-2">
            {generatedSummary && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleGenerate(tone)}
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
              disabled={!generatedSummary || isLoading}
              className="gap-1.5 shadow-brand-500/20"
            >
              <span>Apply to Summary</span>
              <Check className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

