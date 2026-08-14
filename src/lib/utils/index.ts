import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString?: string): string {
  if (!dateString) return "";
  if (dateString.toLowerCase() === "present") return "Present";
  
  // If format is YYYY-MM
  if (/^\d{4}-\d{2}$/.test(dateString)) {
    const [year, month] = dateString.split("-");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthName = months[parseInt(month, 10) - 1] || month;
    return `${monthName} ${year}`;
  }
  return dateString;
}

export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

export function getScoreColor(score: number): {
  text: string;
  bg: string;
  border: string;
  badge: string;
} {
  if (score >= 80) {
    return {
      text: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      badge: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    };
  }
  if (score >= 60) {
    return {
      text: "text-amber-500",
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      badge: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    };
  }
  return {
    text: "text-rose-500",
    bg: "bg-rose-500/10",
    border: "border-rose-500/30",
    badge: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  };
}
