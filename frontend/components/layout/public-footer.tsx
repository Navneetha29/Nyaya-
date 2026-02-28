import Link from "next/link"
import { Scale } from "lucide-react"
import { APP_NAME } from "@/lib/constants"

const platformLinks = [
  { label: "Submit a Case", href: "/dashboard/submit-case" },
  { label: "Find Lawyers", href: "/dashboard/lawyers" },
  { label: "Track Your Case", href: "/dashboard" },
  { label: "Legal Aid", href: "/women/guided-help" },
]

const womenLinks = [
  { label: "Know Your Rights", href: "/women/rights" },
  { label: "Guided Help", href: "/women/guided-help" },
  { label: "Find a Lawyer", href: "/women/lawyers" },
  { label: "Safety Resources", href: "/women" },
]

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Contact Us", href: "/contact" },
]

export function PublicFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Scale className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">{APP_NAME}</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Simplifying access to justice for every Indian citizen through
              technology and verified legal professionals.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Platform</h3>
            <ul className="mt-3 flex flex-col gap-2">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Women's Portal */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              {"Women's Portal"}
            </h3>
            <ul className="mt-3 flex flex-col gap-2">
              {womenLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Legal</h3>
            <ul className="mt-3 flex flex-col gap-2">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-center text-xs text-muted-foreground">
            {`\u00A9 ${new Date().getFullYear()} ${APP_NAME}. All rights reserved. Built for the people of India.`}
          </p>
        </div>
      </div>
    </footer>
  )
}
