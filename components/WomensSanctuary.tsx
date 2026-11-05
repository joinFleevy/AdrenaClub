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
          title: 'حصص هادئة مخصصة بدون موسيقى',
          desc: 'حصص هادئة ومخصصة بدون موسيقى لتوفير أقصى درجات التركيز والراحة، بإشراف مدربات مؤهلات.',
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
          title: 'Séances calmes sans musique au choix',
          desc: 'Créneaux spécifiques sans musique pour une sérénité et une concentration totales, encadrées par des coachs féminines.',
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
    <section id="espace-femmes" className="py-20 sm:py-28 lg:py-32 scroll-mt-28 relative bg-gradient-to-b from-white via-amber-50/20 to-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xl">
              <div className="relative h-80 sm:h-96 lg:h-[440px] w-full">
                <Image
                  src="/images/disciplines/femmes.jpg"
                  alt="Espace Femmes Adrena Club Bab Ezzouar"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent pointer-events-none" />
                
                {/* Clean Bottom Caption */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10">
                    <VolumeX className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="font-bold">{isAr ? 'حصص مخصصة بدون موسيقى' : 'Séances dédiées Sans Musique'}</span>
                  </div>
                  <a
                    href="#planning"
                    className="flex items-center gap-1 text-amber-400 font-extrabold hover:text-white bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10"
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
            
            <span className="text-xs sm:text-sm font-extrabold text-amber-800 uppercase tracking-wider block mb-2">
              {isAr ? 'خصوصية كاملة وراحة بال' : 'Espace Dédié au Rez-de-Chaussée'}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
              <span>{isAr ? 'فضاء خاص 100% للنساء.' : 'Espace 100% Femmes.'}</span>
              <span className="block text-amber-500 mt-1">
                {isAr ? 'هدوء، احترام واحترافية تامة.' : 'Tranquillité, respect et matériel dédié.'}
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-8 font-medium">
              {isAr
                ? 'خصص نادي أدرينا الطابق الأرضي كاملاً لراحة المشتركات، مع أجهزة كمال أجسام وكارديو حديثة، في بيئة محترمة وبدون أي تداخل.'
                : 'Adrena Club consacre le rez-de-chaussée complet à un entraînement féminin indépendant : charges guidées, haltères, tapis de course et vélos, le tout dans une discrétion absolue.'}
            </p>

            {/* List of Commitments */}
            <div className="space-y-4 mb-8">
              {commitments.map((item, index) => (
                <div key={index} className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center flex-shrink-0 text-amber-800 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
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
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-black text-white font-extrabold text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-[0.98]"
              >
                <span>{isAr ? 'مشاهدة مواقيت النساء' : 'Consulter les créneaux femmes'}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </a>

              <a
                href="https://wa.me/213771570378?text=Bonjour,%20je%20souhaite%20des%20informations%20sur%20les%20cr%C3%A9neaux%20femmes"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold text-xs sm:text-sm transition-colors shadow-xs"
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
