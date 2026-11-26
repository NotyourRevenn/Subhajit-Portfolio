# Specification: 3D Interactive Portfolio Redesign & Unslop

Status: FINALIZED
Date: 2026-11-26
Author: Antigravity & User

## 1. Problem Statement & Objectives
The user requested a complete aesthetic transformation of Subhajit Mondal's portfolio (`D:\Websites\subhajit-portfolio`):
- Transform into an aesthetic 3D landing page under `/landing-page-design` methodology.
- Remove all artificial "AI-slop" elements, specifically removing visible wireframe grids and excessive box borders.
- Add an interactive 3D element in the hero section (Three.js WebGL supply chain data core + dynamic 3D cursor tilt).
- Apply a refined, aesthetic flat dark color palette (`#000000`, `#181818`, `#1F1F1F`, `#272727`, `#313131`) with `#FFFFFF` → `#9B9B9B` hero heading gradient.
- Implement the mandatory B11 tagline reveal section with word-by-word scroll reveal.
- Preserve all verified recruiter assets, quantitative KPIs (₹94.5L, -18.2% CPU, 200K+ records), interactive decision labs, and contact links.

## 2. Page Structure & Outline (Landing Page Design Part A)
1. Floating Navigation: Translucent glass pill (`#181818` with `backdrop-filter: blur(16px)`).
2. Hero Section:
   - Left: Left-to-right text gradient heading (`#FFFFFF` → `#9B9B9B`), max-width 680px, no hyphens, clear value proposition, primary CTAs.
   - Right: Interactive 3D WebGL Canvas powered by Three.js (interactive 3D supply chain data core with rotating node rings, particle field, mouse/touch rotation) paired with a floating 3D portrait card.
3. Performance Metrics (KPI Cards): 4 tactile cards with 3D perspective tilt on hover.
4. B11 Tagline Reveal Section: Mandatory word-by-word scroll reveal with `IntersectionObserver`.
5. Featured Case Studies & Interactive Decision Labs:
   - Case 1: Warehouse Productivity & CPU Optimization (Interactive Zone Simulator).
   - Case 2: Dark Store Inventory Holding (Interactive DIO Slider).
   - Case 3: Enterprise Sales Margin & Star Schema (Interactive SQL Workbench).
6. Technical Toolkit: Category-grouped skills in clean, unslop surfaces.
7. Experience & Track Record: Professional experience at StarApp Solutions, MBA, B.Tech, and verified certifications.
8. Conversion Footer & Modals: Recruiter brief modal, printable resume modal, and direct contact triggers.

## 3. Visual System Specifications (Part B)
- **Typography**: Manrope for UI and body text, Geist Mono for code/metrics. Tailwind scale steps.
- **Copy**: No hyphens in copy, no orphaned words (`text-wrap: balance` for headings, `text-wrap: pretty` for body).
- **Backgrounds**: Flat dark palette. No background gradients. No grid backgrounds.
  - Page base: `#000000`
  - Cards: `#181818`
  - Elevated / hover: `#1F1F1F`
  - Inset code areas: `#131209`
  - Borders: `#272727`
- **Hero Heading**: Text gradient `#FFFFFF` → `#9B9B9B`.
- **Motion**: Base curve `cubic-bezier(0.22, 1, 0.36, 1)`, duration 500ms.
- **3D Implementation**: Three.js WebGL interactive supply chain data core with orbit interaction + CSS 3D perspective card tilt.

## 4. Verification Plan
- Syntax and asset integrity verification.
- Responsiveness check at 390px (mobile) and 1440px (desktop).
- Interactive 3D canvas rendering and smooth interaction verification.
- Capture updated screenshots with headless Edge.
- Git commit and push to GitHub repository.
