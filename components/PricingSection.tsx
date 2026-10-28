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
  Sparkles,
  Users,
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
  const [audienceFilter, setAudienceFilter] = useState<AudienceFilter>('all');
  const [showAllMuscu, setShowAllMuscu] = useState<boolean>(false);
  const [mixedViewMode, setMixedViewMode] = useState<'calculator' | 'cards'>('calculator');

  // Handle audience filter change
  const handleAudienceChange = (aud: AudienceFilter) => {
    setAudienceFilter(aud);
    if (aud === 'enfants') {
      setActiveTab('combat');
    }
  };

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
    combat: { fr: 'Sports de Combat', ar: 'رياضات القتال', countFr: '3 disciplines', countAr: '3 فئات', icon: Shield },
    crosstraining: { fr: 'Cross-Training', ar: 'كروس ترينينغ', countFr: '3 formules', countAr: '3 باقات', icon: Flame },
    mixtes: { fr: 'Formules Mixtes', ar: 'الباقات المدمجة', countFr: '50+ formules', countAr: '+50 تركيبة', icon: Layers },
  };

  // Filter plans based on active tab and audience filter
  const displayedPlans = useMemo(() => {
    let plans: PricingPlan[] = [];
    switch (activeTab) {
      case 'musculation':
        plans = musculationPlans;
        break;
      case 'combat':
        plans = combatPlans;
        break;
      case 'crosstraining':
        plans = crosstrainingPlans;
        break;
      case 'mixtes':
        plans = mixedPlans;
        break;
      default:
        plans = musculationPlans;
    }

    if (audienceFilter !== 'all') {
      plans = plans.filter((p) => p.audience.includes(audienceFilter));
    }

    // For musculation: when collapsed, show the top 3 hero passes
    if (activeTab === 'musculation' && !showAllMuscu && audienceFilter === 'all') {
      return [musculationPlans[1], musculationPlans[2], musculationPlans[5]]; // 2x, 3x, Illimité
    }

    return plans;
  }, [activeTab, audienceFilter, showAllMuscu]);

  return (
    <section id="tarifs" className="py-12 md:py-20 scroll-mt-20 relative bg-adrena-black border-b border-adrena-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {t.title}
            </h2>
            <p className="mt-1 text-sm sm:text-base text-adrena-stone max-w-[65ch] leading-relaxed font-normal">
              {t.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenPostersModal(activeTab === 'mixtes' ? 'mixtes' : 'tarifs')}
            className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-adrena-card hover:bg-adrena-surface border border-adrena-border text-xs sm:text-sm font-bold text-adrena-stone hover:text-white transition-all self-start md:self-auto shadow-sm cursor-pointer flex-shrink-0"
          >
            <ImageIcon className="w-4 h-4 text-adrena-gold flex-shrink-0" />
            <span>
              {activeTab === 'mixtes'
                ? (isAr ? 'عرض ملصق الأسعار المدمجة' : 'Voir l\'affiche des tarifs mixtes')
                : t.viewPosterBtn}
            </span>
          </button>
        </div>

        {/* ============================================================== */}
        {/* AUDIENCE SEGMENTER: Clear Distinction for Enfants, Femmes, Hommes */}
        {/* ============================================================== */}
        <div className="mb-6 p-2 rounded-2xl bg-adrena-card border border-adrena-border flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 px-2 py-1 text-xs font-bold text-adrena-stone uppercase tracking-wider">
            <Users className="w-4 h-4 text-adrena-gold flex-shrink-0" />
            <span>{isAr ? 'تصفية حسب الجمهور :' : 'Public cible :'}</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 flex-1 justify-end">
            {[
              { id: 'all' as AudienceFilter, labelFr: 'Tout afficher', labelAr: 'الكل', icon: '🥋' },
              { id: 'hommes' as AudienceFilter, labelFr: 'Hommes (06h - 00h)', labelAr: 'رجال (06:00 - 00:00)', icon: '👨' },
              { id: 'femmes' as AudienceFilter, labelFr: 'Femmes (RDC Privé)', labelAr: 'نساء (فضاء خاص)', icon: '👩' },
              { id: 'enfants' as AudienceFilter, labelFr: 'Enfants (6 à 14 ans)', labelAr: 'أطفال (6 - 14 سنة)', icon: '🧒' },
            ].map((aud) => {
              const isAudActive = audienceFilter === aud.id;
              return (
                <button
                  key={aud.id}
                  type="button"
                  onClick={() => handleAudienceChange(aud.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border cursor-pointer ${
                    isAudActive
                      ? 'bg-adrena-gold text-adrena-black border-adrena-gold shadow-md font-black'
                      : 'bg-adrena-surface hover:bg-neutral-800 text-adrena-stone hover:text-white border-adrena-border'
                  }`}
                >
                  <span className="text-sm">{aud.icon}</span>
                  <span>{isAr ? aud.labelAr : aud.labelFr}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Audience Reassurance Banner */}
        {audienceFilter === 'femmes' && (
          <div className="mb-6 p-4 rounded-xl bg-violet-950/40 border border-violet-500/30 text-violet-200 text-xs sm:text-sm font-semibold flex items-center gap-3">
            <span className="text-lg flex-shrink-0">👩</span>
            <p className="leading-relaxed">
              {isAr
                ? 'فضاء الطابق الأرضي (RDC) مخصص 100% للنساء مع مدربات مؤهلات، خصوصية تامة وحصص بدون موسيقى.'
                : 'Espace RDC 100% réservé aux femmes : accès privé, coachs féminines et séances calmes sans musique.'}
            </p>
          </div>
        )}

        {audienceFilter === 'enfants' && (
          <div className="mb-6 p-4 rounded-xl bg-sky-950/40 border border-sky-500/30 text-sky-200 text-xs sm:text-sm font-semibold flex items-center gap-3">
            <span className="text-lg flex-shrink-0">🧒</span>
            <p className="leading-relaxed">
              {isAr
                ? 'أكاديمية الأطفال للرياضات القتالية (من 6 إلى 14 سنة) : جودو، ملاكمة وتنمية حركية بإشراف أبطال ومدربين معتمدين.'
                : 'Académie Enfants (6 à 14 ans) : Judo éducatif, boxe & motricité sur tatami sécurisé avec encadrement certifié.'}
            </p>
          </div>
        )}

        {/* ============================================================== */}
        {/* Category Tabs: Musculation, Combat, Cross, Mixtes               */}
        {/* ============================================================== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-6 sm:mb-8" role="tablist" aria-label="Catégories de tarifs">
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
                <div className="flex items-center justify-between w-full mb-1.5 sm:mb-2">
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${isActive ? 'text-adrena-black' : 'text-adrena-gold'}`} />
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
                <span className="text-xs sm:text-base tracking-tight leading-snug">
                  {isAr ? config.ar : config.fr}
                </span>
              </button>
            );
          })}
        </div>

        {/* For Mixed Plans: Toggle between Interactive Calculator (50+ combinations) and Curated Cards (6) */}
        {activeTab === 'mixtes' && (
          <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8" role="tablist" aria-label="Mode formules mixtes">
            <button
              type="button"
              role="tab"
              aria-selected={mixedViewMode === 'calculator'}
              onClick={() => setMixedViewMode('calculator')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                mixedViewMode === 'calculator'
                  ? 'bg-adrena-gold text-adrena-black border-adrena-gold shadow-md font-black'
                  : 'bg-adrena-card hover:bg-adrena-surface text-adrena-stone hover:text-white border-adrena-border'
              }`}
            >
              <Calculator className={`w-4 h-4 flex-shrink-0 ${mixedViewMode === 'calculator' ? 'text-adrena-black' : 'text-adrena-gold'}`} />
              <span>{isAr ? 'حاسبة الباقات المدمجة (50+)' : 'Simulateur Sur-Mesure (50+)'}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mixedViewMode === 'cards'}
              onClick={() => setMixedViewMode('cards')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                mixedViewMode === 'cards'
                  ? 'bg-adrena-gold text-adrena-black border-adrena-gold shadow-md font-black'
                  : 'bg-adrena-card hover:bg-adrena-surface text-adrena-stone hover:text-white border-adrena-border'
              }`}
            >
              <Sparkles className={`w-4 h-4 flex-shrink-0 ${mixedViewMode === 'cards' ? 'text-adrena-black' : 'text-adrena-gold'}`} />
              <span>{isAr ? 'الباقات الأكثر طلباً (6)' : 'Formules Populaires (6)'}</span>
            </button>
          </div>
        )}

        {/* ============================================================== */}
        {/* CONTENT RENDERER: Zero Tiny Squares, Pure Legible Responsive Cards */}
        {/* ============================================================== */}
        {activeTab === 'mixtes' && mixedViewMode === 'calculator' ? (
          <PricingCalculator
            lang={lang}
            onOpenPoster={() => onOpenPostersModal('mixtes')}
          />
        ) : (
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

            {/* Musculation Frequencies Expand Banner */}
            {activeTab === 'musculation' && audienceFilter === 'all' && (
              <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-adrena-card border border-adrena-border shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left rtl:sm:text-right">
                  <p className="text-sm sm:text-base font-extrabold text-white">
                    {isAr ? 'ترددات إضافية متوفرة في كمال الأجسام' : 'Autres fréquences disponibles en musculation'}
                  </p>
                  <p className="text-xs sm:text-sm text-adrena-stone mt-0.5 font-medium">
                    {isAr ? (
                      <>
                        <span>حصة واحدة بـ </span>
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

                <button
                  type="button"
                  onClick={() => setShowAllMuscu(!showAllMuscu)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-adrena-surface hover:bg-adrena-gold text-white hover:text-adrena-black border border-adrena-gold/50 hover:border-adrena-gold font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md active:scale-[0.98] cursor-pointer whitespace-nowrap flex-shrink-0"
                >
                  <span>
                    {showAllMuscu
                      ? (isAr ? 'عرض الباقات الرئيسية فقط' : 'Masquer les 3 autres formules')
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

            {/* Formules Mixtes Official Poster Access Banner (When on Cards mode) */}
            {activeTab === 'mixtes' && mixedViewMode === 'cards' && (
              <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-adrena-card border border-adrena-border/90 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
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

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setMixedViewMode('calculator')}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-adrena-surface hover:bg-neutral-800 text-adrena-gold border border-adrena-gold/50 font-bold text-xs sm:text-sm cursor-pointer whitespace-nowrap"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>{isAr ? 'فتح الحاسبة التفاعلية' : 'Lancer le simulateur'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenPostersModal('mixtes')}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-adrena-gold hover:bg-adrena-gold-light text-adrena-black font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md active:scale-[0.98] cursor-pointer whitespace-nowrap flex-shrink-0"
                  >
                    <ImageIcon className="w-4 h-4 flex-shrink-0" />
                    <span>
                      {isAr ? 'عرض جدول الأسعار الأصلي' : 'Consulter l\'affiche officielle'}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Practical Registration Guidance Box */}
        <div className="mt-12 p-5 sm:p-6 rounded-2xl bg-adrena-card border border-adrena-border flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs sm:text-sm text-adrena-stone">
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
