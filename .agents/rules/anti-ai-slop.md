---
description: "Anti-AI-Slop design guidelines: Avoid purple gradients, pill buttons, fake reviews/metrics, emoji icons, em-dashes, and ensure proper dark/light theme, custom favicon, and real legal pages."
always_on: true
---

# Anti-AI-Slop Design & Engineering Rules

When building or modifying ResumProve UI and copy:
1. **No Purple Gradients**: Use deep slate, dark navy, indigo, and emerald for verified proof.
2. **No Pill Buttons**: Buttons must use `rounded-xl` or `rounded-lg`, never `rounded-full`.
3. **No Emoji Icons**: Always use Lucide/Phosphor SVG icons.
4. **No Em-Dashes or Slop Copy**: Do not use `—` in titles or copy. Ban words like "unleash", "supercharge", "elevate", "seamless".
5. **No Fake Reviews or Metrics**: Never fabricate fake testimonials or fake counters.
6. **Support Appearance Themes**: Maintain both Dark and Light mode compatibility cleanly.
7. **Production Legitimacy**: Keep Privacy Policy (`/privacy`) and Terms (`/terms`) functional and up to date.
