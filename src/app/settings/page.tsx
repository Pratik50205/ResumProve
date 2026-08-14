"use client";

import React from "react";
import Link from "next/link";
import { Settings, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 flex flex-col items-center justify-center text-center">
      <div className="max-w-2xl mx-auto space-y-6">
        <Badge variant="default" size="md">
          User Settings
        </Badge>
        <div className="w-16 h-16 rounded-3xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 mx-auto">
          <Settings className="w-8 h-8" />
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-black text-white">
          Account & AI Preferences
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Manage Supabase authentication, Fact-Lock sensitivity, and local/cloud storage preferences.
        </p>

        <div className="pt-4 flex justify-center">
          <Link href="/">
            <Button variant="secondary" size="md">
              <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
