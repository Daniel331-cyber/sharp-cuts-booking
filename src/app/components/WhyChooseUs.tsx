import { motion } from "motion/react";
import { Shield, Star, Sparkles, Clock } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: Star,
      title: "Expert Barbers",
      description: "Trained professionals with years of experience in modern and traditional styles."
    },
    {
      icon: Shield,
      title: "Hygiene First",
      description: "Sterilized tools, clean environment, and strict hygiene protocols for your safety."
    },
    {
      icon: Sparkles,
      title: "Premium Products",
      description: "We use only high-quality grooming products for the best results."
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Easy online booking with flexible time slots to fit your busy schedule."
    }
  ];

  return (
    <section className="relative overflow-hidden bg-[#0A3528] py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <div className="mb-4">
            <span className="rounded-full bg-[#D4AF37]/20 px-4 py-2 text-sm tracking-wide text-[#D4AF37]">
              Why Choose Us
            </span>
          </div>
          <h2 className="mb-4 text-4xl text-[#FAF8F3] lg:text-5xl">
            Excellence In Every Detail
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#E8E4DC]">
            We're not just another barber shop. We're your grooming partners, committed to making you look and feel your absolute best.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              className="group"
            >
              <div className="relative">
                {/* Icon Container */}
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D4AF37] transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#D4AF37]/30">
                  <feature.icon className="h-8 w-8 text-[#0A3528]" />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl text-[#FAF8F3]">
                  {feature.title}
                </h3>
                <p className="text-[#E8E4DC]/80">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
