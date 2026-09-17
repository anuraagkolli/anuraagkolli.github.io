import DetailPage from "@/components/detail-page"
import { byName, work } from "@/lib/content"
import { pageMetadata } from "@/lib/metadata"

const entry = byName(work, "Toyota")

export const metadata = pageMetadata("/toyota/", "Toyota", "Anuraag Kolli at Toyota Motor North America: a distributed GenAI RAG system serving 500+ engineers.")

export default function Page() {
  return <DetailPage detail={entry.detail!} />
}
