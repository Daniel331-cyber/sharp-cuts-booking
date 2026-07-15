import { useState, useEffect, type ComponentType } from "react";
import { ClipboardList } from "lucide-react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import BookingModal from "./components/BookingModal";
import BookingsManager from "./components/BookingsManager";
import NewBookingNotification from "./components/NewBookingNotification";


const BookingModalComponent = BookingModal as unknown as ComponentType<{
  isOpen: boolean;
  onClose: () => void;
  onBookingComplete: () => void;
}>;

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isBookingsManagerOpen, setIsBookingsManagerOpen] = useState(false);
  const [bookingsRefreshTrigger, setBookingsRefreshTrigger] = useState(0);
  const [pendingBookingsCount, setPendingBookingsCount] = useState(0);
  const [showNewBookingNotification, setShowNewBookingNotification] = useState(false);
  const [latestBookingName, setLatestBookingName] = useState("");


  useEffect(() => {
    // Update pending bookings count
    const updateCount = () => {
      const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
      const pending = bookings.filter((b: any) => b.status === "pending").length;
      setPendingBookingsCount(pending);
    };

    updateCount();
    // Check every 5 seconds for new bookings
    const interval = setInterval(updateCount, 5000);
    return () => clearInterval(interval);
  }, [bookingsRefreshTrigger]);

  const handleBookingComplete = () => {
    // Get the latest booking to show notification
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    if (bookings.length > 0) {
      const latest = bookings[bookings.length - 1];
      setLatestBookingName(latest.name);
      setShowNewBookingNotification(true);
    }

    // Trigger refresh of bookings manager
    setBookingsRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3]">
      <Header onBookingClick={() => setIsBookingOpen(true)} />

      <main>
        <section id="home">
          <Hero onBookingClick={() => setIsBookingOpen(true)} />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="services">
          <Services onBookingClick={() => setIsBookingOpen(true)} />
        </section>

        <section id="gallery">
          <Gallery />
        </section>

        <WhyChooseUs />

        <Testimonials />

        <section id="contact">
          <CTASection onBookingClick={() => setIsBookingOpen(true)} />
        </section>
      </main>

      <Footer />

      {/*
      <button
        onClick={() => setIsBookingsManagerOpen(true)}
        className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#D4AF37] shadow-lg transition-all hover:scale-110 hover:shadow-xl"
        title="View Bookings"
      >
        <ClipboardList className="h-6 w-6 text-[#1A1A1A]" />
        {pendingBookingsCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white animate-pulse">
            {pendingBookingsCount}
          </span>
        )}
      </button>
      */}

      <BookingModalComponent
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onBookingComplete={handleBookingComplete}
      />

{/*
      <BookingsManager
        isOpen={isBookingsManagerOpen}
        onClose={() => setIsBookingsManagerOpen(false)}
        refreshTrigger={bookingsRefreshTrigger}
      />
*/}

      <NewBookingNotification
        show={showNewBookingNotification}
        bookingName={latestBookingName}
        onClose={() => setShowNewBookingNotification(false)}
      />
    </div>
  );
}
