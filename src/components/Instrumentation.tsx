import React, { useState } from 'react';
import { PORTFOLIO_DATA, ProjectItem } from '../data/portfolio';
import { Cpu, ExternalLink, Activity, Sliders, Gauge } from 'lucide-react';

interface InstrumentationProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const Instrumentation: React.FC<InstrumentationProps> = ({ onSelectProject }) => {
  const { projects } = PORTFOLIO_DATA;

  // State for main page interactive tools
  const [acousticFrequency, setAcousticFrequency] = useState<number>(4000); // Hz for Basilar Probe
  const [bacterialConcentration, setBacterialConcentration] = useState<number>(500); // CFU/mL for SPRi
  const [slicingSpeed, setSlicingSpeed] = useState<number>(12); // mm/s for Scalpel

  // Basilar displacement in Ångströms
  const basilarDisplacement = (0.12 * Math.sin(acousticFrequency / 500) + 1.25).toFixed(2);

  // SPRi refractive index shift
  const spriDeltaN = (0.0000142 * (1 + Math.log10(bacterialConcentration / 10))).toFixed(6);
  const spriSepsisRisk = bacterialConcentration > 200 ? "CRITICAL SEPSIS ELEVATION" : "NORMAL BASELINE";

  return (
    <section id="projects" className="py-16 sm:py-20 relative">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12">
          <div className="p-2.5 rounded bg-harbor border border-ember/30 text-ember">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-sora text-3xl md:text-4xl font-bold text-white tracking-tight">
              Instrumentation Development
            </h2>
            <p className="font-mono text-xs text-cyan mt-1">
              OPTICAL RIGS • MICROFLUIDICS • OPTOMECHANICS • CLOSED-LOOP CONTROL
            </p>
          </div>
        </div>

        {/* Stack of Project Cards with Vertical Images on the Left */}
        <div className="space-y-8">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="glass-panel-interactive rounded-lg overflow-hidden border border-cyan/15 flex flex-col lg:flex-row group transition-all duration-300 hover:border-cyan/40 shadow-xl"
            >
              {/* LEFT COLUMN: Vertical Project Image Container */}
              {proj.image && (
                <div 
                  onClick={() => onSelectProject(proj)}
                  className="relative lg:w-64 xl:w-72 min-h-[360px] lg:min-h-[460px] bg-abyss overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col items-center justify-center p-2 shrink-0 group/img cursor-pointer"
                >
                  {/* Ambient Blurred Background Fill */}
                  <img
                    src={proj.image}
                    alt=""
                    aria-hidden="true"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-35 scale-125 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-tech-grid opacity-25 pointer-events-none" />
                  
                  {/* Vertical Reticle HUD markings */}
                  <div className="absolute top-3 left-3 z-30 font-mono text-[9px] leading-none text-teal-light/80 font-bold pointer-events-none flex items-center justify-center gap-1 bg-abyss/80 backdrop-blur-md px-2 py-1.5 rounded border border-white/10 text-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
                    <span>RIG: {proj.id.toUpperCase()}</span>
                  </div>
                  <div className="absolute top-3 right-3 z-30 font-mono text-[9px] leading-none text-ember/80 font-bold pointer-events-none bg-abyss/80 backdrop-blur-md px-2 py-1.5 rounded border border-white/10 flex items-center justify-center text-center">
                    [ SURGICAL RIG ]
                  </div>

                  {/* Centered Uncropped Vertical Image */}
                  <img
                    src={proj.image}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="relative z-10 max-h-[350px] lg:max-h-[440px] w-auto max-w-full object-contain rounded drop-shadow-2xl group-hover/img:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 z-20 bg-gradient-to-t from-abyss via-transparent to-transparent opacity-60 pointer-events-none" />

                  {/* Bottom Badges Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 z-30 flex items-center justify-between font-mono text-[10px]">
                    <span className="text-cyan bg-abyss/95 backdrop-blur-md px-2.5 py-1 rounded border border-cyan/30 font-bold">
                      {proj.institution}
                    </span>
                    <span className="text-ember bg-abyss/95 backdrop-blur-md px-2.5 py-1 rounded border border-ember/30">
                      {proj.period}
                    </span>
                  </div>
                </div>
              )}

              {/* RIGHT COLUMN: Project Details & Interactive Tools */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  {/* Card Title Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                    <h3 
                      onClick={() => onSelectProject(proj)}
                      className="font-sora text-2xl font-bold text-white group-hover:text-cyan transition-colors cursor-pointer flex items-center gap-2"
                    >
                      <span>{proj.title}</span>
                      <ExternalLink className="w-4 h-4 text-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>

                    <button
                      onClick={() => onSelectProject(proj)}
                      className="font-mono text-xs text-cyan hover:text-white bg-cyan/10 hover:bg-cyan/20 px-3 py-1.5 rounded border border-cyan/30 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <span>VIEW SPECS</span>
                      <span>→</span>
                    </button>
                  </div>

                  <p className="font-inter text-sm text-cream-soft leading-relaxed mb-5">
                    {proj.description}
                  </p>
                </div>

                {/* --- INTERACTIVE TOOLS POSITIONED DIRECTLY TO THE RIGHT OF IMAGE --- */}
                
                {/* 1. AUTOMATED BASILAR PROBE: Interactive Vibration Tool */}
                {proj.id === "proj-01" && (
                  <div className="bg-harbor p-5 rounded-lg border border-amber/40 shadow-inner space-y-4">
                    <div className="flex items-center justify-between border-b border-amber/10 pb-2.5">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-amber animate-pulse" />
                        <h4 className="font-mono text-xs font-bold text-amber uppercase tracking-wider">
                          Interactive Basilar Membrane Vibration Tool Demonstration
                        </h4>
                      </div>
                      <span className="font-mono text-[10px] text-teal-light bg-teal-light/10 px-2 py-0.5 rounded border border-teal-light/30">
                        OPTICAL RESOLVER: 0.12 Å
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                      <div>
                        <div className="flex items-center justify-between font-mono text-xs text-cream-soft mb-1.5">
                          <span>Acoustic Stress Frequency:</span>
                          <span className="text-cyan-light font-bold text-sm">{acousticFrequency} Hz</span>
                        </div>
                        <input
                          type="range"
                          min="100"
                          max="20000"
                          step="100"
                          value={acousticFrequency}
                          onChange={(e) => setAcousticFrequency(Number(e.target.value))}
                          className="w-full accent-cyan-light cursor-pointer"
                        />
                        <div className="flex justify-between font-mono text-[10px] text-cream-muted mt-1">
                          <span>100 Hz (Infrasonic)</span>
                          <span>20,000 Hz (Ultrasonic)</span>
                        </div>
                      </div>

                      <div className="bg-harbor p-3.5 rounded border border-white/10 space-y-2 font-mono text-xs">
                        <div className="flex justify-between items-center text-cream-soft">
                          <span>Measured Displacement:</span>
                          <span className="text-cyan-light font-bold text-sm bg-cyan-light/10 px-2 py-0.5 rounded border border-cyan-light/20">
                            {basilarDisplacement} Å
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-cream-soft">
                          <span>Optomechanical Feedback:</span>
                          <span className="text-cyan-light font-bold text-[11px] flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                            <span>CLOSED-LOOP ACTIVE</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. SPRI BACTERIAL CHIP: Interactive Refractive Index Simulator */}
                {proj.id === "proj-02" && (
                  <div className="bg-harbor p-5 rounded-lg border border-amber/40 shadow-inner space-y-4">
                    <div className="flex items-center justify-between border-b border-amber/10 pb-2.5">
                      <div className="flex items-center gap-2">
                        <Sliders className="w-4 h-4 text-amber" />
                        <h4 className="font-mono text-xs font-bold text-amber uppercase tracking-wider">
                          Interactive SPRi Refractive Index Demonstration
                        </h4>
                      </div>
                      <span className="font-mono text-[10px] text-teal-light bg-teal-light/10 px-2 py-0.5 rounded border border-teal-light/30">
                        SPRi BIOCHIP-2021
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                      <div>
                        <div className="flex items-center justify-between font-mono text-xs text-cream-soft mb-1.5">
                          <span>Bacterial Concentration:</span>
                          <span className="text-cyan-light font-bold text-sm">{bacterialConcentration} CFU/mL</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="1000"
                          step="10"
                          value={bacterialConcentration}
                          onChange={(e) => setBacterialConcentration(Number(e.target.value))}
                          className="w-full accent-cyan-light cursor-pointer"
                        />
                        <div className="flex justify-between font-mono text-[10px] text-cream-muted mt-1">
                          <span>10 CFU/mL</span>
                          <span>5,000 CFU/mL</span>
                        </div>
                      </div>

                      <div className="bg-harbor p-3.5 rounded border border-white/10 space-y-2 font-mono text-xs">
                        <div className="flex justify-between items-center text-cream-soft">
                          <span>Refractive Index Delta (Δn):</span>
                          <span className="text-cyan-light font-bold text-sm bg-cyan-light/10 px-2 py-0.5 rounded border border-cyan-light/20">
                            {spriDeltaN} RIU
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-cream-soft">
                          <span>Triage Diagnostic State:</span>
                          <span className={`font-bold text-[11px] ${bacterialConcentration > 200 ? 'text-red-600' : 'text-cyan-light'}`}>
                            {spriSepsisRisk}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. MOTORIZED SCALPEL: Technical Specification Highlights Grid (No Interactive Element) */}
                {proj.id === "proj-03" && (
                  <div className="bg-harbor p-4 sm:p-5 rounded-lg border border-amber/40 shadow-inner">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-amber" />
                        <h4 className="font-mono text-xs font-bold text-amber uppercase tracking-wider">
                          Hardware &amp; Kinematic Performance Parameters
                        </h4>
                      </div>
                      <span className="font-mono text-[10px] text-teal-light bg-teal-light/10 px-2 py-0.5 rounded border border-teal-light/30">
                        MATLAB AUTONOMOUS CONTROL
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
                      <div className="bg-harbor p-3 rounded border border-white/5">
                        <span className="text-cream-muted block text-[10px] uppercase">Gantry Axis</span>
                        <span className="text-white font-bold">2D Planar</span>
                      </div>
                      <div className="bg-harbor p-3 rounded border border-white/5">
                        <span className="text-cream-muted block text-[10px] uppercase">Motion Control</span>
                        <span className="text-cyan-light font-bold">MATLAB Trajectory</span>
                      </div>
                      <div className="bg-harbor p-3 rounded border border-white/5">
                        <span className="text-cream-muted block text-[10px] uppercase">Actuation</span>
                        <span className="text-cyan-light font-bold">High-Torque Motor</span>
                      </div>
                      <div className="bg-harbor p-3 rounded border border-white/5">
                        <span className="text-cream-muted block text-[10px] uppercase">Slicing Geometry</span>
                        <span className="text-white font-bold">Custom Curves</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer Tags & Telemetry Trigger */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {proj.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="font-mono text-[11px] text-cyan-light bg-steel px-2.5 py-1 rounded-sm border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div 
                    onClick={() => onSelectProject(proj)}
                    className="font-mono text-xs text-cyan cursor-pointer hover:underline flex items-center gap-1.5"
                  >
                    <Gauge className="w-3.5 h-3.5" />
                    <span>INSPECT</span>
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
