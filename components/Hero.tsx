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
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-adrena-black via-adrena-black/85 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          {/* Main Statement Title */}
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight uppercase leading-[0.95] mb-6">
            {t.title}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-[65ch] font-normal leading-relaxed mb-6">
            {t.subtitle}
          </p>

          {/* Community Motto */}
          <div className="inline-block py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm font-semibold text-adrena-gold mb-10 tracking-wide">
            {t.motto}
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

          {/* 4 Pillars in Clean Typographic Columns (No generic rounded rainbow boxes) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-white/10">
            {t.pillars.map((pillar, idx) => (
              <div key={idx} className="border-l-2 rtl:border-l-0 rtl:border-r-2 border-adrena-gold/60 pl-4 rtl:pl-0 rtl:pr-4">
                <h4 className="font-display text-base font-black text-white uppercase tracking-wider leading-snug">{pillar.title}</h4>
                <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
