export const site = {
  name: "Promise Xu",
  title: "Promise Xu",
  description: "Writing on growth, marketing, business, culture, art, film, and the web.",
  url: "https://promisexu.com",
  author: "Promise Xu",
  locale: "en_CA"
} as const;

export const writingCategories = [
  "Growth, Marketing & Business",
  "Culture, Art & Film",
  "Misc"
] as const;

export type WritingCategory = (typeof writingCategories)[number];

export const languages = {
  all: "All",
  en: "English",
  zh: "中文"
} as const;

export type ContentLanguage = "en" | "zh";
