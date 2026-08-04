import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Terminal, Sparkles, Cpu } from 'lucide-react';

interface AiProjectLoaderProps {
  isLoading: boolean;
  onComplete: () => void;
  isLightMode?: boolean;
}

export const AiProjectLoader: React.FC<AiProjectLoaderProps> = ({
  isLoading,
  onComplete,
  isLightMode = false,
}) => {
  const [typedText, setTypedText] = useState('');
  const [statusIndex, setStatusIndex] = useState(0);

  const statusMessages = [
    'INITIALIZING RYUK NEURAL CORE...',
    'CONNECTING TO SHUBHAM\'S AI MATRIX...',
    'ANALYZING SYSTEM ARCHITECTURES & SPECS...',
    'CALIBRATING VOICE & WHISPER INTERFACE...',
    'READYING RYUK ASSISTANT PROTOCOL...',
  ];

  useEffect(() => {
    if (!isLoading) {
      setTypedText('');
      setStatusIndex(0);
      return;
    }

    // Cycle through messages quickly
    const statusInterval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statusMessages.length);
    }, 300);

    // Auto complete after 1.0 second
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 1000);

    return () => {
      clearInterval(statusInterval);
      clearTimeout(completeTimer);
    };
  }, [isLoading]);

  // Typing effect for current active message
  useEffect(() => {
    if (!isLoading) return;
    let currentText = '';
    let charIdx = 0;
    const currentMsg = statusMessages[statusIndex];

    const typeInterval = setInterval(() => {
      if (charIdx < currentMsg.length) {
        currentText += currentMsg[charIdx];
        setTypedText(currentText);
        charIdx++;
      } else {
        clearInterval(typeInterval);
      }
    }, 20);

    return () => clearInterval(typeInterval);
  }, [statusIndex, isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="ai-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={`fixed inset-0 z-[150] flex flex-col items-center justify-center p-4 backdrop-blur-xl pointer-events-auto ${
            isLightMode ? 'bg-slate-50/95 text-slate-900' : 'bg-[#06141B]/95 text-[#CCD0CF]'
          }`}
        >
          {/* Subtle Ambient Pulsing Glow */}
          <div
            className={`absolute w-80 h-80 rounded-full blur-3xl pointer-events-none animate-pulse ${
              isLightMode ? 'bg-slate-200/50' : 'bg-[#253745]/60'
            }`}
          />

          <div className="relative z-10 flex flex-col items-center gap-6 text-center max-w-sm px-4">
            {/* Center Logo Card */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`relative p-6 sm:p-7 rounded-3xl border shadow-2xl flex flex-col items-center justify-center ${
                isLightMode
                  ? 'bg-white border-slate-300 shadow-xl shadow-slate-200 text-slate-900'
                  : 'bg-[#11212D] border-[#4A5C6A] shadow-2xl shadow-[#253745]/80 text-[#CCD0CF]'
              }`}
            >
              {/* Steady Icon */}
              <div className="w-16 h-16 flex items-center justify-center relative">
                <Bot className={`w-12 h-12 ${isLightMode ? 'text-slate-900' : 'text-[#CCD0CF]'}`} />
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-slate-900 dark:bg-white" />
              </div>

              {/* Bot indicator badge */}
              <div
                className={`mt-3 inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold tracking-wider border ${
                  isLightMode
                    ? 'bg-slate-100 border-slate-300 text-slate-900'
                    : 'bg-[#253745] border-[#4A5C6A] text-[#CCD0CF]'
                }`}
              >
                <Cpu className="w-3.5 h-3.5 text-slate-900 dark:text-[#CCD0CF]" />
                <span>RYUK AI ENGINE</span>
              </div>
            </motion.div>

            {/* Automated Typing Text Loading State */}
            <div className="flex flex-col items-center gap-2 w-full">
              <div className="flex items-center justify-center gap-2 font-mono text-xs sm:text-sm font-semibold tracking-wide text-[#9BA8AB] h-7">
                <Terminal className="w-4 h-4 text-slate-900 dark:text-[#CCD0CF] shrink-0" />
                <span className="text-slate-900 dark:text-[#CCD0CF] font-bold">{typedText}</span>
                <span className="w-1.5 h-4 bg-slate-900 dark:bg-[#CCD0CF] inline-block shrink-0" />
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-[#9BA8AB] font-mono mt-1">
                <Sparkles className="w-3 h-3 text-slate-900 dark:text-[#CCD0CF]" />
                <span>LOADING DEMO INTERFACE (1s)</span>
              </div>
            </div>

            {/* 1-Second Smooth Loading Progress Bar */}
            <div className="w-56 space-y-1.5">
              <div
                className={`h-2 w-full rounded-full overflow-hidden p-0.5 border ${
                  isLightMode ? 'bg-slate-200 border-slate-300' : 'bg-[#11212D] border-[#253745]'
                }`}
              >
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.0, ease: 'linear' }}
                  className={`h-full rounded-full ${
                    isLightMode
                      ? 'bg-slate-900'
                      : 'bg-gradient-to-r from-[#9BA8AB] via-[#CCD0CF] to-white'
                  }`}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
