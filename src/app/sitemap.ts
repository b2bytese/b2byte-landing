import { type MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

const LAST_MODIFIED = new Date("2026-11-25T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/politica-de-privacidade`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
