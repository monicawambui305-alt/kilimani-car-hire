import React, { useState } from 'react';
import {
  X,
  Car,
  Calendar,
  MapPin,
  Phone,
  Mail,
  User,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { FLEET_DATA, Vehicle, COMPANY_INFO } from '../data/fleet';
import { sound } from '../utils/audio';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedVehicleId?: string;
  initialDetails?: {
    vehicleId?: string;
    pickupDate?: string;
    returnDate?: string;
    location?: string;
    serviceType?: string;
  };
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedVehicleId,
  initialDetails
}) => {
  const [vehicleId, setVehicleId] = useState<string>(
    initialDetails?.vehicleId || preselectedVehicleId || FLEET_DATA[0].id
  );
  const [serviceType, setServiceType] = useState<string>(
    initialDetails?.serviceType || 'self_drive'
  );
  const [fullName, setFullName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [pickupDate, setPickupDate] = useState<string>(
    initialDetails?.pickupDate ||
      new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [returnDate, setReturnDate] = useState<string>(
    initialDetails?.returnDate ||
      new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0]
  );
  const [deliveryAddress, setDeliveryAddress] = useState<string>(
    initialDetails?.location || 'Ojijo Rd Depot Handover (Parklands / Westlands)'
  );
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('mpesa');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>('');

  if (!isOpen) return null;

  const selectedVehicle =
    FLEET_DATA.find((v) => v.id === vehicleId) || FLEET_DATA[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playPhoneBuzz();
    setTimeout(() => sound.playCarChirp(), 300);

    const ref = `PCH-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);
    setIsSubmitted(true);
  };

  const handleSendToWhatsApp = () => {
    sound.playCarChirp();
    const serviceName = serviceType === 'chauffeur' ? 'With Chauffeur' : 'Self-Drive';
    const text = encodeURIComponent(
      `*NEW BOOKING RESERVATION [${bookingRef}]*\n\n` +
      `• *Company:* Prime Carhire Ojijo Rd\n` +
      `• *Client Name:* ${fullName}\n` +
      `• *Phone:* ${phoneNumber}\n` +
      `• *Vehicle:* ${selectedVehicle.name} (${selectedVehicle.plateNumber})\n` +
      `• *Service:* ${serviceName}\n` +
      `• *Pickup Date:* ${pickupDate}\n` +
      `• *Return Date:* ${returnDate}\n` +
      `• *Delivery / Depot:* ${deliveryAddress}\n` +
      `• *Payment Preference:* ${paymentMethod.toUpperCase()}\n` +
      `• *Special Notes:* ${specialRequests || 'Standard'}\n\n` +
      `Please confirm vehicle availability & dispatch schedule!`
    );
    window.open(`https://wa.me/254104709282?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-emerald-500/30 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 space-y-6 relative shadow-2xl shadow-emerald-950/60 my-auto text-white">
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Prime Carhire Ojijo Rd · Instant Dispatch</span>
              </div>
              <h2 className="text-2xl font-black text-white font-display mt-1">
                Reserve Your Vehicle
              </h2>
              <p className="text-xs text-slate-300">
                Guaranteed vehicle allocation. Handover at our Ojijo Rd depot or doorstep delivery across Westlands, Parklands & JKIA Airport.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Vehicle & Service Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Select Vehicle
                  </label>
                  <select
                    value={vehicleId}
                    onChange={(e) => {
                      sound.playClick();
                      setVehicleId(e.target.value);
                    }}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400 cursor-pointer"
                  >
                    {FLEET_DATA.map((car) => (
                      <option key={car.id} value={car.id}>
                        {car.name} ({car.plateNumber})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Service Preference
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => {
                      sound.playClick();
                      setServiceType(e.target.value);
                    }}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400 cursor-pointer"
                  >
                    <option value="self_drive">Self-Drive Rental</option>
                    <option value="chauffeur">With Professional Chauffeur</option>
                  </select>
                </div>
              </div>

              {/* Client Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Kamau"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0712 345 678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Pickup Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Return Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Delivery / Depot Handover Location *
                </label>
                <select
                  value={deliveryAddress}
                  onChange={(e) => {
                    sound.playClick();
                    setDeliveryAddress(e.target.value);
                  }}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400 cursor-pointer"
                >
                  <option value="Ojijo Rd Depot Handover (Parklands / Westlands)">Ojijo Rd Depot Handover (Walk-in / Free)</option>
                  <option value="Westlands Doorstep Delivery (Apartment / Hotel)">Westlands Doorstep Delivery (Apartment / Hotel)</option>
                  <option value="Parklands Doorstep Delivery">Parklands Doorstep Delivery</option>
                  <option value="Kilimani & Yaya Centre Doorstep">Kilimani & Yaya Centre Doorstep</option>
                  <option value="JKIA Airport (Terminal 1 & 2 Arrival)">JKIA Airport (Terminal 1 & 2 Arrival)</option>
                  <option value="Wilson Airport (Domestic Arrival)">Wilson Airport (Domestic Arrival)</option>
                </select>
              </div>

              {/* Special Notes */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Notes (Destination, Child Seat, Flight Number)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Flight arrives at 14:30 JKIA Terminal 1A, or heading to Naivasha for weekend..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-400 resize-none"
                />
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-950 font-black rounded-xl text-sm shadow-xl shadow-emerald-500/20 transition-all cursor-pointer font-display"
                >
                  Confirm Reservation & Dispatch
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-6 space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-semibold uppercase text-emerald-400 tracking-wider">
                Booking Reference: {bookingRef}
              </span>
              <h3 className="text-2xl font-bold text-white font-display mt-1">
                Reservation Registered!
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mt-2">
                Thank you <strong className="text-white">{fullName}</strong>. Your request for the{' '}
                <strong className="text-emerald-400">{selectedVehicle.name}</strong> ({selectedVehicle.plateNumber}) has been submitted to Prime Carhire Ojijo Rd.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left text-xs text-slate-300 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">Handover Location:</span>
                <span className="text-white font-medium">{deliveryAddress}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Duration:</span>
                <span className="text-white font-medium">{pickupDate} to {returnDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Service:</span>
                <span className="text-emerald-300 font-medium">
                  {serviceType === 'chauffeur' ? 'With Chauffeur' : 'Self-Drive'}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleSendToWhatsApp}
                className="flex-1 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 cursor-pointer font-display"
              >
                <WhatsAppIcon className="w-4 h-4 fill-slate-950" />
                <span>Dispatch Instant WhatsApp Alert</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setIsSubmitted(false);
                  onClose();
                }}
                className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs cursor-pointer border border-slate-700"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
