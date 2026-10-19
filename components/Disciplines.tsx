'use client';

import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Language, content } from '@/data/content';

interface DisciplinesProps {
  lang: Language;
}

const indexes = ['01', '02', '03', '04', '05', '06'];

export default function Disciplines({ lang }: DisciplinesProps) {
  const t = content[lang].disciplines;

  return (
    <section id="activites" className="py-20 relative bg-adrena-dark/40 border-b border-adrena-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header without generic AI-slop kickers */}
        <div className="mb-12">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase leading-none">
            {t.title}
          </h2>
          <p className="mt-3 text-base text-neutral-300 max-w-[65ch] leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Disciplines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.items.map((item, idx) => (
            <div
              key={item.id}
              className="group flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-adrena-card border border-adrena-border hover:border-adrena-gold/40 transition-all duration-300"
            >
              <div>
                {/* Clean Athletic Category Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/5">
                  <span className="font-display text-sm font-black text-adrena-gold tracking-widest">
                    {indexes[idx]}
                  </span>
                  <span className="font-display text-xs font-bold text-neutral-400 uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl sm:text-3xl font-black text-white group-hover:text-adrena-gold transition-colors tracking-wide leading-tight mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed mb-6 max-w-[50ch]">
                  {item.desc}
                </p>

                {/* Bullet Points */}
                <ul className="space-y-2.5 mb-8">
                  {item.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-adrena-gold mt-1.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <a
                href="#planning"
                className="font-display inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-neutral-300 hover:text-adrena-gold transition-colors uppercase tracking-wider pt-4 border-t border-white/5"
              >
                <span>{lang === 'fr' ? 'Consulter les créneaux' : 'مواقيت التدريب'}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
