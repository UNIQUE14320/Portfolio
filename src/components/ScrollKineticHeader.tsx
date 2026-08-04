import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Sparkles, Code2, Brain, GraduationCap, MessageSquare } from 'lucide-react';

interface ScrollKineticHeaderProps {
  badgeIcon?: 'brain' | 'sparkles' | 'code' | 'graduation' | 'message';
  badgeText: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix?: string;
  subtitle: string;
  gradientFromTo?: string; // e.g., "from-indigo-400 via-cyan-300 to-indigo-300"
}

export const ScrollKineticHeader: React.FC<ScrollKineticHeaderProps> = ({
  badgeIcon = 'sparkles',
  badgeText,
  titlePrefix,
  titleHighlight,
  titleSuffix = '',
  subtitle,
  gradientFromTo = 'from-white via-[#CCD0CF] to-[#9BA8AB]',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Measure scroll progress relative to this header container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 90%', 'center 45%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.001,
  });

  // Smooth Scroll-Triggered Expansion Transformations:
  // Starts small (scale 0.82) when scrolling into view, slowly expands to full size (1.0)
  const scale = useTransform(smoothProgress, [0, 0.85, 1], [0.82, 1.03, 1]);
  const y = useTransform(smoothProgress, [0, 1], [35, 0]);
  const opacity = useTransform(smoothProgress, [0, 0.4, 1], [0.15, 0.85, 1]);
  const glowScale = useTransform(smoothProgress, [0, 1], [0.5, 1.2]);

  return (
    <div
      ref={containerRef}
      className="relative w-full py-8 sm:py-12 mb-6 sm:mb-10 flex flex-col items-center justify-center select-none"
    >
      {/* Subtle Ambient Radial Glow that expands as text grows */}
      <motion.div
        style={{ scale: glowScale, opacity }}
        className="absolute w-80 h-32 rounded-full bg-gradient-to-r from-[#253745]/20 via-[#4A5C6A]/20 to-[#253745]/20 blur-3xl pointer-events-none"
      />

      {/* Main Animated Content Block */}
      <motion.div
        style={{ scale, y, opacity }}
        className="text-center max-w-4xl mx-auto px-4 space-y-3.5 relative z-10 w-full flex flex-col items-center justify-center"
      >
        {/* Category Pill Badge */}
        <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-[#11212D] border border-[#253745] shadow-xl backdrop-blur-md text-[#CCD0CF] text-xs font-mono font-bold tracking-wider uppercase mx-auto">
          <span>{badgeText}</span>
        </div>

        {/* Dynamic Title with Highlight Gradient */}
        <h2 className="text-2xl sm:text-5xl lg:text-6xl font-black text-[#CCD0CF] tracking-tight leading-tight text-center max-w-3xl mx-auto">
          {titlePrefix}{' '}
          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradientFromTo} drop-shadow-sm`}>
            {titleHighlight}
          </span>
          {titleSuffix && ` ${titleSuffix}`}
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-base lg:text-lg text-[#9BA8AB] max-w-2xl mx-auto leading-relaxed font-normal text-center">
          {subtitle}
        </p>
      </motion.div>
    </div>
  );
};


