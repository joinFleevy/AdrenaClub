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
    <section id="tarifs" className="py-20 scroll-mt-28 relative bg-adrena-dark/40 border-b border-adrena-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header without generic kicker badges */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase leading-none">
              {t.title}
            </h2>
            <p className="mt-3 text-base text-neutral-300 max-w-[65ch] leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          <button
            onClick={() => onOpenPostersModal('tarifs')}
            className="font-display inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-adrena-gold hover:text-black border border-white/10 text-sm font-bold uppercase tracking-wider text-neutral-200 transition-all self-start md:self-auto"
          >
            <ImageIcon className="w-4 h-4 text-adrena-gold" />
            <span>{t.viewPosterBtn}</span>
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap items-center gap-2 mb-10 p-2 bg-adrena-card border border-adrena-border rounded-2xl w-fit" role="tablist" aria-label="Catégories de tarifs">
          {(['musculation', 'crosstraining', 'combat', 'mixtes', 'wellness'] as PricingTab[]).map(
            (tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 sm:px-6 py-3 rounded-xl font-display font-black text-sm uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-adrena-gold text-black shadow-md'
                      : 'text-neutral-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {t.tabs[tab]}
                </button>
              );
            }
          )}
        </div>

        {/* Regular Plans Cards */}
        {activeTab !== 'mixtes' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPlans.map((plan) => {
              const name = lang === 'fr' ? plan.nameFr : plan.nameAr;
              const freq = lang === 'fr' ? plan.frequencyFr : plan.frequencyAr;
              const period = lang === 'fr' ? plan.periodFr : plan.periodAr;
              const feats = lang === 'fr' ? plan.featuresFr : plan.featuresAr;

              return (
                <div
                  key={plan.id}
                  className={`relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl border transition-all ${
                    plan.isPopular
                      ? 'bg-adrena-card border-adrena-gold shadow-2xl ring-1 ring-adrena-gold/40'
                      : 'bg-adrena-card/80 border-adrena-border hover:border-neutral-600'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-wide">{name}</h3>
                      {plan.isPopular && (
                        <span className="font-display px-3 py-1 rounded-full bg-adrena-gold text-black text-xs font-black uppercase tracking-wider shadow-sm">
                          {t.popular}
                        </span>
                      )}
                    </div>
                    <p className="text-sm sm:text-base text-neutral-300 font-semibold mb-6">{freq}</p>

                    {/* Price */}
                    <div className="mb-6 pb-6 border-b border-white/10 flex items-baseline gap-2.5">
                      <span className="font-display text-4xl sm:text-6xl font-black text-adrena-gold tabular-nums tracking-normal">
                        {plan.price.toLocaleString('fr-FR')}
                      </span>
                      <span className="text-sm sm:text-base font-bold text-neutral-300 uppercase tracking-wider">{period}</span>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {feats.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-neutral-200">
                          <span className="w-2 h-2 rounded-full bg-adrena-gold mt-2 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => handleWhatsAppOrder(name, plan.price)}
                    className={`w-full flex items-center justify-center gap-2.5 py-4 px-5 rounded-xl font-display font-black text-sm uppercase tracking-wider transition-all shadow-md active:scale-95 ${
                      plan.isPopular
                        ? 'bg-adrena-gold hover:bg-adrena-gold-light text-black'
                        : 'bg-white/10 hover:bg-adrena-gold hover:text-black text-white'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>{t.choosePlan}</span>
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <PricingCalculator lang={lang} />
        )}
      </div>
    </section>
  );
}
