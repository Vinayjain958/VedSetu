import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Sparkles, Calendar, Compass, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';

interface AIChatbotWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
  onOpenBooking: (pujaType?: string) => void;
  onOpenAstrologer: () => void;
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

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.reply || 'Namaste! How else may I assist you with your rituals?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions: data.quickActions && data.quickActions.length > 0 ? data.quickActions : undefined,
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.warn('Using Vedic Assistant fallback response:', err);
      const fallbackAiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: 'Namaste! 🙏 Our Gurukul-certified Acharyas are available to guide this sacred ritual with authentic mantras and 100% pure organic samagri. You can book a verified Pandit or speak with our Jyotish Acharyas directly.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions: [
          { label: 'Book a Pandit Now', actionType: 'book_puja', payload: 'Ganesh Puja & Havan' },
          { label: 'Consult Astrologer (₹60)', actionType: 'open_astrologer' }
        ]
      };
      setMessages(prev => [...prev, fallbackAiMsg]);
    } finally {
      setIsLoading(false);
    }
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
