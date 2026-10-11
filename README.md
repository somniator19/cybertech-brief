# CyberTech · Week 1 — Mentor Brief

Static interactive page for Problem Discovery mentor sessions (TUMO Labs CyberTech).

## Features

- Problem shortlist with **Why it hurts** / **Who feels the pain**
- Blue **callout** tips on every section
- Interactive 1–5 scoring table (saved in browser `localStorage`)
- Deep questions you can cross out during the call
- Progress counter + Reset buttons
- Scroll-reveal animations

## Local preview

Open `index.html` in any browser, **or**:

```bash
cd cybertech-brief
npx serve .
```

Then open the URL shown in the terminal (usually `http://localhost:3000`).

## Deploy to Vercel (detailed)

### Option A — Drag & drop (fastest, no Git)

1. Go to https://vercel.com and sign in (GitHub account is fine).
2. Open **Add New… → Project**.
3. Upload the **entire** `cybertech-brief` folder (must contain `index.html` at the root of what you upload).
4. Framework Preset: **Other**.
5. Build Command: leave **empty**.
6. Output Directory: leave **empty** (or `.`).
7. Click **Deploy**.
8. Copy the `*.vercel.app` URL and send it to the team.

### Option B — Vercel CLI

```bash
cd cybertech-brief
npx vercel
```

Follow prompts. For production:

```bash
npx vercel --prod
```

### Option C — From GitHub

1. Create a new GitHub repo.
2. Push the contents of `cybertech-brief` so `index.html` is at the repo root.
3. In Vercel: **Import Project** → select the repo.
4. Framework: **Other**, no build command → Deploy.

## Notes

- Scores and crossed-out questions are stored **only in that browser** (`localStorage`). Not shared across devices.
- No backend, no env vars, no Node build — pure static files.
