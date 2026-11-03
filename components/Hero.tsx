'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MessageCircle, ArrowDown, MapPin, Clock, ShieldCheck, Dumbbell } from 'lucide-react';
import { Language, content } from '@/data/content';

interface HeroProps {
  lang: Language;
  onOpen360?: () => void;
}

export default function Hero({ lang, onOpen360 }: HeroProps) {
  const isAr = lang === 'ar';
  const [activeFloor, setActiveFloor] = useState<'soussol' | 'rdc'>('rdc');

  return (
    <section id="accueil" className="relative pt-24 pb-12 sm:pt-36 sm:pb-16 bg-adrena-black border-b border-adrena-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Authoritative Editorial Statement */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-4 sm:mb-6">
              <span>{isAr ? 'نادي أدرينا سبورت.' : 'ADRENA CLUB.'}</span>
              <span className="block text-adrena-gold mt-1.5 sm:mt-2 text-2xl sm:text-4xl lg:text-5xl font-extrabold">
                {isAr ? 'أكبر مجمع رياضي بباب الزوار.' : 'Le complexe sportif majeur de Bab Ezzouar.'}
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-adrena-stone max-w-[54ch] leading-relaxed mb-6 sm:mb-8 font-normal">
              {isAr
                ? 'طابقان مجهزان بأحدث عتاد كمال الأجسام والقوة البدنية، حلبة ملاكمة وبساط نزال معتمد، وفضاء نسائي مستقل 100% مع حصص خاصة بدون موسيقى.'
                : 'Deux niveaux dédiés à l\'entraînement : plateau musculation charges libres, ring de combat, tatami d\'arts martiaux et espace 100% femmes avec séances dédiées sans musique.'}
            </p>

            {/* Direct Primary Actions - Clean Non-Competing Action Pair */}
            <div className="flex items-center gap-3">
              <a
                href="#tarifs"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg bg-adrena-gold hover:bg-adrena-gold-light text-adrena-black font-extrabold text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-[0.98]"
              >
                <span>{isAr ? 'مشاهدة الأسعار والبرنامج' : 'Voir les Tarifs & Planning'}</span>
                <ArrowDown className="w-4 h-4 text-adrena-black flex-shrink-0" />
              </a>

              <a
                href="https://wa.me/213771570378?text=Bonjour%20Adrena%20Club,%20je%20souhaite%20des%20informations%20sur%20les%20abonnements."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3.5 sm:py-4 rounded-lg bg-adrena-card hover:bg-adrena-surface text-white border border-adrena-border hover:border-adrena-gold/50 font-bold text-xs sm:text-sm transition-all"
              >
                <MessageCircle className="w-4 h-4 text-adrena-gold fill-current" />
                <span>{isAr ? 'واتساب' : 'WhatsApp'}</span>
              </a>
            </div>

            {/* Practical Club Notice */}
            <div className="mt-6 pt-5 border-t border-adrena-border/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-adrena-stone font-medium">
              <span className="flex items-center gap-1.5 text-white">
                <MapPin className="w-3.5 h-3.5 text-adrena-gold flex-shrink-0" />
                <span>Bab Ezzouar (CUB1), Alger</span>
              </span>
              <span className="flex items-center gap-1.5 text-white">
                <Clock className="w-3.5 h-3.5 text-adrena-gold flex-shrink-0" />
                <span>{isAr ? 'مفتوح يومياً حتى 00:00 (رجال)' : 'Ouvert 7j/7 jusqu\'à 00:00 (Hommes)'}</span>
              </span>
            </div>
          </div>

          {/* Right Column: Architectural Photography Viewport */}
          <div className="lg:col-span-5 w-full">
            <div className="rounded-xl overflow-hidden border border-adrena-border bg-adrena-card shadow-2xl">
              
              {/* Floor Switcher */}
              <div className="flex items-center border-b border-adrena-border bg-adrena-dark p-1 gap-1 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setActiveFloor('soussol')}
                  className={`flex-1 py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                    activeFloor === 'soussol'
                      ? 'bg-adrena-surface text-white font-extrabold border border-adrena-border shadow-sm'
                      : 'text-adrena-stone hover:text-white'
                  }`}
                >
                  <Dumbbell className="w-3.5 h-3.5 text-adrena-gold" />
                  <span>{isAr ? 'السفلي : الحديد والقتال' : 'Sous-Sol : Muscu & Combat'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFloor('rdc')}
                  className={`flex-1 py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                    activeFloor === 'rdc'
                      ? 'bg-adrena-surface text-white font-extrabold border border-adrena-border shadow-sm'
                      : 'text-adrena-stone hover:text-white'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-adrena-gold" />
                  <span>{isAr ? 'الأرضي : الاستقبال والنساء' : 'RDC : Accueil & Femmes'}</span>
                </button>
              </div>

              {/* Photo Viewport */}
              <div className="relative aspect-[4/3] w-full bg-adrena-dark">
                {activeFloor === 'soussol' ? (
                  <Image
                    src="/images/hero/hero-gym-floor.jpg"
                    alt="Plateau Musculation Adrena Club Bab Ezzouar"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover object-center"
                    priority
                  />
                ) : (
                  <Image
                    src="/images/hero/hero-reception.jpg"
                    alt="Accueil et Tourniquets RFID Adrena Club Bab Ezzouar"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover object-center"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-adrena-black/90 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="font-semibold bg-adrena-black/90 px-3 py-1.5 rounded-lg border border-adrena-border">
                    {activeFloor === 'soussol'
                      ? (isAr ? 'طابق سفلي : كمال أجسام وحلبة نزال' : 'Sous-sol : Musculation, Ring & Tatami')
                      : (isAr ? 'طابق أرضي : فضاء نسائي خاص واستقبال' : 'RDC : Espace 100% Femmes & Accueil')}
                  </span>
                  <button
                    type="button"
                    onClick={onOpen360}
                    className="font-bold text-adrena-gold hover:underline bg-adrena-black/90 px-2.5 py-1.5 rounded-lg border border-adrena-border cursor-pointer"
                  >
                    {isAr ? 'جولة 360°' : 'Visite 360°'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
