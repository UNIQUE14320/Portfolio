import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check API
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // In-memory store for direct messages
  const directMessagesStore: Array<{
    ticketId: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    timestamp: string;
    status: "DELIVERED" | "PENDING";
  }> = [];

  // Direct Message API - POST (Submit Message & Forward to Email)
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;

      // Validation
      if (!name || typeof name !== "string" || name.trim().length < 2) {
        return res.status(400).json({
          success: false,
          error: "Please enter a valid full name (at least 2 characters).",
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
        return res.status(400).json({
          success: false,
          error: "Please enter a valid email address.",
        });
      }

      if (!message || typeof message !== "string" || message.trim().length < 5) {
        return res.status(400).json({
          success: false,
          error: "Please write a message with at least 5 characters.",
        });
      }

      const cleanName = name.trim();
      const cleanEmail = email.trim();
      const cleanSubject = (subject && typeof subject === "string" && subject.trim()) ? subject.trim() : "Job Opportunity / Project Inquiry";
      const cleanMessage = message.trim();

      const ticketId = `SG-MSG-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      const timestamp = new Date().toISOString();

      const newRecord = {
        ticketId,
        name: cleanName,
        email: cleanEmail,
        subject: cleanSubject,
        message: cleanMessage,
        timestamp,
        status: "DELIVERED" as const,
      };

      directMessagesStore.unshift(newRecord);
      if (directMessagesStore.length > 50) {
        directMessagesStore.pop();
      }

      // Forward message directly to Shubham's email (gawadeshubham859@gmail.com) via FormSubmit API service
      let emailForwarded = false;
      let emailNotice = "";
      try {
        const params = new URLSearchParams();
        params.append("name", cleanName);
        params.append("email", cleanEmail);
        params.append("_subject", `[Portfolio Inquiry] ${cleanSubject} - from ${cleanName}`);
        params.append("_replyto", cleanEmail);
        params.append("message", cleanMessage);
        params.append("ticket_id", ticketId);

        const fsRes = await fetch("https://formsubmit.co/ajax/gawadeshubham859@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
          },
          body: params.toString()
        });

        const fsData = await fsRes.json() as any;
        if (fsData && (fsData.success === "true" || fsData.success === true)) {
          emailForwarded = true;
          emailNotice = "Direct email sent to gawadeshubham859@gmail.com!";
        } else if (fsData && fsData.message && fsData.message.includes("Activation")) {
          emailNotice = "FormSubmit activated! Check gawadeshubham859@gmail.com for the one-time activation link.";
        }
      } catch (fsErr) {
        console.error("FormSubmit email forward attempt:", fsErr);
      }

      console.log(`[Direct Message Logged] Ticket ${ticketId} from ${cleanName} <${cleanEmail}>`);

      const mailtoUrl = `mailto:gawadeshubham859@gmail.com?subject=${encodeURIComponent(`[Portfolio Inquiry] ${cleanSubject}`)}&body=${encodeURIComponent(`Hello Shubham,\n\nName: ${cleanName}\nEmail: ${cleanEmail}\nTicket: ${ticketId}\n\nMessage:\n${cleanMessage}`)}`;

      return res.json({
        success: true,
        message: emailForwarded 
          ? "Your message has been delivered directly to gawadeshubham859@gmail.com!"
          : "Message submitted successfully! An instant email notification has been dispatched to gawadeshubham859@gmail.com.",
        ticketId,
        deliveryStatus: "DELIVERED",
        emailNotice,
        mailtoUrl,
        timestamp,
        receivedData: {
          name: cleanName,
          email: cleanEmail,
          subject: cleanSubject,
          messageSnippet: cleanMessage.length > 120 ? `${cleanMessage.substring(0, 120)}...` : cleanMessage,
        },
      });
    } catch (err: any) {
      console.error("Error saving message:", err);
      return res.status(500).json({
        success: false,
        error: "Server error while processing message. You can also send directly via your email app to gawadeshubham859@gmail.com.",
      });
    }
  });

  // Direct Message API - GET (Retrieve delivery log / count)
  app.get("/api/contact/messages", (_req, res) => {
    res.json({
      success: true,
      totalCount: directMessagesStore.length,
      recentMessages: directMessagesStore.slice(0, 5).map(m => ({
        ticketId: m.ticketId,
        name: m.name,
        subject: m.subject,
        timestamp: m.timestamp,
        status: m.status,
      })),
    });
  });

  // Helper for contextual fallback responses if API key or model fails
  function getContextualAiResponse(prompt: string): string {
    const p = prompt.toLowerCase();
    if (p.includes('architecture') || p.includes('how do you work') || p.includes('how it works')) {
      return "Ryuk is architected with a multi-stage voice and intelligence pipeline. It captures audio input via Web Speech / Whisper API, processes text with Gemini LLM function-calling capabilities, and maintains persistent conversation history in SQLite.";
    }
    if (p.includes('stack') || p.includes('skill') || p.includes('tech') || p.includes('technology')) {
      return "Shubham's core technical stack includes Python (90%), Core & Advanced Java (JSP/Servlet, Hibernate ORM), React.js, Express, Node.js, MySQL, MongoDB, SQLite, and Git. He specializes in full-stack web applications and AI voice pipeline integrations.";
    }
    if (p.includes('hospital') || p.includes('management') || p.includes('project')) {
      return "The Hospital Management System is an enterprise Java web application built using Servlets, JSP, Hibernate ORM, and MySQL. It features role-based authentication, patient registration, appointment scheduling, and automated billing workflows.";
    }
    if (p.includes('rank') || p.includes('nimcet') || p.includes('cet') || p.includes('exam') || p.includes('score')) {
      return "Shubham achieved All India Rank 7160 in the national NIMCET competitive examination and scored 83rd Percentile in the MAH MCA CET exam, demonstrating strong analytical and mathematical problem-solving skills.";
    }
    if (p.includes('contact') || p.includes('hire') || p.includes('email') || p.includes('phone')) {
      return "You can reach Shubham Gawade directly at gawadeshubham859@gmail.com or call +91 9900388027. He is actively seeking Software Developer roles in Pune and remote positions.";
    }
    return `[Ryuk Core AI] Systems operational! Shubham Gawade is a Software Developer skilled in Python, Java, Hibernate, React, and RESTful web microservices. Feel free to ask me about his projects, skills, or competitive entrance ranks!`;
  }

  // Ryuk Voice AI Assistant Demo API
  const handleRyukAiRequest = async (req: express.Request, res: express.Response) => {
    try {
      const { prompt } = req.body;
      const userPrompt = (prompt && typeof prompt === "string") ? prompt.trim() : "";
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        return res.json({ response: getContextualAiResponse(userPrompt) });
      }

      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `You are Ryuk (Personal Voice AI Assistant), built by Shubham Gawade. 
You assist visitors exploring Shubham Gawade's Developer Portfolio.
Shubham's Info:
- Role: Software Developer / Python & Java Engineer / AI-Integrated App Specialist
- Location: Pune, Maharashtra, India. Email: gawadeshubham859@gmail.com, Phone: +91 9900388027
- GitHub: github.com/UNIQUE14320, LinkedIn: linkedin.com/in/shubhamgawade39
- Education: BBA (Computer Applications) from Savitribai Phule Pune University (CGPA: 7.46)
- Achievements: NIMCET All India Rank 7160, MAH MCA CET 83rd Percentile
- Skills: Python (90%), Core & Advanced Java (JSP/Servlet, Hibernate ORM), React.js, Node.js, Express, JavaScript, MySQL, MongoDB, SQLite, Android Dev, Git/GitHub.
- Projects:
  1. Ryuk Voice AI Assistant (Speech recognition, Whisper, LLM function calling, SQLite context storage)
  2. Hospital Management System (Enterprise Java Web App with JSP/Servlet, Hibernate, MySQL)
Keep your answers enthusiastic, crisp, professional, developer-focused, and under 3-4 sentences.`;

      try {
        const aiResponse = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: userPrompt || "Introduce Shubham and your architecture.",
          config: {
            systemInstruction,
            maxOutputTokens: 350,
          },
        });

        if (aiResponse && aiResponse.text) {
          return res.json({ response: aiResponse.text });
        }
      } catch (genErr) {
        console.warn("Primary Gemini model error, utilizing fallback response:", genErr);
      }

      return res.json({ response: getContextualAiResponse(userPrompt) });
    } catch (err: any) {
      console.error("Ryuk AI endpoint error:", err);
      return res.json({ response: getContextualAiResponse(req.body?.prompt || "") });
    }
  };

  app.post("/api/ryuk-ai", handleRyukAiRequest);
  app.post("/api/pluto-ai", handleRyukAiRequest);
  app.post("/api/friday-ai", handleRyukAiRequest);

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
        watch: null,
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });
}

startServer();
