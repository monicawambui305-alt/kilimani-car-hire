import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Scale,
  ChevronRight,
  ArrowRightLeft,
  Check,
  ShieldCheck,
  Fuel,
  Users,
  Briefcase,
  Zap,
  Gauge,
  Compass,
  Sparkles
} from 'lucide-react';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';
import { FLEET_DATA, Vehicle, COMPANY_INFO } from '../data/fleet';
import { sound } from '../utils/audio';

interface ComparePageProps {
  onNavigate: (page: string) => void;
  onSelectCarForBooking: (car: Vehicle) => void;
}

export const ComparePage: React.FC<ComparePageProps> = ({
  onNavigate,
  onSelectCarForBooking,
}) => {
  const [vehicleAId, setVehicleAId] = useState<string>(FLEET_DATA[0].id);
  const [vehicleBId, setVehicleBId] = useState<string>(FLEET_DATA[1].id);

  const vehicleA = FLEET_DATA.find((c) => c.id === vehicleAId) || FLEET_DATA[0];
  const vehicleB = FLEET_DATA.find((c) => c.id === vehicleBId) || FLEET_DATA[1];

  const handleSwap = () => {
    sound.playClick();
    const temp = vehicleAId;
    setVehicleAId(vehicleBId);
    setVehicleBId(temp);
  };

  const handleInquireBoth = () => {
    sound.playCarChirp();
    const text = `Hello Prime Carhire Ojijo Rd, I am comparing the ${vehicleA.name} (${vehicleA.plateNumber}) and the ${vehicleB.name} (${vehicleB.plateNumber}). Could you provide current rental rates and availability for both?`;
    window.open(`https://wa.me/254104709282?text=${encodeURIComponent(text)}`, '_blank');
  };

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
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('fleet');
            }}
            className="hover:text-emerald-400 transition-colors cursor-pointer"
          >
            Fleet Showroom
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-emerald-300 font-semibold">Side-by-Side Spec Comparison</span>
        </div>
      </div>

      {/* Page Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
            <Scale className="w-3.5 h-3.5" />
            <span>Interactive Fleet Analyzer</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display">
            Compare Vehicle Specifications
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Select any two vehicles from our Ojijo Rd fleet to examine powertrains, seating capacities, fuel economy, baggage volume, and terrain suitability side-by-side.
          </p>
        </div>

        {/* Selection Bars & Swap */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-11 gap-4 items-center max-w-5xl mx-auto">
          {/* Selector A */}
          <div className="md:col-span-5 bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-4">
            <label className="block text-xs font-bold text-emerald-300 uppercase tracking-wider mb-2">
              Vehicle 1 (Primary Selection)
            </label>
            <select
              value={vehicleAId}
              onChange={(e) => {
                sound.playClick();
                setVehicleAId(e.target.value);
              }}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white font-medium focus:outline-none focus:border-emerald-400 cursor-pointer"
            >
              {FLEET_DATA.map((v) => (
                <option key={v.id} value={v.id} disabled={v.id === vehicleBId}>
                  {v.name} ({v.plateNumber}) - {v.categoryLabel}
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex justify-center">
            <button
              onClick={handleSwap}
              className="w-11 h-11 rounded-full bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 flex items-center justify-center border border-emerald-500/40 transition-all cursor-pointer shadow-lg"
              title="Swap vehicles"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Selector B */}
          <div className="md:col-span-5 bg-slate-900/90 border border-teal-500/30 rounded-2xl p-4">
            <label className="block text-xs font-bold text-teal-300 uppercase tracking-wider mb-2">
              Vehicle 2 (Comparison Candidate)
            </label>
            <select
              value={vehicleBId}
              onChange={(e) => {
                sound.playClick();
                setVehicleBId(e.target.value);
              }}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white font-medium focus:outline-none focus:border-emerald-400 cursor-pointer"
            >
              {FLEET_DATA.map((v) => (
                <option key={v.id} value={v.id} disabled={v.id === vehicleAId}>
                  {v.name} ({v.plateNumber}) - {v.categoryLabel}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Visual Header Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Vehicle A Visual */}
          <div className="rounded-3xl bg-slate-900/90 border border-emerald-500/30 overflow-hidden shadow-2xl flex flex-col justify-between">
            <div className="relative aspect-[16/10] bg-slate-950">
              <img
                src={vehicleA.authenticImage}
                alt={vehicleA.name}
                className="w-full h-full object-cover brightness-[0.88] contrast-[1.05]"
              />
              <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/30 text-xs font-bold text-emerald-300">
                {vehicleA.categoryLabel}
              </div>
              <div className="absolute bottom-3 right-3 bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-md border border-slate-700 font-mono text-xs font-bold text-amber-300">
                {vehicleA.plateNumber}
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                  {vehicleA.name}
                </h3>
                <p className="text-xs text-slate-300 mt-1">{vehicleA.tagline}</p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => onSelectCarForBooking(vehicleA)}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-slate-950" />
                  <span>Inquire for {vehicleA.name.split(' ')[0]}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Vehicle B Visual */}
          <div className="rounded-3xl bg-slate-900/90 border border-teal-500/30 overflow-hidden shadow-2xl flex flex-col justify-between">
            <div className="relative aspect-[16/10] bg-slate-950">
              <img
                src={vehicleB.authenticImage}
                alt={vehicleB.name}
                className="w-full h-full object-cover brightness-[0.88] contrast-[1.05]"
              />
              <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-teal-500/30 text-xs font-bold text-teal-300">
                {vehicleB.categoryLabel}
              </div>
              <div className="absolute bottom-3 right-3 bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-md border border-slate-700 font-mono text-xs font-bold text-amber-300">
                {vehicleB.plateNumber}
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                  {vehicleB.name}
                </h3>
                <p className="text-xs text-slate-300 mt-1">{vehicleB.tagline}</p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => onSelectCarForBooking(vehicleB)}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-slate-950" />
                  <span>Inquire for {vehicleB.name.split(' ')[0]}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Spec Comparison Table */}
        <div className="mt-12 max-w-5xl mx-auto rounded-3xl bg-slate-900/90 border border-emerald-500/20 overflow-hidden shadow-2xl">
          <div className="p-5 sm:p-6 bg-slate-950 border-b border-emerald-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <h2 className="text-base sm:text-lg font-bold text-white font-display">
                Technical Specifications & Capabilities Matrix
              </h2>
            </div>
            <button
              onClick={handleInquireBoth}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-emerald-400" />
              <span>Ask Fleet Manager on WhatsApp</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-950/80 text-slate-400 text-[11px] uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4 sm:px-6 w-1/3">Specification</th>
                  <th className="py-3 px-4 sm:px-6 w-1/3 text-emerald-300 font-bold">{vehicleA.name}</th>
                  <th className="py-3 px-4 sm:px-6 w-1/3 text-teal-300 font-bold">{vehicleB.name}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {/* Registration Plate */}
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 sm:px-6 font-medium text-white flex items-center gap-2">
                    <Compass className="w-4 h-4 text-emerald-400" />
                    <span>Official Plate</span>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 font-mono font-bold text-amber-300">{vehicleA.plateNumber}</td>
                  <td className="py-3.5 px-4 sm:px-6 font-mono font-bold text-amber-300">{vehicleB.plateNumber}</td>
                </tr>

                {/* Engine */}
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 sm:px-6 font-medium text-white flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-emerald-400" />
                    <span>Engine Displacement</span>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 font-semibold">{vehicleA.specs.engine}</td>
                  <td className="py-3.5 px-4 sm:px-6 font-semibold">{vehicleB.specs.engine}</td>
                </tr>

                {/* Drivetrain */}
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 sm:px-6 font-medium text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    <span>Drivetrain System</span>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6">
                    <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-300 font-bold text-xs">
                      {vehicleA.specs.drive}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6">
                    <span className="px-2.5 py-1 rounded-md bg-teal-500/10 text-teal-300 font-bold text-xs">
                      {vehicleB.specs.drive}
                    </span>
                  </td>
                </tr>

                {/* Transmission */}
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 sm:px-6 font-medium text-white">Transmission</td>
                  <td className="py-3.5 px-4 sm:px-6">{vehicleA.specs.transmission}</td>
                  <td className="py-3.5 px-4 sm:px-6">{vehicleB.specs.transmission}</td>
                </tr>

                {/* Fuel Type & Economy */}
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 sm:px-6 font-medium text-white flex items-center gap-2">
                    <Fuel className="w-4 h-4 text-emerald-400" />
                    <span>Fuel & Economy</span>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6">
                    <div className="font-semibold text-white">{vehicleA.specs.fuel}</div>
                    <div className="text-xs text-slate-400">{vehicleA.specs.consumption}</div>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6">
                    <div className="font-semibold text-white">{vehicleB.specs.fuel}</div>
                    <div className="text-xs text-slate-400">{vehicleB.specs.consumption}</div>
                  </td>
                </tr>

                {/* Seating */}
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 sm:px-6 font-medium text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span>Passenger Seating</span>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 font-semibold">{vehicleA.specs.seats} Passengers</td>
                  <td className="py-3.5 px-4 sm:px-6 font-semibold">{vehicleB.specs.seats} Passengers</td>
                </tr>

                {/* Luggage */}
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 sm:px-6 font-medium text-white flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-emerald-400" />
                    <span>Luggage Capacity</span>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6">{vehicleA.specs.luggage}</td>
                  <td className="py-3.5 px-4 sm:px-6">{vehicleB.specs.luggage}</td>
                </tr>

                {/* Features */}
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 sm:px-6 font-medium text-white align-top">Key Features</td>
                  <td className="py-3.5 px-4 sm:px-6 align-top">
                    <ul className="space-y-1.5">
                      {vehicleA.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-slate-200">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 align-top">
                    <ul className="space-y-1.5">
                      {vehicleB.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-slate-200">
                          <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>

                {/* Ideal Use Case */}
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 sm:px-6 font-medium text-white align-top">Best Suited For</td>
                  <td className="py-3.5 px-4 sm:px-6 align-top">
                    <div className="flex flex-wrap gap-1.5">
                      {vehicleA.idealFor.map((use, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-emerald-300 text-[11px]">
                          {use}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 align-top">
                    <div className="flex flex-wrap gap-1.5">
                      {vehicleB.idealFor.map((use, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-teal-300 text-[11px]">
                          {use}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>

                {/* Insurance & Inspection */}
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 sm:px-6 font-medium text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Included Coverage</span>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-xs text-slate-300">
                    Comprehensive CDW Insurance + 24/7 Roadside Assistance in Nairobi & Upcountry.
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-xs text-slate-300">
                    Comprehensive CDW Insurance + 24/7 Roadside Assistance in Nairobi & Upcountry.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Table Bottom Action Banner */}
          <div className="p-6 bg-slate-950/90 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400 text-center sm:text-left">
              Need personalized advice for your itinerary? Our Ojijo Rd dispatchers can recommend the exact vehicle.
            </div>
            <button
              onClick={handleInquireBoth}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <WhatsAppIcon className="w-4 h-4 fill-slate-950" />
              <span>Inquire Both on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

