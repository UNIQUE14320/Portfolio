import React, { useState } from 'react';
import { motion } from 'motion/react';

interface SlowHorizontalMarqueeProps {
  text: string;
  duration?: number; // base duration in seconds for a full pass
  className?: string;
}

export const SlowHorizontalMarquee: React.FC<SlowHorizontalMarqueeProps> = ({
  text,
  duration = 12,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // When hovered, the line automatically slows down
  const currentDuration = isHovered ? duration * 2.5 : duration;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full overflow-hidden select-none py-2 my-2 bg-transparent ${className}`}
    >
      {/* Horizontal Scrolling Text starting from Right (100%) moving to Left (-100%) */}
      <motion.div
        className="flex whitespace-nowrap items-center w-max cursor-pointer"
        animate={{ x: ['100%', '-100%'] }}
        transition={{
          duration: currentDuration,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
        }}
      >
        <div className="flex items-center gap-4 sm:gap-6 shrink-0 text-black dark:text-white marquee-text">
          <span className="text-black dark:text-white text-xs sm:text-sm font-black select-none opacity-90">●</span>
          <span className="text-xs sm:text-sm font-mono font-black tracking-widest uppercase text-black dark:text-white">
            {text}
          </span>
          <span className="text-black dark:text-white text-xs sm:text-sm font-black select-none opacity-90">●</span>
        </div>
      </motion.div>
    </div>
  );
};





