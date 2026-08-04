import React from 'react';

interface AviciiLogoProps {
  className?: string;
}

export const AviciiLogo: React.FC<AviciiLogoProps> = ({ className = "w-7 h-3.5 text-[#CCD0CF]" }) => {
  return (
    <svg
      viewBox="0 0 212 100"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Left Triangle (Bottom-Left to Top-Right hypotenuse, vertical right side, horizontal bottom side) */}
      <polygon points="0,100 100,100 100,0" />
      {/* Right Triangle (Top-Right to Bottom-Left hypotenuse, vertical left side, horizontal top side) */}
      <polygon points="112,0 212,0 112,100" />
    </svg>
  );
};
