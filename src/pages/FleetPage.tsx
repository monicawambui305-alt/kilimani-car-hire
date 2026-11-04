import React from 'react';
import { motion } from 'motion/react';
import { Car, ChevronRight, Scale, Shield, Sparkles } from 'lucide-react';
import { FleetShowcase } from '../components/FleetShowcase';
import { Vehicle } from '../data/fleet';
import { sound } from '../utils/audio';

interface FleetPageProps {
  onNavigate: (page: string) => void;
  onSelectCarForBooking: (car: Vehicle) => void;
  onOpenCompareModal: (carId?: string) => void;
  currency: 'KES' | 'USD';
}

export const FleetPage: React.FC<FleetPageProps> = ({
  onNavigate,
  onSelectCarForBooking,
  onOpenCompareModal,
  currency,
}) => {
  return (
    <div className="min-h-screen pb-16">
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
          <span className="text-emerald-300 font-semibold">Executive Showroom Fleet</span>
        </div>
      </div>

      {/* Page Title & Intro */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase font-display">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Prime Carhire Ojijo Rd Showroom</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white font-display">
              All Available Vehicles & 4x4 SUVs
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Explore our full fleet of company-owned Land Cruisers, Mercedes sedans, Prados, and passenger vans. Every vehicle undergoes a 42-point safety inspection before handover.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                sound.playClick();
                onNavigate('compare');
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer font-display"
            >
              <Scale className="w-4 h-4 text-emerald-400" />
              <span>Full Spec Comparison</span>
            </button>
          </div>
        </div>
      </div>

      {/* Fleet Showcase Grid & Filters */}
      <FleetShowcase
        onSelectCarForBooking={onSelectCarForBooking}
        onOpenCompareModal={onOpenCompareModal}
        currency={currency}
      />
    </div>
  );
};
