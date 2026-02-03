"use client"

interface PageHeroProps {
    title: string
    subtitle?: string
    backgroundImage: string
}

export default function PageHero({ title, subtitle, backgroundImage }: PageHeroProps) {
    return (
        <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={backgroundImage}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                {/* Dark Dim Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                <h1 className="text-4xl md:text-6xl font-serif font-bold text-white tracking-tight">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-white/80 text-lg md:text-xl font-sans max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                )}
                <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
            </div>
        </section>
    )
}
