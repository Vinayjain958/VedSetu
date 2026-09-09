import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { ProcedureTracker } from './components/ProcedureTracker';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { VirtualAstrologerModal } from './components/VirtualAstrologerModal';
import { DynamicSamagriModal } from './components/DynamicSamagriModal';
import { AIChatbotWidget } from './components/AIChatbotWidget';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [selectedPujaForBooking, setSelectedPujaForBooking] = useState<string>('Ganesh Puja & Havan');
  
  const [isAstrologerOpen, setIsAstrologerOpen] = useState<boolean>(false);
  const [isSamagriOpen, setIsSamagriOpen] = useState<boolean>(false);
  const [selectedPujaForSamagri, setSelectedPujaForSamagri] = useState<string>('Ganesh Puja & Havan');
  
  const [isAIChatOpen, setIsAIChatOpen] = useState<boolean>(false);

  const handleOpenBooking = (pujaType?: string) => {
    if (pujaType) {
      setSelectedPujaForBooking(pujaType);
    }
    setIsBookingOpen(true);
  };

  const handleOpenAstrologer = () => {
    setIsAstrologerOpen(true);
  };

  const handleOpenSamagri = (pujaName?: string) => {
    if (pujaName) {
      setSelectedPujaForSamagri(pujaName);
    }
    setIsSamagriOpen(true);
  };

  const handleToggleAIChat = () => {
    setIsAIChatOpen(prev => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-orange-500 selection:text-white">
      {/* Sticky Navigation Bar */}
      <Navbar 
        onOpenBooking={handleOpenBooking}
        onOpenAstrologer={handleOpenAstrologer}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero Section with updated Tagline "Aapki Aastha, Hamaari Vyavastha" */}
        <Hero 
          onOpenBooking={handleOpenBooking}
          onOpenAIChat={() => setIsAIChatOpen(true)}
          onOpenAstrologer={handleOpenAstrologer}
        />

        {/* 2. Services & Rituals Catalog */}
        <Services 
          onOpenBooking={handleOpenBooking}
          onOpenAstrologer={handleOpenAstrologer}
          onOpenSamagriDetails={handleOpenSamagri}
        />

        {/* 3. The USP: Interactive Procedure Tracker */}
        <ProcedureTracker 
          onOpenBooking={handleOpenBooking}
        />

        {/* 4. About Us & Founders Section */}
        <AboutSection />
      </main>

      {/* 5. Footer with Project Lead ID 25101A0059 & Tagline */}
      <Footer 
        onOpenBooking={handleOpenBooking}
        onOpenAstrologer={handleOpenAstrologer}
      />

      {/* Modals & Floating Components */}
      <BookingModal 
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialPujaType={selectedPujaForBooking}
      />

      <VirtualAstrologerModal 
        isOpen={isAstrologerOpen}
        onClose={() => setIsAstrologerOpen(false)}
      />

      <DynamicSamagriModal 
        isOpen={isSamagriOpen}
        onClose={() => setIsSamagriOpen(false)}
        pujaTitle={selectedPujaForSamagri}
        onOpenBooking={handleOpenBooking}
      />

      {/* 6. Interactive AI Chatbot Widget */}
      <AIChatbotWidget 
        isOpen={isAIChatOpen}
        onToggle={handleToggleAIChat}
        onOpenBooking={handleOpenBooking}
        onOpenAstrologer={handleOpenAstrologer}
      />
    </div>
  );
}
