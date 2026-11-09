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
  const [isClosing, setIsClosing] = useState(false);

  // Pre-filled WhatsApp messages for both intents
  const trialMsg = isAr
    ? encodeURIComponent('السلام عليكم نادي أدرينا سبورت، أود حجز حصتي الأولى التجريبية المجانية. هل يمكنني الحضور غداً لتجربة القاعة؟')
    : encodeURIComponent("Bonjour Adrena Club, je souhaite profiter de ma 1ère séance d'essai offerte. Puis-je venir demain pour tester la salle ?");

  const inquiryMsg = isAr
    ? encodeURIComponent('السلام عليكم نادي أدرينا سبورت، لدي استفسار بخصوص الاشتراكات والتوقيتات في النادي.')
    : encodeURIComponent("Bonjour Adrena Club, j'ai une question concernant vos formules d'abonnement et le planning du club.");

  const openSheet = () => {
    setIsClosing(false);
    setIsSheetOpen(true);
  };

  const closeSheet = (callback?: () => void) => {
    setIsClosing(true);
    setTimeout(() => {
      setIsSheetOpen(false);
      setIsClosing(false);
      if (callback) callback();
    }, 200);
  };

  return (
    <>
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200 py-2.5 px-3 shadow-2xl safe-area-pb">
        <div className="flex items-center gap-2 max-w-md mx-auto">
          {/* Dominant Primary WhatsApp Action Button (Interactive Spring Animation) */}
          <button
            type="button"
            onClick={openSheet}
            className="group relative flex-1 flex items-center justify-center gap-2.5 h-[50px] px-3.5 rounded-xl bg-slate-900 hover:bg-black active:bg-black text-white shadow-md active:scale-[0.96] transition-all duration-150 min-w-0 cursor-pointer overflow-hidden border border-slate-800"
          >
            {/* Subtle tap gleam */}
            <span className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/15 to-amber-400/0 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-200 pointer-events-none" />

            <MessageCircle className="w-5 h-5 text-amber-400 fill-current flex-shrink-0 transition-transform duration-200 group-active:scale-125 group-active:rotate-[-8deg]" />
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
          className={`md:hidden fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex flex-col justify-end ${
            isClosing ? 'animate-overlay-out' : 'animate-overlay-in'
          }`}
          onClick={() => closeSheet()}
          role="dialog"
          aria-modal="true"
        >
          <div
            dir={isAr ? 'rtl' : 'ltr'}
            data-lenis-prevent
            className={`bg-white rounded-t-3xl border-t border-slate-200 p-5 pb-8 shadow-2xl safe-area-pb max-w-lg mx-auto w-full ${
              isClosing ? 'animate-sheet-down' : 'animate-sheet-spring'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Sheet Drag Handle */}
            <div className="w-10 h-1.5 rounded-full bg-slate-300 mx-auto mb-3.5" />

            {/* Top Close Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 animate-item-stagger-1">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-600 flex items-center justify-center shadow-xs">
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
                onClick={() => closeSheet()}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
                aria-label={isAr ? 'إغلاق' : 'Fermer'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Two Clear, High-Contrast Choices with Staggered Entrance */}
            <div className="space-y-3">
              {/* Option 1: 🎁 Trial Session (Priority High-Value CTA) */}
              <a
                href={`https://wa.me/213771570378?text=${trialMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => closeSheet()}
                className="animate-item-stagger-2 p-4 rounded-2xl bg-gradient-to-b from-amber-50/80 to-amber-50/40 hover:from-amber-100/70 hover:to-amber-50/70 border-2 border-amber-400 shadow-sm transition-all flex items-center justify-between gap-3 group active:scale-[0.98]"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm group-hover:scale-105 transition-transform">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-sm font-black text-slate-900 leading-tight">
                        {isAr ? 'حجز حصة تجريبية مجانية' : 'Réserver une séance d\'essai'}
                      </span>
                      <span className="animate-badge-pop text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 tracking-wider shadow-xs">
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

                <div className="text-amber-800 font-black text-sm flex-shrink-0 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </a>

              {/* Option 2: 💬 Questions & Inquiries */}
              <a
                href={`https://wa.me/213771570378?text=${inquiryMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => closeSheet()}
                className="animate-item-stagger-3 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100/90 border border-slate-200 shadow-xs transition-all flex items-center justify-between gap-3 group active:scale-[0.98]"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-800 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
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

                <div className="text-slate-400 group-hover:text-slate-700 font-black text-sm flex-shrink-0 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </a>
            </div>

            {/* Bottom Reassurance Note */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-500 text-center animate-item-stagger-3">
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
