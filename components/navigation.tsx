"use client"

import Link from "next/link"
import { useState } from "react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
  ]

  return (
    <nav className="fixed top-0 w-full bg-gradient-to-b from-black via-black/95 to-transparent backdrop-blur-sm z-50 transition-all">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo - Netflix style */}
          <Link href="/" className="text-2xl md:text-3xl font-black text-red-600 hover:text-red-500 transition-colors tracking-tighter">
            TG
          </Link>

          {/* Desktop Navigation - Netflix style */}
          <div className="hidden md:flex gap-5 lg:gap-7 items-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation - Netflix style */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-1 bg-zinc-900 backdrop-blur-lg rounded-lg mt-2 p-4 border border-zinc-800">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-sm font-medium text-zinc-300 hover:text-white transition-colors py-3 px-3 hover:bg-zinc-800 rounded"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
