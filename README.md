# 📖 The Grimoire // Book Summary Hub

> _"Where the precision of code meets the wisdom of pages."_

Welcome to **DragunWF Library** (aka Book Summary Hub), a personal digital library and knowledge-sharing platform crafted by DragunWF. This project serves as a public archive for book summaries originally scribed in Obsidian, translated into a developer-centric, hacker-terminal aesthetic.

It is designed for those who appreciate the quiet hum of a server and the rustle of turning pages.

---

## ✨ System Features

- **📚 The Public Archives:** Browse a curated collection of book summaries, categorized and easily accessible.
- **🖋️ Markdown Native:** Summaries are rendered beautifully from Markdown, supporting rich text, code blocks, quotes, and structured formatting.
- **🧙‍♂️ Hacker-Library Aesthetic:** Deep dark mode (`Slate 950`) with "Mage Green" (`#00FF41`) accents, blending the vibe of a minimalist academic library with a cyberpunk terminal.
- **🔒 Admin Console (Dashboard):** A secured terminal for managing the database. Features include:
  - **Data Table:** Manage entries with server-side pagination and case-insensitive querying.
  - **Primary Archive Slot:** Interactively set a "Featured Book" to highlight on the main library interface.
  - **State Management:** Control visibility of archives (Live vs. Draft status).
  - **Supabase Integration:** Secure session management and data fetching using Server Actions.

---

## 🛠️ Tech Stack

This project is built with modern, performant web technologies:

- **Core Framework:** [Next.js (App Router)](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** CSS Modules (`.module.css`) - semantic, scoped, and strictly CSS.
- **Icons:** [Lucide React](https://lucide.dev/)
- **Database & Auth:** [Supabase](https://supabase.com/) (PostgreSQL)
- **Deployment:** [Vercel](https://vercel.com/)

---

## 🚀 Boot Sequence (Setup)

Want to initialize your own instance of The Grimoire? Follow these steps:

### 1. Prerequisites

- Node.js (v18+)
- npm, yarn, or pnpm
- A [Supabase](https://supabase.com/) project

### 2. Clone the Repository

```bash
git clone <repository-url>
cd book-summary-hub
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Environment Variables

Create a `.env.local` file in the root directory and inject your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# For Server Actions / Admin usage
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_service_role_key
```

### 5. Initialize the Server

```bash
npm run dev
```

The console will boot up. Navigate your browser to `http://localhost:3000` to establish a connection to the library.

---

## 📜 Database Architecture (Brief)

The application relies on a Supabase PostgreSQL database with the following core entities:

- `bookSummaries`: The primary archive storing `id`, `title`, `author`, `category`, `summary`, `fullContent` (Markdown), `isPublished`, and timestamps.
- `settings`: Stores global configuration states, such as the active `featuredBookId`.
