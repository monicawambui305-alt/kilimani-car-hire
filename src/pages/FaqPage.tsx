import React from 'react';
import { ChevronRight, HelpCircle, Phone } from 'lucide-react';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';
import { FAQSection } from '../components/FAQSection';
import { COMPANY_INFO } from '../data/fleet';
import { sound } from '../utils/audio';

interface FaqPageProps {
  onNavigate: (page: string) => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate }) => {
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
          <span className="text-emerald-300 font-semibold">Rental FAQs & Insurance Guidelines</span>
        </div>
      </div>

      {/* Main FAQ Component */}
      <FAQSection />

      {/* Still Have Questions CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="rounded-3xl bg-slate-900/90 border border-emerald-500/30 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
              Have a custom inquiry or special route?
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              Speak With Our Fleet Desk Directly
            </h3>
            <p className="text-xs text-slate-300">
              Our Ojijo Rd dispatchers are online to answer custom requests, safari cross-border clearances, and long-term lease terms.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${COMPANY_INFO.phoneInternational}`}
              className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 border border-slate-700 transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/40 transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
