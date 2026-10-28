'use client';

import React, { useState, useMemo } from 'react';
import { Calculator, Flame, Shield, Dumbbell, Sparkles, Check, MessageCircle, ImageIcon, Plus } from 'lucide-react';
import { Language } from '@/data/content';
import {
  MixedDisciplineKey,
  lookupOfficialMixedRate,
} from '@/data/pricing';

interface PricingCalculatorProps {
  lang: Language;
  onOpenPoster?: () => void;
}

export default function PricingCalculator({ lang, onOpenPoster }: PricingCalculatorProps) {
  const isAr = lang === 'ar';

  const [discipline, setDiscipline] = useState<MixedDisciplineKey>('cross');
  const [disciplineSessions, setDisciplineSessions] = useState<number>(2);
  const [muscuSessions, setMuscuSessions] = useState<number>(2);
  const [includeSauna, setIncludeSauna] = useState<boolean>(false);

  // Available sessions per discipline
  const availableDisciplineSessions: number[] = useMemo(() => {
    if (discipline === 'lutte') return [2];
    return [1, 2, 3, 4];
  }, [discipline]);

  // Handle discipline change
  const handleDisciplineChange = (newDisc: MixedDisciplineKey) => {
    setDiscipline(newDisc);
    if (newDisc === 'lutte') {
      setDisciplineSessions(2);
      if (muscuSessions > 4) setMuscuSessions(4);
    } else {
      if (![1, 2, 3, 4].includes(disciplineSessions)) {
        setDisciplineSessions(2);
      }
    }
  };

  // Available muscu sessions
  const availableMuscuSessions: number[] = useMemo(() => {
    if (discipline === 'lutte') return [1, 2, 3, 4];
    if (discipline === 'cross' && disciplineSessions === 4) return [1, 2, 3];
    if (discipline === 'kick' && disciplineSessions === 4) return [1, 2, 3, 4];
    return [1, 2, 3, 4, 5, 6];
  }, [discipline, disciplineSessions]);

  // Ensure muscu sessions are valid within available options
  React.useEffect(() => {
    if (!availableMuscuSessions.includes(muscuSessions)) {
      setMuscuSessions(availableMuscuSessions[availableMuscuSessions.length - 1] || 2);
    }
  }, [availableMuscuSessions, muscuSessions]);

  // Calculate rate
  const calculation = useMemo(() => {
    return lookupOfficialMixedRate(discipline, disciplineSessions, muscuSessions);
  }, [discipline, disciplineSessions, muscuSessions]);

  const finalPrice = calculation.price + (includeSauna ? 2000 : 0);
  const totalSavings = calculation.savings;

  // Preset quick picks
  const presets = [
    {
      labelFr: 'Cross 2 + Muscu 2',
      labelAr: 'كروس 2 + حديد 2',
      disc: 'cross' as MixedDisciplineKey,
      discSess: 2,
      muscuSess: 2,
      price: 4500,
    },
    {
      labelFr: 'Cross 1 + Muscu 2',
      labelAr: 'كروس 1 + حديد 2',
      disc: 'cross' as MixedDisciplineKey,
      discSess: 1,
      muscuSess: 2,
      price: 3500,
    },
    {
      labelFr: 'Kick + Muscu 2',
      labelAr: 'كيك + حديد 2',
      disc: 'kick' as MixedDisciplineKey,
      discSess: 2,
      muscuSess: 2,
      price: 4500,
    },
    {
      labelFr: 'Cross 2 + Muscu 3',
      labelAr: 'كروس 2 + حديد 3',
      disc: 'cross' as MixedDisciplineKey,
      discSess: 2,
      muscuSess: 3,
      price: 4800,
    },
    {
      labelFr: 'Lutte + Muscu 2',
      labelAr: 'مصارعة + حديد 2',
      disc: 'lutte' as MixedDisciplineKey,
      discSess: 2,
      muscuSess: 2,
      price: 4500,
    },
  ];

  // WhatsApp order
  const handleWhatsAppBooking = () => {
    const discNameFr =
      discipline === 'cross' ? 'Cross-Training' : discipline === 'kick' ? 'Kickboxing' : 'Lutte';
    const discNameAr =
      discipline === 'cross' ? 'كروس ترينينغ' : discipline === 'kick' ? 'كيك بوكسينغ' : 'مصارعة';

    const formulaFr = `${discNameFr} (${disciplineSessions}x/sem) + Musculation (${muscuSessions}x/sem)${
      includeSauna ? ' + 1 séance Sauna' : ''
    }`;
    const formulaAr = `${discNameAr} (${disciplineSessions} حصص أسبوعياً) + كمال أجسام (${muscuSessions} حصص أسبوعياً)${
      includeSauna ? ' + حصة ساونا' : ''
    }`;

    const text = isAr
      ? `السلام عليكم نادي أدرينا سبورت، قمت بحساب اشتراكي عبر حاسبة الباقات المدمجة: ${formulaAr} بمجموع (${finalPrice.toLocaleString('fr-FR')} دج شهرياً). أود تأكيد التسجيل ومعرفة الوثائق المطلوبة.`
      : `Bonjour Adréna Club, j'ai configuré ma formule via votre simulateur officiel : ${formulaFr} pour un montant de ${finalPrice.toLocaleString('fr-FR')} DA/mois. Comment finaliser mon inscription ?`;

    window.open(`https://wa.me/213771570378?text=${encodeURIComponent(text)}`, '_blank');
  };

  const getDisciplineTitle = () => {
    if (discipline === 'cross') return isAr ? 'كروس ترينينغ' : 'Cross-Training';
    if (discipline === 'kick') return isAr ? 'كيك بوكسينغ' : 'Kickboxing';
    return isAr ? 'مصارعة أولمبية' : 'Lutte Olympique';
  };

  return (
    <div className="rounded-3xl bg-adrena-card border border-adrena-gold/30 shadow-2xl p-5 sm:p-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-adrena-border">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-adrena-surface border border-adrena-border text-adrena-gold text-xs font-bold mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>{isAr ? 'حاسبة الباقات المدمجة الرسمية' : 'Simulateur Officiel de Formules Mixtes'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {isAr ? 'ركّب باقتك المدمجة حسب رغبتك' : 'Composez votre formule sur-mesure'}
          </h3>
          <p className="text-xs sm:text-sm text-adrena-stone mt-1">
            {isAr
              ? 'اختر رياضتك المفضلة وعدد حصص كمال الأجسام واحصل على سعرك الرسمي ووفوراتك فوراً'
              : 'Combinez votre discipline sportive et votre fréquence musculation avec tarifs dégressifs officiels.'}
          </p>
        </div>

        {onOpenPoster && (
          <button
            type="button"
            onClick={onOpenPoster}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-adrena-surface hover:bg-neutral-800 border border-adrena-border text-xs font-bold text-adrena-stone hover:text-white transition-all self-start sm:self-auto cursor-pointer flex-shrink-0"
          >
            <ImageIcon className="w-3.5 h-3.5 text-adrena-gold" />
            <span>{isAr ? 'عرض ملصق الأسعار (50+)' : 'Affiche officielle (50+ tarifs)'}</span>
          </button>
        )}
      </div>

      {/* Quick Presets Strip */}
      <div className="mb-6">
        <span className="text-[11px] font-bold text-adrena-stone uppercase tracking-wider block mb-2 px-0.5">
          {isAr ? 'تركيبات سريعة شائعة :' : 'Sélection rapide des combinaisons populaires :'}
        </span>
        <div className="flex flex-wrap gap-2">
          {presets.map((p, idx) => {
            const isMatch =
              discipline === p.disc &&
              disciplineSessions === p.discSess &&
              muscuSessions === p.muscuSess;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setDiscipline(p.disc);
                  setDisciplineSessions(p.discSess);
                  setMuscuSessions(p.muscuSess);
                }}
                className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all border flex items-center gap-1.5 cursor-pointer ${
                  isMatch
                    ? 'bg-adrena-gold text-adrena-black border-adrena-gold shadow-sm font-black'
                    : 'bg-adrena-surface hover:bg-neutral-800 text-adrena-stone hover:text-white border-adrena-border'
                }`}
              >
                <span>{isAr ? p.labelAr : p.labelFr}</span>
                <span dir="ltr" className="text-[11px] font-mono tabular-nums opacity-90">
                  ({p.price.toLocaleString('fr-FR')} {isAr ? 'دج' : 'DA'})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Builder Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Selectors (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Discipline Choice */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-white mb-2.5">
              {isAr ? '1. اختر الرياضة القتالية أو الوظيفية' : '1. Choisissez votre discipline principale'}
            </label>
            <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Discipline">
              <button
                type="button"
                role="radio"
                aria-checked={discipline === 'cross'}
                onClick={() => handleDisciplineChange('cross')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                  discipline === 'cross'
                    ? 'bg-adrena-gold text-adrena-black border-adrena-gold shadow-md font-black'
                    : 'bg-adrena-surface text-adrena-stone hover:text-white border-adrena-border hover:border-adrena-gold/40'
                }`}
              >
                <Flame className={`w-4 h-4 ${discipline === 'cross' ? 'text-adrena-black' : 'text-adrena-gold'}`} />
                <span className="text-xs font-extrabold">{isAr ? 'كروس ترينينغ' : 'Cross-Training'}</span>
              </button>

              <button
                type="button"
                role="radio"
                aria-checked={discipline === 'kick'}
                onClick={() => handleDisciplineChange('kick')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                  discipline === 'kick'
                    ? 'bg-adrena-gold text-adrena-black border-adrena-gold shadow-md font-black'
                    : 'bg-adrena-surface text-adrena-stone hover:text-white border-adrena-border hover:border-adrena-gold/40'
                }`}
              >
                <Shield className={`w-4 h-4 ${discipline === 'kick' ? 'text-adrena-black' : 'text-adrena-gold'}`} />
                <span className="text-xs font-extrabold">{isAr ? 'كيك بوكسينغ' : 'Kickboxing'}</span>
              </button>

              <button
                type="button"
                role="radio"
                aria-checked={discipline === 'lutte'}
                onClick={() => handleDisciplineChange('lutte')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                  discipline === 'lutte'
                    ? 'bg-adrena-gold text-adrena-black border-adrena-gold shadow-md font-black'
                    : 'bg-adrena-surface text-adrena-stone hover:text-white border-adrena-border hover:border-adrena-gold/40'
                }`}
              >
                <Shield className={`w-4 h-4 ${discipline === 'lutte' ? 'text-adrena-black' : 'text-adrena-gold'}`} />
                <span className="text-xs font-extrabold">{isAr ? 'مصارعة' : 'Lutte'}</span>
              </button>
            </div>
          </div>

          {/* Step 2: Discipline Sessions per week */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs sm:text-sm font-bold text-white">
                {isAr
                  ? `2. عدد حصص ${getDisciplineTitle()} في الأسبوع`
                  : `2. Séances de ${getDisciplineTitle()} par semaine`}
              </label>
              <span className="text-xs font-mono font-bold text-adrena-gold">
                {disciplineSessions} {isAr ? 'حصص / أسبوع' : 'séances / sem'}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2" role="radiogroup" aria-label="Séances discipline">
              {availableDisciplineSessions.map((num) => (
                <button
                  key={num}
                  type="button"
                  role="radio"
                  aria-checked={disciplineSessions === num}
                  onClick={() => setDisciplineSessions(num)}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    disciplineSessions === num
                      ? 'bg-adrena-gold text-adrena-black border-adrena-gold shadow-sm font-black'
                      : 'bg-adrena-surface text-adrena-stone hover:text-white border-adrena-border hover:border-adrena-gold/30'
                  }`}
                >
                  {num} {isAr ? 'حصص' : num > 1 ? 'séances' : 'séance'}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Musculation Sessions per week */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                <Dumbbell className="w-3.5 h-3.5 text-adrena-gold" />
                <span>{isAr ? '3. عدد حصص كمال الأجسام في الأسبوع' : '3. Séances de Musculation par semaine'}</span>
              </label>
              <span className="text-xs font-mono font-bold text-adrena-gold">
                {muscuSessions === 6
                  ? (isAr ? 'دخول يومي غير محدود' : 'Accès illimité')
                  : `${muscuSessions} ${isAr ? 'حصص / أسبوع' : 'séances / sem'}`}
              </span>
            </div>
            <div
              className={`grid gap-2 ${
                availableMuscuSessions.length <= 4 ? 'grid-cols-4' : 'grid-cols-3 sm:grid-cols-6'
              }`}
              role="radiogroup"
              aria-label="Séances musculation"
            >
              {availableMuscuSessions.map((num) => (
                <button
                  key={num}
                  type="button"
                  role="radio"
                  aria-checked={muscuSessions === num}
                  onClick={() => setMuscuSessions(num)}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    muscuSessions === num
                      ? 'bg-adrena-bone text-adrena-black border-adrena-bone shadow-sm font-black'
                      : 'bg-adrena-surface text-adrena-stone hover:text-white border-adrena-border hover:border-adrena-gold/30'
                  }`}
                >
                  {num === 6 ? (isAr ? 'غير محدود' : 'Illimité') : `${num}x / sem`}
                </button>
              ))}
            </div>
          </div>

          {/* Optional Sauna Addon */}
          <div className="pt-2">
            <button
              type="button"
              role="checkbox"
              aria-checked={includeSauna}
              onClick={() => setIncludeSauna(!includeSauna)}
              className={`w-full p-3.5 rounded-xl border text-left rtl:text-right flex items-center justify-between transition-all cursor-pointer ${
                includeSauna
                  ? 'bg-adrena-surface border-adrena-gold text-white shadow-sm ring-1 ring-adrena-gold/30'
                  : 'bg-adrena-surface/60 border-adrena-border text-adrena-stone hover:border-adrena-border hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                    includeSauna
                      ? 'bg-adrena-gold border-adrena-gold text-adrena-black font-black'
                      : 'border-adrena-border bg-adrena-card text-transparent'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-white block">
                    {isAr ? 'إضافة حصة ساونا ومسبح (1h15)' : 'Option Séance Sauna & Piscine (1h15)'}
                  </span>
                  <span className="text-[11px] text-adrena-stone">
                    {isAr ? 'حجز مسبق للاسترخاء العضلي بعد التدريب' : 'Sur réservation pour récupération musculaire'}
                  </span>
                </div>
              </div>
              <span dir="ltr" className="text-xs font-mono font-black text-adrena-gold whitespace-nowrap">
                +2 000 {isAr ? 'دج' : 'DA'}
              </span>
            </button>
          </div>
        </div>

        {/* Right Column: Calculated Live Official Card (5 Cols) */}
        <div className="lg:col-span-5">
          <div className="p-5 sm:p-6 rounded-2xl bg-adrena-surface border-2 border-adrena-gold shadow-2xl relative">
            {/* Top Badge */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[11px] font-bold text-adrena-stone tracking-wide">
                {disciplineSessions + muscuSessions} {isAr ? 'تدريبات في الأسبوع' : 'entraînements / sem'}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-adrena-gold text-adrena-black uppercase tracking-wider shadow-sm">
                ★ {isAr ? 'تركيبة مخصصة' : 'Sur-Mesure'}
              </span>
            </div>

            {/* Formula Name */}
            <h4 className="text-lg sm:text-xl font-black text-white tracking-tight mb-2">
              {getDisciplineTitle()} {disciplineSessions} + {isAr ? 'حديد' : 'Muscu'} {muscuSessions}
            </h4>

            {/* Price Display */}
            <div className="mb-3 pb-3 border-b border-adrena-border/80 flex items-baseline gap-2">
              <span dir="ltr" className="text-3xl font-black text-white tabular-nums tracking-tight whitespace-nowrap">
                {finalPrice.toLocaleString('fr-FR')}
              </span>
              <span className="text-xs font-bold text-adrena-gold uppercase">
                {isAr ? 'دج / شهر' : 'DA / MOIS'}
              </span>
            </div>

            {/* Savings Callout */}
            {totalSavings > 0 && (
              <div className="mb-4 p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-2 text-emerald-400 text-xs font-bold">
                <Sparkles className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                <span>
                  {isAr
                    ? `توفير ${totalSavings.toLocaleString('fr-FR')} دج شهرياً مقارنة بالاشتراكات المنفصلة!`
                    : `Économisez ${totalSavings.toLocaleString('fr-FR')} DA / mois vs tarifs séparés !`}
                </span>
              </div>
            )}

            {/* Features List */}
            <div className="space-y-2 mb-5">
              <div className="flex items-start gap-2 text-xs text-adrena-bone font-medium">
                <Check className="w-3.5 h-3.5 text-adrena-gold flex-shrink-0 mt-0.5" />
                <span className="leading-snug">
                  {isAr
                    ? `استفادة كاملة من قاعة كمال الأجسام (${muscuSessions} حصص أسبوعياً)`
                    : `Accès complet au plateau musculation (${muscuSessions}x / semaine)`}
                </span>
              </div>
              <div className="flex items-start gap-2 text-xs text-adrena-bone font-medium">
                <Check className="w-3.5 h-3.5 text-adrena-gold flex-shrink-0 mt-0.5" />
                <span className="leading-snug">
                  {isAr
                    ? `حصص ${getDisciplineTitle()} مؤطرة من مدربين معتمدين`
                    : `Séances encadrées en ${getDisciplineTitle()} avec coachs diplômés`}
                </span>
              </div>
              <div className="flex items-start gap-2 text-xs text-adrena-bone font-medium">
                <Check className="w-3.5 h-3.5 text-adrena-gold flex-shrink-0 mt-0.5" />
                <span className="leading-snug">
                  {isAr ? 'غرف تبديل الملابس ودوشات ساخنة وخزائن مؤمنة' : 'Vestiaires, casiers sécurisés & douches incluses'}
                </span>
              </div>
              <div className="flex items-start gap-2 text-xs text-adrena-bone font-medium">
                <Check className="w-3.5 h-3.5 text-adrena-gold flex-shrink-0 mt-0.5" />
                <span className="leading-snug">
                  {isAr ? 'دفع نقداً مباشر بدون التزام سنوي' : 'Paiement direct sans frais d\'inscription'}
                </span>
              </div>
            </div>

            {/* WhatsApp Direct Action */}
            <button
              type="button"
              onClick={handleWhatsAppBooking}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-adrena-gold hover:bg-adrena-gold-light text-[#08090b] font-black text-xs transition-all shadow-md active:scale-[0.98] cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current flex-shrink-0" />
              <span className="whitespace-nowrap">
                {isAr
                  ? `حجز هذه الباقة • ${finalPrice.toLocaleString('fr-FR')} دج`
                  : `Réserver cette combinaison • ${finalPrice.toLocaleString('fr-FR')} DA`}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
