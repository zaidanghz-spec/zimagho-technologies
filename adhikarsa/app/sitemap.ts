import type { MetadataRoute } from "next";
import { company } from "@/data/company";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${company.site.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${company.site.url}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${company.site.url}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
