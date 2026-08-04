import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { FridayAiModal } from './components/FridayAiModal';
import { Footer } from './components/Footer';
import { InitialLoader } from './components/InitialLoader';
import { ThemeTransitionOverlay } from './components/ThemeTransitionOverlay';
import { AiProjectLoader } from './components/AiProjectLoader';

export default function App() {
  const [isFridayModalOpen, setIsFridayModalOpen] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isLightMode, setIsLightMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_theme');
      if (saved) return saved === 'light';
    }
    return true; // Default to light/white theme on initial load
  });
  const [isThemeTransitioning, setIsThemeTransitioning] = useState(false);
  const [targetTheme, setTargetTheme] = useState<'dark' | 'light' | null>(null);

  const handleOpenFridayDemo = () => {
    setIsAiLoading(true);
  };

  const handleAiLoaderComplete = () => {
    setIsAiLoading(false);
    setIsFridayModalOpen(true);
  };

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add('light-mode');
      localStorage.setItem('portfolio_theme', 'light');
    } else {
      document.body.classList.remove('light-mode');
      localStorage.setItem('portfolio_theme', 'dark');
    }
  }, [isLightMode]);

  const toggleTheme = () => {
    if (isThemeTransitioning) return;
    const nextTheme = isLightMode ? 'dark' : 'light';
    setTargetTheme(nextTheme);
    setIsThemeTransitioning(true);

    // Switch state midway through transition
    setTimeout(() => {
      setIsLightMode(prev => !prev);
    }, 300);

    // End transition overlay
    setTimeout(() => {
      setIsThemeTransitioning(false);
      setTargetTheme(null);
    }, 800);
  };

  return (
    <div className={`min-h-screen futuristic-bg font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-500 ${isLightMode ? 'light-mode text-slate-800' : 'text-slate-100'}`}>
      
      {/* Initial Subtle Mounting Loader */}
      <InitialLoader isLightMode={isLightMode} />

      {/* Theme Transition Overlay */}
      <ThemeTransitionOverlay 
        isTransitioning={isThemeTransitioning} 
        targetTheme={targetTheme} 
      />

      {/* Top Navigation */}
      <Navbar 
        onOpenFridayDemo={handleOpenFridayDemo} 
        isLightMode={isLightMode}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Sections */}
      <main>
        <Hero 
          onOpenFridayDemo={handleOpenFridayDemo} 
          isLightMode={isLightMode}
          onToggleTheme={toggleTheme}
        />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection onOpenFridayDemo={handleOpenFridayDemo} />
        <EducationSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer isLightMode={isLightMode} onToggleTheme={toggleTheme} />

      {/* 5-Second Neural AI Project Loader */}
      <AiProjectLoader
        isLoading={isAiLoading}
        onComplete={handleAiLoaderComplete}
        isLightMode={isLightMode}
      />

      {/* F.R.I.D.A.Y AI Assistant Modal Simulator */}
      <FridayAiModal
        isOpen={isFridayModalOpen}
        onClose={() => setIsFridayModalOpen(false)}
      />

    </div>
  );
}


