import React, { useEffect, useState } from 'react';
import { ProjectItem } from '../data/portfolio';
import { X, Code2, Activity, Sliders, CheckCircle, ChevronRight, Terminal, ShieldAlert, Microscope, CheckCircle2, Maximize2, ZoomIn, Cpu } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Simulator state for SPRi / Basilar Probe
  const [bacterialConcentration, setBacterialConcentration] = useState<number>(500); // CFU/mL
  const [acousticFrequency, setAcousticFrequency] = useState<number>(4000); // Hz
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (isLightboxOpen) {
        setIsLightboxOpen(false);
      } else {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project, isLightboxOpen, onClose]);

  if (!project) return null;

  // Compute SPRi refractive index shift delta
  const spriDeltaN = (0.0000142 * (1 + Math.log10(bacterialConcentration / 10))).toFixed(6);
  const spriSepsisRisk = bacterialConcentration > 200 ? "CRITICAL SEPSIS ELEVATION" : "NORMAL BASELINE";

  // Compute Basilar Displacement in Ångströms
  const basilarDisplacement = (0.12 * Math.sin(acousticFrequency / 500) + 1.25).toFixed(2);

  // Title + tags block, reused either above the image grid or, for compact
  // right-column content (e.g. the scalpel spec grid), inline next to the image
  const titleHeader = (
    <div>
      <h2 className="font-sora text-2xl sm:text-3xl font-bold text-white mb-2">
        {project.title}
      </h2>
      <div className="flex flex-wrap gap-2 my-3">
        {project.tags.map((tag, idx) => (
          <span
            key={idx}
            className="font-mono text-[11px] text-cyan-light bg-steel px-2.5 py-0.5 rounded-sm border border-white/10"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl glass-panel rounded-lg border border-cyan/30 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">

        {/* Modal Top Bar */}
        <div className="p-6 bg-harbor border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-cyan bg-cyan/10 px-2.5 py-1 rounded border border-cyan/30">
              {project.institution}
            </span>
            <span className="font-mono text-xs text-ember bg-harbor px-2.5 py-1 rounded border border-ember/30">
              {project.period}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-cream-muted hover:text-white hover:bg-steel transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto flex-1">

          {/* Title Header (moved into the right column for proj-03, whose spec grid is short, to keep it beside the tall image instead of leaving space below) */}
          {project.id !== "proj-03" && titleHeader}

          {/* Two-Column Grid: Vertical Image on Left, Interactive Vibration Tool / Simulator & Details on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* LEFT COLUMN: Vertical Image Viewer */}
            {project.image && (
              <div className="lg:col-span-5 relative rounded-lg overflow-hidden border border-cyan/30 bg-abyss shadow-2xl flex flex-col group/modalimg min-h-[420px]">
                {/* Top HUD Frame Header */}
                <div className="bg-harbor/90 backdrop-blur-md px-3.5 py-2 border-b border-white/10 flex items-center justify-between font-mono text-[11px]">
                  <span className="text-cyan flex items-center gap-1.5 font-bold">
                    <Microscope className="w-3.5 h-3.5 text-ember" />
                    <span>OPTICAL SPEC CAPTURE</span>
                  </span>
                  <button
                    onClick={() => setIsLightboxOpen(true)}
                    className="text-ember hover:text-white bg-ember/10 hover:bg-ember/20 px-2.5 py-0.5 rounded border border-ember/30 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <ZoomIn className="w-3 h-3" />
                    <span>INSPECT</span>
                  </button>
                </div>

                {/* Main Reframed Image Display Chamber */}
                <div 
                  onClick={() => setIsLightboxOpen(true)}
                  className="relative flex-1 flex items-center justify-center p-2 cursor-pointer overflow-hidden bg-tech-grid min-h-[360px]"
                >
                  {/* Ambient Blurred Background Fill */}
                  <img
                    src={project.image}
                    alt=""
                    aria-hidden="true"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 scale-125 pointer-events-none"
                  />

                  {/* Corner Crosshair Markings */}
                  <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-cyan z-20 pointer-events-none" />
                  <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-cyan z-20 pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-cyan z-20 pointer-events-none" />
                  

                  {/* Primary Uncropped Optical Image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="relative z-10 max-h-[400px] lg:max-h-[480px] max-w-full object-contain rounded drop-shadow-2xl group-hover/modalimg:scale-[1.02] transition-transform duration-300"
                  />

                  {/* Click to expand hover hint overlay */}
                  <div className="absolute inset-0 z-20 bg-abyss/40 opacity-0 group-hover/modalimg:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="font-mono text-[11px] text-white bg-abyss/90 px-3 py-1.5 rounded border border-cyan flex items-center gap-1.5 shadow-2xl">
                      <Maximize2 className="w-3.5 h-3.5 text-cyan" />
                      <span>FULLSCREEN VIEW</span>
                    </span>
                  </div>
                </div>

                {/* Bottom Telemetry Bar */}
                <div className="bg-harbor/90 backdrop-blur-md px-3.5 py-1.5 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-cream-muted">
                  <span>RIG ID: {project.id.toUpperCase()}</span>
                  <span className="text-ember">UNCOMPRESSED CAPTURE</span>
                </div>
              </div>
            )}

            {/* RIGHT COLUMN: Description + Interactive Vibration Tool / Simulators */}
            <div className={`${project.image ? 'lg:col-span-7' : 'lg:col-span-12'} flex flex-col justify-between space-y-4`}>
              {project.id === "proj-03" ? (
                <div className="space-y-3">
                  {titleHeader}
                  <p className="font-inter text-sm sm:text-base text-cream-soft leading-relaxed mt-10">
                    {project.description}
                  </p>
                </div>
              ) : (
                <p className="font-inter text-sm sm:text-base text-cream-soft leading-relaxed">
                  {project.description}
                </p>
              )}

              {/* Interactive Vibration Tool for proj-01 */}
              {project.id === "proj-01" && (
                <div className="bg-harbor p-5 rounded-lg border border-amber/40 shadow-inner space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-amber animate-pulse" />
                      <h3 className="font-mono text-xs font-bold text-amber uppercase tracking-wider">
                        Interactive Basilar Vibration Tool
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] text-teal-light bg-teal-light/10 px-2 py-0.5 rounded border border-teal-light/30">
                      OPTICAL RESOLVER
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between font-mono text-xs text-cream-soft mb-1.5">
                        <span>Acoustic Frequency:</span>
                        <span className="text-cyan-light font-bold">{acousticFrequency} Hz</span>
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
                        <span>100 Hz</span>
                        <span>20,000 Hz</span>
                      </div>
                    </div>

                    <div className="bg-harbor p-3 rounded border border-white/10 grid grid-cols-2 gap-2 font-mono text-xs">
                      <div>
                        <span className="text-cream-muted block text-[10px]">DISPLACEMENT</span>
                        <span className="text-cyan-light font-bold text-sm">{basilarDisplacement} Å</span>
                      </div>
                      <div>
                        <span className="text-cream-muted block text-[10px]">SENSOR STATE</span>
                        <span className="text-cyan-light font-bold text-[11px]">CLOSED-LOOP ACTIVE</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Interactive SPRi Simulator for proj-02 */}
              {project.id === "proj-02" && (
                <div className="bg-harbor p-5 rounded-lg border border-amber/40 shadow-inner space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div className="flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-amber" />
                      <h3 className="font-mono text-xs font-bold text-amber uppercase tracking-wider">
                        Interactive SPRi Refractive Index Simulator
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] text-teal-light bg-teal-light/10 px-2 py-0.5 rounded">
                      SPRi-2021-BU
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between font-mono text-xs text-cream-soft mb-1.5">
                        <span>Bacterial Load:</span>
                        <span className="text-cyan-light font-bold">{bacterialConcentration} CFU/mL</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="5000"
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

                    <div className="bg-harbor p-3 rounded border border-white/10 grid grid-cols-2 gap-2 font-mono text-xs">
                      <div>
                        <span className="text-cream-muted block text-[10px]">REFRACTIVE SHIFT (Δn)</span>
                        <span className="text-cyan-light font-bold text-xs">{spriDeltaN} RIU</span>
                      </div>
                      <div>
                        <span className="text-cream-muted block text-[10px]">DIAGNOSTIC TRIAGE</span>
                        <span className={`font-bold text-[11px] ${bacterialConcentration > 200 ? 'text-red-600' : 'text-cyan-light'}`}>
                          {spriSepsisRisk}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Hardware Spec Parameters Grid for Motorized Scalpel (proj-03) */}
              {project.id === "proj-03" && (
                <div className="bg-harbor p-4 rounded-lg border border-amber/40 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-amber" />
                      <h3 className="font-mono text-xs font-bold text-amber uppercase tracking-wider">
                        Hardware &amp; Motion Control Specs
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] text-teal-light bg-teal-light/10 px-2 py-0.5 rounded border border-teal-light/30">
                      MATLAB 2D GANTRY
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
                    <div className="bg-harbor p-2.5 rounded border border-white/5">
                      <span className="text-cream-muted block text-[10px] uppercase">Gantry Type</span>
                      <span className="text-white font-bold">2D Planar Motorized</span>
                    </div>
                    <div className="bg-harbor p-2.5 rounded border border-white/5">
                      <span className="text-cream-muted block text-[10px] uppercase">Trajectory Engine</span>
                      <span className="text-cyan-light font-bold">MATLAB Kinematics</span>
                    </div>
                    <div className="bg-harbor p-2.5 rounded border border-white/5">
                      <span className="text-cream-muted block text-[10px] uppercase">Rotation Control</span>
                      <span className="text-cyan-light font-bold">Autonomous Blade Rig</span>
                    </div>
                    <div className="bg-harbor p-2.5 rounded border border-white/5">
                      <span className="text-cream-muted block text-[10px] uppercase">Geometry Mapping</span>
                      <span className="text-white font-bold">User-Defined Curves</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Structured Experience / Engineering Sections if present */}
          {project.structuredSections && project.structuredSections.length > 0 && (
            <div className="space-y-6">
              {project.structuredSections.map((sec, idx) => (
                <div key={idx} className="bg-harbor p-6 rounded-md border border-cyan/30 space-y-3">
                  <div className="flex items-center gap-2.5">
                    {sec.title.toLowerCase().includes('risk') ? (
                      <ShieldAlert className="w-5 h-5 text-ember" />
                    ) : (
                      <Microscope className="w-5 h-5 text-cyan" />
                    )}
                    <h3 className="font-sora text-lg font-bold text-white">
                      {sec.title}
                    </h3>
                  </div>

                  <p className="font-inter text-xs text-cream-soft leading-relaxed">
                    {sec.description}
                  </p>

                  <ul className="space-y-2 pt-2">
                    {sec.highlights.map((item, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2 text-xs font-inter text-cream">
                        <CheckCircle2 className="w-4 h-4 text-amber shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Technical Details / Highlights if present */}
          {project.technicalDetails && project.technicalDetails.length > 0 && (
            <div className="bg-harbor p-6 rounded-md border border-cyan/30 space-y-3">
              <div className="flex items-center gap-2.5">
                <Microscope className="w-5 h-5 text-cyan" />
                <h3 className="font-sora text-lg font-bold text-white">
                  Technical Focus &amp; Accomplishments
                </h3>
              </div>
              <ul className="space-y-2 pt-2">
                {project.technicalDetails.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs font-inter text-cream">
                    <CheckCircle2 className="w-4 h-4 text-ember shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Project Detailed Specifications Grid */}
          {project.details && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-harbor p-4 rounded border border-white/10">
                <span className="font-mono text-[10px] text-cyan uppercase block mb-1">OBJECTIVE</span>
                <p className="font-inter text-xs text-cream">{project.details.objective}</p>
              </div>
              <div className="bg-harbor p-4 rounded border border-white/10">
                <span className="font-mono text-[10px] text-ember uppercase block mb-1">METHODOLOGY</span>
                <p className="font-inter text-xs text-cream">{project.details.methodology}</p>
              </div>
              <div className="bg-harbor p-4 rounded border border-white/10">
                <span className="font-mono text-[10px] text-amber uppercase block mb-1">OUTCOMES</span>
                <p className="font-inter text-xs text-cream">{project.details.outcomes}</p>
              </div>
            </div>
          )}

          
          {/* Telemetry Metrics */}
          {project.details?.telemetryData && (
            <div className="grid grid-cols-3 gap-4 bg-harbor p-4 rounded border border-white/10 text-center font-mono">
              {project.details.telemetryData.map((item, idx) => (
                <div key={idx}>
                  <div className="text-[10px] text-cream-muted uppercase mb-1">{item.label}</div>
                  <div className="text-sm font-bold text-cyan-light">{item.value}</div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-harbor border-t border-white/10 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded bg-cyan text-cyan-black font-mono text-xs font-bold uppercase hover:bg-cyan-light transition-colors cursor-pointer"
          >
            CLOSE DOSSIER
          </button>
        </div>

      </div>

      {/* Fullscreen High-Resolution Image Lightbox */}
      {isLightboxOpen && project.image && (
        <div 
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-8 animate-in fade-in duration-200 cursor-zoom-out"
        >
          {/* Lightbox Header Bar */}
          <div className="w-full max-w-6xl flex items-center justify-between font-mono text-xs text-cyan bg-harbor/90 px-4 py-3 rounded border border-cyan/30 shadow-2xl z-10">
            <div className="flex items-center gap-3">
              <span className="font-bold text-white text-sm sm:text-base">{project.title}</span>
              <span className="hidden sm:inline-block text-ember bg-ember/10 px-2.5 py-0.5 rounded border border-ember/30">
                FULL UNCOMPRESSED OPTICAL CAPTURE
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLightboxOpen(false);
              }}
              className="p-2 rounded-full bg-harbor text-white hover:bg-cyan hover:text-cyan-black transition-colors cursor-pointer flex items-center gap-1 font-mono text-xs"
            >
              <X className="w-5 h-5" />
              <span className="hidden sm:inline">CLOSE INSPECTOR</span>
            </button>
          </div>

          {/* Centered High-Res Image Display */}
          <div className="relative flex-1 w-full max-w-6xl flex items-center justify-center p-2 sm:p-6 my-2">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="max-h-[82vh] max-w-full object-contain rounded-md shadow-2xl border border-white/20"
            />
          </div>

          {/* Lightbox Footer Navigation */}
          <div className="w-full max-w-6xl flex items-center justify-between font-mono text-[11px] text-cream-muted bg-harbor/80 px-4 py-2 rounded border border-white/10 z-10">
            <span>INSTITUTION: {project.institution} ({project.period})</span>
            <span className="text-ember">CLICK ANYWHERE TO EXIT</span>
          </div>
        </div>
      )}
    </div>
  );
};
