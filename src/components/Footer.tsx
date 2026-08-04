import React from 'react';
import { DEVELOPER_INFO } from '../data/portfolioData';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { AviciiLogo } from './AviciiLogo';

interface FooterProps {
  isLightMode?: boolean;
  onToggleTheme?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ isLightMode, onToggleTheme }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#06141B] border-t border-[#253745] py-10 text-[#9BA8AB] text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[#253745] pb-8">
          
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
            <button 
              onClick={onToggleTheme}
              title="Click to toggle White Theme / Dark Theme"
              className="flex items-center gap-2 cursor-pointer group active:scale-95 transition-transform"
            >
              <div className={`w-8 h-8 rounded-lg border flex items-center justify-center p-1.5 transition-colors ${
                isLightMode ? 'bg-white border-slate-300 text-slate-900' : 'bg-[#253745] border-[#4A5C6A] text-[#CCD0CF]'
              }`}>
                <AviciiLogo className="w-full h-full" />
              </div>
              <span className={`font-extrabold text-base tracking-wider ${isLightMode ? 'text-slate-900' : 'text-[#CCD0CF]'}`}>
                SHUBHAM
              </span>
            </button>
            <p className="text-xs text-[#9BA8AB] max-w-sm">
              Python & Java Engineer | Full-Stack Developer | Voice AI Specialist based in Pune, India.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={DEVELOPER_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[#11212D] border border-[#253745] hover:border-[#4A5C6A] text-[#CCD0CF] hover:text-white transition-colors"
              title="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>

            <a
              href={DEVELOPER_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[#11212D] border border-[#253745] hover:border-[#4A5C6A] text-[#CCD0CF] hover:text-white transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>

            <a
              href={`mailto:${DEVELOPER_INFO.email}`}
              className="p-2.5 rounded-xl bg-[#11212D] border border-[#253745] hover:border-[#4A5C6A] text-[#CCD0CF] hover:text-white transition-colors"
              title="Email Direct"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#11212D] border border-[#253745] hover:border-[#4A5C6A] text-[#CCD0CF] hover:text-white font-semibold transition-all active:scale-95"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4 text-[#CCD0CF]" />
          </button>

        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-[#9BA8AB]">
          <p>© {new Date().getFullYear()} Shubham Gawade. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
};
