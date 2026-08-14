"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  Sparkles,
  ShieldCheck,
  LayoutTemplate,
  BarChart3,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Builder", href: "/builder", icon: FileText },
    { name: "Compatibility Analyzer", href: "/analyzer", icon: BarChart3 },
    { name: "Templates", href: "/templates", icon: LayoutTemplate },
    { name: "Dashboard", href: "/dashboard", icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#090d16]/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-500 to-purple-500 shadow-lg shadow-brand-500/25 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5 text-white stroke-[2.2]" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-[#090d16]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-xl tracking-tight text-white group-hover:text-brand-300 transition-colors">
                  Resum<span className="text-brand-400">Prove</span>
                </span>
                <Badge variant="proof" size="sm" className="hidden sm:inline-flex py-0 px-1.5 text-[10px]">
                  Fact-Lock™
                </Badge>
              </div>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-400 hidden sm:block">
                AI Career Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-150",
                    isActive
                      ? "bg-slate-800/90 text-white shadow-sm border border-slate-700/60"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/40"
                  )}
                >
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-brand-400" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link href="/analyzer">
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                Test Job Match
              </Button>
            </Link>
            <Link href="/builder">
              <Button variant="primary" size="sm" className="shadow-brand-500/20">
                <span>Build Resume</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <Link href="/builder">
              <Button variant="primary" size="sm">
                Build
              </Button>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#090d16]/95 backdrop-blur-2xl px-4 py-4 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                  isActive
                    ? "bg-brand-500/15 text-brand-300 border border-brand-500/30"
                    : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                )}
              >
                <Icon className="w-5 h-5 text-slate-400" />
                <span>{link.name}</span>
              </Link>
            );
          })}
          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
            <Link href="/builder" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" size="md" className="w-full justify-center">
                Launch Resume Builder
              </Button>
            </Link>
            <Link href="/analyzer" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" size="md" className="w-full justify-center">
                Run Compatibility Scan
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
