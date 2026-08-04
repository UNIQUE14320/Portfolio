import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Bot, Sparkles, Send, ArrowRight } from 'lucide-react';
import { AviciiLogo } from './AviciiLogo';

interface NavbarProps {
  onOpenFridayDemo: () => void;
  isLightMode?: boolean;
  onToggleTheme?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenFridayDemo, 
  isLightMode = false, 
  onToggleTheme 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');
  const lastScrollY = useRef(0);

  // Scroll visibility & Active section detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show near top of page (less than 50px scrolled)
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current + 8 && currentScrollY > 120) {
        // Scrolling down -> hide navbar
        setIsVisible(false);
        setIsOpen(false);
      } else if (currentScrollY < lastScrollY.current - 8) {
        // Scrolling up -> reveal navbar
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;

      // Detect active section
      const sections = ['overview', 'skills', 'projects', 'education', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl && sectionEl.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', href: '#overview', id: 'overview' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Education', href: '#education', id: 'education' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    setActiveSection(id);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-2 sm:px-6 pt-2 sm:pt-4 transition-all duration-300 ease-in-out pointer-events-none ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      <div className="max-w-7xl mx-auto pointer-events-auto">
        {/* Main Glassy Island Capsule */}
        <nav
          className={`relative overflow-hidden rounded-2xl sm:rounded-3xl transition-all duration-300 shadow-2xl ${
            isLightMode
              ? 'bg-white/80 backdrop-blur-2xl backdrop-saturate-150 border border-white/90 shadow-[0_12px_40px_rgba(0,0,0,0.08)]'
              : 'bg-[#06141B]/75 backdrop-blur-2xl backdrop-saturate-150 border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.6)] shadow-[#253745]/20'
          }`}
        >
          {/* Top Glass Specular Reflection Line */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

          <div className="px-3.5 sm:px-6 h-14 sm:h-18 flex items-center justify-between">
            
            {/* Logo Brand */}
            <div className="flex items-center gap-2.5 group">
              <button
                type="button"
                onClick={onToggleTheme}
                title="Click to toggle theme"
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl p-0.5 transition-all duration-300 active:scale-90 hover:scale-105 cursor-pointer ${
                  isLightMode 
                    ? 'bg-gradient-to-br from-slate-200 via-slate-100 to-white shadow-[0_0_15px_rgba(255,255,255,0.8)] ring-2 ring-slate-300' 
                    : 'bg-gradient-to-br from-[#4A5C6A] via-[#253745] to-[#11212D] shadow-lg shadow-[#253745]/40 border border-[#4A5C6A]'
                }`}
              >
                <div className={`w-full h-full rounded-xl flex items-center justify-center p-2 transition-colors duration-300 ${
                  isLightMode ? 'bg-white' : 'bg-[#06141B]'
                }`}>
                  <AviciiLogo className={`w-full h-full transition-all duration-300 ${
                    isLightMode ? 'text-slate-900 scale-105' : 'text-[#CCD0CF] group-hover:scale-110'
                  }`} />
                </div>
              </button>

              <a href="#hero" className="flex flex-col focus:outline-none">
                <span className={`font-extrabold text-sm sm:text-base tracking-wider transition-colors duration-300 ${
                  isLightMode ? 'text-slate-900' : 'text-[#CCD0CF]'
                }`}>
                  SHUBHAM
                </span>
                <span className={`text-[10px] sm:text-xs font-semibold tracking-wide ${
                  isLightMode ? 'text-slate-600' : 'text-[#9BA8AB]'
                }`}>
                  Software & AI Engineer
                </span>
              </a>
            </div>

            {/* Desktop Navigation Links with Ultra-Clean Pill Design (matching image) */}
            <div className={`hidden md:flex items-center gap-1 p-1.5 rounded-full border ${
              isLightMode 
                ? 'bg-slate-100/80 border-slate-200/90 shadow-sm' 
                : 'bg-[#11212D]/80 border-[#253745]/90 shadow-inner'
            }`}>
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href, link.id)}
                    className={`relative px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 btn-click-effect active:scale-95 ${
                      isActive
                        ? isLightMode
                          ? 'bg-slate-950 text-white shadow-md font-bold'
                          : 'bg-white text-slate-950 shadow-md font-bold'
                        : isLightMode
                          ? 'text-slate-700 hover:text-slate-950 hover:bg-white/80'
                          : 'text-[#9BA8AB] hover:text-white hover:bg-[#253745]/50'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>

            {/* Action CTAs & Ryuk Button */}
            <div className="hidden sm:flex items-center gap-2.5">
              <button
                onClick={onOpenFridayDemo}
                className="relative group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl neu-btn text-xs font-bold cursor-pointer transition-all duration-300"
              >
                <Bot className="w-4 h-4 text-[#CCD0CF] group-hover:rotate-12 transition-transform" />
                <span>TRY Ryuk AI</span>
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-extrabold rounded neu-inset text-[#CCD0CF]">
                  DEMO
                </span>
              </button>

              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact', 'contact')}
                className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-xl neu-btn font-extrabold text-xs transition-all hover:scale-[1.03] active:scale-95 text-black dark:text-[#CCD0CF]"
              >
                <Send className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-1 group-hover:-rotate-12 transition-transform duration-300 text-black dark:text-black" />
                <span>Hire Me</span>
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex md:hidden items-center gap-1.5">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-full transition-all ${
                  isLightMode 
                    ? 'text-slate-800 hover:bg-slate-200/80' 
                    : 'text-[#9BA8AB] hover:text-white hover:bg-[#253745]'
                } focus:outline-none`}
                aria-label="Toggle Navigation Menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Drawer Navigation */}
          {isOpen && (
            <div className={`md:hidden border-t px-4 pt-3 pb-5 space-y-3 animate-in slide-in-from-top duration-200 ${
              isLightMode 
                ? 'bg-white/95 border-slate-200 text-slate-800 backdrop-blur-xl' 
                : 'bg-[#06141B]/95 border-[#253745] text-[#CCD0CF] backdrop-blur-xl'
            }`}>
              <div className="grid grid-cols-1 gap-1">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href, link.id)}
                      className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${
                        isActive
                          ? isLightMode
                            ? 'bg-slate-100 text-slate-900 font-bold'
                            : 'bg-[#253745] text-white font-bold'
                          : isLightMode 
                            ? 'text-slate-700 hover:bg-slate-100' 
                            : 'text-[#CCD0CF] hover:bg-[#253745]/60'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ArrowRight className={`w-4 h-4 ${isLightMode ? 'text-slate-400' : 'text-[#4A5C6A]'}`} />
                    </a>
                  );
                })}
              </div>

              <div className={`pt-2 border-t flex flex-col gap-2 ${isLightMode ? 'border-slate-200' : 'border-[#253745]'}`}>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenFridayDemo();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-extrabold text-xs bg-white text-black hover:bg-[#CCD0CF] border border-white shadow-md transition-all cursor-pointer"
                >
                  <Bot className="w-4 h-4 text-black" />
                  <span className="text-black font-extrabold">Launch Ryuk AI Assistant</span>
                  <Sparkles className="w-3.5 h-3.5 text-black" />
                </button>

                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact', 'contact')}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-extrabold text-xs transition-all ${
                    isLightMode 
                      ? 'bg-slate-200 hover:bg-slate-300 text-slate-900' 
                      : 'bg-[#CCD0CF] hover:bg-white text-[#06141B]'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Direct Message</span>
                </a>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};


