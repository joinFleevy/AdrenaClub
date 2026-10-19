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
        {/* Header without generic AI-slop kickers */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-adrena-bone tracking-tight uppercase leading-none">
              {t.title}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-adrena-stone max-w-[65ch] leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          <a
            href="https://search.google.com/local/writereview?placeid=ChIJFSlXOAhRjhIRcOAX0RgYyJg"
            target="_blank"
            rel="noopener noreferrer"
            className="font-display inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-adrena-card hover:bg-adrena-gold hover:text-[#111215] border border-adrena-border text-sm font-bold uppercase tracking-wider text-adrena-bone transition-all self-start md:self-auto shadow-sm"
          >
            <Star className="w-4 h-4 text-adrena-gold fill-adrena-gold" />
            <span>{t.leaveReview}</span>
          </a>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.items.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-adrena-card border border-adrena-border shadow-sm hover:border-neutral-600 transition-colors"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-adrena-gold mb-3">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-adrena-gold" />
                  ))}
                </div>

                {/* Review Content */}
                <p className="text-sm sm:text-base text-adrena-bone leading-relaxed italic mb-6 font-sans">
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
                    <div className="w-full h-full bg-adrena-gold text-[#111215] font-display font-black flex items-center justify-center text-sm">
                      {item.author.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <span className="font-display text-sm sm:text-base font-bold text-adrena-bone truncate">{item.author}</span>
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
            className="font-display inline-flex items-center gap-2 text-sm font-bold text-adrena-stone hover:text-adrena-gold transition-colors uppercase tracking-wider"
          >
            <span>{t.viewAllGoogle}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
