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
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { VehicleCompareModal } from './components/VehicleCompareModal';
import { FLEET_DATA, Vehicle, COMPANY_INFO } from './data/fleet';
import { sound } from './utils/audio';

// Multi-Page Components
import { HomePage } from './pages/HomePage';
import { FleetPage } from './pages/FleetPage';
import { ComparePage } from './pages/ComparePage';
import { AirbnbPage } from './pages/AirbnbPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { FaqPage } from './pages/FaqPage';
import { GuidesPage } from './pages/GuidesPage';
import { AboutDepotPage } from './pages/AboutDepotPage';
import { LoyaltyPage } from './pages/LoyaltyPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  // Read initial route from URL hash if available (e.g. #/fleet, #fleet)
  const getInitialRoute = (): string => {
    const hash = window.location.hash.replace(/^#\/?/, '');
    const validRoutes = [
      'home',
      'fleet',
      'compare',
      'airbnb-combos',
      'calculator',
      'faq',
      'blogs',
      'about',
      'loyalty',
      'contact'
    ];
    return validRoutes.includes(hash) ? hash : 'home';
  };

  const [activeTab, setActiveTab] = useState<string>(getInitialRoute);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  const [compareVehicleId, setCompareVehicleId] = useState<string>(FLEET_DATA[0].id);
  const [preselectedVehicleId, setPreselectedVehicleId] = useState<string>(FLEET_DATA[0].id);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [currency, setCurrency] = useState<'KES' | 'USD'>('KES');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Sync hash routing so browser Back / Forward buttons and bookmarks work seamlessly
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      const validRoutes = [
        'home',
        'fleet',
        'compare',
        'airbnb-combos',
        'calculator',
        'faq',
        'blogs',
        'about',
        'loyalty',
        'contact'
      ];
      if (validRoutes.includes(hash)) {
        setActiveTab(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (!hash) {
        setActiveTab('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update document title for enhanced SEO on each page
  useEffect(() => {
    const titles: Record<string, string> = {
      home: 'Prime Carhire Nairobi | Executive & Safari Fleet on Ojijo Rd',
      fleet: 'Executive Showroom Fleet | Land Cruiser V8, Mercedes, Prado & Voxy',
      compare: 'Vehicle Spec Comparison Matrix | Prime Carhire Ojijo Rd',
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

  const handleNavigate = (pageId: string) => {
    sound.playClick();
    setActiveTab(pageId);
    window.location.hash = '#' + (pageId === 'home' ? '' : pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-400 selection:text-slate-950">
      {/* Top Navigation Bar with Sovereign Emerald & Mint palette */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        onOpenBooking={handleOpenBooking}
        onOpenCompare={() => handleOpenCompareModal()}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Main Multi-Page Route Render */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectCarForBooking={handleSelectCarForBooking}
            onOpenBooking={handleOpenBooking}
            onOpenCompare={handleOpenCompareModal}
            onOpenBookingWithDetails={handleOpenBookingWithDetails}
          />
        )}

        {activeTab === 'fleet' && (
          <FleetPage
            onNavigate={handleNavigate}
            onSelectCarForBooking={handleSelectCarForBooking}
            onOpenCompareModal={handleOpenCompareModal}
            currency={currency}
          />
        )}

        {activeTab === 'compare' && (
          <ComparePage
            onNavigate={handleNavigate}
            onSelectCarForBooking={handleSelectCarForBooking}
          />
        )}

        {activeTab === 'airbnb-combos' && (
          <AirbnbPage
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {activeTab === 'calculator' && (
          <CalculatorPage
            onNavigate={handleNavigate}
            initialVehicleId={preselectedVehicleId}
            currency={currency}
            onOpenBookingWithQuote={handleOpenBookingWithDetails}
          />
        )}

        {activeTab === 'faq' && (
          <FaqPage onNavigate={handleNavigate} />
        )}

        {activeTab === 'blogs' && (
          <GuidesPage
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {activeTab === 'about' && (
          <AboutDepotPage onNavigate={handleNavigate} />
        )}

        {activeTab === 'loyalty' && (
          <LoyaltyPage onNavigate={handleNavigate} />
        )}

        {activeTab === 'contact' && (
          <ContactPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Floating Action Buttons: WhatsApp & Direct Call with WhatsApp Icon */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col gap-2.5 sm:gap-3">
        {/* Floating Compare Launcher */}
        <button
          onClick={() => handleNavigate('compare')}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-900 hover:bg-emerald-600 text-emerald-300 hover:text-slate-950 flex items-center justify-center shadow-2xl shadow-emerald-950/60 hover:scale-110 active:scale-95 transition-all cursor-pointer group relative border border-emerald-500/40"
          aria-label="Compare vehicle specifications side-by-side"
        >
          <Scale className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-slate-900/90 text-emerald-300 text-xs font-semibold rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-emerald-500/30">
            Compare Specs
          </span>
        </button>

        {/* Direct Call Floating Button */}
        <a
          href={`tel:${COMPANY_INFO.phoneInternational}`}
          onClick={() => sound.playPhoneBuzz()}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-900 hover:bg-emerald-600 text-emerald-300 hover:text-slate-950 flex items-center justify-center shadow-2xl shadow-emerald-950/60 hover:scale-110 active:scale-95 transition-all cursor-pointer group relative border border-emerald-500/40"
          aria-label={`Call Prime Carhire at ${COMPANY_INFO.phone}`}
        >
          <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-slate-900/90 text-emerald-300 text-xs font-semibold rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-emerald-500/30">
            Call {COMPANY_INFO.phone}
          </span>
        </a>

        {/* WhatsApp Floating Button with authentic icon */}
        <a
          href={COMPANY_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sound.playCarChirp()}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-2xl shadow-emerald-950/80 hover:scale-110 active:scale-95 transition-all cursor-pointer group relative"
          aria-label="Chat on WhatsApp with Prime Carhire Ojijo Rd"
        >
          <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-slate-900/90 text-emerald-300 text-xs font-semibold rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-emerald-500/30">
            Instant WhatsApp Dispatch
          </span>
        </a>
      </div>

      {/* Booking Modal with Pre-populated Car or Custom Details */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        preselectedVehicleId={preselectedVehicleId}
        initialDetails={bookingDetails}
      />

      {/* Side-by-Side Spec Comparison Modal */}
      <VehicleCompareModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        initialVehicleAId={compareVehicleId}
        onSelectBooking={(vId) => {
          const car = FLEET_DATA.find((c) => c.id === vId);
          if (car) handleSelectCarForBooking(car);
        }}
      />

      {/* Global Footer with All Page Navigation */}
      <Footer
        setActiveTab={handleNavigate}
        onOpenBooking={handleOpenBooking}
        onOpenCompare={() => handleOpenCompareModal()}
      />
    </div>
  );
}
