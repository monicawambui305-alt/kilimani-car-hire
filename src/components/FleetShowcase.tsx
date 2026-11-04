import React, { useState } from 'react';
import {
  Users,
  Fuel,
  Gauge,
  Briefcase,
  CheckCircle2,
  Camera,
  ArrowRight,
  Sparkles,
  SlidersHorizontal,
  X,
  Scale
} from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { FLEET_DATA, Vehicle, COMPANY_INFO } from '../data/fleet';
import { sound } from '../utils/audio';
import { motion } from 'motion/react';
import { APP_IMAGES } from '../data/images';

interface FleetShowcaseProps {
  onSelectCarForBooking: (vehicle: Vehicle) => void;
  onOpenCompareModal?: (vehicleAId?: string) => void;
  currency?: 'KES' | 'USD';
}

export const FleetShowcase: React.FC<FleetShowcaseProps> = ({
  onSelectCarForBooking,
  onOpenCompareModal
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedModalCar, setSelectedModalCar] = useState<Vehicle | null>(null);

  const filteredVehicles = FLEET_DATA.filter((car) => {
    if (activeCategory === 'all') return true;
    return car.category === activeCategory;
  });

  const handleCategoryChange = (cat: string) => {
    sound.playClick();
    setActiveCategory(cat);
  };

  const handleCompareClick = (carId: string) => {
    sound.playClick();
    if (onOpenCompareModal) {
      onOpenCompareModal(carId);
    }
  };

  return (
    <section id="fleet" className="py-16 sm:py-24 bg-slate-950 relative overflow-hidden border-t border-emerald-500/20">
      {/* High-Clarity Background Image: Luxury Nairobi Fleet Showroom */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src={APP_IMAGES.fleetHeaderBg}
          alt="Prime Carhire Luxury Fleet Showroom"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-top brightness-[0.72] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 sm:pb-12 border-b border-emerald-500/20"
        >
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wider text-emerald-400 uppercase mb-2">
              <span>Prime Carhire Ojijo Rd Fleet</span>
              <span aria-hidden="true">·</span>
              <span>100% Insured Fleet</span>
              <span aria-hidden="true">·</span>
              <span>Authentic Kenyan Plates</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display break-words">
              Executive Showroom Fleet
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Real inventory photographed at our Ojijo Rd depot and Nairobi locations. Meticulously maintained for luxury city transfers, executive corporate mobility, and rugged safaris.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            {onOpenCompareModal && (
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenCompareModal();
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                <Scale className="w-4 h-4 text-emerald-400" />
                <span>Compare Specs</span>
              </button>
            )}

            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playCarChirp()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs transition-all shadow-md shadow-emerald-950/40 font-display"
            >
              <WhatsAppIcon className="w-4 h-4 fill-slate-950" />
              <span>Inquire All Rates</span>
            </a>
          </div>
        </motion.div>

        {/* Category Filters */}
        <div className="py-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 mb-10">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none w-full sm:w-auto">
            {[
              { id: 'all', label: 'All Fleet' },
              { id: 'suv', label: '4x4 & Full-Size SUVs' },
              { id: 'sedan', label: 'Executive Sedans' },
              { id: 'van', label: 'VIP Vans & MPVs' },
              { id: 'crossover', label: 'Luxury Crossovers' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleCategoryChange(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 font-bold shadow-md shadow-emerald-500/25'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-400 font-medium">
            Showing <span className="text-emerald-400 font-bold">{filteredVehicles.length}</span> Verified Vehicles
          </div>
        </div>

        {/* Vehicle Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredVehicles.map((car, idx) => {
            return (
              <motion.article
                key={car.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group rounded-3xl bg-slate-900/80 backdrop-blur-md border border-emerald-500/20 hover:border-emerald-400/50 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl shadow-slate-950/50 hover:shadow-emerald-950/30"
              >
                {/* Image Section */}
                <div className="relative h-60 sm:h-64 overflow-hidden bg-slate-950">
                  <img
                    src={car.authenticImage}
                    alt={`${car.name} (${car.plateNumber}) for hire at Prime Carhire Nairobi`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                    <span className="px-3 py-1 rounded-lg bg-emerald-950/90 backdrop-blur-md border border-emerald-500/40 text-xs font-mono font-bold text-emerald-300 shadow-md">
                      Plate: {car.plateNumber}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-900/85 backdrop-blur-sm border border-slate-700 text-[11px] font-semibold text-slate-200">
                      {car.categoryLabel}
                    </span>
                  </div>

                  {/* Quick Compare Button on Image */}
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => handleCompareClick(car.id)}
                      className="p-2 rounded-xl bg-slate-900/90 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40 backdrop-blur-md transition-all shadow-md cursor-pointer"
                      title="Compare this vehicle side-by-side"
                    >
                      <Scale className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Tagline */}
                  <div className="absolute bottom-3 left-3 right-3 text-xs text-slate-300 font-medium line-clamp-1 drop-shadow">
                    {car.tagline}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold font-display text-white group-hover:text-emerald-400 transition-colors">
                      {car.name}
                    </h3>

                    {/* Spec Grid */}
                    <div className="grid grid-cols-2 gap-2.5 pt-3 pb-2 text-xs text-slate-300 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{car.specs.seats} Seats</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Gauge className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{car.specs.drive} Drive</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Fuel className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{car.specs.fuel} · {car.specs.consumption}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{car.specs.luggage}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="pt-2.5 space-y-1">
                      {car.features.slice(0, 2).map((feature, i) => (
                        <div key={i} className="text-xs text-slate-400 flex items-center gap-1.5 truncate">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span className="truncate">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Empty Slots for Charges as requested: left blank for rates, with clear inquiry button */}
                  <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Daily / Weekly Rate:</span>
                      <span className="text-emerald-400 font-semibold italic">Inquire on WhatsApp</span>
                    </div>

                    {/* Card Actions */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => {
                          sound.playCarChirp();
                          onSelectCarForBooking(car);
                        }}
                        className="py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs transition-all shadow-md shadow-emerald-500/20 text-center cursor-pointer font-display"
                      >
                        Reserve Now
                      </button>

                      <a
                        href={`https://wa.me/254104709282?text=Hello%20Prime%20Carhire%20Ojijo%20Rd%2C%20I%20am%20inquiring%20about%20renting%20the%20${encodeURIComponent(
                          car.name
                        )}%20(Plate%3A%20${encodeURIComponent(car.plateNumber)})`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sound.playClick()}
                        className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-emerald-500/30 text-emerald-300 font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5 fill-emerald-400" />
                        <span>Quote</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
