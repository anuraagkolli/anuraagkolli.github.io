import Link from "next/link"
import type { Entry } from "@/lib/content"

/**
 * A row: date on the left, the name in the middle carrying the weight, and a
 * small gray tag on the right for the context the name does not say. Below the
 * `sm` breakpoint the date and tag share one line and the name drops beneath
 * them, so the name never competes for width.
 */
function RowBody({ entry }: { entry: Entry }) {
  return (
    <>
      <span className="hidden whitespace-nowrap tabular-nums text-gray-400 sm:block sm:col-start-1">
        {entry.dates[0]}
      </span>

      <span className="hidden flex-col sm:flex sm:col-start-2">
        <span className="row-name">{entry.name}</span>
        {entry.lines.map((line) => (
          <span key={line} className="text-gray-500">
            {line}
          </span>
        ))}
      </span>

      <span className="hidden whitespace-nowrap text-right font-mono text-gray-400 sm:block sm:col-start-3">
        {entry.tag}
      </span>

      <div className="sm:hidden">
        <div className="flex items-baseline gap-3">
          <span className="tabular-nums text-gray-400">{entry.dates[0]}</span>
          <span className="leader" aria-hidden="true" />
          <span className="whitespace-nowrap font-mono text-gray-400">{entry.tag}</span>
        </div>
        <div className="row-name pt-1">{entry.name}</div>
        {entry.lines.map((line) => (
          <div key={line} className="text-gray-500">
            {line}
          </div>
        ))}
      </div>
    </>
  )
}

function Row({ entry }: { entry: Entry }) {
  const className = "ui row col-span-3 block sm:grid sm:grid-cols-subgrid sm:items-baseline sm:gap-x-6"

  return entry.href ? (
    <Link href={entry.href} className={className}>
      <RowBody entry={entry} />
    </Link>
  ) : (
    <div className={className}>
      <RowBody entry={entry} />
    </div>
  )
}

export default function EntryList({
  entries,
  cols = "sm:grid-cols-[76px_1fr_auto]",
}: {
  entries: Entry[]
  /** Column template at sm and up, for rows that need a wider first column. */
  cols?: string
}) {
  return (
    <div className={`-mx-3 grid grid-cols-[auto_1fr_auto] gap-x-6 ${cols}`}>
      {entries.map((entry) => (
        <Row key={entry.name} entry={entry} />
      ))}
    </div>
  )
}
