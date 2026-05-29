# Portfolio

A minimal, motion-rich personal portfolio built with Next.js 16, GSAP, and Tailwind CSS 4.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4**
- **GSAP 3** + ScrollTrigger
- **Lenis** smooth scroll

## Features

- Lenis smooth scroll synced with GSAP ScrollTrigger
- Character-level mouse-proximity physics on the hero title
- Time-aware ambient gradient (morning/afternoon/evening/night)
- Custom mix-blend cursor with magnetic nav links
- Scroll progress bar
- Auto-hiding nav on scroll-down
- Scroll-driven word reveal in About
- Hover preview cards in Projects
- Infinite marquee in Contact
- Loader with counter animation
- 404 page, sitemap, robots.txt, dynamic OG image
- Reduced-motion fallbacks
- Keyboard-accessible focus states
- Centralized site data in `src/data/site.ts`
- Route smoke checks for production verification

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run start
npm run smoke
```

## Project structure

```
src/
├── app/
│   ├── globals.css           Global styles
│   ├── layout.tsx            Root layout + metadata
│   ├── page.tsx              Page composition
│   ├── not-found.tsx         404 page
│   ├── icon.svg              Favicon
│   ├── opengraph-image.tsx   Dynamic OG image
│   ├── sitemap.ts            sitemap.xml
│   └── robots.ts             robots.txt
├── components/
    ├── SmoothScroll.tsx      Lenis + GSAP ticker
    ├── Loader.tsx            Entry counter animation
    ├── Nav.tsx               Magnetic links + scroll hide
    ├── Cursor.tsx            Custom cursor
    ├── ScrollProgress.tsx    Top progress bar
    ├── TimeAmbient.tsx       Time-of-day gradient
    ├── Hero.tsx              Title with char physics
    ├── About.tsx             Scroll-driven word reveal + stats
    ├── Projects.tsx          Project list with hover preview
│   └── Contact.tsx           Heading + links + marquee
├── data/
│   └── site.ts               Identity, SEO, projects, contact data
└── scripts/
    └── smoke-routes.mjs      Production route smoke checks
```

## Customization

Update `src/data/site.ts` with the final name, logo text, role, production domain,
email, social links, biography, truthful stats, and project links. Metadata,
robots, sitemap, OG image, and visible sections all read from that file.

Until real social or project URLs are configured, the UI does not render fake
profile links or clickable project affordances.

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com/new). The Hobby plan is free for personal projects.

## License

MIT
