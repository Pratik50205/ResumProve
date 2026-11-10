"use client";

import React, { useState, useRef } from "react";
import {
  Undo2,
  Redo2,
  RotateCcw,
  Download,
  Upload,
  Sparkles,
  FileCode,
  Check,
  Copy,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BuilderHeaderProps {
  title: string;
  onUpdateTitle: (title: string) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  isAutosaving: boolean;
  lastSaved: Date | null;
  onLoadSample: (key: string) => void;
  onResetResume: () => void;
  onExportJSON: () => string;
  onImportJSON: (json: string) => boolean;
  onOpenImportModal?: () => void;
}

export function BuilderHeader({
  title,
  onUpdateTitle,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  isAutosaving,
  lastSaved,
  onLoadSample,
  onResetResume,
  onExportJSON,
  onImportJSON,
  onOpenImportModal
}: BuilderHeaderProps) {
  const [sampleMenuOpen, setSampleMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const samples = [
    { key: "ml-engineer", label: "Alex Chen — Machine Learning Engineer", role: "AI / ML" },
    { key: "software-engineer", label: "Maya Patel — Full-Stack Software Engineer", role: "Web Dev" },
    { key: "data-analyst", label: "Priya Sharma — Data Analyst & BI Specialist", role: "Analytics" },
    { key: "fresher", label: "Rohan Verma — AI & Computer Science Graduate", role: "Fresher" }
  ];

  const handleCopyJSON = () => {
    const json = onExportJSON();
    navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJSON = () => {
    const json = onExportJSON();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.toLowerCase().replace(/[^a-z0-9]/g, "-") || "resume"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const success = onImportJSON(text);
      if (!success) {
        setImportError("Invalid resume JSON format.");
        setTimeout(() => setImportError(null), 3000);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-4 shadow-md dark:shadow-xl backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* Title & Autosave state */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="flex flex-col flex-1 min-w-0">
          <input
            type="text"
            value={title}
            onChange={(e) => onUpdateTitle(e.target.value)}
            placeholder="Untitled Resume"
            className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-slate-700 focus:border-brand-500 focus:outline-none transition-colors truncate"
          />
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              {isAutosaving ? "Saving..." : "All changes saved locally"}
            </span>
            {lastSaved && !isAutosaving && (
              <span className="text-[10px] text-slate-500 hidden sm:inline">
                • {lastSaved.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Toolbar actions */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Undo / Redo */}
        <div className="flex items-center rounded-xl bg-slate-100 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 p-1 shadow-sm dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            title="Undo (Ctrl+Z)"
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            title="Redo (Ctrl+Y)"
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>

        {/* Sample Profile Switcher Dropdown */}
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSampleMenuOpen(!sampleMenuOpen)}
            className="text-xs gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-500 dark:text-brand-400" />
            <span>Load Sample Profile</span>
            <ChevronDown className="w-3 h-3 text-slate-500 dark:text-slate-400 ml-0.5" />
          </Button>

          {sampleMenuOpen && (
            <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white dark:bg-[#0e1626] border border-slate-200 dark:border-slate-700 shadow-2xl p-2 z-50 animate-fade-in space-y-1">
              <span className="px-3 py-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Select Realistic Profile
              </span>
              {samples.map((s) => (
                <button
                  key={s.key}
                  onClick={() => {
                    onLoadSample(s.key);
                    setSampleMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-950 dark:hover:text-white transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <span className="font-medium truncate pr-2">{s.label}</span>
                  <Badge variant="default" size="sm" className="text-[10px] py-0">
                    {s.role}
                  </Badge>
                </button>
              ))}
              <div className="pt-1.5 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => {
                    onResetResume();
                    setSampleMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Start from Blank Resume</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Import Document Button */}
        {onOpenImportModal && (
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenImportModal}
            className="text-xs gap-1.5 border-brand-500/30 hover:border-brand-500 text-brand-600 dark:text-brand-300"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Import Document</span>
          </Button>
        )}

        {/* JSON Portability */}
        <div className="flex items-center gap-1">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".json"
            className="hidden"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenImportModal ? onOpenImportModal() : fileInputRef.current?.click()}
            title="Import Resume (PDF, Word, or JSON)"
            className="text-xs p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <Upload className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleDownloadJSON}
            title="Download JSON Backup"
            className="text-xs p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <Download className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyJSON}
            title="Copy JSON to Clipboard"
            className="text-xs p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {importError && (
        <div className="w-full text-center text-xs text-rose-400 bg-rose-500/10 py-1 rounded-lg border border-rose-500/20">
          {importError}
        </div>
      )}
    </div>
  );
}
