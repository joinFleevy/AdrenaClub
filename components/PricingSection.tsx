'use client';

import React, { useState } from 'react';
import { MessageCircle, Image as ImageIcon } from 'lucide-react';
import { Language, content } from '@/data/content';
import {
  musculationPlans,
  crosstrainingPlans,
  combatPlans,
  wellnessPlans,
  PricingPlan,
} from '@/data/pricing';
import PricingCalculator from '@/components/PricingCalculator';

interface PricingSectionProps {
  lang: Language;
  onOpenPostersModal: (posterName?: string) => void;
}

type PricingTab = 'musculation' | 'crosstraining' | 'combat' | 'mixtes' | 'wellness';

export default function PricingSection({ lang, onOpenPostersModal }: PricingSectionProps) {
  const t = content[lang].tarifs;
  const isAr = lang === 'ar';
  const [activeTab, setActiveTab] = useState<PricingTab>('musculation');

  const getPlansForTab = (): PricingPlan[] => {
    switch (activeTab) {
      case 'musculation':
        return musculationPlans;
      case 'crosstraining':
        return crosstrainingPlans;
      case 'combat':
        return combatPlans;
      case 'wellness':
        return wellnessPlans;
      default:
        return [];
    }
  };

  const currentPlans = getPlansForTab();

  const handleWhatsAppOrder = (planName: string, price: number | string) => {
    const message =
      lang === 'fr'
        ? `Bonjour Adrena Club, je souhaite m'inscrire à la formule "${planName}" (${price} DA). Pouvez-vous me donner les détails ?`
        : `السلام عليكم نادي أدرينا، أود الاستفسار والتسجيل في باقة "${planName}" بسعر (${price} دج). ما هي الإجراءات؟`;
    const url = `https://wa.me/213771570378?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="tarifs" className="py-16 md:py-24 scroll-mt-20 relative bg-adrena-black border-b border-adrena-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              {t.title}
            </h2>
            <p className="mt-2 text-base text-adrena-stone max-w-[60ch] leading-relaxed font-medium">
              {t.subtitle}
            </p>
            <p className="mt-1 text-xs text-adrena-muted font-bold uppercase tracking-wider">
              {isAr
                ? 'الدفع نقداً بمكتب الاستقبال (CUB1) • شهادة طبية وصورتان للتسجيل • إمكانية تجربة حصة مفردة'
                : 'Paiement en espèces à la réception (CUB1) • Certificat médical & 2 photos requis • Séances d\'essai disponibles'}
            </p>
          </div>

          <button
            onClick={() => onOpenPostersModal('tarifs')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-adrena-card hover:bg-adrena-surface border border-adrena-border text-xs sm:text-sm font-bold text-adrena-stone hover:text-white transition-all self-start md:self-auto shadow-sm"
          >
            <ImageIcon className="w-4 h-4 text-adrena-gold" />
            <span>{t.viewPosterBtn}</span>
          </button>
        </div>

        {/* Tab Selection (Scrollable on mobile, no awkward multi-line wrapping) */}
        <div className="flex items-center gap-2 mb-8 p-1.5 bg-adrena-card border border-adrena-border rounded-xl max-w-full overflow-x-auto no-scrollbar" role="tablist" aria-label="Catégories de tarifs">
          {(['musculation', 'crosstraining', 'combat', 'mixtes', 'wellness'] as PricingTab[]).map(
            (tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 sm:px-5 py-2.5 rounded-lg font-black text-xs sm:text-sm transition-all whitespace-nowrap min-h-[40px] flex items-center justify-center uppercase tracking-wider ${
                    isActive
                      ? 'bg-adrena-gold text-adrena-black shadow-md'
                      : 'text-adrena-stone hover:text-white hover:bg-adrena-surface'
                  }`}
                >
                  {t.tabs[tab]}
                </button>
              );
            }
          )}
        </div>

        {/* Regular Plans Cards: Horizontal snap carousel on mobile to eliminate vertical scroll fatigue */}
        {activeTab !== 'mixtes' ? (
          <div>
            <div className="sm:hidden text-center text-xs text-adrena-muted mb-2 font-medium flex items-center justify-center gap-1.5">
              <span>{isAr ? '← اسحب أفقياً لمقارنة الباقات →' : '← Glissez horizontalement pour comparer les formules →'}</span>
            </div>
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 no-scrollbar">
              {currentPlans.map((plan) => {
                const name = lang === 'fr' ? plan.nameFr : plan.nameAr;
                const freq = lang === 'fr' ? plan.frequencyFr : plan.frequencyAr;
                const period = lang === 'fr' ? plan.periodFr : plan.periodAr;
                const feats = lang === 'fr' ? plan.featuresFr : plan.featuresAr;

                return (
                  <div
                    key={plan.id}
                    className={`relative w-[84vw] max-w-[320px] flex-shrink-0 snap-center sm:w-auto sm:max-w-none flex flex-col justify-between p-6 sm:p-7 rounded-2xl border transition-all ${
                      plan.isPopular
                        ? 'bg-adrena-card border-adrena-gold shadow-2xl'
                        : 'bg-adrena-card border-adrena-border hover:border-adrena-gold/40 shadow-md'
                    }`}
                  >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <h3 className="text-xl sm:text-2xl font-black text-white">{name}</h3>
                      {plan.isPopular && (
                        <span className="px-2.5 py-1 rounded bg-adrena-gold text-adrena-black text-[11px] font-black uppercase tracking-wider">
                          {t.popular}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-adrena-stone font-semibold mb-5">{freq}</p>

                    {/* Price */}
                    <div className="mb-5 pb-5 border-b border-adrena-border flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-black text-white tabular-nums tracking-tight">
                        {plan.price.toLocaleString('fr-FR')}
                      </span>
                      <span className="text-xs sm:text-sm font-black text-adrena-gold uppercase tracking-wider">{period}</span>
                    </div>

                    {/* Features */}
                    <ul className="space-y-2.5 mb-7">
                      {feats.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-adrena-stone">
                          <span className="w-1.5 h-1.5 rounded-full bg-adrena-gold mt-1.5 flex-shrink-0" />
                          <span className="font-medium">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => handleWhatsAppOrder(name, plan.price)}
                    className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-lg font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md active:scale-98 ${
                      plan.isPopular
                        ? 'bg-adrena-gold hover:bg-adrena-gold-light text-adrena-black'
                        : 'bg-adrena-surface hover:bg-adrena-gold hover:text-adrena-black text-white border border-adrena-border'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>{t.choosePlan}</span>
                  </button>
                </div>
              );
            })}
            </div>
          </div>
        ) : (
          <PricingCalculator lang={lang} />
        )}
      </div>
    </section>
  );
}
