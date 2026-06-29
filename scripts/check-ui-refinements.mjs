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

console.log("UI refinement contracts pass.");
