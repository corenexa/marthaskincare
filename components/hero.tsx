"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const HERO_IMAGES = [
  "/martha_skincare_hero_products.png",
  "/cc.jfif",
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {HERO_IMAGES.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
          >
            <img
              src={img}
              alt={`Martha Skincare Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {/* Increased Dim Gradient: Darker on the left for maximum text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-8 ">
        <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-left duration-1000">
          <h1 className="text-5xl md:text-8xl font-serif font-bold text-white leading-[1.1]">
            Luxury Skincare, <br />
            <span className="text-accent italic">Made to Care</span> <br />
            for Your Skin.
          </h1>

          <p className="text-white/80 text-lg md:text-xl max-w-xl leading-relaxed font-sans">
            Experience the ultimate glow with our premium skincare collection.
            Meticulously crafted for those who demand the best for their skin in Freetown.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button asChild size="lg" className="rounded-full bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-8 text-xl font-bold shadow-2xl hover:scale-105 transition-all duration-300">
              <Link href="/products">Shop the Collection</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-20">
        {HERO_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${index === currentSlide ? "bg-accent w-20" : "bg-white/40 w-10 hover:bg-white/60"
              }`}
          />
        ))}
      </div>
    </section>
  )
}
