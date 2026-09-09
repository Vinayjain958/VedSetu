import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI Client
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
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY);
  res.json({
    status: "ok",
    hasApiKey: hasKey,
  });
});

// Gemini Chat Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    const trimmedMessage = message.trim();

    // Check if API key is present
    if (!process.env.GEMINI_API_KEY) {
      // Graceful fallback response when API key is not yet set
      const lower = trimmedMessage.toLowerCase();
      let fallbackReply =
        "Namaste! 🙏 I am your Vedsetu Vedic Assistant. (To enable live Gemini AI generation, please provide your GEMINI_API_KEY in the environment settings).\n\n";

      if (
        lower.includes("muhurat") ||
        lower.includes("time") ||
        lower.includes("date")
      ) {
        fallbackReply +=
          "Based on general Vedic panchang guidelines, auspicious Shubh Muhurats are calculated considering Shukla Paksha, auspicious Nakshatras (like Rohini, Pushya, Ashwini), and avoidance of Rahu Kaal. For an exact personalized muhurat based on your Janma Kundali, you can consult our Gurukul Pandits or Jyotish Acharyas.";
      } else if (
        lower.includes("samagri") ||
        lower.includes("items") ||
        lower.includes("list")
      ) {
        fallbackReply +=
          "Essential Vedic Puja Samagri includes:\n• Pure Cow Desi Ghee & Mango Samidha\n• Copper Havan Kund & Sruva spoon\n• Akshat (unbroken rice), Roli, Kumkum, Chandan\n• Pure Bhimseni Camphor & Dhoop\n• Supari, Clove, Cardamom & Panchamrit\n\nVedsetu provides sealed 100% pure organic samagri kits delivered directly with our verified Pandits.";
      } else if (
        lower.includes("astro") ||
        lower.includes("kundali") ||
        lower.includes("horoscope")
      ) {
        fallbackReply +=
          "Vedsetu provides transparent, ethical Vedic Astrology consultations at a flat rate of ₹60 for 15 minutes — completely free of fearmongering or unsolicited gemstone sales.";
      } else {
        fallbackReply +=
          "Our Gurukul-certified Acharyas perform authentic rituals adhering strictly to Vedic Vidhi (Ganesh Puja, Griha Pravesh, Rudrabhishek, Satyanarayan Katha, etc.) with transparent dakshina and real-time procedure tracking.";
      }

      return res.json({
        reply: fallbackReply,
        quickActions: [
          {
            label: "Book Puja",
            actionType: "book_puja",
            payload: "Ganesh Puja & Havan",
          },
          { label: "Consult Astrologer (₹60)", actionType: "open_astrologer" },
        ],
      });
    }

    const ai = getGeminiClient();

    // System instruction tuned specifically for Vedsetu Vedic Assistant
    const systemInstruction = `You are the authentic Vedsetu Spiritual AI Assistant for Vedsetu ("Aapki Aastha, Hamaari Vyavastha").
You assist devotees with authentic Vedic wisdom, Hindu rituals, puja vidhi, shubh muhurat guidelines, 100% pure organic samagri checklists, and ethical Vedic astrology.

Guidelines:
1. Always maintain a warm, culturally respectful, humble tone (e.g. begin with "Namaste! 🙏", "Om Namah Shivaya", or "Jai Shri Ganesh").
2. Answer queries accurately based on Sanatana Dharma shastras, Panchang principles, and Vedic traditions.
3. For samagri queries, provide a concise, structured bulleted checklist (e.g., pure cow ghee, mango wood, camphor, roli, kumkum, akshat).
4. If the user asks about rituals or bookings, mention that Vedsetu connects them with verified Gurukul Acharyas, includes 100% pure organic samagri, and offers an interactive Live Procedure Tracker.
5. If the user asks about astrology or horoscope, mention Vedsetu's flat-fee ethical consultation at ₹60 for 15 minutes with zero fearmongering.
6. Keep responses clear, concise, and structured with bullet points. Avoid excessive verbosity.`;

    // Construct conversation contents
    const contents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history)) {
      for (const h of history.slice(-6)) {
        if (h && typeof h.text === "string" && (h.sender === "user" || h.sender === "ai")) {
          contents.push({
            role: h.sender === "user" ? "user" : "model",
            parts: [{ text: h.text }],
          });
        }
      }
    }

    contents.push({
      role: "user",
      parts: [{ text: trimmedMessage }],
    });

    // Candidate models in order of priority (lite is fast and resilient against 503 high-demand spikes)
    const candidateModels = [
      "gemini-3.1-flash-lite",
      "gemini-flash-latest",
      "gemini-3.8-flash",
    ];

    let generatedText = "";

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
      // Graceful fallback if all models are experiencing temporary cloud demand
      const lower = trimmedMessage.toLowerCase();
      if (lower.includes("muhurat") || lower.includes("time") || lower.includes("date")) {
        generatedText =
          "Namaste! 🙏 For calculating an auspicious Shubh Muhurat for your sacred ceremony, our Gurukul-certified Pandits review Shukla Paksha, auspicious Tithis, and Janma Nakshatra while avoiding Rahu Kaal. You can schedule a consultation with our Jyotish Acharyas or book your puja directly.";
      } else if (lower.includes("samagri") || lower.includes("items") || lower.includes("list")) {
        generatedText =
          "Namaste! 🙏 For authentic Vedic rituals, Vedsetu delivers 100% pure organic samagri kits including:\n• Pure Cow Desi Ghee & Mango Samidha\n• Copper Havan Kund & Sruva spoon\n• Akshat (unbroken rice), Roli, Kumkum, Chandan\n• Pure Bhimseni Camphor, Dhoop, and Supari\n• Panchamrit ingredients and Haldi ghat.";
      } else {
        generatedText =
          "Namaste! 🙏 I am your Vedsetu Vedic Assistant. Our verified Gurukul Acharyas adhere strictly to Vedic Vidhi (Ganesh Puja, Griha Pravesh, Maha Rudrabhishek, Satyanarayan Katha) with transparent dakshina and real-time procedure tracking. How may I assist your spiritual preparation today?";
      }
    }

    // Intelligent quick action extraction based on generated response and user inquiry
    const lowerQuery = (trimmedMessage + " " + generatedText).toLowerCase();
    const quickActions: Array<{ label: string; actionType: "book_puja" | "open_astrologer"; payload?: string }> = [];

    if (
      lowerQuery.includes("griha pravesh") ||
      lowerQuery.includes("house warming") ||
      lowerQuery.includes("home shifting")
    ) {
      quickActions.push({
        label: "Book Griha Pravesh",
        actionType: "book_puja",
        payload: "Griha Pravesh & Vastu Shanti",
      });
    } else if (
      lowerQuery.includes("rudra") ||
      lowerQuery.includes("shiva") ||
      lowerQuery.includes("abhishek")
    ) {
      quickActions.push({
        label: "Book Rudrabhishek",
        actionType: "book_puja",
        payload: "Maha Rudrabhishek",
      });
    } else if (
      lowerQuery.includes("satyanarayan") ||
      lowerQuery.includes("katha") ||
      lowerQuery.includes("purnima")
    ) {
      quickActions.push({
        label: "Book Satyanarayan Katha",
        actionType: "book_puja",
        payload: "Satyanarayan Katha",
      });
    } else if (
      lowerQuery.includes("ganesh") ||
      lowerQuery.includes("havan") ||
      lowerQuery.includes("puja") ||
      lowerQuery.includes("pandit")
    ) {
      quickActions.push({
        label: "Book Gurukul Pandit",
        actionType: "book_puja",
        payload: "Ganesh Puja & Havan",
      });
    }

    if (
      lowerQuery.includes("astro") ||
      lowerQuery.includes("kundali") ||
      lowerQuery.includes("horoscope") ||
      lowerQuery.includes("muhurat") ||
      lowerQuery.includes("dosha") ||
      lowerQuery.includes("marriage") ||
      lowerQuery.includes("career")
    ) {
      quickActions.push({
        label: "Consult Astrologer (₹60)",
        actionType: "open_astrologer",
      });
    }

    return res.json({
      reply: generatedText,
      quickActions: quickActions.slice(0, 2),
    });
  } catch (error: unknown) {
    console.error("Gemini API Error in /api/chat:", error);
    const { message } = req.body || {};
    const lower = typeof message === "string" ? message.toLowerCase() : "";
    let reply = "Namaste! 🙏 Our Gurukul-certified Acharyas are available to guide this sacred ritual with authentic mantras and 100% pure organic samagri.";
    
    if (lower.includes("muhurat") || lower.includes("time") || lower.includes("date")) {
      reply = "Namaste! 🙏 For calculating an auspicious Shubh Muhurat for your sacred ceremony, our Gurukul-certified Pandits review Shukla Paksha, auspicious Tithis, and Janma Nakshatra while avoiding Rahu Kaal. You can schedule a consultation with our Jyotish Acharyas or book your puja directly.";
    } else if (lower.includes("samagri") || lower.includes("items") || lower.includes("list")) {
      reply = "Namaste! 🙏 Essential Vedic Puja Samagri includes:\n• Pure Cow Desi Ghee & Mango Samidha\n• Copper Havan Kund & Sruva spoon\n• Akshat (unbroken rice), Roli, Kumkum, Chandan\n• Pure Bhimseni Camphor, Dhoop, and Supari\n• Panchamrit ingredients and Haldi ghat.\n\nVedsetu delivers sealed 100% pure organic samagri kits directly with our verified Pandits.";
    } else if (lower.includes("price") || lower.includes("cost") || lower.includes("fee") || lower.includes("rate") || lower.includes("dakshina")) {
      reply = "Namaste! 🙏 Vedsetu maintains 100% price transparency:\n• Puja dakshina starts at ₹2,100 with verified Gurukul Pandits.\n• All samagri kits are 100% pure organic and sealed.\n• Virtual Astrologer consultations are a flat ₹60 for 15 minutes with zero hidden fees.";
    }

    return res.json({
      reply,
      quickActions: [
        { label: "Book a Pandit Now", actionType: "book_puja", payload: "Ganesh Puja & Havan" },
        { label: "Consult Astrologer (₹60)", actionType: "open_astrologer" }
      ],
    });
  }
});

// Setup Vite development server or production static files
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Express 5 route pattern
    app.get("*all", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Vedsetu server with Gemini API running on port ${PORT}`);
  });
}

startServer();
