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
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            {t.title}
          </h2>
          <p className="mt-2 text-base text-adrena-stone max-w-[60ch] leading-relaxed font-medium">
            {t.subtitle}
          </p>
        </div>

        {/* Disciplines Grid with Authentic Facility Photography: Horizontal snap carousel on mobile */}
        <div className="sm:hidden text-center text-xs text-adrena-muted mb-3 font-medium">
          <span>{lang === 'ar' ? '← اسحب لمشاهدة جميع التخصصات →' : '← Glissez pour voir toutes les disciplines →'}</span>
        </div>
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 no-scrollbar">
          {t.items.map((item) => (
            <div
              key={item.id}
              className="group w-[84vw] max-w-[320px] flex-shrink-0 snap-center sm:w-auto sm:max-w-none flex flex-col justify-between overflow-hidden rounded-2xl bg-adrena-card border border-adrena-border hover:border-adrena-gold/50 transition-all duration-300 shadow-lg"
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
                <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 px-3 py-1 rounded bg-adrena-gold text-adrena-black text-[11px] font-black uppercase tracking-wider shadow-md adrena-slant">
                  <span className="inline-block adrena-unslant">{item.category}</span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-adrena-gold transition-colors tracking-tight leading-snug mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-adrena-stone leading-relaxed mb-5 max-w-[50ch] font-medium">
                    {item.desc}
                  </p>

                  {/* Bullet Points */}
                  <ul className="space-y-2 mb-6">
                    {item.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-adrena-stone">
                        <span className="w-1.5 h-1.5 rounded-sm bg-adrena-gold mt-1.5 flex-shrink-0" />
                        <span className="font-medium">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Link */}
                <a
                  href="#planning"
                  className="inline-flex items-center justify-between text-xs sm:text-sm font-black uppercase tracking-wider text-white hover:text-adrena-gold transition-colors pt-4 border-t border-adrena-border"
                >
                  <span>{lang === 'fr' ? 'Consulter les créneaux' : 'مواقيت التدريب'}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180 text-adrena-gold" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
