"use client";

import React, { useState } from "react";
import { Wrench, Plus, X, Sparkles, Check } from "lucide-react";
import { SkillGroups } from "@/types/resume";
import { SKILL_KNOWLEDGE_BASE } from "@/data/skills";
import { Button } from "@/components/ui/button";

interface SkillsSectionProps {
  skills: SkillGroups;
  onAddSkill: (category: keyof SkillGroups, skill: string) => void;
  onRemoveSkill: (category: keyof SkillGroups, skill: string) => void;
}

export function SkillsSection({
  skills,
  onAddSkill,
  onRemoveSkill
}: SkillsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<keyof SkillGroups>("programming");
  const [customInput, setCustomInput] = useState("");

  const categories: { key: keyof SkillGroups; label: string }[] = [
    { key: "programming", label: "Programming" },
    { key: "aiMl", label: "AI / ML" },
    { key: "dataScience", label: "Data Science" },
    { key: "frontend", label: "Frontend" },
    { key: "backend", label: "Backend" },
    { key: "databases", label: "Databases" },
    { key: "cloud", label: "Cloud" },
    { key: "devops", label: "DevOps" },
    { key: "tools", label: "Tools" },
    { key: "mobile", label: "Mobile" },
    { key: "testing", label: "Testing & QA" },
    { key: "cybersecurity", label: "Cybersecurity" },
    { key: "systemDesign", label: "System Design" },
    { key: "softSkills", label: "Soft Skills" }
  ];

  const currentSkillList = (skills[activeCategory] as string[]) || [];

  const handleAddCustom = () => {
    const clean = customInput.trim();
    if (!clean) return;
    onAddSkill(activeCategory, clean);
    setCustomInput("");
  };

  // Recommendations from curated KB for active category
  const kbSuggestions = SKILL_KNOWLEDGE_BASE.filter(s => {
    const mapCategory: Record<string, string> = {
      programming: "Programming",
      aiMl: "AI/ML",
      dataScience: "Data Science",
      frontend: "Frontend",
      backend: "Backend",
      databases: "Databases",
      cloud: "Cloud",
      devops: "DevOps",
      tools: "Tools",
      mobile: "Mobile",
      testing: "Testing",
      cybersecurity: "Cybersecurity",
      systemDesign: "System Design",
      softSkills: "Soft Skills"
    };
    return s.category === mapCategory[activeCategory];
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Wrench className="w-4 h-4 text-brand-400" />
          <h3 className="text-sm font-bold text-white font-display">
            Technical & Domain Skills
          </h3>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-slate-950/70 border border-slate-800">
        {categories.map((cat) => {
          const count = ((skills[cat.key] as string[]) || []).length;
          const isSelected = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isSelected
                  ? "bg-brand-600 text-white shadow-md shadow-brand-500/20"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
              }`}
            >
              <span>{cat.label}</span>
              {count > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"}`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Category Skill Tags Box */}
      <div className="rounded-2xl bg-slate-950/70 border border-slate-800 p-4 space-y-4">
        {/* Custom Input */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddCustom();
              }
            }}
            placeholder={`Add ${categories.find(c => c.key === activeCategory)?.label} skill...`}
            className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500"
          />
          <Button variant="primary" size="sm" onClick={handleAddCustom} className="text-xs">
            <Plus className="w-3.5 h-3.5 mr-1" /> Add
          </Button>
        </div>

        {/* Current Active Skills */}
        <div className="space-y-2">
          <span className="text-[11px] font-semibold text-slate-400 block">
            Selected Skills in this Category:
          </span>

          {currentSkillList.length === 0 ? (
            <p className="text-xs text-slate-500 italic py-2">
              No skills added under this category yet. Type a skill above or click from suggestions below.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {currentSkillList.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-brand-500/15 border border-brand-500/30 text-xs font-semibold text-brand-200 group"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => onRemoveSkill(activeCategory, skill)}
                    className="text-brand-400 hover:text-rose-400 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Quick-Add Suggestions from Curated Knowledge Base */}
        {kbSuggestions.length > 0 && (
          <div className="pt-3 border-t border-slate-800/80 space-y-2">
            <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Recommended from Ontology (Click to add):</span>
            </span>

            <div className="flex flex-wrap gap-1.5">
              {kbSuggestions.map((item) => {
                const isAlreadyAdded = currentSkillList.some(s => s.toLowerCase() === item.name.toLowerCase());
                return (
                  <button
                    key={item.name}
                    disabled={isAlreadyAdded}
                    onClick={() => onAddSkill(activeCategory, item.name)}
                    className={`px-2.5 py-1 rounded-lg text-xs transition-all flex items-center gap-1 ${
                      isAlreadyAdded
                        ? "bg-slate-900/40 text-slate-600 border border-slate-800 cursor-default"
                        : "bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60"
                    }`}
                  >
                    {isAlreadyAdded ? <Check className="w-3 h-3 text-emerald-500" /> : <Plus className="w-3 h-3" />}
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
