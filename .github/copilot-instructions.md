# Copilot / AI Agent Instructions for Projects Dashboard 🔧

Purpose: give AI coding agents just enough repo-specific context to be immediately productive—what matters, where to look, and concrete examples to follow.

## Big picture
- Small React app (Vite) using Tailwind CSS and React Router. Single-page dashboard listing static projects (no backend/API).
- Data-driven: UI is populated from a single source of truth: `src/data/projectsData.js`.
- Routes: `/` → Dashboard, `/projects/:id` → Project detail (see `src/App.jsx`).

## Key files & components (start here) 📁
- `src/main.jsx` — app entry; uses `BrowserRouter` and `React.StrictMode`.
- `src/App.jsx` — route definitions (React Router v7). Add routes here.
- `src/pages/Dashboard.jsx` — filtering, search, sorting, and wiring of components.
- `src/pages/ProjectPage.jsx` — project details page; handles iframe embeds (Tableau) and screenshots.
- `src/data/projectsData.js` — canonical project data schema (see example below).
- `src/components/*` — UI building blocks: `Header`, `KpiGrid`, `Controls`, `ProjectsTable`, `ProjectModal`.
- `public/projects/` — static assets (screenshots) per project id.

## Data shape (exact, copyable example) 🧩
Follow this structure when adding or editing projects in `projectsData`:

```js
{
  id: "sales-performance", // used in URL `/projects/:id`
  title: "Sales Performance Analysis",
  domain: "Sales",
  year: 2025,
  tools: ["SQL", "Python"],
  tags: ["profit", "discounts"],
  shortDescription: "One-line summary",
  overview: "Longer description...",
  insights: ["Key takeaway 1", "Key takeaway 2"],
  assets: { screenshots: ["/projects/sales-performance/dashboard-1.png"] },
  embeds: [{ type: "iframe", src: "https://..." }],
}
```
- Put images at `public/projects/<id>/...` and reference them from `assets.screenshots`.
- `id` must be unique and stable since it drives routing and lookup in `ProjectPage`.
- `embeds` supports at least `{ type: 'iframe', src }` (ProjectPage checks `dashboard?.type === 'iframe'`).

## UI/UX & conventions
- Styling: Tailwind utility classes throughout. See `tailwind.config.js` (content: `./src/**/*.{js,jsx}`).
- Component files use `.jsx` and functional React components with hooks.
- Sorting/search logic lives in `Dashboard.jsx`:
  - Search joins many fields (title, domain, year, tools, tags, descriptions) and does a case-insensitive substring match.
  - Sorting default: `sortBy='year'`, `sortDir='desc'`. `toggleSort` toggles dir or resets for new column.
- Navigation: `ProjectsTable` row click calls `navigate('/projects/' + id)` (React Router) — prefer route navigation over ad-hoc modals unless intentionally changing behavior.

## Linting & build
- Commands (package.json):
  - `npm run dev` — start dev server (Vite + HMR)
  - `npm run build` — build production bundle
  - `npm run preview` — preview build locally
  - `npm run lint` — run ESLint (configured in `eslint.config.js`)
- ESLint note: `no-unused-vars` is configured to ignore symbols starting with a capital letter or underscore (`varsIgnorePattern: '^[A-Z_]')` — watch for false positives/negatives when refactoring.

## Known quirks & implementation notes ⚠️
- `ProjectModal.jsx` exists but is not currently used by `Dashboard`; details are shown on the separate `ProjectPage`. The table copy "ESC to close" is stale unless modal logic is added.
- There are Hebrew comments in `projectsData.js`—be mindful when editing that file.
- No tests or CI configured in this repo (no test runner found).

## When making changes, follow these concrete rules ✅
- Adding a project: update `src/data/projectsData.js` and add any screenshots to `public/projects/<id>/`.
- Adding a route: register it in `src/App.jsx` and add a page in `src/pages/`.
- Keep Tailwind utility styling consistent with existing patterns (rounded, neutral color palette, small text sizes used for metadata).
- If adding interactive embeds, follow the `iframe` pattern in `ProjectPage.jsx` (check for `dashboard?.type === 'iframe'`).

---
If anything above is unclear or you want more detail (e.g., a quick code sample for adding a new project + assets), tell me which area to expand and I’ll iterate. 👇
