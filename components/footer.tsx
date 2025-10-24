import { NAVIGATION_ITEMS } from "@/lib/constants"
import { portfolioData } from "@/lib/data"
import Image from "next/image"
import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-zinc-900 py-12 md:py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="relative w-12 h-12 mb-2">
              <Image
                src="/logo.png"
                alt="TG Logo"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-zinc-400 text-sm">{portfolioData.bio.title}</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-zinc-400 hover:text-white transition text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${portfolioData.contact.email}`}
                  className="text-zinc-400 hover:text-white transition text-sm"
                >
                  {portfolioData.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${portfolioData.contact.phone}`}
                  className="text-zinc-400 hover:text-white transition text-sm"
                >
                  {portfolioData.contact.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-zinc-900 pt-8 text-center text-zinc-600 text-xs md:text-sm">
          <p>
            &copy; {currentYear} {portfolioData.bio.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
