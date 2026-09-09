import React from 'react';
import { Flame, Phone, Mail, MapPin, ShieldCheck, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenBooking: (pujaType?: string) => void;
  onOpenAstrologer: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenAstrologer }) => {
  return (
    <footer id="contact-footer" className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400 flex items-center justify-center shadow-lg shadow-orange-500/20">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-extrabold text-2xl tracking-tight text-white">Ved<span className="text-orange-500">setu</span></span>
                <p className="text-xs text-orange-400 font-spiritual">“आपकी आस्था, हमारी व्यवस्था”</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              India's first transparent, on-demand spiritual platform connecting families with Gurukul-certified Pandits, 100% organic samagri, and live ritual stage tracking.
            </p>

            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                Vedic Trust Standard
              </div>
              <p className="text-[11px] text-slate-400">
                Every priest is authenticated via DigiLocker ID & Gurukul verification.
              </p>
            </div>
          </div>

          {/* Col 2: Popular Pujas */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Popular Pujas</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onOpenBooking('Ganesh Puja & Havan')}
                  className="hover:text-orange-400 transition-colors text-left"
                >
                  Ganesh Puja & Havan
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenBooking('Griha Pravesh & Vastu Shanti')}
                  className="hover:text-orange-400 transition-colors text-left"
                >
                  Griha Pravesh & Vastu Shanti
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenBooking('Satyanarayan Katha & Puja')}
                  className="hover:text-orange-400 transition-colors text-left"
                >
                  Satyanarayan Mahapuja
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenBooking('Maha Rudrabhishek Puja')}
                  className="hover:text-orange-400 transition-colors text-left"
                >
                  Maha Rudrabhishek Puja
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenBooking('Navagraha Shanti & Dosh Nivaran')}
                  className="hover:text-orange-400 transition-colors text-left"
                >
                  Navagraha Shanti & Homam
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Spiritual Services */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={onOpenAstrologer}
                  className="hover:text-amber-400 transition-colors text-left flex items-center gap-1 text-amber-300 font-semibold"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Virtual Astrologer (₹60)
                </button>
              </li>
              <li>
                <a href="#procedure-tracker-section" className="hover:text-orange-400 transition-colors">
                  Live Procedure Tracker
                </a>
              </li>
              <li>
                <a href="#services-section" className="hover:text-orange-400 transition-colors">
                  Organic Samagri Kits
                </a>
              </li>
              <li>
                <a href="#about-section" className="hover:text-orange-400 transition-colors">
                  About Founders & Mission
                </a>
              </li>
              <li>
                <a href="#services-section" className="hover:text-orange-400 transition-colors">
                  Pricing Transparency
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Leadership Info */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Contact & Support</h4>
            
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span>+91 98765 43210 (24x7 Helpline)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span>support@vedsetu.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <span>Vedsetu Tech Labs, Bengaluru & Varanasi, India</span>
              </div>
            </div>

            {/* Project Lead Identification Badge */}
            <div className="pt-2">
              <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-xs space-y-0.5">
                <div className="text-[11px] text-slate-400">Project Lead ID:</div>
                <div className="font-mono font-bold text-orange-400 tracking-wider">
                  25101A0059
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Bar: Copyright & Tagline */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © 2026 Vedsetu. All rights reserved. Built with devotion and precision.
          </p>

          <div className="flex items-center gap-2 text-slate-400 font-spiritual text-sm">
            <span>आपकी आस्था, हमारी व्यवस्था</span>
            <span className="text-orange-500 font-sans text-xs">· (Aapki Aastha, Hamaari Vyavastha)</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
