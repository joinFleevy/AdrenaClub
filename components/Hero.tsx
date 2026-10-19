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

          {/* Practical Grounded Landmark Pill (No LARP) */}
          <div className="inline-flex items-center gap-2.5 py-2.5 px-4 rounded-xl bg-adrena-gold/15 border border-adrena-gold/30 text-sm sm:text-base font-bold text-adrena-gold mb-10 tracking-wide">
            <span className="w-2 h-2 rounded-full bg-adrena-gold animate-pulse flex-shrink-0" />
            <span>
              {lang === 'fr'
                ? 'Bab Ezzouar (CUB1) • 2 Niveaux d\'entraînement • Ouvert 7j/7 jusqu\'à minuit (00:00)'
                : 'باب الزوار (CUB1) • طابقان للتدريب • مفتوح 7/7 أيام حتى منتصف الليل (00:00)'}
            </span>
          </div>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-16">
            <a
              href="https://wa.me/213771570378?text=Bonjour%20Adrena%20Club,%20je%20souhaite%20m'inscrire%20ou%20demander%20des%20informations."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-adrena-gold hover:bg-adrena-gold-light text-black font-display font-black text-base uppercase tracking-wider transition-all shadow-lg hover:scale-[1.02]"
            >
              <MessageCircle className="w-5 h-5 fill-black" />
              <span>{t.ctaPrimary}</span>
            </a>

            <a
              href="#tour-360"
              className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white hover:text-adrena-gold border border-white/15 font-display font-bold text-base uppercase tracking-wider transition-all"
            >
              <Compass className="w-5 h-5 text-adrena-gold" />
              <span>{t.ctaSecondary}</span>
            </a>
          </div>

          {/* 4 Authentic Trust Badges with High Contrast & Readability */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-8 border-t border-white/10">
            {t.trustBadges.map((badge, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-adrena-gold/40 transition-colors"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-adrena-gold mb-3" />
                <h3 className="font-display text-lg font-black text-white uppercase tracking-wider leading-snug">
                  {badge.title}
                </h3>
                <p className="text-sm text-neutral-300 mt-2 leading-relaxed font-medium">
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
