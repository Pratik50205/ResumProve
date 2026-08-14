"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Sparkles,
  MapPin,
  Calendar,
  Building,
  CheckSquare,
  Square
} from "lucide-react";
import { Experience } from "@/types/resume";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ExperienceSectionProps {
  experience: Experience[];
  onAdd: () => void;
  onUpdate: (id: string, updates: Partial<Experience>) => void;
  onRemove: (id: string) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
  onAddBullet: (expId: string, text?: string) => void;
  onUpdateBullet: (expId: string, index: number, text: string) => void;
  onRemoveBullet: (expId: string, index: number) => void;
}

export function ExperienceSection({
  experience,
  onAdd,
  onUpdate,
  onRemove,
  onReorder,
  onAddBullet,
  onUpdateBullet,
  onRemoveBullet
}: ExperienceSectionProps) {
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    experience.forEach((e, idx) => {
      initial[e.id] = idx === 0; // First item expanded by default
    });
    return initial;
  });

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-4">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-brand-400" />
          <h3 className="text-sm font-bold text-white font-display">
            Work Experience ({experience.length})
          </h3>
        </div>
        <Button variant="primary" size="sm" onClick={onAdd} className="gap-1 text-xs">
          <Plus className="w-3.5 h-3.5" />
          <span>Add Position</span>
        </Button>
      </div>

      {experience.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-800 p-8 text-center space-y-3">
          <p className="text-xs text-slate-400">No work experience entries added yet.</p>
          <Button variant="outline" size="sm" onClick={onAdd} className="text-xs">
            <Plus className="w-3.5 h-3.5 mr-1" /> Add Your First Role
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {experience.map((exp, index) => {
            const isExpanded = expandedIds[exp.id] ?? true;

            return (
              <div
                key={exp.id}
                className="rounded-2xl bg-slate-950/70 border border-slate-800/90 p-4 transition-all shadow-md space-y-3"
              >
                {/* Collapsible Card Header */}
                <div className="flex items-center justify-between gap-3 cursor-pointer" onClick={() => toggleExpand(exp.id)}>
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400 font-mono text-xs font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white truncate">
                          {exp.title || "Job Title"}
                        </span>
                        {exp.isCurrent && (
                          <Badge variant="proof" size="sm" className="py-0 text-[10px]">
                            Current
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 truncate block">
                        {exp.company || "Company"} • {exp.startDate || "Start"} — {exp.isCurrent ? "Present" : (exp.endDate || "End")}
                      </span>
                    </div>
                  </div>

                  {/* Reorder and Delete controls */}
                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      disabled={index === 0}
                      onClick={() => onReorder(index, index - 1)}
                      title="Move Up"
                      className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-20 hover:bg-slate-800"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      disabled={index === experience.length - 1}
                      onClick={() => onReorder(index, index + 1)}
                      title="Move Down"
                      className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-20 hover:bg-slate-800"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onRemove(exp.id)}
                      title="Delete Entry"
                      className="p-1 rounded text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 ml-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Form Body when expanded */}
                {isExpanded && (
                  <div className="pt-3 border-t border-slate-800/80 space-y-4 animate-fade-in">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Job Title */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-300">Job Title</label>
                        <input
                          type="text"
                          value={exp.title || ""}
                          onChange={(e) => onUpdate(exp.id, { title: e.target.value })}
                          placeholder="e.g. Senior Software Engineer"
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-brand-500 focus:outline-none"
                        />
                      </div>

                      {/* Company Name */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-300">Company Name</label>
                        <input
                          type="text"
                          value={exp.company || ""}
                          onChange={(e) => onUpdate(exp.id, { company: e.target.value })}
                          placeholder="e.g. Acme Corp"
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-brand-500 focus:outline-none"
                        />
                      </div>

                      {/* Location */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-300">Location</label>
                        <input
                          type="text"
                          value={exp.location || ""}
                          onChange={(e) => onUpdate(exp.id, { location: e.target.value })}
                          placeholder="e.g. San Francisco, CA"
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-brand-500 focus:outline-none"
                        />
                      </div>

                      {/* Dates */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-300">Start Date</label>
                          <input
                            type="text"
                            value={exp.startDate || ""}
                            onChange={(e) => onUpdate(exp.id, { startDate: e.target.value })}
                            placeholder="YYYY-MM"
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-brand-500 focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-300">End Date</label>
                          <input
                            type="text"
                            disabled={exp.isCurrent}
                            value={exp.isCurrent ? "Present" : (exp.endDate || "")}
                            onChange={(e) => onUpdate(exp.id, { endDate: e.target.value })}
                            placeholder="YYYY-MM"
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white disabled:opacity-60 focus:border-brand-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Current role checkbox */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onUpdate(exp.id, { isCurrent: !exp.isCurrent, endDate: !exp.isCurrent ? "Present" : "" })}
                        className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white"
                      >
                        {exp.isCurrent ? (
                          <CheckSquare className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-500" />
                        )}
                        <span>I currently work in this role</span>
                      </button>
                    </div>

                    {/* Bullet Points List */}
                    <div className="space-y-2 pt-2 border-t border-slate-900">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-300">
                          Achievement & Responsibility Bullets
                        </span>
                        <button
                          onClick={() => onAddBullet(exp.id)}
                          className="text-[11px] font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> Add Bullet
                        </button>
                      </div>

                      <div className="space-y-2">
                        {(exp.bullets || []).map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-2 group">
                            <span className="text-slate-500 font-bold text-xs mt-2.5">•</span>
                            <textarea
                              rows={2}
                              value={bullet}
                              onChange={(e) => onUpdateBullet(exp.id, bIdx, e.target.value)}
                              placeholder="Describe your achievement using strong action verbs..."
                              className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-brand-500 focus:outline-none resize-y placeholder:text-slate-600"
                            />
                            <button
                              onClick={() => onRemoveBullet(exp.id, bIdx)}
                              title="Delete Bullet"
                              className="p-1.5 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 mt-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
