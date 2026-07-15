import { motion } from "motion/react";
import { Award, Clock, Users } from "lucide-react";

export default function About() {
  const stats = [
    {
      icon: Users,
      value: "5,000+",
      label: "Happy Clients"
    },
    {
      icon: Award,
      value: "15+",
      label: "Expert Barbers"
    },
    {
      icon: Clock,
      value: "6 Years",
      label: "Experience"
    }
  ];

  return (
    <section className="bg-[#FAF8F3] py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-[500px] overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1761148438883-e34e0289a214?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Barber at work"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C3A]/50 to-transparent" />
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-6 -right-6 rounded-2xl bg-[#D4AF37] p-6 shadow-xl"
            >
              <div className="text-center">
                <div className="mb-1 text-4xl text-[#1A1A1A]">98%</div>
                <div className="text-sm text-[#1A1A1A]/80">Client Satisfaction</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-4 inline-block">
              <span className="rounded-full bg-[#0F4C3A]/10 px-4 py-2 text-sm tracking-wide text-[#0F4C3A]">
                About Us
              </span>
            </div>

            <h2 className="mb-6 text-4xl text-[#1A1A1A] lg:text-5xl">
              Nigeria's Premier Grooming Experience
            </h2>

            <p className="mb-6 text-lg text-[#6B7280]">
              We've redefined grooming excellence in Nigeria. Our master barbers combine traditional techniques with modern precision to deliver cuts that turn heads.
            </p>

            <p className="mb-8 text-lg text-[#6B7280]">
              From fresh fades to sharp line-ups, every service is crafted with attention to detail. We don't just cut hair—we build confidence and create style statements.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 * index, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="mb-3 flex justify-center">
                    <div className="rounded-full bg-[#0F4C3A] p-3">
                      <stat.icon className="h-6 w-6 text-[#FAF8F3]" />
                    </div>
                  </div>
                  <div className="mb-1 text-2xl text-[#1A1A1A]">{stat.value}</div>
                  <div className="text-sm text-[#6B7280]">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
