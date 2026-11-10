# Anti-AI-Slop Design & Engineering Guidelines

This document outlines the visual, copywriting, and architectural constraints to ensure **ResumProve** feels like a Tier-1, human-engineered software product (such as Stripe, Linear, or Vercel) and prevents any generic AI-generated templates or slop.

---

## 🚫 Negative Constraints (What to Strictly Avoid)

### 1. Visual & UI Clichés
- **No Purple Gradients**: Avoid clichéd purple/violet-to-pink gradient text and arbitrary neon glows. Use curated, intentional color scales (deep slate, dark navy, indigo brand tones, and crisp emerald for verified proof).
- **No Pill-Shaped Buttons**: Do not use `rounded-full` for interactive action buttons. Use structured, modern radii (`rounded-xl` or `rounded-lg`) with top physical bevel highlights and tactile pressed states.
- **No Emoji Icons**: Never use emojis (🚀, 💡, ⚡, 🔥) as UI iconography. Always use crisp, consistent vector SVG icons (Lucide or Phosphor).
- **No Chaotic Animations**: Avoid custom cursor followers, magnetic mouse trails, and scroll-hijacking animations that cause performance lag or disorientation.

### 2. Copywriting & Content Clichés
- **No Vague Hero Headlines**: Avoid generic slogans like "Revolutionize your workflow with next-gen AI power." State directly WHAT the product does and the exact tangible outcome for the user.
- **No Em-Dash Overuse**: Eliminate repetitive em-dashes (`—`) in marketing copy. Use concise sentences, pipes (`|`), or colons.
- **No AI Buzzword Slop**: Ban hollow words like "unleash," "supercharge," "game-changer," "elevate," "seamless," and "magical."
- **No Fake Reviews or Testimonials**: Never display fictional avatars with synthetic praise. Prioritize verifiable product capabilities, deterministic simulations, and transparent proof models.
- **No Fake Counters**: Ban deceptive widgets like "238 people are viewing this right now" or artificial countdown timers.
- **No AI Slop Photography**: Avoid plastic-looking AI-generated faces or generic synthetic 3D avatars. Use clean UI schematics, vector diagrams, and real data previews.

---

## ✅ Positive Requirements (Production Legitimacy)

### 1. Appearance & Theme Architecture
- **True Dual-Theme Support**: Flawless Dark Mode and Light Mode support with manual toggle (Light / Dark / System) and zero hydration flicker.
- **High-Contrast Readability**: Strict adherence to WCAG 4.5:1 (AA) and 7:1 (AAA) contrast ratios across both light and dark modes.
- **Physical Depth**: Subtle top inner-highlight bevels (`shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]`) on dark cards and crisp boundary borders on light surfaces.

### 2. Trust & Legal Infrastructure
- **Custom Favicon & Branding**: Crisp SVG vector icon and brand favicon.
- **Legal Compliance Pages**: Dedicated, legitimate Privacy Policy (`/privacy`) and Terms of Service (`/terms`) pages.
- **Zero AI Watermarks**: Never include "Made with AI", "Powered by AI", or platform-generated tags.

---

## 📋 Pre-Commit Quality Checklist

- [ ] Does any button use `rounded-full`? (If yes, change to `rounded-xl` or `rounded-lg`)
- [ ] Are there emojis used as UI icons? (If yes, replace with Lucide SVGs)
- [ ] Does the copy contain em-dashes (`—`) or buzzwords like "unleash" or "supercharge"?
- [ ] Does the UI render cleanly in both Dark and Light themes?
- [ ] Are Privacy Policy and Terms of Service links functional?
- [ ] Are all metrics and calculations deterministic, explainable, and truthful?
