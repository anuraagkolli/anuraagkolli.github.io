import Link from "next/link"
import IsoCross from "@/components/iso-cross"
import { icons } from "@/components/icons"
import { nav, profile, social } from "@/lib/content"

export default function SiteHeader({ current }: { current?: string } = {}) {
  return (
    <div className="relative m-auto mb-8 mt-16 w-full max-w-[640px] items-start px-5">
      <IsoCross className="absolute right-5 top-0 hidden w-[128px] sm:block" />
      <h1
        style={{
          fontFamily: "var(--font-name), var(--system-stack)",
          fontWeight: 500,
          fontSize: 24,
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
        }}
      >
        <Link href="/" className="hover:opacity-70">
          {profile.name}
        </Link>
      </h1>
      <div className="pt-2 text-gray-500">{profile.tagline}</div>
      <nav className="ui flex gap-4 pt-3 text-gray-500">
        {nav.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="prose-link"
            aria-current={href === current ? "page" : undefined}
          >
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
