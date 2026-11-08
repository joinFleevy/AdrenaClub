'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Navigation,
  MessageCircle,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Stethoscope,
  Camera,
  IdCard,
  GraduationCap,
  Banknote,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { Language } from '@/data/content';
import { SubscriptionDuration } from '@/data/pricing';

export interface PlanCheckoutDetails {
  name: string;
  price: number;
  duration: SubscriptionDuration;
  saunaSessions: number;
  isStudent?: boolean;
  savings?: number;
  basePriceWithoutDiscount?: number;
}

interface PlanCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  plan: PlanCheckoutDetails | null;
  onOpenTrial?: () => void;
}

const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/6YJepRtyWvXcrZoV9';
const WHATSAPP_NUMBER = '213771570378';

// Non-breaking space price formatter
const formatPrice = (p: number) => p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0');

export default function PlanCheckoutModal({
  isOpen,
  onClose,
  lang,
  plan,
  onOpenTrial,
}: PlanCheckoutModalProps) {
  const isAr = lang === 'ar';
  const [step, setStep] = useState<1 | 2>(1);

  // Reset to step 1 on new open
  useEffect(() => {
    if (isOpen) setStep(1);
  }, [isOpen, plan?.name]);

  // Handle ESC key and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !plan) return null;

  const isStudentPlan = Boolean(
    plan.isStudent ||
      plan.name.toLowerCase().includes('étudiant') ||
      plan.name.toLowerCase().includes('طالب')
  );

  const durationTextFr =
    plan.duration === '6m' ? '6 Mois' : plan.duration === '3m' ? '3 Mois' : '1 Mois';
  const durationTextAr =
    plan.duration === '6m' ? '6 أشهر' : plan.duration === '3m' ? '3 أشهر' : 'شهر واحد';

  const handleWhatsAppNotify = () => {
    const formattedP = formatPrice(plan.price);
    const durationDetailedFr =
      plan.duration === '3m'
        ? '3 mois (-10% + 1 sauna)'
        : plan.duration === '6m'
        ? '6 mois (-15% + 3 saunas)'
        : '1 mois';
    const durationDetailedAr =
      plan.duration === '3m'
        ? '3 أشهر (توفير 10% + ساونا)'
        : plan.duration === '6m'
        ? '6 أشهر (توفير 15% + 3 ساونا)'
        : 'شهر واحد';

    const studentSuffixFr = isStudentPlan ? " (avec ma carte d'étudiant)" : '';
    const studentSuffixAr = isStudentPlan ? ' (مع تقديم بطاقة الطالب)' : '';

    const message =
      lang === 'fr'
        ? `Bonjour Adrena Club ! Je souhaite m'inscrire à la formule "${plan.name}"${studentSuffixFr} (${durationDetailedFr} • ${formattedP} DA). Mon dossier d'inscription est prêt, confirmez-vous que l'accueil est ouvert pour passer ?`
        : `السلام عليكم نادي أدرينا ! أود التسجيل في باقة "${plan.name}"${studentSuffixAr} (${durationDetailedAr} • ${formattedP} دج). ملف التسجيل جاهز لدي، هل الاستقبال مفتوح الآن لأمر لتسليم الملف واستلام شارتي؟`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    onClose();
  };

  const handleOpenMaps = () => {
    window.open(GOOGLE_MAPS_URL, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const handleTrialRedirect = () => {
    onClose();
    if (onOpenTrial) {
      onOpenTrial();
    } else {
      const message =
        lang === 'fr'
          ? `Bonjour Adrena Club, je souhaite profiter de ma première séance d'essai offerte avant de préparer mon dossier complet. Quels sont vos horaires aujourd'hui ?`
          : `السلام عليكم نادي أدرينا، أود الاستفادة من حصتي التجريبية المجانية الأولى قبل تجهيز الملف الطبي. ما هي أوقات الاستقبال المتاحة اليوم؟`;
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={isAr ? 'تأكيد التسجيل في الباقة' : 'Finaliser votre inscription'}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] sm:max-h-[85vh] flex flex-col mt-auto sm:my-auto mb-0"
      >
        {/* Mobile Pull Indicator */}
        <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto mt-2.5 sm:hidden flex-shrink-0" />

        {/* Compact Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between gap-3 bg-slate-50/80 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center flex-shrink-0 shadow-xs">
              {step}
            </span>
            <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              {step === 1
                ? isAr
                  ? 'هل ملفك جاهز للتسجيل؟'
                  : 'Votre dossier est-il prêt ?'
                : isAr
                ? 'رائع ! اختر طريقة المتابعة'
                : 'Parfait ! Comment venir ?'}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Distilled Plan Recap Strip */}
        <div className="px-5 py-3 bg-slate-900 text-white flex items-center justify-between gap-3 flex-shrink-0">
          <div className="min-w-0">
            <p className="text-xs sm:text-sm font-extrabold text-white truncate">
              {plan.name}
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-300 font-semibold mt-0.5">
              <span>{isAr ? durationTextAr : durationTextFr}</span>
              {isStudentPlan && (
                <span className="text-amber-300">• {isAr ? 'عرض طلابي' : 'Tarif Étudiant'}</span>
              )}
              {plan.saunaSessions > 0 && (
                <span className="text-amber-400 flex items-center gap-0.5">
                  <Flame className="w-3 h-3" />
                  <span>+{plan.saunaSessions} sauna</span>
                </span>
              )}
            </div>
          </div>

          <div className="text-right rtl:text-left flex-shrink-0" dir="ltr">
            <span className="text-xl sm:text-2xl font-black text-amber-400 tabular-nums">
              {formatPrice(plan.price)}
            </span>
            <span className="text-xs font-bold text-slate-300 ml-1">DA</span>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* STEP 1: DISTILLED CHECKLIST */}
          {step === 1 && (
            <div className="space-y-3.5 animate-in fade-in duration-200">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {isAr
                  ? 'الوثائق المطلوبة لملف التسجيل في الاستقبال'
                  : 'Pièces requises pour votre badge à l’accueil'}
              </p>

              {/* Scannable Checklist Rows */}
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl bg-white shadow-xs overflow-hidden">
                {/* 1. Medical Certificate */}
                <div className="p-3 sm:p-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                      <Stethoscope className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                        {isAr ? 'شهادة طبية للياقة البدنية' : 'Certificat médical d’aptitude'}
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {isAr ? 'أقل من 3 أشهر (طبيب عام أو مختص)' : 'Moins de 3 mois (médecin généraliste)'}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md flex-shrink-0">
                    {isAr ? 'إجباري' : 'Requis'}
                  </span>
                </div>

                {/* 2. Photos */}
                <div className="p-3 sm:p-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                      <Camera className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                        {isAr ? '2 صور شمسية حديثة' : '2 Photos d’identité'}
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {isAr ? 'لطبع بطاقة العضوية فورياً' : 'Format carte d’adhérent'}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md flex-shrink-0">
                    {isAr ? 'للبطاقة' : 'Badge'}
                  </span>
                </div>

                {/* 3. CNI */}
                <div className="p-3 sm:p-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0">
                      <IdCard className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                        {isAr ? 'بطاقة التعريف (CNI) أو رخصة السياقة' : 'Pièce d’identité (CNI ou Permis)'}
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {isAr ? 'أو الدفتر العائلي للقصر (-18 سنة)' : 'Ou livret de famille pour mineurs'}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md flex-shrink-0">
                    {isAr ? 'للتحقق' : 'Identité'}
                  </span>
                </div>

                {/* 4. Student Card (Only for Student Plans) */}
                {isStudentPlan && (
                  <div className="p-3 sm:p-3.5 flex items-center justify-between gap-3 bg-amber-50/40">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-800 flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                          {isAr ? 'بطاقة الطالب أو شهادة مدرسية' : 'Carte d’étudiant ou certificat'}
                        </p>
                        <p className="text-[11px] text-amber-800 font-medium">
                          {isAr ? 'لتأكيد السعر المخفض للطلبة' : 'Obligatoire pour le tarif réduit'}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-black text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-md flex-shrink-0">
                      {isAr ? 'مطلوب' : 'Requis'}
                    </span>
                  </div>
                )}

                {/* 5. Cash payment */}
                <div className="p-3 sm:p-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                      <Banknote className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                        {isAr ? 'تسديد الاشتراك نقداً' : 'Règlement en espèces'}
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {isAr ? 'في مكتب الاستقبال (CUB1)' : 'Directement au comptoir CUB1'}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md flex-shrink-0">
                    {formatPrice(plan.price)} DA
                  </span>
                </div>
              </div>

              {/* Free Trial Direct Escape Route */}
              <div className="pt-1 flex items-center justify-between gap-2 text-xs">
                <span className="text-slate-500 font-medium">
                  {isAr ? 'ملفك الطبي غير جاهز؟' : 'Dossier pas encore prêt ?'}
                </span>
                <button
                  type="button"
                  onClick={handleTrialRedirect}
                  className="inline-flex items-center gap-1 font-bold text-amber-800 hover:text-amber-950 cursor-pointer whitespace-nowrap"
                >
                  <span className="underline underline-offset-2">
                    {isAr ? 'احجز حصة تجريبية مجانية' : 'Essai gratuit sans certificat'}
                  </span>
                  <span>⚡</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: FORK ROUTER (GPS MAPS VS WHATSAPP) */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-amber-50 border border-amber-200/80">
                <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <p className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                  {isAr
                    ? 'ننتظرك في الصالة لتسليمك شارة العضوية والبدء فورياً.'
                    : 'Rendez-vous à l’accueil CUB1 pour retirer votre badge et débuter.'}
                </p>
              </div>

              <div className="space-y-2.5">
                {/* Action 1: Google Maps (Primary) */}
                <button
                  type="button"
                  onClick={handleOpenMaps}
                  className="w-full p-4 rounded-2xl bg-slate-900 hover:bg-black text-white transition-all cursor-pointer flex items-center justify-between gap-3 text-left rtl:text-right shadow-md active:scale-[0.99]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center flex-shrink-0">
                      <Navigation className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-black text-white">
                        {isAr ? 'مسار الوصول عبر GPS (خرائط Google)' : 'Itinéraire GPS direct (Google Maps)'}
                      </p>
                      <p className="text-[11px] text-slate-300 font-medium">
                        {isAr ? 'الانطلاق نحو Adrena Club (الرويبة)' : 'Guidage en direct vers Adrena Club (Rouiba)'}
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-amber-400 flex-shrink-0" />
                </button>

                {/* Action 2: WhatsApp (Secondary) */}
                <button
                  type="button"
                  onClick={handleWhatsAppNotify}
                  className="w-full p-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-300 transition-all cursor-pointer flex items-center justify-between gap-3 text-left rtl:text-right active:scale-[0.99]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-black text-emerald-950">
                        {isAr ? 'إشعار الاستقبال أو استفسار (WhatsApp)' : 'Prévenir l’accueil ou poser une question'}
                      </p>
                      <p className="text-[11px] text-emerald-800 font-medium">
                        {isAr ? 'رسالة جاهزة بالباقة لتجهيز شارتك' : 'Message pré-rempli pour valider votre venue'}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-emerald-700 rtl:rotate-180 flex-shrink-0" />
                </button>
              </div>

              <p className="text-center text-[11px] text-slate-400 font-medium">
                {isAr
                  ? 'مكتب الاستقبال مفتوح يومياً من 06:00 إلى 00:00 (منتصف الليل).'
                  : 'Accueil ouvert 7j/7 de 06h00 à 00h00 (minuit).'}
              </p>
            </div>
          )}
        </div>

        {/* Bottom Bar: Action-oriented & Clean */}
        <div className="p-4 pb-6 sm:pb-4 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between gap-3 flex-shrink-0">
          {step === 1 ? (
            <>
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-3.5 rounded-xl text-xs sm:text-sm font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-200/50 transition-colors cursor-pointer"
              >
                {isAr ? 'إلغاء' : 'Annuler'}
              </button>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm tracking-tight transition-all shadow-md active:scale-[0.98] cursor-pointer"
              >
                <span>{isAr ? 'نعم، ملفي جاهز للمتابعة' : 'Oui, mon dossier est prêt'}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
                <span>{isAr ? 'العودة للملف' : 'Retour au dossier'}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                {isAr ? 'إغلاق' : 'Fermer'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
