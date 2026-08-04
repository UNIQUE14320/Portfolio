import React, { useState } from 'react';
import { SKILLS_DATA } from '../data/portfolioData';
import { SpotlightCard } from './SpotlightCard';
import { ScrollKineticHeader } from './ScrollKineticHeader';
import { KineticText } from './KineticText';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code, 
  Terminal, 
  Database, 
  Cpu, 
  Boxes, 
  Server, 
  Cloud, 
  ShieldCheck, 
  GitBranch, 
  Workflow, 
  FileCode,
  Layout,
  Layers,
  HardDrive,
  Atom,
  Box,
  Smartphone,
  Monitor,
  Command,
  Binary,
  Bot
} from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Skills', icon: Boxes },
    { id: 'languages', label: 'Languages', icon: Code },
    { id: 'databases', label: 'Databases', icon: Database },
    { id: 'tools', label: 'Tools & IDEs', icon: Terminal },
    { id: 'concepts', label: 'Core Concepts', icon: Cpu },
  ];

  const filteredSkills = activeCategory === 'all' 
    ? SKILLS_DATA 
    : SKILLS_DATA.filter(s => s.category === activeCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal': return <Terminal className="w-5 h-5 text-[#CCD0CF] group-hover:text-white group-hover:-translate-y-0.5 group-hover:scale-110 transition-all duration-300" />;
      case 'Code': return <Code className="w-5 h-5 text-[#CCD0CF] group-hover:text-white group-hover:rotate-6 group-hover:scale-110 transition-all duration-300" />;
      case 'Database': return <Database className="w-5 h-5 text-[#CCD0CF] group-hover:text-white group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />;
      case 'Server': return <Server className="w-5 h-5 text-[#CCD0CF] group-hover:text-white group-hover:scale-110 transition-all duration-300" />;
      case 'Cloud': return <Cloud className="w-5 h-5 text-[#CCD0CF] group-hover:text-white group-hover:-translate-y-0.5 group-hover:scale-110 transition-all duration-300" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-[#CCD0CF] group-hover:text-white group-hover:scale-110 transition-all duration-300" />;
      case 'GitBranch': return <GitBranch className="w-5 h-5 text-[#CCD0CF] group-hover:text-white group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />;
      case 'Workflow': return <Workflow className="w-5 h-5 text-[#CCD0CF] group-hover:text-white group-hover:scale-110 transition-all duration-300" />;
      case 'FileCode': return <FileCode className="w-5 h-5 text-[#CCD0CF] group-hover:text-white group-hover:-translate-y-0.5 group-hover:scale-110 transition-all duration-300" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-[#CCD0CF] group-hover:text-white group-hover:rotate-90 group-hover:scale-110 transition-all duration-300" />;
      case 'Layout': return <Layout className="w-5 h-5 text-[#CCD0CF] group-hover:text-white group-hover:scale-110 transition-all duration-300" />;
      case 'Layers': return <Layers className="w-5 h-5 text-[#CCD0CF] group-hover:text-white group-hover:scale-110 transition-all duration-300" />;
      case 'HardDrive': return <HardDrive className="w-5 h-5 text-[#CCD0CF] group-hover:text-white group-hover:scale-110 transition-all duration-300" />;
      case 'Atom': return <Atom className="w-5 h-5 text-[#CCD0CF] group-hover:text-white group-hover:rotate-180 group-hover:scale-110 transition-all duration-500" />;
      case 'Box': return <Box className="w-5 h-5 text-[#CCD0CF] group-hover:text-white group-hover:scale-110 transition-all duration-300" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-[#CCD0CF] group-hover:text-white group-hover:-translate-y-0.5 group-hover:scale-110 transition-all duration-300" />;
      case 'Monitor': return <Monitor className="w-5 h-5 text-[#CCD0CF] group-hover:text-white group-hover:scale-110 transition-all duration-300" />;
      case 'Command': return <Command className="w-5 h-5 text-[#CCD0CF] group-hover:text-white group-hover:rotate-45 group-hover:scale-110 transition-all duration-300" />;
      case 'Binary': return <Binary className="w-5 h-5 text-[#CCD0CF] group-hover:text-white group-hover:scale-110 transition-all duration-300" />;
      case 'Bot': return <Bot className="w-5 h-5 text-[#CCD0CF] group-hover:text-white group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />;
      default: return <Boxes className="w-5 h-5 text-[#CCD0CF] group-hover:text-white group-hover:scale-110 transition-all duration-300" />;
    }
  };

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollKineticHeader
          badgeIcon="code"
          badgeText="Technical Skill Expertise"
          titlePrefix="Technical Skills &"
          titleHighlight="Core Competencies"
          subtitle="A comprehensive breakdown of engineering capabilities, programming languages, databases, and developer tooling with interactive kinetic typography."
          gradientFromTo="from-white via-[#CCD0CF] to-[#9BA8AB]"
        />

        {/* Mini Navbar Filter Capsule */}
        <div className="flex items-center justify-center mb-10">
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-[#11212D]/90 border border-[#253745]/90 shadow-2xl backdrop-blur-md max-w-full overflow-x-auto no-scrollbar whitespace-nowrap">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;

              return (
                <motion.button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group relative px-4.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 cursor-pointer whitespace-nowrap flex items-center gap-2 select-none shrink-0 ${
                    isActive
                      ? 'text-black font-extrabold'
                      : 'text-white hover:text-white hover:bg-white/10'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSkillTab"
                      className="absolute inset-0 rounded-full bg-white shadow-md shadow-white/20"
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon className={`w-4 h-4 shrink-0 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12 ${isActive ? 'text-black font-bold' : 'text-white'}`} />
                    <KineticText
                      text={cat.label}
                      isHovered={isActive}
                      type="wave"
                      staggerDelay={0.02}
                      hoverColor={isActive ? "#000000" : "#FFFFFF"}
                    />
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Skills Cards Grid - Animated filtering */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              const isHovered = hoveredSkillId === skill.id;

              return (
                <motion.div
                  key={skill.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -10 }}
                  transition={{ duration: 0.22 }}
                  onMouseEnter={() => setHoveredSkillId(skill.id)}
                  onMouseLeave={() => setHoveredSkillId(null)}
                >
                  <SpotlightCard
                    glowColor="rgba(255, 255, 255, 0.18), rgba(200, 200, 200, 0.1)"
                    className="p-5 rounded-3xl neu-card group flex flex-col justify-between space-y-4 h-full cursor-pointer transition-all duration-300 hover:border-[#4A5C6A]"
                  >
                    {/* Card Top */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-2xl neu-inset flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          {getIcon(skill.iconName)}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-base font-bold text-[#CCD0CF] group-hover:text-white transition-colors truncate">
                            <KineticText
                              text={skill.name}
                              isHovered={isHovered}
                              type={
                                skill.category === 'languages' 
                                  ? 'elastic' 
                                  : skill.category === 'databases' 
                                  ? 'bounce' 
                                  : skill.category === 'tools' 
                                  ? 'skew' 
                                  : 'wave'
                              }
                              hoverColor="#FFFFFF"
                            />
                          </h3>
                          <div className="mt-0.5">
                            <KineticText
                              text={skill.category.toUpperCase()}
                              isHovered={isHovered}
                              type="glow"
                              staggerDelay={0.02}
                              className="text-[11px] font-mono text-[#9BA8AB] uppercase tracking-wider font-semibold"
                              hoverColor="#CCD0CF"
                            />
                          </div>
                        </div>
                      </div>

                      <motion.div 
                        animate={isHovered ? { scale: [1, 1.12, 1], rotate: [0, -3, 3, 0] } : {}}
                        transition={{ duration: 0.3 }}
                        className="skill-level-badge px-2.5 py-1 rounded-xl bg-black text-white font-mono text-xs font-black shrink-0 border border-[#253745] shadow-md flex items-center justify-center"
                      >
                        <KineticText
                          text={`${skill.level}%`}
                          isHovered={isHovered}
                          type="bounce"
                          staggerDelay={0.05}
                          hoverColor="#FFFFFF"
                        />
                      </motion.div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="w-full h-3 rounded-full neu-inset overflow-hidden p-0.5 border border-[#253745]">
                        <motion.div
                          className="skill-progress-fill h-full rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)]"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    {/* Description Detail */}
                    <p className="text-xs text-[#9BA8AB] leading-relaxed font-normal pt-1">
                      {skill.description}
                    </p>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
