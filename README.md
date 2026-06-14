# Tri Aditya Agustiawan — Portfolio

A minimalist, modern personal portfolio built with **React + Vite**, animated with
**GSAP** (ScrollTrigger) and **Lenis** smooth scrolling. Dark theme, bilingual
(English / Bahasa Indonesia), text-first typography (Space Grotesk + Inter).

Built for performance and accessibility: optimized WebP imagery, a vendor-split
bundle, non-render-blocking fonts, a short intro, full keyboard support with
visible focus, semantic `h2` section headings, `prefers-reduced-motion` support,
and SEO metadata (Open Graph, Twitter card, JSON-LD, sitemap, manifest).

**Live:** [triadityaa.github.io](https://triadityaa.github.io/) — deployed to GitHub
Pages via the workflow in `.github/workflows/deploy.yml` (builds on every push to
`main`). The production domain `https://triadityaa.github.io` is set in
`index.html`, `public/robots.txt`, and `public/sitemap.xml`.

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

## Editing content

All text lives in one place: [`src/data/content.js`](src/data/content.js).
Every label has an `en` and `id` version. Edit there — no need to touch the
components.

### Projects

Projects live in two arrays in `src/data/content.js`:

- **`featuredProjects`** — large cards with a live link + screenshot.
- **`moreProjects`** — compact rows (name, one-line summary, tools, year).

Featured screenshots are stored in `public/projects/*.png`. To refresh them,
run `bash scripts/fetch-shots.sh` (captures each live URL via thum.io). To use
your own image, drop a file into `public/projects/` and point `image` at it,
e.g. `image: '/projects/my-shot.png'`. If `image` is empty, a clean placeholder
with the project name is shown instead.

To make a `moreProjects` row clickable, add a `link: 'https://…'` field to it.

## Project structure

```
src/
  data/content.js        all website copy (EN/ID) — edit here
  context/               language provider + EN/ID toggle
  lib/                   gsap registration + text-splitting helpers
  hooks/                 Lenis smooth-scroll hook
  components/            Preloader, Cursor, Navbar, Hero, Marquee,
                         About, Work, Experience, Education, Skills, Contact
  styles/global.css      design tokens (colours, type, spacing)
```

## Customising the look

- **Colours / fonts / spacing:** CSS variables at the top of
  [`src/styles/global.css`](src/styles/global.css).
- **Fonts** are loaded in [`index.html`](index.html) (Space Grotesk + Inter).

## Deploying

The site is fully static. After `npm run build`, deploy the `dist/` folder to
Vercel, Netlify, GitHub Pages, or any static host.

---

Designed & built with React + GSAP.
