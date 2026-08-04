import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FridayChatMessage } from '../types';
import { Bot, X, Send, Sparkles, Volume2, Radio, Loader2 } from 'lucide-react';

interface FridayAiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FridayAiModal: React.FC<FridayAiModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<FridayChatMessage[]>([
    {
      id: 'init',
      sender: 'friday',
      text: "Greetings! I am Ryuk — Shubham Gawade's Personal Voice AI Assistant. I can answer questions about Shubham's technical stack, project architectures, NIMCET/CET ranks, or experience. How may I assist you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const samplePrompts = [
    "What is your core architecture?",
    "Summarize Shubham's tech stack",
    "Tell me about the Hospital System project",
    "What are his competitive entrance exam ranks?"
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (promptText?: string) => {
    const textToSend = promptText || inputPrompt;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: FridayChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ryuk-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: textToSend })
      });
      const data = await res.json();

      const fridayMsg: FridayChatMessage = {
        id: Math.random().toString(),
        sender: 'friday',
        text: data.response || "Operational status nominal. Shubham is skilled in Python, Java, React, and AI voice pipeline design.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, fridayMsg]);
    } catch (err) {
      console.error('Ryuk AI error:', err);
      const errorMsg: FridayChatMessage = {
        id: Math.random().toString(),
        sender: 'friday',
        text: "[Ryuk AI] Systems operational! Shubham Gawade is a Full-Stack Engineer specializing in Python, Core Java, Hibernate, and AI systems.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="friday-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#06141B]/85 backdrop-blur-md"
        >
          {/* HUD Modal Window */}
          <motion.div
            key="friday-modal-window"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-full max-w-2xl bg-[#06141B] border border-[#253745] rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden relative"
          >
            {/* HUD Top Header */}
            <div className="p-4 sm:p-5 bg-[#11212D] border-b border-[#253745] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#253745] border border-[#4A5C6A] flex items-center justify-center text-[#CCD0CF] relative">
                  <Bot className="w-5 h-5 text-[#CCD0CF]" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-zinc-100" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-[#CCD0CF] tracking-wider">
                      Ryuk <span className="text-[#9BA8AB] font-mono text-xs">v2.4 AI</span>
                    </h3>
                    <span className="px-1.5 py-0.5 rounded bg-[#253745] text-white font-mono text-[10px] font-bold border border-[#4A5C6A]">
                      ONLINE
                    </span>
                  </div>
                  <p className="text-xs text-[#9BA8AB] flex items-center gap-1.5 mt-0.5">
                    <Radio className="w-3 h-3 text-[#CCD0CF]" />
                    <span>Whisper Voice Pipeline & Gemini Engine</span>
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-[#9BA8AB] hover:text-white hover:bg-[#253745] transition-colors cursor-pointer"
                aria-label="Close Assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Audio Spectrum Status Bar (Clean & Static) */}
            <div className="px-4 py-2 bg-[#06141B] border-b border-[#253745] flex items-center justify-between text-xs text-[#9BA8AB] font-mono">
              <div className="flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-[#CCD0CF]" />
                <span>AUDIO SPECTRUM: READY</span>
              </div>

              <div className="flex items-center gap-1">
                {[12, 18, 10, 22, 16, 14, 20, 15, 18, 12].map((heightVal, idx) => (
                  <div
                    key={idx}
                    style={{ height: `${heightVal}px` }}
                    className="w-1 bg-[#CCD0CF] rounded-full"
                  />
                ))}
              </div>
            </div>

            {/* Message Log Area */}
            <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 max-h-[50vh] neu-inset">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 text-[10px] text-[#9BA8AB] font-mono mb-1">
                    <span>{msg.sender === 'user' ? 'VISITOR' : 'Ryuk AI'}</span>
                    <span>•</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'neu-btn font-semibold rounded-br-none text-[#CCD0CF]'
                        : 'neu-card text-[#CCD0CF] rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-xs text-[#CCD0CF] font-mono p-2">
                  <Loader2 className="w-4 h-4 animate-spin text-[#CCD0CF]" />
                  <span>Ryuk is processing model reasoning...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Sample Prompt Chips */}
            <div className="p-3 neu-flat border-t border-[#253745] space-y-2">
              <span className="text-[10px] font-mono text-[#9BA8AB] uppercase tracking-wider block flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#CCD0CF]" /> Click sample prompt:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {samplePrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    disabled={isLoading}
                    className="px-2.5 py-1 rounded-lg neu-btn text-[11px] font-medium text-[#CCD0CF] hover:text-white cursor-pointer transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Controls */}
            <div className="p-3 sm:p-4 neu-inset border-t border-[#253745] flex items-center gap-2">
              <input
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask Ryuk about Shubham's skills, projects..."
                className="flex-1 px-4 py-2.5 rounded-xl neu-input text-xs sm:text-sm text-[#CCD0CF] placeholder-[#9BA8AB]/60 focus:outline-none"
              />

              <button
                onClick={() => handleSend()}
                disabled={isLoading || !inputPrompt.trim()}
                className="p-2.5 rounded-xl neu-btn font-bold cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
