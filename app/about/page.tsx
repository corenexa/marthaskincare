"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import About from "@/components/about"
import Footer from "@/components/footer"
import Cart from "@/components/cart"
import WhatsAppIcon from "@/components/whatsapp-icon"
import PageHero from "@/components/page-hero"

export default function AboutPage() {
    const [cartOpen, setCartOpen] = useState(false)

    return (
        <main className="min-h-screen bg-background">
            <Navbar onCartClick={() => setCartOpen(true)} />
            <div className="pt-0 pb-12">
                <PageHero
                    title="About Us"
                    subtitle="Our journey to bringing premium luxury skincare to Sierra Leone"
                    backgroundImage="/martha_skincare_hero_products.png"
                />

                <About />
            </div>
            <Footer />
            <WhatsAppIcon />
            {cartOpen && <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />}
        </main>
    )
}
