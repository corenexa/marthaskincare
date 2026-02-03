"use client"

import { Star, Quote } from "lucide-react"

const testimonials = [
    {
        name: "Aminata Sesay",
        location: "Makeni",
        comment: "Martha Skincare has completely transformed my skin. The glow is real! I've been using the serum for a month and the results are incredible.",
        rating: 5,
    },
    {
        name: "Isatu Bah",
        location: "Freetown, Lumley",
        comment: "The delivery was so fast. I ordered in the morning and got my package by afternoon. Very professional service and high-quality products.",
        rating: 5,
    },
    {
        name: "Mariatu Conteh",
        location: "Bo",
        comment: "Finding premium skincare in Freetown used to be hard until I found Martha. The cleanser is so gentle on my sensitive skin. Highly recommend!",
        rating: 5,
    },
]

export default function Reviews() {
    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FDFBF9]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#2C2C2C]">Loved by Our Customers</h2>
                    <p className="text-[#6F6F6F] text-lg max-w-2xl mx-auto italic">
                        "Real people, real results. See why Freetown is glowing with Martha Skincare."
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-3xl border border-[#F0EAE4] shadow-sm hover:shadow-md transition-shadow relative"
                        >
                            <div className="absolute top-6 right-8 opacity-10">
                                <Quote className="w-10 h-10 text-primary" />
                            </div>

                            <div className="flex gap-1 mb-6">
                                {Array.from({ length: testimonial.rating }).map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                                ))}
                            </div>

                            <p className="text-[#2C2C2C] mb-8 leading-relaxed italic">
                                "{testimonial.comment}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold text-primary text-xs">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-[#2C2C2C]">{testimonial.name}</h4>
                                    <p className="text-[10px] text-accent font-bold uppercase tracking-wider">{testimonial.location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
