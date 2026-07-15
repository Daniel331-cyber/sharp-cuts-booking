import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Chukwudi Okafor",
      role: "Business Executive",
      image: "https://images.unsplash.com/photo-1632820941593-905238e6db43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
      text: "Best barber shop in Lagos! The attention to detail is incredible. My fade is always perfect, and the service is top-notch.",
      rating: 5
    },
    {
      name: "Tunde Adeyemi",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1668752600261-e56e7f3780b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
      text: "I've been coming here for 2 years now. They understand exactly what I want and always deliver. Worth every naira!",
      rating: 5
    },
    {
      name: "Emmanuel Nwosu",
      role: "Entrepreneur",
      image: "https://images.unsplash.com/photo-1584598437775-a34887172533?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
      text: "The VIP package is amazing! From the hot towel to the face massage, it's a complete grooming experience. Highly recommend!",
      rating: 5
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
              Testimonials
            </span>
          </div>
          <h2 className="mb-4 text-4xl text-[#1A1A1A] lg:text-5xl">
            What Our Clients Say
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#6B7280]">
            Don't just take our word for it. Hear from the people who trust us with their style.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              className="group relative rounded-2xl bg-white p-8 shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <Quote className="h-10 w-10 text-[#D4AF37]/20" />
              </div>

              {/* Rating */}
              <div className="mb-4 flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-[#D4AF37] text-[#D4AF37]" />
                ))}
              </div>

              {/* Text */}
              <p className="mb-6 text-[#6B7280]">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-[#1A1A1A]">{testimonial.name}</h4>
                  <p className="text-sm text-[#6B7280]">{testimonial.role}</p>
                </div>
              </div>

              {/* Decorative Element */}
              <div className="absolute right-8 top-8 h-20 w-20 rounded-full bg-[#D4AF37]/5 transition-transform duration-300 group-hover:scale-150" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
