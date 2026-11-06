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
    <section id="tarifs" className="py-20 sm:py-28 lg:py-32 scroll-mt-20 relative bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Focused, Human & Welcoming */}
        <div className="mb-8 sm:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs sm:text-sm font-extrabold text-amber-800 uppercase tracking-wider block mb-2">
              {isAr ? 'شفافية كاملة وبدون رسوم خفية' : 'Tarifs officiels & Transparents'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {t.title}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {t.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenPostersModal(activeTab === 'mixtes' ? 'mixtes' : 'tarifs')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 transition-all self-start sm:self-auto cursor-pointer flex-shrink-0 shadow-xs"
          >
            <ImageIcon className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>
              {activeTab === 'mixtes'
                ? (isAr ? 'عرض الملصق الرسمي (50+)' : 'Affiche officielle (50+ tarifs)')
                : t.viewPosterBtn}
            </span>
          </button>
        </div>

        {/* FREE TRIAL REASSURANCE BANNER (Séance d'essai offerte) */}
        <div className="mb-10 sm:mb-12 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-slate-50 border border-amber-300/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5 sm:gap-4">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-amber-500 text-slate-950 uppercase tracking-wider">
                  {isAr ? 'حصرياً للمشتركين الجدد' : 'Nouveaux Adhérents'}
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  {isAr ? 'حصتك التدريبية الأولى مهداة بالكامل (مجاناً)' : 'Votre 1ère séance d\'essai est 100% offerte'}
                </h3>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed font-normal">
                {isAr
                  ? 'جرّب عتاد القاعة، مساحة التمارين، وتعرّف على المدربين في أرض الواقع قبل دفع أي اشتراك. يكفي إحضار بدلة رياضية وحذاء نظيف وبطاقة تعريفك.'
                  : 'Testez nos équipements, l\'ambiance du club et rencontrez nos coachs sans engagement avant de choisir votre formule. Venez simplement avec tenue de sport, baskets propres et CNI.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleWhatsAppTrial}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs sm:text-sm font-extrabold transition-all shadow-sm active:scale-95 cursor-pointer whitespace-nowrap self-stretch md:self-auto justify-center"
          >
            <MessageCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>{isAr ? 'استفسر عن الحصة المجانية' : 'Profiter de la séance d\'essai'}</span>
          </button>
        </div>

        {/* SINGLE UNIFIED CATEGORY NAV: Crisp light athletic tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-3 mb-8 sm:mb-10 no-scrollbar" role="tablist" aria-label="Catégories de tarifs">
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
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl transition-all cursor-pointer whitespace-nowrap text-sm font-extrabold border ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-amber-400' : 'text-amber-600'}`} />
                <span>{isAr ? config.ar : config.fr}</span>
              </button>
            );
          })}
        </div>

        {/* DURATION SWITCHER: 1 Mois / 3 Mois / 6 Mois */}
        <div className="mb-10 sm:mb-14 flex flex-col items-center">
          <div className="w-full max-w-2xl bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-inner flex flex-col sm:flex-row gap-1.5">
            {[
              { id: '1m', labelFr: '1 Mois', labelAr: 'شهر واحد', subFr: 'Tarif standard', subAr: 'شهري عادي' },
              { id: '3m', labelFr: '3 Mois', labelAr: '3 أشهر', subFr: '-10% • 1 Sauna Offert', subAr: 'وفر 10% • +1 ساونا', isHot: true },
              { id: '6m', labelFr: '6 Mois', labelAr: '6 أشهر', subFr: '-15% • 3 Saunas Offerts', subAr: 'وفر 15% • +3 ساونا', isBest: true },
            ].map((d) => {
              const isSelected = duration === d.id;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDuration(d.id as SubscriptionDuration)}
                  className={`flex-1 py-3 px-3 rounded-xl transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer relative ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-white/60'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-black tracking-tight">{isAr ? d.labelAr : d.labelFr}</span>
                    {d.isHot && (
                      <span className={`px-1.5 py-0.2 rounded text-[10px] font-black uppercase tracking-wider ${isSelected ? 'bg-amber-400 text-slate-950' : 'bg-amber-100 text-amber-800'}`}>
                        {isAr ? 'هدية' : 'Bonus'}
                      </span>
                    )}
                    {d.isBest && (
                      <span className={`px-1.5 py-0.2 rounded text-[10px] font-black uppercase tracking-wider ${isSelected ? 'bg-amber-400 text-slate-950' : 'bg-amber-100 text-amber-800'}`}>
                        {isAr ? 'الأوفر' : 'Top'}
                      </span>
                    )}
                  </div>
                  <span className={`text-[11px] font-semibold ${isSelected ? 'text-amber-300' : 'text-slate-600'}`}>
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
                  className={`flex flex-col justify-between p-6 sm:p-7 rounded-2xl border-2 transition-all ${
                    plan.isPopular
                      ? 'bg-gradient-to-b from-amber-50/50 via-white to-white border-amber-500 shadow-xl ring-2 ring-amber-500/20 hover:-translate-y-1'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-xl hover:-translate-y-1'
                  }`}
                >
                  <div>
                    {/* Top Metadata Row: Audience Badge + Popular Tag */}
                    <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold ${
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
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-black bg-amber-500 text-slate-950 uppercase tracking-wider shadow-sm">
                          ★ {t.popular}
                        </span>
                      )}
                    </div>

                    {/* Frequency / Duration */}
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
                      {freq}
                    </span>

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

        {/* DOSSIER D'INSCRIPTION — ULTRA COMPACT & VISUAL */}
        <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-slate-200">
          <div className="rounded-2xl sm:rounded-3xl bg-slate-900 text-white p-5 sm:p-7 lg:p-8 shadow-xl border border-slate-800">
            
            {/* Header: Concise & Direct */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 mb-5 pb-3.5 border-b border-slate-800">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {isAr ? 'الملف المطلوب للتسجيل' : 'Dossier d\'inscription'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  {isAr ? 'الوثائق المطلوبة لاستخراج بطاقة العضوية في الاستقبال (CUB1)' : 'Pièces requises pour éditer votre badge d\'adhérent à la réception'}
                </p>
              </div>
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20 self-start sm:self-auto">
                {isAr ? 'تسليم فوري للبطاقة' : 'Badge remis sur place'}
              </span>
            </div>

            {/* 4 Items: 2x2 Grid on Mobile, 4 across on Desktop — Visual & Fast */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-4">
              {/* Item 01 */}
              <div className="p-3 sm:p-4 rounded-xl bg-slate-800/70 border border-slate-700/60 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-400">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-400">01</span>
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-white leading-tight">
                    {isAr ? 'شهادة طبية' : 'Certificat médical'}
                  </h4>
                  <span className="text-[11px] text-amber-300 font-bold block mt-0.5">
                    {isAr ? 'أقل من 3 أشهر' : 'Moins de 3 mois'}
                  </span>
                </div>
              </div>

              {/* Item 02 */}
              <div className="p-3 sm:p-4 rounded-xl bg-slate-800/70 border border-slate-700/60 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-400">
                    <Camera className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-400">02</span>
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-white leading-tight">
                    {isAr ? 'صورتان شمسيتان' : '2 Photos d\'identité'}
                  </h4>
                  <span className="text-[11px] text-slate-400 font-medium block mt-0.5">
                    {isAr ? 'لبطاقة النادي' : 'Format carte'}
                  </span>
                </div>
              </div>

              {/* Item 03 */}
              <div className="p-3 sm:p-4 rounded-xl bg-slate-800/70 border border-slate-700/60 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-400">
                    <IdCard className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-400">03</span>
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-white leading-tight">
                    {isAr ? 'بطاقة التعريف' : 'Pièce d\'identité'}
                  </h4>
                  <span className="text-[11px] text-slate-400 font-medium block mt-0.5">
                    {isAr ? 'CNI أو رخصة' : 'CNI ou Permis'}
                  </span>
                </div>
              </div>

              {/* Item 04 */}
              <div className="p-3 sm:p-4 rounded-xl bg-slate-800/70 border border-slate-700/60 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
                    <Banknote className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-400">04</span>
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-white leading-tight">
                    {isAr ? 'دفع نقداً' : 'Règlement espèces'}
                  </h4>
                  <span className="text-[11px] text-emerald-300 font-bold block mt-0.5">
                    {isAr ? 'في الاستقبال' : 'À la réception'}
                  </span>
                </div>
              </div>
            </div>

            {/* Compact Reassurance Strip: 1-Liner */}
            <div className="p-2.5 sm:p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 sm:gap-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                <p className="text-[11px] sm:text-xs">
                  <strong className="text-white">
                    {isAr ? 'للحصة التجريبية: ' : 'Séance d\'essai : '}
                  </strong>
                  {isAr
                    ? 'بدلة رياضية وحذاء نظيف وبطاقة التعريف فقط (بدون شهادة طبية).'
                    : 'tenue de sport, baskets propres et CNI uniquement (sans certificat).'}
                </p>
              </div>
              <span className="text-[10px] sm:text-[11px] text-slate-400">
                {isAr ? '• للقصر (-18): ترخيص الولي بالاستقبال' : '• Mineurs (-18) : accord parental sur place'}
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
