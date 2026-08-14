import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#090d16",
};

export const metadata: Metadata = {
  title: "ResumProve — AI Resume Intelligence & Career Optimization Platform",
  description:
    "Build, optimize, and prove your potential. Advanced AI Resume Intelligence with Semantic Job Compatibility, Proof Scoring, Fact-Lock Guardrails, and ATS-Optimized Templates.",
  keywords: [
    "AI Resume Builder",
    "Resume Intelligence",
    "Job Compatibility",
    "Proof Score",
    "ATS Resume Optimizer",
    "Career Intelligence",
    "Semantic Matching",
    "Fact-Lock AI",
  ],
  authors: [{ name: "ResumProve Team" }],
  openGraph: {
    title: "ResumProve — Build. Optimize. Prove Your Potential.",
    description:
      "Understand your resume. Match it to target opportunities. Strengthen claims with verified evidence and Fact-Lock AI guardrails.",
    type: "website",
    locale: "en_US",
    siteName: "ResumProve",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${outfit.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#090d16] text-slate-100 font-sans antialiased selection:bg-brand-500/30 selection:text-brand-200">
        <div className="relative min-h-screen flex flex-col justify-between overflow-hidden">
          {/* Subtle background ambient glows */}
          <div className="fixed top-0 left-1/4 -translate-x-1/2 w-[600px] h-[600px] bg-brand-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
          <div className="fixed top-1/3 right-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
          <div className="fixed bottom-10 left-1/3 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
