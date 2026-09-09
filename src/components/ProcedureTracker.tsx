import React, { useState, useEffect, useRef } from 'react';
import { MOCK_ACTIVE_BOOKING } from '../data/mockData';
import { ActiveBooking, TrackerStepStatus } from '../types';
import { VedicAartiEngine } from '../utils/audioMantra';
import { 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Star, 
  Volume2, 
  VolumeX, 
  Flame, 
  Calendar,
  Sparkles,
  Info,
  Bell,
  Music,
  Radio
} from 'lucide-react';

interface ProcedureTrackerProps {
  onOpenBooking: (pujaType?: string) => void;
}

export const ProcedureTracker: React.FC<ProcedureTrackerProps> = ({ onOpenBooking }) => {
  const [booking, setBooking] = useState<ActiveBooking>(MOCK_ACTIVE_BOOKING);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(2); // Default to Step 3 (0-indexed: 2)
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [currentLyric, setCurrentLyric] = useState<{ lyrics: string; hindiLyrics: string }>({
    lyrics: "JAI DEV JAI DEV JAI MANGAL MURTI",
    hindiLyrics: "जय देव जय देव जय मंगल मूर्ति"
  });
  const [audioVolume, setAudioVolume] = useState<number>(0.7);
  const [liveSeconds, setLiveSeconds] = useState<number>(1420); // 23 mins 40 secs
  const [isNotified, setIsNotified] = useState<boolean>(false);
  const [bellRinging, setBellRinging] = useState<boolean>(false);

  const audioEngineRef = useRef<VedicAartiEngine | null>(null);

  // Initialize Vedic Audio Engine
  useEffect(() => {
    const engine = new VedicAartiEngine(
      (note) => {
        setCurrentLyric({
          lyrics: note.lyrics,
          hindiLyrics: note.hindiLyrics
        });
      },
      (isPlaying) => {
        setIsPlayingAudio(isPlaying);
      }
    );
    audioEngineRef.current = engine;

    return () => {
      engine.stop();
    };
  }, []);

  const handleToggleAudio = () => {
    if (!audioEngineRef.current) return;
    const newState = audioEngineRef.current.toggle();
    setIsPlayingAudio(newState);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setAudioVolume(vol);
    if (audioEngineRef.current) {
      audioEngineRef.current.setVolume(vol);
    }
  };

  const handleRingBell = () => {
    if (audioEngineRef.current) {
      setBellRinging(true);
      audioEngineRef.current.playTempleBell(1.0);
      setTimeout(() => setBellRinging(false), 600);
    }
  };

  // Live timer simulation for active puja
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Switch steps interactively in the demo
  const handleSimulateStep = (index: number) => {
    setActiveStepIndex(index);
    const updatedSteps = booking.steps.map((step, idx) => {
      let status: TrackerStepStatus = 'upcoming';
      if (idx < index) status = 'completed';
      else if (idx === index) status = 'in_progress';
      return { ...step, status };
    });

    setBooking(prev => ({
      ...prev,
      currentStepIndex: index,
      steps: updatedSteps
    }));
  };

  const currentStep = booking.steps[activeStepIndex];

  return (
    <section id="procedure-tracker-section" className="py-16 sm:py-20 bg-gradient-to-b from-slate-50 via-orange-50/40 to-slate-50 relative border-y border-orange-100/70">
      
      {/* Decorative background aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-600 text-white text-xs font-extrabold uppercase tracking-wider shadow-sm mb-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-300"></span>
            </span>
            Our USP: Real-Time Spiritual Transparency
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            The Interactive Procedure Tracker
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Never wonder what is happening or which mantra is being recited. Track every phase of your sacred ritual from Pandit allocation to the final Purnahuti with live audio feed.
          </p>

          {/* Interactive Simulation Helper */}
          <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white/80 border border-slate-200 px-3 py-1.5 rounded-full shadow-xs">
            <Info className="w-3.5 h-3.5 text-orange-600" />
            Interactive Demo: Click any of the 5 milestone bubbles below or turn ON the live audio feed
          </div>
        </div>

        {/* The Live Active Booking Dashboard */}
        <div className="bg-white rounded-3xl border border-orange-200/90 shadow-xl overflow-hidden">
          
          {/* Dashboard Header Bar */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-5 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-md bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-mono font-bold">
                  {booking.bookingId}
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-0.5 rounded-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active Ritual Session
                </span>
                {isPlayingAudio && (
                  <span className="flex items-center gap-1.5 text-amber-400 text-xs font-bold bg-amber-950/60 border border-amber-800/80 px-2.5 py-0.5 rounded-md animate-pulse">
                    <Radio className="w-3 h-3 text-amber-400" />
                    Chanting Jay Dev Jay Dev Live
                  </span>
                )}
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1.5 flex items-center gap-2">
                {booking.pujaName}
                <span className="text-sm font-normal text-amber-300 font-spiritual hidden sm:inline">
                  ({booking.hindiName})
                </span>
              </h3>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                {booking.location}
              </p>
            </div>

            {/* Live Counter & Audio Recital Player Toggle */}
            <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
              <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-3 text-right">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Active Puja Duration</div>
                <div className="text-xl sm:text-2xl font-mono font-extrabold text-orange-400 flex items-center gap-2 justify-end">
                  <Clock className="w-4 h-4 text-orange-400 animate-spin" />
                  {formatTimer(liveSeconds)}
                </div>
              </div>

              {/* Volume ON / OFF Main Button */}
              <button
                id="tracker-volume-toggle-btn"
                onClick={handleToggleAudio}
                className={`p-3 rounded-2xl border transition-all flex flex-col items-center justify-center gap-1 cursor-pointer select-none ${
                  isPlayingAudio
                    ? 'bg-gradient-to-br from-orange-500 to-amber-600 text-white border-orange-400 shadow-lg shadow-orange-600/40 scale-105 ring-2 ring-orange-400/50'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                }`}
                title={isPlayingAudio ? 'Mute Ganesh Aarti Sound' : 'Play Live Ganesh Aarti (Jay Dev Jay Dev)'}
              >
                {isPlayingAudio ? (
                  <Volume2 className="w-5 h-5 text-white animate-bounce" />
                ) : (
                  <VolumeX className="w-5 h-5 text-slate-400" />
                )}
                <span className="text-[9px] font-extrabold uppercase tracking-wider">
                  {isPlayingAudio ? 'Mantra: ON' : 'Audio OFF'}
                </span>
              </button>

              {/* Temple Bell (Ghanti) Trigger Button */}
              <button
                onClick={handleRingBell}
                className={`p-3 rounded-2xl border border-slate-700 bg-slate-800/90 text-amber-300 hover:bg-slate-700 hover:text-amber-200 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                  bellRinging ? 'scale-110 bg-amber-900/60 border-amber-500 ring-2 ring-amber-400' : ''
                }`}
                title="Ring Sacred Temple Bell (Ghanti)"
              >
                <Bell className={`w-5 h-5 ${bellRinging ? 'animate-wiggle text-amber-300' : 'text-amber-400'}`} />
                <span className="text-[9px] font-bold uppercase tracking-wider">
                  Ring Bell
                </span>
              </button>
            </div>
          </div>

          {/* Live Audio Chanting & Lyrics Bar */}
          <div className={`transition-all duration-300 border-b border-orange-200 ${
            isPlayingAudio 
              ? 'bg-gradient-to-r from-amber-50 via-orange-100 to-amber-50 p-4 block shadow-inner' 
              : 'bg-slate-900/40 p-2.5 px-4 hidden sm:flex items-center justify-between text-xs text-slate-600 bg-orange-50/20'
          }`}>
            {isPlayingAudio ? (
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                
                {/* Audio Status & Wave Equalizer */}
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center shadow-md flex-shrink-0">
                    <Music className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black uppercase tracking-wider text-orange-900">
                        Live Aarti: Jay Dev Jay Dev (Ganesh Aarti)
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] bg-orange-200 text-orange-950 font-bold px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping"></span>
                        Synthesizer Playing
                      </span>
                    </div>

                    {/* Animated Equalizer Waves */}
                    <div className="flex items-end gap-1 h-3 mt-1.5">
                      {[40, 90, 60, 100, 75, 45, 85, 95, 50, 70, 90, 30].map((h, i) => (
                        <span 
                          key={i} 
                          className="w-1 bg-orange-600 rounded-full animate-pulse" 
                          style={{ 
                            height: `${(h * 0.12)}px`,
                            animationDelay: `${(i * 0.1)}s`,
                            animationDuration: '0.6s'
                          }} 
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Active Karaoke Synced Lyrics Display */}
                <div className="bg-white/90 border border-orange-300 rounded-2xl px-5 py-2.5 text-center shadow-xs flex-grow max-w-lg">
                  <span className="text-[10px] uppercase font-bold text-orange-600 tracking-wider block">
                    Reciting Verse:
                  </span>
                  <p className="text-base sm:text-lg font-black text-amber-950 font-spiritual tracking-wide transition-all duration-200 animate-fade-in">
                    “{currentLyric.hindiLyrics}”
                  </p>
                  <p className="text-xs text-orange-800 font-semibold tracking-wider uppercase mt-0.5">
                    {currentLyric.lyrics}
                  </p>
                </div>

                {/* Volume Slider & Bell Quick Action */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                  <div className="flex items-center gap-2 bg-white/80 border border-orange-200 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700">
                    <Volume2 className="w-4 h-4 text-orange-600" />
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.05" 
                      value={audioVolume}
                      onChange={handleVolumeChange}
                      className="w-20 accent-orange-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                      title="Adjust Volume"
                    />
                  </div>

                  <button
                    onClick={handleRingBell}
                    className="px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-sm transition-transform active:scale-95 flex items-center gap-1.5"
                  >
                    <Bell className="w-3.5 h-3.5" />
                    Ring Bell 🔔
                  </button>

                  <button
                    onClick={handleToggleAudio}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold shadow-sm transition-colors"
                  >
                    Stop Audio
                  </button>
                </div>

              </div>
            ) : (
              <div className="flex items-center justify-between w-full">
                <span className="flex items-center gap-2 text-slate-600 text-xs">
                  <Music className="w-3.5 h-3.5 text-orange-600" />
                  <strong>Audio Mantra Feed:</strong> Listen to authentic "Jay Dev Jay Dev" Ganesh Aarti chanting and temple bells while the puja progresses.
                </span>
                <button
                  onClick={handleToggleAudio}
                  className="inline-flex items-center gap-1 text-xs font-bold text-orange-700 hover:text-orange-900 underline"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  Turn ON Aarti Audio
                </button>
              </div>
            )}
          </div>

          {/* Stepped Visual Progress Bar */}
          <div className="p-6 sm:p-8 bg-orange-50/30 border-b border-orange-100">
            <div className="relative">
              
              {/* Connecting Background Line */}
              <div className="absolute top-5 left-6 right-6 h-1 bg-slate-200 -translate-y-1/2 z-0 hidden sm:block">
                <div 
                  className="h-1 bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-500"
                  style={{ width: `${(activeStepIndex / (booking.steps.length - 1)) * 100}%` }}
                />
              </div>

              {/* Steps Nodes */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative z-10">
                {booking.steps.map((step, idx) => {
                  const isCompleted = idx < activeStepIndex;
                  const isCurrent = idx === activeStepIndex;

                  return (
                    <button
                      key={step.id}
                      onClick={() => handleSimulateStep(idx)}
                      className={`text-left p-3 sm:p-2 rounded-2xl sm:rounded-none transition-all flex sm:flex-col items-center sm:items-center gap-3 sm:gap-2 group ${
                        isCurrent 
                          ? 'bg-white sm:bg-transparent shadow-md sm:shadow-none border border-orange-300 sm:border-transparent' 
                          : 'hover:bg-white/60 sm:hover:bg-transparent'
                      }`}
                    >
                      {/* Step Circle Marker */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                        isCompleted
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                          : isCurrent
                          ? 'bg-orange-600 text-white ring-4 ring-orange-200 sacred-pulse scale-110'
                          : 'bg-white border-2 border-slate-300 text-slate-400 group-hover:border-orange-300'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : isCurrent ? (
                          <Flame className="w-5 h-5 text-white" />
                        ) : (
                          <span>{step.id}</span>
                        )}
                      </div>

                      {/* Step Text Info */}
                      <div className="sm:text-center">
                        <p className={`text-xs sm:text-sm font-bold leading-tight ${
                          isCurrent 
                            ? 'text-orange-700' 
                            : isCompleted 
                            ? 'text-emerald-800' 
                            : 'text-slate-500'
                        }`}>
                          {step.title}
                        </p>
                        <p className="text-[11px] text-amber-700 font-spiritual hidden sm:block mt-0.5">
                          {step.hindiTitle}
                        </p>
                        <span className={`inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          isCompleted
                            ? 'bg-emerald-100 text-emerald-800'
                            : isCurrent
                            ? 'bg-orange-100 text-orange-800 animate-pulse'
                            : 'bg-slate-100 text-slate-500'
                        }`}>
                          {step.status === 'in_progress' ? 'Active Now' : step.status}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

            </div>
          </div>

          {/* Active Step Detailed Information & Pandit Profile Card */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Active Stage Details & Mantras */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-orange-600">
                    Phase {activeStepIndex + 1} of 5 Details
                  </span>
                  <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                    {currentStep.title}
                  </h4>
                  <p className="text-sm text-amber-700 font-spiritual font-semibold">
                    {currentStep.hindiTitle}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-slate-500">Timeline</span>
                  <div className="text-xs font-bold text-slate-800">{currentStep.estimatedTime}</div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                {currentStep.description}
              </p>

              {/* Step Checklist points */}
              <div className="space-y-2.5">
                <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Vedic Protocols & Actions In This Phase:
                </h5>
                <div className="space-y-2">
                  {currentStep.detailPoints.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-white p-3 rounded-xl border border-slate-200">
                      <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                        {pIdx + 1}
                      </div>
                      <span className="font-medium">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Mantra Recitation & Aarti Box */}
              {activeStepIndex === 2 && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-200 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-orange-800">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-orange-600" />
                      Live Recitation: Sri Ganpati Atharvashirsha & Ganesh Aarti
                    </span>
                    <span className="text-[11px] bg-orange-200/80 px-2 py-0.5 rounded text-orange-900 font-mono">
                      Rigveda & Aarti
                    </span>
                  </div>
                  <p className="text-sm font-spiritual text-amber-950 italic">
                    “ॐ नमस्ते गणपतये। त्वमेव प्रत्यक्षं तत्त्वमसि। जय देव जय देव जय मंगल मूर्ति...”
                  </p>
                  <p className="text-xs text-slate-600">
                    <strong>Meaning:</strong> Salutations to Lord Ganesha, remover of all obstacles and giver of auspicious bliss.
                  </p>

                  <div className="pt-1 flex items-center gap-2">
                    <button
                      onClick={handleToggleAudio}
                      className="px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
                    >
                      {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      {isPlayingAudio ? 'Mute Aarti Sound' : 'Play "Jay Dev Jay Dev" Sound'}
                    </button>
                    <button
                      onClick={handleRingBell}
                      className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold border border-amber-300 flex items-center gap-1"
                    >
                      🔔 Ring Ghanti
                    </button>
                  </div>
                </div>
              )}

              {activeStepIndex === 3 && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-200 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-orange-800">
                    <span className="flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-orange-600" />
                      Maha Aarti: Sukh Karta Dukh Harta (Jay Dev Jay Dev)
                    </span>
                    <span className="text-[11px] bg-orange-200/80 px-2 py-0.5 rounded text-orange-900 font-mono">
                      Deepa Aarti
                    </span>
                  </div>
                  <p className="text-sm font-spiritual text-amber-950 font-bold">
                    “सुखकर्ता दुःखहर्ता वार्ता विघ्नाची। नुरवी पुरवी प्रेम कृपा जयाची॥ जय देव जय देव जय मंगल मूर्ति...”
                  </p>
                  <div className="pt-1 flex items-center gap-2">
                    <button
                      onClick={handleToggleAudio}
                      className="px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
                    >
                      {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      {isPlayingAudio ? 'Mute Aarti' : 'Play "Jay Dev Jay Dev" Aarti'}
                    </button>
                    <button
                      onClick={handleRingBell}
                      className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold border border-amber-300 flex items-center gap-1"
                    >
                      🔔 Ring Temple Bell
                    </button>
                  </div>
                </div>
              )}

              {/* Notification Button */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => setIsNotified(!isNotified)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    isNotified
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <Bell className="w-3.5 h-3.5" />
                  {isNotified ? 'SMS & WhatsApp Updates Enabled' : 'Send Updates on WhatsApp'}
                </button>
              </div>

            </div>

            {/* Right: Assigned Gurukul Acharya Profile */}
            <div className="lg:col-span-5 bg-gradient-to-b from-slate-50 to-orange-50/50 p-5 sm:p-6 rounded-2xl border border-orange-200/80 space-y-5">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Assigned Vedic Acharya
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  100% Background Verified
                </span>
              </div>

              {/* Acharya Avatar & Credentials */}
              <div className="flex items-center gap-4">
                <img 
                  src={booking.assignedPandit.avatar} 
                  alt={booking.assignedPandit.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-orange-400 shadow-md"
                />
                <div>
                  <h4 className="font-extrabold text-base sm:text-lg text-slate-900">
                    {booking.assignedPandit.name}
                  </h4>
                  <p className="text-xs text-orange-700 font-semibold">
                    {booking.assignedPandit.vedicSchool}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-bold text-amber-600 flex items-center gap-1 bg-amber-100/80 px-2 py-0.5 rounded">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      {booking.assignedPandit.rating}
                    </span>
                    <span className="text-xs text-slate-600 font-medium">
                      {booking.assignedPandit.experience}
                    </span>
                  </div>
                </div>
              </div>

              {/* Verification Details */}
              <div className="space-y-2.5 bg-white p-3.5 rounded-xl border border-slate-200/80 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>DigiLocker Verification ID:</span>
                  <span className="font-mono font-bold text-slate-800">{booking.assignedPandit.verifiedId}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Pooja Languages:</span>
                  <span className="font-bold text-slate-800">{booking.assignedPandit.languages.join(', ')}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Samagri Mode:</span>
                  <span className="font-bold text-emerald-700">100% Organic Kit Provided</span>
                </div>
              </div>

              {/* Call Priest CTA */}
              <div className="pt-2">
                <a
                  href={`tel:${booking.assignedPandit.phone}`}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <Phone className="w-4 h-4 text-orange-400" />
                  Call Pandit Ji ({booking.assignedPandit.phone})
                </a>
              </div>

              {/* Book another ritual CTA */}
              <button
                onClick={() => onOpenBooking()}
                className="w-full py-2.5 rounded-xl bg-white hover:bg-orange-50 text-orange-800 font-bold text-xs border border-orange-200 transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-orange-600" />
                Schedule Another Puja with Vedsetu
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
