import React, { useState } from 'react';
import { CERTIFIED_ASTROLOGERS } from '../data/mockData';
import { Astrologer } from '../types';
import { X, Compass, PhoneCall, Video, Star, ShieldCheck, Sparkles } from 'lucide-react';

interface VirtualAstrologerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VirtualAstrologerModal: React.FC<VirtualAstrologerModalProps> = ({ isOpen, onClose }) => {
  const [selectedAstro, setSelectedAstro] = useState<Astrologer>(CERTIFIED_ASTROLOGERS[0]);
  const [consultType, setConsultType] = useState<'video' | 'audio'>('video');
  const [userQuery, setUserQuery] = useState<string>('Career & Job Switch');
  const [isCalling, setIsCalling] = useState<boolean>(false);
  const [callConnected, setCallConnected] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleStartCall = () => {
    setIsCalling(true);
    setTimeout(() => {
      setIsCalling(false);
      setCallConnected(true);
    }, 2000);
  };

  const handleEndCall = () => {
    setCallConnected(false);
    setIsCalling(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-amber-200 flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-800 via-orange-900 to-slate-900 p-5 text-white flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/30 flex items-center justify-center border border-amber-400/40">
              <Compass className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg leading-tight">Virtual Astrologer Consultation</h3>
                <span className="text-[10px] uppercase font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full">
                  ₹60 / 15 Mins
                </span>
              </div>
              <p className="text-xs text-amber-200 font-spiritual">“आपकी आस्था, हमारी व्यवस्था”</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 flex-1">
          {callConnected ? (
            /* Live Call Connected View */
            <div className="text-center py-6 space-y-6">
              <div className="relative w-28 h-28 mx-auto">
                <img 
                  src={selectedAstro.image} 
                  alt={selectedAstro.name}
                  className="w-full h-full rounded-full object-cover border-4 border-emerald-500 shadow-xl"
                />
                <span className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="w-2.5 h-2.5 bg-white rounded-full animate-ping"></span>
                </span>
              </div>

              <div>
                <h4 className="text-2xl font-extrabold text-slate-900">{selectedAstro.name}</h4>
                <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mt-0.5">
                  ● Live {consultType === 'video' ? 'Video' : 'Audio'} Consultation in Progress
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Topic: <strong>{userQuery}</strong> · 15-Minute Session Active
                </p>
              </div>

              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs text-amber-900 max-w-md mx-auto space-y-1">
                <p className="font-bold flex items-center justify-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  Kundali Janma Patrika Loaded Securely
                </p>
                <p className="text-[11px] text-slate-600">
                  Acharya ji is analyzing planetary transits (Gochara) and Dasha periods for you.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleEndCall}
                  className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-colors"
                >
                  End Consultation Session
                </button>
              </div>
            </div>
          ) : isCalling ? (
            /* Connecting Screen */
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto animate-bounce">
                <PhoneCall className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">Connecting with {selectedAstro.name}...</h4>
              <p className="text-xs text-slate-500">Establishing encrypted 1-on-1 audio/video channel</p>
            </div>
          ) : (
            /* Astrologer Selection Form */
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                  1. Select Verified Vedic Jyotish Acharya
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {CERTIFIED_ASTROLOGERS.map((astro) => (
                    <div
                      key={astro.id}
                      onClick={() => setSelectedAstro(astro)}
                      className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                        selectedAstro.id === astro.id
                          ? 'border-amber-600 bg-amber-50/50 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={astro.image} 
                          alt={astro.name} 
                          className="w-12 h-12 rounded-xl object-cover border border-amber-300"
                        />
                        <div className="min-w-0">
                          <h5 className="font-bold text-xs text-slate-900 truncate">{astro.name}</h5>
                          <p className="text-[10px] text-slate-500 truncate">{astro.title}</p>
                          <div className="flex items-center gap-1 text-[10px] font-bold text-amber-600 mt-0.5">
                            <Star className="w-3 h-3 fill-amber-500" /> {astro.rating}
                          </div>
                        </div>
                      </div>

                      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                        <span className="text-slate-500">{astro.experienceYears}y exp</span>
                        <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                          {astro.nextSlot}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 2: Query Topic & Medium */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">Consultation Topic</label>
                  <select
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    <option value="Career & Job Switch">Career, Business & Financial Growth</option>
                    <option value="Marriage & Kundali Milan">Marriage & Kundali Milan (Gun Milan)</option>
                    <option value="Shubh Muhurat Selection">Shubh Muhurat (House/Vehicle/Starting)</option>
                    <option value="Health & Graha Dosh Nivaran">Health & Graha Dosh Nivaran (Rahu/Shani)</option>
                    <option value="Higher Education Abroad">Higher Education & Foreign Travel</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">Preferred Mode</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setConsultType('video')}
                      className={`p-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                        consultType === 'video'
                          ? 'bg-amber-600 text-white border-amber-600'
                          : 'bg-white text-slate-700 border-slate-300'
                      }`}
                    >
                      <Video className="w-3.5 h-3.5" /> Video Call
                    </button>
                    <button
                      type="button"
                      onClick={() => setConsultType('audio')}
                      className={`p-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                        consultType === 'audio'
                          ? 'bg-amber-600 text-white border-amber-600'
                          : 'bg-white text-slate-700 border-slate-300'
                      }`}
                    >
                      <PhoneCall className="w-3.5 h-3.5" /> Audio Call
                    </button>
                  </div>
                </div>
              </div>

              {/* Guarantee Bar */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  The Vedsetu Ethical Astrology Promise:
                </div>
                <p className="text-slate-600 text-[11px]">
                  Flat rate of <strong>₹60 for 15 minutes</strong>. Strictly zero gemstone upselling, zero unscientific fearmongering. Only Vedic calculation and actionable remedies.
                </p>
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-[11px] text-slate-500 font-medium">Session Fee (15 Mins):</span>
                  <div className="text-2xl font-extrabold text-slate-900">₹60</div>
                </div>

                <button
                  onClick={handleStartCall}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-sm shadow-md shadow-orange-500/20 active:scale-98 transition-all flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  Connect Instantly (₹60)
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
