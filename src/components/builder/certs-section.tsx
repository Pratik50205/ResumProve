"use client";

import React from "react";
import { Award, Plus, Trash2 } from "lucide-react";
import { Certification } from "@/types/resume";
import { Button } from "@/components/ui/button";

interface CertsSectionProps {
  certifications: Certification[];
  onAdd: () => void;
  onUpdate: (id: string, updates: Partial<Certification>) => void;
  onRemove: (id: string) => void;
}

export function CertsSection({
  certifications,
  onAdd,
  onUpdate,
  onRemove
}: CertsSectionProps) {
  return (
    <div className="space-y-4">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-brand-400" />
          <h3 className="text-sm font-bold text-white font-display">
            Certifications & Credentials ({certifications.length})
          </h3>
        </div>
        <Button variant="primary" size="sm" onClick={onAdd} className="gap-1 text-xs">
          <Plus className="w-3.5 h-3.5" />
          <span>Add Certification</span>
        </Button>
      </div>

      {certifications.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-800 p-8 text-center space-y-3">
          <p className="text-xs text-slate-400">No certifications or credentials added yet.</p>
          <Button variant="outline" size="sm" onClick={onAdd} className="text-xs">
            <Plus className="w-3.5 h-3.5 mr-1" /> Add Credential
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              className="rounded-2xl bg-slate-950/70 border border-slate-800/90 p-4 shadow-md space-y-3"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono text-xs font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="font-bold text-sm text-white truncate">
                    {cert.name || "Certification Name"}
                  </span>
                </div>
                <button
                  onClick={() => onRemove(cert.id)}
                  title="Delete Entry"
                  className="p-1 rounded text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Cert Name */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[11px] font-semibold text-slate-300">Certification Name</label>
                  <input
                    type="text"
                    value={cert.name || ""}
                    onChange={(e) => onUpdate(cert.id, { name: e.target.value })}
                    placeholder="e.g. AWS Certified Solutions Architect"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-brand-500 focus:outline-none"
                  />
                </div>

                {/* Issuer */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">Issuing Organization</label>
                  <input
                    type="text"
                    value={cert.issuer || ""}
                    onChange={(e) => onUpdate(cert.id, { issuer: e.target.value })}
                    placeholder="e.g. Amazon Web Services"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-brand-500 focus:outline-none"
                  />
                </div>

                {/* Issue Date */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">Issue Date</label>
                  <input
                    type="text"
                    value={cert.issueDate || ""}
                    onChange={(e) => onUpdate(cert.id, { issueDate: e.target.value })}
                    placeholder="YYYY-MM"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-brand-500 focus:outline-none"
                  />
                </div>

                {/* Credential ID */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[11px] font-semibold text-slate-300">Credential ID / Verification URL</label>
                  <input
                    type="text"
                    value={cert.credentialId || ""}
                    onChange={(e) => onUpdate(cert.id, { credentialId: e.target.value })}
                    placeholder="e.g. AWS-MLS-9082341"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
