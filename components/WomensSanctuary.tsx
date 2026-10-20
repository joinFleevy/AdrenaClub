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
    <section id="espace-femmes" className="py-20 scroll-mt-28 relative bg-adrena-black border-b border-adrena-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-adrena-border bg-adrena-card shadow-xl">
              <div className="relative h-72 sm:h-88 lg:h-[420px] w-full">
                <Image
                  src="/images/disciplines/femmes.jpg"
                  alt="Espace Femmes Adrena Club"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-adrena-card via-[#111215]/25 to-transparent" />
                
                {/* Floating Highlight Pill */}
                <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 px-3.5 py-1.5 rounded-full bg-[#111215]/90 backdrop-blur-md border border-adrena-border text-xs font-sans font-bold uppercase tracking-wider text-adrena-gold flex items-center gap-2 shadow-md">
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>{isAr ? '100% بدون أي موسيقى' : '100% Sans Musique'}</span>
                </div>
              </div>

              {/* Bottom Card Summary */}
              <div className="p-5 bg-adrena-card border-t border-adrena-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-sans text-base sm:text-lg font-bold text-adrena-bone tracking-tight">
                      {isAr ? 'بيئة رياضية آمنة ومحترمة' : 'Tranquillité & Sérénité'}
                    </p>
                    <p className="text-sm text-adrena-stone mt-1 font-medium">
                      {isAr ? 'مواعيد مخصصة ومنفصلة تماماً' : 'Créneaux dédiés avec accès exclusivement féminin'}
                    </p>
                  </div>
                  <a
                    href="#planning"
                    className="p-3 rounded-xl bg-adrena-surface hover:bg-adrena-gold hover:text-[#111215] text-adrena-gold border border-adrena-border transition-colors"
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
            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-adrena-bone tracking-tight leading-tight mb-3">
              {t.title}
            </h2>

            <p className="text-base text-adrena-stone leading-relaxed max-w-xl mb-8 font-normal">
              {t.subtitle}
            </p>

            {/* Feature 2x2 Grid with High Legibility Sans Typography */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {t.features.map((feat, index) => (
                <div
                  key={index}
                  className="p-5 rounded-2xl bg-adrena-card border border-adrena-border hover:border-neutral-600 transition-colors duration-200 shadow-sm"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-adrena-surface border border-adrena-border flex-shrink-0">
                      {featureIcons[index % featureIcons.length]}
                    </div>
                    <div>
                      <h3 className="font-sans text-base sm:text-lg font-bold text-adrena-bone mb-1.5 tracking-tight">
                        {feat.title}
                      </h3>
                      <p className="text-sm sm:text-base text-adrena-stone leading-relaxed font-sans">
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
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-adrena-gold hover:bg-adrena-gold-light text-[#111215] font-bold text-xs sm:text-sm transition-all shadow-sm active:scale-98"
              >
                <span>{t.cta}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </a>
              <a
                href="https://wa.me/213771570378?text=Bonjour,%20je%20souhaite%20des%20informations%20sur%20les%20cr%C3%A9neaux%20femmes"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-adrena-card hover:bg-adrena-surface text-adrena-bone border border-adrena-border text-xs sm:text-sm font-semibold transition-colors shadow-sm"
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
