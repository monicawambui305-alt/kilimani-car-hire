import React, { useState, useEffect } from 'react';
import {
  Phone,
  Shield,
  Car,
  Calendar,
  Sparkles,
  ArrowRight,
  MapPin,
  Clock,
  Star,
  Scale
} from 'lucide-react';
import { WhatsAppIcon } from './components/icons/WhatsAppIcon';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FleetShowcase } from './components/FleetShowcase';
import { AirbnbComboSection } from './components/AirbnbComboSection';
import { RateCalculator } from './components/RateCalculator';
import { FAQSection } from './components/FAQSection';
import { VehicleCompareModal } from './components/VehicleCompareModal';
import { BlogSection } from './components/BlogSection';
import { ReviewsAndLocation } from './components/ReviewsAndLocation';
import { ContactUs } from './components/ContactUs';
import { LoyaltyRewards } from './components/LoyaltyRewards';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { FLEET_DATA, Vehicle, COMPANY_INFO } from './data/fleet';
import { sound } from './utils/audio';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  const [compareVehicleId, setCompareVehicleId] = useState<string>(FLEET_DATA[0].id);
  const [preselectedVehicleId, setPreselectedVehicleId] = useState<string>(FLEET_DATA[0].id);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [currency, setCurrency] = useState<'KES' | 'USD'>('KES');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Set page title dynamically based on active tab for enhanced SEO
  useEffect(() => {
    const titles: Record<string, string> = {
      home: 'Prime Carhire Nairobi | Executive & Safari Fleet on Ojijo Rd',
      fleet: 'Executive Showroom Fleet | Land Cruiser V8, Mercedes, Prado & Voxy',
      faq: 'Rental FAQs & Insurance Guidelines | Prime Carhire Ojijo Rd',
      'airbnb-combos': 'Apartment Doorstep Delivery & Airport Escort | Prime Carhire Nairobi',
      calculator: 'Custom Rental Rate Configurator | Prime Carhire Nairobi',
      blogs: 'Nairobi & Kenya Safari Car Hire Guides | Prime Carhire Advisory',
      about: 'Ojijo Rd Depot & Verified Reviews | Prime Carhire Nairobi',
      loyalty: 'Loyalty Rewards & VIP Privileges | Prime Carhire Nairobi',
      contact: 'Contact Us | Prime Carhire Ojijo Rd Nairobi (0104 709282)'
    };
    if (titles[activeTab]) {
      document.title = titles[activeTab];
    }
  }, [activeTab]);

  const handleOpenBooking = () => {
    sound.playCarChirp();
    setBookingDetails(null);
    setIsBookingModalOpen(true);
  };

  const handleSelectCarForBooking = (car: Vehicle) => {
    sound.playCarChirp();
    setPreselectedVehicleId(car.id);
    setBookingDetails({ vehicleId: car.id });
    setIsBookingModalOpen(true);
  };

  const handleOpenBookingWithDetails = (details: any) => {
    sound.playCarChirp();
    setBookingDetails(details);
    setIsBookingModalOpen(true);
  };

  const handleOpenCompareModal = (vehicleAId?: string) => {
    sound.playClick();
    if (vehicleAId) {
      setCompareVehicleId(vehicleAId);
    }
    setIsCompareModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-400 selection:text-slate-950">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBooking={handleOpenBooking}
        onOpenCompare={() => handleOpenCompareModal()}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Page Content Routing */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <Hero
              onSelectVehicle={setPreselectedVehicleId}
              onOpenBookingWithDetails={handleOpenBookingWithDetails}
              setActiveTab={setActiveTab}
              onOpenCompare={() => handleOpenCompareModal()}
            />

            {/* Showcase Fleet */}
            <FleetShowcase
              onSelectCarForBooking={handleSelectCarForBooking}
              onOpenCompareModal={handleOpenCompareModal}
              currency={currency}
            />

            {/* Side-by-Side Spec Compare Feature Strip */}
            <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950/70 border-t border-b border-cyan-500/20 py-10 px-4">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    <Scale className="w-4 h-4" />
                    <span>Interactive Fleet Spec Analyzer</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                    Need Help Deciding Between Our Land Cruiser V8, Mercedes, or Prado?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                    Compare powertrains, fuel economy, seating capacities, and baggage space side-by-side with our comparison tool.
                  </p>
                </div>
                <button
                  onClick={() => handleOpenCompareModal()}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs uppercase tracking-wider whitespace-nowrap transition-all shadow-lg shadow-cyan-500/20 shrink-0 flex items-center gap-2 cursor-pointer"
                >
                  <Scale className="w-4 h-4" />
                  <span>Launch Side-by-Side Comparison</span>
                </button>
              </div>
            </section>

            {/* Airbnb Combo Section with High-Clarity Background */}
            <AirbnbComboSection onOpenBooking={handleOpenBooking} />

            {/* Dedicated FAQ Section */}
            <FAQSection />

            {/* Interactive Calculator Section */}
            <RateCalculator
              initialVehicleId={preselectedVehicleId}
              currency={currency}
              onOpenBookingWithQuote={handleOpenBookingWithDetails}
            />

            {/* SEO Blogs Preview with Background Image */}
            <BlogSection onOpenBooking={handleOpenBooking} />

            {/* Google Reviews & Plus Code Map with Background Image */}
            <ReviewsAndLocation />

            {/* Repeat Client Loyalty Rewards & VIP Perks */}
            <LoyaltyRewards />

            {/* Dedicated Contact Us Section on Homepage */}
            <ContactUs />
          </>
        )}

        {activeTab === 'fleet' && (
          <div className="pt-4 sm:pt-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
              <div className="text-xs font-semibold text-cyan-400 tracking-wider uppercase mb-1">
                Prime Carhire Showroom
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white font-display break-words">
                All Available Vehicles & 4x4 SUVs
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
                Browse our complete, company-owned fleet along Ojijo Rd, Nairobi. Every vehicle comes with comprehensive insurance, regular mechanical inspections, and optional chauffeur service.
              </p>
            </div>
            <FleetShowcase
              onSelectCarForBooking={handleSelectCarForBooking}
              onOpenCompareModal={handleOpenCompareModal}
              currency={currency}
            />
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="pt-2 sm:pt-6">
            <FAQSection />
            <ReviewsAndLocation />
          </div>
        )}

        {activeTab === 'airbnb-combos' && (
          <div className="pt-2 sm:pt-6">
            <AirbnbComboSection onOpenBooking={handleOpenBooking} />
            <ReviewsAndLocation />
          </div>
        )}

        {activeTab === 'calculator' && (
          <div className="pt-2 sm:pt-6">
            <RateCalculator
              initialVehicleId={preselectedVehicleId}
              currency={currency}
              onOpenBookingWithQuote={handleOpenBookingWithDetails}
            />
          </div>
        )}

        {activeTab === 'blogs' && (
          <div className="pt-2 sm:pt-6">
            <BlogSection onOpenBooking={handleOpenBooking} />
          </div>
        )}

        {activeTab === 'about' && (
          <div className="pt-2 sm:pt-6">
            <ReviewsAndLocation />
            <LoyaltyRewards />
            <FAQSection />
          </div>
        )}

        {activeTab === 'loyalty' && (
          <div className="pt-2 sm:pt-6">
            <LoyaltyRewards />
            <ReviewsAndLocation />
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="pt-2 sm:pt-6">
            <ContactUs />
            <ReviewsAndLocation />
          </div>
        )}
      </main>

      {/* Floating Action Buttons: WhatsApp & Direct Call with WhatsApp Icon */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col gap-2.5 sm:gap-3">
        {/* Floating Compare Trigger */}
        <button
          onClick={() => handleOpenCompareModal()}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-900 hover:bg-cyan-600 text-cyan-300 hover:text-white flex items-center justify-center shadow-2xl shadow-cyan-950/60 hover:scale-110 active:scale-95 transition-all cursor-pointer group relative border border-cyan-500/40"
          aria-label="Compare vehicle specifications side-by-side"
        >
          <Scale className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="hidden sm:block absolute right-full mr-3 px-3 py-1 bg-slate-950/95 border border-cyan-500/30 text-cyan-200 text-xs font-semibold rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
            Compare Vehicles
          </span>
        </button>

        {/* WhatsApp Button */}
        <a
          href={COMPANY_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sound.playCarChirp()}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-2xl shadow-emerald-950/50 hover:scale-110 active:scale-95 transition-all cursor-pointer group relative border-2 border-emerald-400/30"
          aria-label="Chat with Prime Carhire on WhatsApp"
        >
          <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />
          <span className="hidden sm:block absolute right-full mr-3 px-3 py-1 bg-slate-950/95 border border-emerald-500/30 text-emerald-300 text-xs font-semibold rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
            Instant WhatsApp: {COMPANY_INFO.phone}
          </span>
        </a>

        {/* Phone Button */}
        <a
          href={`tel:${COMPANY_INFO.phoneInternational}`}
          onClick={() => sound.playPhoneBuzz()}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-cyan-950/50 hover:scale-110 active:scale-95 transition-all cursor-pointer group relative border-2 border-cyan-300/40"
          aria-label="Call Prime Carhire Hotline"
        >
          <Phone className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
          <span className="hidden sm:block absolute right-full mr-3 px-3 py-1 bg-slate-950/95 border border-cyan-500/30 text-cyan-300 text-xs font-semibold rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
            Call Dispatcher: {COMPANY_INFO.phone}
          </span>
        </a>
      </div>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenBooking={handleOpenBooking}
        onOpenCompare={() => handleOpenCompareModal()}
      />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        preselectedVehicleId={preselectedVehicleId}
        initialDetails={bookingDetails}
      />

      {/* Side-by-Side Compare Modal */}
      <VehicleCompareModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        initialVehicleAId={compareVehicleId}
        onSelectBooking={(vehicleId) => {
          setPreselectedVehicleId(vehicleId);
          setBookingDetails({ vehicleId });
          setIsBookingModalOpen(true);
        }}
      />
    </div>
  );
}
