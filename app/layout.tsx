import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import type React from "react"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tanmay Gaur – Filmmaker & Media Producer",
  description:
    "Multi-speciality filmmaker and media producer. Commercials, documentaries, and innovative visual narratives.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Register service worker for caching images and videos
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('Service Worker registered successfully:', registration.scope);
                  }).catch(function(error) {
                    console.log('Service Worker registration failed:', error);
                  });
                });
              }
            `,
          }}
        />
      </head>
      <body className={`font-sans antialiased bg-black text-foreground`}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
