import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { writingCategories } from "@/lib/site";

const writing = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/writings"
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lang: z.enum(["en", "zh"]),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    category: z.enum(writingCategories),
    tags: z.array(z.string()).default([]),
    slug: z.string(),
    translationKey: z.string().optional(),
    canonicalUrl: z.string().url().optional(),
    publishedAtExternalUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false)
  })
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    description: z.string(),
    role: z.string(),
    status: z.string().optional(),
    image: z.string(),
    link: z.string().url().optional(),
    featured: z.boolean().default(true),
    order: z.number().int().positive()
  })
});

export const collections = {
  writing,
  projects
};
