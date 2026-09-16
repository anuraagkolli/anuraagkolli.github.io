import Link from "next/link"
import EntryList from "@/components/entry-list"
import SectionHeading from "@/components/section-heading"
import SiteHeader from "@/components/site-header"
import Skills from "@/components/skills"
import { aboutBio, education } from "@/lib/content"

export const metadata = { title: "About - Anuraag Kolli" }

export default function Page() {
  return (
    <>
      <SiteHeader />
      <div className="pb-48">
        <main className="m-auto w-full max-w-[640px] px-5">
          <Link href="/" className="ui prose-link text-gray-500">
            back
          </Link>

          {aboutBio.map((paragraph, i) => (
            <p key={i} className="pt-6" style={{ lineHeight: 1.6 }}>
              {paragraph}
            </p>
          ))}

          <SectionHeading id="education">Education</SectionHeading>
          <EntryList entries={education} cols="sm:grid-cols-[150px_1fr_auto]" />

          <SectionHeading id="skills">Skills</SectionHeading>
          <Skills />
        </main>
      </div>
    </>
  )
}
