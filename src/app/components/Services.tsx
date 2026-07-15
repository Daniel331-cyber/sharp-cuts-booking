import { motion } from "motion/react";
import { Check, Sparkles } from "lucide-react";

interface ServicesProps {
  onBookingClick: () => void;
}

export default function Services({ onBookingClick }: ServicesProps) {
  const services = [
    {
      name: "Basic Cut",
      price: "₦3,500",
      popular: false,
      features: [
        "Standard haircut",
        "Basic styling",
        "Hair wash included",
        "20 minutes session"
      ]
    },
    {
      name: "Premium Cut",
      price: "₦6,000",
      popular: true,
      features: [
        "Advanced cut & styling",
        "Beard trim included",
        "Hot towel treatment",
        "Premium products",
        "30 minutes session"
      ]
    },
    {
      name: "Hair + Beard Combo",
      price: "₦8,500",
      popular: false,
      features: [
        "Complete haircut",
        "Full beard grooming",
        "Line-up perfection",
        "Hot towel treatment",
        "Premium finishing",
        "45 minutes session"
      ]
    },
    {
      name: "VIP Grooming Package",
      price: "₦15,000",
      popular: false,
      features: [
        "Executive haircut",
        "Professional beard sculpting",
        "Face massage & treatment",
        "Premium product application",
        "Complimentary drink",
        "Priority booking",
        "60 minutes luxury session"
      ]
    }
  ];

  return (
    <section className="bg-[#0F4C3A] py-20 lg:py-32">
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
            <span className="rounded-full bg-[#D4AF37]/20 px-4 py-2 text-sm tracking-wide text-[#D4AF37]">
              Our Services
            </span>
          </div>
          <h2 className="mb-4 text-4xl text-[#FAF8F3] lg:text-5xl">
            Choose Your Perfect Style
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#E8E4DC]">
            Premium grooming packages tailored to your needs. Every service includes our signature attention to detail.
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              className={`relative rounded-2xl p-8 transition-all hover:-translate-y-2 hover:shadow-2xl ${
                service.popular
                  ? "bg-[#D4AF37] shadow-xl shadow-[#D4AF37]/20"
                  : "bg-[#FAF8F3]"
              }`}
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 rounded-full bg-[#0F4C3A] px-4 py-1.5">
                    <Sparkles className="h-4 w-4 text-[#D4AF37]" />
                    <span className="text-sm text-[#FAF8F3]">Most Popular</span>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3
                  className={`mb-2 text-2xl ${
                    service.popular ? "text-[#1A1A1A]" : "text-[#0F4C3A]"
                  }`}
                >
                  {service.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span
                    className={`text-4xl ${
                      service.popular ? "text-[#1A1A1A]" : "text-[#0F4C3A]"
                    }`}
                  >
                    {service.price}
                  </span>
                </div>
              </div>

              <ul className="mb-8 space-y-3">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 rounded-full p-0.5 ${
                        service.popular ? "bg-[#0F4C3A]" : "bg-[#0F4C3A]"
                      }`}
                    >
                      <Check
                        className={`h-4 w-4 ${
                          service.popular ? "text-[#D4AF37]" : "text-[#D4AF37]"
                        }`}
                      />
                    </div>
                    <span
                      className={`text-sm ${
                        service.popular ? "text-[#1A1A1A]" : "text-[#6B7280]"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={onBookingClick}
                className={`w-full rounded-lg py-3 transition-all ${
                  service.popular
                    ? "bg-[#0F4C3A] text-[#FAF8F3] hover:bg-[#0A3528]"
                    : "bg-[#0F4C3A] text-[#FAF8F3] hover:bg-[#0A3528]"
                }`}
              >
                Book Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
