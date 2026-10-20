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
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0E0F13]/98 backdrop-blur-xl border-t border-adrena-border py-2 px-3 shadow-2xl safe-area-pb">
      <div className="flex items-center gap-2">
        {/* Dominant Primary WhatsApp Subscription Button (65% width) */}
        <a
          href={`https://wa.me/213771570378?text=${defaultMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-adrena-gold hover:bg-adrena-gold-light text-[#111215] font-semibold text-sm shadow-md active:scale-98 transition-all"
        >
          <MessageCircle className="w-5 h-5 fill-[#111215] flex-shrink-0" />
          <div className="flex flex-col items-start leading-tight">
            <span>{isAr ? 'التسجيل عبر واتساب' : 'S\'inscrire via WhatsApp'}</span>
            <span className="text-[10px] opacity-80">
              {isAr ? 'رد فوري • بدون التزام' : 'réponse rapide • dès 3 000 DA'}
            </span>
          </div>
        </a>

        {/* Compact Phone Call Button */}
        <a
          href="tel:+213771570378"
          className="flex flex-col items-center justify-center w-14 h-12 rounded-xl bg-adrena-card hover:bg-adrena-surface text-adrena-bone border border-adrena-border transition-colors flex-shrink-0"
          title={isAr ? 'اتصال مباشر' : 'Appeler la réception'}
        >
          <Phone className="w-4 h-4 text-adrena-bone mb-0.5" />
          <span className="text-[10px] font-medium text-adrena-stone">
            {isAr ? 'اتصال' : 'Appel'}
          </span>
        </a>

        {/* Compact GPS Directions Button */}
        <a
          href="https://maps.app.goo.gl/6YJepRtyWvXcrZoV9"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center w-14 h-12 rounded-xl bg-adrena-card hover:bg-adrena-surface text-adrena-bone border border-adrena-border transition-colors flex-shrink-0"
          title={isAr ? 'موقع النادي على الخريطة' : 'Localisation Google Maps'}
        >
          <MapPin className="w-4 h-4 text-adrena-gold mb-0.5" />
          <span className="text-[10px] font-medium text-adrena-stone">
            {isAr ? 'الموقع' : 'GPS'}
          </span>
        </a>
      </div>
    </div>
  );
}
