import React from 'react';
import { PORTFOLIO_DATA, ExperienceItem } from '../data/portfolio';
import { Microscope, Award, FileCheck, ShieldAlert, ChevronRight, MapPin } from 'lucide-react';

interface ExperienceProps {
  onSelectExperience: (item: ExperienceItem) => void;
}

export const Experience: React.FC<ExperienceProps> = ({ onSelectExperience }) => {
  const { experiences } = PORTFOLIO_DATA;

  const renderExperienceCard = (exp: ExperienceItem) => (
            <div key={exp.id} className="relative pl-0 md:pl-8 group">
              
              {/* Glass Card Container */}
              <div 
                onClick={() => onSelectExperience(exp)}
                className="glass-panel-interactive rounded-md p-6 sm:p-8 relative border border-white/10 cursor-pointer group"
              >
                {/* Header Meta Row */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-cyan uppercase flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-ember" />
                      {exp.location}
                    </span>
                  </div>

                  <div className="font-mono text-xs font-semibold text-ember tracking-wider bg-harbor px-3 py-1 rounded border border-ember/30">
                    {exp.period}
                  </div>
                </div>

                {/* Title & Role */}
                <div className="mb-4">
                  <h3 className="font-sora text-xl sm:text-2xl font-bold text-white group-hover:text-cyan transition-colors flex items-center gap-2">
                    <span>{exp.title}</span>
                    <ChevronRight className="w-5 h-5 text-cyan opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </h3>
                  {exp.role && (
                    <p className="font-mono text-sm text-cyan-light mt-1 font-medium">
                      {exp.role}
                    </p>
                  )}
                </div>

                {/* Main Summary if no structured sections or as introduction */}
                {exp.summary && (!exp.structuredSections || exp.structuredSections.length === 0) && (
                  <p className="font-inter text-base text-cream-soft leading-relaxed mb-6">
                    {exp.summary}
                  </p>
                )}

                {/* Bullets if present */}
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="space-y-3 mb-8">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-cream-soft leading-relaxed">
                        <span className="text-cyan font-mono mt-0.5">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Structured Sections (e.g., Benchmark Staining Design Validation, Product Risk Management) */}
                {exp.structuredSections && exp.structuredSections.length > 0 && (
                  <div className="space-y-6 mt-6">
                    {exp.structuredSections.map((sec, sIdx) => (
                      <div key={sIdx} className="pt-6 border-t border-white/10 bg-harbor/70 rounded p-5 border border-cyan/20">
                        <div className="flex items-center gap-2.5 mb-3">
                          {sec.title.toLowerCase().includes('risk') ? (
                            <ShieldAlert className="w-4 h-4 text-cyan" />
                          ) : (
                            <Microscope className="w-4 h-4 text-cyan" />
                          )}
                          <h4 className="font-mono text-sm font-bold text-amber uppercase tracking-wider">
                            {sec.title}
                          </h4>
                        </div>

                        <p className="font-inter text-sm text-cream-soft leading-relaxed mb-4">
                          {sec.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {sec.highlights.map((item, hIdx) => (
                            <div key={hIdx} className="flex items-start gap-2 bg-harbor p-3 rounded border border-white/5 text-xs text-cream">
                              <FileCheck className="w-3.5 h-3.5 text-cyan shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Fallback Single Block: Product Risk Management if present */}
                {!exp.structuredSections && exp.riskManagement && (
                  <div className="mt-8 pt-6 border-t border-white/10 bg-harbor/70 rounded p-5 border border-cyan/20">
                    <div className="flex items-center gap-2.5 mb-3">
                      <ShieldAlert className="w-4 h-4 text-ember" />
                      <h4 className="font-mono text-sm font-bold text-ember uppercase tracking-wider">
                        {exp.riskManagement.title}
                      </h4>
                    </div>

                    <p className="font-inter text-sm text-cream-soft leading-relaxed mb-4">
                      {exp.riskManagement.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {exp.riskManagement.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 bg-harbor p-3 rounded border border-white/5 text-xs text-cream">
                          <FileCheck className="w-3.5 h-3.5 text-cyan shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Interactive Click Hint */}
                <div className="mt-6 flex justify-end">
                  <span className="font-mono text-[11px] text-cyan flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                    <span>CLICK FOR VERIFICATION DOSSIER</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>

              </div>
            </div>
  );

  return (
    <section id="experience" className="py-16 sm:py-20 relative">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <div className="flex items-center gap-3 mb-16">
          <div className="p-2.5 rounded bg-harbor border border-ember/30 text-ember">
            <Microscope className="w-6 h-6" />
          </div>
          <h2 className="font-sora text-3xl md:text-4xl font-bold text-white tracking-tight">
            Experience
          </h2>
        </div>

        {/* Timeline Stack Grid */}
        <div className="space-y-12 relative">
          {experiences.map((exp) => renderExperienceCard(exp))}
        </div>

      </div>
    </section>
  );
};
