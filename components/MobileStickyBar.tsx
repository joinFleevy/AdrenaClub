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
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0E0F13]/95 backdrop-blur-lg border-t border-adrena-border pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] px-3 shadow-2xl safe-area-pb">
      <div className="grid grid-cols-4 gap-2">
        {/* Call button */}
        <a
          href="tel:+213771570378"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-adrena-card hover:bg-adrena-surface text-adrena-bone border border-adrena-border transition-colors"
        >
          <Phone className="w-5 h-5 text-adrena-bone mb-1" />
          <span className="font-display text-xs font-extrabold uppercase tracking-wide">{t.call}</span>
        </a>

        {/* WhatsApp CTA (Highlighted Gold) */}
        <a
          href="https://wa.me/213771570378?text=Bonjour%20Adrena%20Club,%20je%20souhaite%20m'inscrire."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-adrena-gold text-[#111215] transition-transform active:scale-95 shadow-md"
        >
          <MessageCircle className="w-5 h-5 fill-[#111215] mb-1" />
          <span className="font-display text-xs font-black uppercase tracking-wide">{t.whatsapp}</span>
        </a>

        {/* Planning button */}
        <a
          href="#planning"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-adrena-card hover:bg-adrena-surface text-adrena-bone border border-adrena-border transition-colors"
        >
          <Clock className="w-5 h-5 text-adrena-gold mb-1" />
          <span className="font-display text-xs font-extrabold uppercase tracking-wide">{t.schedule}</span>
        </a>

        {/* Maps Directions button */}
        <a
          href="https://maps.app.goo.gl/6YJepRtyWvXcrZoV9"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-adrena-card hover:bg-adrena-surface text-adrena-bone border border-adrena-border transition-colors"
        >
          <Navigation className="w-5 h-5 text-adrena-bone mb-1" />
          <span className="font-display text-xs font-extrabold uppercase tracking-wide">{t.location}</span>
        </a>
      </div>
    </div>
  );
}
