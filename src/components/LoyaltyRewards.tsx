import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Award,
  Gift,
  Plane,
  Percent,
  Sparkles,
  ShieldCheck,
  Clock,
  ArrowRight,
  CheckCircle2,
  Crown,
  HeartHandshake
} from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { APP_IMAGES } from '../data/images';
import { sound } from '../utils/audio';
import { COMPANY_INFO } from '../data/fleet';

export const LoyaltyRewards: React.FC = () => {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [bookingCount, setBookingCount] = useState<number>(4);
  const [claimed, setClaimed] = useState(false);

  // Compute tier based on booking count
  const getTier = (count: number) => {
    if (count >= 10) {
      return {
        name: 'Platinum Elite VIP',
        discount: '20% OFF + Free Airport Transfers Every Trip',
        badgeColor: 'bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 font-bold',
        perks: [
          'Unlimited Free JKIA & Wilson Airport VIP Transfers',
          'Zero Security Deposit on all self-drive hires',
          'Guaranteed free upgrade to Land Cruiser V8 / Prado when available',
          'Dedicated 24/7 personal dispatch concierge on Ojijo Rd'
        ]
      };
    } else if (count >= 5) {
      return {
        name: 'Gold Executive (5th Booking Milestone)',
        discount: '15% OFF on 5th Rental + Priority Dispatch',
        badgeColor: 'bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-bold',
        perks: [
          '15% Off Your 5th Rental',
          'Free JKIA Airport Transfer on any 7+ Day Rental',
          'Priority 10-Minute Doorstep Delivery across Parklands & Westlands',
          'Complimentary vehicle detailing and sanitize pack'
        ]
      };
    } else {
      return {
        name: 'Silver Preferred Member',
        discount: 'Next Milestone: Unlock 15% OFF on 5th Rental',
        badgeColor: 'bg-slate-800 text-emerald-300 border border-emerald-500/30',
        perks: [
          'Earn progress toward 15% OFF milestone',
          'Complimentary 4G WiFi hotspot or baby car seat on request',
          'Expedited digital check-in with verified driver ID'
        ]
      };
    }
  };

  const currentTier = getTier(bookingCount);

  const handleClaimViaWhatsApp = () => {
    sound.playCarChirp();
    const text = encodeURIComponent(
      `Hello Prime Carhire! 🌟\n\nI am inquiring about the Loyalty Rewards Program:\n• Client Name: ${clientName || 'Valued Returning Client'}\n• Phone: ${clientPhone || 'Via WhatsApp'}\n• Booking History: ${bookingCount} Previous Rental(s)\n• Calculated Tier: ${currentTier.name}\n• Entitled Benefit: ${currentTier.discount}\n\nPlease verify my profile and apply my repeat client discount to my upcoming booking!`
    );
    window.open(`https://wa.me/254104709282?text=${text}`, '_blank');
    setClaimed(true);
  };

  return (
    <section id="loyalty-rewards" className="relative py-16 sm:py-24 bg-slate-950 overflow-hidden border-t border-emerald-500/20">
      {/* High-Clarity Background Image: VIP Concierge & Hospitality Lounge */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={APP_IMAGES.loyaltyVipLoungeBg}
          alt="Prime Carhire VIP Concierge Lounge"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center brightness-[0.75] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-400 uppercase">
            <Crown className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Prime Prestige Circle</span>
            <span aria-hidden="true">·</span>
            <span>Repeat Client Rewards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display break-words">
            Loyalty Rewards & VIP Privileges
          </h2>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
            We value long-term partnerships. Enjoy exclusive rate discounts, complimentary Nairobi Expressway airport transfers, zero deposit waivers, and priority vehicle reservations.
          </p>
        </motion.div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {/* Silver Tier */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 backdrop-blur-md border border-slate-800 space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-slate-800 text-xs font-bold text-slate-300 border border-slate-700">
                  Tier 1 (1–4 Hires)
                </span>
                <HeartHandshake className="w-5 h-5 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold font-display text-white">Silver Member</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Start your journey with Prime Carhire. Build your rental history and unlock high-tier savings.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Free child seat / baby booster upon request</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>4G Portable Wi-Fi hotspot on safari trips</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Fast WhatsApp digital booking verification</span>
                </li>
              </ul>
            </div>
            <div className="text-[11px] text-slate-400 font-medium">Standard Member</div>
          </motion.div>

          {/* Gold Tier (Featured) */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 backdrop-blur-md border-2 border-emerald-400 space-y-5 flex flex-col justify-between shadow-2xl shadow-emerald-950/60 relative"
          >
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md font-display">
              Most Popular Milestone
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-300 border border-emerald-500/40">
                  Tier 2 (5–9 Hires)
                </span>
                <Award className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-display text-white">Gold Executive</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Reach your 5th rental milestone to unlock substantial cost reductions and VIP convenience.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-200 pt-2 border-t border-slate-800">
                <li className="flex items-center gap-2 font-semibold text-white">
                  <Percent className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>15% OFF on Your 5th Rental Booking</span>
                </li>
                <li className="flex items-center gap-2">
                  <Plane className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Free JKIA Airport Transfer on 7+ Day Hires</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Priority 10-Minute Doorstep Delivery</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Expedited Security Deposit Refund (Same Day)</span>
                </li>
              </ul>
            </div>
            <div className="pt-2">
              <button
                onClick={handleClaimViaWhatsApp}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-emerald-500/20 cursor-pointer font-display"
              >
                Claim 15% 5th Booking Reward
              </button>
            </div>
          </motion.div>

          {/* Platinum Tier */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 backdrop-blur-md border border-emerald-500/30 space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-teal-500/20 text-xs font-bold text-teal-300 border border-teal-500/40">
                  Tier 3 (10+ Hires)
                </span>
                <Crown className="w-5 h-5 text-teal-400" />
              </div>
              <h3 className="text-xl font-bold font-display text-white">Platinum VIP</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                For corporate accounts, frequent visitors, and dedicated long-term clients.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <li className="flex items-center gap-2 font-semibold text-white">
                  <Percent className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>20% OFF Ongoing Rental Discount</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Zero Security Deposit Required</span>
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Guaranteed Free Vehicle Upgrade to V8 / Prado</span>
                </li>
                <li className="flex items-center gap-2">
                  <Plane className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Complimentary VIP Airport Chauffeur Every Trip</span>
                </li>
              </ul>
            </div>
            <div className="text-[11px] text-emerald-400 font-semibold">Prestige Corporate Tier</div>
          </motion.div>
        </div>

        {/* Interactive Milestone Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-6 sm:p-10 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-emerald-500/30 shadow-2xl max-w-4xl mx-auto space-y-6"
        >
          <div className="space-y-2 text-center">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              Check Your Loyalty Milestone & Discount Eligibility
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Drag the slider to your past booking count to calculate your current loyalty tier and unlockable benefits:
            </p>
          </div>

          {/* Slider */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase text-slate-400">Past Bookings Completed</span>
              <span className="text-sm font-bold text-emerald-300 bg-emerald-950/80 px-4 py-1 rounded-full border border-emerald-500/30">
                {bookingCount} {bookingCount === 1 ? 'Booking' : 'Bookings'}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              value={bookingCount}
              onChange={(e) => setBookingCount(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>1 Booking</span>
              <span className="text-emerald-400 font-bold">5 Bookings (15% OFF)</span>
              <span>10+ Bookings (Platinum 20%)</span>
            </div>
          </div>

          {/* Tier Result Preview */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs text-slate-400 block font-medium">Your Recognized Status:</span>
              <span className="text-base sm:text-lg font-bold text-white block">
                {currentTier.name}
              </span>
              <span className="text-xs text-emerald-400 block font-semibold">
                ✦ {currentTier.discount}
              </span>
            </div>

            <button
              onClick={handleClaimViaWhatsApp}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/40 shrink-0 cursor-pointer font-display"
            >
              <WhatsAppIcon className="w-4 h-4 fill-slate-950" />
              <span>Verify & Apply on WhatsApp</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
