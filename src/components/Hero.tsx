import React, { useState, useEffect } from 'react';
import {
  Calendar,
  MapPin,
  Car,
  ShieldCheck,
  ChevronRight,
  Clock,
  Sparkles,
  Award,
  ArrowRight,
  Scale,
  PhoneCall
} from 'lucide-react';
import { FLEET_DATA, SERVICE_AREAS, COMPANY_INFO } from '../data/fleet';
import { sound } from '../utils/audio';
import { motion } from 'motion/react';
import { APP_IMAGES } from '../data/images';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

interface HeroProps {
  onSelectVehicle: (vehicleId: string) => void;
  onOpenBookingWithDetails: (details: {
    vehicleId: string;
    pickupDate: string;
    returnDate: string;
    location: string;
    serviceType: string;
  }) => void;
  setActiveTab: (tab: string) => void;
  onOpenCompare?: () => void;
}

const HERO_SLIDES = APP_IMAGES.heroSlides;

export const Hero: React.FC<HeroProps> = ({
  onSelectVehicle,
  onOpenBookingWithDetails,
  setActiveTab,
  onOpenCompare
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedModel, setSelectedModel] = useState(FLEET_DATA[0].id);
  const [serviceType, setServiceType] = useState('self_drive');
  const [pickupDate, setPickupDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [returnDate, setReturnDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 4);
    return d.toISOString().split('T')[0];
  });
  const [selectedLocation, setSelectedLocation] = useState('Ojijo Rd Depot Handover (Parklands / Westlands)');

  // Auto-advance hero slides every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const handleSlideSelect = (idx: number) => {
    sound.playClick();
    setCurrentSlide(idx);
  };

  const handleQuickQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playCarChirp();
    onOpenBookingWithDetails({
      vehicleId: selectedModel,
      pickupDate,
      returnDate,
      location: selectedLocation,
      serviceType
    });
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-slate-950">
      {/* High-Clarity Background Image Slideshow with smooth crossfade */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            } transform transition-transform duration-[7000ms]`}
          >
            {/* Bright, high-clarity image without black tint */}
            <img
              src={slide.image}
              alt={slide.headline}
              loading={idx === 0 ? 'eager' : 'lazy'}
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center brightness-[0.78] contrast-[1.05]"
            />
          </div>
        ))}

        {/* Ambient Gradient Overlays engineered for pristine photographic visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent" />
      </div>

      {/* Main Content & Interactive Booking Widget */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-8 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Value Proposition & Brand Trust */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-5 sm:space-y-6"
          >
            {/* Trust Kicker */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs tracking-wider text-emerald-300 font-semibold uppercase">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Ojijo Rd, Nairobi
              </span>
              <span className="text-slate-500 hidden sm:inline" aria-hidden="true">·</span>
              <span className="text-slate-300 bg-slate-900/60 px-2.5 py-1 rounded-full border border-slate-700/60">
                Open · Closes 4 PM
              </span>
              <span className="text-slate-500 hidden sm:inline" aria-hidden="true">·</span>
              <span className="text-emerald-400 flex items-center gap-1 bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-500/30">
                <Award className="w-3.5 h-3.5" />
                Verified Car Rental Agency
              </span>
            </div>

            {/* Main Headline with frosted text backing for supreme readability */}
            <div className="p-4 sm:p-6 rounded-3xl bg-slate-950/60 backdrop-blur-md border border-emerald-500/20 shadow-xl space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight text-white leading-[1.15] font-display">
                Premier Luxury & Executive Car Hire on{' '}
                <span className="emerald-gradient-text">Ojijo Road, Nairobi</span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                Self-drive & chauffeured Toyota Land Cruiser V8, Mercedes-Benz, Prado TX, Harrier, and Executive 8-seater vans. Immediate handover at our Ojijo Rd depot or doorstep delivery across Westlands, Parklands, Kilimani & JKIA.
              </p>
            </div>

            {/* Interactive CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('fleet');
                }}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer font-display"
              >
                <Car className="w-4 h-4" />
                <span>Explore Fleet & Specs</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              {onOpenCompare && (
                <button
                  onClick={() => {
                    sound.playClick();
                    onOpenCompare();
                  }}
                  className="px-5 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-emerald-300 font-bold text-sm border border-emerald-500/40 hover:border-emerald-400 transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Scale className="w-4 h-4 text-emerald-400" />
                  <span>Compare Vehicles</span>
                </button>
              )}

              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playCarChirp()}
                className="px-5 py-3.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-emerald-950/40 cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>WhatsApp Dispatch</span>
              </a>
            </div>

            {/* Micro Trust Points */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Comprehensive Insurance Included
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" />
                Fast 10-Min Doorstep Delivery
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-400" />
                Ojijo Rd Depot · Plus Code PRJ6+XJ
              </span>
            </div>
          </motion.div>

          {/* Right Column: Quick Reservation Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/85 backdrop-blur-xl border border-emerald-500/30 shadow-2xl shadow-emerald-950/50 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <h3 className="font-display font-bold text-base sm:text-lg text-white">
                    Quick Booking Inquiry
                  </h3>
                </div>
                <span className="text-[11px] font-semibold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  Instant Response
                </span>
              </div>

              {/* Service Type Toggle */}
              <div className="grid grid-cols-2 p-1 bg-slate-950 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setServiceType('self_drive');
                  }}
                  className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    serviceType === 'self_drive'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-md font-display'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Self-Drive Rental
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setServiceType('chauffeur');
                  }}
                  className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    serviceType === 'chauffeur'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-md font-display'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  With Chauffeur
                </button>
              </div>

              <form onSubmit={handleQuickQuoteSubmit} className="space-y-4">
                {/* Vehicle Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-emerald-400" />
                    Select Vehicle Model
                  </label>
                  <select
                    value={selectedModel}
                    onChange={(e) => {
                      sound.playClick();
                      setSelectedModel(e.target.value);
                    }}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-medium text-white focus:outline-none focus:border-emerald-400 cursor-pointer"
                  >
                    {FLEET_DATA.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name} ({v.plateNumber})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Pickup & Return Dates */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      Pickup Date
                    </label>
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      Return Date
                    </label>
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                {/* Pickup Location */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    Pickup / Handover Location
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => {
                      sound.playClick();
                      setSelectedLocation(e.target.value);
                    }}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-white focus:outline-none focus:border-emerald-400 cursor-pointer"
                  >
                    <option value="Ojijo Rd Depot Handover (Parklands / Westlands)">Ojijo Rd Depot Handover (Walk-in / Free)</option>
                    <option value="Westlands Doorstep (Apartment / Hotel)">Westlands Doorstep (Apartment / Hotel)</option>
                    <option value="Parklands Doorstep Delivery">Parklands Doorstep Delivery</option>
                    <option value="Kilimani & Yaya Centre Doorstep">Kilimani & Yaya Centre Doorstep</option>
                    <option value="Kileleshwa & Lavington Doorstep">Kileleshwa & Lavington Doorstep</option>
                    <option value="JKIA Airport (Terminal 1 & 2 Arrival)">JKIA Airport (Terminal 1 & 2 Arrival)</option>
                    <option value="Wilson Airport (Domestic Arrival)">Wilson Airport (Domestic Arrival)</option>
                  </select>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-950 font-black text-sm tracking-wide shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer mt-2 font-display"
                >
                  <span>Proceed to Booking Confirmation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
                <span>No upfront charge · Rates confirmed on WhatsApp</span>
                <span className="text-emerald-400 font-semibold">0104 709282</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide Navigation Dots & Scenic Indicator Bar */}
      <div className="relative z-10 border-t border-emerald-500/15 bg-slate-950/80 backdrop-blur-md py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px]">Active Panorama:</span>
            <span className="font-medium text-white truncate max-w-xs sm:max-w-md">
              {HERO_SLIDES[currentSlide]?.headline}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleSlideSelect(idx)}
                aria-label={`Go to scenic slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === currentSlide
                    ? 'w-7 h-2 bg-gradient-to-r from-emerald-400 to-teal-500'
                    : 'w-2 h-2 bg-slate-700 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
