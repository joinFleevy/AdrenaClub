'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MessageCircle, Compass, Dumbbell, ShieldCheck, Eye } from 'lucide-react';
import { Language, content } from '@/data/content';

interface HeroProps {
  lang: Language;
}

export default function Hero({ lang }: HeroProps) {
  const t = content[lang].hero;
  const [activePhoto, setActivePhoto] = useState<'floor' | 'reception'>('floor');

  return (
    <section id="accueil" className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden bg-adrena-black border-b border-adrena-border">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-adrena-gold/10 blur-[180px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-adrena-surface/40 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Split Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Athletic Value Proposition & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Main Statement Title */}
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-tight uppercase leading-[1.02] sm:leading-[0.96] mb-6">
              {t.title}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-neutral-200 max-w-[62ch] font-medium leading-relaxed mb-6">
              {t.subtitle}
            </p>

            {/* Practical Grounded Landmark Bar */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 py-3 px-5 rounded-xl bg-adrena-card border border-adrena-border text-sm sm:text-base font-bold text-adrena-bone mb-8 tracking-wide shadow-sm">
              <span className="flex items-center gap-2 text-adrena-gold">
                <span className="w-2 h-2 rounded-full bg-adrena-gold animate-pulse" />
                <span>Bab Ezzouar (CUB1)</span>
              </span>
              <span className="text-neutral-600 hidden sm:inline">•</span>
              <span className="text-adrena-stone">
                {lang === 'fr' ? '2 Niveaux d\'entraînement' : 'طابقان مجهزان بالكامل'}
              </span>
              <span className="text-neutral-600 hidden sm:inline">•</span>
              <span className="text-adrena-bone">
                {lang === 'fr' ? 'Ouvert 7j/7 jusqu\'à minuit (00:00)' : 'مفتوح 7/7 أيام حتى منتصف الليل'}
              </span>
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="https://wa.me/213771570378?text=Bonjour%20Adrena%20Club,%20je%20souhaite%20m'inscrire%20ou%20demander%20des%20informations."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-adrena-gold hover:bg-adrena-gold-light text-[#111215] font-display font-black text-base uppercase tracking-wider transition-all shadow-lg hover:scale-[1.02]"
              >
                <MessageCircle className="w-5 h-5 fill-[#111215]" />
                <span>{t.ctaPrimary}</span>
              </a>

              <a
                href="#tour-360"
                className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-adrena-card hover:bg-adrena-surface text-adrena-bone hover:text-adrena-gold border border-adrena-border font-display font-bold text-base uppercase tracking-wider transition-all"
              >
                <Compass className="w-5 h-5 text-adrena-gold" />
                <span>{t.ctaSecondary}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Real Gym Showcase */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-adrena-card border border-adrena-border rounded-2xl p-3 sm:p-4 shadow-2xl">
              {/* Photo Selector Switcher */}
              <div className="grid grid-cols-2 gap-2 mb-3 bg-[#111215] p-1.5 rounded-xl border border-adrena-border">
                <button
                  type="button"
                  onClick={() => setActivePhoto('floor')}
                  className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs sm:text-sm font-bold tracking-wide transition-all ${
                    activePhoto === 'floor'
                      ? 'bg-adrena-gold text-[#111215] shadow-md'
                      : 'text-adrena-stone hover:text-adrena-bone hover:bg-adrena-surface'
                  }`}
                >
                  <Dumbbell className="w-4 h-4" />
                  <span>{lang === 'fr' ? 'Plateau Force' : 'كمال الأجسام'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActivePhoto('reception')}
                  className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs sm:text-sm font-bold tracking-wide transition-all ${
                    activePhoto === 'reception'
                      ? 'bg-adrena-gold text-[#111215] shadow-md'
                      : 'text-adrena-stone hover:text-adrena-bone hover:bg-adrena-surface'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{lang === 'fr' ? 'Accueil & Entrée' : 'الاستقبال والمدخل'}</span>
                </button>
              </div>

              {/* Main Photo Frame */}
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-adrena-border bg-[#0E0F13] group">
                <Image
                  src={
                    activePhoto === 'floor'
                      ? '/images/hero/hero-gym-floor.jpg'
                      : '/images/hero/hero-reception.jpg'
                  }
                  alt={
                    activePhoto === 'floor'
                      ? 'Plateau Musculation Adrena Club Bab Ezzouar'
                      : 'Accueil et Réception Adrena Club Bab Ezzouar'
                  }
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  priority
                />

                {/* Dark atmospheric gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111215] via-[#111215]/20 to-transparent pointer-events-none" />

                {/* Level / Zone Tag */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111215]/90 backdrop-blur-sm border border-adrena-border text-xs font-bold text-adrena-gold uppercase tracking-wider shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-adrena-gold" />
                    {activePhoto === 'floor'
                      ? lang === 'fr'
                        ? 'Sous-Sol • Plateau Musculation'
                        : 'الطابق السفلي • قاعة كمال الأجسام'
                      : lang === 'fr'
                      ? 'RDC • Accueil & Portiques'
                      : 'الطابق الأرضي • الاستقبال وبوابات الدخول'}
                  </span>
                </div>

                {/* Bottom Details Tag */}
                <div className="absolute bottom-3 inset-x-3 z-10 flex items-center justify-between gap-2 p-2.5 rounded-lg bg-[#111215]/95 backdrop-blur-sm border border-adrena-border">
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-adrena-bone truncate">
                      {activePhoto === 'floor'
                        ? lang === 'fr'
                          ? 'Équipement Pro Black & Gold'
                          : 'أجهزة احترافية بالأسود والأصفر'
                        : lang === 'fr'
                        ? 'Comptoir Bois & Tourniquets RFID'
                        : 'مكتب استقبال خشبي وبوابات إلكترونية'}
                    </p>
                    <p className="text-[11px] text-adrena-stone truncate">
                      {activePhoto === 'floor'
                        ? lang === 'fr'
                          ? 'Haltères jusqu\'à 50kg+ & Machines guidées'
                          : 'أوزان ثقيلة وآلات متنوعة'
                        : lang === 'fr'
                        ? 'Accès sécurisé & Bar protéines'
                        : 'دخول بالبطاقة ومكملات غذائية'}
                    </p>
                  </div>

                  <a
                    href="#tour-360"
                    className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-adrena-surface hover:bg-adrena-gold hover:text-[#111215] text-adrena-gold text-xs font-bold transition-colors"
                    title={lang === 'fr' ? 'Explorer en 360°' : 'جولة 360°'}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">360°</span>
                  </a>
                </div>
              </div>

              {/* Bottom Quick Indicator */}
              <div className="mt-3 px-2 flex items-center justify-between text-xs text-adrena-stone">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-semibold text-adrena-bone">
                    {lang === 'fr' ? 'Photos réelles de la salle' : 'صور حقيقية من داخل النادي'}
                  </span>
                </span>
                <span className="text-neutral-500 font-mono">Bab Ezzouar, Alger</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Authentic Trust Blocks with High Contrast & Grounded Design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 lg:mt-16 pt-8 border-t border-adrena-border">
          {t.trustBadges.map((badge, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-adrena-card border border-adrena-border hover:border-adrena-gold/50 transition-colors shadow-sm"
            >
              <div className="w-8 h-1 bg-adrena-gold rounded-full mb-4" />
              <h3 className="font-display text-lg font-black text-adrena-bone uppercase tracking-wider leading-snug">
                {badge.title}
              </h3>
              <p className="text-sm text-adrena-stone mt-2 leading-relaxed font-medium">
                {badge.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
