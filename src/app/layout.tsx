import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme/theme-provider";

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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#090d16" },
  ],
};

export const metadata: Metadata = {
  title: "ResumProve | AI Resume Intelligence & Career Optimization Platform",
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
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "ResumProve | Build. Optimize. Prove Your Potential.",
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
    <html lang="en" className={`dark ${inter.variable} ${outfit.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-brand-500/30 selection:text-brand-600 dark:selection:text-brand-200">
        <ThemeProvider>
          <div className="relative min-h-screen flex flex-col justify-between overflow-hidden">
            {/* Disciplined technical backdrop: radial light beam + masked dot matrix */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(99,102,241,0.12),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(99,102,241,0.18),rgba(9,13,22,0))] pointer-events-none -z-10" />
            <div className="fixed inset-0 bg-grid-pattern opacity-40 dark:opacity-30 pointer-events-none -z-10 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_25%,#000_50%,transparent_100%)]" />
            <div className="fixed bottom-0 right-0 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.05),transparent_70%)] pointer-events-none -z-10" />

            <Navbar />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
