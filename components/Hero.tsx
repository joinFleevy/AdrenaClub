'use client';

import React from 'react';
import Image from 'next/image';
import { MessageCircle, Compass, ArrowRight } from 'lucide-react';
import { Language, content } from '@/data/content';

interface HeroProps {
  lang: Language;
}

export default function Hero({ lang }: HeroProps) {
  const t = content[lang].hero;

  return (
    <section id="accueil" className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-adrena-black border-b border-adrena-border">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-adrena-gold/10 blur-[160px] pointer-events-none rounded-full" />

      {/* Background authentic gym watermark */}
      <div className="absolute inset-0 z-0 opacity-15 mix-blend-luminosity pointer-events-none">
        <Image
          src="/planning_femme_bg.png"
          alt="Adrena Club Gym Area"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-adrena-black via-adrena-black/85 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          {/* Main Statement Title */}
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight uppercase leading-[1.02] sm:leading-[0.98] mb-6">
            {t.title}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-neutral-200 max-w-[65ch] font-medium leading-relaxed mb-6">
            {t.subtitle}
          </p>

          {/* Practical Grounded Landmark Bar */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 py-3 px-5 rounded-xl bg-adrena-card border border-adrena-border text-sm sm:text-base font-bold text-adrena-bone mb-10 tracking-wide shadow-sm">
            <span className="flex items-center gap-2 text-adrena-gold">
              <span className="w-2 h-2 rounded-full bg-adrena-gold" />
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
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-16">
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

          {/* 4 Authentic Trust Blocks with High Contrast & Grounded Design */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-8 border-t border-adrena-border">
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
      </div>
    </section>
  );
}
