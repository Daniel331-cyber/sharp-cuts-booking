import { motion } from "motion/react";
import { CONTACT } from "../../contact";
import { Calendar, MapPin, Phone } from "lucide-react";

interface CTASectionProps {
  onBookingClick: () => void;
}

export default function CTASection({ onBookingClick }: CTASectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#0F4C3A] py-20 lg:py-32">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1759134198561-e2041049419c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="Barber shop interior"
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F4C3A] via-[#0F4C3A]/95 to-[#0F4C3A]/90" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 inline-block">
              <span className="rounded-full bg-[#D4AF37]/20 px-4 py-2 text-sm tracking-wide text-[#D4AF37]">
                Ready to Transform Your Look?
              </span>
            </div>

            <h2 className="mb-6 text-4xl text-[#FAF8F3] lg:text-5xl">
              Book Your Appointment Today
            </h2>

            <p className="mb-10 text-lg text-[#E8E4DC]">
              Join thousands of satisfied clients who trust us for their grooming needs. Walk in or book online—we're ready to serve you excellence.
            </p>

            {/* CTA Button */}
            <motion.button
              onClick={onBookingClick}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="group mb-12 inline-flex items-center gap-3 rounded-lg bg-[#D4AF37] px-10 py-5 transition-all hover:bg-[#E8C75B] hover:shadow-2xl hover:shadow-[#D4AF37]/40"
            >
              <Calendar className="h-6 w-6 text-[#1A1A1A]" />
              <span className="text-lg text-[#1A1A1A]">Book Appointment Now</span>
            </motion.button>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="grid gap-6 sm:grid-cols-3"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="rounded-full bg-[#D4AF37]/20 p-3">
                  <MapPin className="h-6 w-6 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="mb-1 text-sm text-[#D4AF37]">Location</h4>
                 <p className="text-[#FAF8F3]">
  {CONTACT.address}
</p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="rounded-full bg-[#D4AF37]/20 p-3">
                  <Phone className="h-6 w-6 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="mb-1 text-sm text-[#D4AF37]">Call Us</h4>
                 <p className="text-[#FAF8F3]">
  {CONTACT.phone}
</p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="rounded-full bg-[#D4AF37]/20 p-3">
                  <Calendar className="h-6 w-6 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="mb-1 text-sm text-[#D4AF37]">Hours</h4>
                  <p className="text-[#FAF8F3]">
  {CONTACT.hours}
</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
