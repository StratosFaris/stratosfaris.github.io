import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { GraduationCap, BookOpen, Award, Turtle} from 'lucide-react';
import { PiDogBold } from 'react-icons/pi';

export const Education: React.FC = () => {
  const { education } = PORTFOLIO_DATA;

  return (
    <section id="education" className="py-14 sm:py-16 relative z-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8 sm:mb-12 !text-ember border-ember/30">
          <div className="p-2.5 rounded bg-harbor border border-ember/30 !text-ember">
            <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <h2 className="font-sora text-2xl md:text-3xl font-bold text-white tracking-tight">
            Academic Foundation
          </h2>
        </div>

        {/* Academic Cards */}
        <div className="flex flex-col gap-6 sm:gap-8">
          {education.map((edu, index) => (
            <div key={index} className="glass-panel rounded-md p-5 sm:p-8 md:p-10 border border-white/10 relative">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 sm:gap-8">

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                    {edu.school === 'Boston University' ? (
                      <PiDogBold className="w-5 h-5 sm:w-6 sm:h-6 text-red-700" />
                    ) : (
                      <Turtle className="w-5 h-5 sm:w-6 sm:h-6 text-red-700" />
                    )}
                    <h3 className="font-sora text-xl sm:text-2xl md:text-3xl font-bold text-white">
                      {edu.school} <span className="text-white/40 font-normal">| {edu.location}</span>
                    </h3>
                  </div>

                  <p className={`font-mono text-sm sm:text-base text-cream font-medium ${edu.coursework ? 'mb-4 sm:mb-2' : ''}`}>
                    {edu.degree}
                  </p>

                  {/* Coursework Block */}
                  {edu.coursework && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="w-4 h-4 text-teal" />
                        <span className="font-mono text-xs font-bold text-cyan-light uppercase tracking-wider">
                          Relevant Coursework:
                        </span>
                      </div>

                      <p className="font-inter text-xs sm:text-sm text-cream-soft leading-relaxed">
                        {edu.coursework.join(' | ')}
                      </p>
                    </div>
                  )}
                </div>

                {/* Graduation Year Badge */}
                <div className="lg:self-center shrink-0">
                  <div className="glass-panel p-4 sm:p-6 rounded text-center border border-cyan/30 bg-harbor/80 min-w-[140px] sm:min-w-[160px]">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-amber mx-auto mb-2" />
                    <div className="font-mono text-xs font-bold text-cyan-light uppercase tracking-widest">
                      {edu.graduated}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
