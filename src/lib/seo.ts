import { site } from "@/lib/site";

export type SeoInput = {
  title: string;
  description: string;
  path: string;
  canonical?: string;
  image?: string;
  type?: "website" | "article";
};

export function canonicalUrl(path: string) {
  return new URL(path, site.url).toString();
}

export function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, "");
}

export function pageTitle(title: string) {
  const plainTitle = stripHtml(title);
  return plainTitle === site.title ? site.title : `${plainTitle} | ${site.title}`;
}

export function buildSeo(input: SeoInput) {
  return {
    title: pageTitle(input.title),
    description: input.description,
    canonical: input.canonical ?? canonicalUrl(input.path),
    image: input.image ? canonicalUrl(input.image) : undefined,
    type: input.type ?? "website"
  };
}

export function serializeJsonLd(value: unknown) {
  const json = JSON.stringify(value) ?? "null";

  return json.replace(/[<\u2028\u2029]/g, (character) => {
    switch (character) {
      case "<":
        return "\\u003C";
      case "\u2028":
        return "\\u2028";
      case "\u2029":
        return "\\u2029";
      default:
        return character;
    }
  });
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
  coAuthors?: { name: string; link?: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: stripHtml(input.title),
    description: input.description,
    url: input.url,
    inLanguage: input.lang,
    datePublished: input.datePublished.toISOString(),
    dateModified: (input.dateModified ?? input.datePublished).toISOString(),
    author: [
      {
        "@type": "Person",
        name: site.author,
        url: site.url
      },
      ...(input.coAuthors ?? []).map(({ name, link }) => ({
        "@type": "Person",
        name,
        ...(link ? { url: link } : {})
      }))
    ]
  };
}
