import { Star, ShieldCheck, Beaker, Users, Truck } from "lucide-react"

export default function About() {
  const features = [
    {
      icon: Star,
      title: "Premium Product Quality",
      description: "Our products are made with the highest quality standards for luxury results.",
    },
    {
      icon: ShieldCheck,
      title: "Carefully Formulated",
      description: "Skin safety is our priority. Every formula is gentle yet effective.",
    },
    {
      icon: Beaker,
      title: "Quality-Tested Products",
      description: "Rigorously tested to ensure the best performance for your skin.",
    },
    {
      icon: Users,
      title: "Trusted by Customers",
      description: "A growing community of happy customers across Freetown.",
    },
    {
      icon: Truck,
      title: "Fast & Reliable Delivery",
      description: "Prompt delivery to all areas in Freetown, Sierra Leone.",
    },
  ]

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#2C2C2C]">Why Choose Martha Skincare</h2>
              <p className="text-[#6F6F6F] text-lg leading-relaxed">
                We believe in skincare that works as hard as you do. Our commitment to quality and safety makes us the preferred choice for skincare enthusiasts in Freetown.
              </p>
            </div>

            <div className="grid gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div key={index} className="flex gap-4 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#2C2C2C] mb-1">{feature.title}</h3>
                      <p className="text-sm text-[#6F6F6F] leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Image/Visual - Using a stylized representation */}
          <div className="relative">
            <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-2xl">
              <img
                src="/retinol-night-cream-luxury.jpg"
                alt="Quality Skincare"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
            </div>

            {/* Floating Trust Card */}
            <div className="absolute -top-10 -right-10 bg-accent p-8 rounded-2xl shadow-xl text-accent-foreground max-w-[200px] hidden md:block animate-bounce-slow">
              <p className="text-4xl font-serif font-bold mb-2">100%</p>
              <p className="text-sm font-medium">Quality Guaranteed For Your Skin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story Section - Refactored as requested */}
      <div className="mt-32 relative rounded-3xl overflow-hidden min-h-[600px] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Background Image with Dark Gradient */}
        <div className="absolute inset-0">
          <img
            src="/bg.jfif"
            alt="Our Story Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
        </div>

        {/* Content in a White Card */}
        <div className="relative z-10 max-w-7xl w-full bg-white backdrop-blur-sm p-10 md:p-16 rounded-3xl shadow-2xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2C2C2C] tracking-tight">Our Story</h2>
              <div className="w-16 h-1 bg-accent rounded-full" />
            </div>

            <div className="space-y-6 text-[#4A4A4A] text-lg leading-relaxed">
              <p>
                Martha Skincare began with a simple mission: to provide high-end, effective, and safe skincare products for the modern Sierra Leonean. We noticed a gap in the market for premium products that were both luxury and accessible in Freetown.
              </p>
              <p>
                Today, we are proud to be a trusted brand for hundreds of customers who value quality and results. Every product in our collection is carefully selected and tested to meet our rigorous standards.
              </p>
              <div className="pt-4 italic border-l-4 border-accent pl-6 text-[#6F6F6F]">
                "We don't just sell skincare; we provide the confidence that comes with healthy, glowing skin."
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
