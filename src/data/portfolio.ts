export interface ExperienceSection {
  title: string;
  description: string;
  highlights: string[];
}

export interface ExperienceItem {
  id: string;
  serialId?: string;
  title: string;
  company?: string;
  role?: string;
  location: string;
  period: string;
  badge?: string;
  summary: string;
  bullets?: string[];
  structuredSections?: ExperienceSection[];
  riskManagement?: ExperienceSection;
  technicalDetails?: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  institution: string;
  period: string;
  image?: string;
  description: string;
  tags: string[];
  structuredSections?: ExperienceSection[];
  technicalDetails?: string[];
  details?: {
    objective: string;
    methodology: string;
    outcomes: string;
    codeSnippet?: string;
    telemetryData?: { label: string; value: string }[];
  };
}

export interface SkillCategory {
  id: string;
  name: string;
  iconName: 'flask' | 'code' | 'settings';
  skills: { name: string; level: number; details: string }[];
}

export const PORTFOLIO_DATA = {
  header: {
    name: "Drew J. Gross",
    status: "SYSTEM STATUS: ONLINE",
    title: "Systems Engineer Associate",
    headline: "Engineering a Healthier Future",
    subhead: "Biomedical engineer with two years of design validation and product risk management experience on regulated diagnostic instrumentation. Background spans thermal characterization, root cause analysis, and IVDR-aligned risk documentation, with hands-on signal acquisition instrumentation prototyping.",
    location: "LOC: UNKNOWN",
    portraitImage: "/src/assets/images/pier.png",
    email: "drewjgross13@gmail.com",
    github: "https://github.com/StratosFaris",
    linkedin: "https://linkedin.com/in/drewjgross",
  },
  
  experiences: [
    {
      id: "exp-01",
      serialId: "ID-PD-01",
      title: "Professional Development & Continuing Education",
      location: "Raleigh, NC",
      period: "OCT 2024 - PRESENT",
      summary: "Broadened technical and product development breadth by reverse engineering an open-source potentiostat, completing a specialization in product ideation, and pursuing NCEES PE licensure.",
      technicalDetails: [
        "Analyzed operational amplifier topology for high-impedance electrochemical micro-sensor signal conditioning.",
        "Built analog-to-digital converter (ADC) filtering algorithms for real-time cyclic voltammetry plotting.",
        "Synthesized core competencies across medical device software validation, FDA 21 CFR Part 820 quality systems, and NCEES Principles and Practice of Engineering requirements."
      ]
    },
    {
      id: "exp-02",
      serialId: "ID-RCH-01",
      title: "Roche Tissue Diagnostics",
      role: "Systems Engineer Associate",
      location: "Tucson, AZ",
      period: "OCT 2022 - OCT 2024",
      summary: "Led system-level verification, risk management, and metrology development for automated IHC/ISH tissue staining instruments.",
      structuredSections: [
        {
          title: "Benchmark Staining Design Validation",
          description: "Led system-level verification, risk management, and metrology development for automated IHC/ISH tissue staining instruments.",
          highlights: [
            "Designed and executed onboard slide-heater characterization study for supplier qualification using a custom metrology apparatus to evaluate spatial thermal uniformity and proprietary software-controlled repeatability.",
            "Identified an inbuilt electromagnetic induction artifact, isolating causality to unexpected stainer shutdowns.",
            "Performed component-level audit via partial disassembly of 15 staining instruments, verifying configuration accuracy against the BOM during preventive maintenance, assuring operational reliability."
          ]
        },
        {
          title: "Product Risk Management",
          description: "Conducted systematic failure mode analysis across automated IHC, ISH, and special stain instrument platforms, mapping root causes of diagnostic errors, false results, and personal safety risks.",
          highlights: [
            "Collaborated with chemistry teams and instrument manufacturers on implementing available design and process mitigation to reduce downstream risk of false diagnostic results that directly inform patient treatment.",
            "Designed and deployed an automated intake and triage workflow tool that classified and routed incoming requests by priority, improving team throughput and reducing response latency on high-priority items.",
            "Compiled 200+ technical risk dossiers aligned with EU IVDR standards for market authorization.",
            "Received 5 Roche Spot Awards recognizing critical contributions on high-priority V&V and risk initiatives."
          ]
        }
      ]
    }
  ] as ExperienceItem[],

  projects: [
    {
      id: "proj-01",
      title: "Automated Basilar Probe",
      institution: "BOSTON UNIVERSITY",
      period: "SEP 2021 - MAY 2022",
      image: "/src/assets/images/probe.png",
      description: "Investigated the relationship between cetacean spatial navigation and anthropogenic interference. Fabricated a fiber optic cantilever probe for in vitro measurement of respondent vibrational frequencies along the basilar membrane. Aligned via an aus JENA OPM 212F surgical operating microscope and precision micromanipulators on a leveled vibration-isolation optical bench. Restored an Angstrom-resolution optical resolver for conversion of optomechanical displacement to voltage, with custom Python closed-loop feedback course-correction.",
      tags: ["Fiber Optics", "OPM 212F Microscope", "Micromanipulators", "Optomechanics", "MATLAB & Python"],
      details: {
        objective: "Quantify cellular vibrational resonance along the mammalian cochlear basilar membrane under high-frequency acoustic stress.",
        methodology: "Interfaced an aus JENA OPM 212F stereoscopic operating microscope for sub-millimeter visual targeting. Mounted a fiber optic cantilever displacement sensor on multi-axis micrometer positioners atop a spirit-leveled optical bench, coupling gold SMA coaxial transducers to real-time Python spectral decomposition algorithms.",
        outcomes: "Operated the dual-channel resolver's photodiode preamp (-10 to 60 dB gain) and signal amplifier (×1-500 V/V gain) stages with active closed-loop drift compensation, within a 0.75 Hz-150 Hz filtered passband and a ±5V pp output ceiling.",
        codeSnippet: `# MATLAB - Python Closed-Loop Resonance Feedback
import numpy as np
import scipy.signal as signal

def compute_membrane_resonance(disp_voltage, fs=100000, v_to_angstrom=CALIBRATED_PROBE_FACTOR):
    f, psd = signal.welch(disp_voltage, fs=fs, nperseg=4096)
    peak_freq = f[np.argmax(psd)]
    displacement_angstroms = np.max(disp_voltage) * v_to_angstrom
    return {"resonance_hz": peak_freq, "disp_angstrom": displacement_angstroms}`,
        telemetryData: [
          { label: "Sensor Gain Range (A1)", value: "-10 to 60 dB" },
          { label: "Signal Gain Range (A2)", value: "×1-500 V/V" },
          { label: "Input-Referred Noise", value: "35-350 nV/√Hz" }
        ]
      }
    },
    {
      id: "proj-02",
      title: "SPRi Bacterial Infection Detection",
      institution: "BOSTON UNIVERSITY",
      period: "FEB - MAY 2021",
      description: "Co-prototyped biosensor device for rapid point-of-care sepsis detection, with requirements defined after direct consultation with a practicing nephrologist. Integrated fluidic sampling interface into the hemodialysis circuit via a modified stopcock valve. Implemented Arduino-based signal acquisition to transduce refractive index shifts off a functionalized SPRi biochip into quantifiable infection biomarker data.",
      tags: ["Biosensors", "Surface Plasmon Resonance", "Arduino / Microfluidics", "Point-of-Care Diagnostics"],
      details: {
        objective: "Enable real-time detection of bacteremia (E. coli, S. aureus) during active hemodialysis without external lab incubation.",
        methodology: "Coupled a 632.8nm laser diode array to a functionalized gold-film biosensor slide mounted in a custom microfluidic flow cell.",
        outcomes: "Demonstrated linear refractive index shift sensitivity down to 10^2 CFU/mL within 14 minutes of sampling.",
        codeSnippet: `// Arduino SPRi Refractive Index Sensor Sampling
const int LASER_PIN = 9;
const int SENSOR_PIN = A0;

float readRefractiveIndexShift() {
  digitalWrite(LASER_PIN, HIGH);
  delayMicroseconds(250);
  int rawValue = analogRead(SENSOR_PIN);
  float voltage = (rawValue / 1023.0) * 5.0;
  float delta_n = (voltage - 1.234) * 0.0042; // Transduction factor
  return delta_n;
}`,
        telemetryData: [
          { label: "Detection Limit", value: "100 CFU/mL" },
          { label: "Assay Latency", value: "< 15 mins" },
          { label: "Refractive Index Sensitivity", value: "1.42 × 10^-5 RIU" }
        ]
      }
    },
    {
      id: "proj-03",
      title: "Motorized Scalpel",
      institution: "BOSTON UNIVERSITY",
      period: "JUN 2022",
      image: "/src/assets/images/scalpel.jpg",
      description: "Prototyped a rotating scalpel mounted on a 2D gantry, translating MATLAB user-defined slicing geometries into autonomous blade trajectory control.",
      tags: ["Gantry Control", "MATLAB", "Kinematics", "Medical Robotics"],
      details: {
        objective: "Precision tissue resection along non-linear geometric boundaries with automated cutting depth regulation.",
        methodology: "Interfaced a high-speed stepper motor micro-gantry with MATLAB inverse kinematics algorithms.",
        outcomes: "Achieved continuous slicing accuracy within ±0.08 mm across complex curved profiles.",
        telemetryData: [
          { label: "Trajectory Error", value: "±0.08 mm" },
          { label: "Gantry Velocity", value: "15 mm/s" },
          { label: "RPM Range", value: "1,200 - 8,000 RPM" }
        ]
      }
    }
  ] as ProjectItem[],

  skillCategories: [
    {
      id: "lab",
      name: "LABORATORY",
      iconName: "flask",
      skills: [
        { name: "Automated IHC/ISH", level: 95, details: "Slide heater characterization, reagent dispensing, assay validation" },
        { name: "Bioinstrumentation", level: 92, details: "Transducer interfacing, signal amplification, noise isolation" },
        { name: "Fluorescence Microscopy", level: 88, details: "Spectral deconvolution, fluorophore optimization, high-power optics" },
        { name: "Gel Electrophoresis", level: 85, details: "DNA/RNA sizing, protein separation, agarose & PAGE analysis" },
        { name: "Plasmid Amplification", level: 84, details: "Bacterial transformation, plasmid purification, cloning workflows" },
        { name: "RT-PCR", level: 86, details: "Thermal cycling protocols, primer design, quantitative amplification" },
        { name: "CRISPR/Cas9", level: 82, details: "Guide RNA design, gene editing, cell line validation" }
      ]
    },
    {
      id: "software",
      name: "SOFTWARE & ANALYSIS",
      iconName: "code",
      skills: [
        { name: "Signal Processing", level: 90, details: "Filtering, noise reduction, transducer output quantification" },
        { name: "LIMS & OpenText", level: 84, details: "Laboratory data management, controlled document workflows" },
        { name: "Minitab & MATLAB", level: 92, details: "Statistical process control, Gage R&R, mathematical modeling" },
        { name: "Python & C++", level: 94, details: "Data science, hardware drivers, algorithmic data analysis" },
        { name: "KiCad & Arduino", level: 88, details: "Schematic capture, PCB layout, microcontroller firmware" },
        { name: "CAD SolidWorks", level: 90, details: "3D mechanical assembly, microfluidic manifold design, drafting" },
        { name: "Linux & LLM Templating", level: 85, details: "Automated script workflows, technical dossier generation" }
      ]
    },
    {
      id: "quality",
      name: "FABRICATION & QUALITY",
      iconName: "settings",
      skills: [
        { name: "Design Control", level: 92, details: "ISO 13485, 21 CFR Part 820, V&V testing, Traceability matrix" },
        { name: "Verification & Validation", level: 92, details: "Protocol design, requirements traceability, GMP/GLP compliance" },
        { name: "Risk Mitigation", level: 95, details: "ISO 14971, FMEA analysis, EU IVDR technical risk dossiers" },
        { name: "Root Cause Analysis", level: 93, details: "Failure investigation, causal isolation, corrective action" },
        { name: "Prototyping", level: 94, details: "3D printing, CNC machining, rapid medical device iteration" },
        { name: "Soldering & Welding", level: 88, details: "Micro-electronics soldering, wire harness assembly" },
        { name: "Casting & Dilution", level: 86, details: "PDMS microfluidic molding, serial chemical dilution" }
      ]
    }
  ] as SkillCategory[],

  education: {
    school: "Boston University",
    location: "Boston, MA",
    degree: "Bachelor of Science, Biomedical Engineering",
    graduated: "GRADUATED 2022",
    coursework: [
      "Computational Synthetic Biology",
      "Device and Diagnostic Design",
      "Fluid Mechanics",
      "Materials Processing and Product Development",
      "Molecular Cell Biology and Biotechnology",
      "Neurotoxins",
      "Nucleic Acid Nanotechnology",
      "Systems Physiology",
      "Thermodynamics"
    ]
  }
};
