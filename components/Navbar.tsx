'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Phone, MapPin, Globe, Menu, X, MessageCircle, Clock } from 'lucide-react';
import { Language, content } from '@/data/content';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onOpen360?: () => void;
}

export default function Navbar({ lang, onToggleLang, onOpen360 }: NavbarProps) {
  const t = content[lang];
  const isAr = lang === 'ar';
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('accueil');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section via IntersectionObserver for polished navigation feedback
  useEffect(() => {
    const sectionIds = ['accueil', 'tarifs', 'planning', 'espace-femmes', 'avis', 'contact'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Close mobile drawer on Escape key and lock body scroll
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'accueil', href: '#accueil', label: t.nav.home },
    { id: 'tarifs', href: '#tarifs', label: t.nav.tarifs },
    { id: 'planning', href: '#planning', label: t.nav.planning },
    { id: 'espace-femmes', href: '#espace-femmes', label: isAr ? 'فضاء النساء' : 'Espace Femmes' },
    { id: 'avis', href: '#avis', label: t.nav.reviews },
    { id: 'contact', href: '#contact', label: t.nav.contact },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-xs">
      {/* Clean Athletic Utility Top Bar (Desktop / Tablet only) */}
      <div className="hidden sm:block bg-slate-100 border-b border-slate-200 py-1.5 px-4 sm:px-6 lg:px-8 text-xs text-slate-700">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 font-semibold">
          <div className="flex items-center gap-4 sm:gap-6 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="flex items-center gap-1.5 text-slate-900">
              <MapPin className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
              <span>Bab Ezzouar (CUB1), Alger</span>
            </span>
            <span className="text-slate-300 font-bold">|</span>
            <span className="flex items-center gap-1.5 text-slate-700">
              <Clock className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
              <span>{isAr ? 'مفتوح 7/7 أيام • حتى 00:00' : 'Ouvert 7j/7 • Jusqu\'à minuit (00:00)'}</span>
            </span>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Phone link */}
            <a
              href="tel:+213771570378"
              className="flex items-center gap-1.5 text-slate-800 hover:text-amber-600 font-bold transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-600" />
              <span className="font-mono tabular-nums">0771 57 03 78</span>
            </a>

            <span className="text-slate-300 font-bold">|</span>

            {/* Language Switcher */}
            <button
              type="button"
              onClick={onToggleLang}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 hover:border-slate-400 transition-all font-bold text-xs cursor-pointer shadow-xs"
              title="Changer de langue / تغيير اللغة"
              aria-label={isAr ? 'Changer en Français' : 'تغيير إلى العربية'}
            >
              <Globe className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
              <span>{lang === 'fr' ? 'العربية' : 'Français'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar - Bright Clean Architectural Bar */}
      <nav
        aria-label="Navigation principale"
        className={`transition-all duration-200 px-4 sm:px-6 lg:px-8 bg-white/95 backdrop-blur-md border-b border-slate-200 ${
          isScrolled ? 'py-3 shadow-md' : 'py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <a
            href="#accueil"
            className="flex items-center gap-3 group rounded-xl focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Adrena Club Logo"
                fill
                sizes="48px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 font-black text-2xl sm:text-3xl tracking-tight leading-none">
                <span className="text-slate-900">ADRENA</span>
                <span className="text-amber-500">CLUB</span>
              </div>
              <span className="text-[11px] sm:text-xs text-slate-500 tracking-widest font-extrabold mt-1 hidden sm:block uppercase">
                {isAr ? 'باب الزوار • طابقان' : 'BAB EZZOUAR • 2 ÉTAGES'}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-lg text-sm sm:text-base transition-all duration-150 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none ${
                    isActive
                      ? 'text-amber-600 font-extrabold bg-amber-50 border border-amber-200 shadow-sm'
                      : 'text-slate-700 font-bold hover:text-amber-600 hover:bg-slate-100'
                  }`}
                >
                  <span>{link.label}</span>
                </a>
              );
            })}

            {onOpen360 && (
              <button
                type="button"
                onClick={onOpen360}
                className="px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 border border-slate-300 hover:border-amber-500 transition-all cursor-pointer bg-white shadow-sm flex items-center gap-1.5"
              >
                <span>{isAr ? 'جولة 360°' : 'Visite 360°'}</span>
              </button>
            )}
          </div>

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://wa.me/213771570378?text=Bonjour%20Adrena%20Club,%20je%20souhaite%20avoir%20des%20informations%20sur%20les%20inscriptions."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-black text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
            >
              <MessageCircle className="w-4 h-4 text-amber-400 fill-current" />
              <span>{t.nav.ctaButton}</span>
            </a>
          </div>

          {/* Mobile Right Controls: Lang Switcher + Hamburger Menu */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={onToggleLang}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-bold transition-all"
              aria-label={isAr ? 'Changer en Français' : 'تغيير إلى العربية'}
            >
              <Globe className="w-3.5 h-3.5 text-amber-500" />
              <span>{lang === 'fr' ? 'العربية' : 'FR'}</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-900 hover:bg-slate-100 bg-white border border-slate-300 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Backdrop overlay for mobile drawer */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 top-[68px] sm:top-[102px] bg-slate-900/60 backdrop-blur-sm z-40 transition-opacity animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="lg:hidden relative z-50 bg-white border-b border-slate-200 px-6 py-6 shadow-2xl transition-all animate-in fade-in slide-in-from-top-2 duration-200 text-slate-900"
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-bold transition-all flex items-center justify-between min-h-[44px] ${
                    isActive
                      ? 'bg-amber-50 text-amber-600 border border-amber-200'
                      : 'text-slate-800 hover:bg-slate-100 border border-transparent'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-amber-500" />}
                </a>
              );
            })}

            {onOpen360 && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpen360();
                }}
                className="px-4 py-3 rounded-xl text-base font-bold text-amber-600 hover:bg-amber-50 border border-amber-200 transition-all flex items-center justify-between min-h-[44px] cursor-pointer"
              >
                <span>{isAr ? 'جولة 360° داخل القاعة' : 'Visite 360° interactive'}</span>
                <span className="text-xs bg-amber-100 px-2 py-0.5 rounded text-amber-700 font-black">360°</span>
              </button>
            )}

            <div className="pt-4 mt-2 border-t border-slate-200 flex flex-col gap-3">
              <a
                href="tel:+213771570378"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-100 border border-slate-300 text-slate-900 font-bold text-sm min-h-[44px] hover:border-amber-500 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-500" />
                <span className="font-mono tabular-nums">0771 57 03 78</span>
              </a>
              <a
                href="https://wa.me/213771570378?text=Bonjour%20Adrena%20Club,%20je%20souhaite%20m'inscrire."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-slate-900 hover:bg-black text-white font-black text-sm uppercase tracking-wider transition-all shadow-md active:scale-98 min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4 text-amber-400 fill-current" />
                <span>{t.nav.ctaButton}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
