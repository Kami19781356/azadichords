// Public origin for canonical URLs, sitemap and social previews.
// Set SITE_URL per environment (staging vs production).
export const SITE_URL = (process.env.SITE_URL || "https://azadichords.com").replace(/\/$/, "");

// Only production should be indexed. Anything else serves a robots.txt
// that blocks crawlers and marks pages noindex.
export const SITE_INDEXABLE = process.env.SITE_INDEXABLE === "true";

export const PAGES = [
  "",
  "/manifesto",
  "/music",
  "/festival",
  "/artists",
  "/submissions",
  "/support",
  "/services",
  "/contact",
] as const;
