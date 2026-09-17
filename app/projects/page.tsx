import Link from "next/link"
import SectionHeading from "@/components/section-heading"
import SiteHeader from "@/components/site-header"
import { projects } from "@/lib/content"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata("/projects/", "Projects", "Invariance, BriefCase, and GARCH BTC - machine learning and infrastructure projects by Anuraag Kolli.")

export default function Page() {
  return (
    <>
      <SiteHeader current="/projects/" />
      <div className="pb-48">
        <main className="m-auto w-full max-w-[640px] px-5">
          <Link href="/" className="ui prose-link text-gray-500">
            back
          </Link>

          {projects.map((entry) => {
            const detail = entry.detail!
            return (
              <section key={entry.name}>
                <SectionHeading id={entry.name.toLowerCase().replace(/\s+/g, "-")}>
                  {detail.title}
                </SectionHeading>
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
              </section>
            )
          })}
        </main>
      </div>
    </>
  )
}
