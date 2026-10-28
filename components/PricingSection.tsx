'use client';

import React, { useState } from 'react';
import {
  MessageCircle,
  Image as ImageIcon,
  Check,
  Dumbbell,
  Shield,
  Flame,
  Layers,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from 'lucide-react';
import { Language, content } from '@/data/content';
import {
  musculationPlans,
  crosstrainingPlans,
  combatPlans,
  mixedPlans,
  PricingPlan,
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
  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number>(2); // Default to 3 séances (index 2)
  const [showAllMuscu, setShowAllMuscu] = useState<boolean>(false);
  const [showMobileAllGrid, setShowMobileAllGrid] = useState<boolean>(false);

  const getAllPlansForTab = (): PricingPlan[] => {
    switch (activeTab) {
      case 'musculation':
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
  };

  const allPlans = getAllPlansForTab();
  const selectedPlan = allPlans[selectedPlanIndex] || allPlans[0];

  const handleTabChange = (tab: PricingTab) => {
    setActiveTab(tab);
    // Set appropriate default recommended index
    if (tab === 'musculation') {
      setSelectedPlanIndex(2); // 3 Séances
    } else if (tab === 'combat') {
      setSelectedPlanIndex(1); // Kickboxing / Judo
    } else if (tab === 'crosstraining') {
      setSelectedPlanIndex(1); // 2 Séances
    } else if (tab === 'mixtes') {
      setSelectedPlanIndex(0); // Cross 2 + Muscu 2 (Most popular)
    } else {
      setSelectedPlanIndex(0);
    }
    setShowMobileAllGrid(false);
  };

  const handleWhatsAppOrder = (planName: string, price: number | string) => {
    const formattedP = typeof price === 'number' ? formatPrice(price) : price;
    const message =
      lang === 'fr'
        ? `Bonjour Adrena Club, je souhaite m'inscrire à la formule "${planName}" (${formattedP} DA/mois). Pouvez-vous me confirmer les créneaux disponibles ?`
        : `السلام عليكم نادي أدرينا، أود الاستفسار والتسجيل في باقة "${planName}" بسعر ${formattedP} دج/شهر. ما هي الإجراءات والمواعيد المتاحة؟`;
    const url = `https://wa.me/213771570378?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const tabConfig: Record<
    PricingTab,
    { fr: string; ar: string; countFr: string; countAr: string; icon: React.ElementType }
  > = {
    musculation: { fr: 'Musculation', ar: 'كمال الأجسام', countFr: '6 formules', countAr: '6 باقات', icon: Dumbbell },
    combat: { fr: 'Sports de Combat', ar: 'رياضات القتال', countFr: '3 disciplines', countAr: '3 فئات', icon: Shield },
    crosstraining: { fr: 'Cross-Training', ar: 'كروس ترينينغ', countFr: '3 formules', countAr: '3 باقات', icon: Flame },
    mixtes: { fr: 'Formules Mixtes', ar: 'الباقات المدمجة', countFr: '6 formules', countAr: '6 باقات', icon: Layers },
  };

  const getChipShortTitle = (plan: PricingPlan): { titleFr: string; titleAr: string } => {
    if (plan.id === 'muscu-1') return { titleFr: '1 séance/sem', titleAr: 'حصة/أسبوع' };
    if (plan.id === 'muscu-2') return { titleFr: '2 séances/sem', titleAr: 'حصتان/أسبوع' };
    if (plan.id === 'muscu-3') return { titleFr: '3 séances/sem', titleAr: '3 حصص/أسبوع' };
    if (plan.id === 'muscu-4') return { titleFr: '4 séances/sem', titleAr: '4 حصص/أسبوع' };
    if (plan.id === 'muscu-5') return { titleFr: '5 séances/sem', titleAr: '5 حصص/أسبوع' };
    if (plan.id === 'muscu-libre') return { titleFr: 'Accès Libre', titleAr: 'اشتراك حر' };

    if (plan.id === 'cross-1') return { titleFr: '1 séance/sem', titleAr: 'حصة/أسبوع' };
    if (plan.id === 'cross-2') return { titleFr: '2 séances/sem', titleAr: 'حصتان/أسبوع' };
    if (plan.id === 'cross-3') return { titleFr: '3 séances/sem', titleAr: '3 حصص/أسبوع' };

    if (plan.id === 'combat-enfants') return { titleFr: 'Enfants', titleAr: 'أطفال' };
    if (plan.id === 'combat-kick-judo') return { titleFr: 'Kick / Judo', titleAr: 'كيك / جودو' };
    if (plan.id === 'combat-lutte') return { titleFr: 'Lutte', titleAr: 'مصارعة' };

    if (plan.id === 'mixte-cross-2-muscu-2') return { titleFr: 'Cross 2 + Muscu 2', titleAr: 'كروس 2 + حديد 2' };
    if (plan.id === 'mixte-cross-1-muscu-2') return { titleFr: 'Cross 1 + Muscu 2', titleAr: 'كروس 1 + حديد 2' };
    if (plan.id === 'mixte-kick-muscu-2') return { titleFr: 'Kick + Muscu 2', titleAr: 'كيك + حديد 2' };
    if (plan.id === 'mixte-cross-2-muscu-3') return { titleFr: 'Cross 2 + Muscu 3', titleAr: 'كروس 2 + حديد 3' };
    if (plan.id === 'mixte-kick-muscu-1') return { titleFr: 'Kick + Muscu 1', titleAr: 'كيك + حديد 1' };
    if (plan.id === 'mixte-lutte-muscu-2') return { titleFr: 'Lutte + Muscu 2', titleAr: 'مصارعة + حديد 2' };

    return { titleFr: plan.nameFr, titleAr: plan.nameAr };
  };

  // For Desktop: curated 3 hero passes for musculation when collapsed
  const desktopCuratedPlans: PricingPlan[] =
    activeTab === 'musculation' && !showAllMuscu
      ? [musculationPlans[1], musculationPlans[2], musculationPlans[5]]
      : allPlans;

  return (
    <section id="tarifs" className="py-20 scroll-mt-20 relative bg-adrena-black border-b border-adrena-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {t.title}
            </h2>
            <p className="mt-2 text-base sm:text-lg text-adrena-stone max-w-[60ch] leading-relaxed font-normal">
              {t.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenPostersModal('tarifs')}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-adrena-card hover:bg-adrena-surface border border-adrena-border text-sm font-bold text-adrena-stone hover:text-white transition-all self-start md:self-auto shadow-sm cursor-pointer"
          >
            <ImageIcon className="w-4 h-4 text-adrena-gold" />
            <span>{t.viewPosterBtn}</span>
          </button>
        </div>

        {/* 2x2 Category Grid on Mobile, 4-column Flex on Desktop (Zero Cutoff) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-8" role="tablist" aria-label="Catégories de tarifs">
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
                className={`p-3 sm:p-4 rounded-xl transition-all flex flex-col justify-between text-left rtl:text-right cursor-pointer shadow-sm active:scale-[0.98] border ${
                  isActive
                    ? 'bg-adrena-gold text-adrena-black border-adrena-gold shadow-md font-black'
                    : 'bg-adrena-card hover:bg-adrena-surface text-adrena-stone hover:text-white border-adrena-border hover:border-adrena-gold/40 font-bold'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-adrena-black' : 'text-adrena-gold'}`} />
                  <span
                    className={`text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-adrena-black/15 text-adrena-black'
                        : 'bg-adrena-surface text-adrena-stone border border-adrena-border'
                    }`}
                  >
                    {isAr ? config.countAr : config.countFr}
                  </span>
                </div>
                <span className="text-sm sm:text-base tracking-tight leading-snug">
                  {isAr ? config.ar : config.fr}
                </span>
              </button>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* MOBILE VIEW (< md): Interactive Frequency Selector + Hero Card */}
        {/* Solves scrolling fatigue & exposes 100% of offers in place    */}
        {/* ============================================================== */}
        <div className="block md:hidden">
          {/* Quick Frequency / Offer Chips Matrix */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs font-bold text-adrena-stone mb-2 px-1">
              <span>{isAr ? 'اختر وتيرة التدريب لتحديث البطاقة فورا :' : 'Sélectionnez une formule pour l\'afficher :'}</span>
              <span dir="ltr" className="text-adrena-gold font-mono tabular-nums font-bold">
                {selectedPlanIndex + 1} / {allPlans.length}
              </span>
            </div>

            {/* Tactile grid of chips: 3 columns for 6 or 3 items, visible in one glance */}
            <div className={`grid gap-1.5 ${allPlans.length > 3 ? 'grid-cols-3' : 'grid-cols-3'}`}>
              {allPlans.map((plan, idx) => {
                const isSelected = idx === selectedPlanIndex;
                const short = getChipShortTitle(plan);
                const shortText = isAr ? short.titleAr : short.titleFr;
                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setSelectedPlanIndex(idx)}
                    className={`py-2 px-1.5 rounded-xl text-center transition-all border flex flex-col items-center justify-center min-h-[52px] cursor-pointer ${
                      isSelected
                        ? 'bg-adrena-gold text-adrena-black border-adrena-gold shadow-md font-black'
                        : 'bg-adrena-card hover:bg-adrena-surface text-adrena-stone border-adrena-border hover:border-adrena-gold/40'
                    }`}
                  >
                    <span className="text-[11px] font-bold leading-tight flex items-center justify-center gap-1">
                      {plan.isPopular && <span className="text-amber-500 font-black">★</span>}
                      <span className="truncate">{shortText}</span>
                    </span>
                    <span
                      dir="ltr"
                      className={`text-[10px] font-mono tabular-nums font-extrabold mt-0.5 whitespace-nowrap ${
                        isSelected ? 'text-adrena-black' : 'text-adrena-gold'
                      }`}
                    >
                      {formatPrice(plan.price)} {isAr ? 'دج' : 'DA'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Live Hero Card (Zero Vertical Scrolling Needed) */}
          {selectedPlan && (
            <div
              className={`flex flex-col justify-between p-5 rounded-2xl border transition-all ${
                selectedPlan.isPopular
                  ? 'bg-adrena-card border-adrena-gold shadow-xl ring-1 ring-adrena-gold/30'
                  : 'bg-adrena-card border-adrena-border shadow-sm'
              }`}
            >
              <div>
                {/* Stepper row: Previous / Count / Next */}
                <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-adrena-border/70 text-xs">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedPlanIndex((prev) => (prev > 0 ? prev - 1 : allPlans.length - 1))
                    }
                    className="py-1 px-2.5 rounded-lg bg-adrena-surface hover:bg-white/10 text-adrena-stone hover:text-white transition-all flex items-center gap-1 border border-adrena-border font-bold active:scale-95"
                    aria-label="Précédent"
                  >
                    <ChevronLeft className="w-4 h-4 rtl:rotate-180 flex-shrink-0" />
                    <span>{isAr ? 'السابقة' : 'Précédente'}</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-black text-adrena-gold tracking-wide whitespace-nowrap">
                      {isAr
                        ? `الباقة ${selectedPlanIndex + 1} من ${allPlans.length}`
                        : `Formule ${selectedPlanIndex + 1} / ${allPlans.length}`}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedPlanIndex((prev) => (prev < allPlans.length - 1 ? prev + 1 : 0))
                    }
                    className="py-1 px-2.5 rounded-lg bg-adrena-surface hover:bg-white/10 text-adrena-stone hover:text-white transition-all flex items-center gap-1 border border-adrena-border font-bold active:scale-95"
                    aria-label="Suivant"
                  >
                    <span>{isAr ? 'التالية' : 'Suivante'}</span>
                    <ChevronRight className="w-4 h-4 rtl:rotate-180 flex-shrink-0" />
                  </button>
                </div>

                {/* Top Metadata: Frequency & Recommandé Badge */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-adrena-stone tracking-wide">
                    {isAr ? selectedPlan.frequencyAr : selectedPlan.frequencyFr}
                  </span>
                  {selectedPlan.isPopular && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-black bg-adrena-gold text-adrena-black uppercase tracking-wider shadow-sm">
                      ★ {t.popular}
                    </span>
                  )}
                </div>

                {/* Plan Name */}
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-3">
                  {isAr ? selectedPlan.nameAr : selectedPlan.nameFr}
                </h3>

                {/* Price Block: dir="ltr" + whitespace-nowrap prevents line break in numbers */}
                <div className="mb-4 pb-4 border-b border-adrena-border/80 flex items-baseline gap-2 flex-wrap">
                  <span
                    dir="ltr"
                    className="text-3xl sm:text-4xl font-black text-white tabular-nums tracking-tight whitespace-nowrap"
                  >
                    {formatPrice(selectedPlan.price)}
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-adrena-gold uppercase tracking-wider whitespace-nowrap">
                    {isAr ? selectedPlan.periodAr : selectedPlan.periodFr}
                  </span>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {(isAr ? selectedPlan.featuresAr : selectedPlan.featuresFr).map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-adrena-bone font-medium"
                    >
                      <Check className="w-4 h-4 text-adrena-gold flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button confirming price */}
              <button
                type="button"
                onClick={() =>
                  handleWhatsAppOrder(
                    isAr ? selectedPlan.nameAr : selectedPlan.nameFr,
                    selectedPlan.price
                  )
                }
                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-black text-xs sm:text-sm transition-all shadow-sm active:scale-[0.98] ${
                  selectedPlan.isPopular
                    ? 'bg-adrena-gold hover:bg-adrena-gold-light text-[#08090b] shadow-md shadow-adrena-gold/10'
                    : 'bg-adrena-surface hover:bg-white/10 text-white border border-adrena-border hover:border-adrena-gold/40'
                }`}
              >
                <MessageCircle className="w-4 h-4 fill-current flex-shrink-0" />
                <span className="whitespace-nowrap">
                  {isAr
                    ? `حجز الباقة • ${formatPrice(selectedPlan.price)} دج`
                    : `Réserver • ${formatPrice(selectedPlan.price)} DA`}
                </span>
              </button>
            </div>
          )}

          {/* Toggle for Mobile Users who prefer viewing all cards in a vertical stack */}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setShowMobileAllGrid(!showMobileAllGrid)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-adrena-surface hover:bg-adrena-card border border-adrena-border text-xs font-bold text-adrena-stone hover:text-white transition-all shadow-sm cursor-pointer active:scale-98"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-adrena-gold" />
              <span>
                {showMobileAllGrid
                  ? (isAr ? 'العودة إلى العرض السريع (بدون تمرير)' : 'Revenir au mode interactif sans défilement')
                  : (isAr ? `عرض جميع الباقات (${allPlans.length}) في صفحة واحدة` : `Afficher les ${allPlans.length} formules complètes`)}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  showMobileAllGrid ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>

          {/* Expanded mobile list if requested */}
          {showMobileAllGrid && (
            <div className="mt-5 space-y-4">
              {allPlans.map((plan) => {
                const name = isAr ? plan.nameAr : plan.nameFr;
                const freq = isAr ? plan.frequencyAr : plan.frequencyFr;
                const period = isAr ? plan.periodAr : plan.periodFr;
                const feats = isAr ? plan.featuresAr : plan.featuresFr;

                return (
                  <div
                    key={plan.id}
                    className={`flex flex-col justify-between p-5 rounded-2xl border transition-all ${
                      plan.isPopular
                        ? 'bg-adrena-card border-adrena-gold shadow-xl ring-1 ring-adrena-gold/30'
                        : 'bg-adrena-card border-adrena-border shadow-sm'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-bold text-adrena-stone tracking-wide">{freq}</span>
                        {plan.isPopular && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-black bg-adrena-gold text-adrena-black uppercase tracking-wider shadow-sm">
                            ★ {t.popular}
                          </span>
                        )}
                      </div>
                      <h4 className="text-xl font-black text-white tracking-tight mb-3">{name}</h4>
                      <div className="mb-4 pb-4 border-b border-adrena-border/80 flex items-baseline gap-2">
                        <span
                          dir="ltr"
                          className="text-3xl font-black text-white tabular-nums tracking-tight whitespace-nowrap"
                        >
                          {formatPrice(plan.price)}
                        </span>
                        <span className="text-xs font-extrabold text-adrena-gold uppercase tracking-wider whitespace-nowrap">
                          {period}
                        </span>
                      </div>
                      <div className="space-y-2 mb-6">
                        {feats.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs text-adrena-bone font-medium">
                            <Check className="w-4 h-4 text-adrena-gold flex-shrink-0 mt-0.5" />
                            <span className="leading-snug">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleWhatsAppOrder(name, plan.price)}
                      className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-black text-xs transition-all shadow-sm active:scale-[0.98] ${
                        plan.isPopular
                          ? 'bg-adrena-gold hover:bg-adrena-gold-light text-[#08090b]'
                          : 'bg-adrena-surface hover:bg-white/10 text-white border border-adrena-border'
                      }`}
                    >
                      <MessageCircle className="w-4 h-4 fill-current flex-shrink-0" />
                      <span className="whitespace-nowrap">
                        {isAr ? `حجز الباقة • ${formatPrice(plan.price)} دج` : `Réserver • ${formatPrice(plan.price)} DA`}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* DESKTOP VIEW (>= md): High-Contrast Grid with Side-by-Side Comparison */}
        {/* ============================================================== */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {desktopCuratedPlans.map((plan) => {
            const name = isAr ? plan.nameAr : plan.nameFr;
            const freq = isAr ? plan.frequencyAr : plan.frequencyFr;
            const period = isAr ? plan.periodAr : plan.periodFr;
            const feats = isAr ? plan.featuresAr : plan.featuresFr;

            return (
              <div
                key={plan.id}
                className={`flex flex-col justify-between p-5 sm:p-6 rounded-2xl border transition-all ${
                  plan.isPopular
                    ? 'bg-adrena-card border-adrena-gold shadow-xl ring-1 ring-adrena-gold/30'
                    : 'bg-adrena-card border-adrena-border hover:border-adrena-gold/40 shadow-sm'
                }`}
              >
                <div>
                  {/* Top Metadata Row: Frequency & Recommandé Badge */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-adrena-stone tracking-wide">
                      {freq}
                    </span>
                    {plan.isPopular && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-black bg-adrena-gold text-adrena-black uppercase tracking-wider shadow-sm">
                        ★ {t.popular}
                      </span>
                    )}
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-3">
                    {name}
                  </h3>

                  {/* Price Block: dir="ltr" + whitespace-nowrap prevents line break */}
                  <div className="mb-4 pb-4 border-b border-adrena-border/80 flex items-baseline gap-2 flex-wrap">
                    <span
                      dir="ltr"
                      className="text-3xl sm:text-4xl font-black text-white tabular-nums tracking-tight whitespace-nowrap"
                    >
                      {formatPrice(plan.price)}
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold text-adrena-gold uppercase tracking-wider whitespace-nowrap">
                      {period}
                    </span>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {feats.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-adrena-bone font-medium">
                        <Check className="w-4 h-4 text-adrena-gold flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleWhatsAppOrder(name, plan.price)}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-black text-xs sm:text-sm transition-all shadow-sm active:scale-[0.98] ${
                    plan.isPopular
                      ? 'bg-adrena-gold hover:bg-adrena-gold-light text-[#08090b] shadow-md shadow-adrena-gold/10'
                      : 'bg-adrena-surface hover:bg-white/10 text-white border border-adrena-border hover:border-adrena-gold/40'
                  }`}
                >
                  <MessageCircle className="w-4 h-4 fill-current flex-shrink-0" />
                  <span className="whitespace-nowrap">
                    {isAr
                      ? `حجز الباقة • ${formatPrice(plan.price)} دج`
                      : `Réserver • ${formatPrice(plan.price)} DA`}
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Musculation Frequencies Expand Banner for Desktop */}
        {activeTab === 'musculation' && (
          <div className="hidden md:flex mt-10 p-4 sm:p-5 rounded-2xl bg-adrena-card border border-adrena-border/90 shadow-lg max-w-5xl mx-auto flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-center sm:text-left rtl:sm:text-right">
              <div className="w-10 h-10 rounded-xl bg-adrena-surface border border-adrena-gold/40 flex items-center justify-center flex-shrink-0 text-adrena-gold">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm sm:text-base font-extrabold text-white">
                  {isAr ? 'ترددات إضافية متوفرة في النادي' : 'Fréquences flexibles disponibles à la réception'}
                </p>
                <p className="text-xs sm:text-sm text-adrena-stone mt-0.5 font-medium">
                  {isAr ? (
                    <>
                      <span>حصة أسبوعياً بـ </span>
                      <strong className="text-adrena-gold font-bold whitespace-nowrap tabular-nums">{formatPrice(2000)} دج</strong>
                      <span> • 4 حصص بـ </span>
                      <strong className="text-adrena-gold font-bold whitespace-nowrap tabular-nums">{formatPrice(4000)} دج</strong>
                      <span> • 5 حصص بـ </span>
                      <strong className="text-adrena-gold font-bold whitespace-nowrap tabular-nums">{formatPrice(4200)} دج</strong>
                    </>
                  ) : (
                    <>
                      <span>1 séance/sem (</span>
                      <strong className="text-adrena-gold font-bold whitespace-nowrap tabular-nums">{formatPrice(2000)} DA</strong>
                      <span>) • 4 séances (</span>
                      <strong className="text-adrena-gold font-bold whitespace-nowrap tabular-nums">{formatPrice(4000)} DA</strong>
                      <span>) • 5 séances (</span>
                      <strong className="text-adrena-gold font-bold whitespace-nowrap tabular-nums">{formatPrice(4200)} DA</strong>
                      <span>)</span>
                    </>
                  )}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowAllMuscu(!showAllMuscu)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-adrena-surface hover:bg-adrena-gold text-white hover:text-adrena-black border border-adrena-gold/50 hover:border-adrena-gold font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md active:scale-[0.98] cursor-pointer whitespace-nowrap flex-shrink-0"
            >
              <span>
                {showAllMuscu
                  ? (isAr ? 'عرض الـ 3 باقات الرئيسية' : 'Masquer les options secondaires')
                  : (isAr ? 'عرض جميع البطاقات (6)' : 'Afficher toutes les formules (6)')}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  showAllMuscu ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
        )}

        {/* Formules Mixtes Official Poster Access Banner */}
        {activeTab === 'mixtes' && (
          <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-adrena-card border border-adrena-border/90 shadow-lg max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-center sm:text-left rtl:sm:text-right">
              <div className="w-10 h-10 rounded-xl bg-adrena-surface border border-adrena-gold/40 flex items-center justify-center flex-shrink-0 text-adrena-gold">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm sm:text-base font-extrabold text-white">
                  {isAr ? 'أكثر من 50 تركيبة مدمجة رسمية متوفرة في النادي' : 'Plus de 50 combinaisons mixtes officielles au club'}
                </p>
                <p className="text-xs sm:text-sm text-adrena-stone mt-0.5 font-medium">
                  {isAr
                    ? 'يمكنك دمج أي عدد من حصص الكروس أو القتال مع كمال الأجسام بسعر تفضيلي ومباشر'
                    : 'Associez librement vos séances de cross ou combat avec la musculation à tarif réduit'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenPostersModal('mixtes')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-adrena-gold hover:bg-adrena-gold-light text-adrena-black font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md active:scale-[0.98] cursor-pointer whitespace-nowrap flex-shrink-0"
            >
              <ImageIcon className="w-4 h-4 flex-shrink-0" />
              <span>
                {isAr ? 'مشاهدة جدول الأسعار المدمجة الأصلي' : 'Consulter le tableau officiel (50+ formules)'}
              </span>
            </button>
          </div>
        )}

        {/* Practical Registration Guidance Box */}
        <div className="mt-12 p-5 sm:p-6 rounded-xl bg-adrena-card border border-adrena-border flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs sm:text-sm text-adrena-stone">
          <div className="space-y-1">
            <span className="font-bold text-white block text-sm">
              {isAr ? 'إجراءات التسجيل في النادي' : 'Modalités d\'inscription à la réception (CUB1)'}
            </span>
            <p>
              {isAr
                ? 'التسجيل يتم مباشرة بمكتب الاستقبال • الوثائق المطلوبة : شهادة طبية للممارسة الرياضية + صورتان شمسيتان • الدفع نقداً'
                : 'Dossier à fournir : Certificat médical d\'aptitude + 2 photos d\'identité • Paiement en espèces sur place • Séances d\'essai possibles'}
            </p>
          </div>

          <a
            href="https://wa.me/213771570378?text=Bonjour,%20je%20souhaite%20des%20renseignements%20sur%20les%20inscriptions."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-adrena-surface hover:bg-white/10 text-white border border-adrena-border font-bold text-xs whitespace-nowrap self-start md:self-auto cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 text-adrena-gold" />
            <span>{isAr ? 'استفسار عن التسجيل' : 'Une question ? Contactez-nous'}</span>
          </a>
        </div>

      </div>
    </section>
  );
}
