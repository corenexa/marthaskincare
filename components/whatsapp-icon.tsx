"use client"

import { MessageCircle } from "lucide-react"

export default function WhatsAppIcon() {
    const phoneNumber = "+23272001116"
    const message = "Hello Martha Skincare, I'm interested in your products!"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 left-6 z-50 p-4 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle className="w-6 h-6 fill-current" />
            <span className="absolute left-full ml-3 px-3 py-1 bg-white text-black text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                Chat with Martha
            </span>
        </a>
    )
}
