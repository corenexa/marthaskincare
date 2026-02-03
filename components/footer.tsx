import Link from "next/link"
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, Truck } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-secondary/50 text-foreground pt-16 pb-8 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 bg-clip-text text-transparent">Martha Skincare</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Premium-quality skincare products trusted by customers in Freetown. Experience luxury skincare, made to care for your skin.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Delivery Info */}
          <div>
            <h4 className="font-semibold mb-4">Delivery</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <Truck className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" />
                <p>We deliver to all accross Sierra Leone.</p>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" />
                <p>Based in Freetown, Sierra Leone</p>
              </div>
            </div>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-muted-foreground mb-6">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" />
                <span>+232 72 001116</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                <span>marthaskincare@gmail.com</span>
              </li>
            </ul>
            <div className="flex gap-4">
              <a href="#" className="p-2 hover:bg-secondary rounded-full transition-colors">
                <Facebook className="w-5 h-5 text-foreground/70" />
              </a>
              <a href="#" className="p-2 hover:bg-secondary rounded-full transition-colors">
                <Instagram className="w-5 h-5 text-foreground/70" />
              </a>
              <a href="#" className="p-2 hover:bg-secondary rounded-full transition-colors">
                <Twitter className="w-5 h-5 text-foreground/70" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <p className="text-muted-foreground text-xs">© {new Date().getFullYear()} Martha Skincare. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
