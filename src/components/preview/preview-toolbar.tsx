"use client";

import React, { useState } from "react";
import {
  ZoomIn,
  ZoomOut,
  Printer,
  LayoutTemplate,
  Sliders,
  Type,
  Minimize2,
  Sparkles,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TemplateId, ResumeSettings } from "@/types/resume";

export interface PreviewToolbarProps {
  zoom: number;
  onZoomChange: (zoom: number) => void;
  selectedTemplate: TemplateId;
  onTemplateChange: (template: TemplateId) => void;
  primaryColor: string;
  onColorChange: (color: string) => void;
  fontFamily?: ResumeSettings["fontFamily"];
  onFontFamilyChange?: (font: ResumeSettings["fontFamily"]) => void;
  lineSpacing?: ResumeSettings["lineSpacing"];
  onLineSpacingChange?: (spacing: ResumeSettings["lineSpacing"]) => void;
  showIcons?: boolean;
  onShowIconsChange?: (show: boolean) => void;
  onPrint: () => void;
}

export function PreviewToolbar({
  zoom,
  onZoomChange,
  selectedTemplate,
  onTemplateChange,
  primaryColor,
  onColorChange,
  fontFamily = "Inter",
  onFontFamilyChange,
  lineSpacing = "normal",
  onLineSpacingChange,
  showIcons = true,
  onShowIconsChange,
  onPrint
}: PreviewToolbarProps) {
  const [showCustomizer, setShowCustomizer] = useState<boolean>(false);

  const templates: { id: TemplateId; label: string }[] = [
    { id: "ats-minimal", label: "ATS Minimal" },
    { id: "modern-professional", label: "Modern Pro" },
    { id: "tech-specialist", label: "Tech Specialist" },
    { id: "student-fresher", label: "Student / Fresher" }
  ];

  const fonts: { id: ResumeSettings["fontFamily"]; label: string; family: string }[] = [
    { id: "Inter", label: "Inter", family: "font-sans" },
    { id: "Outfit", label: "Outfit", family: "font-display" },
    { id: "Roboto", label: "Roboto", family: "font-roboto" },
    { id: "Merriweather", label: "Merriweather", family: "font-merriweather" },
    { id: "JetBrains Mono", label: "JetBrains", family: "font-mono" },
  ];

  const densities: { id: ResumeSettings["lineSpacing"]; label: string }[] = [
    { id: "compact", label: "Compact (1 Page)" },
    { id: "normal", label: "Normal" },
    { id: "relaxed", label: "Relaxed" },
  ];

  const colors = [
    { hex: "#4f46e5", name: "Indigo" },
    { hex: "#0ea5e9", name: "Sky" },
    { hex: "#059669", name: "Emerald" },
    { hex: "#7c3aed", name: "Purple" },
    { hex: "#e11d48", name: "Rose" },
    { hex: "#0f172a", name: "Slate" },
    { hex: "#d97706", name: "Amber" },
  ];

  return (
    <div className="rounded-2xl surface-card p-3 shadow-lg backdrop-blur-md space-y-2.5 text-xs border border-slate-200 dark:border-slate-800">
      {/* Top Main Bar: Templates, Zoom, Customizer Toggle & Print */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        {/* Template Selectors */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
          <LayoutTemplate className="w-3.5 h-3.5 text-brand-500 mr-0.5 hidden sm:inline flex-shrink-0" />
          <div className="flex rounded-xl bg-slate-100 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 p-0.5">
            {templates.map((tpl) => (
              <button
                key={tpl.id}
                onClick={() => onTemplateChange(tpl.id)}
                className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-all ${
                  selectedTemplate === tpl.id
                    ? "bg-brand-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {tpl.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Customizer Toggle Button */}
          <button
            onClick={() => setShowCustomizer(!showCustomizer)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold transition-all border ${
              showCustomizer
                ? "bg-brand-50 text-brand-600 border-brand-300 dark:bg-brand-950/50 dark:text-brand-300 dark:border-brand-800"
                : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800 dark:hover:bg-slate-800"
            }`}
          >
            <Sliders className="w-3 h-3" />
            <span className="hidden sm:inline">Customize</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${showCustomizer ? "rotate-180" : ""}`} />
          </button>

          {/* Zoom Controls */}
          <div className="flex items-center gap-0.5 bg-slate-100 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl p-0.5">
            <button
              onClick={() => onZoomChange(Math.max(60, zoom - 10))}
              disabled={zoom <= 60}
              title="Zoom Out"
              className="p-1 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-30"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono text-slate-700 dark:text-slate-300 px-1 font-bold min-w-[34px] text-center">
              {zoom}%
            </span>
            <button
              onClick={() => onZoomChange(Math.min(130, zoom + 10))}
              disabled={zoom >= 130}
              title="Zoom In"
              className="p-1 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-30"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Print / Download Button */}
          <Button
            variant="primary"
            size="sm"
            onClick={onPrint}
            className="gap-1.5 text-xs py-1.5 px-3 shadow-brand-500/20"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Print / PDF</span>
          </Button>
        </div>
      </div>

      {/* Expandable Customizer Controls Panel */}
      {showCustomizer && (
        <div className="pt-2.5 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs animate-fade-in">
          {/* 1. Font Family Picker */}
          <div className="sm:col-span-4 space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1">
              <Type className="w-3 h-3 text-brand-500" />
              <span>Typography</span>
            </label>
            <div className="flex flex-wrap gap-1">
              {fonts.map((f) => (
                <button
                  key={f.id}
                  onClick={() => onFontFamilyChange?.(f.id)}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-medium transition-all ${
                    fontFamily === f.id
                      ? "bg-brand-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  <span className={f.family}>{f.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Spacing / Density Picker */}
          <div className="sm:col-span-4 space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1">
              <Minimize2 className="w-3 h-3 text-brand-500" />
              <span>Content Density</span>
            </label>
            <div className="flex gap-1">
              {densities.map((d) => (
                <button
                  key={d.id}
                  onClick={() => onLineSpacingChange?.(d.id)}
                  className={`px-2 py-0.5 rounded-lg text-[10.5px] font-medium transition-all ${
                    lineSpacing === d.id
                      ? "bg-brand-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Color & Icons Toggle */}
          <div className="sm:col-span-4 space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-600 dark:text-slate-400 flex items-center justify-between">
              <span>Accent Color</span>
              {onShowIconsChange && (
                <label className="flex items-center gap-1 cursor-pointer font-normal normal-case text-slate-600 dark:text-slate-400 text-[10.5px]">
                  <input
                    type="checkbox"
                    checked={showIcons}
                    onChange={(e) => onShowIconsChange(e.target.checked)}
                    className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 w-3 h-3 cursor-pointer"
                  />
                  <span>Show Icons</span>
                </label>
              )}
            </label>
            <div className="flex items-center gap-1.5 pt-0.5">
              {colors.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => onColorChange(c.hex)}
                  title={c.name}
                  className={`w-5 h-5 rounded-full transition-transform border border-white/20 ${
                    primaryColor === c.hex
                      ? "scale-110 ring-2 ring-brand-500 shadow-md"
                      : "hover:scale-105 opacity-80 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
