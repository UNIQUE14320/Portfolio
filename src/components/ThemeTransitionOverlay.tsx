import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ThemeTransitionOverlayProps {
  isTransitioning: boolean;
  targetTheme: 'dark' | 'light' | null;
}

export const ThemeTransitionOverlay: React.FC<ThemeTransitionOverlayProps> = ({
  isTransitioning,
  targetTheme,
}) => {
  const isSwitchingToLight = targetTheme === 'light';

  return (
    <AnimatePresence>
      {isTransitioning && targetTheme && (
        <motion.div
          key="theme-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className={`fixed inset-0 z-[120] flex items-center justify-center pointer-events-none ${
            isSwitchingToLight ? 'bg-white' : 'bg-black'
          }`}
        >
          {/* Logo Container */}
          <motion.div 
            className="relative flex items-center justify-center gap-2 z-10"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {/* Left Triangle */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <svg
                viewBox="0 0 100 100"
                className={`w-16 h-16 sm:w-20 sm:h-20 ${
                  isSwitchingToLight ? 'text-black' : 'text-white'
                }`}
                fill="currentColor"
              >
                <polygon points="0,100 100,100 100,0" />
              </svg>
            </motion.div>

            {/* Right Triangle */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <svg
                viewBox="0 0 100 100"
                className={`w-16 h-16 sm:w-20 sm:h-20 ${
                  isSwitchingToLight ? 'text-black' : 'text-white'
                }`}
                fill="currentColor"
              >
                <polygon points="0,0 100,0 0,100" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
