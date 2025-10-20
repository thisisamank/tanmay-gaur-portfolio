"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselItem {
  id: string
  title: string
  thumbnail: string
  year?: number
  role?: string
  excerpt?: string
  date?: string
}

interface CarouselProps {
  items: CarouselItem[]
  title: string
  onItemClick?: (item: CarouselItem) => void
}

export function Carousel({ items, title, onItemClick }: CarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
      checkScroll()
    }
  }

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6 text-foreground">{title}</h2>
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-4"
          onScroll={checkScroll}
          style={{ scrollBehavior: "smooth" }}
        >
          {items.map((item) => (
            <div key={item.id} className="flex-shrink-0 w-80 cursor-pointer group" onClick={() => onItemClick?.(item)}>
              <div className="relative h-48 bg-card rounded-lg overflow-hidden mb-3">
                <Image
                  src={item.thumbnail || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-semibold text-foreground group-hover:text-accent transition">{item.title}</h3>
              {item.year && (
                <p className="text-sm text-muted-foreground">
                  {item.year} • {item.role}
                </p>
              )}
              {item.date && <p className="text-sm text-muted-foreground">{item.date}</p>}
              {item.excerpt && <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{item.excerpt}</p>}
            </div>
          ))}
        </div>

        {/* Scroll Controls */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/3 -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full z-10 transition"
          >
            <ChevronLeft className="w-6 h-6 text-accent" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/3 -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full z-10 transition"
          >
            <ChevronRight className="w-6 h-6 text-accent" />
          </button>
        )}
      </div>
    </div>
  )
}
