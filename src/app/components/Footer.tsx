import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from "lucide-react";
import { CONTACT } from "../../contact";

export default function Footer() {
  return (
    <footer className="bg-[#0A3528] py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
           <h3 className="mb-4 text-2xl text-[#D4AF37]">
  {CONTACT.businessName}
</h3>
            <p className="mb-4 text-[#E8E4DC]/80">
              Nigeria's premier grooming destination. Excellence in every cut, confidence in every style.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="rounded-full bg-[#D4AF37]/20 p-2 transition-colors hover:bg-[#D4AF37]"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-[#FAF8F3]" />
              </a>
              <a
                href="#"
                className="rounded-full bg-[#D4AF37]/20 p-2 transition-colors hover:bg-[#D4AF37]"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-[#FAF8F3]" />
              </a>
              <a
                href="#"
                className="rounded-full bg-[#D4AF37]/20 p-2 transition-colors hover:bg-[#D4AF37]"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 text-[#FAF8F3]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-[#FAF8F3]">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#E8E4DC]/80 transition-colors hover:text-[#D4AF37]">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-[#E8E4DC]/80 transition-colors hover:text-[#D4AF37]">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-[#E8E4DC]/80 transition-colors hover:text-[#D4AF37]">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#" className="text-[#E8E4DC]/80 transition-colors hover:text-[#D4AF37]">
                  Book Now
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-[#FAF8F3]">Services</h4>
            <ul className="space-y-2">
              <li className="text-[#E8E4DC]/80">Haircuts & Styling</li>
              <li className="text-[#E8E4DC]/80">Beard Grooming</li>
              <li className="text-[#E8E4DC]/80">Hot Towel Shave</li>
              <li className="text-[#E8E4DC]/80">VIP Packages</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-[#FAF8F3]">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-[#D4AF37]" />
                <span className="text-[#E8E4DC]/80">
  {CONTACT.address}
</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#D4AF37]" />
                <span className="text-[#E8E4DC]/80">
  {CONTACT.phone}
</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#D4AF37]" />
                <span className="text-[#E8E4DC]/80">
  {CONTACT.email}
</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-[#FAF8F3]/10 pt-8 text-center">
          <p className="text-[#E8E4DC]/60">
            © 2026 Sharp Cuts. All rights reserved. Crafted with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
