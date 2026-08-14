"use client";

import React from "react";
import { FileText, Sparkles, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SummarySectionProps {
  summary: string;
  onChange: (summary: string) => void;
}

export function SummarySection({ summary, onChange }: SummarySectionProps) {
  const charCount = summary ? summary.length : 0;
  const wordCount = summary ? summary.trim().split(/\s+/).filter(Boolean).length : 0;

  const getLengthAdvice = () => {
    if (wordCount === 0) return { text: "Provide a 2–4 sentence summary highlighting your core expertise and value proposition.", color: "text-slate-400" };
    if (wordCount < 20) return { text: "A bit short. Elaborate with core engineering domains or impact highlights.", color: "text-amber-400" };
    if (wordCount <= 75) return { text: "Optimal summary length (2–4 punchy sentences).", color: "text-emerald-400" };
    return { text: "Slightly long. Try keeping your summary concise and executive-level.", color: "text-amber-400" };
  };

  const advice = getLengthAdvice();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-brand-400" />
          <span>Professional Summary & Focus</span>
        </label>
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <span>{wordCount} words</span>
          <span>•</span>
          <span>{charCount} chars</span>
        </div>
      </div>

      <textarea
        value={summary || ""}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        placeholder="e.g. Senior Machine Learning Engineer with 4+ years of experience architecting end-to-end ML pipelines, fine-tuning LLMs, and deploying low-latency inference services. Proven track record of scaling RAG architectures handling 10M+ daily predictions."
        className="w-full px-3.5 py-3 rounded-xl bg-slate-950/70 border border-slate-800 text-sm text-white focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-all placeholder:text-slate-600 leading-relaxed resize-y"
      />

      <div className="flex items-center justify-between text-xs pt-1">
        <span className={advice.color}>
          {advice.text}
        </span>
        <Badge variant="proof" size="sm" className="hidden sm:inline-flex text-[10px] py-0">
          <ShieldCheck className="w-3 h-3" /> Fact-Lock AI Ready
        </Badge>
      </div>
    </div>
  );
}
