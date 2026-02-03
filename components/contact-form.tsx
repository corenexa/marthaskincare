"use client"

import type React from "react"
import { useState } from "react"
import { Mail, Phone, MapPin, Truck, Send, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: "", email: "", phone: "", message: "" })
    }, 3000)
  }

  return (
    <section id="contact" className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0">
        <img
          src="/vitamin-c-brightening-serum.jpg"
          alt="Contact Martha Skincare"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/90" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info Side */}
          <div className="space-y-12">
            <div className="space-y-4 text-center lg:text-left">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">Get in Touch</h2>
              <p className="text-white/70 text-lg max-w-lg font-sans">
                Have questions about our products or your order? We're here to help you glow!
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex gap-6 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl">
                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Truck className="w-6 h-6 text-accent" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-white font-serif text-lg">Fast Delivery</h3>
                  <p className="text-sm text-white/70 font-sans">
                    We deliver to <span className="font-bold text-accent">all accross Sierra Leone.</span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider font-bold font-sans">Call Us</p>
                    <p className="font-medium text-white">+232 72 001116</p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  
                  <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider font-bold font-sans">Email Us</p>
                    <p className="font-medium text-white">marthaskincare@gmail.com</p>
                  </div>
                </div>

                
              </div>

              <div className="flex gap-4 items-center pt-4">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-wider font-bold font-sans">Location</p>
                  <p className="font-medium text-white">Freetown, Sierra Leone</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white/10 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] shadow-2xl border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/80 font-sans">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-accent/40 bg-white/5 text-white transition-all placeholder:text-white/30"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/80 font-sans">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-accent/40 bg-white/5 text-white transition-all placeholder:text-white/30"
                    placeholder="+232..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-white/80 font-sans">Email (Optional)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-accent/40 bg-white/5 text-white transition-all placeholder:text-white/30"
                  placeholder="name@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-white/80 font-sans">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-accent/40 bg-white/5 text-white transition-all resize-none placeholder:text-white/30"
                  placeholder="How can we help you?"
                />
              </div>

              <Button
                type="submit"
                className={`w-full py-8 text-lg font-bold rounded-2xl transition-all ${submitted ? "bg-green-600 hover:bg-green-700" : "bg-accent hover:bg-accent/90 text-accent-foreground"
                  }`}
              >
                {submitted ? "Message Sent!" : <span className="flex items-center gap-2">Send Message <Send className="w-5 h-5" /></span>}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
