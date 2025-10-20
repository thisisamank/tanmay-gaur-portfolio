import Link from "next/link"

export function CtaSection() {
  return (
    <section className="bg-card py-16 mt-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground text-balance">
          Ready to create something bold?
        </h2>
        <p className="text-lg text-muted-foreground mb-8">Let's collaborate on your next project.</p>
        <Link
          href="/#contact"
          className="inline-block bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded-lg font-semibold transition"
        >
          Get in Touch
        </Link>
      </div>
    </section>
  )
}
