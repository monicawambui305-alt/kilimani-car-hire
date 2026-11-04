import React from 'react';
import { ChevronRight, Calendar, Sparkles } from 'lucide-react';
import { RateCalculator } from '../components/RateCalculator';
import { sound } from '../utils/audio';

interface CalculatorPageProps {
  onNavigate: (page: string) => void;
  initialVehicleId: string;
  currency: 'KES' | 'USD';
  onOpenBookingWithQuote: (details: any) => void;
}

export const CalculatorPage: React.FC<CalculatorPageProps> = ({
  onNavigate,
  initialVehicleId,
  currency,
  onOpenBookingWithQuote,
}) => {
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
          <span className="text-emerald-300 font-semibold">Custom Rate Configurator</span>
        </div>
      </div>

      {/* Page Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase">
            <Calendar className="w-3.5 h-3.5" />
            <span>Interactive Trip Estimator</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display">
            Calculate Your Tailored Rental Package
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Select your vehicle model, trip duration, chauffeur preferences, and optional airport or baby seat add-ons. Export your custom quote directly to WhatsApp for rapid confirmation.
          </p>
        </div>
      </div>

      {/* Main Rate Calculator Component */}
      <RateCalculator
        initialVehicleId={initialVehicleId}
        currency={currency}
        onOpenBookingWithQuote={onOpenBookingWithQuote}
      />
    </div>
  );
};
