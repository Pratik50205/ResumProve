# ResumProve — AI Resume Intelligence & Career Optimization Platform

> **Build. Optimize. Prove Your Potential.**

ResumProve is a production-grade, AI-powered career intelligence platform designed to analyze resumes against target job descriptions, verify claimed evidence with deterministic scoring, optimize impact verbs with strict **Fact-Lock™ AI guardrails**, and export ATS-compliant, selectable-text PDFs.

---

## 🗺️ Development Journey & Phase Roadmap

For a detailed breakdown of all 13 development phases, live progress status, and deliverables, see **[PHASES.md](file:///c:/Pratik/ResumProve/PHASES.md)**.

* **Phase 1**: Foundation, Design System & Landing Page (✅ **Completed**)
* **Phase 2**: Resume Engine & Split-Screen Live Builder (⏳ **Next Up**)
* **Phase 3–13**: Templates, Document Intelligence, Supabase Cloud, AI Fact-Lock, Proof Score, and ATS Export.

---

## 💎 Core Differentiators

1. **Semantic Job Compatibility**: Uses contextual ontology and embeddings to understand meaning (e.g., matching *"Developed predictive models using Python"* to *"Experience building machine learning prediction systems"*).
2. **The Proof Score™**: Audits claimed skills against experience bullets and project deliverables to calculate a verifiable evidence strength rating.
3. **Fact-Lock™ Guardrails**: Strict zero-hallucination system ensuring AI never fabricates metrics (+37%), unearned degrees, or unsupported technologies.

---

## 🏛️ Intelligence Architecture

```text
Resume Intelligence + Job Intelligence
                 ↓
       Compatibility Engine
                 ↓
       Evidence / Proof Engine
                 ↓
       Optimization Engine
                 ↓
          Resume Builder
                 ↓
            ATS Export
```

### Three Intelligence Scores

* **Job Compatibility (0–100)**: Required Skills (30%), Keyword Coverage (20%), Semantic Similarity (20%), Experience Relevance (10%), Education (10%), Structure (10%).
* **Resume Quality (0–100)**: Action Verbs, Content Density, Bullet Length, Formatting & Readability.
* **Proof Score (0–100)**: Skill Evidence (25%), Project Evidence (25%), Experience Evidence (20%), Achievements (15%), Consistency (15%).

---

## 🛠️ Technology Stack

* **Frontend**: Next.js 14+ (App Router), TypeScript, Tailwind CSS, Lucide React, Framer Motion
* **Backend**: Next.js API Routes (V1), future Python FastAPI microservice support (V2+)
* **Database & Auth**: Supabase PostgreSQL + Auth (RLS enabled)
* **Primary LLM**: Google Gemini API via unified provider abstraction
* **Document Parsing**: pdfjs-dist (PDF), mammoth (DOCX), File API (TXT)
* **Export**: Clean HTML/CSS print engine with selectable vector text

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
GEMINI_API_KEY=your-gemini-api-key
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```
