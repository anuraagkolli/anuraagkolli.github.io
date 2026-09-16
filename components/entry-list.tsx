import Link from "next/link"
import type { Entry } from "@/lib/content"

/**
 * The three-column row shared by work, projects, and education: name on the
 * left, detail lines in the middle, right-aligned dates. It collapses to a
 * stacked layout below the `sm` breakpoint, where the dates move under the name.
 */
function Row({ entry }: { entry: Entry }) {
  const className =
    "ui row col-span-3 block sm:grid sm:grid-cols-subgrid sm:items-baseline sm:gap-x-6"

  if (entry.href) {
    return (
      <Link href={entry.href} className={className}>
        <RowBody entry={entry} />
      </Link>
    )
  }

  return (
    <div className={className}>
      <RowBody entry={entry} />
    </div>
  )
}

function RowBody({ entry }: { entry: Entry }) {
  const [lead, ...rest] = entry.lines

  return (
    <>
      <span className="hidden font-medium sm:block sm:col-start-1">{entry.name}</span>

      <span className="hidden flex-col sm:flex sm:col-start-2" style={{ lineHeight: "26px" }}>
        <span className={entry.nowrap ? "sm:whitespace-nowrap" : undefined}>{lead}</span>
        {rest.map((line) => (
          <span key={line} className="text-gray-500">
            {line}
          </span>
        ))}
        {entry.links && <Links entry={entry} suppressed={Boolean(entry.href)} />}
      </span>

      <span
        className="hidden flex-col items-end whitespace-nowrap text-right tabular-nums text-gray-500 sm:flex sm:col-start-3"
        style={{ lineHeight: "26px" }}
      >
        {entry.dates.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </span>

      <div className="sm:hidden" style={{ lineHeight: 1.85 }}>
        <div className="flex items-baseline gap-3">
          <span className="font-medium">{entry.name}</span>
          <span className="leader" aria-hidden="true" />
          <span className="whitespace-nowrap tabular-nums text-gray-500">{entry.dates[0]}</span>
        </div>
        <div className="mt-1 flex flex-col">
          <span>{lead}</span>
          {rest.map((line) => (
            <span key={line} className="text-gray-500">
              {line}
            </span>
          ))}
          {entry.links && <Links entry={entry} suppressed={Boolean(entry.href)} />}
        </div>
      </div>
    </>
  )
}

function Links({ entry, suppressed }: { entry: Entry; suppressed?: boolean }) {
  if (suppressed) return null
  return (
    <span className="flex gap-x-4 pt-1">
      {entry.links?.map((link) => (
        <a
          key={link.label}
          className="prose-link text-gray-500"
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.label}
        </a>
      ))}
    </span>
  )
}

export default function EntryList({
  entries,
  cols = "sm:grid-cols-[150px_1fr_105px]",
}: {
  entries: Entry[]
  /** Column template at sm and up, for rows that need a wider middle. */
  cols?: string
}) {
  return (
    <div className={`-mx-3 mt-5 grid grid-cols-[auto_1fr_auto] gap-x-6 ${cols}`}>
      {entries.map((entry) => (
        <Row key={entry.name} entry={entry} />
      ))}
    </div>
  )
}
