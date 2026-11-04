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
          className="relative w-full max-w-5xl bg-slate-900 border border-cyan-500/30 rounded-3xl shadow-2xl shadow-cyan-950/50 overflow-hidden z-10 my-auto text-white"
        >
          {/* Header */}
          <div className="px-5 py-4 sm:px-8 sm:py-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
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
              <label className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                Vehicle Option 1
              </label>
              <select
                value={vehicleAId}
                onChange={e => {
                  sound.playClick();
                  setVehicleAId(e.target.value);
                }}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-medium text-white focus:outline-none focus:border-cyan-400"
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
              <label className="text-xs font-semibold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                Vehicle Option 2
              </label>
              <select
                value={vehicleBId}
                onChange={e => {
                  sound.playClick();
                  setVehicleBId(e.target.value);
                }}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-medium text-white focus:outline-none focus:border-blue-400"
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
              <div className="bg-slate-800/40 rounded-2xl p-4 border border-cyan-500/20 relative overflow-hidden flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="relative h-44 sm:h-52 rounded-xl overflow-hidden bg-slate-900 border border-slate-700/60">
                    <img
                      src={vehicleA.authenticImage}
                      alt={vehicleA.name}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-cyan-950/80 backdrop-blur-sm border border-cyan-500/40 text-[11px] font-mono font-bold text-cyan-300">
                      {vehicleA.plateNumber}
                    </div>
                    <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-sm text-[11px] font-semibold text-slate-300">
                      {vehicleA.categoryLabel}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white">{vehicleA.name}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-0.5">{vehicleA.tagline}</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between">
                  <span className="text-xs text-cyan-400 font-medium">Ready for Dispatch</span>
                  <button
                    onClick={() => handleBooking(vehicleA)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Select & Reserve
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Vehicle B Card */}
              <div className="bg-slate-800/40 rounded-2xl p-4 border border-blue-500/20 relative overflow-hidden flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="relative h-44 sm:h-52 rounded-xl overflow-hidden bg-slate-900 border border-slate-700/60">
                    <img
                      src={vehicleB.authenticImage}
                      alt={vehicleB.name}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-blue-950/80 backdrop-blur-sm border border-blue-500/40 text-[11px] font-mono font-bold text-blue-300">
                      {vehicleB.plateNumber}
                    </div>
                    <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-sm text-[11px] font-semibold text-slate-300">
                      {vehicleB.categoryLabel}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white">{vehicleB.name}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-0.5">{vehicleB.tagline}</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between">
                  <span className="text-xs text-blue-400 font-medium">Ready for Dispatch</span>
                  <button
                    onClick={() => handleBooking(vehicleB)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Select & Reserve
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Spec Table */}
            <div className="bg-slate-950/60 rounded-2xl border border-slate-800 overflow-hidden text-xs sm:text-sm">
              <div className="p-3 bg-slate-800/60 text-xs font-semibold uppercase tracking-wider text-slate-400 px-4">
                Core Engineering & Powertrain
              </div>
              <div className="divide-y divide-slate-800/60">
                {/* Seating */}
                <div className="grid grid-cols-3 p-3 sm:px-4 items-center">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Users className="w-4 h-4 text-cyan-400" />
                    <span>Seating Capacity</span>
                  </div>
                  <div className="font-semibold text-white">{vehicleA.specs.seats} Passengers</div>
                  <div className="font-semibold text-white">{vehicleB.specs.seats} Passengers</div>
                </div>

                {/* Drivetrain */}
                <div className="grid grid-cols-3 p-3 sm:px-4 items-center bg-slate-900/30">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Gauge className="w-4 h-4 text-cyan-400" />
                    <span>Drivetrain</span>
                  </div>
                  <div className="font-semibold text-cyan-300">{vehicleA.specs.drive}</div>
                  <div className="font-semibold text-blue-300">{vehicleB.specs.drive}</div>
                </div>

                {/* Fuel & Efficiency */}
                <div className="grid grid-cols-3 p-3 sm:px-4 items-center">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Fuel className="w-4 h-4 text-cyan-400" />
                    <span>Fuel & Consumption</span>
                  </div>
                  <div>
                    <span className="font-semibold text-white">{vehicleA.specs.fuel}</span>
                    <span className="text-xs text-slate-400 block">{vehicleA.specs.consumption}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-white">{vehicleB.specs.fuel}</span>
                    <span className="text-xs text-slate-400 block">{vehicleB.specs.consumption}</span>
                  </div>
                </div>

                {/* Engine */}
                <div className="grid grid-cols-3 p-3 sm:px-4 items-center bg-slate-900/30">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    <span>Engine</span>
                  </div>
                  <div className="text-slate-200">{vehicleA.specs.engine}</div>
                  <div className="text-slate-200">{vehicleB.specs.engine}</div>
                </div>

                {/* Transmission */}
                <div className="grid grid-cols-3 p-3 sm:px-4 items-center">
                  <div className="flex items-center gap-2 text-slate-400">
                    <span>Transmission</span>
                  </div>
                  <div className="text-white font-medium">{vehicleA.specs.transmission}</div>
                  <div className="text-white font-medium">{vehicleB.specs.transmission}</div>
                </div>

                {/* Luggage */}
                <div className="grid grid-cols-3 p-3 sm:px-4 items-center bg-slate-900/30">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Luggage className="w-4 h-4 text-cyan-400" />
                    <span>Luggage Capacity</span>
                  </div>
                  <div className="text-slate-200">{vehicleA.specs.luggage}</div>
                  <div className="text-slate-200">{vehicleB.specs.luggage}</div>
                </div>
              </div>
            </div>

            {/* Features & Best For */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-800 space-y-2">
                <h5 className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                  {vehicleA.name} Highlights
                </h5>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {vehicleA.features.slice(0, 4).map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-800 space-y-2">
                <h5 className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                  {vehicleB.name} Highlights
                </h5>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {vehicleB.features.slice(0, 4).map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Footer Direct WhatsApp Dispatch */}
          <div className="p-4 sm:p-6 bg-slate-950/80 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-400 text-center sm:text-left">
              Depot walk-ins welcomed along <span className="text-white font-medium">Ojijo Rd, Nairobi</span> · Closes 4:00 PM
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleSwap}
                className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors cursor-pointer"
              >
                Swap Order
              </button>
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-md shadow-emerald-950/50"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                Inquire on WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
