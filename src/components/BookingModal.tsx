import React, { useState } from 'react';
import { POPULAR_PUJAS } from '../data/mockData';
import { X, Package, Check, Sparkles, Flame } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPujaType?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, initialPujaType }) => {
  const [selectedPuja, setSelectedPuja] = useState<string>(initialPujaType || 'Ganesh Puja & Havan');
  const [samagriChoice, setSamagriChoice] = useState<'pandit_brings' | 'self_arranged'>('pandit_brings');
  const [language, setLanguage] = useState<string>('Hindi & Sanskrit');
  const [date, setDate] = useState<string>('2026-08-28');
  const [timeSlot, setTimeSlot] = useState<string>('09:00 AM - 11:00 AM');
  
  // User info
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [gotra, setGotra] = useState<string>('');

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>('');

  if (!isOpen) return null;

  const currentPujaObj = POPULAR_PUJAS.find(p => p.title === selectedPuja) || POPULAR_PUJAS[0];
  const totalPrice = samagriChoice === 'pandit_brings' 
    ? currentPujaObj.basePrice + currentPujaObj.samagriPrice 
    : currentPujaObj.basePrice;

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedRef = `VED-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(generatedRef);
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-orange-100 flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-5 text-white flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Book a Verified Vedic Pandit</h3>
              <p className="text-xs text-orange-100 font-spiritual">“आपकी आस्था, हमारी व्यवस्था”</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 flex-1">
          {isSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                Booking Confirmed & Pandit Assigned!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you, <strong>{name || 'Devotee'}</strong>. Your ritual <strong>{selectedPuja}</strong> is scheduled. Pandit details and live tracker link have been dispatched to WhatsApp.
              </p>

              <div className="bg-orange-50 p-4 rounded-2xl border border-orange-200 text-left max-w-md mx-auto text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Booking Reference ID:</span>
                  <span className="font-mono font-bold text-orange-700">{bookingRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Scheduled Date & Slot:</span>
                  <span className="font-bold text-slate-800">{date} ({timeSlot})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Transparent Dakshina:</span>
                  <span className="font-extrabold text-slate-900">₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Samagri Status:</span>
                  <span className="font-bold text-emerald-700">
                    {samagriChoice === 'pandit_brings' ? '100% Organic Kit by Pandit' : 'Self-Arranged (Checklist Sent)'}
                  </span>
                </div>
              </div>

              <div className="pt-4 flex gap-3 justify-center">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 rounded-xl bg-orange-600 text-white font-bold text-sm shadow-md hover:bg-orange-700"
                >
                  Go to Live Procedure Tracker
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitBooking} className="space-y-6">
              
              {/* Step 1: Select Ritual */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  1. Select Vedic Puja / Ritual
                </label>
                <select
                  value={selectedPuja}
                  onChange={(e) => setSelectedPuja(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 text-slate-900 font-semibold focus:ring-2 focus:ring-orange-500 focus:outline-none"
                >
                  {POPULAR_PUJAS.map(p => (
                    <option key={p.id} value={p.title}>
                      {p.title} ({p.hindiTitle}) - ₹{p.basePrice}
                    </option>
                  ))}
                </select>
              </div>

              {/* Step 2: Samagri Preference */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  2. Samagri Arrangement Mode
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label 
                    className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      samagriChoice === 'pandit_brings'
                        ? 'border-orange-600 bg-orange-50/60'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-orange-600" />
                        <span className="text-xs font-bold text-slate-900">Pandit Brings Kit</span>
                      </div>
                      <input 
                        type="radio" 
                        name="samagriChoice" 
                        checked={samagriChoice === 'pandit_brings'}
                        onChange={() => setSamagriChoice('pandit_brings')}
                        className="text-orange-600 focus:ring-orange-500"
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1.5">
                      100% organic, vacuum-sealed kit with cow ghee & fresh flowers (+₹{currentPujaObj.samagriPrice})
                    </p>
                  </label>

                  <label 
                    className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      samagriChoice === 'self_arranged'
                        ? 'border-orange-600 bg-orange-50/60'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-orange-600" />
                        <span className="text-xs font-bold text-slate-900">I Will Arrange</span>
                      </div>
                      <input 
                        type="radio" 
                        name="samagriChoice" 
                        checked={samagriChoice === 'self_arranged'}
                        onChange={() => setSamagriChoice('self_arranged')}
                        className="text-orange-600 focus:ring-orange-500"
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1.5">
                      We send you an exact interactive digital checklist with gram quantities
                    </p>
                  </label>
                </div>
              </div>

              {/* Step 3: Date, Time & Language */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">Preferred Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">Time Slot / Muhurat</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  >
                    <option value="06:00 AM - 08:00 AM">Brahma Muhurat (06:00 AM)</option>
                    <option value="09:00 AM - 11:00 AM">Morning (09:00 AM - 11:00 AM)</option>
                    <option value="11:30 AM - 01:30 PM">Mid-Day (11:30 AM - 01:30 PM)</option>
                    <option value="05:00 PM - 07:00 PM">Sandhya (05:00 PM - 07:00 PM)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">Priest Language</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  >
                    <option value="Hindi & Sanskrit">Hindi & Sanskrit</option>
                    <option value="English & Hindi">English & Hindi</option>
                    <option value="Tamil / Telugu">Tamil / Telugu</option>
                    <option value="Marathi / Gujarati">Marathi / Gujarati</option>
                    <option value="Bengali / Odia">Bengali / Odia</option>
                  </select>
                </div>
              </div>

              {/* Step 4: Contact & Sankalpa Info */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  3. Devotee & Venue Details (For Sankalp)
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Full Name (Yajman)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    required
                  />

                  <input
                    type="tel"
                    placeholder="WhatsApp Phone Number (+91)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Family Gotra (Optional / Pandit will guide)"
                    value={gotra}
                    onChange={(e) => setGotra(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />

                  <input
                    type="text"
                    placeholder="Complete Venue Address & City"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Summary & Submit */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-medium">Total Dakshina (No hidden charges):</span>
                  <div className="text-2xl font-extrabold text-slate-900">
                    ₹{totalPrice.toLocaleString()}
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md shadow-orange-500/25 active:scale-98 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Confirm & Assign Pandit
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
