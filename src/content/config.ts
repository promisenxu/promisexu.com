import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { writingCategories } from "@/lib/site";

const writing = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/writings",
    generateId: ({ entry, data }) => {
      const languageDirectory = entry.split("/")[0];
      const slug = typeof data.slug === "string" ? data.slug : entry.replace(/\.(md|mdx)$/, "");

      return `${languageDirectory}/${slug}`;
    }
  }),
  schema: z.object({
    title: z.string(),
    seoDescription: z.string().optional(),
    lang: z.enum(["en", "zh"]),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    category: z.enum(writingCategories),
    tags: z.array(z.string()).default([]),
    slug: z.string(),
    translationKey: z.string().optional(),
    canonicalUrl: z.string().url().optional(),
    publishedAtExternalUrl: z.string().url().optional(),
    featureImage: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false)
  })
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    description: z.string(),
    lang: z.enum(["en", "zh"]),
    translationKey: z.string().optional(),
    slug: z.string(),
    role: z.string(),
    status: z.string().optional(),
    image: z.string().optional(),
    link: z.string().url().optional(),
    featured: z.boolean().default(true),
    order: z.number().int().positive()
  })
});

export const collections = {
  writing,
  projects
};
