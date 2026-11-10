"use client";

import React, { useState, useRef } from "react";
import {
  User,
  FileText,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Wrench,
  Award,
  Eye,
  Edit3,
  Sparkles,
  ShieldCheck,
  Printer
} from "lucide-react";
import { useResumeState } from "@/lib/resume/useResumeState";
import { BuilderHeader } from "@/components/builder/builder-header";
import { CompletenessMeter } from "@/components/builder/completeness-meter";
import { PersonalSection } from "@/components/builder/personal-section";
import { SummarySection } from "@/components/builder/summary-section";
import { ExperienceSection } from "@/components/builder/experience-section";
import { ProjectsSection } from "@/components/builder/projects-section";
import { EducationSection } from "@/components/builder/education-section";
import { SkillsSection } from "@/components/builder/skills-section";
import { CertsSection } from "@/components/builder/certs-section";
import { PreviewToolbar } from "@/components/preview/preview-toolbar";
import { LiveResumePreview } from "@/components/preview/live-resume-preview";
import { Badge } from "@/components/ui/badge";

type SectionTab = "personal" | "summary" | "experience" | "projects" | "education" | "skills" | "certifications";

export default function BuilderPage() {
  const {
    resume,
    validation,
    canUndo,
    canRedo,
    undo,
    redo,
    lastSaved,
    isAutosaving,
    updateTitle,
    updatePersonal,
    updateSummary,
    addExperience,
    updateExperience,
    removeExperience,
    reorderExperience,
    addExperienceBullet,
    updateExperienceBullet,
    removeExperienceBullet,
    addProject,
    updateProject,
    removeProject,
    addProjectBullet,
    updateProjectBullet,
    removeProjectBullet,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    removeSkill,
    addCertification,
    updateCertification,
    removeCertification,
    updateSettings,
    loadSample,
    resetResume,
    importJSON,
    exportJSON
  } = useResumeState("ml-engineer");

  const [activeSection, setActiveSection] = useState<SectionTab>("personal");
  const [mobileView, setMobileView] = useState<"edit" | "preview">("edit");
  const [zoom, setZoom] = useState<number>(100);

  const previewRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const sectionsConfig: { id: SectionTab; label: string; icon: React.ComponentType<{ className?: string }>; count?: number }[] = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "summary", label: "Summary", icon: FileText },
    { id: "experience", label: "Experience", icon: Briefcase, count: resume.experience?.length },
    { id: "projects", label: "Projects", icon: FolderGit2, count: resume.projects?.length },
    { id: "skills", label: "Skills", icon: Wrench, count: validation.totalSkillsCount },
    { id: "education", label: "Education", icon: GraduationCap, count: resume.education?.length },
    { id: "certifications", label: "Certifications", icon: Award, count: resume.certifications?.length }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 flex flex-col">
      {/* Top Builder Toolbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2 w-full no-print">
        <BuilderHeader
          title={resume.title}
          onUpdateTitle={updateTitle}
          canUndo={canUndo}
          canRedo={canRedo}
          onUndo={undo}
          onRedo={redo}
          isAutosaving={isAutosaving}
          lastSaved={lastSaved}
          onLoadSample={loadSample}
          onResetResume={resetResume}
          onExportJSON={exportJSON}
          onImportJSON={importJSON}
        />
      </div>

      {/* Mobile Toggle: Edit vs Preview */}
      <div className="lg:hidden max-w-7xl mx-auto px-4 w-full py-2 no-print">
        <div className="grid grid-cols-2 gap-2 bg-slate-200 dark:bg-slate-900 p-1 rounded-xl border border-slate-300 dark:border-slate-800">
          <button
            onClick={() => setMobileView("edit")}
            className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              mobileView === "edit"
                ? "bg-brand-600 text-white shadow-md"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Resume</span>
          </button>
          <button
            onClick={() => setMobileView("preview")}
            className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              mobileView === "preview"
                ? "bg-brand-600 text-white shadow-md"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Preview ({validation.score}%)</span>
          </button>
        </div>
      </div>

      {/* Main Dual Pane Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Editor */}
        <div
          className={`lg:col-span-6 space-y-4 no-print ${
            mobileView === "edit" ? "block" : "hidden lg:block"
          }`}
        >
          {/* Completeness Meter */}
          <CompletenessMeter validation={validation} />

          {/* Section Selector Tabs */}
          <div className="flex overflow-x-auto gap-1.5 pb-1 scrollbar-thin">
            {sectionsConfig.map((sec) => {
              const Icon = sec.icon;
              const isSelected = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer ${
                    isSelected
                      ? "bg-brand-600 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_4px_12px_rgba(99,102,241,0.3)] border border-brand-400/40"
                      : "surface-card text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700/80"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{sec.label}</span>
                  {typeof sec.count === "number" && sec.count > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${isSelected ? "bg-white/20 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"}`}>
                      {sec.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Section Form Box */}
          <div className="rounded-3xl surface-card p-5 sm:p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_12px_36px_-8px_rgba(0,0,0,0.6)]">
            {activeSection === "personal" && (
              <PersonalSection data={resume.personal} onChange={updatePersonal} />
            )}

            {activeSection === "summary" && (
              <SummarySection summary={resume.summary} onChange={updateSummary} />
            )}

            {activeSection === "experience" && (
              <ExperienceSection
                experience={resume.experience || []}
                onAdd={() => addExperience()}
                onUpdate={updateExperience}
                onRemove={removeExperience}
                onReorder={reorderExperience}
                onAddBullet={addExperienceBullet}
                onUpdateBullet={updateExperienceBullet}
                onRemoveBullet={removeExperienceBullet}
              />
            )}

            {activeSection === "projects" && (
              <ProjectsSection
                projects={resume.projects || []}
                onAdd={() => addProject()}
                onUpdate={updateProject}
                onRemove={removeProject}
                onAddBullet={addProjectBullet}
                onUpdateBullet={updateProjectBullet}
                onRemoveBullet={removeProjectBullet}
              />
            )}

            {activeSection === "skills" && (
              <SkillsSection
                skills={resume.skills}
                onAddSkill={addSkill}
                onRemoveSkill={removeSkill}
              />
            )}

            {activeSection === "education" && (
              <EducationSection
                education={resume.education || []}
                onAdd={() => addEducation()}
                onUpdate={updateEducation}
                onRemove={removeEducation}
              />
            )}

            {activeSection === "certifications" && (
              <CertsSection
                certifications={resume.certifications || []}
                onAdd={() => addCertification()}
                onUpdate={updateCertification}
                onRemove={removeCertification}
              />
            )}
          </div>
        </div>

        {/* Right Column: Live Resume Preview */}
        <div
          className={`lg:col-span-6 space-y-4 ${
            mobileView === "preview" ? "block" : "hidden lg:block"
          }`}
        >
          {/* Preview Toolbar */}
          <div className="no-print">
            <PreviewToolbar
              zoom={zoom}
              onZoomChange={setZoom}
              selectedTemplate={resume.settings?.template || "tech-specialist"}
              onTemplateChange={(tpl) => updateSettings({ template: tpl })}
              primaryColor={resume.settings?.primaryColor || "#4f46e5"}
              onColorChange={(color) => updateSettings({ primaryColor: color })}
              fontFamily={resume.settings?.fontFamily || "Inter"}
              onFontFamilyChange={(font) => updateSettings({ fontFamily: font })}
              lineSpacing={resume.settings?.lineSpacing || "normal"}
              onLineSpacingChange={(spacing) => updateSettings({ lineSpacing: spacing })}
              showIcons={resume.settings?.showIcons ?? true}
              onShowIconsChange={(show) => updateSettings({ showIcons: show })}
              onPrint={handlePrint}
            />
          </div>

          {/* Live Canvas View */}
          <div className="rounded-3xl bg-slate-950/90 border border-slate-800/80 p-2 sm:p-4 shadow-2xl flex justify-center overflow-hidden min-h-[680px]">
            <LiveResumePreview
              ref={previewRef}
              resume={resume}
              zoom={zoom}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
