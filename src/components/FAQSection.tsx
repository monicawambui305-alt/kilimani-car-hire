import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  HelpCircle,
  ChevronDown,
  ShieldCheck,
  Fuel,
  FileCheck2,
  CreditCard,
  Compass,
  PhoneCall,
  Sparkles
} from 'lucide-react';
import { FAQS_DATA, FAQItem } from '../data/faq';
import { COMPANY_INFO } from '../data/fleet';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { sound } from '../utils/audio';

export const FAQSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openIds, setOpenIds] = useState<string[]>([FAQS_DATA[0].id, FAQS_DATA[1].id]);

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'insurance', label: 'Insurance & Cover' },
    { id: 'booking', label: 'Fuel & Delivery' },
    { id: 'driver', label: 'Driver Rules' },
    { id: 'payment', label: 'Deposits & Pay' },
    { id: 'safari', label: 'Safari & Trips' }
  ];

  const filteredFaqs = activeCategory === 'all'
    ? FAQS_DATA
    : FAQS_DATA.filter(item => item.category === activeCategory);

  const toggleAccordion = (id: string) => {
    sound.playClick();
    setOpenIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const getCategoryIcon = (category: FAQItem['category']) => {
    switch (category) {
      case 'insurance':
        return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      case 'booking':
        return <Fuel className="w-4 h-4 text-teal-400" />;
      case 'driver':
        return <FileCheck2 className="w-4 h-4 text-emerald-400" />;
      case 'payment':
        return <CreditCard className="w-4 h-4 text-teal-400" />;
      case 'safari':
        return <Compass className="w-4 h-4 text-emerald-400" />;
      default:
        return <HelpCircle className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <section id="faq-section" className="relative py-16 sm:py-24 bg-slate-950/90 text-white overflow-hidden border-t border-emerald-500/20">
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Clear & Transparent Guidelines
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Everything you need to know about insurance coverage, driver permits, fuel policies, and seamless rental handover at our Ojijo Rd depot or doorstep.
          </p>
        </motion.div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                sound.playClick();
                setActiveCategory(cat.id);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 font-bold shadow-md shadow-emerald-500/25'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion FAQ List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className={`rounded-2xl border transition-all ${
                  isOpen
                    ? 'bg-slate-900/90 border-emerald-500/40 shadow-lg shadow-emerald-950/40'
                    : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full px-5 py-4 sm:p-6 flex items-start justify-between gap-4 text-left cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-3.5 sm:gap-4">
                    <div className="mt-0.5 p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 shrink-0">
                      {getCategoryIcon(faq.category)}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-white leading-snug font-display">
                        {faq.question}
                      </h3>
                      {faq.highlight && (
                        <p className="mt-1 text-xs font-medium text-emerald-400">
                          ✦ {faq.highlight}
                        </p>
                      )}
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 mt-1 ${
                      isOpen ? 'rotate-180 text-emerald-400' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 sm:pl-[4.25rem] text-sm text-slate-300 leading-relaxed border-t border-slate-800/60">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Contact Help Card */}
        <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-white font-display">Have a specific question not listed here?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Our Ojijo Rd desk is ready to answer questions regarding custom safari packages or long-term leases.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs transition-all shadow-md shadow-emerald-950/40 font-display"
            >
              <WhatsAppIcon className="w-4 h-4 fill-slate-950" />
              <span>WhatsApp Helpdesk</span>
            </a>
            <a
              href={`tel:${COMPANY_INFO.phoneInternational}`}
              onClick={() => sound.playCarChirp()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
