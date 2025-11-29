import React, { useState, useEffect } from 'react';
import { Menu, X, PawPrint } from 'lucide-react';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { label: 'Meet Fury', href: '#hero' },
  { label: 'Our Story', href: '#story' },
  { label: 'Snapshots', href: '#snapshots' },
  { label: 'Resume', href: '#resume' },
  { label: 'Gallery', href: '#gallery' },
];

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="bg-huft-orange text-white p-1.5 rounded-full">
            <PawPrint className="w-5 h-5" />
          </div>
          <span className="font-rounded text-2xl font-bold text-huft-charcoal tracking-tight group-hover:text-huft-orange transition-colors">Fury</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-huft-charcoal hover:text-huft-orange font-bold font-sans text-sm tracking-wide transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-huft-orange text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            Say Hi
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-huft-charcoal"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-huft-peach p-6 flex flex-col gap-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-huft-charcoal text-lg font-bold font-rounded"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="bg-huft-orange text-white text-center px-6 py-3 rounded-full text-lg font-bold shadow-md"
          >
             Say Hi
          </a>
        </div>
      )}
    </nav>
  );
};