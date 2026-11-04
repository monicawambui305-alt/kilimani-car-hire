import React, { useState } from 'react';
import {
  Calculator,
  Calendar,
  Check,
  Shield,
  Tag,
  Car,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { FLEET_DATA, Vehicle, COMPANY_INFO } from '../data/fleet';
import { sound } from '../utils/audio';
import { motion } from 'motion/react';
import { APP_IMAGES } from '../data/images';

interface RateCalculatorProps {
  initialVehicleId?: string;
  currency?: 'KES' | 'USD';
  onOpenBookingWithQuote?: (quoteDetails: any) => void;
}

export const RateCalculator: React.FC<RateCalculatorProps> = ({
  initialVehicleId,
  onOpenBookingWithQuote
}) => {
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(
    initialVehicleId || FLEET_DATA[0].id
  );
  const [days, setDays] = useState<number>(3);
  const [withChauffeur, setWithChauffeur] = useState<boolean>(false);
  const [pickupLocation, setPickupLocation] = useState<string>('ojijo_depot');
  const [childSeat, setChildSeat] = useState<boolean>(false);
  const [wifiHotspot, setWifiHotspot] = useState<boolean>(false);
  const [extraDriver, setExtraDriver] = useState<boolean>(false);
  const [promoCode, setPromoCode] = useState<string>('');
  const [promoApplied, setPromoApplied] = useState<boolean>(false);

  const selectedVehicle =
    FLEET_DATA.find((v) => v.id === selectedVehicleId) || FLEET_DATA[0];

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    if (
      promoCode.trim().toUpperCase() === 'PRIME10' ||
      promoCode.trim().toUpperCase() === 'OJIJO10' ||
      promoCode.trim().toUpperCase() === 'AIRBNB10'
    ) {
      sound.playCarChirp();
      setPromoApplied(true);
    } else {
      sound.playPhoneBuzz();
      setPromoApplied(true);
    }
  };

  const handleWhatsAppBooking = () => {
    sound.playCarChirp();
    const serviceName = withChauffeur ? 'With Professional Chauffeur' : 'Self-Drive';
    const locationName =
      pickupLocation === 'ojijo_depot'
        ? 'Ojijo Rd Depot Handover (Free)'
        : pickupLocation === 'westlands_doorstep'
        ? 'Westlands / Parklands Doorstep'
        : pickupLocation === 'jkia_airport'
        ? 'JKIA Airport Terminal via Expressway'
        : 'Kilimani & Yaya Centre';

    const message = encodeURIComponent(
      `Hello Prime Carhire! 🚗\nI would like to inquire about rental rates and availability:\n\n• Car: ${selectedVehicle.name} (${selectedVehicle.plateNumber})\n• Category: ${selectedVehicle.categoryLabel}\n• Duration: ${days} Day(s)\n• Service: ${serviceName}\n• Pickup Location: ${locationName}\n• Add-ons: ${[childSeat ? 'Child Seat' : '', wifiHotspot ? '4G WiFi' : '', extraDriver ? '2nd Driver' : ''].filter(Boolean).join(', ') || 'Standard'}\n${promoApplied ? '• Promo Code: PRIME10 applied\n' : ''}\nPlease let me know the best rental quotation and delivery schedule from Ojijo Rd!`
    );
    window.open(`https://wa.me/254104709282?text=${message}`, '_blank');
  };

  return (
    <section id="calculator" className="py-16 sm:py-24 bg-slate-950 relative overflow-hidden border-t border-cyan-500/20">
      {/* High-Clarity Background Image: Modern Cockpit Interior Navigation */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src={APP_IMAGES.calculatorBg}
          alt="Luxury Cockpit Interior Navigation Background"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center brightness-[0.75] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-cyan-400 uppercase">
            <Calculator className="w-4 h-4 shrink-0" />
            <span>Interactive Rental Trip Configurator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display break-words">
            Custom Rental Rate Inquiry
          </h2>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Configure your exact dates, chauffeur preferences, and doorstep location. Get an instant personalized rate direct from our Ojijo Rd dispatch desk.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Column: Configuration Controls */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-slate-900/85 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-cyan-500/30 shadow-2xl space-y-6"
          >
            {/* Vehicle Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Car className="w-4 h-4 text-cyan-400" />
                Select Vehicle
              </label>
              <select
                value={selectedVehicleId}
                onChange={(e) => {
                  sound.playClick();
                  setSelectedVehicleId(e.target.value);
                }}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                {FLEET_DATA.map((car) => (
                  <option key={car.id} value={car.id}>
                    {car.name} ({car.plateNumber}) — {car.categoryLabel}
                  </option>
                ))}
              </select>
            </div>

            {/* Rental Duration Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  Rental Duration
                </label>
                <span className="text-sm font-bold text-cyan-300 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-500/30">
                  {days} {days === 1 ? 'Day' : 'Days'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={days}
                onChange={(e) => setDays(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>1 Day</span>
                <span>7 Days (Weekly Special)</span>
                <span>14 Days</span>
                <span>30 Days (Monthly)</span>
              </div>
            </div>

            {/* Chauffeur Toggle */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-white block">Dedicated Executive Chauffeur</span>
                <span className="text-xs text-slate-400">Professional bilingual Kenyan driver fluent in Nairobi routes & national parks</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setWithChauffeur(!withChauffeur);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  withChauffeur
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {withChauffeur ? 'Chauffeur Added' : 'Add Chauffeur'}
              </button>
            </div>

            {/* Delivery Location */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-cyan-400" />
                Handover Location
              </label>
              <select
                value={pickupLocation}
                onChange={(e) => {
                  sound.playClick();
                  setPickupLocation(e.target.value);
                }}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                <option value="ojijo_depot">Ojijo Rd Depot Handover (Free Walk-in)</option>
                <option value="westlands_doorstep">Westlands / Parklands Doorstep Delivery (FREE)</option>
                <option value="kilimani_doorstep">Kilimani & Yaya Centre Doorstep Delivery (FREE)</option>
                <option value="jkia_airport">JKIA International Airport Terminal Handover</option>
              </select>
            </div>

            {/* Optional Add-ons */}
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                Complimentary Travel Add-ons
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setChildSeat(!childSeat);
                  }}
                  className={`p-3 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                    childSeat
                      ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  Child Seat
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setWifiHotspot(!wifiHotspot);
                  }}
                  className={`p-3 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                    wifiHotspot
                      ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  4G In-Car WiFi
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setExtraDriver(!extraDriver);
                  }}
                  className={`p-3 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                    extraDriver
                      ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  Extra Driver
                </button>
              </div>
            </div>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Promo Code (e.g. PRIME10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white uppercase placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-bold transition-all cursor-pointer"
              >
                Apply
              </button>
            </form>
          </motion.div>

          {/* Right Column: Quote Summary Card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 bg-slate-900/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-cyan-500/30 shadow-2xl space-y-6"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider block">
                  Trip Summary
                </span>
                <h3 className="text-xl font-bold font-display text-white">
                  {selectedVehicle.name}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-md bg-cyan-950/80 border border-cyan-500/40 text-xs font-mono font-bold text-cyan-300">
                {selectedVehicle.plateNumber}
              </span>
            </div>

            {/* Vehicle Thumbnail */}
            <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
              <img
                src={selectedVehicle.authenticImage}
                alt={selectedVehicle.name}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Specs Summary */}
            <div className="space-y-2 text-xs text-slate-300 border-b border-slate-800 pb-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Category:</span>
                <span className="text-white font-medium">{selectedVehicle.categoryLabel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Duration:</span>
                <span className="text-white font-medium">{days} Day(s)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Service:</span>
                <span className="text-cyan-300 font-medium">
                  {withChauffeur ? 'With Professional Chauffeur' : 'Self-Drive'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Insurance:</span>
                <span className="text-emerald-400 font-medium">Comprehensive Included</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Depot / Handover:</span>
                <span className="text-white font-medium">Ojijo Rd, Nairobi</span>
              </div>
            </div>

            {/* Blank Rate Slot as requested: Quotes provided via WhatsApp */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1 text-center">
              <span className="text-xs text-slate-400 block">Rental Quotation:</span>
              <span className="text-lg font-bold text-cyan-400 block font-display">
                Personalized Rate on WhatsApp
              </span>
              <span className="text-[11px] text-slate-400 block">
                Verified against vehicle availability & dates
              </span>
            </div>

            {/* Direct WhatsApp Action */}
            <button
              onClick={handleWhatsAppBooking}
              className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/40 transition-all cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>Request Quote on WhatsApp</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
