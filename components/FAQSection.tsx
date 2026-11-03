'use client';

import React, { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
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
    <section id="faq" className="py-20 sm:py-28 lg:py-32 scroll-mt-28 relative bg-adrena-black border-b border-adrena-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            {t.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-adrena-stone max-w-xl mx-auto leading-relaxed font-normal">
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
                className="rounded-xl bg-adrena-card border border-adrena-border hover:border-adrena-gold/30 transition-all duration-200 overflow-hidden shadow-sm"
              >
                <button
                  type="button"
                  id={`faq-btn-${index}`}
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="w-full p-5 sm:p-6 text-left rtl:text-right flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-white hover:text-adrena-gold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-adrena-gold cursor-pointer"
                >
                  <span className="leading-snug">{item.q}</span>
                  <div
                    className={`w-7 h-7 rounded-full bg-adrena-surface border border-adrena-border flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-adrena-gold text-adrena-black border-adrena-gold' : 'text-adrena-stone'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-btn-${index}`}
                    className="px-5 sm:px-6 pb-6 pt-0 border-t border-adrena-border/70 mt-1"
                  >
                    <p className="text-sm sm:text-base text-adrena-stone leading-relaxed max-w-prose pt-4 font-normal">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
