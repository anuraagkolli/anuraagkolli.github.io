import Link from "next/link"
import SiteHeader from "@/components/site-header"
import type { Detail } from "@/lib/content"

/**
 * The shared shell for every detail route: site header, a back link, the
 * entry's title and meta line, then its body paragraphs. Routes pass data
 * only, so all detail pages stay identical by construction.
 */
export default function DetailPage({ detail }: { detail: Detail }) {
  return (
    <>
      <SiteHeader />
      <div className="pb-48">
        <main className="m-auto w-full max-w-[640px] px-5">
          <Link href="/" className="ui prose-link text-gray-500">
            back
          </Link>

          <h2
            className="font-ui pt-8"
            style={{ fontWeight: 600, fontSize: 18, letterSpacing: "-0.01em" }}
          >
            {detail.title}
          </h2>
          <div className="ui pt-2 text-gray-500">{detail.meta}</div>

          {detail.body.map((paragraph, i) => (
            <p key={i} className="pt-5" style={{ lineHeight: 1.6 }}>
              {paragraph}
            </p>
          ))}

          {detail.links && (
            <div className="ui flex gap-x-4 pt-5 text-gray-500">
              {detail.links.map((link) => (
                <a
                  key={link.label}
                  className="prose-link"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  )
}
