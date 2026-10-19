'use client';

import React, { useState } from 'react';
import { Calculator, Sparkles, Check, MessageCircle, Flame, Dumbbell } from 'lucide-react';
import { Language, content } from '@/data/content';
import { formulesMixtesMatrix } from '@/data/pricing';

interface PricingCalculatorProps {
  lang: Language;
}

export default function PricingCalculator({ lang }: PricingCalculatorProps) {
  const t = content[lang].calculator;
  const isAr = lang === 'ar';

  const [formulaType, setFormulaType] = useState<'mixte' | 'muscu' | 'combat'>('mixte');
  const [crossSessions, setCrossSessions] = useState<number>(2);
  const [muscuSessions, setMuscuSessions] = useState<number>(3);
  const [includeSauna, setIncludeSauna] = useState<boolean>(false);
  const [includeNutrition, setIncludeNutrition] = useState<boolean>(false);

  // Standalone muscu pricing
  const muscuStandalonePrice: Record<number, number> = {
    1: 2000,
    2: 3000,
    3: 3500,
    4: 4000,
    5: 4200,
    6: 4500, // unlimited
  };

  // Mixed formula matrix lookup
  const getMixedBasePrice = (cross: number, muscu: number): number => {
    const item = formulesMixtesMatrix.find((f) => f.cross === cross && f.muscu === muscu);
    if (item) return item.price;
    // Safe formula calculation if outside predefined matrix
    return 3000 + (cross - 1) * 600 + (muscu - 1) * 500;
  };

  const calculateTotal = (): number => {
    let base = 0;
    if (formulaType === 'mixte') {
      base = getMixedBasePrice(crossSessions, muscuSessions);
    } else if (formulaType === 'muscu') {
      base = muscuStandalonePrice[muscuSessions] || 3500;
    } else {
      base = 2500; // Combat standalone
    }

    if (includeSauna) base += 2000;
    if (includeNutrition) base += 2000;

    return base;
  };

  const totalPrice = calculateTotal();

  const handleWhatsAppBooking = () => {
    let summaryText = '';
    if (formulaType === 'mixte') {
      summaryText = isAr
        ? `باقة مدمجة (${crossSessions} حصص قتال/كروس + ${muscuSessions} حصص حديد أسبوعياً)`
        : `Pack Mixte (${crossSessions}x combat/cross + ${muscuSessions}x muscu/semaine)`;
    } else if (formulaType === 'muscu') {
      summaryText = isAr
        ? `كمال أجسام (${muscuSessions} حصص أسبوعياً)`
        : `Musculation seule (${muscuSessions} séances/semaine)`;
    } else {
      summaryText = isAr ? 'فنون قتال / كيك بوكسينغ فقط' : 'Combat / Arts martiaux seul';
    }

    if (includeSauna) {
      summaryText += isAr ? ' + حصة ساونا' : ' + 1 séance Sauna';
    }
    if (includeNutrition) {
      summaryText += isAr ? ' + برنامج تغذية' : ' + Suivi Nutrition';
    }

    const message = isAr
      ? `السلام عليكم نادي أدرينا سبورت، قمت بحساب اشتراكي عبر الموقع: ${summaryText} بمجموع (${totalPrice} دج شهرياً). أود تأكيد التسجيل ومعرفة الوثائق المطلوبة.`
      : `Bonjour Adréna Club, j'ai configuré ma formule via votre calculateur en ligne : ${summaryText} pour un total de ${totalPrice} DA/mois. Comment finaliser mon inscription ?`;

    window.open(`https://wa.me/213771570378?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="mb-16 p-6 sm:p-8 rounded-3xl bg-adrena-card/90 border border-adrena-border shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-adrena-border">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-adrena-gold/10 border border-adrena-gold/30 text-adrena-gold text-xs font-display font-semibold uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>{isAr ? 'حاسبة الاشتراكات الرسمية' : 'Simulateur Officiel'}</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
            {t.title}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 mt-1">
            {t.subtitle}
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium self-start md:self-auto">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isAr ? 'وفورات الباقات المدمجة' : 'Meilleur rapport sport / prix'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Base Formula */}
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-neutral-300 mb-3 font-display">
              {t.step1Title}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Type de formule">
              <button
                type="button"
                role="radio"
                aria-checked={formulaType === 'mixte'}
                onClick={() => setFormulaType('mixte')}
                className={`p-4 rounded-2xl text-left rtl:text-right border transition-all ${
                  formulaType === 'mixte'
                    ? 'bg-adrena-gold/15 border-adrena-gold shadow-lg shadow-adrena-gold/10 ring-1 ring-adrena-gold/40'
                    : 'bg-black/40 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display font-bold text-base text-white flex items-center gap-2">
                    <Flame className="w-5 h-5 text-adrena-gold" />
                    {t.mixteOption}
                  </span>
                  {formulaType === 'mixte' && (
                    <span className="w-2.5 h-2.5 rounded-full bg-adrena-gold" />
                  )}
                </div>
                <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                  {t.mixteDesc}
                </p>
              </button>

              <button
                type="button"
                role="radio"
                aria-checked={formulaType === 'muscu'}
                onClick={() => setFormulaType('muscu')}
                className={`p-4 rounded-2xl text-left rtl:text-right border transition-all ${
                  formulaType === 'muscu'
                    ? 'bg-adrena-gold/15 border-adrena-gold shadow-lg shadow-adrena-gold/10 ring-1 ring-adrena-gold/40'
                    : 'bg-black/40 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display font-bold text-base text-white flex items-center gap-2">
                    <Dumbbell className="w-5 h-5 text-neutral-300" />
                    {t.muscuOption}
                  </span>
                  {formulaType === 'muscu' && (
                    <span className="w-2.5 h-2.5 rounded-full bg-adrena-gold" />
                  )}
                </div>
                <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                  {t.muscuDesc}
                </p>
              </button>
            </div>
          </div>

          {/* Step 2: Frequency Selectors */}
          {formulaType === 'mixte' && (
            <div className="p-5 rounded-2xl bg-black/50 border border-white/10 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-sm font-bold uppercase tracking-wider text-neutral-200 font-display">
                    {t.combatLabel}
                  </label>
                  <span className="font-mono text-xs sm:text-sm font-bold text-adrena-gold bg-adrena-gold/15 border border-adrena-gold/30 px-2.5 py-1 rounded-md">
                    {crossSessions} {isAr ? 'حصص / أسبوع' : 'séances / semaine'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2.5" role="radiogroup">
                  {[1, 2, 3].map((num) => (
                    <button
                      key={num}
                      type="button"
                      role="radio"
                      aria-checked={crossSessions === num}
                      onClick={() => setCrossSessions(num)}
                      className={`py-3 px-3 rounded-xl text-sm font-bold transition-all ${
                        crossSessions === num
                          ? 'bg-adrena-gold text-black shadow-md font-black'
                          : 'bg-white/5 text-neutral-200 hover:text-white hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      {num} {isAr ? 'حصص' : num > 1 ? 'séances' : 'séance'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-sm font-bold uppercase tracking-wider text-neutral-200 font-display">
                    {isAr ? 'عدد حصص كمال الأجسام أسبوعياً' : 'Séances de Musculation par semaine'}
                  </label>
                  <span className="font-mono text-xs sm:text-sm font-bold text-adrena-gold bg-adrena-gold/15 border border-adrena-gold/30 px-2.5 py-1 rounded-md">
                    {muscuSessions} {isAr ? 'حصص / أسبوع' : 'séances / semaine'}
                  </span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2" role="radiogroup">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <button
                      key={num}
                      type="button"
                      role="radio"
                      aria-checked={muscuSessions === num}
                      onClick={() => setMuscuSessions(num)}
                      className={`py-3 rounded-xl text-sm font-bold transition-all ${
                        muscuSessions === num
                          ? 'bg-white text-black shadow-md font-black'
                          : 'bg-white/5 text-neutral-200 hover:text-white hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      {num}x
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {formulaType === 'muscu' && (
            <div className="p-5 rounded-2xl bg-black/50 border border-white/10">
              <label className="block text-sm font-bold uppercase tracking-wider text-neutral-200 font-display mb-3">
                {isAr ? 'وتيرة التدريب في الأسبوع' : 'Fréquence hebdomadaire'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2" role="radiogroup">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <button
                    key={num}
                    type="button"
                    role="radio"
                    aria-checked={muscuSessions === num}
                    onClick={() => setMuscuSessions(num)}
                    className={`py-3 rounded-xl text-sm font-bold transition-all ${
                      muscuSessions === num
                        ? 'bg-adrena-gold text-black shadow-md font-black'
                        : 'bg-white/5 text-neutral-200 hover:text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {num === 6 ? (isAr ? 'غير محدود' : 'Illimité') : `${num}x / sem`}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Optional Add-ons */}
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-neutral-300 mb-2.5 font-display">
              {isAr ? 'خدمات إضافية اختيارية' : 'Options bien-être & récupération'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                role="checkbox"
                aria-checked={includeSauna}
                onClick={() => setIncludeSauna(!includeSauna)}
                className={`p-4 rounded-xl border text-left rtl:text-right flex items-center justify-between transition-all ${
                  includeSauna
                    ? 'bg-adrena-gold/15 border-adrena-gold text-white shadow-sm'
                    : 'bg-black/40 border-white/10 text-neutral-300 hover:border-white/20'
                }`}
              >
                <div>
                  <p className="text-sm sm:text-base font-bold text-white">
                    {isAr ? 'حصة ساونا ومسبح (1h15)' : 'Séance Sauna & Piscine (1h15)'}
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-adrena-gold mt-0.5">+2 000 DA {isAr ? '/ حصة' : '/ séance'}</p>
                </div>
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors ${
                    includeSauna ? 'bg-adrena-gold border-adrena-gold text-black' : 'border-neutral-500 bg-black/40'
                  }`}
                >
                  {includeSauna && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
              </button>

              <button
                type="button"
                role="checkbox"
                aria-checked={includeNutrition}
                onClick={() => setIncludeNutrition(!includeNutrition)}
                className={`p-4 rounded-xl border text-left rtl:text-right flex items-center justify-between transition-all ${
                  includeNutrition
                    ? 'bg-adrena-gold/15 border-adrena-gold text-white shadow-sm'
                    : 'bg-black/40 border-white/10 text-neutral-300 hover:border-white/20'
                }`}
              >
                <div>
                  <p className="text-sm sm:text-base font-bold text-white">
                    {isAr ? 'متابعة أخصائي التغذية' : 'Bilan & Suivi Nutritionniste'}
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-adrena-gold mt-0.5">+2 000 DA {isAr ? '/ برنامج' : '/ programme'}</p>
                </div>
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors ${
                    includeNutrition ? 'bg-adrena-gold border-adrena-gold text-black' : 'border-neutral-500 bg-black/40'
                  }`}
                >
                  {includeNutrition && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Calculated Price Card (5 cols) */}
        <div className="lg:col-span-5">
          <div className="p-6 sm:p-7 rounded-2xl bg-neutral-900 border border-adrena-gold/40 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-adrena-gold/40 via-adrena-gold to-adrena-gold/40" />

            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-300 font-display block mb-1">
              {t.totalLabel}
            </span>

            <div className="flex items-baseline gap-2.5 mb-4">
              <span className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight">
                {totalPrice.toLocaleString('fr-FR')}
              </span>
              <span className="font-display text-xl sm:text-2xl font-black text-adrena-gold">
                {isAr ? 'دج / شهر' : 'DA / mois'}
              </span>
            </div>

            {/* Inclusions Callout */}
            <div className="p-4 rounded-xl bg-black/70 border border-white/10 text-sm text-neutral-200 space-y-2.5 mb-6">
              <div className="flex items-center gap-2 text-adrena-gold font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>{t.savingsTag}</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-neutral-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{isAr ? 'الدخول للغرف والدوشات الساخنة مشمول' : 'Accès douches chaudes & vestiaires inclus'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{isAr ? 'تأطير تقني وحرية التوقيت' : 'Encadrement par coachs diplômés'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{isAr ? 'لا توجد أي رسوم تسجيل خفية' : 'Tarifs transparents sans frais cachés'}</span>
                </li>
              </ul>
            </div>

            {/* WhatsApp CTA */}
            <button
              type="button"
              onClick={handleWhatsAppBooking}
              className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl bg-adrena-gold hover:bg-adrena-gold-light text-black font-display font-black text-base uppercase tracking-wider transition-all duration-200 shadow-xl active:scale-95"
            >
              <MessageCircle className="w-5 h-5 fill-black" />
              <span>{t.ctaWhatsapp}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
