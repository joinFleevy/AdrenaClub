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
    return item ? item.price : 4800;
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
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3 font-display">
              {t.step1Title}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormulaType('mixte')}
                className={`p-4 rounded-2xl text-left rtl:text-right border transition-all ${
                  formulaType === 'mixte'
                    ? 'bg-adrena-gold/15 border-adrena-gold shadow-lg shadow-adrena-gold/10'
                    : 'bg-black/40 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-display font-bold text-sm text-white flex items-center gap-2">
                    <Flame className="w-4 h-4 text-adrena-gold" />
                    {t.mixteOption}
                  </span>
                  {formulaType === 'mixte' && (
                    <span className="w-2 h-2 rounded-full bg-adrena-gold" />
                  )}
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {t.mixteDesc}
                </p>
              </button>

              <button
                type="button"
                onClick={() => setFormulaType('muscu')}
                className={`p-4 rounded-2xl text-left rtl:text-right border transition-all ${
                  formulaType === 'muscu'
                    ? 'bg-adrena-gold/15 border-adrena-gold shadow-lg shadow-adrena-gold/10'
                    : 'bg-black/40 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-display font-bold text-sm text-white flex items-center gap-2">
                    <Dumbbell className="w-4 h-4 text-neutral-400" />
                    {t.muscuOption}
                  </span>
                  {formulaType === 'muscu' && (
                    <span className="w-2 h-2 rounded-full bg-adrena-gold" />
                  )}
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {t.muscuDesc}
                </p>
              </button>
            </div>
          </div>

          {/* Step 2: Frequency Selectors */}
          {formulaType === 'mixte' && (
            <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 font-display">
                    {t.combatLabel}
                  </label>
                  <span className="font-mono text-xs font-bold text-adrena-gold bg-adrena-gold/10 px-2 py-0.5 rounded">
                    {crossSessions} {isAr ? 'حصص/أسبوع' : 'séances/sem'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setCrossSessions(num)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        crossSessions === num
                          ? 'bg-adrena-gold text-black shadow-md'
                          : 'bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10 border border-white/5'
                      }`}
                    >
                      {num} {isAr ? 'حصص' : num > 1 ? 'séances' : 'séance'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 font-display">
                    {isAr ? 'عدد حصص كمال الأجسام أسبوعياً' : 'Séances de Musculation par semaine'}
                  </label>
                  <span className="font-mono text-xs font-bold text-adrena-gold bg-adrena-gold/10 px-2 py-0.5 rounded">
                    {muscuSessions} {isAr ? 'حصص/أسبوع' : 'séances/sem'}
                  </span>
                </div>
                <div className="grid grid-cols-6 gap-1.5">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setMuscuSessions(num)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        muscuSessions === num
                          ? 'bg-white text-black shadow-md'
                          : 'bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10 border border-white/5'
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
            <div className="p-5 rounded-2xl bg-black/40 border border-white/5">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 font-display mb-3">
                {isAr ? 'وتيرة التدريب في الأسبوع' : 'Fréquence hebdomadaire'}
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setMuscuSessions(num)}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                      muscuSessions === num
                        ? 'bg-adrena-gold text-black shadow-md'
                        : 'bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10 border border-white/5'
                    }`}
                  >
                    {num === 6 ? (isAr ? 'غير محدود' : 'Illimité') : `${num}x/sem`}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Optional Add-ons */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 font-display">
              {isAr ? 'خدمات إضافية اختيارية' : 'Options bien-être & récupération'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIncludeSauna(!includeSauna)}
                className={`p-3.5 rounded-xl border text-left rtl:text-right flex items-center justify-between transition-all ${
                  includeSauna
                    ? 'bg-adrena-gold/10 border-adrena-gold/60 text-white'
                    : 'bg-black/30 border-white/5 text-neutral-400 hover:border-white/20'
                }`}
              >
                <div>
                  <p className="text-xs font-bold text-white">
                    {isAr ? 'حصة ساونا ومسبح (1h15)' : 'Séance Sauna & Piscine (1h15)'}
                  </p>
                  <p className="text-[11px] text-neutral-400">+2 000 DA {isAr ? '/ حصة' : '/ séance'}</p>
                </div>
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                    includeSauna ? 'bg-adrena-gold border-adrena-gold text-black' : 'border-neutral-600'
                  }`}
                >
                  {includeSauna && <Check className="w-3.5 h-3.5" />}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setIncludeNutrition(!includeNutrition)}
                className={`p-3.5 rounded-xl border text-left rtl:text-right flex items-center justify-between transition-all ${
                  includeNutrition
                    ? 'bg-adrena-gold/10 border-adrena-gold/60 text-white'
                    : 'bg-black/30 border-white/5 text-neutral-400 hover:border-white/20'
                }`}
              >
                <div>
                  <p className="text-xs font-bold text-white">
                    {isAr ? 'متابعة أخصائي التغذية' : 'Bilan & Suivi Nutritionniste'}
                  </p>
                  <p className="text-[11px] text-neutral-400">+2 000 DA {isAr ? '/ برنامج' : '/ programme'}</p>
                </div>
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                    includeNutrition ? 'bg-adrena-gold border-adrena-gold text-black' : 'border-neutral-600'
                  }`}
                >
                  {includeNutrition && <Check className="w-3.5 h-3.5" />}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Calculated Price Card (5 cols) */}
        <div className="lg:col-span-5">
          <div className="p-6 sm:p-7 rounded-2xl bg-neutral-900 border border-adrena-gold/30 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-adrena-gold/40 via-adrena-gold to-adrena-gold/40" />

            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-display block mb-1">
              {t.totalLabel}
            </span>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight">
                {totalPrice.toLocaleString('fr-FR')}
              </span>
              <span className="font-display text-lg font-bold text-adrena-gold">
                {isAr ? 'دج / شهر' : 'DA / mois'}
              </span>
            </div>

            {/* Savings Callout */}
            <div className="p-3 rounded-xl bg-black/60 border border-white/5 text-xs text-neutral-300 space-y-2 mb-6">
              <div className="flex items-center gap-2 text-adrena-gold font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.savingsTag}</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-neutral-400">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-adrena-gold flex-shrink-0" />
                  <span>{isAr ? 'الدخول للغرف والدوشات الساخنة مشمول' : 'Accès douches & vestiaires inclus'}</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-adrena-gold flex-shrink-0" />
                  <span>{isAr ? 'تأطير تقني وحرية التوقيت' : 'Encadrement par coachs diplômés'}</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-adrena-gold flex-shrink-0" />
                  <span>{isAr ? 'لا توجد أي رسوم تسجيل خفية' : 'Tarifs transparents sans frais cachés'}</span>
                </li>
              </ul>
            </div>

            {/* WhatsApp CTA */}
            <button
              type="button"
              onClick={handleWhatsAppBooking}
              className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl bg-adrena-gold hover:bg-adrena-gold/90 text-adrena-black font-display font-black text-sm uppercase tracking-wider transition-all duration-200 shadow-lg shadow-adrena-gold/20"
            >
              <MessageCircle className="w-4 h-4 fill-black" />
              <span>{t.ctaWhatsapp}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
