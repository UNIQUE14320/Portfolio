import React from 'react';
import { ACADEMICS_DATA } from '../data/portfolioData';
import { SpotlightCard } from './SpotlightCard';
import { ScrollKineticHeader } from './ScrollKineticHeader';
import { SlowHorizontalMarquee } from './SlowHorizontalMarquee';
import { GraduationCap, Trophy, Code, Brain, Terminal, Cpu } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="overview" className="py-12 sm:py-16 bg-[#06141B] border-y border-[#253745] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Scroll-Driven Animated Section Header */}
        <ScrollKineticHeader
          badgeIcon="brain"
          badgeText="Developer Journey & Profile"
          titlePrefix="Developer Profile &"
          titleHighlight="Technical Background"
          subtitle="A developer who bridges the gap between traditional web engineering, enterprise systems, and next-generation AI-powered voice capabilities."
          gradientFromTo="from-white via-[#CCD0CF] to-[#9BA8AB]"
        />

        {/* Slow Horizontal Moving Banner */}
        <div className="mb-8 sm:mb-10">
          <SlowHorizontalMarquee
            text="A DEVELOPER WHO BRIDGES THE GAP BETWEEN TRADITIONAL WEB ENGINEERING, ENTERPRISE SYSTEMS, AND NEXT-GENERATION AI-POWERED VOICE CAPABILITIES"
            duration={42}
          />
        </div>

        {/* 2-Column Bento Grid for Technical Journey & Key Competencies */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Technical Journey Card */}
          <SpotlightCard
            glowColor="rgba(74, 92, 106, 0.45), rgba(155, 168, 171, 0.22)"
            className="p-6 sm:p-8 rounded-3xl bg-[#11212D] border border-[#253745] shadow-xl"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#253745] border border-[#4A5C6A] flex items-center justify-center text-[#CCD0CF]">
                <GraduationCap className="w-6 h-6" />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#CCD0CF]">My Technical Journey</h3>

              <p className="text-sm sm:text-base text-[#9BA8AB] leading-relaxed">
                I graduated with a <strong className="text-[#CCD0CF]">Bachelor of Business Administration in Computer Application (BBA-CA)</strong> from Savitribai Phule Pune University, Pune. My education provided a rock-solid foundation in computer programming, object-oriented concepts, database management, and enterprise web applications.
              </p>

              <p className="text-sm sm:text-base text-[#9BA8AB] leading-relaxed">
                Beyond academics, I have specialized in building real-world projects — from an end-to-end voice-controlled AI assistant with natural language understanding to hospital workflow management systems.
              </p>
            </div>

            {/* Core Capability Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-4 border-t border-[#253745]">
              {[
                { label: "Object-Oriented Design", icon: Code },
                { label: "Data Structures & Algo", icon: Cpu },
                { label: "LLM & Speech Pipelines", icon: Brain },
                { label: "Full-Stack CRUD Apps", icon: Terminal },
                { label: "RESTful Web APIs", icon: Code },
                { label: "Database Normalization", icon: Cpu },
              ].map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-2xl bg-[#06141B] border border-[#253745] flex flex-col items-center text-center gap-1.5">
                  <item.icon className="w-4 h-4 text-[#9BA8AB]" />
                  <span className="text-[11px] sm:text-xs font-semibold text-[#CCD0CF] leading-tight">{item.label}</span>
                </div>
              ))}
            </div>
          </SpotlightCard>

          {/* Academic & Entrance Exam Excellence Card */}
          <SpotlightCard
            glowColor="rgba(74, 92, 106, 0.45), rgba(155, 168, 171, 0.22)"
            className="p-6 sm:p-8 rounded-3xl bg-[#11212D] border border-[#253745] shadow-xl"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#253745] border border-[#4A5C6A] flex items-center justify-center text-[#CCD0CF]">
                <Trophy className="w-6 h-6" />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#CCD0CF]">Academic & Competitive Excellence</h3>
              <p className="text-sm sm:text-base text-[#9BA8AB] leading-relaxed">
                Proven track record in national and state-level competitive examinations, demonstrating high analytical caliber and mathematical problem-solving.
              </p>
            </div>

            {/* Achievement Cards Stack */}
            <div className="space-y-3.5 pt-2">
              {ACADEMICS_DATA.map((item) => (
                <SpotlightCard
                  key={item.id}
                  glowColor="rgba(74, 92, 106, 0.4), rgba(204, 208, 207, 0.2)"
                  className="p-4 rounded-2xl border transition-all bg-[#06141B] border-[#253745]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-base font-bold text-[#CCD0CF]">{item.title}</h4>
                      <p className="text-xs text-[#9BA8AB] font-medium mt-0.5">{item.subtitle}</p>
                    </div>
                    <div className="px-3 py-1 rounded-xl bg-[#253745] border border-[#4A5C6A] text-[#CCD0CF] font-mono text-xs font-extrabold shrink-0">
                      {item.score}
                    </div>
                  </div>
                  <p className="text-xs text-[#9BA8AB] mt-2.5 leading-relaxed">{item.description}</p>
                </SpotlightCard>
              ))}
            </div>
          </SpotlightCard>

        </div>

      </div>
    </section>
  );
};

