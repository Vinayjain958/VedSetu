import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Sparkles, Calendar, Compass, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { ChatMessage } from '../types';

interface AIChatbotWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
  onOpenBooking: (pujaType?: string) => void;
  onOpenAstrologer: () => void;
}

// Generates dynamic, context-aware Vedic guidance if API key is not yet set in Vercel or offline
function getIntelligentVedicGuidance(query: string): { reply: string; quickActions?: Array<{ label: string; actionType: 'book_puja' | 'open_astrologer'; payload?: string }> } {
  const lower = query.toLowerCase();

  if (lower.includes('muhurat') || lower.includes('time') || lower.includes('date') || lower.includes('auspicious') || lower.includes('tithi') || lower.includes('panchang')) {
    return {
      reply: 'Namaste! 🙏 In Vedic Panchang, an auspicious Shubh Muhurat is calculated using 5 key elements (Tithi, Vara, Nakshatra, Yoga, and Karana) while strictly avoiding Rahu Kaal, Yamaganda, and Bhadra.\n\n• For Griha Pravesh & Weddings: Shukla Paksha with Pushya, Rohini, or Uttara Nakshatras are considered supreme.\n• For Hawan & Pujas: Abhijit Muhurat and Brahma Muhurat are highly propitious.\n\nYou can consult our Gurukul Jyotish Acharyas directly for personalized Muhurat calculated against your Janma Kundali.',
      quickActions: [
        { label: 'Consult Astrologer (₹60)', actionType: 'open_astrologer' },
        { label: 'Book Shubh Puja', actionType: 'book_puja', payload: 'Ganesh Puja & Havan' }
      ]
    };
  }

  if (lower.includes('samagri') || lower.includes('item') || lower.includes('list') || lower.includes('material') || lower.includes('kit')) {
    return {
      reply: 'Namaste! 🙏 Vedsetu delivers 100% sealed, lab-certified organic samagri kits directly with our Pandits:\n\n• Pure Desi Gir Cow Ghee (A2 Bilona)\n• Seasoned Mango Wood (Samidha) & Copper Havan Kund\n• Pure Bhimseni Kapur (Camphor) & Loban\n• Roli, Kumkum, Chandan, Haldi Ghat & Akshat (unbroken rice)\n• Supari, Clove, Green Cardamom, Betel Leaves\n• Sacred Panchamrit (Desi Milk, Curd, Honey, Sugar, Ghee)\n\nZero chemical adulteration or synthetic fragrances.',
      quickActions: [
        { label: 'Book Puja with Kit', actionType: 'book_puja', payload: 'Ganesh Puja & Havan' },
        { label: 'Consult Astrologer (₹60)', actionType: 'open_astrologer' }
      ]
    };
  }

  if (lower.includes('griha pravesh') || lower.includes('house') || lower.includes('home') || lower.includes('flat') || lower.includes('shifting')) {
    return {
      reply: 'Namaste! 🙏 For Griha Pravesh & Vastu Shanti, authentic Vedic Vidhi proceeds through 4 sacred stages:\n\n1. Dwar Puja & Auspicious Threshold Crossing (with Cow/Calf or Kalash)\n2. Sacred Milk Boiling Ceremony (Ksheera Vidhi - overflowing brings abundance)\n3. Gauri-Ganesh Sthapana & Navagraha Shanti Homam\n4. Vastu Purusha Aradhana & Havan to cleanse all negative energies\n\nOur Gurukul Acharyas arrive with complete organic samagri and perform the rituals with correct Vedic pronunciation.',
      quickActions: [
        { label: 'Book Griha Pravesh', actionType: 'book_puja', payload: 'Griha Pravesh & Vastu Shanti' },
        { label: 'Check Vastu Muhurat (₹60)', actionType: 'open_astrologer' }
      ]
    };
  }

  if (lower.includes('rudra') || lower.includes('shiva') || lower.includes('mahadev') || lower.includes('abhishek') || lower.includes('bholenath')) {
    return {
      reply: 'Namaste! 🙏 Om Namah Shivaya. Maha Rudrabhishek is the supreme Vedic ritual for health, planetary mitigation, and peace. Our Acharyas recite Sri Rudram (Namakam and Chamakam):\n\n• Continuous Abhishek with Gangajal, Cow Milk, Honey, Sugarcane juice, and Panchamrit\n• Archana with fresh unbroken Bilva Patra (Bel leaves), Bhasma, and Dhatura\n• Maha Mrityunjaya Japa & Aarti with digital sound chanting in our Live Procedure Tracker.',
      quickActions: [
        { label: 'Book Rudrabhishek', actionType: 'book_puja', payload: 'Maha Rudrabhishek' },
        { label: 'Consult Astrologer (₹60)', actionType: 'open_astrologer' }
      ]
    };
  }

  if (lower.includes('satyanarayan') || lower.includes('katha') || lower.includes('purnima') || lower.includes('vrat')) {
    return {
      reply: 'Namaste! 🙏 Shri Satyanarayan Mahapuja is performed for family harmony, new ventures, and Purnima blessings. The ritual comprises:\n\n• Kalash Sthapana & Navagraha Invocation\n• Recitation of 5 sacred Adhyayas from the Reva Khanda of Skanda Purana\n• Authentic Panchamrit snan and preparation of Sheera (Panjiri) Prasad\n• Maha Aarti and Sankalpa for the entire family.',
      quickActions: [
        { label: 'Book Satyanarayan Katha', actionType: 'book_puja', payload: 'Satyanarayan Katha' },
        { label: 'Consult Astrologer (₹60)', actionType: 'open_astrologer' }
      ]
    };
  }

  if (lower.includes('price') || lower.includes('cost') || lower.includes('fee') || lower.includes('charge') || lower.includes('dakshina') || lower.includes('rate')) {
    return {
      reply: 'Namaste! 🙏 Vedsetu guarantees 100% price transparency with zero hidden dakshina requests:\n\n• Verified Gurukul Acharya pujas start from ₹2,100 (inclusive of complete ritual vidhi)\n• All-inclusive packages include 100% pure organic samagri delivered at your doorstep\n• Ethical Vedic Astrology Consultations are a flat ₹60 for 15 minutes\n\nAll payments are settled securely upfront with zero awkward last-minute demands.',
      quickActions: [
        { label: 'Explore Puja Packages', actionType: 'book_puja', payload: 'Ganesh Puja & Havan' },
        { label: 'Astrology at ₹60', actionType: 'open_astrologer' }
      ]
    };
  }

  if (lower.includes('astro') || lower.includes('kundali') || lower.includes('horoscope') || lower.includes('marriage') || lower.includes('gun') || lower.includes('career') || lower.includes('dosha') || lower.includes('kaal sarp') || lower.includes('mangal') || lower.includes('gemstone')) {
    return {
      reply: 'Namaste! 🙏 Vedsetu offers transparent, ethical Vedic Astrology consultations at a flat rate of ₹60 for 15 minutes.\n\nOur Jyotish Acharyas analyze your Janma Kundali, Mahadasha, and planetary transits (Gochar). We adhere to a strict ethical charter: 100% genuine shastra guidance, zero fearmongering, and zero pushy gemstone sales.',
      quickActions: [
        { label: 'Consult Astrologer (₹60)', actionType: 'open_astrologer' },
        { label: 'Book Shanti Puja', actionType: 'book_puja', payload: 'Ganesh Puja & Havan' }
      ]
    };
  }

  if (lower.includes('pandit') || lower.includes('acharya') || lower.includes('gurukul') || lower.includes('who are') || lower.includes('verify')) {
    return {
      reply: 'Namaste! 🙏 Every Vedsetu Pandit is an authentic Gurukul-certified Acharya:\n\n• Rigorous formal training in Shukla Yajurveda, Rigveda, or Samaveda\n• Verified background, identity, and Gurukul credentials\n• Flawless Sanskrit pronunciation with proper svara and mudras\n• Accompanied by pure organic samagri and the real-time Vedsetu procedure tracker.',
      quickActions: [
        { label: 'Book Verified Pandit', actionType: 'book_puja', payload: 'Ganesh Puja & Havan' },
        { label: 'Consult Astrologer (₹60)', actionType: 'open_astrologer' }
      ]
    };
  }

  if (lower.includes('audio') || lower.includes('mantra') || lower.includes('sound') || lower.includes('tracker') || lower.includes('procedure')) {
    return {
      reply: 'Namaste! 🙏 Our Interactive Procedure Tracker allows devotees to follow every step of their puja in real-time. It features authentic Vedic chanting audio (such as Ganapati Atharvashirsha and Jai Dev Jai Dev Ganesh Aarti), synchronized lyrics with Hindi & English meanings, and a digital bell!',
      quickActions: [
        { label: 'Book Puja with Tracker', actionType: 'book_puja', payload: 'Ganesh Puja & Havan' }
      ]
    };
  }

  return {
    reply: `Namaste! 🙏 I am your Vedsetu Spiritual AI Assistant. I can assist you with:\n\n• Calculating auspicious Shubh Muhurats for your sacred ceremonies\n• Providing complete 100% pure organic samagri checklists\n• Explaining the authentic Vedic Vidhi for Ganesh Puja, Griha Pravesh, Rudrabhishek, or Satyanarayan Katha\n• Connecting you with verified Gurukul Acharyas and ethical Astrologers (flat ₹60).`,
    quickActions: [
      { label: 'Book a Pandit', actionType: 'book_puja', payload: 'Ganesh Puja & Havan' },
      { label: 'Consult Astrologer (₹60)', actionType: 'open_astrologer' }
    ]
  };
}

export const AIChatbotWidget: React.FC<AIChatbotWidgetProps> = ({
  isOpen,
  onToggle,
  onOpenBooking,
  onOpenAstrologer,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: 'Namaste! 🙏 I am your Vedsetu Spiritual AI Assistant powered by Gemini. I can guide you with Shubh Muhurats, puja samagri checklists, or finding the ideal Vedic ritual for your home.',
      timestamp: '10:00 AM'
    },
    {
      id: 'msg-2',
      sender: 'user',
      text: 'What samagri do I need for a basic havan?',
      timestamp: '10:01 AM'
    },
    {
      id: 'msg-3',
      sender: 'ai',
      text: 'Here is your essential checklist for a Basic Vedic Havan:\n\n• Pure Cow Desi Ghee (500g)\n• Seasoned Mango Wood (Samidha - 2kg)\n• Copper Havan Kund & Sruva Spoon\n• 32-Herb Ayurvedic Havan Samagri packet\n• Pure Bhimseni Camphor (Kapur) & Guggul\n• Roli, Kumkum, Chandan & Akshat\n• Navadhanya (9 Sacred Grains)\n\nWould you like me to book a Gurukul Pandit with this 100% organic kit included?',
      timestamp: '10:01 AM',
      quickActions: [
        { label: 'Book Havan with Kit', actionType: 'book_puja', payload: 'Ganesh Puja & Havan' },
        { label: 'Consult Astrologer (₹60)', actionType: 'open_astrologer' }
      ]
    }
  ]);

  const [inputVal, setInputVal] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (typeof textToSend === 'string' ? textToSend : inputVal).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsLoading(true);

    let answerReceived = false;

    // 1. First attempt: call serverless / server route /api/chat
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-6).map(m => ({
            sender: m.sender,
            text: m.text,
          })),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data && typeof data.reply === 'string' && data.reply.trim()) {
          const aiMsg: ChatMessage = {
            id: `ai-${Date.now()}`,
            sender: 'ai',
            text: data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            quickActions: data.quickActions && data.quickActions.length > 0 ? data.quickActions : undefined,
          };
          setMessages(prev => [...prev, aiMsg]);
          answerReceived = true;
        }
      }
    } catch (serverErr) {
      console.warn('/api/chat fetch encountered issue:', serverErr);
    }

    // 2. Second attempt: if server route didn't return an answer, check if client has VITE_GEMINI_API_KEY
    if (!answerReceived) {
      const clientApiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
      if (clientApiKey) {
        try {
          const ai = new GoogleGenAI({ apiKey: clientApiKey });
          const candidateModels = ['gemini-3.1-flash-lite', 'gemini-flash-latest', 'gemini-3.8-flash'];
          let clientText = '';

          for (const model of candidateModels) {
            try {
              const res = await ai.models.generateContent({
                model,
                contents: [{ role: 'user', parts: [{ text }] }],
                config: {
                  systemInstruction: 'You are the authentic Vedsetu Spiritual AI Assistant for Vedsetu. Answer queries respectfully based on Hindu Vedic traditions, shubh muhurats, puja samagri, and ritual procedures with concise structured formatting.',
                  temperature: 0.7,
                },
              });
              if (res.text) {
                clientText = res.text;
                break;
              }
            } catch {
              // Try next model
            }
          }

          if (clientText) {
            const aiMsg: ChatMessage = {
              id: `ai-${Date.now()}`,
              sender: 'ai',
              text: clientText,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              quickActions: [
                { label: 'Book a Pandit Now', actionType: 'book_puja', payload: 'Ganesh Puja & Havan' },
                { label: 'Consult Astrologer (₹60)', actionType: 'open_astrologer' },
              ],
            };
            setMessages(prev => [...prev, aiMsg]);
            answerReceived = true;
          }
        } catch (clientErr) {
          console.warn('Client-side Gemini call encountered issue:', clientErr);
        }
      }
    }

    // 3. Third attempt: intelligent contextual Vedic knowledge engine
    if (!answerReceived) {
      const guidance = getIntelligentVedicGuidance(text);
      const fallbackAiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: guidance.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions: guidance.quickActions,
      };
      setMessages(prev => [...prev, fallbackAiMsg]);
    }

    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  return (
    <>
      {/* Floating Action Trigger Button */}
      {!isOpen && (
        <button
          id="floating-ai-chatbot-btn"
          onClick={onToggle}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white p-4 rounded-full shadow-2xl shadow-orange-600/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 group"
          aria-label="Open AI Vedic Chatbot"
        >
          <div className="relative">
            <Bot className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-white"></span>
          </div>
          <span className="text-xs font-bold pr-1 hidden sm:inline">
            Ask Vedic AI
          </span>
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div 
          id="ai-chatbot-window"
          className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-2xl border border-orange-200 overflow-hidden flex flex-col h-[520px] transition-all"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center border border-white/30">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-extrabold text-sm leading-tight">Vedsetu AI Assistant</h4>
                  <span className="text-[10px] bg-emerald-400/90 text-emerald-950 font-bold px-1.5 py-0.2 rounded">
                    Active
                  </span>
                </div>
                <p className="text-[11px] text-orange-100 font-spiritual">“आपकी आस्था, हमारी व्यवस्था”</p>
              </div>
            </div>
            <button
              onClick={onToggle}
              className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick suggestions header */}
          <div className="bg-orange-50/90 px-3 py-2 border-b border-orange-100 flex items-center gap-2 overflow-x-auto text-[11px] text-orange-800 font-medium">
            <Sparkles className="w-3 h-3 text-orange-600 flex-shrink-0" />
            <button
              onClick={() => {
                handleSendMessage('What is the best muhurat for Griha Pravesh this month?');
              }}
              disabled={isLoading}
              className="whitespace-nowrap bg-white px-2 py-0.5 rounded border border-orange-200 hover:bg-orange-100 cursor-pointer disabled:opacity-50"
            >
              Muhurat for Griha Pravesh?
            </button>
            <button
              onClick={() => {
                handleSendMessage('How does the live procedure tracker work?');
              }}
              disabled={isLoading}
              className="whitespace-nowrap bg-white px-2 py-0.5 rounded border border-orange-200 hover:bg-orange-100 cursor-pointer disabled:opacity-50"
            >
              How does tracker work?
            </button>
          </div>

          {/* Messages Container */}
          <div className="p-4 flex-1 overflow-y-auto space-y-3 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-orange-600 text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>

                {/* Optional Quick Action Buttons */}
                {msg.quickActions && msg.quickActions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {msg.quickActions.map((qa, qIdx) => (
                      <button
                        key={qIdx}
                        onClick={() => {
                          if (qa.actionType === 'book_puja') {
                            onOpenBooking(qa.payload);
                          } else if (qa.actionType === 'open_astrologer') {
                            onOpenAstrologer();
                          }
                        }}
                        className="px-3 py-1.5 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-900 border border-orange-200 font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                      >
                        {qa.actionType === 'book_puja' && <Calendar className="w-3.5 h-3.5 text-orange-600" />}
                        {qa.actionType === 'open_astrologer' && <Compass className="w-3.5 h-3.5 text-amber-600" />}
                        {qa.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex flex-col items-start">
                <div className="max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm bg-white text-slate-600 border border-orange-200 rounded-tl-none flex items-center gap-2 shadow-xs">
                  <Loader2 className="w-4 h-4 text-orange-600 animate-spin flex-shrink-0" />
                  <span>Vedic AI is contemplating scriptures...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask about rituals, samagri, muhurats..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              disabled={isLoading}
              className="flex-1 p-2.5 bg-slate-100 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!inputVal.trim() || isLoading}
              className="w-10 h-10 rounded-xl bg-orange-600 disabled:opacity-40 hover:bg-orange-700 text-white flex items-center justify-center shadow-md transition-colors"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </form>

        </div>
      )}
    </>
  );
};
