import React from 'react';
import { ChevronRight, MapPin, Navigation, Clock, ShieldCheck, Phone } from 'lucide-react';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';
import { ReviewsAndLocation } from '../components/ReviewsAndLocation';
import { COMPANY_INFO } from '../data/fleet';
import { sound } from '../utils/audio';

interface AboutDepotPageProps {
  onNavigate: (page: string) => void;
}

export const AboutDepotPage: React.FC<AboutDepotPageProps> = ({ onNavigate }) => {
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
          <span className="text-emerald-300 font-semibold">Ojijo Rd Depot & Verified Reviews</span>
        </div>
      </div>

      {/* Main Reviews & Location Component with Interactive Map */}
      <ReviewsAndLocation />

      {/* Driving Directions & Access Guide */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="rounded-3xl bg-slate-900/90 border border-emerald-500/30 p-6 sm:p-10 shadow-2xl">
          <div className="max-w-3xl mb-8 space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
              <Navigation className="w-3.5 h-3.5" />
              <span>Depot Access & Navigation Guide</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              How to Reach Our Ojijo Road Headquarters
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Prime Carhire is conveniently situated along Ojijo Rd at the boundary between Westlands and Parklands. Free secured customer parking is available on-site for vehicle handovers and returns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                1
              </span>
              <h3 className="font-bold text-white text-sm">From Westlands Roundabout</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Take Mpaka Rd or Ring Rd Westlands toward Ojijo Rd. Follow the road past the park border; our depot gate is directly accessible with clear Prime Carhire frontage.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                2
              </span>
              <h3 className="font-bold text-white text-sm">From Museum Hill / Expressway</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Exit the Nairobi Expressway at Museum Hill interchange. Follow Ojijo Rd toward Parklands for approximately 800 meters. The depot will be on your right.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                3
              </span>
              <h3 className="font-bold text-white text-sm">From Parklands / Limuru Rd</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Proceed down 1st or 2nd Parklands Avenue connecting into Ojijo Rd. Seamless connection without getting caught in central CBD traffic.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
