"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import ContactForm from "@/components/contact-form"
import Footer from "@/components/footer"
import Cart from "@/components/cart"
import WhatsAppIcon from "@/components/whatsapp-icon"

export default function ContactPage() {
    const [cartOpen, setCartOpen] = useState(false)

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar onCartClick={() => setCartOpen(true)} />
            <div className="pt-0">
                <ContactForm />
            </div>
            <Footer />
            <WhatsAppIcon />
            {cartOpen && <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />}
        </main>
    )
}
