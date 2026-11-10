"use client";

import React, { forwardRef } from "react";
import { Resume, ResumeSettings, TemplateId } from "@/types/resume";
import { TemplateRenderer } from "@/components/templates/template-renderer";

interface LiveResumePreviewProps {
  resume: Resume;
  zoom?: number;
  templateOverride?: TemplateId;
  settingsOverride?: Partial<ResumeSettings>;
}

export const LiveResumePreview = forwardRef<HTMLDivElement, LiveResumePreviewProps>(
  ({ resume, zoom = 100, templateOverride, settingsOverride }, ref) => {
    return (
      <div className="flex justify-center w-full overflow-auto p-2 sm:p-4">
        {/* Printable A4 Resume Canvas Container */}
        <div
          ref={ref}
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: "top center",
          }}
          className="resume-print-canvas w-[210mm] min-h-[297mm] bg-white text-slate-900 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.06)] ring-1 ring-slate-200/80 p-[16mm] sm:p-[18mm] rounded-sm transition-all duration-200 ease-out print:shadow-none print:ring-0 print:m-0 print:p-0 print:w-full print:transform-none select-text"
        >
          <div className="transition-opacity duration-200 ease-out">
            <TemplateRenderer
              resume={resume}
              templateOverride={templateOverride}
              settingsOverride={settingsOverride}
            />
          </div>
        </div>
      </div>
    );
  }
);

LiveResumePreview.displayName = "LiveResumePreview";
