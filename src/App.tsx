import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Instrumentation } from './components/Instrumentation';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { CvModal } from './components/CvModal';
import { ContactModal } from './components/ContactModal';
import { ProjectItem, ExperienceItem, PORTFOLIO_DATA } from './data/portfolio';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [cvOpen, setCvOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Intersection Observer for active nav section
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  // Handle conversion of Experience item to modal view
  const handleSelectExperience = (exp: ExperienceItem) => {
    let detailsObj = {
      objective: exp.role || 'Biomedical Systems Engineering & Verification',
      methodology: exp.summary,
      outcomes: exp.bullets ? exp.bullets.join(' ') : 'Completed technical development milestones.',
      telemetryData: [
        { label: 'System Integration', value: 'Verified' },
        { label: 'Engineering Status', value: 'Active' }
      ]
    };

    if (exp.id === 'exp-01') {
      detailsObj = {
        objective: 'Technical Skill Expansion & Engineering Rigor',
        methodology: 'Reverse engineering open-source potentiostat hardware, op-amp signal conditioning topology analysis, ADC digital filtering, and FDA 21 CFR Part 820 QSR analysis.',
        outcomes: 'Built real-time cyclic voltammetry DSP filters, synthesized medical device quality systems regulations, and advanced towards NCEES PE Licensure.',
        telemetryData: [
          { label: 'Potentiostat Topology', value: 'Analyzed' },
          { label: 'PE License Track', value: 'Active' },
          { label: 'FDA 21 CFR 820', value: 'Synthesized' }
        ]
      };
    } else if (exp.id === 'exp-02') {
      detailsObj = {
        objective: exp.role || 'System-Level Verification & Risk Management',
        methodology: 'Onboard slide-heater characterization metrology, BOM configuration auditing across 15 stainers, failure mode root cause analysis, and EU IVDR technical risk dossier compilation.',
        outcomes: '200+ IVDR technical risk dossiers compiled, isolated electromagnetic induction shutdown causes, validated slide-heater supplier, and earned 5 Roche Spot Awards.',
        telemetryData: [
          { label: 'Technical Dossiers', value: '200+' },
          { label: 'Roche Spot Awards', value: '5' },
          { label: 'System Stainer Audits', value: '15' }
        ]
      };
    }

    const experienceAsProject: ProjectItem = {
      id: exp.id,
      title: exp.title,
      institution: exp.location,
      period: exp.period,
      description: exp.summary,
      tags: exp.id === 'exp-01' 
        ? ['Open-Source Potentiostat', 'PE Licensure', 'Analog Circuit Analysis', 'FDA 21 CFR Part 820'] 
        : ['ISO 14971', 'EU IVDR', 'V&V Testing', 'Roche Stainer Audit'],
      structuredSections: exp.structuredSections,
      technicalDetails: exp.technicalDetails,
      details: detailsObj
    };
    setSelectedProject(experienceAsProject);
  };

  return (
    <div className="min-h-screen bg-abyss text-cream selection:bg-cyan/30 selection:text-cyan-light flex flex-col font-inter">
      {/* Navbar */}
      <Navbar
        onOpenContact={() => setContactOpen(true)}
        onOpenCv={() => setCvOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onOpenCv={() => setCvOpen(true)}
          onOpenProjects={() => {
            const projSec = document.getElementById('projects');
            projSec?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <Experience onSelectExperience={handleSelectExperience} />

        <Instrumentation onSelectProject={(proj) => setSelectedProject(proj)} />

        <Skills />

        <Education />
      </main>

      {/* Footer */}
      <Footer onOpenContact={() => setContactOpen(true)} />

      {/* Interactive Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <CvModal
        isOpen={cvOpen}
        onClose={() => setCvOpen(false)}
      />

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </div>
  );
}
