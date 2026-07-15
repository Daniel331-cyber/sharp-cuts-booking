import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, Clock, User, Phone, Check, MessageSquare, Loader2 } from "lucide-react";
import { supabase } from "../../supabaseClient";
interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingComplete?: () => void;
}

export interface Booking {
  id: string;
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  createdAt: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

export default function BookingModal({ isOpen, onClose, onBookingComplete }: BookingModalProps) {
  const [step, setStep] = useState<"booking" | "processing" | "success">("booking");
  const [showSMSNotification, setShowSMSNotification] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    date: "",
    time: ""
  });
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  const services = [
    { value: "basic", label: "Basic Cut - ₦3,500" },
    { value: "premium", label: "Premium Cut - ₦6,000" },
    { value: "combo", label: "Hair + Beard Combo - ₦8,500" },
    { value: "vip", label: "VIP Grooming Package - ₦15,000" }
  ];

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
    "05:00 PM", "06:00 PM", "07:00 PM"
  ];

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    // Go directly to processing (no payment needed)
    setStep("processing");

    // Save booking to localStorage
    const booking: Booking = {
      id: Date.now().toString(),
      name: formData.name,
      phone: formData.phone,
      service: formData.service,
      date: formData.date,
      time: formData.time,
      createdAt: new Date().toISOString(),
      status: "pending"
    };
    const { error } = await supabase
  .from("bookingd")
  .insert([
    {
      name: booking.name,
      phone: booking.phone,
      service: booking.service,
      date: booking.date,
      time: booking.time,
      status: "pending"
    }
  ]);

    if (error) {
      console.error("Supabase Error:", error);
      alert("Failed to save booking");
      return;
    }
    // Get the admin device token
const { data: tokens } = await supabase
  .from("device_tokens")
  .select("token")
  .limit(1);

if (tokens && tokens.length > 0) {
  const token = tokens[0].token;

  const { data, error } = await supabase.functions.invoke(
    "send-booking-notification",
    {
      body: {
        token,
        name: booking.name,
        time: booking.time,
      },
    }
  );

  console.log("Notification Result:", data);

  if (error) {
    console.error("Notification Error:", error);
  }
}

    // Simulate SMS sending
    setTimeout(() => {
      setStep("success");

      // Show notification
      setTimeout(() => {
        setShowSMSNotification(true);
      }, 500);

      if (onBookingComplete) {
        onBookingComplete();
      }
    }, 1500);
  };

  const handleClose = () => {
    setStep("booking");
    setShowSMSNotification(false);
    setFormData({ name: "", phone: "", service: "", date: "", time: "" });
    onClose();
  };

  const getServicePrice = () => {
    const prices: Record<string, string> = {
      basic: "₦3,500",
      premium: "₦6,000",
      combo: "₦8,500",
      vip: "₦15,000"
    };
    return prices[formData.service] || "₦0";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#FAF8F3] shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute right-4 top-4 rounded-full bg-[#0F4C3A]/10 p-2 transition-colors hover:bg-[#0F4C3A]/20"
              >
                <X className="h-5 w-5 text-[#0F4C3A]" />
              </button>

              {/* Booking Form */}
              {step === "booking" && (
                <div className="p-8">
                  <div className="mb-8">
                    <h2 className="mb-2 text-3xl text-[#0F4C3A]">Book Your Appointment</h2>
                    <p className="text-[#6B7280]">Fill in your details to reserve your spot</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label className="mb-2 flex items-center gap-2 text-[#1A1A1A]">
                        <User className="h-5 w-5 text-[#0F4C3A]" />
                        Full Name
                      </label>
                      <input
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            name: e.target.value,
                          })
                        }
                        className="w-full rounded-lg border border-[#0F4C3A]/20 bg-white px-4 py-3 text-[#1A1A1A] transition-colors focus:border-[#0F4C3A] focus:outline-none"
                        placeholder="Enter your full name"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="mb-2 flex items-center gap-2 text-[#1A1A1A]">
                        <Phone className="h-5 w-5 text-[#0F4C3A]" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-lg border border-[#0F4C3A]/20 bg-white px-4 py-3 text-[#1A1A1A] transition-colors focus:border-[#0F4C3A] focus:outline-none"
                        placeholder="+234 800 000 0000"
                      />
                    </div>

                    {/* Service */}
                    <div>
                      <label className="mb-2 block text-[#1A1A1A]">
                        Select Service
                      </label>
                      <select
                        required
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full rounded-lg border border-[#0F4C3A]/20 bg-white px-4 py-3 text-[#1A1A1A] transition-colors focus:border-[#0F4C3A] focus:outline-none"
                      >
                        <option value="">Choose a service...</option>
                        {services.map((service) => (
                          <option key={service.value} value={service.value}>
                            {service.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Date */}
                    <div>
                      <label className="mb-2 flex items-center gap-2 text-[#1A1A1A]">
                        <Calendar className="h-5 w-5 text-[#0F4C3A]" />
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                       onChange={async (e) => {
  const selectedDate = e.target.value;

  setFormData({
    ...formData,
    date: selectedDate,
    time: "", // reset time when date changes
  });

  const { data } = await supabase
    .from("bookingd")
    .select("time")
    .eq("date", selectedDate);

  if (data) {
    const blockedTimes: string[] = [];

    data.forEach((item) => {
      const bookedIndex = timeSlots.indexOf(item.time);

      if (bookedIndex !== -1) {
        // block booked time
        blockedTimes.push(timeSlots[bookedIndex]);

        // block next 2 hours
        if (timeSlots[bookedIndex + 1]) {
          blockedTimes.push(timeSlots[bookedIndex + 1]);
        }
        if (timeSlots[bookedIndex + 2]) {
          blockedTimes.push(timeSlots[bookedIndex + 2]);
        }
      }
    });

    setBookedSlots(blockedTimes);
  }
}}
                        className="w-full rounded-lg border border-[#0F4C3A]/20 bg-white px-4 py-3 text-[#1A1A1A] transition-colors focus:border-[#0F4C3A] focus:outline-none"
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>

                    {/* Time */}
                    <div>
                      <label className="mb-2 flex items-center gap-2 text-[#1A1A1A]">
                        <Clock className="h-5 w-5 text-[#0F4C3A]" />
                        Preferred Time
                      </label>
                      <select
                        required
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full rounded-lg border border-[#0F4C3A]/20 bg-white px-4 py-3 text-[#1A1A1A] transition-colors focus:border-[#0F4C3A] focus:outline-none"
                      >
                        <option value="">Select time...</option>
                        {timeSlots.map((time) => {
  const isBooked = bookedSlots.includes(time);

  return (
    <option
      key={time}
      value={time}
      disabled={isBooked}
    >
      {isBooked ? `${time} (Booked)` : time}
    </option>
  );
})}
                      </select>
                    </div>

                    {/* Submit Button */}
                    <div className="rounded-lg bg-[#D4AF37]/10 p-4 mb-4">
                      <p className="text-sm text-[#1A1A1A]">
                        <strong>Note:</strong> Payment will be collected in person during your appointment.
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-lg bg-[#0F4C3A] px-8 py-4 text-[#FAF8F3] transition-all hover:bg-[#0A3528] hover:shadow-lg"
                    >
                      Confirm Booking
                    </button>
                  </form>
                </div>
              )}

              {/* Processing State */}
              {step === "processing" && (
                <div className="p-8 text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="mx-auto mb-6 flex h-24 w-24 items-center justify-center"
                  >
                    <Loader2 className="h-24 w-24 text-[#0F4C3A]" />
                  </motion.div>

                  <h2 className="mb-4 text-3xl text-[#0F4C3A]">Confirming Booking...</h2>
                  <p className="text-lg text-[#6B7280]">
                    Please wait while we confirm your appointment and send SMS confirmation
                  </p>

                  <div className="mt-8 space-y-3">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center justify-center gap-3 text-[#6B7280]"
                    >
                      <div className="h-2 w-2 rounded-full bg-[#0F4C3A]" />
                      Confirming appointment slot...
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                      className="flex items-center justify-center gap-3 text-[#6B7280]"
                    >
                      <div className="h-2 w-2 rounded-full bg-[#0F4C3A]" />
                      Sending SMS confirmation to {formData.phone}...
                    </motion.div>
                  </div>
                </div>
              )}

              {/* Success State */}
              {step === "success" && (
                <div className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.6 }}
                    className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#0F4C3A]"
                  >
                    <Check className="h-12 w-12 text-[#D4AF37]" />
                  </motion.div>

                  <h2 className="mb-4 text-3xl text-[#0F4C3A]">
  Booking Submitted Successfully!
</h2>
                  <p className="mb-8 text-lg text-[#6B7280]">
 Booking received successfully. We will contact you on WhatsApp/SMS to confirm your appointment.
</p>

                    {showSMSNotification && (
                      <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="mb-6 rounded-xl border-2 border-[#0F4C3A] bg-[#0F4C3A]/5 p-6"
                      >
                        <div className="mb-4 flex items-center justify-center gap-3">
                          <div className="rounded-full bg-[#0F4C3A] p-2">
                            <MessageSquare className="h-5 w-5 text-[#D4AF37]" />
                          </div>
                          <h3 className="text-lg text-[#0F4C3A]">SMS Confirmation Sent!</h3>
                        </div>

                        {/* SMS Preview */}
                        <div className="mb-4 rounded-lg bg-white p-4 text-left shadow-sm">
                          <div className="mb-2 flex items-center gap-2">
                            <Phone className="h-4 w-4 text-[#0F4C3A]" />
                            <span className="text-sm text-[#6B7280]">To: {formData.phone}</span>
                          </div>
                          <div className="text-sm text-[#1A1A1A]">
                            <p className="mb-2">
                              <strong>Sharp Cuts Barber Shop</strong>
                            </p>
                            <p className="mb-2">
                              Hi {formData.name.split(' ')[0]}! Your booking has been received and is awaiting approval. we will contact you on whatsapp/sms soon to confirm your appointment.
                            </p>
                            <p className="mb-1">📅 Date: {new Date(formData.date).toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            <p className="mb-1">🕐 Time: {formData.time}</p>
                            <p className="mb-1">💈 Service: {services.find(s => s.value === formData.service)?.label.split(' - ')[0]}</p>
                            <p className="mb-2">💰 Amount: {getServicePrice()} (Pay on arrival)</p>
                            <p className="text-xs text-[#6B7280]">
                              123 Victoria Island, Lagos. Call: +234 803 456 7890
                            </p>
                          </div>
                        </div>

                        <p className="text-xs text-[#6B7280]">
                          <strong>Demo Note:</strong> In production, this SMS would be sent via Termii, Africa's Talking, or similar SMS gateway service.
                        </p>
                      </motion.div>
                    )}

                  <div className="mb-8 rounded-xl bg-[#0F4C3A]/5 p-6">
                    <h3 className="mb-4 text-[#0F4C3A]">Appointment Details</h3>
                    <div className="space-y-2 text-left">
                      <div className="flex justify-between">
                        <span className="text-[#6B7280]">Name:</span>
                        <span className="text-[#1A1A1A]">{formData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6B7280]">Service:</span>
                        <span className="text-[#1A1A1A]">
                          {services.find(s => s.value === formData.service)?.label}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6B7280]">Date:</span>
                        <span className="text-[#1A1A1A]">{formData.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6B7280]">Time:</span>
                        <span className="text-[#1A1A1A]">{formData.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6B7280]">Status:</span>
                        <span className="font-medium text-yellow-600">Pending Approval</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6 rounded-lg bg-[#D4AF37]/10 p-4">
                    <p className="text-sm text-[#1A1A1A]">
                      <strong>Important:</strong> Wait for admin approval before arriving for your appointment.
                    </p>
                  </div>

                  <button
                    onClick={handleClose}
                    className="w-full rounded-lg bg-[#0F4C3A] px-8 py-4 text-[#FAF8F3] transition-all hover:bg-[#0A3528]"
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
