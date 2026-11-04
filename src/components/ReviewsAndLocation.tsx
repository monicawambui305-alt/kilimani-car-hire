import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  MapPin,
  Phone,
  Clock,
  Star,
  ExternalLink,
  ShieldCheck,
  Navigation,
  Copy,
  Check,
  Building,
  Car
} from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { GOOGLE_REVIEWS, COMPANY_INFO } from '../data/fleet';
import { sound } from '../utils/audio';
import { APP_IMAGES } from '../data/images';

export const ReviewsAndLocation: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyPlusCode = () => {
    sound.playClick();
    navigator.clipboard.writeText(COMPANY_INFO.plusCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="about" className="relative py-16 sm:py-24 bg-slate-950 overflow-hidden border-t border-emerald-500/20">
      {/* High-Clarity Background Image: Nairobi Upscale Street and Location */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={APP_IMAGES.locationDepotBg}
          alt="Prime Carhire Ojijo Rd Nairobi Location"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center brightness-[0.75] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading - Responsive and never overflows on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-2 sm:space-y-3"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-400 uppercase">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Prime Carhire Depot & Headquarters</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display break-words px-2">
            Ojijo Road Depot & Nairobi Location
          </h2>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed px-2">
            Conveniently situated along Ojijo Rd between Parklands and Westlands, Nairobi. Open for walk-in test drives and depot collections until 4:00 PM, with 24/7 on-demand airport delivery.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Left Column: Official Business Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="lg:col-span-5 bg-slate-900/85 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-emerald-500/30 flex flex-col justify-between space-y-6 shadow-2xl shadow-emerald-950/50"
          >
            <div className="space-y-5">
              {/* Badge & Agency Type */}
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider font-display">
                  Car Rental Agency
                </span>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {COMPANY_INFO.hours}
                </span>
              </div>

              {/* Title & Coordinates */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                  Prime Carhire
                </h3>
                <p className="text-sm text-emerald-400 font-medium mt-1 flex items-center gap-1.5">
                  <Building className="w-4 h-4" />
                  <span>Ojijo Rd, Parklands / Westlands, Nairobi</span>
                </p>
              </div>

              {/* Business Details Grid */}
              <div className="space-y-3 pt-3 border-t border-slate-800 text-sm">
                <div className="flex items-start gap-3 text-slate-300">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium block">Physical Address</span>
                    <span className="text-xs text-slate-400">Ojijo Rd, Nairobi (Near Parklands & Westlands boundary)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-300">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium block">Operating Hours</span>
                    <span className="text-xs text-slate-400">Open · Closes 4:00 PM (24/7 Phone & WhatsApp Dispatch)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-300">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium block">Direct Dispatch Hotline</span>
                    <a
                      href={`tel:${COMPANY_INFO.phoneInternational}`}
                      onClick={() => sound.playPhoneBuzz()}
                      className="text-emerald-400 font-bold hover:underline"
                    >
                      {COMPANY_INFO.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Google Plus Code Bar with Quick Copy */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                    Google Maps Plus Code
                  </span>
                  <span className="font-mono text-sm font-bold text-emerald-300 truncate block">
                    {COMPANY_INFO.plusCode}
                  </span>
                </div>
                <button
                  onClick={handleCopyPlusCode}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
                  title="Copy Plus Code to clipboard"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* CTA Links */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
              <a
                href={COMPANY_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all font-display"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Driving Directions</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>

              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playCarChirp()}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-emerald-500/30 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all"
              >
                <WhatsAppIcon className="w-4 h-4 fill-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Verified Customer Reviews */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h4 className="text-lg font-bold font-display text-white">
                  Customer Experiences & Feedback
                </h4>
                <span className="text-xs text-emerald-400 font-semibold">100% Satisfaction Guarantee</span>
              </div>

              {GOOGLE_REVIEWS.map((review, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-emerald-500/20 space-y-2.5 shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white text-sm block">{review.author}</span>
                      <span className="text-[11px] text-slate-400">{review.badge} · {review.date}</span>
                    </div>
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(review.rating)].map((_, rIdx) => (
                        <Star key={rIdx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                    "{review.comment}"
                  </p>
                </div>
              ))}
            </div>

            {/* Trust Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-teal-950/60 border border-emerald-500/30 flex items-center justify-between gap-4 mt-2">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-white block">Transparent Terms & Full Inspection</span>
                  <span className="text-slate-300">Complete pre-drive checklist signed before every handover.</span>
                </div>
              </div>
              <a
                href={COMPANY_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="text-xs text-emerald-400 font-bold hover:underline whitespace-nowrap"
              >
                View on Maps →
              </a>
            </div>
          </motion.div>
        </div>

        {/* Interactive Google Maps Embed with Pin on Ojijo Rd */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 rounded-3xl overflow-hidden border border-emerald-500/30 bg-slate-900/90 shadow-2xl relative"
        >
          <div className="p-4 sm:p-5 bg-slate-950/90 border-b border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-sm">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-white font-bold text-sm sm:text-base block font-display">
                  Interactive Depot Pin: Ojijo Rd, Nairobi
                </span>
                <span className="text-xs text-slate-400">
                  Coordinates: -1.2675238, 36.8115198 · Near Parklands & Westlands Hub
                </span>
              </div>
            </div>
            <a
              href={COMPANY_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Open in Google Maps App</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>
          </div>

          {/* Map iframe */}
          <div className="w-full h-72 sm:h-96 relative bg-slate-950">
            <iframe
              title="Prime Carhire Ojijo Rd Map Location"
              src={COMPANY_INFO.embedMapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full filter saturate-125"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
