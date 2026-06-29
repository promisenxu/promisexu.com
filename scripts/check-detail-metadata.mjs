import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const dist = path.resolve("dist");
const rss = await readFile(path.join(dist, "rss.xml"), "utf8");

assert.doesNotMatch(rss, /<author>/, "RSS item author must not contain a display name");
assert.match(rss, /xmlns:dc="http:\/\/purl\.org\/dc\/elements\/1\.1\/"/, "RSS must declare Dublin Core");
assert.match(rss, /<dc:creator>Promise Xu<\/dc:creator>/, "RSS items must identify Promise Xu");

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(file) : file.endsWith(".html") ? [file] : [];
  }))).flat();
}

const pages = await Promise.all((await htmlFiles(dist)).map(async (file) => {
  const html = await readFile(file, "utf8");
  const canonical = html.match(/<link rel="canonical" href="([^"]+)">/)?.[1];
  return { file, html, canonical };
}));
const pagesByCanonical = new Map(pages.filter(({ canonical }) => canonical).map((page) => [page.canonical, page]));

for (const { file, html, canonical } of pages) {
  const alternates = [...html.matchAll(/<link rel="alternate" hreflang="(?:en|zh)" href="([^"]+)">/g)];

  for (const [, href] of alternates) {
    const target = pagesByCanonical.get(href);
    assert.ok(target, `${file}: alternate ${href} must match a built page canonical URL`);
    assert.ok(canonical, `${file}: page with alternates must have a canonical URL`);
    assert.match(target.html, new RegExp(`hreflang="(?:en|zh)" href="${canonical.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
  }
}

console.log("Detail metadata regression checks passed.");
