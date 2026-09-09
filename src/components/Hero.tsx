import React from 'react';
import { Calendar, MessageSquare, Compass, ShieldCheck, CheckCircle2, Clock, Sparkles, Star, Users, Flame } from 'lucide-react';

interface HeroProps {
  onOpenBooking: (pujaType?: string) => void;
  onOpenAIChat: () => void;
  onOpenAstrologer: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenAIChat, onOpenAstrologer }) => {
  return (
    <section id="hero-section" className="relative overflow-hidden bg-gradient-to-b from-orange-50/60 via-amber-50/30 to-slate-50 pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-orange-100/60">
      {/* Background Decorative Spiritual Mandala Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-orange-200/40 blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-amber-200/40 blur-3xl" />
        <div className="absolute -bottom-20 left-1/4 w-80 h-80 rounded-full bg-rose-200/30 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Core Value Proposition & Tagline */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100/90 border border-orange-200 text-orange-800 shadow-xs">
              <Sparkles className="w-4 h-4 text-orange-600 animate-pulse" />
              <span className="text-xs sm:text-sm font-bold tracking-wide">
                Uber for Pandits · India's Verified Spiritual Platform
              </span>
            </div>

            {/* Main Headline with the Tagline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-tight">
                Authentic Vedic Rituals,{' '}
                <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-amber-500 bg-clip-text text-transparent">
                  On-Demand.
                </span>
              </h1>
              
              {/* Primary Official Tagline */}
              <div className="py-2 inline-block">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-xl sm:text-2xl lg:text-3xl font-spiritual font-bold text-orange-700">
                  <Flame className="w-6 h-6 text-orange-600 flex-shrink-0" />
                  <span>“आपकी आस्था, हमारी व्यवस्था”</span>
                </div>
                <p className="text-sm font-semibold text-amber-900 tracking-wide mt-1">
                  (Aapki Aastha, Hamaari Vyavastha)
                </p>
              </div>
            </div>

            {/* Subtext description targeted for modern users */}
            <p className="text-base sm:text-lg text-slate-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Book Gurukul-certified, DigiLocker-verified Pandits at transparent rates. Experience real-time ritual stage tracking, hassle-free 100% organic samagri delivery, and ethical 1-on-1 virtual astrology at just ₹60 / 15 mins.
            </p>

            {/* Direct Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                id="hero-primary-book-cta"
                onClick={() => onOpenBooking()}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-base shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 active:scale-98 transition-all flex items-center justify-center gap-2.5"
              >
                <Calendar className="w-5 h-5" />
                Explore Services & Book
              </button>

              <button
                id="hero-chat-ai-cta"
                onClick={onOpenAIChat}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-orange-50/70 text-slate-800 font-bold text-base border border-slate-300 hover:border-orange-300 shadow-sm active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5 text-orange-600" />
                Chat with AI Assistant
              </button>

              <button
                id="hero-astrology-cta"
                onClick={onOpenAstrologer}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-amber-50 hover:bg-amber-100/90 text-amber-900 font-bold text-sm border border-amber-200 transition-all flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-amber-600" />
                Astrology (₹60/15m)
              </button>
            </div>

            {/* Value Trust Badges */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-slate-200/80 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2 text-left">
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-900">DigiLocker & Gurukul</div>
                  <div className="text-[11px] text-slate-600">Verified Acharyas</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-left">
                <CheckCircle2 className="w-5 h-5 text-orange-600 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-900">100% Pure Samagri</div>
                  <div className="text-[11px] text-slate-600">Organic & Delivered</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-left col-span-2 sm:col-span-1">
                <Clock className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Live Stage Tracker</div>
                  <div className="text-[11px] text-slate-600">Real-time transparency</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Live Preview Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              
              {/* Decorative background glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl blur-md opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

              {/* Main Card Container */}
              <div className="relative rounded-2xl bg-white border border-orange-100 shadow-xl overflow-hidden">
                
                {/* Card Header with Live Status Tag */}
                <div className="bg-gradient-to-r from-orange-600 to-amber-600 px-5 py-4 text-white flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
                    </span>
                    <span className="text-xs uppercase font-extrabold tracking-wider">Live Puja in Progress</span>
                  </div>
                  <span className="text-xs font-semibold bg-black/20 px-2.5 py-1 rounded-full text-amber-100">
                    Step 3 of 5 Active
                  </span>
                </div>

                {/* Card Content Body */}
                <div className="p-5 space-y-4">
                  {/* Puja Title & Priest Info */}
                  <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">Ganesh Puja & Havan</h3>
                      <p className="text-xs text-orange-600 font-semibold">श्री गणेश पूजन एवं विघ्नहर्ता हवन</p>
                      <p className="text-xs text-slate-500 mt-1">Today · 10:30 AM - 12:30 PM</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Pandit Arrived
                      </span>
                    </div>
                  </div>

                  {/* Priest Snapshot */}
                  <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <img 
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80" 
                      alt="Pandit Rameshwar Trivedi"
                      className="w-12 h-12 rounded-full object-cover border-2 border-orange-300"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-bold text-slate-900 truncate">Pt. Rameshwar Trivedi</p>
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      </div>
                      <p className="text-xs text-slate-500 truncate">Kashi Vishwanath Gurukul</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] font-bold text-amber-600 flex items-center gap-0.5">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> 4.96
                        </span>
                        <span className="text-[10px] text-slate-600">· 14+ Yrs Exp</span>
                      </div>
                    </div>
                  </div>

                  {/* Visual Tracker Micro-Step */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-orange-700 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse"></span>
                        Current: Sankalpa & 108 Durva Arpan
                      </span>
                      <span className="text-slate-500">60% Complete</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full w-3/5"></div>
                    </div>
                  </div>

                  {/* Interactive Trigger Button */}
                  <button
                    onClick={() => {
                      const el = document.getElementById('procedure-tracker-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full py-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-800 font-bold text-xs border border-orange-200 transition-colors flex items-center justify-center gap-2"
                  >
                    View Live Tracker Experience
                    <span className="text-orange-600 font-extrabold">→</span>
                  </button>

                  {/* Trust Footer inside card */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span className="flex items-center gap-1 text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Transparent Pricing
                    </span>
                    <span className="flex items-center gap-1 text-slate-600">
                      <Users className="w-3.5 h-3.5 text-orange-500" /> 12,000+ Happy Families
                    </span>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
