"use client";

import React from "react";
import { ZoomIn, ZoomOut, Printer, LayoutTemplate, Palette, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TemplateId } from "@/types/resume";

interface PreviewToolbarProps {
  zoom: number;
  onZoomChange: (zoom: number) => void;
  selectedTemplate: TemplateId;
  onTemplateChange: (template: TemplateId) => void;
  primaryColor: string;
  onColorChange: (color: string) => void;
  onPrint: () => void;
}

export function PreviewToolbar({
  zoom,
  onZoomChange,
  selectedTemplate,
  onTemplateChange,
  primaryColor,
  onColorChange,
  onPrint
}: PreviewToolbarProps) {
  const templates: { id: TemplateId; label: string }[] = [
    { id: "tech-specialist", label: "Tech Specialist" },
    { id: "modern-professional", label: "Modern Pro" },
    { id: "ats-minimal", label: "ATS Minimal" },
    { id: "student-fresher", label: "Fresher" }
  ];

  const colors = [
    { hex: "#4f46e5", name: "Indigo" },
    { hex: "#0ea5e9", name: "Sky" },
    { hex: "#059669", name: "Emerald" },
    { hex: "#7c3aed", name: "Purple" },
    { hex: "#e11d48", name: "Rose" },
    { hex: "#0f172a", name: "Slate" }
  ];

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-2.5 shadow-lg backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs">
      {/* Template Selectors */}
      <div className="flex items-center gap-1">
        <LayoutTemplate className="w-3.5 h-3.5 text-brand-400 mr-1 hidden sm:inline" />
        <div className="flex rounded-xl bg-slate-950/70 border border-slate-800 p-0.5">
          {templates.map((tpl) => (
            <button
              key={tpl.id}
              onClick={() => onTemplateChange(tpl.id)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                selectedTemplate === tpl.id
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tpl.label}
            </button>
          ))}
        </div>
      </div>

      {/* Color Accent & Zoom Controls & Print */}
      <div className="flex items-center gap-3">
        {/* Accent Colors */}
        <div className="flex items-center gap-1.5 bg-slate-950/70 border border-slate-800 px-2 py-1 rounded-xl">
          {colors.map((c) => (
            <button
              key={c.hex}
              onClick={() => onColorChange(c.hex)}
              title={c.name}
              className={`w-4 h-4 rounded-full transition-transform ${
                primaryColor === c.hex ? "scale-125 ring-2 ring-white" : "hover:scale-110 opacity-70 hover:opacity-100"
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-slate-950/70 border border-slate-800 rounded-xl p-0.5">
          <button
            onClick={() => onZoomChange(Math.max(60, zoom - 10))}
            disabled={zoom <= 60}
            title="Zoom Out"
            className="p-1 rounded-lg text-slate-400 hover:text-white disabled:opacity-30"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono text-slate-300 px-1 font-bold min-w-[36px] text-center">
            {zoom}%
          </span>
          <button
            onClick={() => onZoomChange(Math.min(130, zoom + 10))}
            disabled={zoom >= 130}
            title="Zoom In"
            className="p-1 rounded-lg text-slate-400 hover:text-white disabled:opacity-30"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Print / Download Button */}
        <Button
          variant="primary"
          size="sm"
          onClick={onPrint}
          className="gap-1.5 text-xs py-1.5 px-3.5 shadow-brand-500/20"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print / Save PDF</span>
        </Button>
      </div>
    </div>
  );
}
