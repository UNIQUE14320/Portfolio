import React from 'react';
import { EDUCATION_DATA, CERTIFICATIONS_LIST, DEVELOPER_INFO } from '../data/portfolioData';
import { SpotlightCard } from './SpotlightCard';
import { ScrollKineticHeader } from './ScrollKineticHeader';
import { GraduationCap, Award, ExternalLink, FolderCheck, BookOpen } from 'lucide-react';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-12 sm:py-16 bg-[#06141B] border-t border-[#253745] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Scroll-Driven Animated Section Header */}
        <ScrollKineticHeader
          badgeIcon="graduation"
          badgeText="Academic Background & Credentials"
          titlePrefix="Education &"
          titleHighlight="Certifications"
          subtitle="Formal academic background establishing core software engineering principles and verified credentials."
          gradientFromTo="from-white via-[#CCD0CF] to-[#9BA8AB]"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column: Formal Education Timeline */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xl font-bold text-[#CCD0CF] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#9BA8AB]" />
              <span>Formal Education</span>
            </h3>

            <div className="space-y-4">
              {EDUCATION_DATA.map((edu) => (
                <SpotlightCard
                  key={edu.id}
                  glowColor="rgba(74, 92, 106, 0.4), rgba(155, 168, 171, 0.2)"
                  className="p-6 rounded-3xl bg-[#11212D] border border-[#253745] hover:border-[#4A5C6A] shadow-xl"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <span className="px-3 py-1 rounded-full bg-[#253745] text-[#CCD0CF] text-xs font-mono font-bold border border-[#4A5C6A]">
                        {edu.year}
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-[#CCD0CF] mt-2">
                        {edu.degree}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#9BA8AB] font-semibold">
                        {edu.institution}
                      </p>
                    </div>

                    <div className="px-3 py-1 rounded-xl bg-[#253745] border border-[#4A5C6A] text-[#CCD0CF] font-mono text-xs font-bold">
                      {edu.score}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#9BA8AB] leading-relaxed mb-4">
                    {edu.details}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {edu.specials.map((spec) => (
                      <span key={spec} className="px-2.5 py-1 rounded-xl bg-[#06141B] text-[11px] font-mono text-[#CCD0CF] border border-[#253745]">
                        {spec}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>

          {/* Right Column: Verified Certifications Directory */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-bold text-[#CCD0CF] flex items-center gap-2">
              <Award className="w-5 h-5 text-[#9BA8AB]" />
              <span>Verified Certifications</span>
            </h3>

            <SpotlightCard
              glowColor="rgba(74, 92, 106, 0.45), rgba(155, 168, 171, 0.2)"
              className="p-6 sm:p-7 rounded-3xl bg-[#11212D] border border-[#253745] space-y-5 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#253745] border border-[#4A5C6A] flex items-center justify-center text-[#CCD0CF] shrink-0">
                  <FolderCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#CCD0CF]">Google Drive Certifications</h4>
                  <p className="text-xs text-[#9BA8AB]">Verified docs, transcripts, and course records</p>
                </div>
              </div>

              <div className="space-y-2.5">
                {CERTIFICATIONS_LIST.map((cert, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-[#06141B] border border-[#253745] flex items-center justify-between">
                    <div>
                      <h5 className="text-xs sm:text-sm font-bold text-[#CCD0CF]">{cert.title}</h5>
                      <span className="text-[10px] text-[#9BA8AB] font-semibold">{cert.org}</span>
                    </div>
                    <span className="text-xs text-emerald-500 dark:text-emerald-400 font-mono font-bold">Verified ✓</span>
                  </div>
                ))}
              </div>

              <a
                href={DEVELOPER_INFO.driveCertifications}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-2xl bg-[#CCD0CF] hover:bg-white active:scale-95 text-[#06141B] font-extrabold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-xl btn-click-effect"
              >
                <FolderCheck className="w-4 h-4 text-[#06141B]" />
                <span>Open Google Drive Certifications</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#06141B]" />
              </a>

            </SpotlightCard>
          </div>

        </div>

      </div>
    </section>
  );
};

