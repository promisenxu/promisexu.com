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

export async function getHomepageWritings() {
  const writings = await getPublishedWritings();
  return writings.sort((a, b) => {
    if (a.data.featured !== b.data.featured) {
      return a.data.featured ? -1 : 1;
    }

    return b.data.date.valueOf() - a.data.date.valueOf();
  });
}

export async function getProjects() {
  const projects = await getCollection("projects");
  return projects.sort((a, b) => a.data.order - b.data.order);
}

export function getProjectUrl(entry: ProjectEntry) {
  return `/projects/${entry.data.slug}/`;
}

export async function getProjectBySlug(slug: string) {
  const projects = await getProjects();
  return projects.find((entry) => entry.data.slug === slug);
}

export function getWritingUrl(entry: WritingEntry) {
  const prefix = entry.data.lang === "zh" ? "/zh" : "/en";
  return `${prefix}/writing/${entry.data.slug}/`;
}

export async function getWritingCounterpart(entry: WritingEntry) {
  if (!entry.data.translationKey) return undefined;
  const writings = await getPublishedWritings();
  return writings.find(
    (candidate) =>
      candidate.data.translationKey === entry.data.translationKey &&
      candidate.data.lang !== entry.data.lang
  );
}

export async function getProjectCounterpart(entry: ProjectEntry) {
  if (!entry.data.translationKey) return undefined;
  const projects = await getProjects();
  return projects.find(
    (candidate) =>
      candidate.data.translationKey === entry.data.translationKey &&
      candidate.data.lang !== entry.data.lang
  );
}
