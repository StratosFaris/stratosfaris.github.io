import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { ArrowDownRight, Download, Activity, MapPin } from 'lucide-react';

interface HeroProps {
  onOpenCv: () => void;
  onOpenProjects: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCv, onOpenProjects }) => {
  const { header } = PORTFOLIO_DATA;

  return (
    <section className="relative pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden">
      {/* Background Radial Light Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-teal/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* System Status Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-harbor/90 border border-amber/30 text-amber font-mono text-[11px] tracking-widest uppercase mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span>{header.status}</span>
            </div>

            {/* Headline */}
            <h1 className="font-sora text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-white tracking-tight mb-6">
             <span className="text-cyan">Engineering </span>{' '}
              a{<br />}
              <span className="text-amber">Healthier Future</span>
            </h1>

            {/* Subhead Description */}
            <p className="font-inter text-base sm:text-lg text-cream-soft leading-relaxed max-w-2xl mb-10 font-normal">
              {header.subhead}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <a
                href="#projects"
                onClick={onOpenProjects}
                className="px-6 py-3.5 rounded-sm bg-cyan text-cyan-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-cyan-light transition-all flex items-center gap-2 cursor-pointer group"
              >
                <span>VIEW PROJECTS</span>
                <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <button
                onClick={onOpenCv}
                className="px-6 py-3.5 rounded-sm bg-harbor text-cream border border-white/15 font-mono text-xs font-bold uppercase tracking-wider hover:bg-steel hover:border-cyan/50 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-cyan" />
                <span>DOWNLOAD CV</span>
              </button>
            </div>

            {/* Technical Serial Telemetry Readout */}
            <div className="flex items-center gap-6 font-mono text-xs text-cream-muted tracking-widest pt-4 border-t border-white/10 w-full max-w-md">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-ember" aria-hidden="true" />
                  <span>LOC: RTP-NC</span>
                </div>
              
            </div>

          </div>

          {/* Right Hero Image Column */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md group">
              {/* Decorative Corner Framing Crosshairs */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-cyan z-20 pointer-events-none" />
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-cyan z-20 pointer-events-none" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-cyan z-20 pointer-events-none" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-cyan z-20 pointer-events-none" />

              {/* Glowing back panel */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan/20 to-teal/20 rounded-md blur-xl group-hover:blur-2xl transition-all opacity-70 pointer-events-none" />

              {/* Main Image Frame */}
              <div className="relative glass-panel rounded-md overflow-hidden border border-cyan/30 p-2 shadow-2xl">
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-harbor group/img">
                  {/* Blurred background fill for depth */}
                  <img
                    src={header.portraitImage}
                    alt=""
                    aria-hidden="true"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover blur-md opacity-30 scale-110 pointer-events-none"
                  />
                  <img
                    src={header.portraitImage}
                    alt="Drew J. Gross - Biomedical Systems Engineer"
                    referrerPolicy="no-referrer"
                    className="relative z-10 w-full h-full object-cover object-top contrast-105 group-hover/img:scale-105 transition-all duration-700"
                  />
                  {/* High-tech gradient overlay */}
                  <div className="absolute inset-0 z-20 bg-gradient-to-t from-abyss via-transparent to-transparent opacity-70 pointer-events-none" />
                    
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
