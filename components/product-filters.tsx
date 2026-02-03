"use client"

import { useState } from "react"
import { Check, ChevronDown, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductFiltersProps {
    categories: { id: string; name: string }[]
    selectedCategories: string[]
    onCategoryChange: (categoryId: string) => void
    onPriceChange: (range: [number, number] | null) => void
    activePriceRange: string | null
}

const PRICE_RANGES = [
    { id: "100-200", name: "Le100 to Le200", range: [100, 200] },
    { id: "200-300", name: "Le200 to Le300", range: [200, 300] },
    { id: "400+", name: "Over Le300", range: [300, 1000000] },
]

export default function ProductFilters({
    categories,
    selectedCategories,
    onCategoryChange,
    onPriceChange,
    activePriceRange,
}: ProductFiltersProps) {
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden mt-10 ml-3 flex items-center gap-2 px-18 py-2 bg-white/40 border border-border rounded-full shadow-sm text-sm font-medium mb-0"
            >
                <Filter className="w-4 h-4" />
                Filters
            </button>

            {/* Mobile Sidebar Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 z-[50] bg-black/50 lg:hidden animate-in fade-in duration-300"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar Content */}
            <aside
                className={`fixed inset-y-0 text-black left-0 z-[70] w-full max-w-xs bg-white p-8 overflow-y-auto transition-transform duration-300 lg:relative lg:inset-auto lg:z-0 lg:w-64 lg:p-0 lg:bg-transparent lg:translate-x-0 ${isMobileOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-between lg:hidden mb-8">
                    <h2 className="text-xl font-serif font-bold">Filters</h2>
                    <button onClick={() => setIsMobileOpen(false)} className="p-2">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="space-y-10">
                    {/* Categories */}
                    <div className="space-y-4">
                        <h3 className="text-md font-bold uppercase font-serif text-black">Categories</h3>
                        <div className="space-y-3">
                            {categories.map((category) => (
                                <label
                                    key={category.id}
                                    className="flex items-center gap-3 cursor-pointer group"
                                >
                                    <div className={`w-5 h-5 rounded border text-black flex items-center justify-center transition-colors ${selectedCategories.includes(category.id)
                                        ? "bg-accent border-accent"
                                        : "border-border group-hover:border-accent/50"
                                        }`}>
                                        {selectedCategories.includes(category.id) && (
                                            <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                                        )}
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="sr-only"
                                        checked={selectedCategories.includes(category.id)}
                                        onChange={() => onCategoryChange(category.id)}
                                    />
                                    <span className={`text-sm font-medium transition-colors ${selectedCategories.includes(category.id) ? "text-foreground" : "text-foreground/60 group-hover:text-foreground"
                                        }`}>
                                        {category.name}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Price Range */}
                    <div className="space-y-4">
                        <h3 className="text-md font-serif font-bold uppercase text-black">Price Range</h3>
                        <div className="space-y-3">
                            {PRICE_RANGES.map((range) => (
                                <label
                                    key={range.id}
                                    className="flex items-center gap-3 cursor-pointer group"
                                >
                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${activePriceRange === range.id
                                        ? "bg-accent border-accent"
                                        : "border-border group-hover:border-accent/50"
                                        }`}>
                                        {activePriceRange === range.id && (
                                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                        )}
                                    </div>
                                    <input
                                        type="radio"
                                        name="price-range"
                                        className="sr-only"
                                        checked={activePriceRange === range.id}
                                        onChange={() => onPriceChange(range.id === activePriceRange ? null : (range.range as [number, number]))}
                                        onClick={() => {
                                            if (activePriceRange === range.id) {
                                                onPriceChange(null)
                                            } else {
                                                onPriceChange(range.range as [number, number])
                                            }
                                        }}
                                    />
                                    <span className={`text-sm font-medium transition-colors ${activePriceRange === range.id ? "text-foreground" : "text-foreground/60 group-hover:text-foreground"
                                        }`}>
                                        {range.name}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Apply Filters (Mobile Only) */}
                <div className="mt-12 lg:hidden">
                    <Button onClick={() => setIsMobileOpen(false)} className="w-full rounded-full bg-accent">
                        Apply Filters
                    </Button>
                </div>
            </aside>

            <div className="py-30 bg-white">

            </div>
        </>
    )
}
