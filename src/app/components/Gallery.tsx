import { motion } from "motion/react";

export default function Gallery() {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1668753700627-f76915cfb515?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      alt: "Fresh fade haircut",
      category: "Fades"
    },
    {
      url: "https://images.unsplash.com/photo-1668752600261-e56e7f3780b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      alt: "Professional styling",
      category: "Style"
    },
    {
      url: "https://images.unsplash.com/photo-1632255659639-5bc132763f59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      alt: "Clean line-up",
      category: "Line-ups"
    },
    {
      url: "https://images.unsplash.com/photo-1761148438883-e34e0289a214?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      alt: "Beard grooming",
      category: "Beard"
    },
    {
      url: "https://images.unsplash.com/photo-1632820941593-905238e6db43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      alt: "Modern cut",
      category: "Modern"
    },
    {
      url: "https://images.unsplash.com/photo-1584598437775-a34887172533?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      alt: "Professional finish",
      category: "Premium"
    }
  ];

  return (
    <section className="bg-[#FAF8F3] py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <div className="mb-4">
            <span className="rounded-full bg-[#0F4C3A]/10 px-4 py-2 text-sm tracking-wide text-[#0F4C3A]">
              Gallery
            </span>
          </div>
          <h2 className="mb-4 text-4xl text-[#1A1A1A] lg:text-5xl">
            Our Signature Styles
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#6B7280]">
            Browse our portfolio of premium cuts and see the craftsmanship that sets us apart.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C3A]/90 via-[#0F4C3A]/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute bottom-6 left-6">
                  <div className="mb-2 inline-block rounded-full bg-[#D4AF37] px-3 py-1">
                    <span className="text-sm text-[#1A1A1A]">{image.category}</span>
                  </div>
                  <h3 className="text-xl text-[#FAF8F3]">{image.alt}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
