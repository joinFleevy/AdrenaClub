'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Language, content } from '@/data/content';

interface DisciplinesProps {
  lang: Language;
}

export default function Disciplines({ lang }: DisciplinesProps) {
  const t = content[lang].disciplines;

  return (
    <section id="activites" className="py-20 scroll-mt-28 relative bg-adrena-black border-b border-adrena-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header without generic AI-slop kickers */}
        <div className="mb-12">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-adrena-bone tracking-tight uppercase leading-none">
            {t.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-adrena-stone max-w-[65ch] leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Disciplines Grid with Authentic Facility Photography */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.items.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl bg-adrena-card border border-adrena-border hover:border-neutral-600 transition-all duration-300 shadow-md"
            >
              {/* Authentic Facility Image */}
              <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-neutral-900">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-adrena-card via-adrena-card/25 to-transparent" />
                <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 px-3 py-1 rounded-md bg-[#111215]/90 border border-adrena-border text-xs font-display font-bold uppercase tracking-wider text-adrena-gold">
                  {item.category}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-black text-adrena-bone group-hover:text-adrena-gold transition-colors tracking-wide leading-tight mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-adrena-stone leading-relaxed mb-6 max-w-[50ch] font-sans">
                    {item.desc}
                  </p>

                  {/* Bullet Points */}
                  <ul className="space-y-2.5 mb-6">
                    {item.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-adrena-stone font-sans">
                        <span className="w-1.5 h-1.5 rounded-full bg-adrena-gold mt-1.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Link */}
                <a
                  href="#planning"
                  className="font-display inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-adrena-bone hover:text-adrena-gold transition-colors uppercase tracking-wider pt-4 border-t border-adrena-border"
                >
                  <span>{lang === 'fr' ? 'Consulter les créneaux' : 'مواقيت التدريب'}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
