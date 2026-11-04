import React from 'react';
import { ChevronRight, Award, ShieldCheck, Sparkles } from 'lucide-react';
import { LoyaltyRewards } from '../components/LoyaltyRewards';
import { sound } from '../utils/audio';

interface LoyaltyPageProps {
  onNavigate: (page: string) => void;
}

export const LoyaltyPage: React.FC<LoyaltyPageProps> = ({ onNavigate }) => {
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
          <span className="text-emerald-300 font-semibold">Loyalty Rewards & VIP Privileges</span>
        </div>
      </div>

      {/* Main Loyalty Rewards Component */}
      <LoyaltyRewards />
    </div>
  );
};
