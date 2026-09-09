import React, { useState, useEffect } from 'react';
import { Flame, Compass, Calendar, Sparkles, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (pujaType?: string) => void;
  onOpenAstrologer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenAstrologer }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-orange-100'
          : 'bg-white/80 backdrop-blur-sm py-4 border-b border-slate-200/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Tagline */}
          <div 
            id="nav-logo-container"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400 flex items-center justify-center shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-2xl tracking-tight text-slate-900">Ved<span className="text-orange-600">setu</span></span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 border border-orange-200">
                  Vedic
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 hidden sm:block">
                Aapki Aastha, Hamaari Vyavastha
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav-links" className="hidden lg:flex items-center gap-7">
            <button
              id="nav-link-home"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-sm font-semibold text-slate-700 hover:text-orange-600 transition-colors"
            >
              Home
            </button>
            <button
              id="nav-link-services"
              onClick={() => scrollToSection('services-section')}
              className="text-sm font-semibold text-slate-700 hover:text-orange-600 transition-colors"
            >
              Services
            </button>
            <button
              id="nav-link-tracker"
              onClick={() => scrollToSection('procedure-tracker-section')}
              className="text-sm font-semibold text-slate-700 hover:text-orange-600 transition-colors flex items-center gap-1.5"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              Procedure Tracker
            </button>
            <button
              id="nav-link-astrologer"
              onClick={onOpenAstrologer}
              className="text-sm font-semibold text-slate-700 hover:text-orange-600 transition-colors flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4 text-amber-500" />
              Virtual Astrologer
              <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full">
                ₹60/15m
              </span>
            </button>
            <button
              id="nav-link-about"
              onClick={() => scrollToSection('about-section')}
              className="text-sm font-semibold text-slate-700 hover:text-orange-600 transition-colors"
            >
              About Us
            </button>
            <button
              id="nav-link-contact"
              onClick={() => scrollToSection('contact-footer')}
              className="text-sm font-semibold text-slate-700 hover:text-orange-600 transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Desktop Right CTA Action */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              id="nav-quick-astrologer-btn"
              onClick={onOpenAstrologer}
              className="hidden md:flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Talk to Astrologer
            </button>
            <button
              id="nav-book-pandit-btn"
              onClick={() => onOpenBooking()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-sm shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/35 active:scale-98 transition-all"
            >
              <Calendar className="w-4 h-4" />
              Book a Pandit
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              id="nav-mobile-book-btn"
              onClick={() => onOpenBooking()}
              className="px-3 py-1.5 rounded-lg bg-orange-600 text-white font-bold text-xs shadow-sm"
            >
              Book
            </button>
            <button
              id="nav-hamburger-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-orange-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div id="mobile-nav-menu" className="sm:hidden mt-3 pt-3 border-t border-slate-200 bg-white rounded-2xl p-4 shadow-xl space-y-3">
            <p className="text-xs font-semibold text-orange-600 uppercase tracking-wider">
              Aapki Aastha, Hamaari Vyavastha
            </p>
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 p-2.5 text-left font-medium text-slate-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg text-sm"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('services-section')}
                className="flex items-center gap-2 p-2.5 text-left font-medium text-slate-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg text-sm"
              >
                Vedic Services & Pujas
              </button>
              <button
                onClick={() => scrollToSection('procedure-tracker-section')}
                className="flex items-center justify-between p-2.5 text-left font-medium text-slate-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg text-sm"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                  Live Procedure Tracker
                </span>
                <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded font-bold">
                  Active Demo
                </span>
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAstrologer();
                }}
                className="flex items-center justify-between p-2.5 text-left font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-700 rounded-lg text-sm"
              >
                <span className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-amber-500" />
                  Virtual Astrologer
                </span>
                <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">
                  ₹60/15m
                </span>
              </button>
              <button
                onClick={() => scrollToSection('about-section')}
                className="flex items-center gap-2 p-2.5 text-left font-medium text-slate-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg text-sm"
              >
                About Founders & Mission
              </button>
              <button
                onClick={() => scrollToSection('contact-footer')}
                className="flex items-center gap-2 p-2.5 text-left font-medium text-slate-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg text-sm"
              >
                Contact & Support
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 rounded-xl bg-orange-600 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Book Pandit Now
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
