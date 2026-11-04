import React, { useState } from 'react';
import {
  Building2,
  KeyRound,
  Plane,
  Clock,
  CheckCircle2,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Compass,
  Sparkles
} from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { sound } from '../utils/audio';
import { motion } from 'motion/react';
import { APP_IMAGES } from '../data/images';
import { COMPANY_INFO } from '../data/fleet';

interface AirbnbComboSectionProps {
  onOpenBooking: () => void;
}

export const AirbnbComboSection: React.FC<AirbnbComboSectionProps> = ({ onOpenBooking }) => {
  const [searchedApartment, setSearchedApartment] = useState('');
  const [checkResult, setCheckResult] = useState<string | null>(null);

  const handleCheckApartment = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    if (!searchedApartment.trim()) return;

    sound.playCarChirp();
    setCheckResult(
      `✓ Confirmed: "${searchedApartment}" is within our FREE 10-Minute Rapid Delivery Zone from Ojijo Rd! Keys will be handed over directly to your doorstep.`
    );
  };

  return (
    <section id="airbnb-combos" className="relative py-16 sm:py-24 bg-slate-950 border-t border-b border-cyan-500/20 overflow-hidden">
      {/* High-Clarity Background Image: Nairobi Luxury Airbnb Penthouse */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={APP_IMAGES.airbnbRentalBg}
          alt="Prime Carhire Airbnb Delivery Background"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center brightness-[0.75] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-950/60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-cyan-400 uppercase">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>Hospitality & Mobility Fusion</span>
            <span aria-hidden="true">·</span>
            <span>Ojijo Rd, Parklands & Westlands Hub</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display break-words">
            Airbnb Doorstep Delivery & VIP Airport Escort
          </h2>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Staying at a Nairobi Airbnb, serviced penthouse, or boutique hotel in Parklands, Westlands, or Kilimani? Prime Carhire brings the vehicle directly to your basement bay with keys, sanitized interior, and full tank.
          </p>
        </motion.div>

        {/* 3 Pillars of Airbnb Car Rental */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 backdrop-blur-md border border-cyan-500/25 shadow-xl space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <KeyRound className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                Zero-Hassle Doorstep Handover
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                No need to hail taxis to an office. Our agent meets you at your apartment gate or reception with your pre-inspected car, digital contract, and verified inspection log.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800 text-xs text-cyan-400 font-semibold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>10-Minute Dispatch Radius</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 backdrop-blur-md border border-blue-500/25 shadow-xl space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Plane className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                Expressway Airport Meet & Greet
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Arriving via JKIA or Wilson Airport? Our chauffeur tracks your flight in real time, receives you curbside with luggage support, and delivers you straight to your residence.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800 text-xs text-blue-400 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Expressway Toll Pre-cleared</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 backdrop-blur-md border border-cyan-500/25 shadow-xl space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                Extended Stay Flex Rates
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Staying for 1 week, 1 month, or longer? Unlock bespoke long-term pricing, complimentary weekly vehicle detailing, and prioritized vehicle swap privileges.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800 text-xs text-cyan-400 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Complimentary Weekly Car Detailing</span>
            </div>
          </motion.div>
        </div>

        {/* Interactive Doorstep Address Checker */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-6 sm:p-10 rounded-3xl bg-slate-900/85 backdrop-blur-xl border border-cyan-500/30 shadow-2xl space-y-6 max-w-4xl mx-auto"
        >
          <div className="space-y-2 text-center">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              Check Free Doorstep Delivery to Your Nairobi Apartment
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Type your apartment name, street, or hotel anywhere in Parklands, Westlands, Kilimani, or Kileleshwa:
            </p>
          </div>

          <form onSubmit={handleCheckApartment} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
              <input
                type="text"
                placeholder="e.g. Ojijo Suites, Parklands, Westlands Mall, Yaya Towers..."
                value={searchedApartment}
                onChange={(e) => setSearchedApartment(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <button
              type="submit"
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/25 transition-all whitespace-nowrap cursor-pointer"
            >
              Check Delivery Zone
            </button>
          </form>

          {checkResult && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-cyan-950/70 border border-cyan-400/50 text-cyan-200 text-xs sm:text-sm flex items-center justify-between gap-4"
            >
              <span>{checkResult}</span>
              <button
                type="button"
                onClick={() => {
                  sound.playCarChirp();
                  onOpenBooking();
                }}
                className="px-4 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs shrink-0 cursor-pointer"
              >
                Book with Free Delivery
              </button>
            </motion.div>
          )}

          {/* Quick WhatsApp Instant Reservation */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <span>Or dispatch directly through our reservations desk on Ojijo Rd:</span>
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold hover:underline"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-emerald-400" />
              <span>WhatsApp: 0104 709282</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
