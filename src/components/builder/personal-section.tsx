"use client";

import React from "react";
import { User, Mail, Phone, MapPin, Linkedin, Github, Globe, Briefcase } from "lucide-react";
import { PersonalDetails } from "@/types/resume";
import { isValidEmail, isValidUrl } from "@/lib/validation/resumeValidation";

interface PersonalSectionProps {
  data: PersonalDetails;
  onChange: (updates: Partial<PersonalDetails>) => void;
}

export function PersonalSection({ data, onChange }: PersonalSectionProps) {
  const emailValid = !data.email || isValidEmail(data.email);
  const linkedinValid = isValidUrl(data.linkedin);
  const githubValid = isValidUrl(data.github);
  const portfolioValid = isValidUrl(data.portfolio);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-brand-400" />
            <span>Full Name <span className="text-rose-400">*</span></span>
          </label>
          <input
            type="text"
            value={data.fullName || ""}
            onChange={(e) => onChange({ fullName: e.target.value })}
            placeholder="e.g. Alex Chen"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-sm text-white focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-all placeholder:text-slate-600"
          />
        </div>

        {/* Professional Title */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-brand-400" />
            <span>Target Professional Title <span className="text-rose-400">*</span></span>
          </label>
          <input
            type="text"
            value={data.title || ""}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="e.g. Senior Machine Learning Engineer"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-sm text-white focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-all placeholder:text-slate-600"
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-brand-400" />
              <span>Email Address <span className="text-rose-400">*</span></span>
            </span>
            {!emailValid && <span className="text-[11px] text-rose-400">Invalid format</span>}
          </label>
          <input
            type="email"
            value={data.email || ""}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="alex.chen@example.com"
            className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border text-sm text-white focus:outline-none focus:ring-1 transition-all placeholder:text-slate-600 ${
              emailValid
                ? "border-slate-800 focus:border-brand-500 focus:ring-brand-500"
                : "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500"
            }`}
          />
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-brand-400" />
            <span>Phone Number <span className="text-rose-400">*</span></span>
          </label>
          <input
            type="text"
            value={data.phone || ""}
            onChange={(e) => onChange({ phone: e.target.value })}
            placeholder="+1 (555) 234-5678"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-sm text-white focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-all placeholder:text-slate-600"
          />
        </div>

        {/* Location */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-brand-400" />
            <span>Location / City <span className="text-rose-400">*</span></span>
          </label>
          <input
            type="text"
            value={data.location || ""}
            onChange={(e) => onChange({ location: e.target.value })}
            placeholder="San Francisco, CA (or Remote)"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-sm text-white focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-all placeholder:text-slate-600"
          />
        </div>

        {/* LinkedIn */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5 text-brand-400" />
              <span>LinkedIn Profile</span>
            </span>
            {!linkedinValid && <span className="text-[11px] text-rose-400">Invalid URL</span>}
          </label>
          <input
            type="url"
            value={data.linkedin || ""}
            onChange={(e) => onChange({ linkedin: e.target.value })}
            placeholder="https://linkedin.com/in/username"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-sm text-white focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-all placeholder:text-slate-600"
          />
        </div>

        {/* GitHub */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5 text-brand-400" />
              <span>GitHub Profile</span>
            </span>
            {!githubValid && <span className="text-[11px] text-rose-400">Invalid URL</span>}
          </label>
          <input
            type="url"
            value={data.github || ""}
            onChange={(e) => onChange({ github: e.target.value })}
            placeholder="https://github.com/username"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-sm text-white focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-all placeholder:text-slate-600"
          />
        </div>

        {/* Portfolio */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-brand-400" />
              <span>Portfolio / Website</span>
            </span>
            {!portfolioValid && <span className="text-[11px] text-rose-400">Invalid URL</span>}
          </label>
          <input
            type="url"
            value={data.portfolio || ""}
            onChange={(e) => onChange({ portfolio: e.target.value })}
            placeholder="https://yourportfolio.dev"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-sm text-white focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-all placeholder:text-slate-600"
          />
        </div>
      </div>
    </div>
  );
}
