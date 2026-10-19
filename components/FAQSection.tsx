'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { Language, content } from '@/data/content';

interface FAQSectionProps {
  lang: Language;
}

export default function FAQSection({ lang }: FAQSectionProps) {
  const t = content[lang].faq;
  const isAr = lang === 'ar';
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 relative bg-adrena-black border-b border-adrena-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-adrena-gold/10 border border-adrena-gold/30 text-adrena-gold text-xs font-display font-semibold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{isAr ? 'إجابات مباشرة' : 'Réponses Claires'}</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight uppercase leading-none">
            {t.title}
          </h2>
          <p className="mt-3 text-base text-neutral-300 max-w-xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {t.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-adrena-card border border-adrena-border transition-all duration-200 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  className="w-full p-5 sm:p-6 text-left rtl:text-right flex items-center justify-between gap-4 font-display font-bold text-base sm:text-lg text-white hover:text-adrena-gold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-adrena-gold"
                >
                  <span className="leading-snug">{item.q}</span>
                  <div
                    className={`w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-adrena-gold/20 text-adrena-gold border-adrena-gold/30' : 'text-neutral-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-0 border-t border-white/5 mt-1">
                    <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-prose pt-4">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Note */}
        <div className="mt-10 p-6 rounded-2xl bg-neutral-900/60 border border-white/5 text-center">
          <p className="text-sm text-neutral-300 mb-3">
            {isAr
              ? 'لديك سؤال آخر أو ترغب في زيارة القاعة اليوم ؟'
              : 'Vous avez une autre question ou souhaitez visiter la salle aujourd\'hui ?'}
          </p>
          <a
            href="https://wa.me/213771570378?text=Bonjour,%20j'ai%20une%20question%20sur%20Adrena%20Club"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-adrena-gold hover:underline"
          >
            <span>{isAr ? 'تحدث مع موظف الاستقبال عبر واتساب' : 'Contacter l\'accueil via WhatsApp'}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
