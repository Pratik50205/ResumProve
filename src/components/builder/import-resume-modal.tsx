"use client";

import React, { useState, useRef } from "react";
import {
  Upload,
  FileText,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  X,
  ArrowRight,
  ShieldCheck,
  Loader2,
  Sparkles,
  Layers,
  Briefcase,
  GraduationCap,
  Wrench,
  User,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Resume, ResumeParseResult } from "@/types/resume";

interface ImportResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (parsedResume: Resume, mode: "replace" | "merge") => void;
  onImportJSON: (jsonString: string) => void;
}

type ModalTab = "document" | "json";

export function ImportResumeModal({
  isOpen,
  onClose,
  onApply,
  onImportJSON,
}: ImportResumeModalProps) {
  const [activeTab, setActiveTab] = useState<ModalTab>("document");
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadStep, setUploadStep] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [parseResult, setParseResult] = useState<ResumeParseResult | null>(null);
  const [importMode, setImportMode] = useState<"replace" | "merge">("replace");
  const [jsonText, setJsonText] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      await processFile(files[0]);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await processFile(files[0]);
    }
  };

  const processFile = async (file: File) => {
    setErrorMessage(null);
    setIsUploading(true);
    setUploadStep("Reading document binary...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploadStep("Extracting text and structure...");
      const res = await fetch("/api/parse-resume", {
        method: "POST",
        body: formData,
      });

      setUploadStep("Detecting sections & mapping skill ontology...");
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to parse document.");
      }

      setUploadStep("Calculating confidence scores...");
      setTimeout(() => {
        setParseResult(json.data as ResumeParseResult);
        setIsUploading(false);
      }, 400);
    } catch (err: any) {
      console.error("Upload error:", err);
      setErrorMessage(err.message || "An error occurred while parsing the resume.");
      setIsUploading(false);
    }
  };

  const handleApply = () => {
    if (parseResult) {
      onApply(parseResult.resume, importMode);
      handleClose();
    }
  };

  const handleJSONSubmit = () => {
    if (!jsonText.trim()) return;
    try {
      onImportJSON(jsonText);
      handleClose();
    } catch (err: any) {
      setErrorMessage("Invalid JSON format. Please verify your file syntax.");
    }
  };

  const handleClose = () => {
    setParseResult(null);
    setErrorMessage(null);
    setIsUploading(false);
    setJsonText("");
    onClose();
  };

  const getConfidenceBadgeColor = (overall: number) => {
    if (overall >= 85) return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30";
    if (overall >= 70) return "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30";
    return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30";
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                {parseResult ? "Review Extracted Resume" : "Import Existing Resume"}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {parseResult
                  ? `Extracted from ${parseResult.fileName || "document"} with ${parseResult.confidence.overall}% confidence`
                  : "Upload PDF, Word DOCX, or Plain Text to auto-populate the builder"}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {/* Format Tabs (if not yet parsed) */}
          {!parseResult && !isUploading && (
            <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800/80 p-1 w-fit text-xs font-semibold">
              <button
                onClick={() => setActiveTab("document")}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTab === "document"
                    ? "bg-brand-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>PDF / DOCX / TXT</span>
              </button>
              <button
                onClick={() => setActiveTab("json")}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTab === "json"
                    ? "bg-brand-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Raw JSON Backup</span>
              </button>
            </div>
          )}

          {/* Error Message Alert */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* State 1: Uploading & Parsing Indicator */}
          {isUploading && (
            <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center">
              <div className="w-16 h-16 rounded-3xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-600 dark:text-brand-400 animate-pulse">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display text-base font-bold text-slate-900 dark:text-white">
                  Document Intelligence Engine
                </h4>
                <p className="text-xs text-brand-600 dark:text-brand-400 font-medium">
                  {uploadStep}
                </p>
              </div>
              <div className="max-w-xs w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-brand-500 h-full w-2/3 animate-[pulse_1.5s_infinite]" />
              </div>
            </div>
          )}

          {/* State 2: Document Drop Zone */}
          {!parseResult && !isUploading && activeTab === "document" && (
            <div className="space-y-4">
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-3xl p-8 sm:p-10 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center space-y-3.5 ${
                  isDragging
                    ? "border-brand-500 bg-brand-50/50 dark:bg-brand-950/20 scale-[0.99]"
                    : "border-slate-300 dark:border-slate-700/80 hover:border-brand-400 hover:bg-slate-50 dark:hover:bg-slate-800/40"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                <div className="w-14 h-14 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 flex items-center justify-center shadow-inner">
                  <Upload className="w-7 h-7" />
                </div>

                <div className="space-y-1">
                  <h4 className="font-display text-base font-bold text-slate-900 dark:text-white">
                    Drop your resume here, or <span className="text-brand-600 dark:text-brand-400 underline">browse</span>
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Supports PDF (`.pdf`), Word (`.docx`), and Plain Text (`.txt`) up to 10MB
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    PDF (pdfjs-dist)
                  </span>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    DOCX (mammoth)
                  </span>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    TXT (Stream)
                  </span>
                </div>
              </div>

              {/* Security & Zero Hallucination Guarantee */}
              <div className="p-3.5 rounded-2xl bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Non-Destructive Parsing:</strong> Your original text is parsed deterministically into structured sections with confidence scoring. You can inspect and approve every field before it touches your resume.
                </span>
              </div>
            </div>
          )}

          {/* State 3: Raw JSON Input (Legacy Fallback) */}
          {!parseResult && !isUploading && activeTab === "json" && (
            <div className="space-y-4">
              <textarea
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                placeholder='Paste raw ResumProve JSON state here: { "personal": { ... }, "experience": [ ... ] }'
                rows={10}
                className="w-full rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 p-4 text-xs font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <Button
                variant="primary"
                size="md"
                onClick={handleJSONSubmit}
                disabled={!jsonText.trim()}
                className="w-full"
              >
                Import JSON Resume
              </Button>
            </div>
          )}

          {/* State 4: Interactive Review & Confidence Screen */}
          {parseResult && (
            <div className="space-y-5 animate-fade-in">
              {/* Confidence Banner */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                <div className="space-y-0.5">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Overall Extraction Confidence
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-slate-900 dark:text-white font-display">
                      {parseResult.confidence.overall}%
                    </span>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${getConfidenceBadgeColor(parseResult.confidence.overall)}`}>
                      {parseResult.confidence.overall >= 85
                        ? "High Fidelity"
                        : parseResult.confidence.overall >= 70
                        ? "Good Match"
                        : "Needs Manual Review"}
                    </span>
                  </div>
                </div>

                {/* Import Mode Selector */}
                <div className="flex items-center gap-2 text-xs">
                  <label className="text-slate-500 dark:text-slate-400 font-medium">Mode:</label>
                  <div className="flex rounded-xl bg-slate-200 dark:bg-slate-900 p-0.5 border border-slate-300 dark:border-slate-800">
                    <button
                      onClick={() => setImportMode("replace")}
                      className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                        importMode === "replace"
                          ? "bg-brand-600 text-white shadow-sm"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      Replace Resume
                    </button>
                    <button
                      onClick={() => setImportMode("merge")}
                      className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                        importMode === "merge"
                          ? "bg-brand-600 text-white shadow-sm"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      Merge Sections
                    </button>
                  </div>
                </div>
              </div>

              {/* Extracted Sections Preview Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* 1. Personal & Contact */}
                <div className="p-4 rounded-2xl surface-card border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-brand-500" />
                      <span>Candidate Identity</span>
                    </span>
                    <span className="text-[10.5px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                      {Math.round(parseResult.confidence.fields.fullName.confidence * 100)}%
                    </span>
                  </div>
                  <div className="space-y-1 text-slate-700 dark:text-slate-300">
                    <p className="font-bold text-sm text-slate-900 dark:text-white">
                      {parseResult.resume.personal.fullName}
                    </p>
                    <p className="text-slate-500 dark:text-slate-400">
                      {parseResult.resume.personal.title}
                    </p>
                    <p className="text-[11px]">
                      {parseResult.resume.personal.email || "No email detected"} • {parseResult.resume.personal.phone || "No phone"}
                    </p>
                    {parseResult.resume.personal.location && (
                      <p className="text-[11px] text-slate-500">{parseResult.resume.personal.location}</p>
                    )}
                  </div>
                </div>

                {/* 2. Skills & Taxonomy */}
                <div className="p-4 rounded-2xl surface-card border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Extracted Skills</span>
                    </span>
                    <span className="text-[10.5px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                      {Math.round(parseResult.confidence.fields.skills.confidence * 100)}%
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
                    {[
                      ...(parseResult.resume.skills.programming || []),
                      ...(parseResult.resume.skills.aiMl || []),
                      ...(parseResult.resume.skills.frontend || []),
                      ...(parseResult.resume.skills.backend || []),
                      ...(parseResult.resume.skills.databases || []),
                      ...(parseResult.resume.skills.cloud || []),
                    ].slice(0, 16).map((s, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-[10.5px] px-2 py-0.5 rounded-md font-medium border border-slate-200 dark:border-slate-700"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3. Work Experience */}
                <div className="p-4 rounded-2xl surface-card border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-sky-500" />
                      <span>Work Experience</span>
                    </span>
                    <span className="text-[10.5px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                      {parseResult.resume.experience?.length || 0} Roles
                    </span>
                  </div>
                  <div className="space-y-1.5 max-h-24 overflow-y-auto">
                    {parseResult.resume.experience?.map((exp, i) => (
                      <div key={i} className="text-[11px] leading-tight">
                        <span className="font-bold text-slate-900 dark:text-white">{exp.title}</span>
                        <span className="text-slate-500"> @ {exp.company}</span>
                        <span className="text-slate-400 text-[10px]"> ({exp.startDate} - {exp.endDate})</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Education */}
                <div className="p-4 rounded-2xl surface-card border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-purple-500" />
                      <span>Education</span>
                    </span>
                    <span className="text-[10.5px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                      {parseResult.resume.education?.length || 0} Degrees
                    </span>
                  </div>
                  <div className="space-y-1.5 max-h-24 overflow-y-auto">
                    {parseResult.resume.education?.map((edu, i) => (
                      <div key={i} className="text-[11px] leading-tight">
                        <span className="font-bold text-slate-900 dark:text-white">{edu.institution}</span>
                        <span className="text-slate-500"> — {edu.degree}</span>
                        {edu.gpa && <span className="text-slate-400 font-mono text-[10px]"> (GPA: {edu.gpa})</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50 dark:bg-slate-950/60">
          {parseResult ? (
            <>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setParseResult(null)}
              >
                Upload Different File
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleApply}
                className="gap-1.5 shadow-brand-500/20"
              >
                <span>Apply to Resume Builder</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </>
          ) : (
            <div className="w-full flex justify-end">
              <Button variant="secondary" size="sm" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

