import React from 'react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { SpotlightCard } from './SpotlightCard';
import { ScrollKineticHeader } from './ScrollKineticHeader';
import { Bot, Github, ExternalLink, Sparkles, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface ProjectsSectionProps {
  onOpenFridayDemo: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenFridayDemo }) => {
  return (
    <section id="projects" className="py-16 sm:py-24 bg-[#06141B] border-t border-[#253745] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <ScrollKineticHeader
          badgeIcon="code"
          badgeText="Featured Engineering Projects"
          titlePrefix="Production-Ready"
          titleHighlight="Applications & Systems"
          subtitle="Explore real-world software engineering projects ranging from voice-controlled AI assistants with LLM function calling to enterprise Java web systems."
          gradientFromTo="from-white via-[#CCD0CF] to-[#9BA8AB]"
        />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {PROJECTS_DATA.map((project) => {
            const isRyuk = project.id === 'ryuk-ai' || project.id === 'pluto-ai';

            return (
              <SpotlightCard
                key={project.id}
                className="group relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-2xl overflow-hidden"
              >
                {/* Subtle Ambient Background Gradient */}
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-5 transition-opacity duration-300 group-hover:opacity-15 bg-zinc-700" />

                <div>
                  {/* Badge & Type */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide border bg-[#06141B] text-[#CCD0CF] border-[#253745]">
                      {isRyuk && <Bot className="w-3.5 h-3.5 text-[#CCD0CF]" />}
                      <span>{project.badgeText}</span>
                    </span>

                    <span className="text-xs font-semibold text-[#9BA8AB]">
                      {project.subtitle}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-black text-[#CCD0CF] tracking-tight group-hover:text-white transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm text-[#9BA8AB] leading-relaxed">
                    {project.description}
                  </p>

                  {/* Key Engineering Highlights */}
                  <div className="mt-6 space-y-2.5">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#CCD0CF]">
                      Key System Highlights
                    </h4>
                    <ul className="space-y-2">
                      {project.keyEngineering.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-[#9BA8AB]">
                          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#CCD0CF]" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tech Stack & Action Links */}
                <div className="mt-8 pt-6 border-t border-[#253745]/80 space-y-5">
                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-xl text-xs font-semibold bg-[#06141B] text-[#9BA8AB] border border-[#253745]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-1">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl neu-btn font-extrabold text-xs text-[#CCD0CF] hover:text-white transition-all flex-1 text-center"
                    >
                      <Github className="w-4 h-4" />
                      <span>View Source Code</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>

                    {isRyuk && (
                      <button
                        onClick={onOpenFridayDemo}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-white hover:bg-[#CCD0CF] text-black font-extrabold text-xs border border-white shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        <Bot className="w-4 h-4 text-black" />
                        <span className="text-black font-extrabold">Launch Ryuk Demo</span>
                        <Sparkles className="w-3.5 h-3.5 text-black" />
                      </button>
                    )}
                  </div>
                </div>

              </SpotlightCard>
            );
          })}
        </div>

      </div>
    </section>
  );
};
