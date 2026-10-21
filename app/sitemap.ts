import type { MetadataRoute } from "next";
import { serviceDetails } from "@/lib/services";

const siteUrl = "https://karyakode.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const publicPages: MetadataRoute.Sitemap = [
    { url: siteUrl },
    { url: `${siteUrl}/tentang-kami` },
  ];

  const servicePages: MetadataRoute.Sitemap = serviceDetails.map((service) => ({
    url: `${siteUrl}/layanan/${service.slug}`,
  }));

  return [...publicPages, ...servicePages];
}
