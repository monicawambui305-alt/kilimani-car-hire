import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Scale,
  Fuel,
  Users,
  Gauge,
  Luggage,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  Zap
} from 'lucide-react';
import { Vehicle, FLEET_DATA, COMPANY_INFO } from '../data/fleet';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { sound } from '../utils/audio';

interface VehicleCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialVehicleAId?: string;
  onSelectBooking: (vehicleId: string) => void;
}

export const VehicleCompareModal: React.FC<VehicleCompareModalProps> = ({
  isOpen,
  onClose,
  initialVehicleAId,
  onSelectBooking
}) => {
  const [vehicleAId, setVehicleAId] = useState<string>(
    initialVehicleAId || FLEET_DATA[0].id
  );
  const [vehicleBId, setVehicleBId] = useState<string>(
    initialVehicleAId === FLEET_DATA[1]?.id ? FLEET_DATA[0].id : FLEET_DATA[1]?.id || FLEET_DATA[0].id
  );

  // Sync if initialVehicleAId changes when modal opens
  React.useEffect(() => {
    if (initialVehicleAId) {
      setVehicleAId(initialVehicleAId);
      if (initialVehicleAId === vehicleBId) {
        const nextOther = FLEET_DATA.find(v => v.id !== initialVehicleAId);
        if (nextOther) setVehicleBId(nextOther.id);
      }
    }
  }, [initialVehicleAId]);

  if (!isOpen) return null;

  const vehicleA = FLEET_DATA.find(v => v.id === vehicleAId) || FLEET_DATA[0];
  const vehicleB = FLEET_DATA.find(v => v.id === vehicleBId) || FLEET_DATA[1] || FLEET_DATA[0];

  const handleSwap = () => {
    sound.playClick();
    setVehicleAId(vehicleBId);
    setVehicleBId(vehicleAId);
  };

  const handleBooking = (v: Vehicle) => {
    sound.playCarChirp();
    onClose();
    onSelectBooking(v.id);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-slate-900 border border-emerald-500/30 rounded-3xl shadow-2xl shadow-emerald-950/50 overflow-hidden z-10 my-auto text-white"
        >
          {/* Header */}
          <div className="px-5 py-4 sm:px-8 sm:py-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                  Side-by-Side Fleet Comparison
                </h3>
                <p className="text-xs text-slate-400">
                  Compare specifications, seating, powertrain, and capacity to choose your perfect Nairobi rental.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close comparison modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Vehicle Selectors Bar */}
          <div className="p-4 sm:p-6 bg-slate-950/40 border-b border-slate-800/60 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Vehicle A Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Vehicle Option 1
              </label>
              <select
                value={vehicleAId}
                onChange={e => {
                  sound.playClick();
                  setVehicleAId(e.target.value);
                }}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-medium text-white focus:outline-none focus:border-emerald-400"
              >
                {FLEET_DATA.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({v.plateNumber})
                  </option>
                ))}
              </select>
            </div>

            {/* Vehicle B Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-400" />
                Vehicle Option 2
              </label>
              <select
                value={vehicleBId}
                onChange={e => {
                  sound.playClick();
                  setVehicleBId(e.target.value);
                }}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-medium text-white focus:outline-none focus:border-teal-400"
              >
                {FLEET_DATA.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({v.plateNumber})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Comparison Body */}
          <div className="max-h-[62vh] overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* Visual Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Vehicle A Card */}
              <div className="bg-slate-800/40 rounded-2xl p-4 border border-emerald-500/20 relative overflow-hidden flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="relative h-44 sm:h-52 rounded-xl overflow-hidden bg-slate-900 border border-slate-700/60">
                    <img
                      src={vehicleA.authenticImage}
                      alt={vehicleA.name}
                      className="w-full h-full object-cover object-center brightness-[0.88] contrast-[1.05]"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-emerald-950/80 backdrop-blur-sm border border-emerald-500/40 text-[11px] font-mono font-bold text-emerald-300">
                      {vehicleA.plateNumber}
                    </div>
                    <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-sm text-[11px] font-semibold text-slate-300">
                      {vehicleA.categoryLabel}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white font-display">{vehicleA.name}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-0.5">{vehicleA.tagline}</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between">
                  <span className="text-xs text-emerald-400 font-medium">Ready for Dispatch</span>
                  <button
                    onClick={() => handleBooking(vehicleA)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Select & Reserve
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Vehicle B Card */}
              <div className="bg-slate-800/40 rounded-2xl p-4 border border-teal-500/20 relative overflow-hidden flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="relative h-44 sm:h-52 rounded-xl overflow-hidden bg-slate-900 border border-slate-700/60">
                    <img
                      src={vehicleB.authenticImage}
                      alt={vehicleB.name}
                      className="w-full h-full object-cover object-center brightness-[0.88] contrast-[1.05]"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-teal-950/80 backdrop-blur-sm border border-teal-500/40 text-[11px] font-mono font-bold text-teal-300">
                      {vehicleB.plateNumber}
                    </div>
                    <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-sm text-[11px] font-semibold text-slate-300">
                      {vehicleB.categoryLabel}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white font-display">{vehicleB.name}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-0.5">{vehicleB.tagline}</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between">
                  <span className="text-xs text-teal-400 font-medium">Ready for Dispatch</span>
                  <button
                    onClick={() => handleBooking(vehicleB)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Select & Reserve
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Spec Matrix Table */}
            <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-950/50">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/90 text-left text-[11px] uppercase tracking-wider text-slate-400">
                    <th className="py-3 px-4 font-semibold">Specification</th>
                    <th className="py-3 px-4 font-bold text-emerald-300">{vehicleA.name}</th>
                    <th className="py-3 px-4 font-bold text-teal-300">{vehicleB.name}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-400">Drivetrain</td>
                    <td className="py-3 px-4 font-semibold text-white">{vehicleA.specs.drive}</td>
                    <td className="py-3 px-4 font-semibold text-white">{vehicleB.specs.drive}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-400">Seating Capacity</td>
                    <td className="py-3 px-4">{vehicleA.specs.seats} Passengers</td>
                    <td className="py-3 px-4">{vehicleB.specs.seats} Passengers</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-400">Engine</td>
                    <td className="py-3 px-4">{vehicleA.specs.engine}</td>
                    <td className="py-3 px-4">{vehicleB.specs.engine}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-400">Transmission</td>
                    <td className="py-3 px-4">{vehicleA.specs.transmission}</td>
                    <td className="py-3 px-4">{vehicleB.specs.transmission}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-400">Fuel & Economy</td>
                    <td className="py-3 px-4">{vehicleA.specs.fuel} · {vehicleA.specs.consumption}</td>
                    <td className="py-3 px-4">{vehicleB.specs.fuel} · {vehicleB.specs.consumption}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-400">Luggage Space</td>
                    <td className="py-3 px-4">{vehicleA.specs.luggage}</td>
                    <td className="py-3 px-4">{vehicleB.specs.luggage}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-400">Key Features</td>
                    <td className="py-3 px-4">
                      <ul className="space-y-1">
                        {vehicleA.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-1.5 text-xs text-slate-300">
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-3 px-4">
                      <ul className="space-y-1">
                        {vehicleB.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-1.5 text-xs text-slate-300">
                            <Check className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 sm:p-6 bg-slate-950/80 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400 text-center sm:text-left">
              Need personalized advice? Our Ojijo Rd team will match your itinerary with the optimal vehicle.
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleSwap}
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 transition-colors cursor-pointer"
              >
                Swap Vehicles
              </button>
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playCarChirp()}
                className="flex-1 sm:flex-initial py-2.5 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all font-display"
              >
                <WhatsAppIcon className="w-4 h-4 fill-slate-950" />
                <span>Inquire Both on WhatsApp</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
