# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Vite dev server on localhost:5173
npm run build     # TypeScript check (tsc -b) + Vite production build → dist/
npm run preview   # Serve built dist/ locally
```

No test runner configured. Use `.claude/launch.json` with `preview_start` for visual testing.

## Architecture

React 19 + TypeScript 6 + Vite 8 + Tailwind CSS v4 + React Router 7 SPA. Mobile-first, designed for QR code access at trade shows.

### Flow

`/ (LandingPage)` → form submit saves to sessionStorage → `/game (GamePage)` → win/lose navigates with Router state → `/result (ResultPage)` → saves lead data, clears sessionStorage (one attempt per registration).

### Key architectural decisions

- **No global state**: Form data passes between routes via `sessionStorage` (key: `expo-form-data`). Game result passes via React Router `location.state`.
- **Refs over state for game logic**: `useMemoryGame` uses `phaseRef`, `selectedRef`, `matchedCountRef` to avoid stale closures during rapid card clicks. The `phase` state variable drives re-renders; the ref drives logic guards.
- **Timer starts on first flip**, not on page load — gives players a moment to scan the board.
- **Separation of selection and comparison**: `flipCard()` only flips the card visually and updates `selected` state. A `useEffect` watching `selected.length === 2` handles comparison logic with timeouts.

### Tailwind theme (src/index.css)

Custom colors defined in `@theme` block: `primary` (#009def), `primary-dark` (#0077b6), `primary-light` (#ecf6ff), `dark` (#32373c), `success`, `danger`, `warning`, `gold`. Font: Montserrat via Google Fonts.

**Important**: Do not add `* { padding: 0; margin: 0; }` resets — they override Tailwind utility classes due to specificity. Tailwind v4 preflight handles this.

### Card animations (src/index.css)

3D flip uses `transform-style: preserve-3d` + `rotateY(180deg)` with `backface-visibility: hidden`. Classes: `.card-inner`, `.card-inner.flipped`, `.card-face`, `.card-back`. Other animations: `.confetti-piece`, `.prize-card`, `.timer-danger`, `.card-matched`.

### Data storage (src/utils/storage.ts)

`saveLead()` POSTs to Google Sheets via Apps Script URL (configurable via `SHEETS_URL` constant). Falls back to localStorage (`expo-optica-leads-fallback`) if URL is empty or request fails.

### Validation (src/utils/validation.ts)

CNPJ validation includes full mod-11 check digit algorithm. WhatsApp and CNPJ inputs have real-time formatting masks.

## Deploy

Configured for Vercel (`vercel.json`) and Netlify (`public/_redirects`). Both rewrite all routes to `index.html` for SPA support. Currently deployed on Vercel.
