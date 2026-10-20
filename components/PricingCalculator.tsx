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
    <div className="mb-16 p-6 sm:p-8 rounded-3xl bg-adrena-card border border-adrena-border shadow-xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-adrena-border">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-adrena-surface border border-adrena-border text-adrena-gold text-xs font-semibold mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>{isAr ? 'حاسبة الاشتراكات الرسمية' : 'Simulateur d\'abonnement'}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-adrena-bone tracking-tight">
            {t.title}
          </h3>
          <p className="text-xs sm:text-sm text-adrena-stone mt-1">
            {t.subtitle}
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 text-xs font-medium self-start md:self-auto">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isAr ? 'وفورات الباقات المدمجة' : 'Meilleur rapport sport / prix'}</span>
        </div>
      </div>

      {/* Real-time Mobile Price Bar (Visible only on mobile screens so user never loses sight of total) */}
      <div className="block lg:hidden mb-6 p-4 rounded-xl bg-adrena-surface border border-adrena-gold/50 shadow-md">
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-adrena-stone block">
              {isAr ? 'المجموع المحسوب' : 'Total en temps réel'}
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold text-adrena-gold">
                {totalPrice.toLocaleString('fr-FR')}
              </span>
              <span className="text-xs font-bold text-adrena-bone">
                {isAr ? 'دج / شهر' : 'DA / mois'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleWhatsAppBooking}
            className="flex items-center gap-2 py-2 px-3.5 rounded-xl bg-adrena-gold hover:bg-adrena-gold-light text-[#111215] font-bold text-xs shadow-sm active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-[#111215]" />
            <span>{isAr ? 'تأكيد عبر واتساب' : 'S\'inscrire'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Base Formula */}
          <div>
            <label className="block text-sm font-semibold text-adrena-bone mb-3">
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
                    ? 'bg-adrena-surface border-adrena-gold shadow-md ring-1 ring-adrena-gold/40'
                    : 'bg-adrena-surface/50 border-adrena-border hover:border-neutral-600'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-base text-adrena-bone flex items-center gap-2">
                    <Flame className="w-5 h-5 text-adrena-gold" />
                    {t.mixteOption}
                  </span>
                  {formulaType === 'mixte' && (
                    <span className="w-2.5 h-2.5 rounded-full bg-adrena-gold" />
                  )}
                </div>
                <p className="text-sm text-adrena-stone leading-relaxed font-sans">
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
                    ? 'bg-adrena-surface border-adrena-gold shadow-md ring-1 ring-adrena-gold/40'
                    : 'bg-adrena-surface/50 border-adrena-border hover:border-neutral-600'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-base text-adrena-bone flex items-center gap-2">
                    <Dumbbell className="w-5 h-5 text-adrena-stone" />
                    {t.muscuOption}
                  </span>
                  {formulaType === 'muscu' && (
                    <span className="w-2.5 h-2.5 rounded-full bg-adrena-gold" />
                  )}
                </div>
                <p className="text-sm text-adrena-stone leading-relaxed font-sans">
                  {t.muscuDesc}
                </p>
              </button>
            </div>
          </div>

          {/* Step 2: Frequency Selectors */}
          {formulaType === 'mixte' && (
            <div className="p-5 rounded-2xl bg-adrena-surface/70 border border-adrena-border space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-sm font-semibold text-adrena-bone">
                    {t.combatLabel}
                  </label>
                  <span className="font-mono text-xs sm:text-sm font-bold text-adrena-gold bg-adrena-surface border border-adrena-border px-2.5 py-1 rounded-md">
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
                          ? 'bg-adrena-gold text-[#111215] shadow-sm'
                          : 'bg-adrena-surface text-adrena-stone hover:text-adrena-bone hover:bg-[#252830] border border-adrena-border'
                      }`}
                    >
                      {num} {isAr ? 'حصص' : num > 1 ? 'séances' : 'séance'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-sm font-semibold text-adrena-bone">
                    {isAr ? 'عدد حصص كمال الأجسام أسبوعياً' : 'Séances de Musculation par semaine'}
                  </label>
                  <span className="font-mono text-xs sm:text-sm font-bold text-adrena-gold bg-adrena-surface border border-adrena-border px-2.5 py-1 rounded-md">
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
                          ? 'bg-adrena-bone text-[#111215] shadow-sm'
                          : 'bg-adrena-surface text-adrena-stone hover:text-adrena-bone hover:bg-[#252830] border border-adrena-border'
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
            <div className="p-5 rounded-2xl bg-adrena-surface/70 border border-adrena-border">
              <label className="block text-sm font-semibold text-adrena-bone mb-3">
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
                        ? 'bg-adrena-gold text-[#111215] shadow-sm'
                        : 'bg-adrena-surface text-adrena-stone hover:text-adrena-bone hover:bg-[#252830] border border-adrena-border'
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
            <label className="block text-sm font-semibold text-adrena-stone mb-2.5">
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
                    ? 'bg-adrena-surface border-adrena-gold text-adrena-bone shadow-sm'
                    : 'bg-adrena-surface/50 border-adrena-border text-adrena-stone hover:border-neutral-600'
                }`}
              >
                <div>
                  <p className="text-sm sm:text-base font-bold text-adrena-bone">
                    {isAr ? 'حصة ساونا ومسبح (1h15)' : 'Séance Sauna & Piscine (1h15)'}
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-adrena-gold mt-0.5">+2 000 DA {isAr ? '/ حصة' : '/ séance'}</p>
                </div>
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors ${
                    includeSauna ? 'bg-adrena-gold border-adrena-gold text-[#111215]' : 'border-neutral-600 bg-adrena-card'
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
                    ? 'bg-adrena-surface border-adrena-gold text-adrena-bone shadow-sm'
                    : 'bg-adrena-surface/50 border-adrena-border text-adrena-stone hover:border-neutral-600'
                }`}
              >
                <div>
                  <p className="text-sm sm:text-base font-bold text-adrena-bone">
                    {isAr ? 'متابعة أخصائي التغذية' : 'Bilan & Suivi Nutritionniste'}
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-adrena-gold mt-0.5">+2 000 DA {isAr ? '/ برنامج' : '/ programme'}</p>
                </div>
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors ${
                    includeNutrition ? 'bg-adrena-gold border-adrena-gold text-[#111215]' : 'border-neutral-600 bg-adrena-card'
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
          <div className="p-6 sm:p-7 rounded-2xl bg-adrena-surface border border-adrena-border shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 left-0 h-1 bg-adrena-gold" />

            <span className="text-xs font-semibold uppercase tracking-wider text-adrena-stone block mb-1">
              {t.totalLabel}
            </span>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl sm:text-5xl font-extrabold text-adrena-bone tracking-tight">
                {totalPrice.toLocaleString('fr-FR')}
              </span>
              <span className="text-lg sm:text-xl font-bold text-adrena-gold">
                {isAr ? 'دج / شهر' : 'DA / mois'}
              </span>
            </div>

            {/* Inclusions Callout */}
            <div className="p-4 rounded-xl bg-adrena-card border border-adrena-border text-sm text-adrena-bone space-y-2.5 mb-6">
              <div className="flex items-center gap-2 text-adrena-gold font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>{t.savingsTag}</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-adrena-stone">
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
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-adrena-gold hover:bg-adrena-gold-light text-[#111215] font-bold text-sm tracking-wide transition-all shadow-md active:scale-98"
            >
              <MessageCircle className="w-4 h-4 fill-[#111215]" />
              <span>{t.ctaWhatsapp}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
