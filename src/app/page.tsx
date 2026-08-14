import React from "react";
import { Hero } from "@/components/landing/hero";
import { Differentiators } from "@/components/landing/differentiators";
import { Features } from "@/components/landing/features";
import { Workflow } from "@/components/landing/workflow";
import { Comparison } from "@/components/landing/comparison";
import { CTA } from "@/components/landing/cta";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Differentiators />
      <Features />
      <Workflow />
      <Comparison />
      <CTA />
    </div>
  );
}
