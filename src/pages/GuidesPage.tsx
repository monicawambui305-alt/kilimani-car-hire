import React from 'react';
import { ChevronRight, BookOpen, Compass } from 'lucide-react';
import { BlogSection } from '../components/BlogSection';
import { sound } from '../utils/audio';

interface GuidesPageProps {
  onNavigate: (page: string) => void;
  onOpenBooking: () => void;
}

export const GuidesPage: React.FC<GuidesPageProps> = ({
  onNavigate,
  onOpenBooking,
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
          <span className="text-emerald-300 font-semibold">Nairobi & Kenya Safari Car Hire Guides</span>
        </div>
      </div>

      {/* Main Blog Component */}
      <BlogSection onOpenBooking={onOpenBooking} />
    </div>
  );
};
