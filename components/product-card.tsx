"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ShoppingBag, Eye } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import type { Product } from "@/lib/products"
import CloudinaryImage from "./cloudinary-image"
import { Button } from "@/components/ui/button"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const [showAdded, setShowAdded] = useState(false)
  const router = useRouter()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart(product)
    setShowAdded(true)
    setTimeout(() => setShowAdded(false), 2000)
  }

  const handleViewProduct = () => {
    // Navigate to product detail page if it exists, otherwise just open a dialog or similar
    // For now, we'll just keep it simple
    console.log("View product", product.id)
  }

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-[#F0EAE4] flex flex-col h-full cursor-pointer"
      onClick={handleViewProduct}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-white">
        <CloudinaryImage
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full bg-white/90 hover:bg-white text-foreground"
            onClick={(e) => {
              e.stopPropagation()
              handleViewProduct()
            }}
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full bg-white/90 hover:bg-white text-foreground"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="w-4 h-4" />
          </Button>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-secondary/40 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-black rounded-full border border-white/20">
            {product.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow bg-secondary/20">
        <div className="mb-2">
          <h3 className="text-lg font-serif font-bold text-[#2C2C2C] group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-[#6F6F6F] line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="mt-auto pt-3 flex flex-col gap-3">
          <div className="flex items-center justify-end">
            <span className="text-xl font-bold text-accent">Nle {product.price.toLocaleString()}</span>
            
          </div>

          <Button
            onClick={handleAddToCart}
            className={`w-full rounded-xl py-6 text-sm font-bold shadow-lg transition-all duration-300 ${showAdded
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-accent/90 hover:bg-accent text-accent-foreground hover:scale-[1.02]"
              }`}
          >
            {showAdded ? "Added to Bag!" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  )
}
