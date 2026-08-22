import React, { useState, useEffect } from 'react';
import { Mail, FileText, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenContact: () => void;
  onOpenCv: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenContact,
  onOpenCv,
  activeSection
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'EXPERIENCE', href: '#experience', id: 'experience' },
    { name: 'PROJECTS', href: '#projects', id: 'projects' },
    { name: 'SKILLS', href: '#skills', id: 'skills' },
    { name: 'CV', href: '#cv', id: 'cv', isAction: true },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-abyss/85 backdrop-blur-md border-b border-white/10 py-3 shadow-lg shadow-black/40' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="#" 
          className="font-sora text-xl md:text-2xl font-bold tracking-tight text-white hover:text-cyan transition-colors flex items-center gap-2 group"
        >
          <span className="text-cyan group-hover:scale-110 transition-transform font-mono text-lg">&lt;/&gt;</span>
          <span>Drew J. Gross</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs tracking-widest text-cream-soft">
          {navLinks.map((link) => {
            if (link.isAction) {
              return (
                <button
                  key={link.name}
                  onClick={onOpenCv}
                  className={`hover:text-cyan transition-colors relative py-1 uppercase cursor-pointer ${
                    activeSection === link.id ? 'text-cyan' : ''
                  }`}
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan" />
                </button>
              );
            }
            return (
              <a
                key={link.name}
                href={link.href}
                className={`hover:text-cyan transition-colors py-1 uppercase relative ${
                  activeSection === link.id ? 'text-cyan font-semibold' : ''
                }`}
              >
                {link.name}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Buttons & Quick Tools */}
        <div className="hidden md:flex items-center gap-3">
          {/* Contact Button */}
          <button
            onClick={onOpenContact}
            className="px-5 py-2 rounded-sm bg-cyan text-cyan-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-cyan-light transition-all cursor-pointer"
          >
            CONTACT
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-cyan"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-harbor/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 flex flex-col gap-4 font-mono text-sm">
          <a
            href="#experience"
            onClick={() => setMobileMenuOpen(false)}
            className="text-cream hover:text-cyan py-1"
          >
            EXPERIENCE
          </a>
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="text-cream hover:text-cyan py-1"
          >
            PROJECTS
          </a>
          <a
            href="#skills"
            onClick={() => setMobileMenuOpen(false)}
            className="text-cream hover:text-cyan py-1"
          >
            SKILLS
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCv();
            }}
            className="text-left text-cyan py-1 flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>VIEW CV / RESUME</span>
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenContact();
            }}
            className="w-full mt-2 py-2.5 bg-cyan text-cyan-black font-bold uppercase rounded text-center"
          >
            CONTACT DREW
          </button>
        </div>
      )}
    </header>
  );
};
