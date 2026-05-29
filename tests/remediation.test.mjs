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
    "src/components/Projects.tsx",
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

test("viewport, cursor, and motion behavior follow accessibility constraints", () => {
  const globals = read("src/app/globals.css");
  const cursor = read("src/components/Cursor.tsx");
  const hero = read("src/components/Hero.tsx");
  const loader = read("src/components/Loader.tsx");
  const nav = read("src/components/Nav.tsx");

  assert(!globals.includes("min-height: 100vh"), "global section height should not use 100vh");
  assert.match(globals, /100dvh/, "global full-height sections should use dynamic viewport units");
  assert(!globals.includes("cursor: none !important"), "CSS should not globally hide the native cursor");
  assert.match(cursor, /prefers-reduced-motion/, "custom cursor should disable itself for reduced motion");
  assert.match(hero, /requestAnimationFrame/, "hero mousemove effect should be frame-throttled");
  assert.match(loader, /prefers-reduced-motion/, "loader should respect reduced motion");
  assert.match(nav, /\.kill\(\)/, "navigation ScrollTrigger should be killed during cleanup");
});
