"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import ProductShowcase from "@/components/product-showcase"
import ContactForm from "@/components/contact-form"
import Footer from "@/components/footer"
import Cart from "@/components/cart"
import Reviews from "@/components/reviews"
import CTA from "@/components/cta-section"
import WhatsAppIcon from "@/components/whatsapp-icon"

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <main className="min-h-screen bg-background">
      <Navbar onCartClick={() => setCartOpen(true)} />
      <Hero />
      <ProductShowcase isFeatured={true} />
      <About />
      <Reviews />
      <ContactForm />
      <CTA />
      <Footer />
      <WhatsAppIcon />
      {cartOpen && <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />}
    </main>
  )
}
