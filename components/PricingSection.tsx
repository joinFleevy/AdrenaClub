'use client';

import React, { useState } from 'react';
import { MessageCircle, Image as ImageIcon, Check, Dumbbell, Shield, Flame, Layers, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { Language, content } from '@/data/content';
import {
  musculationPlans,
  crosstrainingPlans,
  combatPlans,
  wellnessPlans,
  PricingPlan,
} from '@/data/pricing';

interface PricingSectionProps {
  lang: Language;
  onOpenPostersModal: (posterName?: string) => void;
}

type PricingTab = 'musculation' | 'combat' | 'crosstraining' | 'mixtes';

const mixedPlans: PricingPlan[] = [
  {
    id: 'mixte-1',
    nameFr: 'Pack Découverte Mixte',
    nameAr: 'باقة مدمجة أولية',
    frequencyFr: '2x Combat + 2x Musculation / semaine',
    frequencyAr: 'حصتان قتال + حصتان كمال أجسام أسبوعياً',
    price: 3200,
    periodFr: 'DA / mois',
    periodAr: 'دج / شهر',
    featuresFr: ['Accès au ring ou tatami 2x/sem', 'Accès au plateau musculation 2x/sem', 'Vestiaires et douches inclus'],
    featuresAr: ['دخول الحلبة أو البساط مرتين أسبوعياً', 'دخول قاعة الحديد مرتين أسبوعياً', 'غرف تبديل الملابس ودوش'],
  },
  {
    id: 'mixte-2',
    nameFr: 'Pack Athlète Complet',
    nameAr: 'باقة الرياضي الشاملة',
    frequencyFr: '2x Combat + 3x Musculation / semaine',
    frequencyAr: 'حصتان قتال + 3 حصص كمال أجسام أسبوعياً',
    price: 3600,
    periodFr: 'DA / mois',
    periodAr: 'دج / شهر',
    isPopular: true,
    featuresFr: ['La formule la plus demandée au club', 'Perfectionnement technique en combat', 'Développement musculaire ciblé', 'Encadrement par les coachs'],
    featuresAr: ['الباقة الأكثر طلباً في النادي', 'تطوير تقني في فنون القتال', 'بناء وتضخيم عضلي مستمر', 'متابعة وتأطير فني معتمد'],
  },
  {
    id: 'mixte-3',
    nameFr: 'Pack Performance Pro',
    nameAr: 'باقة الاحتراف والأداء',
    frequencyFr: '3x Combat + 3x Musculation / semaine',
    frequencyAr: '3 حصص قتال + 3 حصص كمال أجسام أسبوعياً',
    price: 4100,
    periodFr: 'DA / mois',
    periodAr: 'دج / شهر',
    featuresFr: ['6 entraînements par semaine', 'Idéal pour compétiteurs & athlètes', 'Accès prioritaire aux équipements'],
    featuresAr: ['6 حصص تدريب أسبوعياً', 'مثالية للمتنافسين والرياضيين المتقدمين', 'أولوية الاستفادة من التجهيزات'],
  },
];

export default function PricingSection({ lang, onOpenPostersModal }: PricingSectionProps) {
  const t = content[lang].tarifs;
  const isAr = lang === 'ar';
  const [activeTab, setActiveTab] = useState<PricingTab>('musculation');
  const [showAllMuscu, setShowAllMuscu] = useState<boolean>(false);

  const getPlansForTab = (): PricingPlan[] => {
    switch (activeTab) {
      case 'musculation':
        // Curate to 3 core hero passes by default to eliminate card clutter and mobile scroll fatigue
        if (!showAllMuscu) {
          return [
            musculationPlans[1], // 2 Séances / Semaine (3 000 DA)
            musculationPlans[2], // 3 Séances / Semaine (3 500 DA - Recommandée)
            musculationPlans[5], // Accès Libre Illimité (4 500 DA - Total)
          ];
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
  };

  const currentPlans = getPlansForTab();

  const handleWhatsAppOrder = (planName: string, price: number | string) => {
    const message =
      lang === 'fr'
        ? `Bonjour Adrena Club, je souhaite m'inscrire à la formule "${planName}" (${price} DA/mois). Pouvez-vous me confirmer les créneaux disponibles ?`
        : `السلام عليكم نادي أدرينا، أود الاستفسار والتسجيل في باقة "${planName}" بسعر (${price} دج/شهر). ما هي الإجراءات والمواعيد المتاحة؟`;
    const url = `https://wa.me/213771570378?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const tabConfig: Record<PricingTab, { fr: string; ar: string; icon: React.ElementType }> = {
    musculation: { fr: 'Musculation', ar: 'كمال الأجسام', icon: Dumbbell },
    combat: { fr: 'Sports de Combat', ar: 'رياضات القتال', icon: Shield },
    crosstraining: { fr: 'Cross-Training', ar: 'كروس ترينينغ', icon: Flame },
    mixtes: { fr: 'Formules Mixtes', ar: 'الباقات المدمجة', icon: Layers },
  };

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
            onClick={() => onOpenPostersModal('tarifs')}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-adrena-card hover:bg-adrena-surface border border-adrena-border text-sm font-bold text-adrena-stone hover:text-white transition-all self-start md:self-auto shadow-sm"
          >
            <ImageIcon className="w-4 h-4 text-adrena-gold" />
            <span>{t.viewPosterBtn}</span>
          </button>
        </div>

        {/* Tactile High-Contrast Tab Selection */}
        <div className="flex items-center gap-2.5 sm:gap-3 mb-10 p-1.5 bg-adrena-dark border border-adrena-border rounded-xl max-w-full overflow-x-auto no-scrollbar" role="tablist" aria-label="Catégories de tarifs">
          {(['musculation', 'combat', 'crosstraining', 'mixtes'] as PricingTab[]).map(
            (tab) => {
              const isActive = activeTab === tab;
              const config = tabConfig[tab];
              const Icon = config.icon;
              return (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 sm:px-6 py-3 rounded-lg font-extrabold text-sm sm:text-base transition-all whitespace-nowrap min-h-[46px] flex items-center gap-2.5 cursor-pointer shadow-sm active:scale-[0.98] ${
                    isActive
                      ? 'bg-adrena-gold text-adrena-black border border-adrena-gold shadow-md'
                      : 'bg-adrena-card hover:bg-adrena-surface text-adrena-stone hover:text-white border border-adrena-border hover:border-adrena-gold/40'
                  }`}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-adrena-black' : 'text-adrena-gold'}`} />
                  <span>{isAr ? config.ar : config.fr}</span>
                </button>
              );
            }
          )}
        </div>

        {/* Plan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {currentPlans.map((plan) => {
            const name = lang === 'fr' ? plan.nameFr : plan.nameAr;
            const freq = lang === 'fr' ? plan.frequencyFr : plan.frequencyAr;
            const period = lang === 'fr' ? plan.periodFr : plan.periodAr;
            const feats = lang === 'fr' ? plan.featuresFr : plan.featuresAr;

            return (
              <div
                key={plan.id}
                className={`flex flex-col justify-between p-6 sm:p-7 rounded-xl border transition-all ${
                  plan.isPopular
                    ? 'bg-adrena-card border-adrena-gold shadow-xl'
                    : 'bg-adrena-card border-adrena-border hover:border-adrena-gold/40 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white">{name}</h3>
                    {plan.isPopular && (
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-adrena-gold text-adrena-black uppercase tracking-wider">
                        {t.popular}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-xs sm:text-sm text-adrena-stone font-medium mb-6">
                    {freq}
                  </p>

                  {/* Price Block */}
                  <div className="mb-6 pb-6 border-b border-adrena-border flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-white tabular-nums tracking-tight">
                      {plan.price.toLocaleString('fr-FR')}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-adrena-gold uppercase">
                      {period}
                    </span>
                  </div>

                  {/* Features */}
                  <div className="space-y-2.5 mb-8">
                    {feats.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-adrena-stone">
                        <Check className="w-4 h-4 text-adrena-gold flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleWhatsAppOrder(name, plan.price)}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-lg font-bold text-xs sm:text-sm transition-all shadow-sm active:scale-[0.98] ${
                    plan.isPopular
                      ? 'bg-adrena-gold hover:bg-adrena-gold-light text-adrena-black'
                      : 'bg-adrena-surface hover:bg-white/10 text-white border border-adrena-border'
                  }`}
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>{isAr ? 'حجز هذه الباقة عبر واتساب' : 'Choisir cette formule'}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Musculation Frequencies Expand Banner - High Contrast & Tactile */}
        {activeTab === 'musculation' && (
          <div className="mt-10 p-4 sm:p-5 rounded-2xl bg-adrena-card border border-adrena-border/90 shadow-lg max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Left: Clear informative breakdown with high-contrast text and gold figures */}
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
                      <span>حصة/أسبوع (</span>
                      <strong className="text-adrena-gold font-bold">2 000 دج</strong>
                      <span>) • 4 حصص (</span>
                      <strong className="text-adrena-gold font-bold">4 000 دج</strong>
                      <span>) • 5 حصص (</span>
                      <strong className="text-adrena-gold font-bold">4 200 دج</strong>
                      <span>)</span>
                    </>
                  ) : (
                    <>
                      <span>1 séance/sem (</span>
                      <strong className="text-adrena-gold font-bold">2 000 DA</strong>
                      <span>) • 4 séances (</span>
                      <strong className="text-adrena-gold font-bold">4 000 DA</strong>
                      <span>) • 5 séances (</span>
                      <strong className="text-adrena-gold font-bold">4 200 DA</strong>
                      <span>)</span>
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Right: High-Contrast Toggle Button */}
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
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-adrena-surface hover:bg-white/10 text-white border border-adrena-border font-bold text-xs whitespace-nowrap self-start md:self-auto"
          >
            <MessageCircle className="w-3.5 h-3.5 text-adrena-gold" />
            <span>{isAr ? 'استفسار عن التسجيل' : 'Une question ? Contactez-nous'}</span>
          </a>
        </div>

      </div>
    </section>
  );
}
