'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Phone, MapPin, Globe, Menu, X, MessageCircle, Clock } from 'lucide-react';
import { Language, content } from '@/data/content';
import { computeAlgiersLiveStatus, LiveStatusData } from '@/components/LiveStatusEngine';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
}

export default function Navbar({ lang, onToggleLang }: NavbarProps) {
  const t = content[lang];
  const isAr = lang === 'ar';
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('accueil');
  const [liveStatus, setLiveStatus] = useState<LiveStatusData | null>(null);

  useEffect(() => {
    setLiveStatus(computeAlgiersLiveStatus());
    const interval = setInterval(() => {
      setLiveStatus(computeAlgiersLiveStatus());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section via IntersectionObserver for polished navigation feedback
  useEffect(() => {
    const sectionIds = ['accueil', 'tour-360', 'activites', 'planning', 'tarifs', 'avis', 'contact'];
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
    { id: 'tour-360', href: '#tour-360', label: t.nav.tour360 },
    { id: 'activites', href: '#activites', label: t.nav.disciplines },
    { id: 'planning', href: '#planning', label: t.nav.planning },
    { id: 'tarifs', href: '#tarifs', label: t.nav.tarifs },
    { id: 'avis', href: '#avis', label: t.nav.reviews },
    { id: 'contact', href: '#contact', label: t.nav.contact },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-adrena-black">
      {/* Top micro utility bar (Desktop / Tablet only - hidden on mobile to maximize viewport) */}
      <div className="hidden sm:block bg-adrena-black border-b border-adrena-border py-2 px-4 sm:px-6 lg:px-8 text-xs sm:text-sm text-adrena-stone">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-6 overflow-hidden text-ellipsis whitespace-nowrap text-xs sm:text-sm">
            <span className="flex items-center gap-2 text-white font-medium">
              <MapPin className="w-4 h-4 text-adrena-gold flex-shrink-0" />
              <span className="hidden sm:inline">{t.topBar.address}</span>
              <span className="sm:hidden">Bab Ezzouar, Alger</span>
            </span>
            <span className="hidden md:inline text-adrena-border font-bold">|</span>
            <span className="hidden md:flex items-center gap-2 text-adrena-stone font-medium">
              <Clock className="w-4 h-4 text-adrena-gold flex-shrink-0" />
              <span>
                {isAr
                  ? 'السبت-الخميس : 06h - 00h (رجال)'
                  : 'Sam-Jeu : 06h - 00h (Hommes)'}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Live Open Status badge with clean non-blurry indicator */}
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                liveStatus?.audience === 'femmes'
                  ? 'bg-adrena-card border-adrena-gold/40 text-adrena-gold'
                  : liveStatus?.isOpen
                  ? 'bg-adrena-card border-emerald-500/40 text-emerald-400'
                  : 'bg-adrena-card border-adrena-border text-adrena-muted'
              }`}
            >
              <span className="relative flex h-2 w-2">
                {liveStatus?.isOpen && (
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      liveStatus?.audience === 'femmes' ? 'bg-adrena-gold' : 'bg-emerald-400'
                    }`}
                  />
                )}
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    liveStatus?.audience === 'femmes'
                      ? 'bg-adrena-gold'
                      : liveStatus?.isOpen
                      ? 'bg-emerald-400'
                      : 'bg-neutral-500'
                  }`}
                />
              </span>
              <span>
                {isAr
                  ? (liveStatus?.badgeLabelAr || 'مفتوح')
                  : (liveStatus?.badgeLabelFr || 'Ouvert')}
              </span>
            </div>

            {/* Language Switcher */}
            <button
              type="button"
              onClick={onToggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-adrena-card hover:bg-adrena-surface text-white border border-adrena-border hover:border-adrena-gold/40 transition-all font-bold text-xs active:scale-95 focus-visible:ring-2 focus-visible:ring-adrena-gold focus-visible:outline-none cursor-pointer"
              title="Changer de langue / تغيير اللغة"
              aria-label={isAr ? 'Changer en Français' : 'تغيير إلى العربية'}
            >
              <Globe className="w-3.5 h-3.5 text-adrena-gold flex-shrink-0" />
              <span>{lang === 'fr' ? 'العربية' : 'Français'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar - Solid Opaque Architectural Bar (Zero backdrop-blur bleed) */}
      <nav
        aria-label="Navigation principale"
        className={`transition-all duration-200 px-4 sm:px-6 lg:px-8 bg-adrena-black border-b border-adrena-border ${
          isScrolled ? 'py-3 shadow-2xl' : 'py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <a
            href="#accueil"
            className="flex items-center gap-3 group rounded-xl focus-visible:ring-2 focus-visible:ring-adrena-gold focus-visible:outline-none"
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
                <span className="text-white">ADRENA</span>
                <span className="text-adrena-gold">CLUB</span>
              </div>
              <span className="text-[11px] sm:text-xs text-adrena-muted tracking-widest font-bold mt-1 hidden sm:block uppercase">
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
                  className={`relative px-4 py-2 rounded-lg text-sm sm:text-base transition-all duration-150 focus-visible:ring-2 focus-visible:ring-adrena-gold focus-visible:outline-none ${
                    isActive
                      ? 'text-adrena-gold font-extrabold bg-adrena-surface border border-adrena-border shadow-sm'
                      : 'text-adrena-stone font-bold hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://wa.me/213771570378?text=Bonjour%20Adrena%20Club,%20je%20souhaite%20avoir%20des%20informations%20sur%20les%20inscriptions."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-adrena-gold hover:bg-adrena-gold-light text-adrena-black font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-adrena-gold focus-visible:outline-none"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>{t.nav.ctaButton}</span>
            </a>
          </div>

          {/* Mobile Right Controls: Lang Switcher + Hamburger Menu */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={onToggleLang}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-adrena-card hover:bg-adrena-surface text-adrena-bone border border-adrena-border text-xs font-bold transition-all"
              aria-label={isAr ? 'Changer en Français' : 'تغيير إلى العربية'}
            >
              <Globe className="w-3.5 h-3.5 text-adrena-gold" />
              <span>{lang === 'fr' ? 'العربية' : 'FR'}</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-adrena-bone hover:text-white bg-adrena-card border border-adrena-border focus-visible:ring-2 focus-visible:ring-adrena-gold focus-visible:outline-none"
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Backdrop overlay for mobile drawer */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 top-[60px] sm:top-[102px] bg-black/70 backdrop-blur-sm z-40 transition-opacity animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="lg:hidden relative z-50 bg-adrena-dark border-b border-adrena-border px-6 py-6 shadow-2xl transition-all animate-in fade-in slide-in-from-top-2 duration-200"
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
                      ? 'bg-adrena-surface text-adrena-gold border border-adrena-gold/40'
                      : 'text-adrena-bone hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-adrena-gold" />}
                </a>
              );
            })}

            <div className="pt-4 mt-2 border-t border-adrena-border flex flex-col gap-3">
              <a
                href="tel:+213771570378"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-adrena-card border border-adrena-border text-adrena-bone font-bold text-sm min-h-[44px] hover:border-adrena-gold/40 transition-colors"
              >
                <Phone className="w-4 h-4 text-adrena-gold" />
                <span className="font-mono tabular-nums">0771 57 03 78</span>
              </a>
              <a
                href="https://wa.me/213771570378?text=Bonjour%20Adrena%20Club,%20je%20souhaite%20m'inscrire."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-adrena-gold hover:bg-adrena-gold-light text-adrena-black font-black text-sm uppercase tracking-wider transition-all shadow-md active:scale-98 min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{t.nav.ctaButton}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
