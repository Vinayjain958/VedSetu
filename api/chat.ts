import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is missing.");
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "vedsetu-vercel",
        },
      },
    });
  }
  return aiClient;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS for Vercel deployments
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = {};
      }
    }

    const { message, history } = body || {};

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const trimmedMessage = message.trim();
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      const lower = trimmedMessage.toLowerCase();
      let fallbackReply =
        "Namaste! 🙏 I am your Vedsetu Vedic Assistant. (To enable live Gemini AI generation, please set GEMINI_API_KEY in your Vercel Environment Variables and redeploy).\n\n";

      if (lower.includes('muhurat') || lower.includes('time') || lower.includes('date')) {
        fallbackReply +=
          "Based on Vedic panchang, auspicious Shubh Muhurats are calculated considering Shukla Paksha, auspicious Nakshatras (such as Rohini, Pushya, Ashwini), and avoidance of Rahu Kaal. For an exact personalized muhurat based on your Janma Kundali, you can consult our Gurukul Pandits or Jyotish Acharyas.";
      } else if (lower.includes('samagri') || lower.includes('items') || lower.includes('list')) {
        fallbackReply +=
          "Essential Vedic Puja Samagri includes:\n• Pure Cow Desi Ghee & Mango Samidha\n• Copper Havan Kund & Sruva spoon\n• Akshat (unbroken rice), Roli, Kumkum, Chandan\n• Pure Bhimseni Camphor & Dhoop\n• Supari, Clove, Cardamom & Panchamrit\n\nVedsetu provides sealed 100% pure organic samagri kits delivered directly with our verified Pandits.";
      } else if (lower.includes('astro') || lower.includes('kundali') || lower.includes('horoscope')) {
        fallbackReply +=
          "Vedsetu provides transparent, ethical Vedic Astrology consultations at a flat rate of ₹60 for 15 minutes — completely free of fearmongering or unsolicited gemstone sales.";
      } else {
        fallbackReply +=
          "Our Gurukul-certified Acharyas perform authentic rituals adhering strictly to Vedic Vidhi (Ganesh Puja, Griha Pravesh, Rudrabhishek, Satyanarayan Katha, etc.) with transparent dakshina and real-time procedure tracking.";
      }

      return res.status(200).json({
        reply: fallbackReply,
        quickActions: [
          { label: 'Book Puja', actionType: 'book_puja', payload: 'Ganesh Puja & Havan' },
          { label: 'Consult Astrologer (₹60)', actionType: 'open_astrologer' },
        ],
      });
    }

    const ai = getGeminiClient();

    const systemInstruction = `You are the authentic Vedsetu Spiritual AI Assistant for Vedsetu ("Aapki Aastha, Hamaari Vyavastha").
You assist devotees with authentic Vedic wisdom, Hindu rituals, puja vidhi, shubh muhurat guidelines, 100% pure organic samagri checklists, and ethical Vedic astrology.

Guidelines:
1. Always maintain a warm, culturally respectful, humble tone (e.g. begin with "Namaste! 🙏", "Om Namah Shivaya", or "Jai Shri Ganesh").
2. Answer queries accurately based on Sanatana Dharma shastras, Panchang principles, and Vedic traditions.
3. For samagri queries, provide a concise, structured bulleted checklist (e.g., pure cow ghee, mango wood, camphor, roli, kumkum, akshat).
4. If the user asks about rituals or bookings, mention that Vedsetu connects them with verified Gurukul Acharyas, includes 100% pure organic samagri, and offers an interactive Live Procedure Tracker.
5. If the user asks about astrology or horoscope, mention Vedsetu's flat-fee ethical consultation at ₹60 for 15 minutes with zero fearmongering.
6. Keep responses clear, concise, and structured with bullet points. Avoid excessive verbosity.`;

    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history)) {
      for (const h of history.slice(-6)) {
        if (h && typeof h.text === 'string' && (h.sender === 'user' || h.sender === 'ai')) {
          contents.push({
            role: h.sender === 'user' ? 'user' : 'model',
            parts: [{ text: h.text }],
          });
        }
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: trimmedMessage }],
    });

    const candidateModels = ['gemini-3.1-flash-lite', 'gemini-flash-latest', 'gemini-3.8-flash'];
    let generatedText = '';

    for (const model of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });
        if (response.text) {
          generatedText = response.text;
          break;
        }
      } catch (modelError: unknown) {
        const errMsg = modelError instanceof Error ? modelError.message : String(modelError);
        console.warn(`Gemini model ${model} encountered issue (${errMsg}). Falling back to next model...`);
      }
    }

    if (!generatedText) {
      const lower = trimmedMessage.toLowerCase();
      if (lower.includes('muhurat') || lower.includes('time') || lower.includes('date')) {
        generatedText =
          'Namaste! 🙏 For calculating an auspicious Shubh Muhurat for your sacred ceremony, our Gurukul-certified Pandits review Shukla Paksha, auspicious Tithis, and Janma Nakshatra while avoiding Rahu Kaal. You can schedule a consultation with our Jyotish Acharyas or book your puja directly.';
      } else if (lower.includes('samagri') || lower.includes('items') || lower.includes('list')) {
        generatedText =
          'Namaste! 🙏 For authentic Vedic rituals, Vedsetu delivers 100% pure organic samagri kits including:\n• Pure Cow Desi Ghee & Mango Samidha\n• Copper Havan Kund & Sruva spoon\n• Akshat (unbroken rice), Roli, Kumkum, Chandan\n• Pure Bhimseni Camphor, Dhoop, and Supari\n• Panchamrit ingredients and Haldi ghat.';
      } else {
        generatedText =
          'Namaste! 🙏 I am your Vedsetu Vedic Assistant. Our verified Gurukul Acharyas adhere strictly to Vedic Vidhi (Ganesh Puja, Griha Pravesh, Maha Rudrabhishek, Satyanarayan Katha) with transparent dakshina and real-time procedure tracking. How may I assist your spiritual preparation today?';
      }
    }

    const lowerQuery = (trimmedMessage + ' ' + generatedText).toLowerCase();
    const quickActions: Array<{ label: string; actionType: 'book_puja' | 'open_astrologer'; payload?: string }> = [];

    if (lowerQuery.includes('griha pravesh') || lowerQuery.includes('house warming') || lowerQuery.includes('home shifting')) {
      quickActions.push({ label: 'Book Griha Pravesh', actionType: 'book_puja', payload: 'Griha Pravesh & Vastu Shanti' });
    } else if (lowerQuery.includes('rudra') || lowerQuery.includes('shiva') || lowerQuery.includes('abhishek')) {
      quickActions.push({ label: 'Book Rudrabhishek', actionType: 'book_puja', payload: 'Maha Rudrabhishek' });
    } else if (lowerQuery.includes('satyanarayan') || lowerQuery.includes('katha') || lowerQuery.includes('purnima')) {
      quickActions.push({ label: 'Book Satyanarayan Katha', actionType: 'book_puja', payload: 'Satyanarayan Katha' });
    } else if (lowerQuery.includes('ganesh') || lowerQuery.includes('havan') || lowerQuery.includes('puja') || lowerQuery.includes('pandit')) {
      quickActions.push({ label: 'Book Gurukul Pandit', actionType: 'book_puja', payload: 'Ganesh Puja & Havan' });
    }

    if (
      lowerQuery.includes('astro') ||
      lowerQuery.includes('kundali') ||
      lowerQuery.includes('horoscope') ||
      lowerQuery.includes('muhurat') ||
      lowerQuery.includes('dosha') ||
      lowerQuery.includes('marriage') ||
      lowerQuery.includes('career')
    ) {
      quickActions.push({ label: 'Consult Astrologer (₹60)', actionType: 'open_astrologer' });
    }

    return res.status(200).json({
      reply: generatedText,
      quickActions: quickActions.slice(0, 2),
    });
  } catch (error: unknown) {
    console.error('Gemini API Error in /api/chat:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return res.status(200).json({
      reply: `Namaste! 🙏 We experienced a temporary connection delay (${errorMessage}). Our Gurukul-certified Acharyas are available to assist you with authentic mantras and 100% pure organic samagri.`,
      quickActions: [
        { label: 'Book a Pandit Now', actionType: 'book_puja', payload: 'Ganesh Puja & Havan' },
        { label: 'Consult Astrologer (₹60)', actionType: 'open_astrologer' },
      ],
    });
  }
}
