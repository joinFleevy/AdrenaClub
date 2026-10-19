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
    <section id="tarifs" className="py-20 relative bg-adrena-dark/40 border-b border-adrena-border">
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
        <div className="flex flex-wrap items-center gap-2 mb-10 p-1.5 bg-adrena-card/80 border border-adrena-border rounded-xl w-fit">
          {(['musculation', 'crosstraining', 'combat', 'mixtes', 'wellness'] as PricingTab[]).map(
            (tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 sm:px-5 py-2.5 rounded-lg font-display font-black text-xs sm:text-sm uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-adrena-gold text-black shadow-md'
                      : 'text-neutral-400 hover:text-white'
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
                  className={`relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl border transition-all ${
                    plan.isPopular
                      ? 'bg-adrena-card border-adrena-gold shadow-xl'
                      : 'bg-adrena-card/70 border-adrena-border hover:border-neutral-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="font-display text-2xl font-black text-white uppercase tracking-wide">{name}</h3>
                      {plan.isPopular && (
                        <span className="font-display px-2 py-0.5 rounded bg-adrena-gold text-black text-[10px] font-black uppercase tracking-wider">
                          {t.popular}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-400 font-medium mb-6">{freq}</p>

                    {/* Price */}
                    <div className="mb-6 pb-6 border-b border-white/5 flex items-baseline gap-2">
                      <span className="font-display text-4xl sm:text-5xl font-black text-adrena-gold tabular-nums tracking-normal">
                        {plan.price.toLocaleString()}
                      </span>
                      <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">{period}</span>
                    </div>

                    {/* Features */}
                    <ul className="space-y-2.5 mb-8">
                      {feats.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-adrena-gold mt-1.5 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => handleWhatsAppOrder(name, plan.price)}
                    className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-display font-black text-xs sm:text-sm uppercase tracking-wider transition-all ${
                      plan.isPopular
                        ? 'bg-adrena-gold hover:bg-adrena-gold-light text-black shadow-md'
                        : 'bg-white/10 hover:bg-adrena-gold hover:text-black text-white'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
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
