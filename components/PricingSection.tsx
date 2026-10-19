'use client';

import React, { useState } from 'react';
import { MessageCircle, Image as ImageIcon, Sliders } from 'lucide-react';
import { Language, content } from '@/data/content';
import {
  musculationPlans,
  crosstrainingPlans,
  combatPlans,
  wellnessPlans,
  formulesMixtesMatrix,
  PricingPlan,
} from '@/data/pricing';

interface PricingSectionProps {
  lang: Language;
  onOpenPostersModal: (posterName?: string) => void;
}

type PricingTab = 'musculation' | 'crosstraining' | 'combat' | 'mixtes' | 'wellness';

export default function PricingSection({ lang, onOpenPostersModal }: PricingSectionProps) {
  const t = content[lang].tarifs;
  const [activeTab, setActiveTab] = useState<PricingTab>('musculation');

  const [crossSessions, setCrossSessions] = useState<number>(2);
  const [muscuSessions, setMuscuSessions] = useState<number>(3);

  const getMixedPrice = (cross: number, muscu: number): number => {
    const item = formulesMixtesMatrix.find((f) => f.cross === cross && f.muscu === muscu);
    return item ? item.price : 4500;
  };

  const mixedPrice = getMixedPrice(crossSessions, muscuSessions);

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
          /* Formules Mixtes Calculator */
          <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl bg-adrena-card border border-adrena-gold/50 shadow-xl">
            <div className="mb-6">
              <h3 className="font-display text-2xl font-black text-white uppercase tracking-wide">
                {lang === 'fr' ? 'Formules Mixtes (Cross + Muscu)' : 'حاسبة الباقات المدمجة'}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1.5 leading-relaxed">
                {lang === 'fr'
                  ? 'Combinez vos séances de CrossTraining et de Musculation selon vos besoins'
                  : 'حدد عدد حصص الكروس ترينينغ وكمال الأجسام أسبوعياً'}
              </p>
            </div>

            {/* Cross Selector */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-display text-xs font-bold text-neutral-300 uppercase tracking-wider">
                  {lang === 'fr' ? 'CrossTraining / semaine :' : 'كروس ترينينغ / أسبوعياً :'}
                </span>
                <span className="font-display text-xs font-bold text-adrena-gold uppercase tracking-wider">
                  {crossSessions} {lang === 'fr' ? 'séances' : 'حصص'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((val) => (
                  <button
                    key={val}
                    onClick={() => setCrossSessions(val)}
                    className={`py-2.5 rounded-lg font-display font-bold text-xs sm:text-sm uppercase tracking-wider transition-all border ${
                      crossSessions === val
                        ? 'bg-adrena-gold text-black border-adrena-gold font-black'
                        : 'bg-black/50 text-neutral-400 border-white/5 hover:border-neutral-700'
                    }`}
                  >
                    {val} {lang === 'fr' ? 'séance(s)' : 'حصص'}
                  </button>
                ))}
              </div>
            </div>

            {/* Muscu Selector */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="font-display text-xs font-bold text-neutral-300 uppercase tracking-wider">
                  {lang === 'fr' ? 'Musculation / semaine :' : 'كمال أجسام / أسبوعياً :'}
                </span>
                <span className="font-display text-xs font-bold text-adrena-gold uppercase tracking-wider">
                  {muscuSessions} {lang === 'fr' ? 'séances' : 'حصص'}
                </span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {[1, 2, 3, 4, 5, 6].map((val) => (
                  <button
                    key={val}
                    onClick={() => setMuscuSessions(val)}
                    className={`py-2.5 rounded-lg font-display font-bold text-xs sm:text-sm uppercase tracking-wider transition-all border ${
                      muscuSessions === val
                        ? 'bg-adrena-gold text-black border-adrena-gold font-black'
                        : 'bg-black/50 text-neutral-400 border-white/5 hover:border-neutral-700'
                    }`}
                  >
                    {val} {lang === 'fr' ? 'séance(s)' : 'أيام'}
                  </button>
                ))}
              </div>
            </div>

            {/* Calculated Result */}
            <div className="p-5 sm:p-6 rounded-xl bg-black/60 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="font-display text-xs font-bold text-neutral-400 uppercase tracking-wider block">
                  {lang === 'fr' ? 'Tarif officiel du club :' : 'السعر الشهري للباقة :'}
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-display text-4xl font-black text-adrena-gold tabular-nums tracking-normal">
                    {mixedPrice.toLocaleString()}
                  </span>
                  <span className="font-display text-xs font-bold text-neutral-400 uppercase tracking-wider">DA / mois</span>
                </div>
              </div>

              <button
                onClick={() =>
                  handleWhatsAppOrder(`Mixte (${crossSessions} Cross + ${muscuSessions} Muscu)`, mixedPrice)
                }
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-adrena-gold hover:bg-adrena-gold-light text-black font-display font-black text-xs sm:text-sm uppercase tracking-wider transition-all whitespace-nowrap shadow-md hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4 fill-black" />
                <span>{lang === 'fr' ? 'Réserver cette formule' : 'طلب هذه الباقة عبر واتساب'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
