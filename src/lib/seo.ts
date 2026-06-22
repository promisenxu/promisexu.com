import { site } from "@/lib/site";

export type SeoInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
};

export function canonicalUrl(path: string) {
  return new URL(path, site.url).toString();
}

export function pageTitle(title: string) {
  return title === site.title ? site.title : `${title} | ${site.title}`;
}

export function buildSeo(input: SeoInput) {
  return {
    title: pageTitle(input.title),
    description: input.description,
    canonical: canonicalUrl(input.path),
    image: input.image ? canonicalUrl(input.image) : undefined,
    type: input.type ?? "website"
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.author,
    url: site.url
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  url: string;
  datePublished: Date;
  dateModified?: Date;
  lang: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: input.url,
    inLanguage: input.lang,
    datePublished: input.datePublished.toISOString(),
    dateModified: (input.dateModified ?? input.datePublished).toISOString(),
    author: {
      "@type": "Person",
      name: site.author,
      url: site.url
    }
  };
}
