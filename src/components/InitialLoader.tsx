import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AviciiLogo } from './AviciiLogo';

interface InitialLoaderProps {
  onLoaded?: () => void;
  isLightMode?: boolean;
}

export const InitialLoader: React.FC<InitialLoaderProps> = ({ onLoaded, isLightMode = false }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth progress counter simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            if (onLoaded) onLoaded();
          }, 200);
          return 100;
        }
        return prev + Math.floor(Math.random() * 25) + 15;
      });
    }, 90);

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="initial-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-4 transition-colors duration-300 ${
            isLightMode ? 'bg-[#e8eef6] text-slate-900' : 'bg-[#12151c] text-[#CCD0CF]'
          }`}
        >
          {/* Subtle Ambient Background Glow */}
          <div className={`absolute w-72 h-72 rounded-full blur-3xl pointer-events-none animate-pulse ${
            isLightMode ? 'bg-sky-200/50' : 'bg-[#253745]/40'
          }`} />

          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* Logo Container with Pulsing Glow Ring */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`relative p-4 rounded-2xl border ${
                isLightMode 
                  ? 'bg-white border-slate-200 shadow-lg shadow-slate-200' 
                  : 'bg-[#11212D] border-[#253745] shadow-xl shadow-[#253745]/30'
              }`}
            >
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="w-12 h-12 flex items-center justify-center"
              >
                <AviciiLogo className={`w-10 h-10 ${isLightMode ? 'text-slate-900' : 'text-[#CCD0CF]'}`} />
              </motion.div>
            </motion.div>

            {/* Title / Name */}
            <motion.div
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="flex flex-col items-center gap-1 text-center"
            >
              <span className={`font-extrabold text-lg tracking-widest ${isLightMode ? 'text-slate-900' : 'text-[#CCD0CF]'}`}>
                SHUBHAM
              </span>
              <span className={`text-xs font-medium tracking-wide ${isLightMode ? 'text-slate-500' : 'text-[#9BA8AB]'}`}>
                Software & AI Engineer
              </span>
            </motion.div>

            {/* Sleek Progress Bar */}
            <div className="w-48 space-y-2 mt-2">
              <div className={`h-1.5 w-full rounded-full overflow-hidden ${
                isLightMode ? 'bg-slate-200' : 'bg-[#11212D] border border-[#253745]'
              }`}>
                <motion.div
                  className={`h-full rounded-full transition-all duration-150 ${
                    isLightMode ? 'bg-slate-900' : 'bg-gradient-to-r from-[#9BA8AB] to-[#CCD0CF]'
                  }`}
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-[#9BA8AB] px-0.5">
                <span>INITIALIZING</span>
                <span>{Math.min(progress, 100)}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
