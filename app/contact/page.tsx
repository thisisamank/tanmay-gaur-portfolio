import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { portfolioData } from "@/lib/data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact | Tanmay Gaur",
  description: "Get in touch with Tanmay Gaur for your next project.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Get in Touch</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Have a project in mind? I'd love to hear about it. Reach out and let's create something amazing together.
        </p>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Send me a message</h2>
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Contact Information</h2>
            <div className="space-y-8">
              {/* Email */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">Email</h3>
                <a
                  href={`mailto:${portfolioData.contact.email}`}
                  className="text-lg text-accent hover:text-accent/80 transition"
                >
                  {portfolioData.contact.email}
                </a>
              </div>

              {/* Phone */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">Phone</h3>
                <a
                  href={`tel:${portfolioData.contact.phone}`}
                  className="text-lg text-accent hover:text-accent/80 transition"
                >
                  {portfolioData.contact.phone}
                </a>
              </div>

              {/* Availability */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  Availability
                </h3>
                <p className="text-muted-foreground">
                  I'm available for freelance projects, collaborations, and full-time opportunities. Response time is
                  typically within 24-48 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
