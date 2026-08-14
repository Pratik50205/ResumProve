"use client";

import React from "react";
import { GraduationCap, Plus, Trash2, Award } from "lucide-react";
import { Education } from "@/types/resume";
import { Button } from "@/components/ui/button";

interface EducationSectionProps {
  education: Education[];
  onAdd: () => void;
  onUpdate: (id: string, updates: Partial<Education>) => void;
  onRemove: (id: string) => void;
}

export function EducationSection({
  education,
  onAdd,
  onUpdate,
  onRemove
}: EducationSectionProps) {
  return (
    <div className="space-y-4">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-brand-400" />
          <h3 className="text-sm font-bold text-white font-display">
            Education & Academics ({education.length})
          </h3>
        </div>
        <Button variant="primary" size="sm" onClick={onAdd} className="gap-1 text-xs">
          <Plus className="w-3.5 h-3.5" />
          <span>Add Education</span>
        </Button>
      </div>

      {education.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-800 p-8 text-center space-y-3">
          <p className="text-xs text-slate-400">No education entries added yet.</p>
          <Button variant="outline" size="sm" onClick={onAdd} className="text-xs">
            <Plus className="w-3.5 h-3.5 mr-1" /> Add Degree / University
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {education.map((edu, index) => (
            <div
              key={edu.id}
              className="rounded-2xl bg-slate-950/70 border border-slate-800/90 p-4 shadow-md space-y-3"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono text-xs font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="font-bold text-sm text-white truncate">
                    {edu.institution || "University / College"}
                  </span>
                </div>
                <button
                  onClick={() => onRemove(edu.id)}
                  title="Delete Entry"
                  className="p-1 rounded text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Institution */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[11px] font-semibold text-slate-300">University / College</label>
                  <input
                    type="text"
                    value={edu.institution || ""}
                    onChange={(e) => onUpdate(edu.id, { institution: e.target.value })}
                    placeholder="e.g. Stanford University"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-brand-500 focus:outline-none"
                  />
                </div>

                {/* Degree */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">Degree</label>
                  <input
                    type="text"
                    value={edu.degree || ""}
                    onChange={(e) => onUpdate(edu.id, { degree: e.target.value })}
                    placeholder="e.g. B.S. in Computer Science"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-brand-500 focus:outline-none"
                  />
                </div>

                {/* Field of Study */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">Major / Field of Study</label>
                  <input
                    type="text"
                    value={edu.fieldOfStudy || ""}
                    onChange={(e) => onUpdate(edu.id, { fieldOfStudy: e.target.value })}
                    placeholder="e.g. Artificial Intelligence & Data Science"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-brand-500 focus:outline-none"
                  />
                </div>

                {/* Start & End Dates */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">Graduation Timeline</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={edu.startDate || ""}
                      onChange={(e) => onUpdate(edu.id, { startDate: e.target.value })}
                      placeholder="Start (YYYY-MM)"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-brand-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={edu.endDate || ""}
                      onChange={(e) => onUpdate(edu.id, { endDate: e.target.value })}
                      placeholder="Grad (YYYY-MM)"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-brand-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* GPA */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">GPA (Optional)</label>
                  <input
                    type="text"
                    value={edu.gpa || ""}
                    onChange={(e) => onUpdate(edu.id, { gpa: e.target.value })}
                    placeholder="e.g. 3.85 / 4.0"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
