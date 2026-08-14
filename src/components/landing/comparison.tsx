"use client";

import React from "react";
import { Check, X, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Comparison() {
  const comparisonData = [
    {
      feature: "Fact-Lock™ AI Guardrails (Zero hallucinated metrics/roles)",
      resumprove: true,
      traditional: false,
      genericAi: false,
    },
    {
      feature: "Semantic Job Compatibility (meaning over exact keywords)",
      resumprove: true,
      traditional: false,
      genericAi: "Partial",
    },
    {
      feature: "The Proof Score™ (Verifying evidence for claimed skills)",
      resumprove: true,
      traditional: false,
      genericAi: false,
    },
    {
      feature: "Explainable AI recommendations with 'Why?' rationales",
      resumprove: true,
      traditional: false,
      genericAi: false,
    },
    {
      feature: "ATS-Safe Clean Selectable PDF Output (Standard A4)",
      resumprove: true,
      traditional: "Partial",
      genericAi: false,
    },
    {
      feature: "Deterministic Scoring Algorithms (No random AI numbers)",
      resumprove: true,
      traditional: false,
      genericAi: false,
    },
    {
      feature: "Multi-Format Parser (PDF, DOCX, TXT with confidence ratings)",
      resumprove: true,
      traditional: "Basic",
      genericAi: "Basic",
    },
  ];

  return (
    <section className="py-20 lg:py-28 relative bg-[#070a11] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="brand" size="md">
            Market Comparison
          </Badge>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
            Engineered for Truth. <br />
            <span className="gradient-text-brand">Built for Results.</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            See how ResumProve stacks up against legacy drag-and-drop builders and uncontrolled generic AI text generators.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[700px] rounded-3xl bg-slate-900/70 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-800 pb-4">
                  <th className="py-4 px-4 text-sm font-semibold text-slate-300 w-1/2">
                    Core Capability
                  </th>
                  <th className="py-4 px-4 text-center text-sm font-bold text-white bg-brand-500/10 rounded-t-xl border-t border-x border-brand-500/30">
                    <div className="flex items-center justify-center gap-1.5 text-brand-300">
                      <ShieldCheck className="w-4 h-4 text-brand-400" />
                      <span>ResumProve</span>
                    </div>
                  </th>
                  <th className="py-4 px-4 text-center text-sm font-medium text-slate-400">
                    Legacy Builders
                  </th>
                  <th className="py-4 px-4 text-center text-sm font-medium text-slate-400">
                    Generic AI Generators
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
                {comparisonData.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-800/20 transition-colors">
                    <td className="py-4 px-4 font-medium text-slate-200">
                      {row.feature}
                    </td>

                    {/* ResumProve Col */}
                    <td className="py-4 px-4 text-center bg-brand-500/5 border-x border-brand-500/20">
                      <div className="flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                      </div>
                    </td>

                    {/* Legacy Builders Col */}
                    <td className="py-4 px-4 text-center text-slate-400">
                      {typeof row.traditional === "boolean" ? (
                        row.traditional ? (
                          <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-slate-600 mx-auto" />
                        )
                      ) : (
                        <span className="text-slate-500 text-xs font-mono">{row.traditional}</span>
                      )}
                    </td>

                    {/* Generic AI Generators Col */}
                    <td className="py-4 px-4 text-center text-slate-400">
                      {typeof row.genericAi === "boolean" ? (
                        row.genericAi ? (
                          <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-rose-500/60 mx-auto" />
                        )
                      ) : (
                        <span className="text-amber-400/80 text-xs font-mono">{row.genericAi}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
