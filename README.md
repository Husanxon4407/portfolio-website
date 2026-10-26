# Husankhon Bahodirkhonov — Portfolio

Personal portfolio website of **Husankhon Bahodirkhonov**, Full-Stack Developer and Business Information Systems student at Westminster International University in Tashkent.

**Live:** https://husankhon.vercel.app/

## Features

- Responsive layout from 320px phones to wide desktops
- Light / dark theme (follows your OS setting, remembered between visits)
- English, Uzbek and Russian (remembered between visits)
- Animated hero and education timeline, with reduced-motion support
- Downloadable CV
- Admin panel at `#/admin` for adding certificates, projects and gallery photos (Supabase), see [`supabase/README.md`](supabase/README.md)

## Tech stack

React 19 · Vite · Tailwind CSS 4 · Supabase · Oxlint · GitHub Actions → GitHub Pages

## Run locally

```bash
npm install
npm run dev      # start dev server
npm run lint     # lint with oxlint
npm run build    # production build into dist/
npm run preview  # preview the production build
```

Pushing to `main` deploys automatically via `.github/workflows/deploy.yml`.

## Project structure

```
src/
  components/   UI sections (Hero, Education, Navbar, Footer, ...)
  data/         translations.js (UI text) and profile.js (contacts, links)
  assets/       images bundled by Vite
public/         CV, favicon and hero photo served as-is
```
