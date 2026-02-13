# 🧙‍♂️ GEMINI.md - Project Context & Guidelines

## 1. Project Overview

- **Name:** Book Summary Hub (aka "The Grimoire" / "Mage Notes")
- **Owner:** DragunWF (Developer, IT Student, "Green-Hooded Mage" Persona)
- **Purpose:** A public "Digital Library" to showcase book summaries written in Obsidian (Markdown). It serves as a personal portfolio and a knowledge-sharing platform.
- **Aesthetic:** "Digital Library" meets "Hacker Terminal."
- **Theme:** Deep Dark Mode (`#09090b` / Slate 950).
- **Accents:** "Mage Green" (`#00FF41`) for high-value interactions.
- **Vibe:** Minimalist, Academic, Developer-Centric.

---

## 2. Tech Stack

- **Framework:** Next.js 14/15 (App Router)
- **Language:** TypeScript
- **UI Library:** React
- **Styling:** **CSS Modules** (strictly `.module.css` files).
  - _Constraint:_ **DO NOT** suggest or use Tailwind CSS unless explicitly asked to migrate.
- **Icons:** `lucide-react`
- **Content Source:** Local Markdown/MDX files (exported from Obsidian).
- **Deployment:** Vercel

---

## 3. Architecture & Coding Standards

- **Folder Structure:** Follow the "App Router" simplicity pattern.
  - **Pages:** All routes go inside the `app` directory (e.g., `app/books/page.tsx`).
  - **Components:** Place UI components in `app/_components` (to keep them private) or a root `components` folder.
  - **Logic:** Use a simple `app/_lib` folder for helper functions and data fetching (e.g., `getPostMetadata`).
- **Data Fetching:**
  - Fetch data directly inside Server Components (the `page.tsx` files) using `await`.
  - No complex "Clean Architecture" layers—keep it direct and simple.
- **Styling:**
  - Co-locate CSS Modules with their components (e.g., `Header.tsx` sits next to `Header.module.css`).
  - Use `app/globals.css` for CSS variables and resets.

---

## 4. Design System Guidelines

- **Typography:**
  - **Headings:** Serif (e.g., 'Playfair Display', 'Merriweather') or Monospaced ('Fira Code') depending on the specific layout mode.
  - **Body:** Sans-Serif (Inter, Geist, or System UI) for maximum readability.
- **Visuals:**
  - Use subtle CSS transitions for hover states (glows, lifts).
  - Grid layouts should be responsive (stacking on mobile).

---

## 🛑 5. CRITICAL AI CONSTRAINTS

**The following rules must be strictly followed by Gemini:**

1.  **NO GIT OPERATIONS:** You are **strictly prohibited** from executing any `git` commands (e.g., `git push`, `git commit`, `git add`) in the terminal. You may only suggest git commands for the user to execute manually.
2.  **NO TAILWIND:** Do not generate Tailwind utility classes. Use semantic class names and CSS Modules.
3.  **Respect the Persona:** When generating placeholder text or "About" sections, maintain the "DragunWF" identity (Developer + Mage).
