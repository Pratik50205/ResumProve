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
  Info,
  Trash2,
  Plus
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
  const [editedResume, setEditedResume] = useState<Resume | null>(null);
  const [newSkillInput, setNewSkillInput] = useState<string>("");
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
        const result = json.data as ResumeParseResult;
        setParseResult(result);
        setEditedResume(JSON.parse(JSON.stringify(result.resume)));
        setIsUploading(false);
      }, 400);
    } catch (err: any) {
      console.error("Upload error:", err);
      setErrorMessage(err.message || "An error occurred while parsing the resume.");
      setIsUploading(false);
    }
  };

  const handleApply = () => {
    const targetResume = editedResume || parseResult?.resume;
    if (targetResume) {
      onApply(targetResume, importMode);
      handleClose();
    }
  };

  const updatePersonal = (field: keyof Resume["personal"], value: string) => {
    if (!editedResume) return;
    setEditedResume({
      ...editedResume,
      personal: {
        ...editedResume.personal,
        [field]: value,
      },
    });
  };

  const removeSkill = (skillToRemove: string) => {
    if (!editedResume) return;
    const filterGroup = (arr?: string[]) =>
      (arr || []).filter((s) => s.toLowerCase() !== skillToRemove.toLowerCase());

    setEditedResume({
      ...editedResume,
      skills: {
        ...editedResume.skills,
        programming: filterGroup(editedResume.skills.programming),
        aiMl: filterGroup(editedResume.skills.aiMl),
        frontend: filterGroup(editedResume.skills.frontend),
        backend: filterGroup(editedResume.skills.backend),
        databases: filterGroup(editedResume.skills.databases),
        cloud: filterGroup(editedResume.skills.cloud),
        devops: filterGroup(editedResume.skills.devops),
        tools: filterGroup(editedResume.skills.tools),
        softSkills: filterGroup(editedResume.skills.softSkills),
      },
    });
  };

  const addSkill = () => {
    if (!editedResume || !newSkillInput.trim()) return;
    const trimmed = newSkillInput.trim();
    const current = editedResume.skills.programming || [];
    if (!current.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      setEditedResume({
        ...editedResume,
        skills: {
          ...editedResume.skills,
          programming: [...current, trimmed],
        },
      });
    }
    setNewSkillInput("");
  };

  const updateExperience = (
    index: number,
    field: "title" | "company" | "startDate" | "endDate",
    value: string
  ) => {
    if (!editedResume) return;
    const newExp = [...(editedResume.experience || [])];
    if (newExp[index]) {
      newExp[index] = { ...newExp[index], [field]: value };
      setEditedResume({ ...editedResume, experience: newExp });
    }
  };

  const removeExperience = (index: number) => {
    if (!editedResume) return;
    const newExp = (editedResume.experience || []).filter((_, i) => i !== index);
    setEditedResume({ ...editedResume, experience: newExp });
  };

  const updateEducation = (
    index: number,
    field: "institution" | "degree" | "startDate" | "endDate" | "gpa",
    value: string
  ) => {
    if (!editedResume) return;
    const newEdu = [...(editedResume.education || [])];
    if (newEdu[index]) {
      newEdu[index] = { ...newEdu[index], [field]: value };
      setEditedResume({ ...editedResume, education: newEdu });
    }
  };

  const removeEducation = (index: number) => {
    if (!editedResume) return;
    const newEdu = (editedResume.education || []).filter((_, i) => i !== index);
    setEditedResume({ ...editedResume, education: newEdu });
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
    setEditedResume(null);
    setNewSkillInput("");
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
          {parseResult && editedResume && (
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

              {/* Informational Hint */}
              <div className="flex items-center gap-2 text-[11.5px] text-slate-500 dark:text-slate-400 bg-brand-50/50 dark:bg-brand-950/20 border border-brand-200/50 dark:border-brand-800/30 px-3.5 py-2 rounded-xl">
                <Sparkles className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
                <span>You can edit any extracted fields below before applying them to your resume builder.</span>
              </div>

              {/* Extracted Sections Preview Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* 1. Personal & Contact (Editable) */}
                <div className="p-4 rounded-2xl surface-card border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-brand-500" />
                      <span>Candidate Identity</span>
                    </span>
                    <span className="text-[10.5px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                      {Math.round(parseResult.confidence.fields.fullName.confidence * 100)}% Match
                    </span>
                  </div>
                  <div className="space-y-2 text-slate-700 dark:text-slate-300">
                    <div>
                      <label className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Full Name</label>
                      <input
                        type="text"
                        value={editedResume.personal.fullName}
                        onChange={(e) => updatePersonal("fullName", e.target.value)}
                        className="w-full mt-0.5 px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                        placeholder="Full Name"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Professional Title</label>
                      <input
                        type="text"
                        value={editedResume.personal.title}
                        onChange={(e) => updatePersonal("title", e.target.value)}
                        className="w-full mt-0.5 px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                        placeholder="e.g. Lead Software Engineer"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Email</label>
                        <input
                          type="email"
                          value={editedResume.personal.email}
                          onChange={(e) => updatePersonal("email", e.target.value)}
                          className="w-full mt-0.5 px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                          placeholder="email@example.com"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Phone</label>
                        <input
                          type="text"
                          value={editedResume.personal.phone}
                          onChange={(e) => updatePersonal("phone", e.target.value)}
                          className="w-full mt-0.5 px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                          placeholder="+1 555-123-4567"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Location</label>
                      <input
                        type="text"
                        value={editedResume.personal.location}
                        onChange={(e) => updatePersonal("location", e.target.value)}
                        className="w-full mt-0.5 px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                        placeholder="City, State / Country"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Skills & Taxonomy (Interactive Tags) */}
                <div className="p-4 rounded-2xl surface-card border border-slate-200 dark:border-slate-800 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-slate-800 mb-2">
                      <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <Wrench className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Extracted Skills</span>
                      </span>
                      <span className="text-[10.5px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                        {Math.round(parseResult.confidence.fields.skills.confidence * 100)}% Match
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                      {Array.from(
                        new Set([
                          ...(editedResume.skills.programming || []),
                          ...(editedResume.skills.aiMl || []),
                          ...(editedResume.skills.frontend || []),
                          ...(editedResume.skills.backend || []),
                          ...(editedResume.skills.databases || []),
                          ...(editedResume.skills.cloud || []),
                          ...(editedResume.skills.devops || []),
                          ...(editedResume.skills.tools || []),
                        ])
                      ).map((skill, idx) => (
                        <span
                          key={idx}
                          className="group inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-[11px] px-2 py-0.5 rounded-md font-medium border border-slate-200 dark:border-slate-700 hover:border-slate-400 transition-colors"
                        >
                          <span>{skill}</span>
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="text-slate-400 hover:text-rose-500 transition-colors"
                            title={`Remove ${skill}`}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Add Skill Input */}
                  <div className="flex items-center gap-1.5 pt-1">
                    <input
                      type="text"
                      value={newSkillInput}
                      onChange={(e) => setNewSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addSkill();
                        }
                      }}
                      placeholder="Add missing skill..."
                      className="flex-1 px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={addSkill}
                      className="px-2 py-1 h-auto text-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>

                {/* 3. Work Experience (Interactive Cards) */}
                <div className="p-4 rounded-2xl surface-card border border-slate-200 dark:border-slate-800 space-y-2 md:col-span-2">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-sky-500" />
                      <span>Work Experience Roles</span>
                    </span>
                    <span className="text-[10.5px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                      {editedResume.experience?.length || 0} Detected Roles
                    </span>
                  </div>

                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {editedResume.experience && editedResume.experience.length > 0 ? (
                      editedResume.experience.map((exp, i) => (
                        <div
                          key={exp.id || i}
                          className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1.5"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <input
                              type="text"
                              value={exp.title}
                              onChange={(e) => updateExperience(i, "title", e.target.value)}
                              className="font-semibold text-xs text-slate-900 dark:text-white bg-transparent border-b border-transparent focus:border-brand-500 focus:outline-none flex-1"
                              placeholder="Role Title"
                            />
                            <button
                              type="button"
                              onClick={() => removeExperience(i)}
                              className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                              title="Remove role"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) => updateExperience(i, "company", e.target.value)}
                              className="px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-brand-500"
                              placeholder="Company"
                            />
                            <input
                              type="text"
                              value={exp.startDate}
                              onChange={(e) => updateExperience(i, "startDate", e.target.value)}
                              className="px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-brand-500"
                              placeholder="Start Date"
                            />
                            <input
                              type="text"
                              value={exp.endDate}
                              onChange={(e) => updateExperience(i, "endDate", e.target.value)}
                              className="px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-brand-500"
                              placeholder="End Date"
                            />
                          </div>
                          {exp.bullets && exp.bullets.length > 0 && (
                            <p className="text-[10px] text-slate-400 italic">
                              {exp.bullets.length} bullet point{exp.bullets.length > 1 ? "s" : ""} extracted
                            </p>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-400 text-xs py-2 italic">No experience roles detected. You can add them in the builder.</p>
                    )}
                  </div>
                </div>

                {/* 4. Education (Interactive Cards) */}
                <div className="p-4 rounded-2xl surface-card border border-slate-200 dark:border-slate-800 space-y-2 md:col-span-2">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-purple-500" />
                      <span>Education Credentials</span>
                    </span>
                    <span className="text-[10.5px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                      {editedResume.education?.length || 0} Detected Degrees
                    </span>
                  </div>

                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {editedResume.education && editedResume.education.length > 0 ? (
                      editedResume.education.map((edu, i) => (
                        <div
                          key={edu.id || i}
                          className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1.5"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <input
                              type="text"
                              value={edu.institution}
                              onChange={(e) => updateEducation(i, "institution", e.target.value)}
                              className="font-semibold text-xs text-slate-900 dark:text-white bg-transparent border-b border-transparent focus:border-brand-500 focus:outline-none flex-1"
                              placeholder="Institution"
                            />
                            <button
                              type="button"
                              onClick={() => removeEducation(i)}
                              className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                              title="Remove degree"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                            <input
                              type="text"
                              value={edu.degree}
                              onChange={(e) => updateEducation(i, "degree", e.target.value)}
                              className="px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-brand-500"
                              placeholder="Degree & Major"
                            />
                            <input
                              type="text"
                              value={`${edu.startDate || ""} - ${edu.endDate || ""}`}
                              onChange={(e) => {
                                const parts = e.target.value.split("-");
                                updateEducation(i, "startDate", parts[0]?.trim() || "");
                                updateEducation(i, "endDate", parts[1]?.trim() || "");
                              }}
                              className="px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-brand-500"
                              placeholder="Dates (e.g. 2018 - 2022)"
                            />
                            <input
                              type="text"
                              value={edu.gpa || ""}
                              onChange={(e) => updateEducation(i, "gpa", e.target.value)}
                              className="px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-brand-500"
                              placeholder="GPA / Score (Optional)"
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-400 text-xs py-2 italic">No education credentials detected. You can add them in the builder.</p>
                    )}
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

