import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { Terminal, Wrench, X, ChartNoAxesGantt } from 'lucide-react';
import { BsFlask } from "react-icons/bs";

export const Skills: React.FC = () => {
  const { skillCategories } = PORTFOLIO_DATA;
  const [selectedSkill, setSelectedSkill] = useState<{ categoryName: string; iconName: string; name: string; level: number; details: string } | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!selectedSkill) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedSkill(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedSkill]);

  // Close the toast once the Technical Proficiencies section scrolls off screen,
  // since the toast is portaled and would otherwise float free of its section.
  useEffect(() => {
    if (!selectedSkill || !sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) setSelectedSkill(null);
      },
      { threshold: 0 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [selectedSkill]);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'flask':
        return <BsFlask className="w-4 h-4 text-amber" />;
      case 'code':
        return <ChartNoAxesGantt className="w-4 h-4 text-cyan-light" />;
      case 'settings':
        return <Wrench className="w-4 h-4 text-teal-light" />;
      default:
        return <BsFlask className="w-4 h-4 text-amber" />;
    }
  };

  const getCategoryTitleClass = (iconName: string) => {
    switch (iconName) {
      case 'flask':
        return 'text-amber';
      case 'code':
        return 'text-cyan-light';
      case 'settings':
        return 'text-teal-light';
      default:
        return 'text-amber';
    }
  };

  const getCategorySkillHoverClass = (iconName: string) => {
    switch (iconName) {
      case 'flask':
        return 'group-hover:text-amber';
      case 'code':
        return 'group-hover:text-cyan-light';
      case 'settings':
        return 'group-hover:text-teal-light';
      default:
        return 'group-hover:text-amber';
    }
  };

  return (
    <>
    <section id="skills" ref={sectionRef} className="py-14 sm:py-16 relative z-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded bg-harbor border border-ember/30 text-ember">
            <Terminal className="w-5 h-5" />
          </div>
          <h2 className="font-sora text-2xl md:text-3xl font-bold text-white tracking-tight">
            Technical Proficiencies
          </h2>
        </div>

        {/* 3 Column Grid Layout Preserved */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {skillCategories.map((cat) => (
            <div
              key={cat.id}
              className="glass-panel rounded-md p-4 sm:p-5 border border-white/10 flex flex-col justify-between"
            >
              <div>
                {/* Column Category Title with Icon */}
                <div className="flex items-center gap-2.5 min-w-0 pb-3 mb-3 border-b border-white/10">
                  {getCategoryIcon(cat.iconName)}
                  <h3 className={`font-mono text-xs font-bold ${getCategoryTitleClass(cat.iconName)} uppercase tracking-wider truncate`}>
                    {cat.name}
                  </h3>
                </div>

                {/* Skill Items Compact List */}
                <ul className="space-y-2 sm:space-y-1.5">
                  {cat.skills.map((skill) => (
                    <li
                      key={skill.name}
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelectedSkill({ categoryName: cat.name, iconName: cat.iconName, ...skill })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedSkill({ categoryName: cat.name, iconName: cat.iconName, ...skill });
                        }
                      }}
                      className="group cursor-pointer py-1.5 px-2.5 rounded hover:bg-steel/60 focus:bg-steel/60 focus:outline-none focus:border-white/20 transition-colors border border-transparent hover:border-white/10 flex flex-col gap-1"
                    >
                      <div className={`flex items-start justify-between text-xs font-inter font-medium text-cream ${getCategorySkillHoverClass(cat.iconName)} transition-colors gap-2`}>
                        <span className="break-words leading-tight">{skill.name}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>

    {/* Skill Detail Toast Modal — portaled to escape section stacking contexts */}
    {selectedSkill && createPortal(
      <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-50 glass-panel p-4 sm:p-5 rounded-md border border-cyan/40 shadow-2xl animate-in fade-in slide-in-from-bottom-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <span className={`font-mono text-[10px] uppercase ${getCategoryTitleClass(selectedSkill.iconName)}`}>
              {selectedSkill.categoryName}
            </span>
            <h4 className="font-sora text-base sm:text-lg font-bold text-white">
              {selectedSkill.name}
            </h4>
          </div>
          <button
            onClick={() => setSelectedSkill(null)}
            aria-label="Close skill details"
            className="text-cream-muted hover:text-white p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="font-inter text-xs text-cream-soft leading-relaxed">
          {selectedSkill.details}
        </p>
      </div>,
      document.body
    )}
    </>
  );
};
