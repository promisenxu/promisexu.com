import { getCollection, type CollectionEntry } from "astro:content";
import type { ContentLanguage, WritingCategory } from "@/lib/site";

export type WritingEntry = CollectionEntry<"writing">;
export type ProjectEntry = CollectionEntry<"projects">;

export async function getPublishedWritings() {
  const writings = await getCollection("writing", ({ data }) => !data.draft);
  return writings.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getWritingsByLanguage(lang: ContentLanguage) {
  const writings = await getPublishedWritings();
  return writings.filter((entry) => entry.data.lang === lang);
}

export async function getWritingsByCategory(category: WritingCategory) {
  const writings = await getPublishedWritings();
  return writings.filter((entry) => entry.data.category === category);
}

export async function getFeaturedWritings() {
  const writings = await getPublishedWritings();
  return writings.filter((entry) => entry.data.featured);
}

export async function getProjects() {
  const projects = await getCollection("projects");
  return projects.sort((a, b) => a.data.order - b.data.order);
}

export function getWritingUrl(entry: WritingEntry) {
  const prefix = entry.data.lang === "zh" ? "/zh" : "/en";
  return `${prefix}/writing/${entry.data.slug}/`;
}
