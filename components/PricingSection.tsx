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
} from 'lucide-react';
import { Language, content } from '@/data/content';
import PricingCalculator from './PricingCalculator';
import {
  musculationPlans,
  crosstrainingPlans,
  combatPlans,
  mixedPlans,
  PricingPlan,
  TargetAudience,
} from '@/data/pricing';

interface PricingSectionProps {
  lang: Language;
  onOpenPostersModal: (posterName?: string) => void;
}

type PricingTab = 'musculation' | 'combat' | 'crosstraining' | 'mixtes';
type AudienceFilter = 'all' | 'hommes' | 'femmes' | 'enfants';

// Bulletproof non-breaking space formatter (\u00A0) preventing line breaks in numbers
const formatPrice = (p: number) => p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0');

export default function PricingSection({ lang, onOpenPostersModal }: PricingSectionProps) {
  const t = content[lang].tarifs;
  const isAr = lang === 'ar';

  const [activeTab, setActiveTab] = useState<PricingTab>('musculation');
  const [showAllMuscu, setShowAllMuscu] = useState<boolean>(false);
  const [isCalculatorModalOpen, setIsCalculatorModalOpen] = useState<boolean>(false);

  const handleTabChange = (tab: PricingTab) => {
    setActiveTab(tab);
    setShowAllMuscu(false);
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
    combat: { fr: 'Combat & Enfants', ar: 'قتال وأطفال', countFr: '3 disciplines', countAr: '3 فئات', icon: Shield },
    crosstraining: { fr: 'Cross-Training', ar: 'كروس ترينينغ', countFr: '3 formules', countAr: '3 باقات', icon: Flame },
    mixtes: { fr: 'Formules Mixtes', ar: 'الباقات المدمجة', countFr: '50+ formules', countAr: '+50 تركيبة', icon: Layers },
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
    <section id="tarifs" className="py-20 sm:py-28 lg:py-32 scroll-mt-20 relative bg-adrena-black border-b border-adrena-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Focused & Authoritative */}
        <div className="mb-12 sm:mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {t.title}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-adrena-stone leading-relaxed font-normal">
              {t.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenPostersModal(activeTab === 'mixtes' ? 'mixtes' : 'tarifs')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-adrena-card hover:bg-adrena-surface border border-adrena-border text-xs sm:text-sm font-bold text-adrena-stone hover:text-white transition-all self-start sm:self-auto cursor-pointer flex-shrink-0"
          >
            <ImageIcon className="w-4 h-4 text-adrena-gold flex-shrink-0" />
            <span>
              {activeTab === 'mixtes'
                ? (isAr ? 'عرض الملصق الرسمي (50+)' : 'Affiche officielle (50+ tarifs)')
                : t.viewPosterBtn}
            </span>
          </button>
        </div>

        {/* ============================================================== */}
        {/* SINGLE UNIFIED CATEGORY NAV: Generous breathing room, zero clutter */}
        {/* ============================================================== */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-3 mb-12 sm:mb-16 no-scrollbar" role="tablist" aria-label="Catégories de tarifs">
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
                    ? 'bg-adrena-gold text-adrena-black border-adrena-gold shadow-md'
                    : 'bg-adrena-card hover:bg-adrena-surface text-adrena-stone hover:text-white border-adrena-border'
                }`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-adrena-black' : 'text-adrena-gold'}`} />
                <span>{isAr ? config.ar : config.fr}</span>
              </button>
            );
          })}
        </div>

        {/* For Mixed Plans: Clean Callout to Launch Custom Builder Modal */}
        {activeTab === 'mixtes' && (
          <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-adrena-card border border-adrena-gold/40 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-center sm:text-left rtl:sm:text-right">
              <div className="w-10 h-10 rounded-xl bg-adrena-gold/15 border border-adrena-gold/40 flex items-center justify-center text-adrena-gold flex-shrink-0">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm sm:text-base font-extrabold text-white">
                  {isAr ? 'حاسبة الباقات المدمجة (أكثر من 50 تركيبة)' : 'Simulateur Sur-Mesure (50+ formules)'}
                </p>
                <p className="text-xs sm:text-sm text-adrena-stone mt-0.5 font-medium">
                  {isAr
                    ? 'اختر عدد حصص الكروس أو القتال مع كمال الأجسام واحصل على تسعيرتك الرسمية فوراً'
                    : 'Composez votre formule personnalisée selon vos jours et disciplines'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCalculatorModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-adrena-gold hover:bg-adrena-gold-light text-adrena-black font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <Calculator className="w-4 h-4 flex-shrink-0" />
              <span>{isAr ? 'فتح الحاسبة التفاعلية' : 'Personnaliser ma formule'}</span>
            </button>
          </div>
        )}

        <div>
          {/* Direct Cards Grid: 1 column on Mobile, 3 columns on Desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {displayedPlans.map((plan) => {
                const name = isAr ? plan.nameAr : plan.nameFr;
                const freq = isAr ? plan.frequencyAr : plan.frequencyFr;
                const period = isAr ? plan.periodAr : plan.periodFr;
                const feats = isAr ? plan.featuresAr : plan.featuresFr;
                const audLabel = isAr ? plan.audienceLabelAr : plan.audienceLabelFr;

                // Color coding for audience badge
                const isKids = plan.audience.includes('enfants');
                const isFemmesOnly = plan.audience.includes('femmes') && !plan.audience.includes('hommes');
                const isHommesOnly = plan.audience.includes('hommes') && !plan.audience.includes('femmes');

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
                      {/* Top Metadata Row: Audience Badge + Popular Tag */}
                      <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold ${
                            isKids
                              ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
                              : isFemmesOnly
                              ? 'bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/30'
                              : isHommesOnly
                              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                              : 'bg-neutral-800 text-adrena-stone border border-neutral-700'
                          }`}
                        >
                          <span>{isKids ? '🧒' : isFemmesOnly ? '👩' : isHommesOnly ? '👨' : '👥'}</span>
                          <span>{audLabel}</span>
                        </span>

                        {plan.isPopular && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-adrena-gold text-adrena-black uppercase tracking-wider shadow-sm">
                            ★ {t.popular}
                          </span>
                        )}
                      </div>

                      {/* Frequency / Duration */}
                      <span className="text-xs font-bold text-adrena-muted uppercase tracking-wider block mb-1">
                        {freq}
                      </span>

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

                      {/* Features Checklist */}
                      <div className="space-y-2 mb-6">
                        {feats.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-adrena-bone font-medium">
                            <Check className="w-4 h-4 text-adrena-gold flex-shrink-0 mt-0.5" />
                            <span className="leading-snug">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* WhatsApp Reservation Button */}
                    <button
                      type="button"
                      onClick={() => handleWhatsAppOrder(name, plan.price)}
                      className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-black text-xs sm:text-sm transition-all shadow-sm active:scale-[0.98] cursor-pointer ${
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

            {/* Musculation Frequencies Expand Button: Clean, Centered, No nested card */}
            {activeTab === 'musculation' && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAllMuscu(!showAllMuscu)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-adrena-card hover:bg-adrena-surface text-adrena-stone hover:text-white border border-adrena-border hover:border-adrena-gold/50 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-sm active:scale-[0.98] cursor-pointer"
                >
                  <span>
                    {showAllMuscu
                      ? (isAr ? 'عرض الباقات الرئيسية فقط (3)' : 'Afficher les 3 formules principales')
                      : (isAr ? 'عرض جميع باقات كمال الأجسام (6)' : 'Voir les 6 formules de musculation')}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-adrena-gold transition-transform duration-200 ${
                      showAllMuscu ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>
            )}
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
