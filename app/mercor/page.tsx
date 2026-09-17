import DetailPage from "@/components/detail-page"
import { byName, work } from "@/lib/content"
import { pageMetadata } from "@/lib/metadata"

const entry = byName(work, "Mercor")

export const metadata = pageMetadata("/mercor/", "Mercor", "Anuraag Kolli at Mercor: quality optimization and evaluation pipelines for frontier LLM coding trajectories.")

export default function Page() {
  return <DetailPage detail={entry.detail!} />
}
