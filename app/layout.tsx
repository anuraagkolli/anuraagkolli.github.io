import type React from "react"
import type { Metadata } from "next"
import { Inter, Source_Serif_4, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { SITE } from "@/lib/metadata"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif" })
// Only the name in the header is set in Space Grotesk.
const grotesk = Space_Grotesk({ subsets: ["latin"], weight: "500", variable: "--font-name" })

const title = "Anuraag Kolli"
const description =
  "Anuraag Kolli builds machine learning systems that survive contact with production. 2026 Kleiner Perkins Engineering Fellow, studying AI and computer science at Purdue."
const url = SITE

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  keywords: [
    "Anuraag Kolli",
    "Machine Learning Engineer",
    "AI Engineer",
    "Kleiner Perkins Fellow",
    "Purdue",
  ],
  authors: [{ name: "Anuraag Kolli" }],
  creator: "Anuraag Kolli",
  alternates: { canonical: url },
  icons: { icon: "/favicon.png", apple: "/apple-touch-icon.png" },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url,
    title,
    description,
    siteName: title,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Anuraag Kolli" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${serif.variable} ${grotesk.variable}`}>
      <body>{children}</body>
    </html>
  )
}
