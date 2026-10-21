---
name: Adrena Club Design System
description: Kinetic Athletic Power visual design system for Adrena Club in Bab Ezzouar, Algiers.
colors:
  primary: "#F5C518"
  primary-hover: "#FFD738"
  primary-muted: "#D4A30A"
  neutral-bg: "#08090B"
  neutral-dark: "#0D0E12"
  neutral-card: "#131419"
  neutral-surface: "#181A21"
  border: "#232630"
  text-primary: "#FFFFFF"
  text-secondary: "#D1D5DF"
  text-muted: "#8E93A0"
  combat-accent: "#EF4444"
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

The visual design language represents **Kinetic Athletic Power**: deep carbon black, high-contrast bone typography, solid steel charcoal surfaces, and high-voltage championship athletic gold (`#F5C518`), directly echoing the dynamic golden chevron brand identity. It deliberately avoids synthetic AI cliches (such as pitch-black empty voids, muddy grey unreadable text, neon gradients, and floating blurred glass cards).

## Colors

- **Deep Carbon Black (`#08090B`)**: Authentic obsidian black base echoing iron plates and the physical gym environment.
- **Card & Surface Tiers (`#0D0E12`, `#131419`, `#181A21`)**: Solid structural backgrounds creating tactile depth and hierarchy without artificial drop shadows.
- **Structural Border (`#232630`)**: Crisp 1px razor edges defining equipment bays and timetable grids.
- **High-Voltage Adrena Gold (`#F5C518`)**: Vibrant, authoritative metallic gold representing energy, championship medals, and maximum focus.
- **Bone White / Stark Chalk (`#FFFFFF`)**: Crisp, readable primary typography providing maximum contrast (AAA) against dark surfaces.
- **Architectural Stone (`#D1D5DF`)**: Clean supporting secondary text ensuring effortless legibility without muddying.
- **Combat Crimson (`#EF4444`)**: High-intensity alert and combat badge accent for ring/tatami sessions.
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
