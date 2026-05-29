const baseUrl = process.env.SMOKE_BASE_URL ?? "http://localhost:3000";
const expectedDomain = process.env.SMOKE_EXPECTED_DOMAIN ?? baseUrl;
const routes = ["/", "/robots.txt", "/sitemap.xml", "/opengraph-image"];

for (const route of routes) {
  const response = await fetch(new URL(route, baseUrl));
  if (!response.ok) {
    throw new Error(`${route} returned ${response.status}`);
  }

  if (route === "/robots.txt" || route === "/sitemap.xml") {
    const body = await response.text();
    if (!body.includes(expectedDomain)) {
      throw new Error(`${route} does not include ${expectedDomain}`);
    }
  }
}

console.log(`Smoke checks passed for ${routes.join(", ")}`);
