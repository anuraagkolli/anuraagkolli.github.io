import Bio from "@/components/bio"
import EntryList from "@/components/entry-list"
import SiteHeader from "@/components/site-header"
import { builds, work } from "@/lib/content"

export default function Home() {
  return (
    <>
      <SiteHeader />
      <div className="pb-48">
        <main className="m-auto w-full max-w-[640px] px-5">
          <Bio />
          <div className="pt-10">
            <EntryList entries={[...work, builds]} />
          </div>
        </main>
      </div>
    </>
  )
}
