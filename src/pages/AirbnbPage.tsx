import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck,
  Building,
  Key,
  Plane,
  Navigation,
  CheckCircle2,
  Phone,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';
import { AirbnbComboSection } from '../components/AirbnbComboSection';
import { COMPANY_INFO } from '../data/fleet';
import { sound } from '../utils/audio';

interface AirbnbPageProps {
  onNavigate: (page: string) => void;
  onOpenBooking: () => void;
}

export const AirbnbPage: React.FC<AirbnbPageProps> = ({
  onNavigate,
  onOpenBooking,
}) => {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('Westlands & Parklands');

  const neighborhoodDeliveries = [
    { name: 'Westlands & Parklands', time: '8–12 Mins', hub: 'Ojijo Rd Depot Central Dispatch', fee: 'Free' },
    { name: 'Kilimani & Yaya Centre', time: '15–20 Mins', hub: 'Ring Rd Kilimani Handover', fee: 'Free' },
    { name: 'Kileleshwa & Riverside', time: '12–18 Mins', hub: 'Riverside Drive Meetup', fee: 'Free' },
    { name: 'Lavington & Valley Arcade', time: '20–25 Mins', hub: 'James Gichuru corridor', fee: 'Free' },
    { name: 'Upper Hill & Nairobi CBD', time: '15–20 Mins', hub: 'Museum Hill / Uhuru Highway', fee: 'Free' },
    { name: 'JKIA Airport Terminal', time: 'Scheduled (24/7)', hub: 'Terminal 1A / 1E Arrivals with Expressway', fee: 'VIP Handover' }
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* Breadcrumb Header */}
      <div className="bg-slate-900/60 border-b border-emerald-500/20 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-400">
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('home');
            }}
            className="hover:text-emerald-400 transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-emerald-300 font-semibold">Airbnb Doorstep Delivery & Airport Handover</span>
        </div>
      </div>

      {/* Main Airbnb Feature Component */}
      <AirbnbComboSection onOpenBooking={onOpenBooking} />

      {/* Interactive Neighborhood Delivery Radius Checker */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="rounded-3xl bg-slate-900/90 border border-emerald-500/30 p-6 sm:p-10 shadow-2xl">
          <div className="max-w-3xl mb-8 space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
              <MapPin className="w-3.5 h-3.5" />
              <span>Nairobi Apartment Delivery Radius</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white font-display">
              Doorstep Handover Delivery Times
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Select your neighborhood or apartment complex to verify rapid vehicle delivery and driver dispatch times from our Ojijo Rd depot.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {neighborhoodDeliveries.map((loc) => {
              const isSelected = selectedNeighborhood === loc.name;
              return (
                <div
                  key={loc.name}
                  onClick={() => {
                    sound.playClick();
                    setSelectedNeighborhood(loc.name);
                  }}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-950/50 border-emerald-400 shadow-lg shadow-emerald-950/50'
                      : 'bg-slate-950/60 border-slate-800 hover:border-emerald-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white text-sm">{loc.name}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                      {loc.fee}
                    </span>
                  </div>
                  <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Average Delivery: {loc.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">{loc.hub}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-300 space-y-1 text-center sm:text-left">
              <span className="font-bold text-white block">
                Selected Destination: {selectedNeighborhood}
              </span>
              <span className="text-slate-400">
                Vehicle is delivered sanitized, fully fueled, with a signed pre-handover checklist.
              </span>
            </div>
            <a
              href={`https://wa.me/254104709282?text=${encodeURIComponent(
                `Hello Prime Carhire Ojijo Rd, I am requesting doorstep vehicle delivery to my apartment in ${selectedNeighborhood}. Could you confirm availability?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/50"
            >
              <WhatsAppIcon className="w-4 h-4 fill-slate-950" />
              <span>Request Delivery to {selectedNeighborhood}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
