import type { Metadata } from "next"

const SITE = "https://anuraagkolli.github.io"

/**
 * Per-route metadata. Without this every page inherits the root canonical and
 * og:url from app/layout.tsx, which tells crawlers the subpages are duplicates
 * of the home page and makes every shared link preview as the home page.
 */
export function pageMetadata(path: string, title: string, description: string): Metadata {
  const url = `${SITE}${path}`
  return {
    title: `${title} - Anuraag Kolli`,
    description,
    alternates: { canonical: url },
    openGraph: { url, title: `${title} - Anuraag Kolli`, description },
  }
}
