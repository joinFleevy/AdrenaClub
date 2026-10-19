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
        <div className="mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-adrena-gold/10 border border-adrena-gold/30 text-adrena-gold text-xs font-display font-semibold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5 text-adrena-gold" />
            <span>{isAr ? 'تأطير تقني معتمد' : 'Encadrement Technique Officiel'}</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase leading-none">
            {t.title}
          </h2>
          <p className="mt-3 text-base text-neutral-300 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Coaches Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.items.map((coach) => (
            <div
              key={coach.id}
              className="flex flex-col justify-between overflow-hidden rounded-2xl bg-adrena-card border border-adrena-border hover:border-adrena-gold/50 transition-all duration-300 shadow-xl"
            >
              {/* Authentic Coach Photography */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-neutral-900">
                <Image
                  src={coach.image}
                  alt={coach.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-top"
                  priority={coach.id === 'abdellah'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-adrena-card via-adrena-card/30 to-transparent" />
                
                {/* Disciplines Chips */}
                <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
                  {coach.disciplines.map((disc, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-md bg-black/80 backdrop-blur-sm border border-white/10 text-xs font-medium text-adrena-gold"
                    >
                      {disc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Coach Bio & Info */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-display text-2xl font-black text-white tracking-wide mb-1">
                    {coach.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-neutral-400 mb-4 uppercase tracking-wider">
                    {coach.role}
                  </p>
                  <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                    {coach.bio}
                  </p>
                </div>

                {/* Direct Action */}
                <a
                  href="https://wa.me/213771570378?text=Bonjour,%20je%20souhaite%20des%20informations%20sur%20les%20cours%20de%20combat%20et%20l'encadrement"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display inline-flex items-center justify-between text-xs sm:text-sm font-bold text-neutral-200 hover:text-adrena-gold transition-colors uppercase tracking-wider pt-4 border-t border-white/5"
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
