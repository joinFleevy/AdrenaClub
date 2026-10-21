'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MessageCircle, Compass, Layers, ShieldCheck, Clock, MapPin, Zap } from 'lucide-react';
import { Language, content } from '@/data/content';

interface HeroProps {
  lang: Language;
}

export default function Hero({ lang }: HeroProps) {
  const t = content[lang].hero;
  const isAr = lang === 'ar';
  const [activeBay, setActiveBay] = useState<'soussol' | 'rdc'>('soussol');

  return (
    <section id="accueil" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-adrena-black border-b border-adrena-border">
      {/* High-Voltage Adrena Gold Ambient Lighting */}
      <div className="absolute top-0 right-1/4 w-[650px] h-[650px] bg-adrena-gold/15 blur-[180px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-adrena-gold/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: High-Impact Athletic Statement */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Athletic Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-adrena-gold/15 border border-adrena-gold/40 text-xs font-black uppercase tracking-wider text-adrena-gold mb-6 w-fit shadow-sm">
              <Zap className="w-3.5 h-3.5 fill-adrena-gold text-adrena-gold" />
              <span>{isAr ? 'باب الزوار (CUB1) • طابقان مخصصان • مفتوح حتى 00:00' : 'Bab Ezzouar (CUB1) • Complexe sur 2 Étages • Ouvert jusqu\'à 00:00'}</span>
            </div>

            {/* Giant Athletic Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.04] mb-6">
              <span className="block">{isAr ? 'اصنع قوتك الرياضية.' : 'DOMINEZ VOTRE FORCE.'}</span>
              <span className="block text-adrena-gold mt-1.5">{isAr ? 'في أكبر مجمع بباب الزوار.' : 'LE COMPLEXE MAJEUR DE BAB EZZOUAR.'}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-adrena-stone max-w-[56ch] font-medium leading-relaxed mb-8">
              {isAr
                ? 'طابقان مجهزان بأقوى عتاد كمال الأجسام والقوة البدنية، حلبة ملاكمة وبساط نزال معتمد، وفضاء نسائي خاص 100% بدون موسيقى.'
                : 'Deux niveaux dédiés à la performance pure : plateau musculation lourd & charges libres, ring de combat et tatami officiel, et sanctuaire 100% femmes sans musique.'}
            </p>

            {/* Athletic Proof Chips */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm mb-9">
              <span className="px-3 py-1.5 rounded-lg bg-adrena-card border border-adrena-border text-white font-bold flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-adrena-gold" />
                <span>{isAr ? 'حديد حر وأجهزة احترافية' : 'Plateau Force & Muscu Pro'}</span>
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-adrena-card border border-adrena-border text-white font-bold flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-adrena-gold" />
                <span>{isAr ? 'حلبة وبساط فنون قتال' : 'Ring de Boxe & Tatami MMA'}</span>
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-adrena-card border border-adrena-gold/50 text-adrena-gold font-bold flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{isAr ? 'فترات نسائية 100% بدون موسيقى' : '100% Femmes & Sans Musique'}</span>
              </span>
            </div>

            {/* High-Contrast Conversion Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <a
                href="https://wa.me/213771570378?text=Bonjour%20Adrena%20Club,%20je%20souhaite%20r%C3%A9server%20une%20s%C3%A9ance%20d'essai."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-adrena-gold hover:bg-adrena-gold-light text-black font-extrabold text-sm sm:text-base tracking-wide transition-all shadow-xl hover:shadow-adrena-gold/25 active:scale-98"
              >
                <MessageCircle className="w-5 h-5 fill-black" />
                <span>{isAr ? 'احجز حصتك التجريبية عبر واتساب' : 'Réserver votre séance d\'essai'}</span>
              </a>

              <a
                href="#tour-360"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-adrena-card hover:bg-adrena-surface text-white border border-adrena-border hover:border-adrena-gold font-bold text-sm sm:text-base transition-all shadow-md"
              >
                <Compass className="w-5 h-5 text-adrena-gold" />
                <span>{isAr ? 'جولة 360° داخل القاعات' : 'Explorer les 2 étages en 360°'}</span>
              </a>
            </div>
          </div>

          {/* Right Column: High-Impact Real Facility Viewport */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-2xl overflow-hidden border-2 border-adrena-border hover:border-adrena-gold/40 transition-colors bg-adrena-card shadow-2xl">
              
              {/* Floor Switcher Selector Tabs */}
              <div className="flex items-center border-b border-adrena-border bg-[#0D0E12] p-1.5 gap-1.5 text-xs font-extrabold">
                <button
                  type="button"
                  onClick={() => setActiveBay('soussol')}
                  className={`flex-1 py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                    activeBay === 'soussol'
                      ? 'bg-adrena-gold text-black shadow-lg font-black'
                      : 'text-adrena-stone hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>{isAr ? 'الطابق السفلي : الحديد والقتال' : 'Sous-Sol : Muscu & Combat'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveBay('rdc')}
                  className={`flex-1 py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                    activeBay === 'rdc'
                      ? 'bg-adrena-gold text-black shadow-lg font-black'
                      : 'text-adrena-stone hover:text-white hover:bg-white/5'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isAr ? 'الطابق الأرضي : الاستقبال والنساء' : 'RDC : Accueil & Espace Femmes'}</span>
                </button>
              </div>

              {/* Viewport Photo */}
              <div className="relative aspect-[4/3] w-full bg-[#08090B]">
                {activeBay === 'soussol' ? (
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

                {/* Dramatic bottom vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-transparent to-transparent pointer-events-none" />

                {/* Real Facility Caption */}
                <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-xs text-white">
                  <span className="font-bold bg-[#0D0E12]/90 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-adrena-border">
                    {activeBay === 'soussol'
                      ? (isAr ? 'قاعة كمال الأجسام والأوزان الحرة (طابق سفلي)' : 'Plateau musculation & charges libres (Sous-Sol)')
                      : (isAr ? 'مكتب الاستقبال والبوابات الإلكترونية (طابق أرضي)' : 'Comptoir accueil & tourniquets RFID (RDC)')}
                  </span>
                  <a
                    href="#tour-360"
                    className="font-bold text-adrena-gold hover:underline flex items-center gap-1 bg-[#0D0E12]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-adrena-border"
                  >
                    <span>{isAr ? 'جولة 360°' : 'Visite 360°'}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Industrial Athletic Ledger */}
        <div className="mt-14 pt-8 border-t border-adrena-border grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-adrena-card border border-adrena-border hover:border-adrena-gold/40 transition-colors shadow-sm">
            <div className="flex items-center gap-2 text-adrena-gold font-bold mb-1">
              <MapPin className="w-4 h-4 text-adrena-gold shrink-0" />
              <span>{isAr ? 'الموقع' : 'Emplacement'}</span>
            </div>
            <p className="font-extrabold text-white text-sm sm:text-base">{isAr ? 'باب الزوار (CUB1)' : 'Bab Ezzouar (CUB1)'}</p>
            <p className="text-adrena-muted text-xs mt-0.5">{isAr ? 'موقف سيارات مجاني بجانب القاعة' : 'Parking CUB1 gratuit sur place'}</p>
          </div>

          <div className="p-4 rounded-xl bg-adrena-card border border-adrena-border hover:border-adrena-gold/40 transition-colors shadow-sm">
            <div className="flex items-center gap-2 text-adrena-gold font-bold mb-1">
              <Clock className="w-4 h-4 text-adrena-gold shrink-0" />
              <span>{isAr ? 'أوقات العمل' : 'Amplitude'}</span>
            </div>
            <p className="font-extrabold text-white text-sm sm:text-base">06:00 — 00:00 (7j/7)</p>
            <p className="text-adrena-muted text-xs mt-0.5">{isAr ? 'مفتوح حتى منتصف الليل يومياً' : 'Nocturne hommes jusqu\'à minuit'}</p>
          </div>

          <div className="p-4 rounded-xl bg-adrena-card border border-adrena-border hover:border-adrena-gold/40 transition-colors shadow-sm">
            <div className="flex items-center gap-2 text-adrena-gold font-bold mb-1">
              <ShieldCheck className="w-4 h-4 text-adrena-gold shrink-0" />
              <span>{isAr ? 'فضاء نسائي' : 'Sanctuaire'}</span>
            </div>
            <p className="font-extrabold text-white text-sm sm:text-base">{isAr ? '100% خصوصية تامة' : '100% Privé & Zéro Musique'}</p>
            <p className="text-adrena-muted text-xs mt-0.5">{isAr ? 'طابق أرضي مخصص بدون موسيقى' : 'Créneaux calmes avec coachs femmes'}</p>
          </div>

          <div className="p-4 rounded-xl bg-adrena-card border border-adrena-border hover:border-adrena-gold/40 transition-colors shadow-sm">
            <div className="flex items-center gap-2 text-adrena-gold font-bold mb-1">
              <Layers className="w-4 h-4 text-adrena-gold shrink-0" />
              <span>{isAr ? 'الاشتراكات' : 'Tarifs'}</span>
            </div>
            <p className="font-extrabold text-adrena-gold text-sm sm:text-base">{isAr ? 'من 2 500 دج / شهر' : 'Dès 2 500 DA / mois'}</p>
            <p className="text-adrena-muted text-xs mt-0.5">{isAr ? 'أطفال 2500 دج • كبار 4500 دج' : 'Enfants 2500 DA • Muscu 4500 DA'}</p>
          </div>
        </div>
      </div>
    </section>
  );
}