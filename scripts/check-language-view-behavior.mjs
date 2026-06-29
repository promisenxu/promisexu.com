import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const homepage = await readFile(new URL("../src/pages/index.astro", import.meta.url), "utf8");
const filter = await readFile(new URL("../src/components/ContentViewFilterIsland.tsx", import.meta.url), "utf8");

assert.match(homepage, /const homepageWritings = \{\s*all: writings\.slice\(0, 6\),\s*en: writings\.filter\(\(entry\) => entry\.data\.lang === "en"\)\.slice\(0, 6\),\s*zh: writings\.filter\(\(entry\) => entry\.data\.lang === "zh"\)\.slice\(0, 6\)\s*\}/);
assert.match(homepage, /Object\.entries\(homepageWritings\)[\s\S]*data-home-view=\{view\} hidden=\{view !== "all"\}/);
assert.doesNotMatch(homepage, /const homepageWritings = writings\.slice\(0, 6\)/);

assert.match(filter, /document\.querySelectorAll<HTMLElement>\("\[data-home-view\]"\)[\s\S]*element\.hidden = element\.dataset\.homeView !== view/);
assert.match(filter, /if \(!interceptLinks\) \{\s*return;\s*\}/);
assert.doesNotMatch(filter, /if \(!interceptLinks\) \{\s*saveView\(next\)/);
assert.match(filter, /event\.preventDefault\(\);\s*saveView\(next\);\s*applyView\(next\);/);

console.log("Language view behavior contracts pass.");
