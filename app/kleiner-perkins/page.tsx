import DetailPage from "@/components/detail-page"
import { byName, work } from "@/lib/content"
import { pageMetadata } from "@/lib/metadata"

const entry = byName(work, "kp fellow")

export const metadata = pageMetadata("/kleiner-perkins/", "Kleiner Perkins", "Anuraag Kolli's 2026 Kleiner Perkins Engineering Fellowship at Inkitt: pLTV revenue prediction and a rebuilt recommendation engine.")

export default function Page() {
  return <DetailPage detail={entry.detail!} />
}
