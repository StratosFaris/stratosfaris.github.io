import React, { useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { X, Printer, Download, Mail, MapPin, ExternalLink, CheckCircle } from 'lucide-react';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const { header, experiences, projects, skillCategories, education } = PORTFOLIO_DATA;

  const handlePrint = () => {
    window.print();
  };

  const titleCaseMonths = (period: string) =>
    period.replace(/[A-Za-z]+/g, (word) => word[0].toUpperCase() + word.slice(1).toLowerCase());

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200 print:contents">
      <div className="relative w-full max-w-4xl glass-panel rounded-lg border border-cyan/30 shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col print:contents">

        {/* Top Control Bar */}
        <div className="p-4 bg-harbor border-b border-white/10 flex items-center justify-between shrink-0 print:hidden">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-cyan font-bold uppercase">
              CURRICULUM VITAE • DREW J. GROSS
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded bg-harbor text-cyan border border-cyan/30 font-mono text-xs hover:bg-steel transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-cream-muted hover:text-white hover:bg-steel transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-8 sm:p-12 space-y-8 overflow-y-auto flex-1 bg-abyss text-cream print:bg-white print:text-black print:p-0 print:space-y-4 print:overflow-visible">

          {/* Header */}
          <div className="border-b border-white/10 pb-6 print:border-black print:pb-3">
            <h1 className="font-sora text-3xl font-bold text-white print:text-black mb-1">
              {header.name}
            </h1>
            <p className="font-mono text-sm text-cyan print:text-blue-700 font-semibold mb-3">
              {header.title} • Biomedical Systems Engineer
            </p>
            <div className="flex flex-wrap gap-4 font-mono text-xs text-cream-soft print:text-gray-700">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-ember" />
                {header.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-cyan" />
                {header.email}
              </span>
              <span>•</span>
              <span>GitHub: github.com/StratosFaris</span>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="font-sora text-sm font-bold text-cyan uppercase tracking-wider mb-2 print:text-blue-800">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="font-inter text-xs leading-relaxed text-cream-soft print:text-gray-800">
              {header.subhead}
            </p>
          </div>

          {/* Professional Experience */}
          <div>
            <h2 className="font-sora text-sm font-bold text-cyan uppercase tracking-wider mb-4 print:text-blue-800">
              EXPERIENCE
            </h2>

            <div className="space-y-6 print:space-y-3">
              {experiences.map((exp) => (
                <div key={exp.id} className="border-l-2 border-cyan/40 pl-4 space-y-2 print:break-inside-avoid">
                  <div className="flex justify-between items-baseline flex-wrap">
                    <h3 className="font-sora text-base font-bold text-white print:text-black">
                      {exp.title} {exp.role ? `— ${exp.role}` : ''}
                    </h3>
                    <span className="font-mono text-xs text-ember print:text-gray-600">
                      {exp.location} | {titleCaseMonths(exp.period)}
                    </span>
                  </div>

                  <p className="font-inter text-xs text-cream-soft print:text-gray-800">
                    {exp.summary}
                  </p>

                  {exp.bullets && (
                    <ul className="list-disc list-inside space-y-1 font-inter text-xs text-cream-soft print:text-gray-800">
                      {exp.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}

                  {exp.structuredSections && exp.structuredSections.length > 0 && (
                    <div className="space-y-3 mt-2 print:space-y-1.5 print:mt-1">
                      {exp.structuredSections.map((sec, sIdx) => (
                        <div key={sIdx} className="bg-harbor p-3 rounded text-xs print:bg-gray-100 print:text-black print:p-1.5 print:break-inside-avoid">
                          <span className="font-mono font-bold text-ember print:text-blue-900 block mb-1">
                            {sec.title}
                          </span>
                          <p className="text-cream-soft print:text-gray-800 mb-2">
                            {sec.description}
                          </p>
                          {sec.highlights && sec.highlights.length > 0 && (
                            <ul className="list-disc list-inside space-y-1 font-inter text-[11px] text-cream-soft print:text-gray-800">
                              {sec.highlights.map((h, hIdx) => (
                                <li key={hIdx}>{h}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {!exp.structuredSections && exp.riskManagement && (
                    <div className="mt-2 bg-harbor p-3 rounded text-xs print:bg-gray-100 print:text-black print:p-1.5 print:break-inside-avoid">
                      <span className="font-mono font-bold text-ember print:text-blue-900 block mb-1">
                        {exp.riskManagement.title}
                      </span>
                      <p className="text-cream-soft print:text-gray-800 mb-2">
                        {exp.riskManagement.description}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Projects & Research */}
          <div>
            <h2 className="font-sora text-sm font-bold text-cyan uppercase tracking-wider mb-4 print:text-blue-800">
              INSTRUMENTATION &amp; RESEARCH PROJECTS
            </h2>

            <div className="space-y-4 print:space-y-2">
              {projects.map((proj) => (
                <div key={proj.id} className="border-l-2 border-ember/40 pl-4 space-y-1 print:break-inside-avoid">
                  <div className="flex justify-between items-baseline flex-wrap">
                    <h3 className="font-sora text-sm font-bold text-white print:text-black">
                      {proj.title}
                    </h3>
                    <span className="font-mono text-xs text-ember print:text-gray-600">
                      {proj.institution} | {titleCaseMonths(proj.period)}
                    </span>
                  </div>
                  <p className="font-inter text-xs text-cream-soft print:text-gray-800">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h2 className="font-sora text-sm font-bold text-cyan uppercase tracking-wider mb-3 print:text-blue-800">
              TECHNICAL SKILLS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 print:gap-2 font-mono text-xs">
              {skillCategories.map((cat) => (
                <div key={cat.id} className="bg-harbor p-3 rounded print:bg-gray-100 print:text-black print:p-1.5 print:break-inside-avoid">
                  <span className="text-cyan font-bold block mb-1 print:text-blue-900">
                    {cat.name}
                  </span>
                  <div className="text-cream-soft print:text-gray-800">
                    {cat.skills.map((s) => s.name).join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="font-sora text-sm font-bold text-cyan uppercase tracking-wider mb-2 print:text-blue-800">
              EDUCATION
            </h2>
            <div className="flex flex-col gap-3 print:gap-1.5">
              {education.map((edu, index) => (
                <div key={index} className="flex justify-between items-start gap-4 font-mono text-xs">
                  <div className="flex-1 min-w-0">
                    <div>
                      <span className="font-bold text-white print:text-black">{edu.school}</span> — {edu.degree}
                    </div>
                    {edu.coursework && edu.coursework.length > 0 && (
                      <div className="text-cream-muted print:text-gray-600 mt-1">
                        {edu.coursework.join(', ')}.
                      </div>
                    )}
                  </div>
                  <span className="text-ember print:text-gray-600 shrink-0 whitespace-nowrap">{edu.graduated}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
