import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bell, X } from "lucide-react";

interface NewBookingNotificationProps {
  show: boolean;
  bookingName: string;
  onClose: () => void;
}

export default function NewBookingNotification({ show, bookingName, onClose }: NewBookingNotificationProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: 50 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          className="fixed right-6 top-24 z-50 w-80 rounded-xl border-2 border-[#D4AF37] bg-[#FAF8F3] p-4 shadow-2xl"
        >
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-[#D4AF37] p-2">
              <Bell className="h-5 w-5 text-[#1A1A1A]" />
            </div>
            <div className="flex-1">
              <h4 className="mb-1 text-[#0F4C3A]">New Booking!</h4>
              <p className="text-sm text-[#6B7280]">
                {bookingName} just made a booking
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-full bg-[#0F4C3A]/10 p-1 transition-colors hover:bg-[#0F4C3A]/20"
            >
              <X className="h-4 w-4 text-[#0F4C3A]" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
