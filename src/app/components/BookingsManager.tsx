import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, Clock, User, Phone, CheckCircle, XCircle, Trash2, RefreshCw } from "lucide-react";
import type { Booking } from "./BookingModal";
import { supabase } from "../../supabaseClient";

interface BookingsManagerProps {
  isOpen: boolean;
  onClose: () => void;
  refreshTrigger?: number;
}

export default function BookingsManager({ isOpen, onClose, refreshTrigger }: BookingsManagerProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "completed" | "cancelled">("all");

 const loadBookings = async () => {
  const { data, error } = await supabase
    .from("bookingd")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading bookings:", error);
    return;
  }

  setBookings(data || []);
};

  useEffect(() => {
  if (isOpen) {
    loadBookings();

    const channel = supabase
      .channel("realtime-bookings")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookingd",
        },
        () => {
          loadBookings();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }
}, [isOpen, refreshTrigger]);

 const updateBookingStatus = async (
  id: string,
  status: Booking["status"]
) => {
  const { error } = await supabase
    .from("bookingd")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("Error updating booking:", error);
    return;
  }

  loadBookings();
};

  const deleteBooking = async (id: string) => {
  const { error } = await supabase
    .from("bookingd")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting booking:", error);
    return;
  }

  loadBookings();
};
  const getServiceLabel = (serviceValue: string) => {
    const services: Record<string, string> = {
      basic: "Basic Cut - ₦3,500",
      premium: "Premium Cut - ₦6,000",
      combo: "Hair + Beard Combo - ₦8,500",
      vip: "VIP Grooming Package - ₦15,000"
    };
    return services[serviceValue] || serviceValue;
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filter === "all") return true;
    return booking.status === filter;
  });

  const getStatusColor = (status: Booking["status"]) => {
    const colors = {
      pending: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
      confirmed: "bg-blue-500/10 text-blue-700 border-blue-500/20",
      completed: "bg-green-500/10 text-green-700 border-green-500/20",
      cancelled: "bg-red-500/10 text-red-700 border-red-500/20"
    };
    return colors[status];
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
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#FAF8F3] shadow-2xl"
            >
              {/* Header */}
              <div className="sticky top-0 z-10 border-b border-[#0F4C3A]/10 bg-[#FAF8F3] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl text-[#0F4C3A]">Bookings Manager</h2>
                    <p className="text-[#6B7280]">
                      {filteredBookings.length} {filter === "all" ? "total" : filter} booking{filteredBookings.length !== 1 ? "s" : ""}
                    </p>
                  </div>

                  <button
                    onClick={onClose}
                    className="rounded-full bg-[#0F4C3A]/10 p-2 transition-colors hover:bg-[#0F4C3A]/20"
                  >
                    <X className="h-6 w-6 text-[#0F4C3A]" />
                  </button>
                </div>

                {/* Filters */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {["all", "pending", "confirmed", "completed", "cancelled"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilter(status as typeof filter)}
                      className={`rounded-lg px-4 py-2 text-sm capitalize transition-all ${
                        filter === status
                          ? "bg-[#0F4C3A] text-[#FAF8F3]"
                          : "bg-[#0F4C3A]/10 text-[#0F4C3A] hover:bg-[#0F4C3A]/20"
                      }`}
                    >
                      {status}
                    </button>
                  ))}

                  <button
                    onClick={loadBookings}
                    className="ml-auto rounded-lg bg-[#D4AF37]/20 px-4 py-2 text-sm text-[#1A1A1A] transition-all hover:bg-[#D4AF37]/30"
                  >
                    <RefreshCw className="inline h-4 w-4 mr-1" />
                    Refresh
                  </button>
                </div>
              </div>

              {/* Bookings List */}
              <div className="p-6">
                {filteredBookings.length === 0 ? (
                  <div className="py-12 text-center">
                    <Calendar className="mx-auto mb-4 h-16 w-16 text-[#0F4C3A]/20" />
                    <p className="text-lg text-[#6B7280]">
                      No {filter !== "all" && filter} bookings found
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredBookings.map((booking, index) => (
                      <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="rounded-xl border-2 border-[#0F4C3A]/10 bg-white p-6 shadow-sm transition-all hover:shadow-lg"
                      >
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                          {/* Booking Info */}
                          <div className="flex-1 space-y-3">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="mb-1 flex items-center gap-2 text-xl text-[#0F4C3A]">
                                  <User className="h-5 w-5" />
                                  {booking.name}
                                </h3>
                                <p className="flex items-center gap-2 text-[#6B7280]">
                                  <Phone className="h-4 w-4" />
                                  {booking.phone}
                                </p>
                              </div>
                              <span
                                className={`rounded-full border px-3 py-1 text-xs capitalize ${getStatusColor(booking.status)}`}
                              >
                                {booking.status}
                              </span>
                            </div>

                            <div className="grid gap-2 sm:grid-cols-2">
                              <div className="flex items-center gap-2 text-[#6B7280]">
                                <Calendar className="h-4 w-4 text-[#0F4C3A]" />
                                <span>
                                  {new Date(booking.date).toLocaleDateString("en-NG", {
                                    weekday: "short",
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric"
                                  })}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-[#6B7280]">
                                <Clock className="h-4 w-4 text-[#0F4C3A]" />
                                <span>{booking.time}</span>
                              </div>
                            </div>

                            <div className="rounded-lg bg-[#0F4C3A]/5 p-3">
                              <p className="text-sm text-[#1A1A1A]">
                                <strong>Service:</strong> {getServiceLabel(booking.service)}
                              </p>
                            </div>

                            <p className="text-xs text-[#6B7280]">
                              Booked on: {new Date(booking.createdAt).toLocaleString("en-NG")}
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-wrap gap-2 lg:flex-col">
                            {booking.status === "pending" && (
                              <>
                                <button
                                  onClick={() => updateBookingStatus(booking.id, "confirmed")}
                                  className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm text-white transition-all hover:bg-blue-600"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                  Confirm
                                </button>
                                <button
                                  onClick={() => updateBookingStatus(booking.id, "cancelled")}
                                  className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm text-white transition-all hover:bg-red-600"
                                >
                                  <XCircle className="h-4 w-4" />
                                  Cancel
                                </button>
                              </>
                            )}

                            {booking.status === "confirmed" && (
                              <button
                                onClick={() => updateBookingStatus(booking.id, "completed")}
                                className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-sm text-white transition-all hover:bg-green-600"
                              >
                                <CheckCircle className="h-4 w-4" />
                                Mark Complete
                              </button>
                            )}

                            <button
                              onClick={() => deleteBooking(booking.id)}
                              className="flex items-center gap-2 rounded-lg bg-gray-500 px-4 py-2 text-sm text-white transition-all hover:bg-gray-600"
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
