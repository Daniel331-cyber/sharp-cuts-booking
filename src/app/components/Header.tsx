import { useState } from "react";
import { motion } from "motion/react";
import { Menu, X, Scissors } from "lucide-react";

interface HeaderProps {
  onBookingClick: () => void;
}

export default function Header({ onBookingClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <header className="fixed top-0 z-40 w-full bg-[#FAF8F3]/95 backdrop-blur-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2"
          >
            <div className="rounded-full bg-[#0F4C3A] p-2">
              <Scissors className="h-6 w-6 text-[#D4AF37]" />
            </div>
            <span className="text-2xl text-[#0F4C3A]">Sharp Cuts</span>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden items-center gap-8 md:flex"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[#1A1A1A] transition-colors hover:text-[#0F4C3A]"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={onBookingClick}
              className="rounded-lg bg-[#0F4C3A] px-6 py-2 text-[#FAF8F3] transition-all hover:bg-[#0A3528] hover:shadow-lg"
            >
              Book Now
            </button>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg p-2 text-[#0F4C3A] md:hidden"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-[#0F4C3A]/10 py-4 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[#1A1A1A] transition-colors hover:text-[#0F4C3A]"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => {
                  onBookingClick();
                  setIsMenuOpen(false);
                }}
                className="rounded-lg bg-[#0F4C3A] px-6 py-2 text-[#FAF8F3] transition-all hover:bg-[#0A3528]"
              >
                Book Now
              </button>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}
