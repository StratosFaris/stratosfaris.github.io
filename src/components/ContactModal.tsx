import React, { useEffect, useState } from 'react';
import { X, Send, CheckCircle2, Mail, Building, FileText, User } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [inquiryType, setInquiryType] = useState('V&V Systems Engineering');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    setTimeout(() => {
      // Auto reset after 3 seconds or allow user to close
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl glass-panel rounded-lg border border-cyan/30 shadow-2xl overflow-hidden my-8">
        
        {/* Modal Top */}
        <div className="p-6 bg-harbor border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-cyan" />
            <h2 className="font-sora text-xl font-bold text-white">
              Contact Drew J. Gross
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-cream-muted hover:text-white hover:bg-steel transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-ember mx-auto animate-bounce" />
              <h3 className="font-sora text-2xl font-bold text-white">
                Message Transmitted
              </h3>
              <p className="font-inter text-sm text-cream-soft max-w-md mx-auto">
                Thank you, <span className="text-cyan font-semibold">{name}</span>. Your technical inquiry regarding <span className="text-ember">{inquiryType}</span> has been logged. Drew will reply to <span className="text-white">{email}</span> shortly.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2.5 rounded bg-cyan text-cyan-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-cyan-light transition-colors cursor-pointer"
              >
                RETURN TO PORTFOLIO
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="font-mono text-xs text-cream-soft block mb-1">
                  FULL NAME / TITLE *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-cream-muted absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Dr. Sarah Connor"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded bg-harbor border border-white/10 text-white font-inter text-sm focus:outline-none focus:border-cyan transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-xs text-cream-soft block mb-1">
                    EMAIL ADDRESS *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-cream-muted absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="sarah@biotech.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded bg-harbor border border-white/10 text-white font-inter text-sm focus:outline-none focus:border-cyan transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-xs text-cream-soft block mb-1">
                    ORGANIZATION / LAB
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-cream-muted absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Apex BioSystems"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded bg-harbor border border-white/10 text-white font-inter text-sm focus:outline-none focus:border-cyan transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="font-mono text-xs text-cream-soft block mb-1">
                  INQUIRY CATEGORY
                </label>
                <select
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded bg-harbor border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan transition-colors"
                >
                  <option value="V&V Systems Engineering">V&amp;V Systems Engineering Collaboration</option>
                  <option value="IVDR & Risk Management">EU IVDR &amp; Risk Dossier Consulting</option>
                  <option value="Instrumentation Prototyping">Instrumentation &amp; Biosensor Prototyping</option>
                  <option value="Career & Recruitment">Full-time Career Opportunity</option>
                  <option value="Other Technical Query">Other Technical Query</option>
                </select>
              </div>

              <div>
                <label className="font-mono text-xs text-cream-soft block mb-1">
                  MESSAGE / PROJECT SPECIFICATIONS *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Outline your system parameters or technical inquiry..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 rounded bg-harbor border border-white/10 text-white font-inter text-sm focus:outline-none focus:border-cyan transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="w-full py-3 rounded bg-cyan text-cyan-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-cyan-light transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT INQUIRY</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
