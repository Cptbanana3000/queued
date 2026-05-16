import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

const BASE = "https://www.queuedapp.dev";
const WAITLIST_DOMAIN = "queuedapp.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
  ];

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SECRET_KEY!
    );

    const { data: waitlists } = await supabase
      .from("waitlists")
      .select("slug, updated_at")
      .eq("published", true);

    const waitlistRoutes: MetadataRoute.Sitemap = (waitlists ?? []).map((w) => ({
      url: `https://${w.slug}.${WAITLIST_DOMAIN}`,
      lastModified: new Date(w.updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    return [...staticRoutes, ...waitlistRoutes];
  } catch {
    return staticRoutes;
  }
}
