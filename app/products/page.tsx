"use client"

import Cart from "@/components/cart"
import Navbar from "@/components/navbar"
import PageHero from "@/components/page-hero"
import ProductShowcase from "@/components/product-showcase"
import WhatsAppIcon from "@/components/whatsapp-icon"
import { useState } from "react"
import Footer from "@/components/footer"

export default function ProductsPage() {
    const [cartOpen, setCartOpen] = useState(false)

    return (
        <main className="min-h-screen bg-background">
            <Navbar onCartClick={() => setCartOpen(true)} />
            <PageHero
                title="Our Collection"
                subtitle="Experience the best for your skin with our curated selection"
                backgroundImage="/martha_skincare_hero_products.png"
            />
            <div className="pt-0">
                <ProductShowcase hideCategories={true} isSidebarLayout={true} />
            </div>
            <Footer />
            <WhatsAppIcon />
            <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        </main>
    )
}
