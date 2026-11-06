'use client';

import React, { useState, useMemo } from 'react';
import {
  MessageCircle,
  Image as ImageIcon,
  Check,
  Dumbbell,
  Shield,
  Flame,
  Layers,
  ChevronDown,
  Calculator,
  X,
  Sparkles,
  Award,
  FileText,
  Camera,
  IdCard,
  Banknote,
  Stethoscope,
} from 'lucide-react';
import { Language, content } from '@/data/content';
import PricingCalculator from './PricingCalculator';
import {
  musculationPlans,
  crosstrainingPlans,
  combatPlans,
  mixedPlans,
  PricingPlan,
  SubscriptionDuration,
  calculatePlanPricing,
} from '@/data/pricing';

interface PricingSectionProps {
  lang: Language;
  onOpenPostersModal: (posterName?: string) => void;
}

type PricingTab = 'musculation' | 'combat' | 'crosstraining' | 'mixtes';

// Bulletproof non-breaking space formatter (\u00A0) preventing line breaks in numbers
const formatPrice = (p: number) => p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0');

export default function PricingSection({ lang, onOpenPostersModal }: PricingSectionProps) {
  const t = content[lang].tarifs;
  const isAr = lang === 'ar';

  const [activeTab, setActiveTab] = useState<PricingTab>('musculation');
  const [duration, setDuration] = useState<SubscriptionDuration>('1m');
  const [showAllMuscu, setShowAllMuscu] = useState<boolean>(false);
  const [isCalculatorModalOpen, setIsCalculatorModalOpen] = useState<boolean>(false);

  const handleTabChange = (tab: PricingTab) => {
    setActiveTab(tab);
    setShowAllMuscu(false);
  };

  const handleWhatsAppOrder = (
    planName: string,
    calculatedPrice: number,
    saunaCount: number,
    curDuration: SubscriptionDuration
  ) => {
    const formattedP = formatPrice(calculatedPrice);
    let durationTextFr = '1 mois';
    let durationTextAr = 'شهر واحد';
    let bonusFr = '';
    let bonusAr = '';

    if (curDuration === '3m') {
      durationTextFr = '3 mois (Trimestriel)';
      durationTextAr = '3 أشهر (فصلي)';
      if (saunaCount > 0) {
        bonusFr = ' avec 1 séance Sauna offerte';
        bonusAr = ' مع حصة ساونا مهداة للاسترجاع';
      }
    } else if (curDuration === '6m') {
      durationTextFr = '6 mois (Semestriel)';
      durationTextAr = '6 أشهر (نصفي)';
      if (saunaCount > 0) {
        bonusFr = ' avec 3 séances Sauna offertes';
        bonusAr = ' مع 3 حصص ساونا مهداة للاسترجاع';
      }
    }

    const message =
      lang === 'fr'
        ? `Bonjour Adrena Club, je souhaite m'inscrire à la formule "${planName}" - Formule ${durationTextFr} (${formattedP} DA${bonusFr}). Pouvez-vous me confirmer les démarches à l'accueil ?`
        : `السلام عليكم نادي أدرينا، أود التسجيل في باقة "${planName}" - عرض ${durationTextAr} (${formattedP} دج${bonusAr}). ما هي الإجراءات في مكتب الاستقبال؟`;

    const url = `https://wa.me/213771570378?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleWhatsAppTrial = () => {
    const message =
      lang === 'fr'
        ? `Bonjour Adrena Club, je suis nouveau et j'aimerais profiter de ma 1ère séance d'essai offerte. Quels sont vos horaires d'accueil aujourd'hui ?`
        : `السلام عليكم نادي أدرينا، أنا مشترك جديد وأود الاستفادة من حصتي الأولى المجانية للتجربة. ما هي أوقات الاستقبال اليوم؟`;
    const url = `https://wa.me/213771570378?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const tabConfig: Record<
    PricingTab,
    { fr: string; ar: string; countFr: string; countAr: string; icon: React.ElementType }
  > = {
    musculation: { fr: 'Musculation', ar: 'كمال الأجسام', countFr: '6 formules', countAr: '6 باقات', icon: Dumbbell },
    combat: { fr: 'Combat & Enfants', ar: 'قتال وأطفال', countFr: '3 disciplines', countAr: '3 فئات', icon: Shield },
    crosstraining: { fr: 'Cross-Training', ar: 'كروس ترينينغ', countFr: '3 formules', countAr: '3 باقات', icon: Flame },
    mixtes: { fr: 'Packs Combinés', ar: 'باقات مدمجة', countFr: 'Sur-mesure', countAr: 'مخصصة', icon: Layers },
  };

  // Filter plans based on active tab
  const displayedPlans = useMemo(() => {
    switch (activeTab) {
      case 'musculation':
        if (!showAllMuscu) {
          return [musculationPlans[1], musculationPlans[2], musculationPlans[5]]; // 2x, 3x (popular), Illimité
        }
        return musculationPlans;
      case 'combat':
        return combatPlans;
      case 'crosstraining':
        return crosstrainingPlans;
      case 'mixtes':
        return mixedPlans;
      default:
        return musculationPlans;
    }
  }, [activeTab, showAllMuscu]);

  return (
    <section id="tarifs" className="py-10 sm:py-16 lg:py-24 scroll-mt-16 sm:scroll-mt-20 relative bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Clean, Direct, One-line Title & Subtle Poster Link */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              {t.title}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
              {t.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenPostersModal(activeTab === 'mixtes' ? 'mixtes' : 'tarifs')}
            className="text-xs font-bold text-amber-800 hover:text-amber-900 underline underline-offset-4 decoration-amber-400 hover:decoration-amber-600 transition-colors self-start sm:self-auto cursor-pointer flex items-center gap-1.5"
          >
            <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
            <span>
              {activeTab === 'mixtes'
                ? (isAr ? 'الملصق الرسمي (50+ باقة) ↗' : 'Affiche officielle (50+ tarifs) ↗')
                : (isAr ? 'عرض الملصق الأصلي للصالة ↗' : 'Affiche officielle originale ↗')}
            </span>
          </button>
        </div>

        {/* SINGLE UNIFIED CATEGORY NAV: Crisp light athletic tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 mb-4 sm:mb-6 no-scrollbar" role="tablist" aria-label="Catégories de tarifs">
          {(['musculation', 'combat', 'crosstraining', 'mixtes'] as PricingTab[]).map((tab) => {
            const isActive = activeTab === tab;
            const config = tabConfig[tab];
            const Icon = config.icon;
            return (
              <button
                key={tab}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleTabChange(tab)}
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap text-xs sm:text-sm font-extrabold border ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border-slate-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 ${isActive ? 'text-amber-400' : 'text-amber-600'}`} />
                <span>{isAr ? config.ar : config.fr}</span>
              </button>
            );
          })}
        </div>

        {/* DURATION SWITCHER: Quiet, Slim 3-Segment Control */}
        <div className="mb-6 sm:mb-8 flex justify-center">
          <div className="w-full max-w-xs sm:max-w-sm bg-slate-100 p-1 rounded-xl border border-slate-200 grid grid-cols-3 gap-1 shadow-inner">
            {[
              { id: '1m', labelFr: '1 Mois', labelAr: 'شهر', subFr: 'Standard', subAr: 'عادي' },
              { id: '3m', labelFr: '3 Mois', labelAr: '3 أشهر', subFr: '-10% • 🎁', subAr: '-10% 🎁' },
              { id: '6m', labelFr: '6 Mois', labelAr: '6 أشهر', subFr: '-15% • 👑', subAr: '-15% 👑' },
            ].map((d) => {
              const isSelected = duration === d.id;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDuration(d.id as SubscriptionDuration)}
                  className={`py-1.5 px-1 rounded-lg transition-all flex flex-col items-center justify-center cursor-pointer select-none text-center ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-black tracking-tight leading-tight">
                    {isAr ? d.labelAr : d.labelFr}
                  </span>
                  <span
                    className={`text-[10px] font-bold leading-tight mt-0.5 ${
                      isSelected ? 'text-amber-300' : 'text-slate-500'
                    }`}
                  >
                    {isAr ? d.subAr : d.subFr}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* For Mixed Plans: Clean Callout to Launch Custom Builder Modal */}
        {activeTab === 'mixtes' && (
          <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-amber-50/60 border border-amber-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-center sm:text-left rtl:sm:text-right">
              <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-700 flex-shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm sm:text-base font-extrabold text-slate-900">
                  {isAr ? 'دمج التخصصات حسب رغبتك' : 'Combinez vos disciplines préférées'}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5 font-medium">
                  {isAr
                    ? 'يمكنك دمج كمال الأجسام مع حصص القتال أو الكروس ترينينغ حسب جدولك الأسبوعي.'
                    : 'Musculation + Boxe ou Cross-Training : créez votre planning personnalisé.'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCalculatorModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-black text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <Calculator className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>{isAr ? 'حساب السعر المخصص' : 'Calculer mon tarif sur-mesure'}</span>
            </button>
          </div>
        )}

        <div>
          {/* Direct Cards Grid: Clean White Cards with High Contrast */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedPlans.map((plan) => {
              const pricing = calculatePlanPricing(plan, duration);
              const name = isAr ? plan.nameAr : plan.nameFr;
              const freq = isAr ? plan.frequencyAr : plan.frequencyFr;
              const period = isAr ? pricing.periodAr : pricing.periodFr;
              const feats = isAr ? plan.featuresAr : plan.featuresFr;
              const audLabel = isAr ? plan.audienceLabelAr : plan.audienceLabelFr;

              // Color coding for audience badge
              const isKids = plan.audience.includes('enfants');
              const isFemmesOnly = plan.audience.includes('femmes') && !plan.audience.includes('hommes');
              const isHommesOnly = plan.audience.includes('hommes') && !plan.audience.includes('femmes');

              return (
                <div
                  key={plan.id}
                  className={`flex flex-col justify-between p-5 sm:p-7 rounded-2xl border-2 transition-all ${
                    plan.isPopular
                      ? 'bg-gradient-to-b from-amber-50/50 via-white to-white border-amber-500 shadow-xl ring-2 ring-amber-500/20 hover:-translate-y-1'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-xl hover:-translate-y-1'
                  }`}
                >
                  <div>
                    {/* Top Metadata Row: Audience Badge + Popular Tag */}
                    <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold ${
                          isKids
                            ? 'bg-sky-50 text-sky-800 border border-sky-200'
                            : isFemmesOnly
                            ? 'bg-fuchsia-50 text-fuchsia-800 border border-fuchsia-200'
                            : isHommesOnly
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-slate-100 text-slate-800 border border-slate-200'
                        }`}
                      >
                        <span>{isKids ? '🧒' : isFemmesOnly ? '👩' : isHommesOnly ? '👨' : '👥'}</span>
                        <span>{audLabel}</span>
                      </span>

                      {plan.isPopular && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-slate-950 uppercase tracking-wider shadow-sm">
                          ★ {t.popular}
                        </span>
                      )}
                    </div>

                    {/* Plan Name */}
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-3">
                      {name}
                    </h3>

                    {/* Price Block: dir="ltr" + whitespace-nowrap prevents line break */}
                    <div className="mb-4 pb-4 border-b border-slate-200">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span
                          dir="ltr"
                          className="text-4xl sm:text-5xl font-black text-slate-900 tabular-nums tracking-tight whitespace-nowrap"
                        >
                          {formatPrice(pricing.price)}
                        </span>
                        <span className="text-xs sm:text-sm font-extrabold text-amber-800 uppercase tracking-wider whitespace-nowrap">
                          {period}
                        </span>
                      </div>

                      {/* Crossed-out original and savings badge when duration > 1m */}
                      {duration !== '1m' && pricing.savings > 0 && (
                        <div className="mt-2 flex items-center gap-2 flex-wrap text-xs">
                          <span className="line-through text-slate-600 font-bold" dir="ltr">
                            {formatPrice(pricing.basePriceWithoutDiscount)} DA
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-extrabold">
                            {isAr ? `توفير ${formatPrice(pricing.savings)} دج` : `Économisez ${formatPrice(pricing.savings)} DA`}
                          </span>
                        </div>
                      )}

                      {/* Adult Sauna Bonus Badge */}
                      {pricing.saunaSessions > 0 && (
                        <div className="mt-2.5 p-2 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center gap-2 text-xs font-bold text-amber-900">
                          <span className="text-base flex-shrink-0">🧖</span>
                          <span className="leading-tight">
                            {isAr
                              ? `+ ${pricing.saunaSessions} حصة ساونا مهداة للاسترجاع (قسيمة من الاستقبال)`
                              : `+ ${pricing.saunaSessions} séance(s) sauna offerte(s) (bon à l'accueil)`}
                          </span>
                        </div>
                      )}

                      {/* Kids Plan Specific Perk (No sauna for under 14) */}
                      {pricing.isKidsPlan && duration !== '1m' && (
                        <div className="mt-2.5 p-2 rounded-xl bg-sky-50 border border-sky-200 flex items-center gap-2 text-xs font-bold text-sky-900">
                          <span className="text-base flex-shrink-0">⭐</span>
                          <span className="leading-tight">
                            {isAr ? 'إعفاء من رسوم الملف وبطاقة النادي' : 'Frais de dossier & badge offerts'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Features Checklist */}
                    <div className="space-y-2.5 mb-6">
                      {feats.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                          <Check className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* WhatsApp Reservation Button */}
                  <button
                    type="button"
                    onClick={() => handleWhatsAppOrder(name, pricing.price, pricing.saunaSessions, duration)}
                    className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-black text-xs sm:text-sm transition-all shadow-sm active:scale-[0.98] cursor-pointer ${
                      plan.isPopular
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                        : 'bg-slate-900 hover:bg-black text-white'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 fill-current flex-shrink-0" />
                    <span className="whitespace-nowrap">
                      {isAr
                        ? `حجز الباقة • ${formatPrice(pricing.price)} دج`
                        : `Réserver • ${formatPrice(pricing.price)} DA`}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Musculation Frequencies Expand Button: Clean, Centered, No nested card */}
          {activeTab === 'musculation' && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllMuscu(!showAllMuscu)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 hover:text-slate-900 border border-slate-300 hover:border-amber-500 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-sm active:scale-[0.98] cursor-pointer"
              >
                <span>
                  {showAllMuscu
                    ? (isAr ? 'عرض الباقات الرئيسية فقط (3)' : 'Afficher les 3 formules principales')
                    : (isAr ? 'عرض جميع باقات كمال الأجسام (6)' : 'Voir les 6 formules de musculation')}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-amber-500 transition-transform duration-200 ${
                    showAllMuscu ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
          )}
        </div>

        {/* PIÈCES À FOURNIR — CLEAN EDITORIAL ATHLETIC CARDS (FAITHFUL TO SCREENSHOT 1) */}
        <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-slate-200">
          <div className="max-w-5xl mx-auto">
            
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <span className="text-xs font-extrabold text-amber-800 uppercase tracking-wider block mb-1">
                {isAr ? 'تسجيل فوري في الاستقبال' : 'INSCRIPTION SIMPLIFIÉE À L\'ACCUEIL'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {isAr ? 'ملف التسجيل والوثائق المطلوبة' : 'Dossier d\'inscription & Pièces à fournir'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1.5 font-medium max-w-2xl mx-auto">
                {isAr
                  ? 'كل ما تحتاجه لاستلام بطاقة عضويتك والبدء في التمارين في نفس اليوم.'
                  : 'Tout ce dont vous avez besoin pour créer votre carte de membre et débuter vos entraînements le jour même.'}
              </p>
            </div>

            {/* 4 Crisp Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* Card 1: Certificat médical */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-3 text-indigo-600">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm sm:text-base font-black text-slate-900 leading-tight">
                    {isAr ? 'شهادة طبية' : 'Certificat médical'}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {isAr
                      ? 'شهادة اللياقة البدنية لا تتعدى مدتها 3 أشهر.'
                      : 'Certificat médical d\'aptitude physique datant de moins de 3 mois.'}
                  </p>
                </div>
                <div className="mt-4">
                  <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200/80">
                    {isAr ? 'إجباري' : 'Obligatoire'}
                  </span>
                </div>
              </div>

              {/* Card 2: 2 Photos d'identité */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-3 text-amber-600">
                    <Camera className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm sm:text-base font-black text-slate-900 leading-tight">
                    {isAr ? '2 صور شمسية' : '2 Photos d\'identité'}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {isAr
                      ? 'صور حديثة لطباعة وتسليم بطاقة العضوية فورياً.'
                      : 'Photos récentes pour l\'édition immédiate de votre carte de membre.'}
                  </p>
                </div>
                <div className="mt-4">
                  <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                    {isAr ? 'لبطاقة النادي' : 'Pour votre badge'}
                  </span>
                </div>
              </div>

              {/* Card 3: Pièce d'identité */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center mb-3 text-sky-600">
                    <IdCard className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm sm:text-base font-black text-slate-900 leading-tight">
                    {isAr ? 'بطاقة التعريف' : 'Pièce d\'identité'}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {isAr
                      ? 'نسخة من بطاقة التعريف أو رخصة السياقة (أو الدفتر العائلي للقصر).'
                      : 'Copie de la CNI ou permis (ou livret de famille pour les mineurs).'}
                  </p>
                </div>
                <div className="mt-4">
                  <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                    {isAr ? 'للتحقق' : 'Vérification'}
                  </span>
                </div>
              </div>

              {/* Card 4: Règlement en espèces */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-3 text-emerald-600">
                    <Banknote className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm sm:text-base font-black text-slate-900 leading-tight">
                    {isAr ? 'دفع نقداً' : 'Règlement en espèces'}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {isAr
                      ? 'دفع اشتراك الباقة في مكتب الاستقبال (CUB1).'
                      : 'Paiement du montant de votre formule à la réception CUB1.'}
                  </p>
                </div>
                <div className="mt-4">
                  <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                    {isAr ? 'في الاستقبال' : 'À la réception'}
                  </span>
                </div>
              </div>
            </div>

            {/* Clean Light Strip at Bottom */}
            <div className="mt-4 p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span className="text-amber-600 font-bold">⚡</span>
                <p>
                  <strong className="font-bold text-slate-900">
                    {isAr ? 'للحصة التجريبية الأولى : ' : 'Pour la séance d\'essai offerte : '}
                  </strong>
                  {isAr
                    ? 'لا داعي لإحضار الشهادة الطبية في هذا اليوم. تفضل فقط ببدلة رياضية، حذاء نظيف، وبطاقة التعريف.'
                    : 'inutile de fournir le certificat ce jour-là. Venez simplement avec tenue de sport, baskets propres et CNI.'}
                </p>
              </div>
              <span className="text-[11px] font-bold text-slate-500 whitespace-nowrap self-start sm:self-auto">
                {isAr ? '• القصر (-18) : موافقة الولي في عين المكان' : '• Mineurs (-18) : accord parental sur place'}
              </span>
            </div>

          </div>
        </div>

      </div>

      {/* Interactive 50+ Combination Calculator Modal Dialog */}
      {isCalculatorModalOpen && (
        <div
          onClick={() => setIsCalculatorModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label={isAr ? 'حاسبة الباقات المدمجة' : 'Simulateur officiel de formules mixtes'}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full my-auto"
          >
            <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-20">
              <button
                type="button"
                onClick={() => setIsCalculatorModalOpen(false)}
                className="p-2.5 rounded-xl bg-adrena-surface hover:bg-neutral-800 text-adrena-stone hover:text-white border border-adrena-border transition-colors cursor-pointer"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <PricingCalculator
              lang={lang}
              onOpenPoster={() => {
                setIsCalculatorModalOpen(false);
                onOpenPostersModal('mixtes');
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
