'use client';

import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Sparkles, HelpCircle, X, ChevronRight } from 'lucide-react';
import { Language } from '@/data/content';

interface MobileStickyBarProps {
  lang: Language;
}

export default function MobileStickyBar({ lang }: MobileStickyBarProps) {
  const isAr = lang === 'ar';
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Pre-filled WhatsApp messages for both intents
  const trialMsg = isAr
    ? encodeURIComponent('السلام عليكم نادي أدرينا سبورت، أود حجز حصتي الأولى التجريبية المجانية. هل يمكنني الحضور غداً لتجربة القاعة؟')
    : encodeURIComponent("Bonjour Adrena Club, je souhaite profiter de ma 1ère séance d'essai offerte. Puis-je venir demain pour tester la salle ?");

  const inquiryMsg = isAr
    ? encodeURIComponent('السلام عليكم نادي أدرينا سبورت، لدي استفسار بخصوص الاشتراكات والتوقيتات في النادي.')
    : encodeURIComponent("Bonjour Adrena Club, j'ai une question concernant vos formules d'abonnement et le planning du club.");

  return (
    <>
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200 py-2.5 px-3 shadow-2xl safe-area-pb">
        <div className="flex items-center gap-2 max-w-md mx-auto">
          {/* Dominant Primary WhatsApp Action Button (Opens 2-Option Bottom Sheet) */}
          <button
            type="button"
            onClick={() => setIsSheetOpen(true)}
            className="flex-1 flex items-center justify-center gap-2.5 h-[50px] px-3.5 rounded-xl bg-slate-900 hover:bg-black active:bg-black text-white shadow-md active:scale-[0.98] transition-all min-w-0 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 text-amber-400 fill-current flex-shrink-0" />
            <div className="flex flex-col items-start leading-tight min-w-0">
              <span className="font-black text-xs sm:text-sm tracking-wide uppercase truncate w-full text-white">
                {isAr ? 'واتساب الاستقبال' : 'WhatsApp Réception'}
              </span>
              <span className="text-[10.5px] font-bold text-slate-300 mt-0.5 truncate w-full">
                {isAr ? 'حجز تجربة • استفسار مباشر' : 'Essai offert • Question directe'}
              </span>
            </div>
          </button>

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

      {/* Interactive Bottom Sheet for WhatsApp Options */}
      {isSheetOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200"
          onClick={() => setIsSheetOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-t-3xl border-t border-slate-200 p-5 pb-8 shadow-2xl safe-area-pb animate-in slide-in-from-bottom duration-200 max-w-lg mx-auto w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Handle & Close Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-600 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 leading-tight">
                    {isAr ? 'تواصل مع استقبال النادي' : 'Contacter la réception'}
                  </h3>
                  <p className="text-[11px] font-semibold text-slate-500 mt-0.5">
                    {isAr ? 'اختر الغرض لتوجيه طلبك فورياً' : 'Sélectionnez votre demande'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsSheetOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Two Clear, High-Contrast Choices */}
            <div className="space-y-3">
              {/* Option 1: 🎁 Trial Session (Priority High-Value CTA) */}
              <a
                href={`https://wa.me/213771570378?text=${trialMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsSheetOpen(false)}
                className="p-4 rounded-2xl bg-gradient-to-b from-amber-50/70 to-amber-50/30 hover:from-amber-100/60 hover:to-amber-50/60 border-2 border-amber-400/90 shadow-sm transition-all flex items-center justify-between gap-3 group active:scale-[0.98]"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-sm font-black text-slate-900 leading-tight">
                        {isAr ? 'حجز حصة تجريبية مجانية' : 'Réserver une séance d\'essai'}
                      </span>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 tracking-wider">
                        {isAr ? 'مهداة 100%' : 'Offerte'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 font-medium leading-snug">
                      {isAr
                        ? 'جرّب العتاد والأجواء غداً بدون التزام • ببطاقة التعريف فقط'
                        : 'Venez tester la salle demain sans engagement • CNI & baskets'}
                    </p>
                  </div>
                </div>

                <div className="text-amber-800 font-black text-sm flex-shrink-0 rtl:rotate-180">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </a>

              {/* Option 2: 💬 Questions & Inquiries */}
              <a
                href={`https://wa.me/213771570378?text=${inquiryMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsSheetOpen(false)}
                className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 shadow-xs transition-all flex items-center justify-between gap-3 group active:scale-[0.98]"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <HelpCircle className="w-5 h-5 text-slate-700" />
                  </div>
                  <div>
                    <span className="text-sm font-black text-slate-900 leading-tight block">
                      {isAr ? 'استفسار وسؤال عام' : 'Poser une question à l\'accueil'}
                    </span>
                    <p className="text-xs text-slate-500 mt-1 font-medium leading-snug">
                      {isAr
                        ? 'عن الأسعار، التوقيتات، الفترات النسائية أو برامج التدريب'
                        : 'Tarifs, plannings, créneaux femmes ou formules personnalisées'}
                    </p>
                  </div>
                </div>

                <div className="text-slate-400 group-hover:text-slate-700 font-black text-sm flex-shrink-0 rtl:rotate-180">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </a>
            </div>

            {/* Bottom Reassurance Note */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-500 text-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
              <span>
                {isAr
                  ? 'الرد فوري من موظف الاستقبال في القاعة'
                  : 'Réponse rapide de l\'équipe d\'accueil'}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
