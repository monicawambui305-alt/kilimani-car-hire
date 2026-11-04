import React from 'react';
import { Phone, Mail, MapPin, Clock, Star, ExternalLink, ShieldCheck, Scale, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';
import { COMPANY_INFO } from '../data/fleet';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenBooking: () => void;
  onOpenCompare?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenBooking, onOpenCompare }) => {
  const handleNav = (tabId: string) => {
    sound.playClick();
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-cyan-500/20 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Loyalty Rewards VIP Callout Banner in Footer */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950/70 via-slate-900 to-blue-950/70 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Repeat Client Loyalty Rewards</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              Earn 15% OFF on Your 5th Rental + Free VIP Airport Transfers
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Enjoy zero security deposits, guaranteed vehicle upgrades, and free JKIA expressway airport transfers on long-term 7+ day hires across Nairobi.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNav('loyalty')}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
            >
              View Loyalty Program
            </button>
            {onOpenCompare && (
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenCompare();
                }}
                className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Compare</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-display font-black text-slate-950 text-xl shadow-lg shadow-cyan-500/20">
                P
              </div>
              <span className="font-display text-xl font-bold text-white tracking-tight">
                {COMPANY_INFO.name}
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed max-w-sm">
              Nairobi’s premier luxury and executive vehicle rental agency based on Ojijo Rd. Providing verified Kenyan fleet, 24/7 airport meet & greet, and rapid doorstep apartment delivery across Parklands, Westlands & Kilimani.
            </p>
            <div className="flex items-center gap-2 text-cyan-400 text-xs">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span className="font-semibold text-white">100% Insured Fleet</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">Ojijo Rd Depot</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-semibold text-white tracking-wider uppercase text-[11px]">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('fleet')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Showroom Fleet
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('faq')}
                  className="hover:text-cyan-400 transition-colors font-medium text-cyan-400 cursor-pointer"
                >
                  Rental FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('airbnb-combos')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Airbnb Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('calculator')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Rate Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('loyalty')}
                  className="hover:text-cyan-400 transition-colors text-cyan-400 font-medium cursor-pointer"
                >
                  Loyalty Rewards
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('blogs')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Nairobi Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Contact Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Fleet Models */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-semibold text-white tracking-wider uppercase text-[11px]">
              Verified Fleet
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>Toyota Land Cruiser V8 200 Series (KDK 077B)</li>
              <li>Mercedes-Benz C-Class Executive (KDM 754A)</li>
              <li>Toyota Harrier Elegance SUV (KDS 130K)</li>
              <li>Toyota Voxy / Noah Hybrid MPV (KDX 183R)</li>
              <li>Toyota Noah / Esquire VIP Van (KDR 548M)</li>
              <li>Toyota Land Cruiser Prado TX 4x4 (KDT)</li>
              <li>Mazda CX-5 Soul Red & Silver AWD</li>
            </ul>
          </div>

          {/* Prime Carhire Depot Contacts */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-semibold text-white tracking-wider uppercase text-[11px]">
              Ojijo Rd Depot & Contact
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a
                  href={`tel:${COMPANY_INFO.phoneInternational}`}
                  onClick={() => sound.playPhoneBuzz()}
                  className="text-white hover:text-cyan-400 font-bold"
                >
                  {COMPANY_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <WhatsAppIcon className="w-4 h-4 fill-emerald-400 shrink-0" />
                <a
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline font-semibold"
                >
                  WhatsApp Dispatch
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.hours}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span>Ojijo Rd, Nairobi, Kenya</span>
                  <div className="text-[11px] text-cyan-400 font-mono mt-0.5">
                    Plus Code: {COMPANY_INFO.plusCode}
                  </div>
                </div>
              </div>
              <div className="pt-1">
                <a
                  href={COMPANY_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:underline"
                >
                  <span>View on Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Prime Carhire Nairobi. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Ojijo Rd & Parklands Corridor</span>
            <span aria-hidden="true">·</span>
            <span>Licensed Kenyan Car Rental Agency</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
