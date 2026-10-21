'use client';

import React from 'react';
import Image from 'next/image';
import { Star, MessageSquareQuote, CheckCircle, ExternalLink } from 'lucide-react';
import { Language, content } from '@/data/content';

interface ReviewsSectionProps {
  lang: Language;
}

export default function ReviewsSection({ lang }: ReviewsSectionProps) {
  const t = content[lang].reviews;

  return (
    <section id="avis" className="py-20 scroll-mt-28 relative bg-adrena-black border-b border-adrena-border">
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
          </div>

          <a
            href="https://search.google.com/local/writereview?placeid=ChIJFSlXOAhRjhIRcOAX0RgYyJg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-adrena-card hover:bg-adrena-surface border border-adrena-border text-xs sm:text-sm font-bold text-adrena-stone hover:text-white transition-all self-start md:self-auto shadow-sm"
          >
            <Star className="w-4 h-4 text-adrena-gold fill-adrena-gold" />
            <span>{t.leaveReview}</span>
          </a>
        </div>

        {/* Reviews Cards: Horizontal snap carousel on mobile */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 sm:gap-6 no-scrollbar">
          {t.items.map((item, idx) => (
            <div
              key={idx}
              className="w-[84vw] max-w-[320px] flex-shrink-0 snap-center sm:w-auto sm:max-w-none flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-adrena-card border border-adrena-border shadow-lg hover:border-adrena-gold/40 transition-colors"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-adrena-gold mb-3">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-adrena-gold" />
                  ))}
                </div>

                {/* Review Content */}
                <p className="text-sm sm:text-base text-white leading-relaxed italic mb-6 font-medium">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-adrena-border flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-adrena-gold flex-shrink-0 bg-neutral-800 shadow-md">
                  {item.avatar ? (
                    <Image
                      src={item.avatar}
                      alt={item.author}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-adrena-gold text-[#111215] font-bold flex items-center justify-center text-sm">
                      {item.author.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm sm:text-base font-semibold text-adrena-bone truncate">{item.author}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                  </div>
                  <span className="text-xs text-adrena-stone block truncate">{item.meta}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View on Google link */}
        <div className="mt-8 text-center">
          <a
            href="https://www.google.com/maps/place/Adr%C3%A9na+club/@36.731219,3.185733,17z/data=!4m6!3m5!1s0x128e510838572915:0x98c81818d117e070!8m2!3d36.731219!4d3.185733!16s%2Fg%2F11v402rb1s"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-adrena-stone hover:text-adrena-gold transition-colors"
          >
            <span>{t.viewAllGoogle}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
