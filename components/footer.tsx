import Link from "next/link"
import { portfolioData } from "@/lib/data"
import { NAVIGATION_ITEMS } from "@/lib/constants"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-accent mb-2">TG</h3>
            <p className="text-muted-foreground text-sm">{portfolioData.bio.title}</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Navigation</h4>
            <ul className="space-y-2">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-muted-foreground hover:text-accent transition text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${portfolioData.contact.email}`}
                  className="text-muted-foreground hover:text-accent transition text-sm"
                >
                  {portfolioData.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${portfolioData.contact.phone}`}
                  className="text-muted-foreground hover:text-accent transition text-sm"
                >
                  {portfolioData.contact.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 text-center text-muted-foreground text-sm">
          <p>
            &copy; {currentYear} {portfolioData.bio.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
