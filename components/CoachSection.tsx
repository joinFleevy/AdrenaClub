'use client';

import React from 'react';
import Image from 'next/image';
import { Award, ArrowRight } from 'lucide-react';
import { Language, content } from '@/data/content';

interface CoachSectionProps {
  lang: Language;
}

export default function CoachSection({ lang }: CoachSectionProps) {
  const t = content[lang].coaches;
  const isAr = lang === 'ar';

  return (
    <section id="coachs" className="py-20 scroll-mt-28 relative bg-adrena-black border-b border-adrena-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 max-w-3xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            {t.title}
          </h2>
          <p className="mt-2 text-base text-adrena-stone leading-relaxed font-medium">
            {t.subtitle}
          </p>
        </div>

        {/* Coaches Cards: Horizontal snap carousel on mobile */}
        <div className="sm:hidden text-center text-xs text-adrena-muted mb-3 font-medium">
          <span>{lang === 'ar' ? '← اسحب للتعرف على الطاقم التدريبي →' : '← Glissez pour découvrir l\'équipe des coachs →'}</span>
        </div>
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 no-scrollbar">
          {t.items.map((coach) => (
            <div
              key={coach.id}
              className="w-[84vw] max-w-[320px] flex-shrink-0 snap-center sm:w-auto sm:max-w-none flex flex-col justify-between overflow-hidden rounded-2xl bg-adrena-card border border-adrena-border hover:border-adrena-gold/50 transition-all duration-300 shadow-xl"
            >
              {/* Authentic Coach Photography */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-neutral-900">
                <Image
                  src={coach.image}
                  alt={coach.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-adrena-card via-adrena-card/20 to-transparent" />
                
                {/* Disciplines Chips */}
                <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
                  {coach.disciplines.map((disc, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded bg-adrena-black/95 border border-adrena-border text-xs font-black uppercase tracking-wider text-adrena-gold shadow-md"
                    >
                      {disc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Coach Bio & Info */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-1">
                    {coach.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-black uppercase tracking-wider text-adrena-gold mb-3">
                    {coach.role}
                  </p>
                  <p className="text-sm text-adrena-stone leading-relaxed mb-6 font-medium">
                    {coach.bio}
                  </p>
                </div>

                {/* Direct Action */}
                <a
                  href="https://wa.me/213771570378?text=Bonjour,%20je%20souhaite%20des%20informations%20sur%20les%20cours%20de%20combat%20et%20l'encadrement"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between text-xs sm:text-sm font-black uppercase tracking-wider text-white hover:text-adrena-gold transition-colors pt-4 border-t border-adrena-border"
                >
                  <span>{isAr ? 'احجز استشارتك مع الفريق' : 'Réserver une séance coachée'}</span>
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
