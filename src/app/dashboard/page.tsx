"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Plus,
  Clock,
  Sparkles,
  Cloud,
  CloudOff,
  Trash2,
  ExternalLink,
  ShieldCheck,
  LayoutTemplate,
  Layers,
  ArrowRight,
  Database,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth/useAuth";
import { fetchUserResumes, deleteResumeFromCloud } from "@/lib/supabase/resumeService";
import { ResumeRow } from "@/lib/supabase/types";
import { AuthModal } from "@/components/auth/auth-modal";
import { Resume } from "@/types/resume";

export default function DashboardPage() {
  const { user, profile, isConfigured } = useAuth();
  const [cloudResumes, setCloudResumes] = useState<ResumeRow[]>([]);
  const [localResume, setLocalResume] = useState<Resume | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Load cloud and local resumes
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);

      // Check local storage for active guest resume
      try {
        const raw = localStorage.getItem("resumprove_resume_state");
        if (raw) {
          setLocalResume(JSON.parse(raw));
        }
      } catch (e) {
        console.warn("Could not read local resume:", e);
      }

      // If user logged in, fetch cloud resumes
      if (user && isConfigured) {
        const resumes = await fetchUserResumes();
        setCloudResumes(resumes);
      }

      setIsLoading(false);
    }

    loadData();
  }, [user, isConfigured]);

  const handleDeleteResume = async (id: string) => {
    if (!confirm("Are you sure you want to delete this resume?")) return;
    setDeletingId(id);
    const success = await deleteResumeFromCloud(id);
    if (success) {
      setCloudResumes((prev) => prev.filter((r) => r.id !== id));
    }
    setDeletingId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 flex flex-col space-y-8 animate-fade-in">
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h1 className="font-display text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Career Portfolio Dashboard
            </h1>
            <Badge variant="brand" size="sm" className="hidden sm:inline-flex">
              Fact-Lock™ Verified
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Manage your tailored resume documents, audit trails, and version history.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
              <Cloud className="w-3.5 h-3.5" />
              <span>Cloud Synced ({cloudResumes.length} Document{cloudResumes.length !== 1 ? "s" : ""})</span>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAuthModalOpen(true)}
              className="gap-1.5 text-xs"
            >
              <CloudOff className="w-3.5 h-3.5 text-amber-500" />
              <span>Connect Supabase Cloud</span>
            </Button>
          )}

          <Link href="/builder">
            <Button variant="primary" size="sm" className="gap-1.5 shadow-brand-500/20">
              <Plus className="w-3.5 h-3.5" />
              <span>New Resume</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Cloud Status / Welcome Card */}
      {!user && (
        <div className="p-5 rounded-3xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-brand-500" />
              <span>Local Guest Mode Active</span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl">
              Your resume is safely preserved in local browser storage. Connect Supabase to unlock multi-device cloud sync, version rollback, and audit histories.
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsAuthModalOpen(true)}
            className="flex-shrink-0"
          >
            Sign In / Sign Up
          </Button>
        </div>
      )}

      {/* Main Resume Grid */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
          <FileText className="w-4 h-4 text-brand-500" />
          <span>My Resume Portfolios</span>
        </h3>

        {isLoading ? (
          <div className="py-16 flex flex-col items-center justify-center space-y-3 text-slate-400 text-xs">
            <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
            <span>Loading resume documents...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* If user has cloud resumes, display them */}
            {user && cloudResumes.length > 0 &&
              cloudResumes.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl surface-card border border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between hover:border-brand-500/40 transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="default" size="sm" className="font-mono text-[10px] uppercase">
                        {item.template}
                      </Badge>
                      {item.is_primary && (
                        <span className="text-[10.5px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          Primary
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="font-display font-bold text-base text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {item.resume_data?.personal?.title || "Professional Resume"}
                      </p>
                    </div>

                    <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Updated {new Date(item.updated_at).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => handleDeleteResume(item.id)}
                      disabled={deletingId === item.id}
                      className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                      title="Delete resume"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <Link href={`/builder?id=${item.id}`}>
                      <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                        <span>Open Builder</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}

            {/* Local Active Resume Card (Always available in local storage) */}
            {localResume && (
              <div className="rounded-3xl surface-card border-2 border-brand-500/20 hover:border-brand-500/50 p-5 flex flex-col justify-between transition-all group bg-gradient-to-b from-brand-500/[0.02] to-transparent">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="brand" size="sm" className="font-mono text-[10px] uppercase">
                      {localResume.settings?.template || "ats-minimal"}
                    </Badge>
                    <span className="text-[10.5px] font-semibold text-brand-600 dark:text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded-full border border-brand-500/20">
                      Active Workspace
                    </span>
                  </div>

                  <div>
                    <h4 className="font-display font-bold text-base text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {localResume.title || "Current Working Resume"}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                      {localResume.personal?.fullName} • {localResume.personal?.title}
                    </p>
                  </div>

                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Live in local session</span>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">
                    {localResume.experience?.length || 0} Roles • {localResume.skills?.programming?.length || 0} Skills
                  </span>

                  <Link href="/builder">
                    <Button variant="primary" size="sm" className="gap-1.5 text-xs">
                      <span>Resume Builder</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {/* Create New Resume Card */}
            <Link
              href="/builder"
              className="rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-800 hover:border-brand-500 p-8 flex flex-col items-center justify-center text-center space-y-3 transition-colors group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 group-hover:bg-brand-500/10 text-slate-400 group-hover:text-brand-500 flex items-center justify-center transition-colors">
                <Plus className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                  Create New Tailored Resume
                </h5>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Target a specific role or company
                </p>
              </div>
            </Link>
          </div>
        )}
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}
