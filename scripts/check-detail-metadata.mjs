import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { coAuthorSchema } from "../src/lib/coAuthors.mjs";

const dist = path.resolve("dist");
const rss = await readFile(path.join(dist, "rss.xml"), "utf8");

assert.doesNotMatch(rss, /<author>/, "RSS item author must not contain a display name");
assert.match(rss, /xmlns:dc="http:\/\/purl\.org\/dc\/elements\/1\.1\/"/, "RSS must declare Dublin Core");
assert.match(rss, /<dc:creator>Promise Xu<\/dc:creator>/, "RSS items must identify Promise Xu");
assert.equal(coAuthorSchema.safeParse({ name: "Unsafe", link: "javascript:alert(1)" }).success, false);
assert.equal(coAuthorSchema.safeParse({ name: "Unsafe", link: "data:text/html,unsafe" }).success, false);
assert.deepEqual(
  coAuthorSchema.parse({ name: " Linked ", link: " https://example.com/co-author " }),
  { name: "Linked", link: "https://example.com/co-author" }
);

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(file) : file.endsWith(".html") ? [file] : [];
  }))).flat();
}

async function builtPages(directory) {
  return Promise.all((await htmlFiles(directory)).map(async (file) => {
    const html = await readFile(file, "utf8");
    const canonical = html.match(/<link rel="canonical" href="([^"]+)">/)?.[1];
    return { file, html, canonical };
  }));
}

const pages = await builtPages(dist);
const pagesByCanonical = new Map(pages.filter(({ canonical }) => canonical).map((page) => [page.canonical, page]));
const enFixtureCanonical = "https://promisexu.com/en/writing/coauthors-metadata-fixture/";
const zhFixtureCanonical = "https://promisexu.com/zh/writing/coauthors-metadata-fixture/";
const unrelatedDraftCanonical = "https://promisexu.com/en/writing/unrelated-metadata-draft/";
const articleWithoutCoAuthors = pagesByCanonical.get("https://promisexu.com/zh/writing/cinema-and-distance/");

assert.ok(!pagesByCanonical.has(enFixtureCanonical), "English draft metadata fixture must not be published");
assert.ok(!pagesByCanonical.has(zhFixtureCanonical), "Chinese draft metadata fixture must not be published");
assert.ok(articleWithoutCoAuthors, "Known Chinese article without co-authors must be built");
assert.doesNotMatch(articleWithoutCoAuthors.html, /class="co-authors"/, "Article without co-authors must omit the co-author line");

const fixtureDist = await mkdtemp(path.resolve(".astro/metadata-fixtures-"));
try {
  await promisify(execFile)(path.resolve("node_modules/.bin/astro"), ["build", "--outDir", fixtureDist], {
    env: { ...process.env, ASTRO_TELEMETRY_DISABLED: "1", METADATA_TEST_FIXTURES: "1" }
  });
  const fixturePages = await builtPages(fixtureDist);
  const fixturePagesByCanonical = new Map(fixturePages.filter(({ canonical }) => canonical).map((page) => [page.canonical, page]));
  const enFixture = fixturePagesByCanonical.get(enFixtureCanonical);
  const zhFixture = fixturePagesByCanonical.get(zhFixtureCanonical);

  assert.ok(enFixture, "English co-author fixture must be built in fixture mode");
  assert.ok(zhFixture, "Chinese co-author fixture must be built in fixture mode");
  assert.ok(!fixturePagesByCanonical.has(unrelatedDraftCanonical), "Fixture mode must not publish unrelated drafts");
  assert.match(
    enFixture.html,
    /<h1>Co-Authors Metadata Fixture<\/h1>[\s\S]*?<p class="co-authors">\s*Co-Authored by:\s*<a href="https:\/\/example\.com\/co-author">Linked Co-Author<\/a>, Unlinked Co-Author\s*<\/p>[\s\S]*?<p class="meta">/
  );
  assert.match(
    zhFixture.html,
    /<h1>合著者元数据测试<\/h1>[\s\S]*?<p class="co-authors">\s*合著者：\s*<a href="https:\/\/example\.com\/zh-co-author">链接合著者<\/a>、无链接合著者\s*<\/p>[\s\S]*?<p class="meta">/
  );
  const enArticle = JSON.parse(enFixture.html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)?.[1] ?? "null");
  assert.deepEqual(enArticle.author, [
    { "@type": "Person", name: "Promise Xu", url: "https://promisexu.com" },
    { "@type": "Person", name: "Linked Co-Author", url: "https://example.com/co-author" },
    { "@type": "Person", name: "Unlinked Co-Author" }
  ]);
} finally {
  await rm(fixtureDist, { recursive: true, force: true });
}

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
