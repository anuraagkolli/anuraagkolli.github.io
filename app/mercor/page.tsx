import DetailPage from "@/components/detail-page"
import { byName, work } from "@/lib/content"

const entry = byName(work, "Mercor")

export const metadata = { title: "Mercor - Anuraag Kolli" }

export default function Page() {
  return <DetailPage detail={entry.detail!} />
}
