import DetailPage from "@/components/detail-page"
import { byName, work } from "@/lib/content"

const entry = byName(work, "Toyota")

export const metadata = { title: "Toyota - Anuraag Kolli" }

export default function Page() {
  return <DetailPage detail={entry.detail!} />
}
