'use client';

import React from 'react';
import { Phone, MessageCircle, MapPin } from 'lucide-react';
import { Language } from '@/data/content';

interface MobileStickyBarProps {
  lang: Language;
}

export default function MobileStickyBar({ lang }: MobileStickyBarProps) {
  const isAr = lang === 'ar';

  const defaultMsg = isAr
    ? encodeURIComponent("السلام عليكم نادي أدرينا سبورت، أود الاستفسار عن الاشتراكات والتسجيل في النادي.")
    : encodeURIComponent("Bonjour Adrena Club, je souhaite m'inscrire. Pouvez-vous me donner les détails et les formules ?");

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200 py-2.5 px-3 shadow-2xl safe-area-pb">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* Dominant Primary WhatsApp Subscription Button */}
        <a
          href={`https://wa.me/213771570378?text=${defaultMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2.5 h-[50px] px-3.5 rounded-xl bg-slate-900 hover:bg-black active:bg-black text-white shadow-md active:scale-[0.98] transition-all min-w-0"
        >
          <MessageCircle className="w-5 h-5 text-amber-400 fill-current flex-shrink-0" />
          <div className="flex flex-col items-start leading-tight min-w-0">
            <span className="font-black text-xs sm:text-sm tracking-wide uppercase truncate w-full text-white">
              {isAr ? 'التسجيل عبر واتساب' : "S'inscrire via WhatsApp"}
            </span>
            <span className="text-[10.5px] font-bold text-slate-300 mt-0.5 truncate w-full">
              {isAr ? 'رد فوري • الأسعار والتسجيل' : 'Tarifs & inscription directe'}
            </span>
          </div>
        </a>

        {/* Compact Phone Call Button */}
        <a
          href="tel:+213771570378"
          className="flex flex-col items-center justify-center w-12 h-[50px] rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 border border-slate-300 transition-all flex-shrink-0"
          title={isAr ? 'اتصال مباشر بالنادي (0771 57 03 78)' : 'Appeler la réception (0771 57 03 78)'}
          aria-label={isAr ? 'اتصال مباشر بالنادي' : 'Appeler la réception'}
        >
          <Phone className="w-4 h-4 text-emerald-600 mb-0.5" />
          <span className="text-[10px] font-black text-slate-800 tracking-tight">
            {isAr ? 'اتصال' : 'Appel'}
          </span>
        </a>

        {/* Compact GPS Directions Button */}
        <a
          href="https://maps.app.goo.gl/6YJepRtyWvXcrZoV9"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center w-12 h-[50px] rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 border border-slate-300 transition-all flex-shrink-0"
          title={isAr ? 'موقع النادي على خرائط جوجل' : 'Localisation Google Maps'}
          aria-label={isAr ? 'موقع النادي على الخريطة' : 'Localisation Google Maps'}
        >
          <MapPin className="w-4 h-4 text-amber-600 mb-0.5" />
          <span className="text-[10px] font-black text-slate-800 tracking-tight">
            {isAr ? 'الموقع' : 'GPS'}
          </span>
        </a>
      </div>
    </div>
  );
}
