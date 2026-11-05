# SkillBridge

**An AI-powered career development platform for college students and fresh graduates.**
Discover careers → find your skill gaps → follow a roadmap → build projects → walk into placements prepared.

Built with **React 18 + Vite**, plain CSS, React Router and Lucide icons. No UI framework, no chart
library — the charts are hand-written SVG so the whole app stays small and themeable.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:5173
```

Production build:

```bash
npm run build        # → dist/  (static, deploy anywhere)
npm run preview      # serve the production build locally
```

Optional single-file build (one self-contained HTML file, opens straight from disk):

```bash
npm run build:single # → dist-single/index.html
```

**Demo account** — email `demo@skillbridge.in`, password `demo1234`. Or sign up; new accounts are
stored in your browser.

---

## What is in the app

| Route | Page | What it does |
|---|---|---|
| `/` | Home | Hero, featured career paths, popular skills, how it works, stats, student stories, CTA |
| `/careers` | Career Explorer | 7 tracks with search, category + difficulty filters, 4 sort modes, loading/empty states |
| `/careers/:id` | Career detail | Description, ranked skill table, salary bands, difficulty, opportunities, related roles, "set as my goal" |
| `/skill-gap` | AI Skill Gap Analyzer | Skill picker + target role → weighted match score, radar chart, ranked gaps, 6-week plan, recommendations |
| `/roadmaps` | Learning Roadmaps | 7 paths × 3 levels, 84 topics with hours + resources, per-topic completion, progress tracking |
| `/projects` | Project Hub | 36 briefs across 6 categories, filters, save/unsave, full step-by-step build guide in a modal |
| `/assistant` | AI Career Assistant | Chat UI with suggested questions, saved history, typing state, retry on error, honest mode labelling |
| `/placement` | Placement Prep | Technical + HR banks, resume guide, timed aptitude quiz, coding resources, mock interview, progress checklist |
| `/dashboard` | Student Dashboard | Greeting, career goal, skill + roadmap progress, saved projects, recommendations, activity, notifications |
| `/login`, `/register` | Auth | Validated forms, password strength, demo login, session persistence |
| `/about` | About | Mission, principles, team, FAQ, honest disclaimer |
| `*` | 404 | Useful recovery links |

Everything is functional: every button navigates, filters, saves, or computes something. There are no
dead links or placeholder actions.

---

## Project structure

```
skillbridge/
├── index.html
├── vite.config.js               # standard build
├── vite.single.config.js        # one-file build
├── server/
│   └── index.js                 # optional AI proxy + static host (no dependencies)
├── src/
│   ├── main.jsx
│   ├── App.jsx                  # router + providers
│   ├── components/
│   │   ├── Navbar.jsx  Footer.jsx  Layout.jsx  ProtectedRoute.jsx
│   │   ├── CareerCard.jsx  Icon.jsx
│   │   ├── ui.jsx               # Badge, ProgressBar, Modal, EmptyState, SearchInput, …
│   │   └── charts.jsx           # ProgressRing, RadarChart, SparkBars (pure SVG)
│   ├── context/
│   │   ├── AuthContext.jsx      # localStorage accounts + session
│   │   ├── ProgressContext.jsx  # per-user progress, activities, notifications
│   │   └── ToastContext.jsx
│   ├── data/
│   │   ├── careers.js           # 7 careers, skills, salary bands, difficulty
│   │   ├── skills.js            # 40-skill catalogue + per-career requirements
│   │   ├── roadmaps.js          # 84 topics with resources and hours
│   │   ├── projects.js          # 36 projects with build steps
│   │   ├── placement.js         # questions, aptitude, resume tips, mock rounds
│   │   └── site.js              # testimonials, stats, team, FAQ, demo account
│   ├── pages/                   # one file per route
│   ├── services/
│   │   ├── analyzer.js          # skill-gap scoring + roadmap generation
│   │   └── ai.js                # live client + demo rule engine
│   ├── styles/
│   │   ├── global.css           # tokens, base, layout, components
│   │   └── pages.css            # page-level styles
│   └── utils/                   # validation, storage helpers
└── README.md
```

---

## AI integration

The app supports two clearly separated modes, and **the UI always says which one is running**.

### Demo mode (default, no key required)

`VITE_AI_MODE` is unset, so `src/services/ai.js` uses a rule engine over the same career dataset that
powers the rest of the site. It is deterministic logic — not a language model — and every surface that
uses it carries a visible **“Demo mode”** badge. The Skill Gap Analyzer's score is real arithmetic on
your inputs (weighted by core/important/bonus skills), in both modes.

### Live mode (bring your own key)

Keys must never live in frontend code, so the repository ships a small server-side proxy:

```bash
cp .env.example .env          # add AI_API_KEY
node server/index.js          # http://localhost:8787

# in a second terminal, for the frontend:
VITE_AI_MODE=live
VITE_AI_ENDPOINT=http://localhost:8787/api/assistant npm run dev
```

`server/index.js` is dependency-free Node (`node:http`), works with any OpenAI-compatible endpoint
(`AI_BASE_URL`, `AI_MODEL`), rate-limits per IP, caps body size, and returns a clean 503 when no key is
configured — the frontend then stays in demo mode. In production it also serves `dist/` so one process
hosts both the API and the static app.

The system prompt is in `server/index.js`: concise, structured, Indian-context answers with an explicit
instruction never to promise outcomes or invent statistics.

---

## Design system

| Token | Value | Use |
|---|---|---|
| Deep navy | `#0A1022` / `#060A16` | Hero, dashboard banner, footer, score cards |
| Electric purple | `#7C3AED` → `#A78BFA` | Primary actions, accents, gradients |
| Blue / cyan | `#2563EB` / `#22D3EE` | Gradient partners, secondary accents |
| White / light grey | `#FFFFFF` / `#F6F7FB` | Surfaces, alternating sections |
| Text | `#10162A` / `#5B6579` | Headings, body |

- **Type**: Inter for UI, Sora for display headings.
- Rounded cards (14–24 px), pill buttons, subtle 1 px borders, layered shadows.
- Gradients are reserved for the hero, score panels and CTAs — everything else stays flat and calm.
- Responsive at 1100 / 900 / 680 px breakpoints; the navbar collapses to a full-height sheet, grids go
  single-column, and the chat layout stacks on mobile.
- `prefers-reduced-motion` is respected; focus states are visible for keyboard users.

---

## Data and honesty

- Salary ranges are **indicative averages** from public Indian job-market data and are labelled as such
  on the career pages. They are not offers or guarantees.
- Students in the testimonials, the team, and the college logos are **fictional/illustrative**.
- Authentication is a **demo**: accounts are stored in `localStorage` with a non-cryptographic digest.
  A real deployment must hash server-side (bcrypt/argon2) and never trust the client.
- The mock interview is a timer plus self-rating tool, not an AI interviewer — the UI says so.
- The site never claims a placement guarantee.

---

## Persistence keys

`localStorage`, all namespaced under `skillbridge:` — `users`, `session`, `progress:<email>`,
`assistant:sessions`. Clearing site data resets the demo. Guest progress is stored under
`progress:guest` and is not merged into an account on login.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run build:single` | One self-contained HTML file in `dist-single/` |
| `npm run server` | Optional AI proxy + static host on port 8787 |

---

## Browser support

Modern evergreen browsers (Chrome/Edge 100+, Firefox 100+, Safari 15+). Uses `backdrop-filter`,
CSS `mask-image`, and `Intl` date formatting; graceful degradation everywhere else.
