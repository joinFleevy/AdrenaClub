'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MessageCircle, Compass, Layers, ShieldCheck, Clock, MapPin } from 'lucide-react';
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
      {/* Architectural Cedar & Gold Ambient Lighting */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#A06E3B]/10 blur-[180px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#D49B2E]/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Authoritative Editorial Statement */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Architectural Location & Status Anchor */}
            <div className="inline-flex items-center gap-2 mb-4 text-xs font-bold text-adrena-stone tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{isAr ? 'باب الزوار (CUB1) • طابقان مخصصان • مفتوح حتى 00:00' : 'Bab Ezzouar (CUB1) • Complexe sur 2 Niveaux • Ouvert jusqu\'à 00:00'}</span>
            </div>

            {/* Main Statement Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-adrena-bone tracking-tight leading-[1.12] mb-5">
              {t.title}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-adrena-stone max-w-[56ch] font-normal leading-relaxed mb-8">
              {t.subtitle}
            </p>

            {/* Architectural Discipline Tags */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:text-sm text-adrena-muted mb-9 font-medium">
              <span className="px-2.5 py-1 rounded-md bg-adrena-card border border-adrena-border text-adrena-bone font-semibold">
                {isAr ? 'كمال أجسام وكروس ترينينغ' : 'Plateau Musculation & Force'}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-adrena-card border border-adrena-border text-adrena-bone font-semibold">
                {isAr ? 'حلبة وبساط فنون قتال' : 'Ring de Boxe & Tatami'}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-adrena-card border border-adrena-border text-adrena-gold font-semibold">
                {isAr ? 'فترات نسائية بدون موسيقى' : 'Espace 100% Femmes & Sans Musique'}
              </span>
            </div>

            {/* Primary & Secondary Conversion Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="https://wa.me/213771570378?text=Bonjour%20Adrena%20Club,%20je%20souhaite%20r%C3%A9server%20une%20s%C3%A9ance%20d'essai."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-adrena-gold hover:bg-adrena-gold-light text-[#111215] font-bold text-sm tracking-wide transition-all shadow-lg active:scale-98"
              >
                <MessageCircle className="w-4 h-4 fill-[#111215]" />
                <span>{isAr ? 'احجز حصتك التجريبية عبر واتساب' : 'Réserver votre séance d\'essai'}</span>
              </a>

              <a
                href="#tour-360"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-adrena-card hover:bg-adrena-surface text-adrena-bone border border-adrena-border hover:border-adrena-gold/50 font-semibold text-sm transition-all"
              >
                <Compass className="w-4 h-4 text-adrena-gold" />
                <span>{isAr ? 'استكشف الطابقين في جولة 360°' : 'Explorer les 2 étages en 360°'}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Architectural Bay Showcase */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-2xl overflow-hidden border border-adrena-border bg-adrena-card shadow-2xl">
              
              {/* Floor Switcher Selector Tabs */}
              <div className="flex items-center border-b border-adrena-border bg-[#111215]/95 p-1.5 gap-1.5 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveBay('soussol')}
                  className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                    activeBay === 'soussol'
                      ? 'bg-adrena-gold text-black shadow-md font-bold'
                      : 'text-adrena-stone hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{isAr ? 'الطابق السفلي (الحديد والقتال)' : 'Sous-Sol : Musculation & Combat'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveBay('rdc')}
                  className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                    activeBay === 'rdc'
                      ? 'bg-adrena-gold text-black shadow-md font-bold'
                      : 'text-adrena-stone hover:text-white hover:bg-white/5'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{isAr ? 'الأرضي (الاستقبال والنساء)' : 'RDC : Accueil & Espace Femmes'}</span>
                </button>
              </div>

              {/* Viewport Photo */}
              <div className="relative aspect-[4/3] w-full bg-[#0E0F13]">
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

                {/* Subtle dark vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111215]/95 via-transparent to-transparent pointer-events-none" />

                {/* Architectural Caption */}
                <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-xs text-adrena-bone">
                  <span className="font-semibold bg-[#111215]/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-adrena-border">
                    {activeBay === 'soussol'
                      ? (isAr ? 'قاعة كمال الأجسام والأوزان الحرة (طابق سفلي)' : 'Plateau musculation & charges libres (Sous-Sol)')
                      : (isAr ? 'مكتب الاستقبال والبوابات الإلكترونية (طابق أرضي)' : 'Comptoir accueil & tourniquets RFID (RDC)')}
                  </span>
                  <a
                    href="#tour-360"
                    className="font-medium text-adrena-gold hover:underline flex items-center gap-1 bg-[#111215]/85 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-adrena-border"
                  >
                    <span>{isAr ? 'جولة 360°' : 'Visite 360°'}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Architectural Facility Ledger (Concrete Specifications Strip) */}
        <div className="mt-12 pt-8 border-t border-adrena-border grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-xs sm:text-sm">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-adrena-card/40 border border-adrena-border/60">
            <MapPin className="w-4 h-4 text-adrena-gold shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-adrena-bone">{isAr ? 'باب الزوار (CUB1)' : 'Bab Ezzouar (CUB1)'}</p>
              <p className="text-adrena-muted text-xs mt-0.5">{isAr ? 'موقف سيارات مجاني بجانب القاعة' : 'Parking CUB1 gratuit sur place'}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-adrena-card/40 border border-adrena-border/60">
            <Clock className="w-4 h-4 text-adrena-gold shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-adrena-bone">{isAr ? '06:00 — 00:00 (7j/7)' : '06:00 — 00:00 (7j/7)'}</p>
              <p className="text-adrena-muted text-xs mt-0.5">{isAr ? 'مفتوح حتى منتصف الليل يومياً' : 'Nocturne hommes jusqu\'à minuit'}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-adrena-card/40 border border-adrena-border/60">
            <ShieldCheck className="w-4 h-4 text-adrena-gold shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-adrena-bone">{isAr ? 'خصوصية 100% نساء' : '100% Privé & Zéro Musique'}</p>
              <p className="text-adrena-muted text-xs mt-0.5">{isAr ? 'طابق أرضي مخصص بدون موسيقى' : 'Créneaux calmes avec coachs femmes'}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-adrena-card/40 border border-adrena-border/60">
            <Layers className="w-4 h-4 text-adrena-gold shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-adrena-bone">{isAr ? 'من 2 500 دج / شهر' : 'Dès 2 500 DA / mois'}</p>
              <p className="text-adrena-muted text-xs mt-0.5">{isAr ? 'أطفال 2500 دج • كبار 4500 دج' : 'Enfants 2500 DA • Muscu 4500 DA'}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}