import rss from "@astrojs/rss";
import { getPublishedWritings, getWritingUrl } from "@/lib/content";
import { site } from "@/lib/site";

export async function GET() {
  const writings = await getPublishedWritings();

  return rss({
    title: site.title,
    description: site.description,
    site: site.url,
    xmlns: { dc: "http://purl.org/dc/elements/1.1/" },
    items: writings.map((entry) => ({
      title: entry.data.title,
      description: entry.data.seoDescription ?? site.description,
      pubDate: entry.data.date,
      link: getWritingUrl(entry),
      customData: `<dc:creator>${site.author}</dc:creator>`
    }))
  });
}
