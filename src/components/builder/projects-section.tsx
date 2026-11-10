"use client";

import React, { useState } from "react";
import {
  FolderGit2,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Github,
  Globe,
  Tag,
  X,
  Sparkles
} from "lucide-react";
import { Project } from "@/types/resume";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BulletImproverModal } from "./ai/bullet-improver-modal";

interface ProjectsSectionProps {
  projects: Project[];
  onAdd: () => void;
  onUpdate: (id: string, updates: Partial<Project>) => void;
  onRemove: (id: string) => void;
  onAddBullet: (projId: string, text?: string) => void;
  onUpdateBullet: (projId: string, index: number, text: string) => void;
  onRemoveBullet: (projId: string, index: number) => void;
}

export function ProjectsSection({
  projects,
  onAdd,
  onUpdate,
  onRemove,
  onAddBullet,
  onUpdateBullet,
  onRemoveBullet
}: ProjectsSectionProps) {
  const [tagInput, setTagInput] = useState<Record<string, string>>({});
  const [activeBulletModal, setActiveBulletModal] = useState<{
    projId: string;
    bulletIndex: number;
    bulletText: string;
    projectName: string;
    technologies: string[];
  } | null>(null);

  const handleAddTag = (projId: string) => {
    const raw = tagInput[projId]?.trim();
    if (!raw) return;
    const project = projects.find(p => p.id === projId);
    if (!project) return;
    const currentTags = project.technologies || [];
    if (!currentTags.includes(raw)) {
      onUpdate(projId, { technologies: [...currentTags, raw] });
    }
    setTagInput(prev => ({ ...prev, [projId]: "" }));
  };

  const handleRemoveTag = (projId: string, tagToRemove: string) => {
    const project = projects.find(p => p.id === projId);
    if (!project) return;
    onUpdate(projId, {
      technologies: (project.technologies || []).filter(t => t !== tagToRemove)
    });
  };

  return (
    <div className="space-y-4">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <FolderGit2 className="w-4 h-4 text-brand-400" />
          <h3 className="text-sm font-bold text-white font-display">
            Key Projects ({projects.length})
          </h3>
        </div>
        <Button variant="primary" size="sm" onClick={onAdd} className="gap-1 text-xs">
          <Plus className="w-3.5 h-3.5" />
          <span>Add Project</span>
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-800 p-8 text-center space-y-3">
          <p className="text-xs text-slate-400">No project showcases added yet.</p>
          <Button variant="outline" size="sm" onClick={onAdd} className="text-xs">
            <Plus className="w-3.5 h-3.5 mr-1" /> Add Technical Project
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((proj, index) => (
            <div
              key={proj.id}
              className="rounded-2xl bg-slate-950/70 border border-slate-800/90 p-4 shadow-md space-y-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-mono text-xs font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="font-bold text-sm text-white truncate">
                    {proj.name || "Project Title"}
                  </span>
                </div>
                <button
                  onClick={() => onRemove(proj.id)}
                  title="Delete Project"
                  className="p-1 rounded text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Project Name */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[11px] font-semibold text-slate-300">Project Name</label>
                  <input
                    type="text"
                    value={proj.name || ""}
                    onChange={(e) => onUpdate(proj.id, { name: e.target.value })}
                    placeholder="e.g. VectorFlow — Semantic Search & QA"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-brand-500 focus:outline-none"
                  />
                </div>

                {/* GitHub URL */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                    <Github className="w-3 h-3 text-slate-400" />
                    <span>GitHub Repository</span>
                  </label>
                  <input
                    type="url"
                    value={proj.githubUrl || ""}
                    onChange={(e) => onUpdate(proj.id, { githubUrl: e.target.value })}
                    placeholder="https://github.com/user/project"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-brand-500 focus:outline-none"
                  />
                </div>

                {/* Live Demo URL */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                    <Globe className="w-3 h-3 text-slate-400" />
                    <span>Live Demo / App URL</span>
                  </label>
                  <input
                    type="url"
                    value={proj.liveUrl || ""}
                    onChange={(e) => onUpdate(proj.id, { liveUrl: e.target.value })}
                    placeholder="https://myproject.app"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-brand-500 focus:outline-none"
                  />
                </div>

                {/* Tech Stack Tags */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                    <Tag className="w-3 h-3 text-slate-400" />
                    <span>Technologies Used</span>
                  </label>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {(proj.technologies || []).map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-900 border border-slate-700/80 text-xs text-slate-200"
                      >
                        <span>{tech}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(proj.id, tech)}
                          className="text-slate-400 hover:text-rose-400"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}

                    <div className="inline-flex items-center gap-1">
                      <input
                        type="text"
                        value={tagInput[proj.id] || ""}
                        onChange={(e) => setTagInput(prev => ({ ...prev, [proj.id]: e.target.value }))}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddTag(proj.id);
                          }
                        }}
                        placeholder="Add tech (Press Enter)..."
                        className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500 w-36"
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => handleAddTag(proj.id)}
                        className="py-1 px-2 text-[10px]"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bullet Points */}
              <div className="space-y-2 pt-2 border-t border-slate-900">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300">
                    Project Deliverables & Metric Bullets
                  </span>
                  <button
                    onClick={() => onAddBullet(proj.id)}
                    className="text-[11px] font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Bullet
                  </button>
                </div>

                <div className="space-y-2">
                  {(proj.bullets || []).map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2">
                      <span className="text-slate-500 font-bold text-xs mt-2.5">•</span>
                      <textarea
                        rows={2}
                        value={bullet}
                        onChange={(e) => onUpdateBullet(proj.id, bIdx, e.target.value)}
                        placeholder="Describe key architectural or technical accomplishment..."
                        className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-brand-500 focus:outline-none resize-y placeholder:text-slate-600"
                      />
                      <div className="flex items-center gap-1 mt-1 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveBulletModal({
                              projId: proj.id,
                              bulletIndex: bIdx,
                              bulletText: bullet,
                              projectName: proj.name,
                              technologies: proj.technologies || [],
                            })
                          }
                          title="Fact-Lock™ AI Bullet Improver"
                          className="p-1.5 rounded-lg text-brand-400 hover:text-brand-300 hover:bg-brand-500/10 border border-brand-500/20 transition-colors flex items-center gap-1 text-[11px] font-semibold"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">AI Fix</span>
                        </button>
                        <button
                          onClick={() => onRemoveBullet(proj.id, bIdx)}
                          title="Delete Bullet"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeBulletModal && (
        <BulletImproverModal
          isOpen={!!activeBulletModal}
          onClose={() => setActiveBulletModal(null)}
          originalBullet={activeBulletModal.bulletText}
          onApply={(improved) => {
            onUpdateBullet(activeBulletModal.projId, activeBulletModal.bulletIndex, improved);
            setActiveBulletModal(null);
          }}
          context={{
            role: activeBulletModal.projectName,
            skillsUsed: activeBulletModal.technologies,
          }}
        />
      )}
    </div>
  );
}
