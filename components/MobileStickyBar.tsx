'use client';

import React from 'react';
import { Phone, MessageCircle, Clock, Navigation } from 'lucide-react';
import { Language, content } from '@/data/content';

interface MobileStickyBarProps {
  lang: Language;
}

export default function MobileStickyBar({ lang }: MobileStickyBarProps) {
  const t = content[lang].mobileBar;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-adrena-black/95 backdrop-blur-lg border-t border-adrena-border py-2 px-3 shadow-2xl safe-area-pb">
      <div className="grid grid-cols-4 gap-2">
        {/* Call button */}
        <a
          href="tel:0771570378"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 transition-colors"
        >
          <Phone className="w-4 h-4 text-neutral-200 mb-1" />
          <span className="font-display text-[11px] font-bold uppercase tracking-wider">{t.call}</span>
        </a>

        {/* WhatsApp CTA (Highlighted Gold) */}
        <a
          href="https://wa.me/213771570378?text=Bonjour%20Adrena%20Club,%20je%20souhaite%20m'inscrire."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-adrena-gold text-black transition-transform active:scale-95 box-gold-glow"
        >
          <MessageCircle className="w-4 h-4 fill-black mb-1" />
          <span className="font-display text-[11px] font-black uppercase tracking-wider">{t.whatsapp}</span>
        </a>

        {/* Planning button */}
        <a
          href="#planning"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 transition-colors"
        >
          <Clock className="w-4 h-4 text-adrena-gold mb-1" />
          <span className="font-display text-[11px] font-bold uppercase tracking-wider">{t.schedule}</span>
        </a>

        {/* Maps Directions button */}
        <a
          href="https://maps.app.goo.gl/6YJepRtyWvXcrZoV9"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 transition-colors"
        >
          <Navigation className="w-4 h-4 text-neutral-200 mb-1" />
          <span className="font-display text-[11px] font-bold uppercase tracking-wider">{t.location}</span>
        </a>
      </div>
    </div>
  );
}
