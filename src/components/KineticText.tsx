import React from 'react';
import { motion } from 'motion/react';

interface KineticTextProps {
  text: string;
  isHovered?: boolean;
  className?: string;
  letterClassName?: string;
  type?: 'wave' | 'bounce' | 'skew' | 'glow' | 'elastic';
  staggerDelay?: number;
  hoverColor?: string;
}

export const KineticText: React.FC<KineticTextProps> = ({
  text,
  isHovered = false,
  className = '',
  letterClassName = '',
  type = 'wave',
  staggerDelay = 0.035,
  hoverColor = '#FFFFFF',
}) => {
  // Split into words to prevent letters within a word from wrapping vertically
  const words = text.split(' ');
  let charGlobalIndex = 0;

  return (
    <span className={`inline-flex flex-nowrap items-center whitespace-nowrap ${className}`}>
      {words.map((word, wordIdx) => (
        <React.Fragment key={wordIdx}>
          <span className="inline-flex flex-nowrap whitespace-nowrap">
            {Array.from(word).map((char) => {
              const index = charGlobalIndex++;
              let animationVariants;

              switch (type) {
                case 'bounce':
                  animationVariants = {
                    y: [0, -8, 2, 0],
                    scaleY: [1, 1.25, 0.9, 1],
                    scaleX: [1, 0.85, 1.1, 1],
                  };
                  break;
                case 'skew':
                  animationVariants = {
                    y: [0, -5, 0],
                    skewX: [0, -12, 12, 0],
                    rotate: [0, -6, 6, 0],
                    scale: [1, 1.15, 1],
                  };
                  break;
                case 'elastic':
                  animationVariants = {
                    y: [0, -10, 0],
                    scale: [1, 1.3, 0.95, 1],
                    rotate: [0, 8, -4, 0],
                  };
                  break;
                case 'glow':
                  animationVariants = {
                    y: [0, -4, 0],
                    scale: [1, 1.1, 1],
                    textShadow: [
                      '0 0 0px rgba(255,255,255,0)',
                      '0 0 12px rgba(255,255,255,0.8)',
                      '0 0 0px rgba(255,255,255,0)',
                    ],
                  };
                  break;
                case 'wave':
                default:
                  animationVariants = {
                    y: [0, -6, 0],
                    scale: [1, 1.2, 1],
                    rotate: [0, -5, 5, 0],
                  };
                  break;
              }

              return (
                <motion.span
                  key={index}
                  className={`inline-block whitespace-nowrap select-none transition-colors duration-200 ${letterClassName}`}
                  animate={
                    isHovered
                      ? {
                          ...animationVariants,
                          color: [null, hoverColor, null],
                        }
                      : { y: 0, rotate: 0, scale: 1, skewX: 0, scaleX: 1, scaleY: 1 }
                  }
                  whileHover={{
                    scale: 1.35,
                    y: -8,
                    rotate: (index % 2 === 0 ? 1 : -1) * 10,
                    color: '#FFFFFF',
                    transition: { type: 'spring', stiffness: 400, damping: 15 },
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * staggerDelay,
                    ease: [0.22, 1, 0.36, 1],
                    repeat: isHovered ? Infinity : 0,
                    repeatDelay: 1.5,
                  }}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
          {wordIdx < words.length - 1 && (
            <span className="inline-block whitespace-pre select-none">&nbsp;</span>
          )}
        </React.Fragment>
      ))}
    </span>
  );
};
