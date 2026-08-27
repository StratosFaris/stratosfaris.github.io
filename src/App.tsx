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
import { ProjectItem } from './data/portfolio';

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

  return (
    <div className="min-h-screen bg-abyss text-cream selection:bg-cyan/30 selection:text-cyan-light flex flex-col font-inter">
      <div className="print:hidden flex flex-col flex-1">
        {/* Navbar */}
        <Navbar
          onOpenContact={() => setContactOpen(true)}
          onOpenCv={() => setCvOpen(true)}
          activeSection={activeSection}
        />

        {/* Main Content Sections */}
        <main className="flex-1 bg-tech-grid">
          <Hero
            onOpenCv={() => setCvOpen(true)}
            onOpenProjects={() => {
              const projSec = document.getElementById('projects');
              projSec?.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          <Experience />

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

        <ContactModal
          isOpen={contactOpen}
          onClose={() => setContactOpen(false)}
        />
      </div>

      <CvModal
        isOpen={cvOpen}
        onClose={() => setCvOpen(false)}
      />
    </div>
  );
}
