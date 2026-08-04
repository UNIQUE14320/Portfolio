import React, { useState, useEffect } from 'react';
import { DEVELOPER_INFO } from '../data/portfolioData';
import { SpotlightCard } from './SpotlightCard';
import { generateResumePdf } from '../utils/generateResumePdf';
import { 
  Bot, 
  ArrowRight, 
  Mail, 
  Copy, 
  Check, 
  Github, 
  Linkedin, 
  Award, 
  Sparkles,
  Download,
  FileText
} from 'lucide-react';

interface HeroProps {
  onOpenFridayDemo: () => void;
  isLightMode?: boolean;
  onToggleTheme?: () => void;
}

const ROTATING_TITLES = [
  'Python & Java Developer',
  'AI Integrations & Software Specialist',
  'Full-Stack Web Developer',
  'Voice AI System Architect'
];

export const Hero: React.FC<HeroProps> = ({ 
  onOpenFridayDemo, 
  isLightMode = false, 
  onToggleTheme 
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isDownloadingResume, setIsDownloadingResume] = useState(false);

  const handleDownloadResume = () => {
    setIsDownloadingResume(true);
    try {
      generateResumePdf();
    } catch (err) {
      console.error('PDF Generation Error:', err);
    } finally {
      setTimeout(() => setIsDownloadingResume(false), 1000);
    }
  };

  // Typewriter effect state
  const [titleIndex, setTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetTitle = ROTATING_TITLES[titleIndex % ROTATING_TITLES.length];

    if (!isDeleting && currentText === targetTitle) {
      // Completed typing the full string -> hold for 2 seconds
      const timer = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timer);
    }

    if (isDeleting && currentText === '') {
      // Completed deleting -> switch to next title & start typing
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % ROTATING_TITLES.length);
      return;
    }

    const speed = isDeleting ? 30 : 65;
    const timer = setTimeout(() => {
      setCurrentText(
        isDeleting
          ? targetTitle.substring(0, currentText.length - 1)
          : targetTitle.substring(0, currentText.length + 1)
      );
    }, speed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, titleIndex]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="hero" className="relative pt-20 sm:pt-28 pb-12 sm:pb-20 overflow-hidden">
      {/* Subtle Glow Accents matching user palette */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-[#4A5C6A]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-64 h-64 bg-[#253745]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Left Column: Intro & Headline */}
          <div className="lg:col-span-7 flex flex-col space-y-4 sm:space-y-6">
            
            {/* Status Pill */}
            <div 
              title="Available for Software Developer Roles"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs sm:text-sm w-fit transition-all duration-300 neu-flat ${
                isLightMode
                  ? 'bg-[#e8eef6] border-white text-slate-900 font-bold'
                  : 'bg-[#181c28] border-white/10 text-zinc-100'
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${isLightMode ? 'bg-slate-900' : 'bg-zinc-100'}`} />
              <span className={`font-semibold ${isLightMode ? 'text-slate-900' : 'text-zinc-100'}`}>Available for Software Developer Roles</span>
            </div>

            {/* Main Greeting Headline */}
            <div className="space-y-2">
              <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight ${
                isLightMode ? 'text-slate-900' : 'text-[#CCD0CF]'
              }`}>
                Hi, I'm <span className={
                  isLightMode ? 'text-slate-900 font-extrabold' : 'text-transparent bg-clip-text bg-gradient-to-r from-white via-[#CCD0CF] to-[#9BA8AB]'
                }>{DEVELOPER_INFO.name}</span>
              </h1>
              
              {/* Dynamic Rotating Title */}
              <div className="flex items-center gap-2.5 text-base sm:text-xl lg:text-2xl font-bold min-h-[36px]">
                <span className={
                  isLightMode 
                    ? 'text-slate-900 font-mono font-extrabold tracking-tight' 
                    : 'text-transparent bg-clip-text bg-gradient-to-r from-white via-[#CCD0CF] to-[#9BA8AB] font-mono tracking-tight'
                }>
                  {currentText}
                </span>
                <span className={`w-2 h-5 sm:h-6 inline-block animate-pulse rounded-full shrink-0 ${
                  isLightMode 
                    ? 'bg-slate-900 shadow-[0_0_10px_rgba(15,23,42,0.5)]' 
                    : 'bg-[#CCD0CF] shadow-[0_0_10px_#CCD0CF]'
                }`} />
              </div>
            </div>

            {/* Subtitle Bio */}
            <p className="text-sm sm:text-base lg:text-lg text-[#9BA8AB] leading-relaxed font-normal max-w-2xl">
              {DEVELOPER_INFO.bio}
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5 pt-2">
              {/* Prominent Download Resume Button */}
              <button
                onClick={handleDownloadResume}
                disabled={isDownloadingResume}
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl neu-btn font-extrabold text-sm sm:text-base cursor-pointer text-center transition-all hover:scale-[1.02] active:scale-95"
              >
                {isDownloadingResume ? (
                  <>
                    <FileText className="w-5 h-5 animate-pulse text-white" />
                    <span>Generating Resume PDF...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-200" />
                    <span>Download Resume</span>
                  </>
                )}
              </button>

              <a
                href="#projects"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl neu-btn font-extrabold text-sm sm:text-base text-center transition-all hover:scale-[1.02] active:scale-95"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1.5 transition-transform duration-200" />
              </a>

              <button
                onClick={onOpenFridayDemo}
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl neu-btn font-bold text-sm sm:text-base cursor-pointer text-center transition-all hover:scale-[1.02] active:scale-95"
              >
                <Bot className="w-5 h-5 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-200" />
                <span>TRY Ryuk AI Demo</span>
                <Sparkles className="w-4 h-4 group-hover:rotate-45 group-hover:scale-110 transition-transform duration-200 text-black dark:text-black" />
              </button>
            </div>

            {/* Contact Badges Bento Grid with Spotlight glow */}
            <div className="pt-3 border-t border-[#253745] grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Email Badge with Copy */}
              <SpotlightCard
                glowColor="rgba(74, 92, 106, 0.4), rgba(155, 168, 171, 0.2)"
                className="p-3 rounded-2xl bg-[#11212D] border border-[#253745] text-[#CCD0CF] text-xs sm:text-sm shadow-md"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0 overflow-hidden">
                    <div className="w-8 h-8 rounded-xl bg-[#253745] flex items-center justify-center text-[#CCD0CF] shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="truncate font-medium break-all">{DEVELOPER_INFO.email}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(DEVELOPER_INFO.email)}
                    className="p-1.5 rounded-lg bg-[#253745] hover:bg-[#4A5C6A] text-[#9BA8AB] hover:text-white transition-colors shrink-0 btn-click-effect active:scale-95"
                    title="Copy email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </SpotlightCard>

              {/* Social Links Badge */}
              <SpotlightCard
                glowColor="rgba(74, 92, 106, 0.4), rgba(155, 168, 171, 0.2)"
                className="p-3 rounded-2xl bg-[#11212D] border border-[#253745] text-[#CCD0CF] text-xs sm:text-sm shadow-md"
              >
                <div className="flex items-center justify-around h-full">
                  <a
                    href={DEVELOPER_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[#CCD0CF] hover:text-white font-semibold transition-colors btn-click-effect active:scale-95"
                  >
                    <Github className="w-4 h-4 text-[#9BA8AB]" />
                    <span>GitHub</span>
                  </a>
                  <span className="text-[#4A5C6A]">|</span>
                  <a
                    href={DEVELOPER_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[#CCD0CF] hover:text-white font-semibold transition-colors btn-click-effect active:scale-95"
                  >
                    <Linkedin className="w-4 h-4 text-[#9BA8AB]" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </SpotlightCard>

            </div>

          </div>

          {/* Right Column: Key Developer Overview Card */}
          <div className="lg:col-span-5">
            <SpotlightCard
              glowColor="rgba(74, 92, 106, 0.45), rgba(204, 208, 207, 0.2)"
              className="rounded-3xl bg-[#11212D] border border-[#253745] p-5 sm:p-6 shadow-2xl backdrop-blur-xl"
            >
              
              {/* Header inside Card */}
              <div className="flex items-center justify-between border-b border-[#253745] pb-4 mb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#CCD0CF]">Shubham Gawade</h3>
                  <p className="text-xs text-[#9BA8AB] font-semibold">Developer Overview</p>
                </div>
                <div className="px-3 py-1 rounded-xl bg-[#253745] border border-[#4A5C6A] text-[#CCD0CF] font-mono text-xs font-bold">
                  CGPA 7.46
                </div>
              </div>

              {/* Competitive Score Badges */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="p-3 rounded-2xl bg-[#06141B] border border-[#253745] flex flex-col">
                  <span className="text-[11px] font-semibold text-[#9BA8AB] uppercase tracking-wider">NIMCET Rank</span>
                  <span className="text-xl sm:text-2xl font-black text-[#CCD0CF] mt-0.5">AIR 7160</span>
                  <span className="text-[10px] text-[#9BA8AB] mt-1">All India Rank</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#06141B] border border-[#253745] flex flex-col">
                  <span className="text-[11px] font-semibold text-[#9BA8AB] uppercase tracking-wider">MAH MCA CET</span>
                  <span className="text-xl sm:text-2xl font-black text-[#CCD0CF] mt-0.5">83rd %ile</span>
                  <span className="text-[10px] text-[#9BA8AB] mt-1">State Percentile</span>
                </div>
              </div>

              {/* Core Tech Stack Pills */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold text-[#CCD0CF] uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#9BA8AB]" />
                  <span>Core Tech Stack</span>
                </span>
                
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {['Python', 'Core Java', 'React.js', 'Node.js', 'Hibernate', 'MySQL', 'MongoDB', 'SQLite', 'REST APIs', 'Android'].map((tech) => (
                    <span 
                      key={tech} 
                      className="px-2.5 py-1 rounded-xl bg-[#06141B] border border-[#253745] text-xs font-medium text-[#CCD0CF] transition-colors hover:border-[#4A5C6A]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="mt-5 pt-4 border-t border-[#253745] flex items-center justify-between text-xs text-[#9BA8AB]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-zinc-300"></span>
                  <span className="text-[#CCD0CF] font-medium">SPPU Pune Alumni</span>
                </div>
                <a
                  href="#contact"
                  className="text-[#CCD0CF] hover:text-white font-bold underline underline-offset-2 flex items-center gap-1 btn-click-effect"
                >
                  Contact Directly →
                </a>
              </div>

            </SpotlightCard>
          </div>

        </div>
      </div>
    </section>
  );
};

