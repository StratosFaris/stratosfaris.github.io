import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';

interface FooterProps {
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  const { header } = PORTFOLIO_DATA;

  return (
    <footer className="border-t border-white/10 bg-abyss py-8 sm:py-12 relative z-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo */}
          <a
            href="#"
            className="font-sora text-2xl font-bold text-white hover:text-cyan transition-colors"
          >
            Drew J. Gross
          </a>

          {/* Copyright Tagline */}
          <div className="font-mono text-xs text-cream-muted tracking-widest text-center">
            © 2026 DREW J. GROSS | ENGINEERING A HEALTHIER FUTURE
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6 font-mono text-xs font-semibold tracking-wider text-cream-soft">
            <a
              href={header.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan transition-colors uppercase"
            >
              LINKEDIN
            </a>
            <a
              href={header.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan transition-colors uppercase"
            >
              GITHUB
            </a>
            <button
              onClick={onOpenContact}
              className="hover:text-cyan transition-colors uppercase cursor-pointer"
            >
              EMAIL
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};
