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
    <section id="faq" className="py-20 scroll-mt-28 relative bg-adrena-black border-b border-adrena-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-adrena-bone tracking-tight">
            {t.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-adrena-stone max-w-xl mx-auto leading-relaxed">
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
                className="rounded-2xl bg-adrena-card border border-adrena-border transition-all duration-200 overflow-hidden shadow-sm"
              >
                <button
                  type="button"
                  id={`faq-btn-${index}`}
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="w-full p-5 sm:p-6 text-left rtl:text-right flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-adrena-bone hover:text-adrena-gold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-adrena-gold"
                >
                  <span className="leading-snug">{item.q}</span>
                  <div
                    className={`w-8 h-8 rounded-full bg-adrena-surface border border-adrena-border flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-adrena-gold text-[#111215] border-adrena-gold' : 'text-adrena-stone'
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
                    className="px-5 sm:px-6 pb-6 pt-0 border-t border-adrena-border mt-1"
                  >
                    <p className="text-sm sm:text-base text-adrena-stone leading-relaxed max-w-prose pt-4 font-sans">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Note */}
        <div className="mt-10 p-6 rounded-2xl bg-adrena-card border border-adrena-border text-center shadow-sm">
          <p className="text-sm text-adrena-stone mb-3 font-medium">
            {isAr
              ? 'لديك سؤال آخر أو ترغب في زيارة القاعة اليوم ؟'
              : 'Vous avez une autre question ou souhaitez visiter la salle aujourd\'hui ?'}
          </p>
          <a
            href="https://wa.me/213771570378?text=Bonjour,%20j'ai%20une%20question%20sur%20Adrena%20Club"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-adrena-gold hover:underline"
          >
            <span>{isAr ? 'تحدث مع موظف الاستقبال عبر واتساب' : 'Contacter l\'accueil via WhatsApp'}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
