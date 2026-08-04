import React, { useState, useRef, useEffect } from 'react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // Dark mode glow
  lightGlowColor?: string; // Light mode glow
  spotlightRadius?: number;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  id?: string;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  glowColor = 'rgba(74, 92, 106, 0.35), rgba(155, 168, 171, 0.2)',
  lightGlowColor = 'rgba(255, 255, 255, 0.95), rgba(224, 242, 254, 0.85)',
  spotlightRadius = 450,
  onClick,
  id,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [isLightMode, setIsLightMode] = useState(false);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    const checkTheme = () => {
      setIsLightMode(document.body.classList.contains('light-mode'));
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  const activeGlow = isLightMode ? lightGlowColor : glowColor;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !spotlightRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (animFrameId.current) {
      cancelAnimationFrame(animFrameId.current);
    }

    animFrameId.current = requestAnimationFrame(() => {
      if (spotlightRef.current) {
        spotlightRef.current.style.opacity = '1';
        spotlightRef.current.style.background = `radial-gradient(${spotlightRadius}px circle at ${x}px ${y}px, ${activeGlow} 40%, transparent 80%)`;
      }
    });
  };

  const handleMouseLeave = () => {
    if (animFrameId.current) {
      cancelAnimationFrame(animFrameId.current);
    }
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = '0';
    }
  };

  return (
    <div
      id={id}
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden transition-all duration-200 will-change-transform ${className}`}
      style={{ transform: 'translateZ(0)' }}
    >
      {/* Dynamic Cursor Spotlight Radial Effect (60 FPS hardware accelerated) */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-200 z-0 opacity-0"
      />
      <div className="relative z-10 flex flex-col justify-between h-full">{children}</div>
    </div>
  );
};

