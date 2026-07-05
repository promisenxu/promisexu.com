import { z } from "astro/zod";

export const coAuthorSchema = z.object({
  name: z.string().trim().min(1),
  link: z.string().trim().url().refine(
    (link) => ["http:", "https:"].includes(new URL(link).protocol),
    "Co-author links must use HTTP or HTTPS"
  ).optional()
});
