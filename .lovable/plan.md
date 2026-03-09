

# Hero Section Redesign Plan

## Summary
Redesign the hero section to feel like a premium product platform (Stripe/Linear aesthetic) with upgraded typography, a richer layered card composition, and more generous spacing.

## Changes

### 1. `index.html` — Add Playfair Display font
Replace `Source+Serif+4` with `Playfair+Display:wght@400;500;600;700` in the Google Fonts URL.

### 2. `tailwind.config.ts` — Update heading font
Change `fontFamily.heading` from `Source Serif 4` to `Playfair Display`.

### 3. `src/index.css` — Update CSS variable
Update `--heading-font` to `'Playfair Display', Georgia, serif`.

### 4. `src/components/HeroSection.tsx` — Full visual redesign

**Left side:**
- H1 scaled to `text-5xl sm:text-6xl lg:text-[4rem]` with tight `leading-[1.08]`
- Paragraph bumped to `text-lg lg:text-xl` with `leading-relaxed`
- More vertical spacing: `mb-8` on headline, `mb-10` on paragraph, `mb-12` on buttons
- Buttons get `text-base h-12 px-8` sizing

**Right side — three overlapping cards with depth:**

- **Card 3 (back, z-0):** "Validation du dossier" — offset top-right, rotated ~2°, lighter shadow, contains short status text. `animate-float-delayed`.

- **Card 2 (middle, z-10):** "Documents joints" — offset bottom-left, lists three file names (Plan de masse.pdf, Plan de situation.pdf, Photo du terrain.jpg) with small FileText icons. `animate-float-delayed` with different delay.

- **Card 1 (front, z-20):** "Demande de raccordement / Formulaire en cours" — centered, largest card. Contains step checklist (4 items, first 2 checked), progress bar animating to 50%. `animate-float` with 0.5s delay.

All cards use `bg-card border border-border rounded-xl shadow-lg/md/sm` with overlapping positioning via absolute + relative container.

**Section spacing:**
- Section padding increased to `py-24 lg:py-32`

### 5. `src/components/ui/button.tsx` — Refined hover
Add `transition-all duration-200` and subtle hover transforms to `cta` and `ctaOutline` variants.

## Technical Notes
- Playfair Display gives an editorial, institutional feel that immediately differentiates from template sites
- The three-card layered composition creates visual depth similar to product marketing pages
- Float animations already exist in tailwind config — reused with staggered delays
- No structural changes to other sections or routing

