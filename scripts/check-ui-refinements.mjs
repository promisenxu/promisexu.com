import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

const css = await read("src/styles/global.css");
const filter = await read("src/components/ContentViewFilterIsland.tsx");
const searchForm = await read("src/components/SearchForm.astro");
const writingCard = await read("src/components/WritingCard.astro");
const archive = await read("src/pages/writing/index.astro");
const categoryArchive = await read("src/pages/writing/category/[category].astro");
const search = await read("src/pages/search.astro");
const homepage = await read("src/pages/index.astro");
const about = await read("src/pages/about.astro");

assert.match(css, /font-family: -apple-system, "system-ui", "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif/);
assert.doesNotMatch(css, /Piazzolla/);
assert.match(searchForm, /class="visually-hidden"/);
assert.doesNotMatch(writingCard, /writing-row__label/);
assert.match(writingCard, /writing-row__meta[\s\S]*Featured/);
assert.match(categoryArchive, /<h1>Writing<\/h1>/);
assert.match(categoryArchive, /Essays, criticism, notes, and published work across English and Chinese\./);
assert.match(archive, /<h1>Writing<\/h1>/);
assert.doesNotMatch(filter, /if \(!interceptLinks\) \{\s*saveView\(next\)/);
assert.match(filter, /matchingContentCount/);
assert.match(search, /zero_results: "No result found\."/);
assert.match(homepage, /englishTranslationKeys/);
assert.match(writingCard, /Also in 中文|alternateLabel/);
assert.match(css, /\.view-filter a[\s\S]*border-radius: 0/);
assert.match(css, /\.search-form \{[\s\S]*border-bottom: 1px solid/);
assert.match(css, /\.home-masthead \{\s*padding-top: 0/);
assert.match(css, /\.page-header \{\s*padding-top: 0/);
assert.match(css, /\[hidden\] \{\s*display: none !important/);
assert.match(searchForm, /type="submit"/);
assert.match(writingCard, /<time[\s\S]*alternateUrl/);
assert.match(archive, /englishTranslationKeys/);
assert.match(archive, /alternateLabel=\{chineseCounterpart \? "Also in 中文 →" : undefined\}/);
assert.match(about, /<section class="page-header">[\s\S]*<h1>About<\/h1>/);

console.log("UI refinement contracts pass.");
