import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const homepage = await readFile(new URL("../src/pages/index.astro", import.meta.url), "utf8");
const filter = await readFile(new URL("../src/components/ContentViewFilterIsland.tsx", import.meta.url), "utf8");
const baseLayout = await readFile(new URL("../src/layouts/BaseLayout.astro", import.meta.url), "utf8");
const siteNav = await readFile(new URL("../src/components/SiteNav.astro", import.meta.url), "utf8");
const readOptional = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8").catch(() => "");
const scopedHomepage = await readOptional("src/pages/[lang]/index.astro");
const scopedProjects = await readOptional("src/pages/[lang]/projects/index.astro");
const scopedAbout = await readOptional("src/pages/[lang]/about.astro");

assert.match(homepage, /englishTranslationKeys/);
assert.match(homepage, /all: writings[\s\S]*!englishTranslationKeys\.has\(entry\.data\.translationKey\)[\s\S]*\.slice\(0, 6\)/);
assert.match(homepage, /en: writings\.filter\(\(entry\) => entry\.data\.lang === "en"\)\.slice\(0, 6\)/);
assert.match(homepage, /zh: writings\.filter\(\(entry\) => entry\.data\.lang === "zh"\)\.slice\(0, 6\)/);
assert.match(homepage, /Object\.entries\(homepageWritings\)[\s\S]*data-home-view=\{view\} hidden=\{view !== "all"\}/);
assert.doesNotMatch(homepage, /all: writings\.slice\(0, 6\)/);

assert.match(filter, /document\.querySelectorAll<HTMLElement>\("\[data-home-view\]"\)[\s\S]*element\.hidden = element\.dataset\.homeView !== view/);
assert.match(filter, /if \(!interceptLinks\) \{\s*return;\s*\}/);
assert.doesNotMatch(filter, /if \(!interceptLinks\) \{\s*saveView\(next\)/);
assert.match(filter, /event\.preventDefault\(\);\s*saveView\(next\);\s*applyView\(next\);/);
assert.match(baseLayout, /pathname\.startsWith\("\/en\/"\)[\s\S]*pathname\.startsWith\("\/zh\/"\)/);
assert.match(baseLayout, /contentPath[\s\S]*\/projects\/[\s\S]*\/about\//);
assert.match(siteNav, /const scopePrefix = initialView === "all" \? "" : `\/\$\{initialView\}`/);
assert.match(siteNav, /href: `\$\{scopePrefix\}\/projects\/`/);
assert.match(scopedHomepage, /getStaticPaths[\s\S]*\["en", "zh"\]/);
assert.match(scopedHomepage, /entry\.data\.lang === lang/);
assert.match(scopedProjects, /getStaticPaths[\s\S]*\["en", "zh"\]/);
assert.match(scopedProjects, /No projects are available in Chinese yet\./);
assert.match(scopedAbout, /getStaticPaths[\s\S]*\["en", "zh"\]/);

console.log("Language view behavior contracts pass.");
