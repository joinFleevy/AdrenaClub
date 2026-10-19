'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Phone, MapPin, Globe, Menu, X, MessageCircle, Clock, ShieldCheck } from 'lucide-react';
import { Language, content } from '@/data/content';
import { computeAlgiersLiveStatus, LiveStatusData } from '@/components/LiveStatusEngine';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
}

export default function Navbar({ lang, onToggleLang }: NavbarProps) {
  const t = content[lang];
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#accueil', label: t.nav.home },
    { href: '#tour-360', label: t.nav.tour360 },
    { href: '#activites', label: t.nav.disciplines },
    { href: '#planning', label: t.nav.planning },
    { href: '#tarifs', label: t.nav.tarifs },
    { href: '#avis', label: t.nav.reviews },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top micro bar */}
      <div className="bg-[#0E0F13] border-b border-adrena-border py-1.5 px-4 sm:px-6 lg:px-8 text-xs text-adrena-stone">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="flex items-center gap-1.5 text-adrena-bone">
              <MapPin className="w-3.5 h-3.5 text-adrena-gold flex-shrink-0" />
              <span className="hidden sm:inline">{t.topBar.address}</span>
              <span className="sm:hidden">Bab Ezzouar, Alger</span>
            </span>
            <span className="hidden md:inline text-neutral-600">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-adrena-bone">
              <Clock className="w-3.5 h-3.5 text-adrena-gold flex-shrink-0" />
              <span>Sam-Jeu : 06h - 00h (Hommes)</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Open Status badge */}
            <div
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                liveStatus?.audience === 'femmes'
                  ? 'bg-fuchsia-950/70 border-fuchsia-500/40 text-fuchsia-300'
                  : liveStatus?.isOpen
                  ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-400'
                  : 'bg-neutral-900 border-neutral-700 text-neutral-400'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  liveStatus?.audience === 'femmes'
                    ? 'bg-fuchsia-400 animate-pulse'
                    : liveStatus?.isOpen
                    ? 'bg-emerald-400 animate-pulse'
                    : 'bg-neutral-500'
                }`}
              />
              <span className="font-sans">
                {lang === 'ar'
                  ? (liveStatus?.badgeLabelAr || 'مفتوح')
                  : (liveStatus?.badgeLabelFr || 'Ouvert')}
              </span>
            </div>

            {/* Language Switcher */}
            <button
              onClick={onToggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-adrena-card hover:bg-adrena-surface text-adrena-bone border border-adrena-border transition-colors font-bold text-xs"
              title="Changer de langue / تغيير اللغة"
            >
              <Globe className="w-3.5 h-3.5 text-adrena-gold" />
              <span>{lang === 'fr' ? 'العربية' : 'Français'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`transition-all duration-300 px-4 sm:px-6 lg:px-8 ${
          isScrolled
            ? 'bg-adrena-black/95 backdrop-blur-md py-3 border-b border-adrena-border shadow-xl'
            : 'bg-gradient-to-b from-[#111215]/95 via-[#111215]/70 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <a href="#accueil" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 transition-transform group-hover:scale-105">
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
              <div className="flex items-center gap-1.5">
                <span className="font-display text-xl sm:text-2xl font-black text-white tracking-widest uppercase">
                  ADRENA
                </span>
                <span className="font-display text-xl sm:text-2xl font-black text-adrena-gold tracking-widest uppercase">
                  CLUB
                </span>
              </div>
              <span className="font-display text-xs text-neutral-300 tracking-wider font-extrabold uppercase -mt-0.5 hidden sm:block">
                {lang === 'fr' ? 'BAB EZZOUAR • 2 ÉTAGES' : 'باب الزوار • طابقان'}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3.5 py-1.5 rounded-lg font-display text-sm font-bold uppercase tracking-wider text-adrena-bone hover:text-adrena-gold hover:bg-white/5 transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://wa.me/213771570378?text=Bonjour%20Adrena%20Club,%20je%20souhaite%20avoir%20des%20informations%20sur%20les%20inscriptions."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-adrena-gold hover:bg-adrena-gold-light text-[#111215] font-display font-black text-sm uppercase tracking-wider transition-all shadow-md hover:scale-[1.02]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.nav.ctaButton}</span>
            </a>
          </div>

          {/* Mobile menu toggle button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl text-adrena-bone hover:text-white bg-adrena-card border border-adrena-border"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-adrena-dark/98 backdrop-blur-xl border-b border-adrena-border px-6 py-6 transition-all animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-base font-bold text-adrena-bone hover:text-[#111215] hover:bg-adrena-gold transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-4 border-t border-adrena-border flex flex-col gap-3">
              <a
                href="tel:+213771570378"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-adrena-card border border-adrena-border text-adrena-bone font-bold text-sm"
              >
                <Phone className="w-4 h-4 text-adrena-gold" />
                <span className="font-mono tabular-nums">0771 57 03 78</span>
              </a>
              <a
                href="https://wa.me/213771570378?text=Bonjour%20Adrena%20Club,%20je%20souhaite%20m'inscrire."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-adrena-gold text-[#111215] font-display font-black text-sm tracking-wide uppercase"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.nav.ctaButton}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
