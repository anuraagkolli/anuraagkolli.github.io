import Bio from "@/components/bio"
import EntryList from "@/components/entry-list"
import SectionHeading from "@/components/section-heading"
import SiteHeader from "@/components/site-header"
import Skills from "@/components/skills"
import { education, projects, work } from "@/lib/content"

export default function Home() {
  return (
    <>
      <SiteHeader />
      <div className="pb-48">
        <main className="m-auto w-full max-w-[640px] px-5">
          <Bio />

          <SectionHeading id="work">Selected work</SectionHeading>
          <EntryList entries={work} />

          <SectionHeading id="projects">Projects</SectionHeading>
          <EntryList entries={projects} />

          <SectionHeading id="education">Education</SectionHeading>
          <EntryList entries={education} cols="sm:grid-cols-[150px_1fr_auto]" />

          <SectionHeading id="skills">Skills</SectionHeading>
          <Skills />
        </main>
      </div>
    </>
  )
}
