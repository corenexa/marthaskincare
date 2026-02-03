"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, Menu, X } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  onCartClick: () => void
}

export default function Navbar({ onCartClick }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === "/"
  const { cart } = useCart()

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Force scrolled state on subpages for a consistent "painted" look
  const showSolidNav = !isHome || isScrolled

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${showSolidNav
        ? "bg-background/95 backdrop-blur-md shadow-md py-2 border-b border-border/40"
        : "bg-transparent py-4"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-serif font-bold bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 bg-clip-text text-transparent transition-all duration-300">
              Martha Skincare
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-md font-serif font-bold text-foreground/80 hover:text-primary transition-colors tracking-wide">
              Home
            </Link>
            <Link href="/products" className="text-md font-serif font-bold text-foreground/80 hover:text-primary transition-colors tracking-wide">
              Products
            </Link>
            <Link href="/about" className="text-md font-serif font-bold text-foreground/80 hover:text-primary transition-colors tracking-wide">
              About Us
            </Link>
            <Link href="/contact" className="text-md font-serif font-bold text-foreground/80 hover:text-primary transition-colors tracking-wide">
              Contact
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={onCartClick}
              className="relative p-2 text-foreground/80 hover:text-primary transition-all duration-300"
            >
              <ShoppingCart className="w-5 h-5 stroke-[1.2]" />
              {cartCount > 0 && (
                <span className="absolute -top-0 -right-0 bg-accent text-accent-foreground text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center border-2 border-background">
                  {cartCount}
                </span>
              )}
            </button>

            <Button asChild variant="default" className="hidden md:flex rounded-full bg-accent hover:bg-accent/90 text-accent-foreground px-6 h-10 font-bold transition-all duration-300">
              <Link href="/products">Shop Now</Link>
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-foreground"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border p-4 space-y-4 animate-in fade-in slide-in-from-top-4">
            <Link
              href="/"
              className="block text-lg font-bold font-serif"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="block text-lg font-bold font-serif"
              onClick={() => setMobileOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/about"
              className="block text-lg font-bold font-serif"
              onClick={() => setMobileOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="block text-lg font-bold font-serif"
              onClick={() => setMobileOpen(false)}
            >
              Contact
            </Link>
            <Button asChild className="w-full rounded-full bg-accent">
              <Link href="/products" onClick={() => setMobileOpen(false)}>Shop Now !</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
