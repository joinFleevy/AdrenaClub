'use client';

import React from 'react';
import Image from 'next/image';
import { VolumeX, ArrowRight, Calendar, Check } from 'lucide-react';
import { Language, content } from '@/data/content';

interface WomensSanctuaryProps {
  lang: Language;
}

export default function WomensSanctuary({ lang }: WomensSanctuaryProps) {
  const isAr = lang === 'ar';

  const commitments = isAr
    ? [
        {
          title: 'خصوصية كاملة في الطابق الأرضي',
          desc: 'قاعة مستقلة تماماً، بدون أي رؤية من الخارج، مع غرف تبديل ملابس ودوشات خاصة.',
        },
        {
          title: 'بيئة هادئة بدون أي موسيقى',
          desc: 'التزام تام بعدم تشغيل الموسيقى لتوفير جو محترم ومريح يتوافق مع قيم مشتركاتنا.',
        },
        {
          title: 'تأطير ومدربات معتمدات',
          desc: 'حضور دائم لمدربات مؤهلات في كمال الأجسام، اللياقة والكيك بوكسينغ.',
        },
        {
          title: 'مواعيد مخصصة ومنتظمة',
          desc: 'أيام الأحد، الثلاثاء والخميس مساءً (15:00 - 19:00)، والجمعة والسبت صباحاً.',
        },
      ]
    : [
        {
          title: 'Accès 100% privé au rez-de-chaussée',
          desc: 'Salle entièrement fermée sans vis-à-vis, avec vestiaires et douches dédiés.',
        },
        {
          title: 'Environnement calme, strictement sans musique',
          desc: 'Engagement formel pour préserver un cadre serein, discret et respectueux de nos adhérentes.',
        },
        {
          title: 'Encadrement par des coachs féminines',
          desc: 'Présence continue d\'entraîneuses certifiées pour guider vos séances de musculation, cardio et kickboxing.',
        },
        {
          title: 'Créneaux réguliers matin et après-midi',
          desc: 'Dimanche, Mardi, Jeudi (15h00 – 19h00), Vendredi (08h00 – 12h00) et Samedi (09h00 – 13h00).',
        },
      ];

  return (
    <section id="espace-femmes" className="py-20 scroll-mt-28 relative bg-adrena-black border-b border-adrena-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="rounded-xl overflow-hidden border border-adrena-border bg-adrena-card shadow-2xl">
              <div className="relative h-80 sm:h-96 lg:h-[440px] w-full">
                <Image
                  src="/images/disciplines/femmes.jpg"
                  alt="Espace Femmes Adrena Club Bab Ezzouar"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-adrena-black/90 via-transparent to-transparent pointer-events-none" />
                
                {/* Clean Bottom Caption */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-2 bg-adrena-black/90 px-3 py-1.5 rounded-lg border border-adrena-border">
                    <VolumeX className="w-3.5 h-3.5 text-adrena-gold flex-shrink-0" />
                    <span className="font-bold">{isAr ? '100% بدون أي موسيقى' : '100% Sans Musique'}</span>
                  </div>
                  <a
                    href="#planning"
                    className="flex items-center gap-1 text-adrena-gold font-bold hover:underline bg-adrena-black/90 px-3 py-1.5 rounded-lg border border-adrena-border"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{isAr ? 'الجدول' : 'Horaires'}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Guarantees */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              <span>{isAr ? 'فضاء خاص 100% للنساء.' : 'Espace 100% Femmes.'}</span>
              <span className="block text-adrena-gold mt-1">
                {isAr ? 'هدوء، احترام واحترافية تامة.' : 'Tranquillité, respect et matériel dédié.'}
              </span>
            </h2>

            <p className="text-base sm:text-lg text-adrena-stone leading-relaxed max-w-xl mb-8 font-normal">
              {isAr
                ? 'خصص نادي أدرينا الطابق الأرضي كاملاً لراحة المشتركات، مع أجهزة كمال أجسام وكارديو حديثة، في بيئة محترمة وبدون أي تداخل.'
                : 'Adrena Club consacre le rez-de-chaussée complet à un entraînement féminin indépendant : charges guidées, haltères, tapis de course et vélos, le tout dans une discrétion absolue.'}
            </p>

            {/* List of Commitments (No cards, no icon boxes) */}
            <div className="space-y-4 mb-8">
              {commitments.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-adrena-surface border border-adrena-border flex items-center justify-center flex-shrink-0 text-adrena-gold mt-0.5">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-adrena-stone mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#planning"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-adrena-gold hover:bg-adrena-gold-light text-adrena-black font-extrabold text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-[0.98]"
              >
                <span>{isAr ? 'مشاهدة مواقيت النساء' : 'Consulter les créneaux femmes'}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </a>

              <a
                href="https://wa.me/213771570378?text=Bonjour,%20je%20souhaite%20des%20informations%20sur%20les%20cr%C3%A9neaux%20femmes"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-adrena-card hover:bg-adrena-surface text-white border border-adrena-border font-bold text-xs sm:text-sm transition-colors"
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
