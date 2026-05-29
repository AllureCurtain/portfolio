import { readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("home page remains a server component with a client experience boundary", () => {
  const page = read("src/app/page.tsx");
  assert(!page.startsWith('"use client"'), "src/app/page.tsx must not be a client component");
  assert.match(page, /HomeExperience/, "page should delegate browser orchestration to HomeExperience");
});

test("site data is centralized and metadata routes read from it", () => {
  assert.doesNotThrow(() => read("src/data/site.ts"));

  for (const path of [
    "src/app/layout.tsx",
    "src/app/robots.ts",
    "src/app/sitemap.ts",
    "src/app/opengraph-image.tsx",
  ]) {
    assert.match(read(path), /siteConfig/, `${path} should use centralized siteConfig`);
  }
});

test("source no longer renders fake navigation destinations", () => {
  const files = [
    "src/components/Contact.tsx",
    "src/components/ProjectBriefs.tsx",
    "src/data/site.ts",
  ];

  for (const path of files) {
    const source = read(path);
    assert(!source.includes('href="#"'), `${path} should not contain href="#"`);
    assert(!source.includes("https://yourname.com"), `${path} should not contain the fake domain`);
    assert(!source.includes("hello@yourname.com"), `${path} should not contain the fake email`);
  }
});

test("site data is personalized for Yao with real portfolio content", () => {
  const siteData = read("src/data/site.ts");

  for (const expected of [
    "Yao",
    "https://785777.xyz",
    "alluresocina@163.com",
    "https://github.com/AllureCurtain",
    "Mega",
    "QuanXiangJia",
    "IntelliQA",
  ]) {
    assert.match(siteData, new RegExp(expected), `site data should include ${expected}`);
  }

  for (const placeholder of [
    "Portfolio Owner",
    "Designer & Developer",
    "Portfolio Case Study",
    "Product Interface",
    "Interactive Experiment",
    "http://localhost:3000",
  ]) {
    assert(!siteData.includes(placeholder), `site data should not include ${placeholder}`);
  }
});

test("home page is refocused around a clear Rive-ready portfolio experience", () => {
  const page = read("src/app/page.tsx");
  const experience = read("src/components/HomeExperience.tsx");
  const systemVisual = read("src/components/SystemVisual.tsx");
  const globals = read("src/app/globals.css");
  const pkg = read("package.json");

  assert.match(page, /SystemVisual/, "home page should render the Rive-ready system visual");
  assert.match(page, /ProjectBriefs/, "home page should render clearer project briefs");
  assert.match(systemVisual, /@rive-app\/react-/, "SystemVisual should be wired to a Rive React runtime");
  assert.match(systemVisual, /\/rive\/portfolio-system\.riv/, "SystemVisual should look for the portfolio Rive file");
  assert.match(systemVisual, /fallback-system-visual/, "SystemVisual should provide a nonblank fallback");
  assert.match(pkg, /@rive-app\/react-/, "package.json should include a Rive React runtime dependency");
  assert(!experience.includes("<Loader"), "home experience should not hide content behind the loader");
  assert(!experience.includes("<Cursor"), "home experience should not use a custom cursor");
  assert(!globals.includes("cursor: none"), "global CSS should not hide the native cursor");
});

test("viewport, cursor, and motion behavior follow accessibility constraints", () => {
  const globals = read("src/app/globals.css");
  const systemVisual = read("src/components/SystemVisual.tsx");
  const nav = read("src/components/Nav.tsx");

  assert(!globals.includes("min-height: 100vh"), "global section height should not use 100vh");
  assert(!globals.includes("h-screen"), "global layout should not use fixed viewport-height utilities");
  assert(!globals.includes("cursor: none !important"), "CSS should not globally hide the native cursor");
  assert.match(systemVisual, /prefers-reduced-motion/, "system visual should provide reduced-motion handling");
  assert.match(nav, /\.kill\(\)/, "navigation ScrollTrigger should be killed during cleanup");
});
