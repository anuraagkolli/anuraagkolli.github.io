import DetailPage from "@/components/detail-page"
import { byName, work } from "@/lib/content"

const entry = byName(work, "Kleiner Perkins")

export const metadata = { title: "Kleiner Perkins - Anuraag Kolli" }

export default function Page() {
  return <DetailPage detail={entry.detail!} />
}
