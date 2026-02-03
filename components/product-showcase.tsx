"use client"

import { useEffect, useState, useMemo } from "react"
import ProductCard from "./product-card"
import type { Product } from "@/lib/products"
import { fetchProductsFromApi, type ApiProduct } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Sparkles, ShoppingBag } from "lucide-react"
import ProductFilters from "./product-filters"

export const CATEGORIES = [
  {
    name: "Face Care",
    image: "/face.jfif",
    id: "Face Care"
  },
  {
    name: "Body Care",
    image: "/body.jfif",
    id: "Body Care"
  },
  {
    name: "Serums",
    image: "/serum.jfif",
    id: "Serums"
  },
  {
    name: "Creams",
    image: "/luxury-pearl-skincare-cream.jpg",
    id: "Creams"
  },
  {
    name: "Cleansers",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=500",
    id: "Cleansers"
  },
  {
    name: "Oils",
    image: "/cc.jfif",
    id: "Oils"
  },
]

function normalizeProduct(product: ApiProduct, index: number): Product {
  const parsedPrice = Number(product.price)
  return {
    id: product.id ?? product._id ?? product.productId ?? `product-${index}`,
    name: product.productName ?? "Untitled Product",
    description: product.notes ?? "Premium skincare created with care",
    price: Number.isFinite(parsedPrice) ? parsedPrice : 0,
    image: product.productImage ?? null,
    category: product.category ?? "skincare",
    productId: product.productId ?? null,
    expiringDate: product.expiringDate ?? null,
    publishStatus: product.publishStatus,
  }
}

import Link from "next/link"

interface ProductShowcaseProps {
  hideCategories?: boolean
  isSidebarLayout?: boolean
  isFeatured?: boolean
}

export default function ProductShowcase({
  hideCategories = false,
  isSidebarLayout = false,
  isFeatured = false
}: ProductShowcaseProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [activePriceRange, setActivePriceRange] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const loadProducts = async () => {
      setLoading(true)
      setError(null)
      try {
        const apiProducts = await fetchProductsFromApi()
        if (cancelled) return
        const normalized = apiProducts
          .map(normalizeProduct)
          .filter((product) => Boolean(product.name) && product.publishStatus === "yes")
        setProducts(normalized)
      } catch (err) {
        if (!cancelled) {
          setProducts([])
          setError(err instanceof Error ? err.message : "Unable to load products right now.")
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }
    void loadProducts()
    return () => {
      cancelled = true
    }
  }, [])

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category)
      const priceMatch = !priceRange || (product.price >= priceRange[0] && product.price <= priceRange[1])
      return categoryMatch && priceMatch
    })

    // If featured mode, pick one item from each unique category found in the products
    if (isFeatured) {
      const uniqueCategories = Array.from(new Set(products.map(p => p.category)))
      const pickedProducts: Product[] = []

      uniqueCategories.forEach(cat => {
        const productFromCat = products.find(p => p.category === cat)
        if (productFromCat) {
          pickedProducts.push(productFromCat)
        }
      })

      return pickedProducts.slice(0, 6) // Cap at 6 if there are many categories
    }

    return result
  }, [products, selectedCategories, priceRange, isFeatured])

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    )
  }

  const handlePriceChange = (range: [number, number] | null) => {
    setPriceRange(range)
    if (range) {
      if (range[0] === 100 && range[1] === 200) setActivePriceRange("100-200")
      else if (range[0] === 200 && range[1] === 300) setActivePriceRange("200-300")
      else if (range[0] === 300) setActivePriceRange("400+")
    } else {
      setActivePriceRange(null)
    }
  }

  return (
    <section id="products" className={`relative ${isSidebarLayout ? "min-h-screen" : "py-24 bg-[#FDFBF9]"}`}>
      <div className={`${isSidebarLayout ? "" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"}`}>
        {!hideCategories && !isFeatured && (
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#2C2C2C] mb-4">Shop by Category</h2>
              <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  className={`group relative aspect-[4/5] rounded-2xl overflow-hidden transition-all duration-500 border-2 ${selectedCategories.includes(cat.id) ? "border-accent scale-105 shadow-xl" : "border-transparent hover:border-accent/30"
                    }`}
                >
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity ${selectedCategories.includes(cat.id) ? "opacity-90" : "opacity-60 group-hover:opacity-70"
                    }`} />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                    <span className="text-sm font-bold tracking-widest text-white uppercase">{cat.name}</span>
                  </div>
                  {selectedCategories.includes(cat.id) && (
                    <div className="absolute top-2 right-2 bg-accent text-accent-foreground p-1 rounded-full">
                      <Sparkles className="w-3 h-3" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className={`flex flex-col ${isSidebarLayout ? "lg:flex-row min-h-screen" : ""}`}>
          {isSidebarLayout && (
            <div className="lg:w-80 bg-white lg:border-r border-border shrink-0 p-0 lg:p-8 lg:pt-12">
              <ProductFilters
                categories={CATEGORIES}
                selectedCategories={selectedCategories}
                onCategoryChange={toggleCategory}
                onPriceChange={handlePriceChange}
                activePriceRange={activePriceRange}
              />
            </div>
          )}

          <div className={`flex-1 ${isSidebarLayout ? "bg-background/95 px-4 mt-[-180px] md:mt-0 pt-8 pb-8 md:p-12 lg:p-16" : ""}`}>
            <div className={`mb-12 ${isSidebarLayout ? "text-left" : "text-center"}`}>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#2C2C2C] mb-4">
                {isFeatured ? "Featured Collection" : (selectedCategories.length === 0 ? "Our Collection" : "Filtered Collection")}
              </h2>
              {!isFeatured && (
                <p className="text-[#6F6F6F] max-w-2xl mx-auto lg:mx-0">
                  Experience the glow with our carefully formulated products, curated just for your skin needs.
                </p>
              )}
            </div>

            {error && (
              <div className="mb-12 p-4 rounded-xl bg-red-50 text-red-600 text-sm border border-red-100 italic font-sans">
                Note: {error} (Check your API connection)
              </div>
            )}

            <div className={`grid grid-cols-1 sm:grid-cols-2 ${isSidebarLayout ? "xl:grid-cols-3" : "lg:grid-cols-4"} gap-8`}>
              {loading ? (
                Array.from({ length: isFeatured ? 4 : 8 }).map((_, index) => (
                  <div key={index} className="animate-pulse bg-white border border-[#F0EAE4] rounded-2xl h-[400px]" />
                ))
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div key={product.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <ProductCard product={product} />
                  </div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center font-sans">
                  <div className="inline-block p-6 rounded-full bg-secondary/30 mb-4">
                    <Sparkles className="w-8 h-8 text-primary/40" />
                  </div>
                  <p className="text-[#6F6F6F] italic text-lg">No products match your current filters.</p>
                  <Button
                    variant="outline"
                    className="mt-6 rounded-full border-accent text-accent hover:bg-accent/10"
                    onClick={() => {
                      setSelectedCategories([])
                      setPriceRange(null)
                      setActivePriceRange(null)
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>

            {isFeatured && (
              <div className="mt-16 text-center">
                <Button asChild size="lg" className="rounded-full bg-accent hover:bg-accent/90 text-accent-foreground px-12 py-8 text-xl font-bold shadow-xl hover:scale-105 transition-all duration-300">
                  <Link href="/products">View All Products</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
