"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScoreRingProps {
  score: number; // 0 to 100
  size?: "sm" | "md" | "lg" | "xl";
  label?: string;
  sublabel?: string;
  colorType?: "brand" | "proof" | "compat" | "quality";
  className?: string;
  showGrade?: boolean;
}

export function ScoreRing({
  score,
  size = "md",
  label,
  sublabel,
  colorType = "brand",
  className,
  showGrade = false,
}: ScoreRingProps) {
  const clampedScore = Math.min(100, Math.max(0, score));

  const sizeConfig = {
    sm: { radius: 24, stroke: 4, width: 64, text: "text-base font-bold", labelSize: "text-xs" },
    md: { radius: 40, stroke: 6, width: 100, text: "text-2xl font-bold", labelSize: "text-xs" },
    lg: { radius: 56, stroke: 8, width: 140, text: "text-4xl font-extrabold", labelSize: "text-sm" },
    xl: { radius: 76, stroke: 10, width: 180, text: "text-5xl font-black", labelSize: "text-base" },
  };

  const currentSize = sizeConfig[size];
  const circumference = 2 * Math.PI * currentSize.radius;
  const strokeDashoffset = circumference - (clampedScore / 100) * circumference;

  const colorPalettes = {
    brand: {
      gradientId: "brandGradient",
      start: "#818cf8",
      end: "#6366f1",
      glow: "rgba(99, 102, 241, 0.3)",
      textClass: "text-indigo-400",
    },
    proof: {
      gradientId: "proofGradient",
      start: "#34d399",
      end: "#10b981",
      glow: "rgba(16, 185, 129, 0.3)",
      textClass: "text-emerald-400",
    },
    compat: {
      gradientId: "compatGradient",
      start: "#38bdf8",
      end: "#0ea5e9",
      glow: "rgba(14, 165, 233, 0.3)",
      textClass: "text-sky-400",
    },
    quality: {
      gradientId: "qualityGradient",
      start: "#c084fc",
      end: "#8b5cf6",
      glow: "rgba(139, 92, 246, 0.3)",
      textClass: "text-purple-400",
    },
  };

  const palette = colorPalettes[colorType];

  const getGrade = (val: number) => {
    if (val >= 90) return "Exceptional";
    if (val >= 80) return "Strong Match";
    if (val >= 70) return "Competitive";
    if (val >= 60) return "Needs Work";
    return "Weak Match";
  };

  return (
    <div className={cn("flex flex-col items-center justify-center text-center", className)}>
      <div className="relative flex items-center justify-center" style={{ width: currentSize.width, height: currentSize.width }}>
        <svg
          className="rotate-[-90deg]"
          width={currentSize.width}
          height={currentSize.width}
          viewBox={`0 0 ${currentSize.width} ${currentSize.width}`}
        >
          <defs>
            <linearGradient id={palette.gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={palette.start} />
              <stop offset="100%" stopColor={palette.end} />
            </linearGradient>
          </defs>

          {/* Background circle */}
          <circle
            cx={currentSize.width / 2}
            cy={currentSize.width / 2}
            r={currentSize.radius}
            stroke="currentColor"
            strokeWidth={currentSize.stroke}
            fill="transparent"
            className="text-slate-200 dark:text-slate-800/80"
          />

          {/* Animated score circle */}
          <motion.circle
            cx={currentSize.width / 2}
            cy={currentSize.width / 2}
            r={currentSize.radius}
            stroke={`url(#${palette.gradientId})`}
            strokeWidth={currentSize.stroke}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            strokeLinecap="round"
            fill="transparent"
            style={{
              filter: `drop-shadow(0 0 8px ${palette.glow})`,
            }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className={cn("font-display tracking-tight text-slate-900 dark:text-white", currentSize.text)}>
            {score}
          </span>
          <span className="text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400 -mt-0.5">/100</span>
        </div>
      </div>

      {label && (
        <span className={cn("font-medium text-slate-700 dark:text-slate-200 mt-2 font-display", currentSize.labelSize)}>
          {label}
        </span>
      )}

      {showGrade && (
        <span className={cn("text-xs font-semibold mt-0.5", palette.textClass)}>
          {getGrade(score)}
        </span>
      )}

      {sublabel && (
        <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
          {sublabel}
        </span>
      )}
    </div>
  );
}
