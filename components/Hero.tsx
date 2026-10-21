'use client';

import React from 'react';
import Image from 'next/image';
import { MessageCircle, Compass } from 'lucide-react';
import { Language, content } from '@/data/content';

interface HeroProps {
  lang: Language;
}

export default function Hero({ lang }: HeroProps) {
  const t = content[lang].hero;
  const isAr = lang === 'ar';

  return (
    <section id="accueil" className="relative pt-28 pb-14 md:pt-36 md:pb-20 overflow-hidden bg-adrena-black border-b border-adrena-border">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-adrena-gold/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Natural, Confident Headline & Purpose */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Location & Status Tag */}
            <div className="inline-flex items-center gap-2 mb-4 text-xs font-semibold text-adrena-stone tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{isAr ? 'باب الزوار (CUB1) • طابقان • مفتوح حتى 00:00' : 'Bab Ezzouar (CUB1) • 2 Niveaux • Ouvert jusqu\'à 00:00'}</span>
            </div>

            {/* Main Statement Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-adrena-bone tracking-tight leading-[1.12] mb-5">
              {t.title}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-adrena-stone max-w-[56ch] font-normal leading-relaxed mb-8">
              {t.subtitle}
            </p>

            {/* Quiet Context Details */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-adrena-muted mb-8 font-medium">
              <span>{isAr ? 'كمال أجسام وكروس ترينينغ' : 'Musculation & Cross-Training'}</span>
              <span className="opacity-30">•</span>
              <span>{isAr ? 'حلبة وبساط فنون قتال' : 'Ring de Boxe & Tatami'}</span>
              <span className="opacity-30">•</span>
              <span className="text-adrena-bone">{isAr ? 'فترات نسائية بدون موسيقى' : 'Créneaux femmes 100% privés'}</span>
              <span className="opacity-30">•</span>
              <span className="text-adrena-gold font-bold">{isAr ? 'من 3 000 دج/شهر' : 'Dès 3 000 DA/mois'}</span>
            </div>

            {/* Primary & Secondary Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="https://wa.me/213771570378?text=Bonjour%20Adrena%20Club,%20je%20souhaite%20r%C3%A9server%20une%20s%C3%A9ance%20d'essai."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-adrena-gold hover:bg-adrena-gold-light text-[#111215] font-bold text-sm tracking-wide transition-all shadow-md active:scale-98"
              >
                <MessageCircle className="w-4 h-4 fill-[#111215]" />
                <span>{isAr ? 'احجز حصتك التجريبية عبر واتساب' : 'Réserver votre séance d\'essai'}</span>
              </a>

              <a
                href="#tour-360"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-adrena-card hover:bg-adrena-surface text-adrena-bone border border-adrena-border font-semibold text-sm transition-all"
              >
                <Compass className="w-4 h-4 text-adrena-gold" />
                <span>{isAr ? 'جولة 360° داخل القاعات' : 'Explorer les 2 étages en 360°'}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Clean, Framed Photography of the Real Gym */}
          <div className="lg:col-span-5 w-full">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-adrena-border bg-[#0E0F13] shadow-xl group">
              <Image
                src="/images/hero/hero-gym-floor.jpg"
                alt="Plateau Musculation Adrena Club Bab Ezzouar"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-103"
                priority
              />

              {/* Subtle dark bottom vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111215]/90 via-transparent to-transparent pointer-events-none" />

              {/* Understated caption */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs text-adrena-bone">
                <span className="font-semibold bg-[#111215]/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-adrena-border">
                  {isAr ? 'قاعة كمال الأجسام والأوزان الحرة (طابق سفلي)' : 'Plateau musculation & charges libres (Sous-Sol)'}
                </span>
                <a
                  href="#tour-360"
                  className="font-medium text-adrena-gold hover:underline flex items-center gap-1 bg-[#111215]/80 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-adrena-border"
                >
                  <span>{isAr ? 'جولة 360°' : 'Visite 360°'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Quiet Human Benefit Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-8 border-t border-adrena-border/60">
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-adrena-bone tracking-tight">2 Niveaux</p>
            <p className="text-xs sm:text-sm text-adrena-muted mt-1">{isAr ? 'كمال أجسام وقتال بالأسفل، استقبال بالأعلى' : 'Plateaux entraînement & accueil séparés'}</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-adrena-bone tracking-tight">00:00</p>
            <p className="text-xs sm:text-sm text-adrena-muted mt-1">{isAr ? 'مفتوح حتى منتصف الليل يومياً' : 'Ouvert tous les soirs jusqu\'à minuit'}</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-adrena-bone tracking-tight">100% Privé</p>
            <p className="text-xs sm:text-sm text-adrena-muted mt-1">{isAr ? 'فترات نسائية بدون موسيقى مع مدربات' : 'Créneaux femmes calmes sans musique'}</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-adrena-gold tracking-tight">4.9 / 5</p>
            <p className="text-xs sm:text-sm text-adrena-muted mt-1">{isAr ? 'أكثر من 160 تقييم Google معتمد' : 'Plus de 160 avis membres vérifiés'}</p>
          </div>
        </div>
      </div>
    </section>
  );
}