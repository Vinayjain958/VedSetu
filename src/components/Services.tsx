import React, { useState } from 'react';
import { POPULAR_PUJAS } from '../data/mockData';
import { Calendar, Package, Clock, Users, ShieldCheck, Sparkles, Check, ChevronRight, Compass, PhoneCall, Video, Flame } from 'lucide-react';

interface ServicesProps {
  onOpenBooking: (pujaType?: string) => void;
  onOpenAstrologer: () => void;
  onOpenSamagriDetails: (pujaName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenBooking, onOpenAstrologer, onOpenSamagriDetails }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedSamagriOption, setSelectedSamagriOption] = useState<'pandit_brings' | 'self_arranged'>('pandit_brings');

  const categories = ['All', 'Popular', 'Havan', 'Graha Shanti', 'Festivals'];

  const filteredPujas = activeCategory === 'All'
    ? POPULAR_PUJAS
    : POPULAR_PUJAS.filter(p => p.category === activeCategory);

  return (
    <section id="services-section" className="py-16 sm:py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Flame className="w-3.5 h-3.5 text-orange-600" />
            Vedic Rituals & Spiritual Services
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Curated Pujas for Every Auspicious Occasion
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Select your ritual with certified Gurukul Priests. Choose whether you want the complete organic kit delivered or self-arrange using our interactive checklist.
          </p>

          {/* Samagri Toggle Preference Banner */}
          <div className="mt-6 inline-flex p-1.5 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <button
              onClick={() => setSelectedSamagriOption('pandit_brings')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                selectedSamagriOption === 'pandit_brings'
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'text-slate-700 hover:text-orange-600'
              }`}
            >
              <Package className="w-4 h-4" />
              Pandit Brings 100% Organic Kit (Recommended)
            </button>
            <button
              onClick={() => setSelectedSamagriOption('self_arranged')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                selectedSamagriOption === 'self_arranged'
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'text-slate-700 hover:text-orange-600'
              }`}
            >
              <Check className="w-4 h-4" />
              Self-Arranged (Interactive Digital Checklist)
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-orange-300 hover:bg-orange-50/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Puja Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPujas.map((puja) => {
            const totalPrice = selectedSamagriOption === 'pandit_brings' 
              ? puja.basePrice + puja.samagriPrice 
              : puja.basePrice;

            return (
              <div 
                key={puja.id}
                id={`puja-card-${puja.id}`}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
              >
                {/* Image Header */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
                  <img 
                    src={puja.image} 
                    alt={puja.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold bg-white/90 backdrop-blur-xs text-slate-800 shadow-xs">
                    {puja.category}
                  </span>

                  {/* Priest Count Pill */}
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-[11px] font-bold bg-orange-600 text-white shadow-xs flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {puja.priestCount} {puja.priestCount > 1 ? 'Pandits' : 'Pandit'}
                  </span>

                  {/* Title overlay in image */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-bold text-lg sm:text-xl leading-tight drop-shadow-sm">{puja.title}</h3>
                    <p className="text-xs text-amber-200 font-spiritual">{puja.hindiTitle}</p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Meta info chips */}
                    <div className="flex items-center gap-4 text-xs text-slate-600 font-medium pb-2 border-b border-slate-100">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-orange-500" />
                        {puja.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        Vedic Certified
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                      {puja.description}
                    </p>

                    {/* Key Benefits */}
                    <div className="mt-3 space-y-1.5">
                      {puja.benefits.slice(0, 2).map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-orange-500 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Samagri details trigger */}
                  <div className="pt-2">
                    <button
                      onClick={() => onOpenSamagriDetails(puja.title)}
                      className="text-xs font-bold text-orange-700 hover:text-orange-800 flex items-center justify-between w-full py-2 px-3 rounded-lg bg-orange-50/70 border border-orange-100 hover:bg-orange-100 transition-colors"
                    >
                      <span className="flex items-center gap-1.5">
                        <Package className="w-3.5 h-3.5 text-orange-600" />
                        View 100% Pure Samagri Checklist ({puja.samagriList.length} items)
                      </span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        {selectedSamagriOption === 'pandit_brings' ? 'Puja + Organic Kit' : 'Dakshina Only'}
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-extrabold text-slate-900">₹{totalPrice.toLocaleString()}</span>
                        {selectedSamagriOption === 'pandit_brings' && (
                          <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                            Kit Included
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      id={`book-btn-${puja.id}`}
                      onClick={() => onOpenBooking(puja.title)}
                      className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md shadow-orange-500/20 active:scale-95 transition-all flex items-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      Book Now
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Featured Feature: Virtual Astrologer Strip */}
        <div className="mt-16 bg-gradient-to-r from-amber-900 via-orange-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-amber-500/30">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                Ethical & Instant Astrology Consultations
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Connect with Senior Jyotish Acharyas at Flat ₹60 / 15 Mins
              </h3>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                No inflated gemstones, no fearmongering. Get clear, scientific Kundali analysis, Shubh Muhurat for business, career guidance, and marriage matching from PhD scholars and Gurukul Acharyas.
              </p>
              
              {/* Feature points */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-medium text-amber-200">
                  <Video className="w-4 h-4 text-amber-400" />
                  Instant Video & Audio Call
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-amber-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  100% Privacy & Encrypted
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-amber-200">
                  <Compass className="w-4 h-4 text-amber-400" />
                  Detailed Birth Chart PDF
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center gap-3">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-center w-full max-w-xs">
                <p className="text-xs uppercase text-amber-300 font-bold tracking-wider">Transparent Flat Rate</p>
                <div className="text-3xl font-extrabold text-white my-1">
                  ₹60 <span className="text-xs font-normal text-slate-300">/ 15 mins</span>
                </div>
                <p className="text-[11px] text-slate-300">3 verified astrologers online right now</p>
              </div>

              <button
                id="virtual-astrologer-featured-cta"
                onClick={onOpenAstrologer}
                className="w-full max-w-xs py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold text-sm shadow-lg shadow-orange-500/20 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-slate-950" />
                Start Instant Consultation
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
