

# UI Refinement Plan — Demande Raccordement

## Overview
Upgrade visual quality across all existing sections: larger typography, better spacing, scroll-triggered fade-ins, hover micro-interactions, and an animated hero visual. No structural changes.

## Changes by File

### 1. `tailwind.config.ts`
- Add keyframes: `float` (gentle Y oscillation), `float-delayed` (offset timing), `progress-fill` (width 0→50%)
- Add corresponding animation utilities

### 2. `src/index.css`
- Increase `--section-gap` from `6rem` to `7rem`
- Add `.scroll-fade-in` class using CSS `@starting-style` or a simple IntersectionObserver-based approach
- Bump base heading sizes

### 3. `src/hooks/useScrollFadeIn.ts` (new)
- Small custom hook using IntersectionObserver to add a `.visible` class for scroll-triggered fade-in animations

### 4. `src/components/HeroSection.tsx`
- Increase H1 to `text-4xl sm:text-5xl lg:text-[3.5rem]`, paragraph to `text-lg lg:text-xl`
- Right side: keep existing form card but add `animate-float` (subtle Y bob)
- Add two smaller floating cards behind/offset ("Documents joints" with FileText icon, "Validation du dossier" with CheckCircle icon) with `animate-float-delayed`
- Progress bar: use `animate-progress-fill` to animate width from 0 to 50%
- Use soft shadows (`shadow-md`, `shadow-sm`) — no gradients

### 5. `src/components/RequestTypesSection.tsx`
- H2 → `text-3xl sm:text-4xl`
- Card hover: `hover:shadow-md hover:-translate-y-1 hover:border-primary/30 transition-all duration-300`
- Icon size → `h-6 w-6`, wrap in larger container
- Add scroll fade-in via hook

### 6. `src/components/ProcessSection.tsx`
- H2 → `text-3xl sm:text-4xl`
- Step numbers → `text-5xl`
- Add horizontal connector line between steps (absolute positioned `border-t` — already partially there, refine styling)
- Add hover highlight: `hover:bg-muted/50 rounded-lg p-6 transition-all`
- Staggered scroll fade-in per step

### 7. `src/components/DocumentsSection.tsx`
- Convert from flat list to grid of cards (`grid sm:grid-cols-2 lg:grid-cols-3 gap-4`)
- Each card: icon + name, `bg-card border rounded-lg p-5 hover:shadow-sm hover:border-primary/20 transition-all`
- H2 → `text-3xl sm:text-4xl`

### 8. `src/components/AdvantagesSection.tsx`
- H2 → `text-3xl sm:text-4xl`
- Larger icon containers, slightly bigger text
- Scroll fade-in

### 9. `src/components/FaqSection.tsx`
- H2 → `text-3xl sm:text-4xl`
- Accordion rows: increase padding, add `hover:bg-muted/30` transition
- Trigger text → `text-base`

### 10. `src/components/FinalCtaSection.tsx`
- Reduce padding slightly (`py-16 sm:py-20` vs full section-padding)
- H2 → `text-3xl sm:text-4xl`, paragraph → `text-lg`
- Button: add `hover:scale-[1.02] transition-all duration-200`

### 11. `src/components/SiteFooter.tsx`
- Increase gap between columns (`gap-12`)
- Section titles: `text-sm font-semibold` (slightly larger)
- More padding (`py-16`)

## Technical Notes
- The scroll fade-in hook will use IntersectionObserver with `threshold: 0.1` and apply opacity/translateY transition via a CSS class
- Float animations use `@keyframes` with small translateY values (6-8px) over 6s infinite alternate
- All changes are purely visual — no logic or routing changes

