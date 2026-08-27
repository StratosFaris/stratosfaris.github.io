import victoryImage from "../assets/images/lab portrait.png";
import probeImage from "../assets/images/probe.png";
import scalpelImage from "../assets/images/scalpel.jpg";

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
  tags?: string[];
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

export interface EducationItem {
  school: string;
  location: string;
  degree: string;
  graduated: string;
  coursework?: string[];
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
    location: "LOC: RTP-NC",
    portraitImage: victoryImage,
    email: "drewjgross13@gmail.com",
    github: "https://github.com/StratosFaris",
    linkedin: "https://linkedin.com/in/drewjgross",
  },
  
  experiences: [
    {
      title: "Professional Development",
      location: "Raleigh, NC",
      period: "OCT 2024 - PRESENT",
      summary: "Reverse engineered a biochemical potentiostat for circuit simulation while pursuing NCEES PE licensure.",
      technicalDetails: [
        "Analyzed PCB components for design intention and configured open-source materials for circuit simulation.",
        "Familiarized with electrochemical principles behind the detection of biomolecules against a reference electrode.",
        "Preparing for the NCEES Principles and Practice of Engineering (PE) licensure examination."
      ]
    },
    {
      title: "Roche Tissue Diagnostics",
      role: "Systems Engineer Associate",
      location: "Tucson, AZ",
      period: "OCT 2022 - OCT 2024",
      tags: ["ISO 14971", "EU IVDR", "V&V Testing", "Roche Stainer Audit"],
      structuredSections: [
        {
          title: "Benchmark Staining Design Validation",
          highlights: [
            "Designed and executed onboard slide-heater characterization study for supplier qualification using a custom metrology apparatus to evaluate spatial thermal uniformity and proprietary software-controlled repeatability.",
            "Identified an inbuilt electromagnetic induction artifact, isolating causality to unexpected stainer shutdowns.",
            "Performed component-level audit via partial disassembly of 15 staining instruments, verifying configuration accuracy against the BOM during preventive maintenance, assuring operational reliability."
          ]
        },
        {
          title: "Product Risk Management",
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
      id: "proj-03",
      title: "Motorized Scalpel",
      institution: "Boston University",
      period: "JUN 2022",
      image: scalpelImage,
      description: "Prototyped a rotating scalpel mounted on a 2D gantry, translating MATLAB user-defined slicing geometries into autonomous blade trajectory control via a series of servo motors.",
      tags: ["Gantry Control", "MATLAB", "3D CAD", "Surgical Robotics"],
      details: {
        objective: "Precision automated incision of tissue-like material along non-linear geometric boundaries.",
        methodology: "Interfaced servo motor-powered 2D gantry with MATLAB calculus.",
        outcomes: "Achieved continuous slicing accurate to the defined trajectory."
      }
    },
    {
      id: "proj-02",
      title: "Automated Basilar Probe",
      institution: "Boston University",
      period: "SEP 2021 - MAY 2022",
      image: probeImage,
      description: "Investigated the relationship between cetacean spatial navigation and anthropogenic interference. Fabricated a fiber optic cantilever probe for in vitro measurement of respondent vibrational frequencies along the basilar membrane. Aligned via an aus JENA OPM 212F surgical operating microscope and precision micromanipulators on a leveled vibration-isolation optical bench. Restored an Angstrom-resolution optical resolver for conversion of optomechanical displacement to voltage, with custom Python closed-loop feedback course-correction.",
      tags: ["Fiber Optics", "Optomechanics", "MATLAB & Python"],
      details: {
        objective: "Quantify cellular vibrational resonance along the mammalian cochlear basilar membrane under high-frequency mechanical stress.",
        methodology: "Mounted a fiber optic cantilever displacement sensor on multi-axis micrometer positioners atop a spirit-leveled optical bench, coupling gold SMA coaxial transducers to real-time contextual algorithms.",
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
      id: "proj-01",
      title: "SPRi Bacterial Infection Detection",
      institution: "Boston University",
      period: "FEB - MAY 2021",
      description: "Co-prototyped biosensor device for rapid point-of-care sepsis detection, with requirements defined after direct consultation with a practicing nephrologist. Integrated fluidic sampling interface into the hemodialysis circuit via a modified stopcock valve. Implemented Arduino-based signal acquisition to transduce refractive index shifts off a functionalized SPRi biochip into quantifiable infection biomarker data.",
      tags: ["Biosensors", "Surface Plasmon Resonance", "Arduino", "Fluidics", "Point-of-Care Diagnostics"],
      details: {
        objective: "Enable point-of-care detection of bacteremia (E. coli, S. aureus) during active hemodialysis without external lab incubation.",
        methodology: "Consulted with practicing nephrologist to define requirements for an integrated and functionalized gold-film biosensor.",
        outcomes: "Demonstrated proof-of-concept with a custom stopcocked siphon valve integrated into fluidic circuit. Project continued by group member during their summer internship with the nephrology department.",
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
              }`
      }
    }
  ] as ProjectItem[],

  skillCategories: [
    {
      id: "lab",
      name: "LABORATORY",
      iconName: "flask",
      skills: [
        { name: "Automated IHC/ISH", details: "Slide heater characterization, reagent dispensing, assay validation, tissue processing" },
        { name: "Bioinstrumentation", details: "Transducer interfacing, signal amplification, noise isolation" },
        { name: "Fluorescence Microscopy", details: "Spectral deconvolution, fluorophore optimization" },
        { name: "Gel Electrophoresis", details: "DNA/RNA sizing, protein separation" },
        { name: "RT-PCR & Plasmid Amplification", details: "Alkaline lysis, thermal & pressure cycling, primer design, plasmid purification & cloning" },
        { name: "CRISPR/Cas9", details: "Guide RNA design, gene editing, cell line validation" }
      ]
    },
    {
      id: "quality",
      name: "FABRICATION & QUALITY",
      iconName: "settings",
      skills: [
        { name: "Design Control", details: "ISO 13485, 21 CFR Part 820, V&V testing, Traceability matrix" },
        { name: "Verification & Validation", details: "Experimental protocol design, requirements traceability, GMP/GLP compliance" },
        { name: "Risk Mitigation", details: "ISO 14971, FMEA analysis, EU IVDR technical risk dossiers" },
        { name: "Root Cause Analysis", details: "Failure investigation, causal isolation, corrective action" },
        { name: "Prototyping", details: "Engineering sketching, CNC machining, rapid iteration" },
        { name: "CAD SolidWorks", details: "3D mechanical drafting & assembly, 3D printing" }
      ]
    },
        {
      id: "software",
      name: "SOFTWARE & ANALYSIS",
      iconName: "code",
      skills: [
        { name: "Signal Processing", details: "Filtering, noise reduction, transducer output quantification" },
        { name: "LIMS & OpenText", details: "Laboratory data management, controlled document workflows, configuration control" },
        { name: "Minitab & MATLAB", details: "Mathematical modeling, regression analysis" },
        { name: "Python & C++", details: "Memory management, object-oriented programming, compilation and debugging" },
        { name: "KiCad & Arduino", details: "PCB schematic synthesis, microcontroller firmware" },
        { name: "Linux & LLM Templating", details: "Automated script workflows" }
      ]
    }
  ] as SkillCategory[],

  education: [
    {
      school: "University of Maryland",
      location: "Coursera",
      degree: "Certificate of Specialization in Product Ideation, Design, and Management",
      graduated: "COMPLETED 2026",
      coursework: [
        "Developing Innovative Ideas for Product Leaders",
        "Product Management Essentials",
        "Establishing Product-Market Fit",
        "Creative Design, Prototyping, and Testing",
        "Financial Management for Product Leaders"
      ]
    },
    {
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
  ] as EducationItem[]
};
