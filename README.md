# Task Management Web App

A lightweight Task Management Web App for sales teams to track, manage, and prioritize tasks based on ROI (Return on Investment). Built with Next.js App Router, TypeScript, and shadcn/ui components. Data persists in LocalStorage (no backend).

## Features
- Add, edit, delete tasks
- View task details and notes
- Search & filter by status and priority (UI primitives available)
- ROI = Revenue ÷ Time Taken (safe handling for 0 and invalid values)
- Sort by ROI desc, then Priority (High > Medium > Low), then Created date, then Title
- Summary insights: Total revenue, Average ROI, Completion rate, Performance grade
- Import/Export via CSV (export implemented)
- Undo delete via snackbar
- LocalStorage persistence

## Tech Stack
- Next.js 16 (App Router)
- React 19, TypeScript 5
- TailwindCSS 4, shadcn/ui (Radix UI)

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Install
```bash
pnpm install
# or
npm install
```

### Run (dev)
```bash
pnpm dev
# or
npm run dev
```
App runs at http://localhost:3000

### Build
```bash
pnpm build
# or
npm run build
```

### Start (prod)
```bash
pnpm start
# or
npm start
```

## CSV Export
- Click Export to download CSV with the following columns:
  - Title, Revenue, Time Taken, ROI, Priority, Status, Notes
- ROI shows `—` when `Time Taken = 0`.

## Data Persistence
- Tasks are saved to `localStorage` under key `tasks`.

## Dialogs & Interactions
- Click a task row → opens View dialog.
- Click Edit icon → opens Edit dialog only.
- Click Delete icon → opens Delete confirmation only.
- Undo delete available for 5s via snackbar.

## Sorting Rules
1. ROI (desc)
2. Priority: High > Medium > Low
3. Created date (oldest first)
4. Title (alphabetical)

## Form Validation
- Title required
- Revenue ≥ 0
- Time Taken ≥ 0
- If Revenue > 0 and Time Taken = 0 → validation error

## Bug Fixes Summary
- Double fetch on load: guarded initial load `useEffect` with a ref (StrictMode safe)
- Undo snackbar state: ensured `lastDeletedTask` and snackbar flags are cleared on close/timeout
- Stable sorting: deterministic tie-breakers (date, then title)
- Double dialog opening: prevented via `stopPropagation()` and row click guards
- ROI safety: handled division by zero and invalid input; used `—` placeholder consistently

## Deployment (Vercel)
1. Push to GitHub (already set up)
2. Import the repo in Vercel
3. Framework preset: Next.js
4. Build command: `next build`
5. Output: `.vercel/output` (handled automatically by Vercel)
6. Deploy and share the live URL

## Scripts
```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint ."
}
```

## License
MIT
