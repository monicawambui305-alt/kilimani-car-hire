import React from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Zap,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  Scale,
  Car,
  CheckCircle2,
  Calendar,
  Building,
  Phone
} from 'lucide-react';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';
import { Hero } from '../components/Hero';
import { FLEET_DATA, Vehicle, COMPANY_INFO } from '../data/fleet';
import { sound } from '../utils/audio';
import { APP_IMAGES } from '../data/images';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onSelectCarForBooking: (car: Vehicle) => void;
  onOpenBooking: () => void;
  onOpenCompare: (carId?: string) => void;
  onOpenBookingWithDetails: (details: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectCarForBooking,
  onOpenBooking,
  onOpenCompare,
  onOpenBookingWithDetails,
}) => {
  // Top 4 flagship cars for home spotlight
  const featuredCars = FLEET_DATA.slice(0, 4);

  return (
    <div className="space-y-12 sm:space-y-20 pb-16">
      {/* Hero Section */}
      <Hero
        onSelectVehicle={(id) => {
          const found = FLEET_DATA.find((c) => c.id === id);
          if (found) onSelectCarForBooking(found);
        }}
        onOpenBookingWithDetails={onOpenBookingWithDetails}
        setActiveTab={onNavigate}
        onOpenCompare={() => onOpenCompare()}
      />

      {/* Trust Pillars: The Prime Standard */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-emerald-500/20 backdrop-blur-sm hover:border-emerald-400/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-display mb-1">
              10-Min Doorstep Delivery
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Fast key handover across Westlands, Parklands, Kilimani, and central Nairobi Airbnb residences.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-emerald-500/20 backdrop-blur-sm hover:border-emerald-400/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-display mb-1">
              Zero Hidden Charges
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Transparent rental agreements with prompt 24-48hr security deposit refunds and full CDW coverage.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-emerald-500/20 backdrop-blur-sm hover:border-emerald-400/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Building className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-display mb-1">
              JKIA Airport Express
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Terminal Meet & Greet with Nairobi Expressway transit for swift travel without airport bottlenecks.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-emerald-500/20 backdrop-blur-sm hover:border-emerald-400/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-display mb-1">
              Open Closes 4 PM · 24/7 Hotline
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Ojijo Rd depot collection until 4:00 PM with round-the-clock WhatsApp and emergency roadside dispatch.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Flagship Fleet Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Executive Showroom Spotlight</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-display">
              Featured Luxury & Safari Fleet
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Authentic Kenyan company-owned vehicles stationed at our Ojijo Rd depot in Nairobi.
            </p>
          </div>
          <button
            onClick={() => onNavigate('fleet')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-400 hover:text-emerald-300 cursor-pointer group font-display"
          >
            <span>Explore All 10+ Vehicles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCars.map((car) => (
            <div
              key={car.id}
              className="rounded-3xl bg-slate-900/90 border border-emerald-500/20 overflow-hidden flex flex-col justify-between hover:border-emerald-400/50 hover:shadow-xl hover:shadow-emerald-950/40 transition-all group"
            >
              {/* Image Container with high clarity */}
              <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
                <img
                  src={car.authenticImage}
                  alt={car.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-[0.88] contrast-[1.05]"
                />
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-500/30 text-[10px] font-bold text-emerald-300 uppercase">
                  {car.categoryLabel}
                </div>
                <div className="absolute bottom-3 right-3 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-700 font-mono text-xs font-bold text-amber-300">
                  {car.plateNumber}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-bold text-white text-base font-display group-hover:text-emerald-400 transition-colors">
                    {car.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                    {car.tagline}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 py-2 border-t border-b border-slate-800">
                  <div>
                    <span className="text-slate-500 block">Drivetrain</span>
                    <span className="font-semibold text-white">{car.specs.drive}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Transmission</span>
                    <span className="font-semibold text-white">{car.specs.transmission}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Capacity</span>
                    <span className="font-semibold text-white">{car.specs.seats} Seats</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Luggage</span>
                    <span className="font-semibold text-white">{car.specs.luggage}</span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => onSelectCarForBooking(car)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-950/50 cursor-pointer font-display"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 fill-slate-950" />
                    <span>Inquire Quote</span>
                  </button>

                  <button
                    onClick={() => onOpenCompare(car.id)}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-emerald-300 border border-slate-700 transition-colors cursor-pointer"
                    title="Compare specs side-by-side"
                  >
                    <Scale className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Fleet Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => onNavigate('fleet')}
            className="px-8 py-4 rounded-2xl bg-slate-900 border border-emerald-500/40 hover:border-emerald-400 hover:bg-slate-850 text-emerald-300 hover:text-white font-bold text-sm tracking-wide inline-flex items-center gap-2 transition-all shadow-xl shadow-emerald-950/30 cursor-pointer font-display"
          >
            <Car className="w-4 h-4 text-emerald-400" />
            <span>View All Available Vehicles in Showroom</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Compare Feature Promotion Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-emerald-950/80 to-slate-900 border border-emerald-500/30 p-8 sm:p-12 shadow-2xl">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
                <Scale className="w-3.5 h-3.5" />
                <span>Side-by-Side Fleet Comparison Tool</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-display">
                Not Sure Between a Land Cruiser V8, Mercedes, or Prado?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Compare engine displacement, fuel consumption, seating space, luggage capacity, and off-road readiness across our entire lineup on our dedicated Compare Page.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                onClick={() => onNavigate('compare')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer font-display"
              >
                <Scale className="w-4 h-4" />
                <span>Open Dedicated Compare Page</span>
              </button>

              <button
                onClick={() => onNavigate('calculator')}
                className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 font-bold text-xs uppercase tracking-wider border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer font-display"
              >
                <Calendar className="w-4 h-4" />
                <span>Rate Calculator</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Airbnb & Doorstep Handover Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900/70 border border-emerald-500/20 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
              Staying at an Airbnb in Nairobi?
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Doorstep Delivery & Key Handover at Your Apartment
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We deliver thoroughly sanitized, fueled vehicles directly to your compound or residence in Westlands, Parklands, Kilimani, Kileleshwa, and Lavington.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700">
                10-Min Delivery Radius
              </span>
              <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700">
                JKIA Airport Terminal Meet & Greet
              </span>
              <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700">
                Nairobi Expressway Transit
              </span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('airbnb-combos')}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 shrink-0 flex items-center gap-2 cursor-pointer font-display"
          >
            <span>Explore Airbnb Services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Quick Contact & Dispatch Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-teal-950/70 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase text-emerald-400 font-bold tracking-wider block font-display">
                Direct Dispatch & Inquiry Desk
              </span>
              <span className="text-xl sm:text-2xl font-black text-white font-display">
                Call {COMPANY_INFO.phone}
              </span>
              <span className="text-xs text-slate-400 block mt-0.5">
                Ojijo Rd Depot · Plus Code: {COMPANY_INFO.plusCode} · Closes 4:00 PM
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={`tel:${COMPANY_INFO.phoneInternational}`}
              className="flex-1 sm:flex-initial py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Call Now</span>
            </a>
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>WhatsApp Dispatch</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
