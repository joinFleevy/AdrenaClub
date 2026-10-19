'use client';

import React from 'react';
import Image from 'next/image';
import { VolumeX, ShieldCheck, HeartHandshake, Sparkles, Calendar, ArrowRight } from 'lucide-react';
import { Language, content } from '@/data/content';

interface WomensSanctuaryProps {
  lang: Language;
}

export default function WomensSanctuary({ lang }: WomensSanctuaryProps) {
  const t = content[lang].womensSanctuary;
  const isAr = lang === 'ar';

  const featureIcons = [
    <ShieldCheck key="shield" className="w-5 h-5 text-adrena-gold flex-shrink-0" />,
    <VolumeX key="volume" className="w-5 h-5 text-adrena-gold flex-shrink-0" />,
    <HeartHandshake key="heart" className="w-5 h-5 text-adrena-gold flex-shrink-0" />,
    <Sparkles key="sparkles" className="w-5 h-5 text-adrena-gold flex-shrink-0" />,
  ];

  return (
    <section id="espace-femmes" className="py-20 relative bg-adrena-dark/60 border-b border-adrena-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Visual & Trust Showcase */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden border border-adrena-border bg-adrena-card shadow-2xl">
              <div className="relative h-80 sm:h-96 w-full">
                <Image
                  src="/images/disciplines/femmes.jpg"
                  alt="Espace Femmes Adrena Club"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-adrena-card via-black/30 to-transparent" />
                
                {/* Floating Highlight Pill */}
                <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 px-3.5 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-adrena-gold/40 text-xs font-display font-bold uppercase tracking-wider text-adrena-gold flex items-center gap-2 shadow-lg">
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>{isAr ? '100% بدون أي موسيقى' : '100% Sans Musique'}</span>
                </div>
              </div>

              {/* Bottom Card Summary */}
              <div className="p-6 bg-adrena-card/95 border-t border-adrena-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-display text-lg font-bold text-white">
                      {isAr ? 'بيئة رياضية آمنة ومحترمة' : 'Tranquillité & Sérénité'}
                    </p>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      {isAr ? 'مواعيد مخصصة ومنفصلة تماماً' : 'Créneaux dédiés avec accès exclusivement féminin'}
                    </p>
                  </div>
                  <a
                    href="#planning"
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-adrena-gold/20 text-adrena-gold border border-white/10 transition-colors"
                    aria-label="Planning femmes"
                  >
                    <Calendar className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Key Commitments & Features */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-adrena-gold/10 border border-adrena-gold/30 text-adrena-gold text-xs font-display font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-adrena-gold" />
              <span>{t.tag}</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight mb-4">
              {t.title}
            </h2>

            <p className="text-base text-neutral-300 leading-relaxed max-w-2xl mb-8">
              {t.subtitle}
            </p>

            {/* Feature 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {t.features.map((feat, index) => (
                <div
                  key={index}
                  className="p-5 rounded-2xl bg-adrena-card/70 border border-adrena-border hover:border-adrena-gold/40 transition-colors duration-200"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="p-2 rounded-xl bg-black/60 border border-white/10">
                      {featureIcons[index % featureIcons.length]}
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-white mb-1">
                        {feat.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#planning"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-adrena-gold hover:bg-adrena-gold/90 text-adrena-black font-display font-bold uppercase tracking-wider text-xs sm:text-sm transition-all duration-200 shadow-lg shadow-adrena-gold/20"
              >
                <span>{t.cta}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </a>
              <a
                href="https://wa.me/213771570378?text=Bonjour,%20je%20souhaite%20des%20informations%20sur%20les%20cr%C3%A9neaux%20femmes"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-white/10 text-xs sm:text-sm font-semibold transition-colors"
              >
                <span>{isAr ? 'استفسار عبر واتساب' : 'Poser une question via WhatsApp'}</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
