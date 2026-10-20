---
name: Adrena Club Design System
description: Premium Athletic Club visual design system for Adrena Club in Bab Ezzouar, Algiers.
colors:
  primary: "#D49B2E"
  primary-hover: "#E5AC3F"
  primary-muted: "#8A641E"
  neutral-bg: "#111215"
  neutral-dark: "#16171B"
  neutral-card: "#18191E"
  neutral-surface: "#1E2026"
  border: "#2A2D35"
  text-primary: "#F4F5F7"
  text-secondary: "#D1D5DB"
  text-muted: "#9CA3AF"
  combat-accent: "#DC2626"
  active-emerald: "#10B981"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontWeight: 700
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontWeight: 400
    lineHeight: 1.6
  arabic:
    fontFamily: "Cairo, sans-serif"
    fontWeight: 600
rounded:
  xs: "4px"
  sm: "6px"
  md: "10px"
  lg: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  "2xl": "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.md}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "{colors.neutral-surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "14px 28px"
---

## Overview

Adrena Club is an elite, multi-discipline athletic facility located in Bab Ezzouar (CUB1), Algiers. Spread over two dedicated levels (Ground Floor & Basement / Sous-Sol), it provides dedicated zones for Musculation/Fitness, Combat Sports (Kickboxing, Judo, Lutte), and a 100% private, zero-music Women's Sanctuary.

The visual design language represents **Premium Athletic Craftsmanship**: tactile, architectural dark charcoal, high-contrast bone typography, solid cast-iron surfaces, and championship athletic gold. It deliberately avoids synthetic AI cliches (such as pitch-black empty voids, muddy grey unreadable text, neon gradients, and floating blurred glass cards).

## Colors

- **Architectural Charcoal Base (`#111215`)**: Deep, textured obsidian-charcoal evoking heavy cast-iron plates and industrial architecture.
- **Card & Surface Tiers (`#16171B`, `#18191E`, `#1E2026`)**: Solid structural backgrounds creating tactile depth and hierarchy without artificial drop shadows.
- **Structural Border (`#2A2D35`)**: Crisp 1px razor edges defining equipment bays and timetable grids.
- **Championship Athletic Gold (`#D49B2E`)**: Warm, refined metallic gold representing excellence, medals, and focus.
- **Bone White / Chalk (`#F4F5F7`)**: Crisp, readable primary typography providing maximum contrast (AAA) against dark surfaces.
- **Architectural Stone (`#D1D5DB`)**: Clean supporting secondary text ensuring effortless legibility without muddying.
- **Combat Crimson (`#DC2626`)**: High-intensity alert and combat badge accent for ring/tatami sessions.
- **Emerald Pulse (`#10B981`)**: Real-time open/closed indicators and live facility activity.

## Typography

- **Display & Headings**: `Manrope` (Weights 600, 700, 800, sentence-case). Clean geometric grotesque with authoritative modern athletic precision, eliminating AI-template screaming all-caps.
- **Body & Functional UI**: `Manrope` (Weights 400, 500, 600). Unrivalled numeral legibility, open apertures, and effortless scanability across dense schedules, pricing grids, and FAQs.
- **Arabic Script**: `Cairo` (Weights 600, 700). Carefully paired to maintain proportional stroke weight and optical rhythm alongside Manrope in bilingual toggles.

## Layout

- **Structural Grid**: Max container width `max-w-7xl` with responsive side padding (`px-4 sm:px-6 lg:px-8`).
- **Tactile Density**: Sports timetable boards and pricing grids use tight, purposeful information density instead of sparse, empty SaaS cards.
- **RTL Symmetrical Support**: Bidirectional layouts dynamically flipped when Arabic is toggled, ensuring correct optical balance and typography leading.

## Elevation & Depth

- **Tonal Layering Over Blurred Glass**: Depth is achieved through purposeful color stepping (`#111215` -> `#16171B` -> `#18191E` -> `#1E2026`), not semi-transparent blurs (`backdrop-blur`).
- **Precision Borders**: `1px solid #2A2D35` borders give cards a solid, engineered industrial feel.

## Shapes

- **Cards & Bays**: Moderate rounded corners (`rounded-xl` or 12-16px) balancing modern athletic tech with industrial equipment rigidity.
- **Buttons & Chips**: Tactile radius (`rounded-lg` or 8-10px) with solid fill states and active feedback.
- **Badge Tags**: Compact athletic labels (`rounded-md` or `rounded-full`) reserved strictly for status cues (e.g. LIVE, HOMMES, FEMMES, ENFANTS).

## Components

- **Competition Schedule Board**: Multi-discipline day matrix with instant category filters, visual floor indicators (RDC vs Sous-Sol), and clear time blocks.
- **Interactive Membership Calculator**: Tactile subscription customizer allowing instant calculation of formula, disciplines, and duration with transparent DZD pricing.
- **Women's Sanctuary Showcase**: Respectful, private presentation highlighting 100% woman-only hours, female coaches, private RDC floor, and music-free environment.
- **360° Architectural Tour**: Interactive panoramic viewer displaying the actual gym bays (Sous-sol Tatami & Musculation).

## Do's and Don'ts

### Do's
- Always maintain high contrast with `#F4F5F7` (Bone) or `#D1D5DB` (Stone) on dark surfaces.
- Use sentence-case, authoritative geometric typography (Manrope) for athletic titles.
- Anchor sections with real physical context (Bab Ezzouar CUB1, RDC, Sous-Sol).
- Ensure all interactive elements have visible focus and hover states.

### Don'ts
- Do not use pitch-black voids (`#000000` or `#050505`) without surface gradation.
- Do not use electric neon yellows or synthetic glowing drop-shadows.
- Do not use low-contrast grey micro-text below 12px.
- Do not use centered `[ ✦ KICKER ✦ ]` decorative pills that signify generic AI templates.
