"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CTA() {
    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="relative rounded-[3rem] overflow-hidden min-h-[500px] flex items-center justify-center">
                    {/* Background Image with Dark Overlay */}
                    <div className="absolute inset-0">
                        <img
                            src="/luxury-pearl-skincare-cream.jpg"
                            alt="Glow Confidently with Martha Skincare"
                            className="w-full h-full object-cover"
                        />
                        {/* Dark Gradient Overlay for text contrast */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black/70" />
                        <div className="absolute inset-0 bg-accent/10 mix-blend-overlay" />
                    </div>

                    <div className="relative z-10 py-16 px-8 md:py-24 md:px-16 text-center space-y-8 animate-in fade-in zoom-in duration-1000">
                        <h2 className="text-4xl md:text-7xl font-serif font-bold text-white leading-tight">
                            Glow Confidently with <br /> Martha Skincare.
                        </h2>
                        <p className="text-white/90 text-lg md:text-xl max-w-xl mx-auto font-sans">
                            Ready to start your journey to healthier, more radiant skin? Join thousands of happy customers in Freetown today.
                        </p>
                        <Button asChild size="lg" className="rounded-full bg-accent hover:bg-accent/90 text-accent-foreground px-12 py-8 text-xl font-bold shadow-2xl hover:scale-105 transition-transform duration-300">
                            <Link href="/products">Shop the Glow</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
