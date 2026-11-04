import React, { useState } from 'react';
import { Volume2, VolumeX, Menu, X, PhoneCall, Scale, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { COMPANY_INFO } from '../data/fleet';
import { sound } from '../utils/audio';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenBooking: () => void;
  onOpenCompare: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenBooking,
  onOpenCompare,
  soundEnabled,
  setSoundEnabled,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const nextState = !soundEnabled;
    sound.enabled = nextState;
    setSoundEnabled(nextState);
    if (nextState) {
      sound.playCarChirp();
    }
  };

  const handleNav = (tabId: string) => {
    sound.playClick();
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.location.hash = '#' + (tabId === 'home' ? '' : tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/95 backdrop-blur-xl border-b border-emerald-500/20 transition-colors">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-emerald-950/90 via-teal-950/70 to-slate-950 border-b border-emerald-500/15 py-1 px-4 text-[11px] text-emerald-200 text-center flex items-center justify-center gap-2 font-medium">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Prime Carhire Ojijo Rd, Nairobi · Rapid Doorstep Delivery & 24/7 Airport Handover · Call 0104 709282</span>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Zone 1: Brand Wordmark (Mobile friendly, never clips) */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-2.5 text-left group focus:outline-none min-w-0 cursor-pointer"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-700 flex items-center justify-center font-display font-black text-slate-950 text-lg sm:text-xl shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-transform shrink-0">
            P
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-display text-base sm:text-xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors truncate">
              Prime Carhire
            </span>
            <span className="text-[10px] sm:text-[11px] text-emerald-400/90 tracking-wider uppercase font-medium truncate">
              Ojijo Rd · Nairobi
            </span>
          </div>
        </button>

        {/* Zone 2: Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-5 text-sm font-medium text-slate-300">
          <button
            onClick={() => handleNav('fleet')}
            className={`whitespace-nowrap shrink-0 hover:text-white transition-colors py-1 cursor-pointer ${
              activeTab === 'fleet' ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400' : ''
            }`}
          >
            Showroom Fleet
          </button>
          <button
            onClick={() => handleNav('compare')}
            className={`whitespace-nowrap shrink-0 hover:text-white transition-colors py-1 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'compare' ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400' : 'text-slate-300 hover:text-emerald-400'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-emerald-400" />
            <span>Compare</span>
          </button>
          <button
            onClick={() => handleNav('airbnb-combos')}
            className={`whitespace-nowrap shrink-0 hover:text-white transition-colors py-1 cursor-pointer ${
              activeTab === 'airbnb-combos' ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400' : ''
            }`}
          >
            Airbnb Delivery
          </button>
          <button
            onClick={() => handleNav('calculator')}
            className={`whitespace-nowrap shrink-0 hover:text-white transition-colors py-1 cursor-pointer ${
              activeTab === 'calculator' ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400' : ''
            }`}
          >
            Rate Calculator
          </button>
          <button
            onClick={() => handleNav('faq')}
            className={`whitespace-nowrap shrink-0 hover:text-white transition-colors py-1 cursor-pointer ${
              activeTab === 'faq' ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400' : ''
            }`}
          >
            FAQs
          </button>
          <button
            onClick={() => handleNav('blogs')}
            className={`whitespace-nowrap shrink-0 hover:text-white transition-colors py-1 cursor-pointer ${
              activeTab === 'blogs' ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400' : ''
            }`}
          >
            Nairobi Guides
          </button>
          <button
            onClick={() => handleNav('about')}
            className={`whitespace-nowrap shrink-0 hover:text-white transition-colors py-1 cursor-pointer ${
              activeTab === 'about' ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400' : ''
            }`}
          >
            Reviews & Location
          </button>
          <button
            onClick={() => handleNav('loyalty')}
            className={`whitespace-nowrap shrink-0 hover:text-white transition-colors py-1 flex items-center gap-1 cursor-pointer ${
              activeTab === 'loyalty' ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400' : ''
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Loyalty</span>
          </button>
          <button
            onClick={() => handleNav('contact')}
            className={`whitespace-nowrap shrink-0 hover:text-white transition-colors py-1 cursor-pointer ${
              activeTab === 'contact' ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400' : ''
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: Actions (Mobile Optimized) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Quick Compare Trigger (Tablet & Small Desktop) */}
          <button
            onClick={() => handleNav('compare')}
            className="hidden sm:inline-flex lg:hidden items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-emerald-500/30 text-xs font-semibold text-emerald-300 cursor-pointer"
          >
            <Scale className="w-3.5 h-3.5 text-emerald-400" />
            <span>Compare</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={toggleSound}
            aria-label={soundEnabled ? 'Disable sound effects' : 'Enable interactive sounds'}
            title={soundEnabled ? 'Sound FX On (Click to Mute)' : 'Sound FX Muted'}
            className={`p-2 rounded-lg border transition-all cursor-pointer ${
              soundEnabled
                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Quick WhatsApp Action */}
          <a
            href={COMPANY_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playCarChirp()}
            title="Chat with Prime Carhire on WhatsApp"
            className="p-2 sm:px-3 sm:py-2 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-400 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4 fill-emerald-400 shrink-0" />
            <span className="hidden md:inline text-xs font-semibold">WhatsApp</span>
          </a>

          {/* Phone Call Button */}
          <a
            href={`tel:${COMPANY_INFO.phoneInternational}`}
            onClick={() => sound.playPhoneBuzz()}
            className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-emerald-500/30 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
            <span>{COMPANY_INFO.phone}</span>
          </a>

          {/* Reserve Vehicle */}
          <button
            onClick={() => {
              sound.playCarChirp();
              onOpenBooking();
            }}
            className="hidden sm:block px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 rounded-lg shadow-lg shadow-emerald-500/20 transition-all whitespace-nowrap shrink-0 cursor-pointer font-display font-bold"
          >
            Reserve Vehicle
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="xl:hidden p-2 text-slate-300 hover:text-white focus:outline-none rounded-lg bg-slate-900 border border-slate-800 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-emerald-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-950 border-b border-emerald-500/20 px-5 py-5 space-y-4">
          <div className="flex flex-col space-y-2.5">
            <button
              onClick={() => handleNav('home')}
              className={`text-left py-2 text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === 'home' ? 'text-emerald-400' : 'text-slate-200 hover:text-white'
              }`}
            >
              Home Overview
            </button>
            <button
              onClick={() => handleNav('fleet')}
              className={`text-left py-2 text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === 'fleet' ? 'text-emerald-400' : 'text-slate-200 hover:text-white'
              }`}
            >
              Showroom Fleet (10+ Vehicles)
            </button>
            <button
              onClick={() => handleNav('compare')}
              className={`text-left py-2 text-sm font-semibold flex items-center gap-2 cursor-pointer ${
                activeTab === 'compare' ? 'text-emerald-400' : 'text-slate-200 hover:text-white'
              }`}
            >
              <Scale className="w-4 h-4 text-emerald-400" />
              <span>Compare Vehicles Side-by-Side</span>
            </button>
            <button
              onClick={() => handleNav('airbnb-combos')}
              className={`text-left py-2 text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === 'airbnb-combos' ? 'text-emerald-400' : 'text-slate-200 hover:text-white'
              }`}
            >
              Airbnb & Apartment Doorstep Delivery
            </button>
            <button
              onClick={() => handleNav('calculator')}
              className={`text-left py-2 text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === 'calculator' ? 'text-emerald-400' : 'text-slate-200 hover:text-white'
              }`}
            >
              Rate & Route Calculator
            </button>
            <button
              onClick={() => handleNav('faq')}
              className={`text-left py-2 text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === 'faq' ? 'text-emerald-400' : 'text-slate-200 hover:text-white'
              }`}
            >
              Rental FAQs & Insurance
            </button>
            <button
              onClick={() => handleNav('blogs')}
              className={`text-left py-2 text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === 'blogs' ? 'text-emerald-400' : 'text-slate-200 hover:text-white'
              }`}
            >
              Nairobi Travel Guides & Routes
            </button>
            <button
              onClick={() => handleNav('about')}
              className={`text-left py-2 text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === 'about' ? 'text-emerald-400' : 'text-slate-200 hover:text-white'
              }`}
            >
              Ojijo Rd Depot & Reviews
            </button>
            <button
              onClick={() => handleNav('loyalty')}
              className={`text-left py-2 text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === 'loyalty' ? 'text-emerald-400' : 'text-slate-200 hover:text-white'
              }`}
            >
              Loyalty Rewards & VIP Benefits
            </button>
            <button
              onClick={() => handleNav('contact')}
              className={`text-left py-2 text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === 'contact' ? 'text-emerald-400' : 'text-slate-200 hover:text-white'
              }`}
            >
              Contact Us & Dispatch Desk
            </button>
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-3">
            <button
              onClick={() => {
                sound.playCarChirp();
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/20 text-center cursor-pointer font-display"
            >
              Reserve Vehicle Now
            </button>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playCarChirp()}
                className="py-2.5 bg-emerald-600 text-white font-semibold rounded-xl text-center text-xs flex items-center justify-center gap-1.5"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                WhatsApp
              </a>
              <a
                href={`tel:${COMPANY_INFO.phoneInternational}`}
                onClick={() => sound.playPhoneBuzz()}
                className="py-2.5 bg-slate-900 text-emerald-300 font-semibold rounded-xl text-center text-xs flex items-center justify-center gap-1.5 border border-slate-700"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                Call 0104 709282
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
