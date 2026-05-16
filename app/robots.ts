import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/w/", "/*.queuedapp.dev/"],
        disallow: ["/api/", "/dashboard", "/settings", "/waitlists/"],
      },
    ],
    sitemap: "https://www.queuedapp.dev/sitemap.xml",
  };
}
