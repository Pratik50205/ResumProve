# ResumProve — Journey of Development Phases

This document tracks the phased architecture and development roadmap of **ResumProve** (AI Resume Intelligence & Career Optimization Platform).

---

## 📊 Progress Overview

```
[███████████░░░░░░░░░░░░░░░░░░░░░] 3 / 13 Phases Completed (23%)
```

| Phase | Description | Status | Verification |
| :--- | :--- | :---: | :---: |
| **Phase 1** | **Foundation & Landing Experience** | ✅ **Completed** | Clean Build + E2E Browser Verified |
| **Phase 2** | **Resume Engine & Live Builder** | ✅ **Completed** | Clean Build + Live Split-Screen E2E Verified |
| **Phase 3** | **Template Engine & Print Stylesheet** | ✅ **Completed** | Clean Build (12/12 routes) + Multi-Template Vector Tested |
| **Phase 4** | **Document Intelligence (PDF/DOCX/TXT Parser)** | ⏳ **Next Up** | Pending Execution |
| **Phase 5** | **Online Backend (Supabase Auth, DB & RLS)** | 📋 Queued | — |
| **Phase 6** | **AI Engine & Fact-Lock™ Guardrails** | 📋 Queued | — |
| **Phase 7** | **Job Intelligence & Ontology Extraction** | 📋 Queued | — |
| **Phase 8** | **Deterministic Compatibility Engine** | 📋 Queued | — |
| **Phase 9** | **The Proof Score™ & Evidence Engine** | 📋 Queued | — |
| **Phase 10** | **AI Optimization & Suggestion Engine** | 📋 Queued | — |
| **Phase 11** | **Career Portfolio Dashboard & Versioning** | 📋 Queued | — |
| **Phase 12** | **ATS Vector PDF & Data Export** | 📋 Queued | — |
| **Phase 13** | **Final Polish, SEO & Security Hardening** | 📋 Queued | — |

---

## 🗺️ Phase-by-Phase Roadmap

### ✅ Phase 1 — Foundation & Architecture
* **Goal**: Establish the production-grade Next.js App Router repository, TypeScript typing system, custom glassmorphic Tailwind design system, brand identity, and high-converting SaaS landing page.
* **Deliverables**:
  - [x] Next.js 14 App Router, React 18, TypeScript 5, Tailwind CSS, Framer Motion, Lucide React.
  - [x] Strongly-typed domain models (`resume.ts`, `job.ts`, `ats.ts`, `proof.ts`, `ai.ts`).
  - [x] Curated skill ontology (`skills.ts`), action verbs (`actionVerbs.ts`), and sample resumes (`sampleResumes.ts`).
  - [x] Fact-Lock™ branding and responsive header/footer layout.
  - [x] Hero Intelligence showcase with interactive tabs and animated SVG score rings (Job Compatibility 86%, Resume Quality 82%, Proof Score 78%).
  - [x] Differentiators, Six Pillars, 6-Step Workflow, Comparison Matrix, and CTA sections.
  - [x] Shell routes for `/builder`, `/analyzer`, `/templates`, `/dashboard`, `/settings`.
* **Verification**: `next build` static export with 0 errors/warnings and complete browser testing across desktop & mobile.

---

### ✅ Phase 2 — Resume Engine & Live Builder
* **Goal**: Create a structured split-screen resume editor with synchronous live preview, validation, and local autosave.
* **Key Deliverables**:
  - [x] **Unified State Management**: Custom hook/context with full undo/redo and `localStorage` persistence.
  - [x] **Validation Layer**: Email/URL format, required fields, date consistency, and completeness score meter.
  - [x] **Section Form Editors**:
    - Personal Details & Socials (LinkedIn, GitHub, Portfolio)
    - Professional Summary Editor
    - Experience Manager (Add/edit/delete/reorder positions and bullet points)
    - Projects Manager (Technologies, live demos, repository links, impact bullets)
    - Education, GPA, honors, and coursework
    - Categorized Skills & custom tags
    - Certifications & Credential IDs
  - [x] **Live Split-Screen Preview**: Real-time rendering updating on every keystroke without server latency.
  - [x] **Sample Profile Switcher**: 1-click loading for ML Engineer, Full-Stack Dev, Data Analyst, Fresher.
  - [x] **Mobile Responsiveness**: Tabbed Editor / Preview toggle.
* **Verification**: `next build` clean pass, live autosave and local persistence validated.

---

### ✅ Phase 3 — Template Engine & Print Styling
* **Goal**: Build 4 ATS-optimized, selectable-text templates with unified data rendering and A4 print styling.
* **Key Deliverables**:
  - [x] **ATS Minimal**: Single-column standard with maximum parse rate (99.8%).
  - [x] **Modern Professional**: Executive 2-column format with summary badges.
  - [x] **Tech Specialist**: Code & project-dense layout emphasizing technical stacks.
  - [x] **Student / Fresher**: Academics, coursework, and foundational project layout.
  - [x] **Template Customizer**: Color accents, font selection (Inter, Outfit, Roboto, Merriweather, JetBrains Mono), line spacing (Compact, Normal, Relaxed), and show-icons toggle.
  - [x] **Pure Vector PDF Print Engine**: Standard `@media print` CSS ensuring zero rasterization or canvas blurring.
  - [x] **Interactive Template Showcase**: Full `/templates` gallery with live preview modal and 1-click routing into `/builder`.
* **Verification**: `next build` static export passing with 0 errors across all 12 routes.

---

### ⏳ Phase 4 — Document Intelligence & Parsing
* **Goal**: Build deep multi-format resume parsing for PDF, DOCX, and TXT files with confidence scoring.
* **Key Deliverables**:
  - [ ] Multi-format text extraction via `pdfjs-dist`, `mammoth`, and File API.
  - [ ] Rule-based NLP for section detection (Summary, Experience, Education, Skills, Projects).
  - [ ] Entity & contact extraction (Emails, phone numbers, URLs, dates, degrees).
  - [ ] Confidence ratings per extracted field (e.g. Name: 99%, Degree: 96%, Experience: 84%).
  - [ ] Interactive Non-Destructive Review Screen before merging into the active resume state.

---

### 📋 Phase 5 — Online Backend & Cloud Persistence
* **Goal**: Connect Supabase PostgreSQL database, Authentication, Storage, and Row-Level Security.
* **Key Deliverables**:
  - [ ] Supabase Auth (Email/Password + Google OAuth).
  - [ ] PostgreSQL Schema: `profiles`, `resumes`, `job_descriptions`, `compatibility_analyses`, `proof_analyses`, `resume_versions`.
  - [ ] Strict Row Level Security (RLS) policies guaranteeing total user data isolation.
  - [ ] Hybrid Cloud + Local persistence (seamless transition between Guest Demo and Logged-in Cloud state).

---

### 📋 Phase 6 — AI Engine & Fact-Lock™ Guardrails
* **Goal**: Implement Gemini AI provider abstraction, bullet-level rewrites, summary generation, and strict fact-lock protection.
* **Key Deliverables**:
  - [ ] Pluggable AI provider interface (`gemini.ts`, `offline.ts`, future `openai.ts`).
  - [ ] Secure server-side API proxy (API keys never exposed to the client).
  - [ ] **Bullet Improver**: Impact boost, conciseness, active verbs, technical tone, and quantification prompt.
  - [ ] **Fact-Lock™ Guardrails**: Strict prompt filters prohibiting fake metrics, false employers, or unearned credentials.
  - [ ] Offline fallback mock engine for testing and cost control.

---

### 📋 Phase 7 — Job Intelligence & Description Parser
* **Goal**: Extract structured requirements, seniority, and skills from raw job descriptions.
* **Key Deliverables**:
  - [ ] Raw job text input & parser.
  - [ ] Entity extraction for Required Skills, Preferred Skills, Responsibilities, and Seniority.
  - [ ] Skill normalization against the canonical knowledge base (`react.js` → `React`, `sklearn` → `Scikit-learn`).

---

### 📋 Phase 8 — Deterministic Compatibility Engine
* **Goal**: Calculate explainable Job Compatibility scores with multi-factor breakdown.
* **Key Deliverables**:
  - [ ] Deterministic mathematical weighting (Required Skills 30%, Keyword Coverage 20%, Semantic Similarity 20%, Experience Relevance 10%, Education 10%, Structure 10%).
  - [ ] Keyword match & gap analysis (Matched vs Missing skills list).
  - [ ] Pluggable semantic similarity embedding interface (Sentence Transformers ready).
  - [ ] Explainable "Why?" recommendations.

---

### 📋 Phase 9 — The Proof Score™ & Evidence Engine
* **Goal**: Audit claimed skills and statements to verify supporting evidence across experience and projects.
* **Key Deliverables**:
  - [ ] Cross-section verification: Checks if skills in the skill list are backed by projects or work achievements.
  - [ ] Evidence strength rating per claim (`HIGH`, `MEDIUM`, `LOW`, `UNSUPPORTED`).
  - [ ] Proof Score Calculation (Skill Evidence 25%, Project Evidence 25%, Experience Evidence 20%, Achievements 15%, Consistency 15%).
  - [ ] Constructive guidance on unbacked skills without accusing the candidate.

---

### 📋 Phase 10 — AI Optimization & Suggestion Engine
* **Goal**: Provide targeted, one-click optimization suggestions tailored to the target job description.
* **Key Deliverables**:
  - [ ] Step-by-step optimization plan based on Compatibility + Proof gaps.
  - [ ] Interactive Accept / Reject suggestion cards with highlighted diffs.
  - [ ] Fact protection guarantee during all rewrites.

---

### 📋 Phase 11 — Dashboard & Multi-Resume Portfolio
* **Goal**: Central dashboard for managing multiple resumes, target job variations, and version history.
* **Key Deliverables**:
  - [ ] Resume card grid with live compatibility and proof score badges.
  - [ ] Resume duplication (e.g., Base Resume → Google ML Engineer, Stripe ML Engineer).
  - [ ] Snapshot versioning ("Save Version" milestone history with rollback).
  - [ ] Saved job analyses and comparison overview.

---

### 📋 Phase 12 — ATS Vector PDF & Data Export
* **Goal**: Deliver standard ATS-compliant PDF downloads and portable JSON export/import.
* **Key Deliverables**:
  - [ ] 1-Click clean vector text PDF export via browser print engine.
  - [ ] Standard JSON format export/import for data portability and backup.
  - [ ] Plain text (.txt) ATS preview mode.

---

### 📋 Phase 13 — Polish, Security Hardening & SEO
* **Goal**: Enterprise readiness, performance optimization, accessibility audit, and complete documentation.
* **Key Deliverables**:
  - [ ] WCAG 2.1 AA accessibility compliance (contrast, ARIA, keyboard navigation).
  - [ ] Rate limiting, AI cost guardrails, and input length sanitization.
  - [ ] Core Web Vitals optimization and metadata SEO optimization.
  - [ ] Production deployment guide for Vercel + Supabase.
