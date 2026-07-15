import { motion } from "motion/react";
import { Calendar, Scissors } from "lucide-react";

interface HeroProps {
  onBookingClick: () => void;
}

export default function Hero({ onBookingClick }: HeroProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1668753700627-f76915cfb515?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="Professional barber"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F4C3A]/95 via-[#0F4C3A]/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#D4AF37]/20 px-4 py-2 backdrop-blur-sm"
            >
              <Scissors className="h-5 w-5 text-[#D4AF37]" />
              <span className="text-sm tracking-wide text-[#FAF8F3]">Premium Grooming Since 2020</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mb-6 text-5xl font-bold leading-tight text-[#FAF8F3] sm:text-6xl lg:text-7xl"
            >
              Sharp Cuts.
              <br />
              Clean Confidence.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mb-8 max-w-2xl text-lg text-[#E8E4DC] sm:text-xl"
            >
              Experience premium grooming with Nigeria's finest barbers. From classic cuts to modern styles, we bring excellence to every detail.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <button
                onClick={onBookingClick}
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[#D4AF37] px-8 py-4 transition-all hover:bg-[#E8C75B] hover:shadow-lg hover:shadow-[#D4AF37]/30"
              >
                <Calendar className="h-5 w-5 text-[#1A1A1A]" />
                <span className="text-[#1A1A1A]">Book Appointment</span>
              </button>

              <button className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#FAF8F3]/30 bg-transparent px-8 py-4 text-[#FAF8F3] backdrop-blur-sm transition-all hover:border-[#FAF8F3] hover:bg-[#FAF8F3]/10">
                <span>View Services</span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="h-12 w-8 rounded-full border-2 border-[#D4AF37] p-2"
        >
          <div className="h-2 w-2 rounded-full bg-[#D4AF37]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
