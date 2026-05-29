# Portfolio Remediation Plan

This document records the issues found in the current portfolio project and the intended remediation plan. It is written as a handoff document for a future implementation session.

## Scope

The current project builds successfully and is deployable, but it is still closer to a polished template than a finished personal portfolio. The goal of the next implementation pass is to make it production-ready as a real personal site without changing the core visual direction unless needed for usability, accessibility, or maintainability.

Before writing code in a future session, read `AGENTS.md` and the relevant Next.js 16 documentation under `node_modules/next/dist/docs/`.

## 1. Template Content Is Still Present

### Problem

The site still contains placeholder identity and portfolio content:

- `Your Name`
- `yourname.com`
- `hello@yourname.com`
- `Project One`, `Project Two`, `Project Three`
- placeholder project descriptions
- placeholder initials such as `YN.`
- license copyright holder set to `Your Name`

This means the site can technically deploy, but it is not ready to share publicly. Search engines, social previews, the visible hero, project section, and footer would all present fake or generic information.

### Repair Approach

Collect the real portfolio data first:

- full name
- short display name or initials
- role/title
- production domain
- email address
- social profile URLs
- 2-4 project entries with title, description, tags, year, and links
- short biography
- stats or remove stats if no real numbers exist

Then replace all placeholder content across the app. Prefer creating one central data module, such as `src/data/site.ts`, so identity, SEO, projects, stats, and links are not hardcoded in multiple components.

### Acceptance Criteria

- Searching the repository for `Your Name`, `yourname`, `hello@yourname.com`, `Project One`, `Project Two`, and `Project Three` returns no production content matches.
- Hero, navigation logo, about copy, project list, contact links, metadata, OG image, sitemap, robots file, and license all use real information.
- The site can be shown to a visitor without obvious template text.

## 2. SEO, Sitemap, Robots, and OG Metadata Use Fake Domain Data

### Problem

The metadata, sitemap, robots file, and Open Graph image currently point to `https://yourname.com` and use placeholder names. In production, this would generate incorrect search results and broken social previews.

Affected areas include:

- `src/app/layout.tsx`
- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `src/app/opengraph-image.tsx`

### Repair Approach

Move the domain and SEO fields into centralized site config. Use that config in metadata, sitemap, robots, and OG image generation. Keep the values consistent across all output.

Use the final Vercel production domain or custom domain. If the final custom domain is not ready yet, use the current Vercel production URL temporarily and document that it must be updated after the custom domain is connected.

### Acceptance Criteria

- `/robots.txt` outputs a sitemap URL using the real production domain.
- `/sitemap.xml` outputs the real production domain.
- The generated Open Graph image contains the real name and role.
- `metadataBase`, Open Graph URL, title, and description all use real values.
- `npm run build` completes without metadata warnings.

## 3. Project Items Look Clickable but Do Not Navigate Anywhere

### Problem

The project rows use hover animations, a pointer cursor, and an arrow icon, which all imply that each project is clickable. However, the rows are plain `div` elements and do not open a project page, live demo, GitHub repository, or case study.

This is a UX mismatch: the interface promises an action that does not exist.

### Repair Approach

Add link fields to each project:

- `liveUrl` for a deployed project
- `repoUrl` for source code
- `caseStudyUrl` for a future case study page

Choose one behavior:

1. Make the entire row a link to the strongest destination.
2. Keep the row static and add explicit action links for Live, Code, or Case Study.
3. If a project has no URL yet, remove the pointer cursor and arrow for that row.

The recommended approach is to make real projects linkable and avoid fake affordances for projects without links.

### Acceptance Criteria

- Every project row that shows an arrow or pointer cursor has a real destination.
- Links open correctly.
- External links use `target="_blank"` and `rel="noreferrer"`.
- Keyboard users can tab to project links and activate them.
- Projects without links do not visually pretend to be clickable.

## 4. Social Links Are Empty Anchors

### Problem

The contact section contains `href="#"` for GitHub, LinkedIn, and Twitter/X. These links do not take users to real profiles and may jump the page unexpectedly.

### Repair Approach

Replace placeholder links with real profile URLs. If a profile is not ready or should not be shown, remove that link from the rendered list instead of keeping `#`.

Use a shared `socialLinks` array in the central site config so contact links can be managed in one place.

### Acceptance Criteria

- Repository search for `href="#"` returns no social/contact links.
- Every visible social link opens a real profile.
- Missing social profiles are not rendered.
- Contact email uses the real email address.

## 5. Site Data Is Hardcoded Across Many Files

### Problem

Identity, copy, URLs, project data, and stats are scattered through components and app route files. This makes future edits error-prone and increases the chance that one place gets updated while another remains stale.

### Repair Approach

Create a central data module, likely `src/data/site.ts`, with typed exports for:

- identity
- SEO metadata
- navigation
- about copy
- stats
- projects
- social links
- contact text

Refactor components and route metadata files to read from that module. Keep the structure simple and avoid introducing a CMS or external dependency at this stage.

### Acceptance Criteria

- Name, domain, email, social links, projects, and stats are defined once.
- Components render from the shared config instead of local placeholder constants.
- TypeScript catches missing required project fields.
- Updating the domain in one place updates metadata, robots, sitemap, and OG output.

## 6. Entire Home Page Is a Client Component

### Problem

`src/app/page.tsx` starts with `"use client"`, so the whole home page runs as a client component. This works, but it weakens the benefits of the Next.js App Router:

- less server-rendered structure
- more JavaScript on the client
- less clean separation between static content and animation behavior

### Repair Approach

Turn `page.tsx` back into a Server Component. Keep interactive behavior isolated in client components:

- loader and loaded-state wrapper
- smooth scrolling
- custom cursor
- GSAP animation components

If the loader needs to control page opacity, move that orchestration into a small client wrapper such as `HomeExperience`. The server page should mainly compose static sections and pass data into client leaves when needed.

### Acceptance Criteria

- `src/app/page.tsx` no longer has `"use client"`.
- Static content remains visible in the server-rendered document.
- Client components are limited to the parts that need browser APIs or animation.
- `npm run build` still succeeds.
- The page still visually behaves as before after hydration.

## 7. Mobile Viewport Height Uses `100vh`

### Problem

Global section styling uses `min-height: 100vh`. On mobile browsers, `100vh` can jump when the address bar expands or collapses, causing unstable section heights.

### Repair Approach

Replace global `100vh` usage with `100dvh` where full viewport height is intended. If some sections do not need full viewport height, give them explicit layout-specific min heights instead of applying one global rule to all sections.

### Acceptance Criteria

- No global section rule relies on `100vh` for mobile full-height layout.
- Mobile scrolling does not visibly jump due to browser chrome changes.
- Desktop section spacing remains visually close to the current design.

## 8. Custom Cursor Can Hurt Accessibility and Usability

### Problem

The CSS hides the system cursor for all fine pointers, and the custom cursor replaces it. This can be disorienting, may conflict with browser expectations, and makes focus/hover states harder to interpret for some users.

### Repair Approach

Make the custom cursor more conservative:

- only enable it when `pointer: fine`
- disable it when `prefers-reduced-motion: reduce`
- consider not hiding the system cursor globally
- if the custom cursor remains, scope cursor hiding to the main experience rather than every element

Also review hover binding cleanup. The current implementation attaches event listeners to many elements and marks them with `data-cursor-bound`; future changes should avoid leaving stale listeners if components remount.

### Acceptance Criteria

- Users with reduced motion do not get the custom cursor behavior.
- Touch devices keep normal behavior.
- Native cursor behavior is preserved or hidden only in a tightly scoped, intentional area.
- Keyboard focus remains clearly visible.

## 9. Hero Mousemove Animation Is Potentially Expensive

### Problem

The hero title listens to `mousemove`, loops through every character, calculates layout with `getBoundingClientRect`, and creates GSAP tweens repeatedly. This can be expensive on lower-end devices or high-frequency pointer movement.

### Repair Approach

Throttle the pointer handling with `requestAnimationFrame`. Cache character references and avoid unnecessary tweens when the pointer has not moved meaningfully. Respect reduced motion and consider disabling this effect below a desktop breakpoint.

The goal is to keep the tactile feel while reducing layout reads and animation churn.

### Acceptance Criteria

- Mousemove handling is frame-throttled.
- The effect is disabled for reduced-motion users.
- The effect is disabled or simplified on small screens.
- No obvious frame drops during pointer movement on desktop.

## 10. ScrollTrigger Cleanup Is Incomplete in Navigation

### Problem

The nav creates a `ScrollTrigger` instance but does not store or kill it in cleanup. In production this may not surface often, but during development, remounts or hot reloads can leave stale triggers.

### Repair Approach

Store the created trigger in a variable and kill it in the effect cleanup. Keep this pattern consistent for any component that creates standalone GSAP or ScrollTrigger instances.

### Acceptance Criteria

- Navigation effect cleanup kills its ScrollTrigger instance.
- No duplicate nav scroll behavior appears after development hot reloads.
- GSAP effects either use `gsap.context(...).revert()` or explicit cleanup.

## 11. Loader Does Not Fully Respect Reduced Motion

### Problem

The loader always runs its counter and slide animation. Users who prefer reduced motion should not be forced through a long animated entry.

### Repair Approach

Check `prefers-reduced-motion` inside the loader. If enabled, skip or drastically shorten the animation and call `onComplete` quickly.

### Acceptance Criteria

- With reduced motion enabled, the loader completes quickly without large slide/count animations.
- Normal users still see the intended loader experience.
- The page does not remain hidden if loader animation is skipped.

## 12. Decorative Symbols and Visual Details Need Review

### Problem

The contact marquee uses dot symbols and the about stats use an infinity symbol. These are not necessarily bugs, but they are generic and may not match real content. The stats also present unverified numbers.

### Repair Approach

Replace decorative or fake stats with truthful content. If the user does not have real numbers, use qualitative labels or remove stats. Keep decorative separators accessible by marking them `aria-hidden` if they remain.

### Acceptance Criteria

- Stats are truthful or removed.
- Decorative symbols do not get announced as meaningful content by screen readers.
- The content feels specific to the portfolio owner.

## 13. Dependency Audit Has a Moderate Warning

### Problem

`npm audit --audit-level=moderate` reports a moderate advisory through Next.js internal `postcss`. The suggested `npm audit fix --force` path is not safe because it proposes a breaking downgrade path.

### Repair Approach

Do not run `npm audit fix --force`. Track the advisory and upgrade Next.js when a compatible patched version is available. Since this project uses Next.js 16 and `AGENTS.md` warns about breaking changes, any Next upgrade must be checked against the local Next docs and verified with build tests.

### Acceptance Criteria

- The advisory is documented.
- No forced downgrade or unsafe package rewrite is applied.
- When upgrading Next, `npm run lint` and `npm run build` pass.

## 14. Verification Coverage Is Too Thin

### Problem

The current project relies on lint and build checks. Those are necessary but do not catch broken links, wrong metadata output, responsive layout problems, or animation/accessibility regressions.

### Repair Approach

Add a lightweight verification path:

- keep `npm ci`
- keep `npm run lint`
- keep `npm run build`
- add route smoke checks for `/`, `/robots.txt`, `/sitemap.xml`, and `/opengraph-image`
- consider Playwright screenshot checks for desktop and mobile after UI changes

Do not overbuild a large test suite yet. Start with checks that prove the deployed site behaves as expected.

### Acceptance Criteria

- Fresh install works with `npm ci`.
- Lint passes.
- Production build passes.
- Smoke checks confirm core routes return 200.
- Robots and sitemap contain the real production domain.
- At least one desktop and one mobile visual check are performed before final push.

## Recommended Implementation Order

1. Gather real portfolio content and final domain.
2. Create centralized site data.
3. Replace all placeholder content.
4. Fix project links and social links.
5. Wire metadata, sitemap, robots, and OG image to real data.
6. Refactor the page/client-component boundary.
7. Fix viewport height and reduced-motion behavior.
8. Optimize cursor and hero mousemove effects.
9. Add cleanup for standalone ScrollTrigger usage.
10. Add or document smoke checks.
11. Run full verification.
12. Commit and push.

## Handoff Prompt for a New Session

Use this prompt in a new session:

```text
We are continuing work on D:\Study\project\portfolio.

Please read AGENTS.md first. This is a Next.js 16 project, so before changing code read the relevant local docs under node_modules/next/dist/docs/.

Then read docs/portfolio-remediation-plan.md and implement the remediation plan. Start by re-checking the current repository state. Do not rewrite the visual direction unnecessarily. Focus on making the existing portfolio production-ready: real content, real links, centralized site data, correct SEO/sitemap/robots/OG metadata, better App Router client boundaries, mobile viewport fixes, reduced-motion support, animation cleanup, and route/build verification.

Before coding, ask me for any missing real portfolio data you need: name, domain, email, social URLs, project details, bio, and stats.
```

## Real Data Needed Before Implementation

The next session should not invent these values. Ask for them if they are not provided:

- Full name:
- Display initials or short logo text:
- Role/title:
- Production domain:
- Email:
- GitHub URL:
- LinkedIn URL:
- Twitter/X URL, if any:
- Other social links:
- Biography:
- Stats to show, or confirmation to remove stats:
- Project 1 title, description, tags, year, live URL, repo URL, case study URL:
- Project 2 title, description, tags, year, live URL, repo URL, case study URL:
- Project 3 title, description, tags, year, live URL, repo URL, case study URL:
