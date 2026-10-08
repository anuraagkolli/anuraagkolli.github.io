import SiteHeader from "@/components/site-header"

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <div className="pb-48">
        <main className="m-auto w-full max-w-[640px] px-5">
          <h1
            className="font-ui"
            style={{ fontWeight: 700, fontSize: 20, letterSpacing: "-0.01em" }}
          >
            Page not found
          </h1>
          <p className="pt-2 text-gray-500">That page does not exist.</p>
        </main>
      </div>
    </>
  )
}
