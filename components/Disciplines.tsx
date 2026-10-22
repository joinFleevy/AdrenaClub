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
  const isAr = lang === 'ar';

  return (
    <section id="activites" className="py-20 scroll-mt-28 relative bg-adrena-black border-b border-adrena-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 max-w-3xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {t.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-adrena-stone leading-relaxed font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* Disciplines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {t.items.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col justify-between overflow-hidden rounded-xl bg-adrena-card border border-adrena-border hover:border-adrena-gold/50 transition-all duration-300 shadow-md"
            >
              {/* Facility Photography */}
              <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-adrena-dark">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-adrena-card via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 px-3 py-1 rounded-md bg-adrena-black/90 border border-adrena-border text-xs font-bold text-adrena-gold uppercase tracking-wider">
                  {item.category}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-adrena-gold transition-colors tracking-tight leading-snug mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-adrena-stone leading-relaxed mb-6 font-normal">
                    {item.desc}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-1.5 mb-6 text-xs text-adrena-stone border-t border-adrena-border/60 pt-4">
                    {item.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-adrena-gold flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Action */}
                <a
                  href="#planning"
                  className="inline-flex items-center justify-between text-xs sm:text-sm font-bold text-white hover:text-adrena-gold transition-colors pt-4 border-t border-adrena-border"
                >
                  <span>{isAr ? 'مواعيد الحصص في الجدول' : 'Voir les créneaux dans le planning'}</span>
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
