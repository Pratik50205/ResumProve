"use client";

import React from "react";
import Link from "next/link";
import { Settings, ArrowLeft, Sun, Moon, Laptop, Palette, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme, Theme } from "@/components/theme/theme-provider";

export default function SettingsPage() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  const themeOptions: { value: Theme; label: string; desc: string; icon: React.ComponentType<{ className?: string }> }[] = [
    {
      value: "dark",
      label: "Dark Mode",
      desc: "Deep slate & OLED navy palette engineered for low-light focus.",
      icon: Moon,
    },
    {
      value: "light",
      label: "Light Mode",
      desc: "High-contrast daylight theme matching pristine A4 paper aesthetic.",
      icon: Sun,
    },
    {
      value: "system",
      label: "System Sync",
      desc: "Automatically adapts to your operating system appearance.",
      icon: Laptop,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 space-y-10">
      <div className="space-y-3">
        <Badge variant="brand" size="md">
          Platform Settings
        </Badge>
        <h1 className="font-display text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Appearance & Preferences
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
          Configure interface theme, Fact-Lock™ guardrail sensitivity, and storage isolation.
        </p>
      </div>

      {/* Appearance Section */}
      <div className="surface-card rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-200 dark:border-slate-800">
          <Palette className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
            Interface Appearance
          </h2>
          <span className="text-xs text-slate-500 font-mono ml-auto">
            Active: {theme} ({resolvedTheme})
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {themeOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = theme === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => setTheme(opt.value)}
                className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? "bg-brand-500/10 border-brand-500/60 shadow-md ring-2 ring-brand-500/30"
                    : "bg-slate-50/70 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-900/40"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isSelected ? "bg-brand-600 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {isSelected && (
                    <Badge variant="brand" size="sm" className="text-[10px] py-0 px-1.5">
                      Selected
                    </Badge>
                  )}
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white">
                    {opt.label}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {opt.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fact-Lock AI Preferences */}
      <div className="surface-card rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-200 dark:border-slate-800">
          <ShieldCheck className="w-5 h-5 text-emerald-500" />
          <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
            Fact-Lock™ Guardrail Sensitivity
          </h2>
          <Badge variant="proof" size="sm" className="ml-auto text-[10px]">
            Strict Mode
          </Badge>
        </div>

        <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            When <strong>Strict Mode</strong> is enabled, the AI rewrite engine will categorically reject suggestions that invent new technologies, hallucinate unverified percentage gains, or mention companies not present in your baseline profile.
          </p>
        </div>
      </div>

      <div className="pt-2 flex justify-start">
        <Link href="/">
          <Button variant="secondary" size="md">
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
