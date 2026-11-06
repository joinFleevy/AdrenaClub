'use client';

import React from 'react';
import Image from 'next/image';
import { Star, CheckCircle, ExternalLink } from 'lucide-react';
import { Language, content } from '@/data/content';

interface ReviewsSectionProps {
  lang: Language;
}

export default function ReviewsSection({ lang }: ReviewsSectionProps) {
  const t = content[lang].reviews;

  return (
    <section id="avis" className="py-12 sm:py-20 lg:py-28 scroll-mt-20 sm:scroll-mt-28 relative bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs sm:text-sm font-extrabold text-amber-800 uppercase tracking-wider block mb-2">
              {lang === 'fr' ? 'Avis Vérifiés Google' : 'آراء حقيقية وموثقة'}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {t.title}
            </h2>
            <p className="mt-2 text-base text-slate-600 max-w-[60ch] leading-relaxed font-normal">
              {t.subtitle}
            </p>
          </div>

          <a
            href="https://search.google.com/local/writereview?placeid=ChIJFSlXOAhRjhIRcOAX0RgYyJg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 transition-all self-start md:self-auto shadow-xs"
          >
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{t.leaveReview}</span>
          </a>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {t.items.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-amber-400 hover:shadow-xl transition-all"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>

                {/* Review Content */}
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed italic mb-6 font-medium">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-amber-400 flex-shrink-0 bg-slate-100 shadow-xs">
                  {item.avatar ? (
                    <Image
                      src={item.avatar}
                      alt={item.author}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm">
                      {item.author.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-black text-slate-900 truncate">{item.author}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                  </div>
                  <span className="text-xs text-slate-500 block truncate">{item.meta}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Coach Trust Strip */}
        <div className="mt-10 p-5 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-800 shadow-xs">
          <div className="flex items-center gap-3 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 flex-shrink-0" />
            <span>
              {lang === 'fr'
                ? 'Encadrement d\'élite : Coach Abdellah (Combat & Cross) & Coach Hmimed (Judo & Lutte)'
                : 'تأطير وإشراف معتمد : الكوتش عبد الله (قتال وكروس) والكوتش حميمد (جودو ومصارعة)'}
            </span>
          </div>
          <a
            href="https://wa.me/213771570378?text=Bonjour,%20je%20souhaite%20des%20informations%20sur%20les%20cours%20de%20combat."
            target="_blank"
            rel="noopener noreferrer"
            className="font-black text-amber-800 hover:text-amber-900 hover:underline whitespace-nowrap"
          >
            {lang === 'fr' ? 'Poser une question aux coachs →' : 'تواصل مع المدربين ←'}
          </a>
        </div>

        {/* View on Google link */}
        <div className="mt-6 text-center">
          <a
            href="https://www.google.com/maps/place/Adr%C3%A9na+club/@36.731219,3.185733,17z/data=!4m6!3m5!1s0x128e510838572915:0x98c81818d117e070!8m2!3d36.731219!4d3.185733!16s%2Fg%2F11v402rb1s"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-adrena-stone hover:text-adrena-gold transition-colors"
          >
            <span>{t.viewAllGoogle}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
