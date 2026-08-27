export default function SectionHeading({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} className="ui flex items-baseline gap-3 pt-16 font-semibold text-gray-500">
      <span className="whitespace-nowrap">{children}</span>
      <span className="leader" aria-hidden="true" />
    </h2>
  )
}
