import Link from "next/link"
import { icons } from "@/components/icons"
import { nav, profile, social } from "@/lib/content"

export default function SiteHeader() {
  return (
    <div className="relative m-auto mb-8 mt-16 w-full max-w-[640px] items-start px-5">
      <h1
        className="font-ui"
        style={{ fontWeight: 700, fontSize: 20, lineHeight: 1.05, letterSpacing: "-0.01em" }}
      >
        <Link href="/" className="hover:opacity-70">
          {profile.name}
        </Link>
      </h1>
      <div className="pt-2 text-gray-500">{profile.tagline}</div>
      <nav className="ui flex gap-4 pt-3 text-gray-500">
        {nav.map(({ label, href }) => (
          <Link key={label} href={href} className="prose-link">
            {label}
          </Link>
        ))}
      </nav>
      <div className="pt-3">
        <div className="flex items-center gap-4">
          {social.map(({ label, href, tip }) => {
            const Icon = icons[label]
            const external = href.startsWith("http")
            return (
              <a
                key={label}
                className="social-link"
                href={href}
                aria-label={tip}
                {...(external || href.endsWith(".pdf")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <Icon />
                <span className="social-tip" aria-hidden="true">
                  {tip}
                </span>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
