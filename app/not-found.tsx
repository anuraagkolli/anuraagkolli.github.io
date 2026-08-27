import Link from "next/link"

export default function NotFound() {
  return (
    <main className="m-auto mt-16 w-full max-w-[640px] px-5">
      <h1 className="font-ui" style={{ fontWeight: 700, fontSize: 20, letterSpacing: "-0.01em" }}>
        Page not found
      </h1>
      <p className="pt-2 text-gray-500">That page does not exist.</p>
      <p className="pt-4">
        <Link href="/" className="prose-link">
          Back home
        </Link>
      </p>
    </main>
  )
}
