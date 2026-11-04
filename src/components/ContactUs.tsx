import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Copy,
  Check,
  Sparkles
} from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { sound } from '../utils/audio';
import { APP_IMAGES } from '../data/images';
import { COMPANY_INFO, FLEET_DATA } from '../data/fleet';

export const ContactUs: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [carInterest, setCarInterest] = useState(FLEET_DATA[0].name);
  const [submitted, setSubmitted] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyCode = () => {
    sound.playClick();
    navigator.clipboard.writeText(COMPANY_INFO.plusCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playPhoneBuzz();
    setTimeout(() => sound.playCarChirp(), 300);
    setSubmitted(true);
  };

  const handleSendToWhatsApp = () => {
    sound.playCarChirp();
    const text = encodeURIComponent(
      `Hello Prime Carhire! 👋\n\n• Name: ${name || 'Prospective Client'}\n• Phone: ${phone || 'Via WhatsApp'}\n• Vehicle of Interest: ${carInterest}\n• Message: ${message || 'I would like to inquire about rental availability on Ojijo Rd, Nairobi.'}`
    );
    window.open(`https://wa.me/254104709282?text=${text}`, '_blank');
  };

  return (
    <section className="relative min-h-[85vh] py-16 sm:py-24 bg-slate-950 overflow-hidden border-t border-cyan-500/20">
      {/* High-Clarity Background Image: Prime Carhire Concierge & Dispatch Lounge */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={APP_IMAGES.contactUsBg}
          alt="Prime Carhire Concierge & Dispatch Lounge"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center brightness-[0.75] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-cyan-400 uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>24/7 Dispatch Desk & Walk-in Depot</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display break-words">
            Contact Prime Carhire Nairobi
          </h2>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Reach our reservation officers directly on Ojijo Rd. Whether you require executive airport transfers, self-drive 4WD safaris, or monthly corporate fleets, we respond in minutes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Channels & Depot Info */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Quick Action Hotline Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/85 backdrop-blur-md border border-cyan-500/30 shadow-2xl space-y-6">
              <h3 className="text-xl font-bold font-display text-white">
                Direct Contact Channels
              </h3>

              <div className="space-y-4 text-sm">
                {/* Phone Hotline */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs text-slate-400 block font-medium">Direct Telephone & WhatsApp</span>
                    <a
                      href={`tel:${COMPANY_INFO.phoneInternational}`}
                      onClick={() => sound.playPhoneBuzz()}
                      className="text-base sm:text-lg font-bold text-white hover:text-cyan-400 transition-colors"
                    >
                      {COMPANY_INFO.phone}
                    </a>
                    <span className="text-[11px] text-cyan-400 block mt-0.5">Instant Call / Callback Guarantee</span>
                  </div>
                </div>

                {/* WhatsApp Channel */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <WhatsAppIcon className="w-5 h-5 fill-emerald-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs text-slate-400 block font-medium">Instant WhatsApp Line</span>
                    <a
                      href={COMPANY_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playCarChirp()}
                      className="text-base sm:text-lg font-bold text-emerald-400 hover:underline"
                    >
                      0104 709282
                    </a>
                    <span className="text-[11px] text-slate-400 block mt-0.5">Average reply time: under 3 minutes</span>
                  </div>
                </div>

                {/* Physical Location */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs text-slate-400 block font-medium">Ojijo Rd Depot & Staging Lot</span>
                    <p className="text-sm font-semibold text-white">
                      Ojijo Rd, Parklands / Westlands, Nairobi
                    </p>
                    <span className="text-[11px] text-slate-400 block mt-0.5">Plus Code: {COMPANY_INFO.plusCode}</span>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs text-slate-400 block font-medium">Business Hours</span>
                    <p className="text-sm font-semibold text-white">
                      Open · Closes 4:00 PM
                    </p>
                    <span className="text-[11px] text-cyan-400 block mt-0.5">24/7 Airport & Emergency Roadside Support</span>
                  </div>
                </div>
              </div>

              {/* Plus Code Quick Action */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                    Google Maps Plus Code
                  </span>
                  <span className="font-mono text-sm font-bold text-cyan-300">
                    {COMPANY_INFO.plusCode}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyCode}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                  <a
                    href={COMPANY_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-300 border border-cyan-500/30"
                    title="Open on Google Maps"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Reservation & Dispatch Form */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/85 backdrop-blur-md border border-cyan-500/30 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-xl font-bold font-display text-white">
                    Send Direct Dispatch Inquiry
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Fill this quick form and our fleet manager on Ojijo Rd will confirm pricing and vehicle allocation immediately.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold shrink-0">
                  Quick Reply
                </span>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Inquiry Received Successfully!</h4>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Thank you {name || 'valued client'}. Our dispatch desk on Ojijo Rd has received your request for the {carInterest}.
                  </p>
                  <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={handleSendToWhatsApp}
                      className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg cursor-pointer"
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-white" />
                      <span>Chat Immediately on WhatsApp</span>
                    </button>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                    >
                      Send Another Request
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">Your Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. David Mwangi"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">Phone / WhatsApp Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 0712 345 678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Select Preferred Vehicle</label>
                    <select
                      value={carInterest}
                      onChange={(e) => {
                        sound.playClick();
                        setCarInterest(e.target.value);
                      }}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                    >
                      {FLEET_DATA.map((v) => (
                        <option key={v.id} value={v.name}>
                          {v.name} ({v.plateNumber})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Rental Details & Schedule</label>
                    <textarea
                      rows={3}
                      placeholder="Specify your pickup date, number of days, self-drive or chauffeured, and whether you require doorstep delivery in Westlands / Parklands or airport reception..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400 resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-sm tracking-wide shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry to Dispatch</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleSendToWhatsApp}
                      className="py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 cursor-pointer"
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-white" />
                      <span>Direct WhatsApp</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
