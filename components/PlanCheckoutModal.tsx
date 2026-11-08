'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  MapPin,
  Navigation,
  MessageCircle,
  Camera,
  IdCard,
  Banknote,
  Stethoscope,
  GraduationCap,
  Flame,
  Crown,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Clock,
  ExternalLink,
  ShieldCheck,
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
  const [checkedItems, setCheckedItems] = useState<{
    cni: boolean;
    photos: boolean;
    medical: boolean;
    cash: boolean;
    studentCard: boolean;
  }>({
    cni: false,
    photos: false,
    medical: false,
    cash: false,
    studentCard: false,
  });

  // Reset step & checks when opening new plan
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setCheckedItems({
        cni: false,
        photos: false,
        medical: false,
        cash: false,
        studentCard: false,
      });
    }
  }, [isOpen, plan?.name]);

  // Handle ESC key and scroll lock
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

  const durationLabelFr =
    plan.duration === '6m' ? '6 Mois (Semestriel)' : plan.duration === '3m' ? '3 Mois (Trimestriel)' : '1 Mois';
  const durationLabelAr =
    plan.duration === '6m' ? '6 أشهر (نصفي)' : plan.duration === '3m' ? '3 أشهر (فصلي)' : 'شهر واحد';

  const toggleCheck = (key: keyof typeof checkedItems) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleWhatsAppNotify = () => {
    const formattedP = formatPrice(plan.price);
    const durationTextFr =
      plan.duration === '3m' ? '3 mois (-10% + 1 sauna)' : plan.duration === '6m' ? '6 mois (-15% + 3 saunas)' : '1 mois';
    const durationTextAr =
      plan.duration === '3m' ? '3 أشهر (توفير 10% + ساونا)' : plan.duration === '6m' ? '6 أشهر (توفير 15% + 3 ساونا)' : 'شهر واحد';

    const studentSuffixFr = isStudentPlan ? " (avec ma carte d'étudiant)" : '';
    const studentSuffixAr = isStudentPlan ? ' (مع تقديم بطاقة الطالب الجامعية)' : '';

    const message =
      lang === 'fr'
        ? `Bonjour Adrena Club ! Je souhaite m'inscrire à la formule "${plan.name}"${studentSuffixFr} - Durée ${durationTextFr} (${formattedP} DA). Mon dossier d'inscription est prêt, pouvez-vous me confirmer que l'accueil est ouvert pour que je vienne aujourd'hui ?`
        : `السلام عليكم نادي أدرينا ! أود التسجيل في باقة "${plan.name}"${studentSuffixAr} - عرض ${durationTextAr} (${formattedP} دج). ملف التسجيل جاهز لدي، هل يمكنكم تأكيد تواجد الاستقبال لأتوجه إليكم اليوم للتسجيل واستلام شارتي؟`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    onClose();
  };

  const handleWhatsAppQuestions = () => {
    const formattedP = formatPrice(plan.price);
    const message =
      lang === 'fr'
        ? `Bonjour Adrena Club, je suis intéressé par la formule "${plan.name}" (${formattedP} DA) mais j'ai une question concernant mon dossier d'inscription avant de me déplacer.`
        : `السلام عليكم نادي أدرينا، أنا مهتم بباقة "${plan.name}" (${formattedP} دج) ولكن لدي استفسار بخصوص ملف التسجيل قبل القدوم إلى الصالة.`;

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
          ? `Bonjour Adrena Club, je souhaite profiter de ma première séance d'essai gratuite avant de préparer mon dossier complet. Quels sont vos créneaux aujourd'hui ?`
          : `السلام عليكم نادي أدرينا، أود الاستفادة من حصتي التجريبية المجانية الأولى قبل تجهيز الملف الطبي. ما هي أوقات الاستقبال المتاحة اليوم؟`;
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
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
        className="relative w-full max-w-xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] sm:max-h-[88vh] flex flex-col my-auto transition-all duration-300"
      >
        {/* Mobile Drag Indicator */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mt-2.5 sm:hidden flex-shrink-0" />

        {/* Modal Header */}
        <div className="p-4 sm:p-6 pb-3 sm:pb-4 border-b border-slate-100 flex items-center justify-between gap-3 flex-shrink-0 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-600 flex-shrink-0">
              {step === 1 ? <ShieldCheck className="w-5 h-5" /> : <Sparkles className="w-5 h-5 text-amber-500" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full bg-slate-900 text-amber-400">
                  {step === 1 ? (isAr ? 'المرحلة 1 من 2' : 'Étape 1 sur 2') : (isAr ? 'المرحلة 2 من 2' : 'Étape 2 sur 2')}
                </span>
                <span className="text-[11px] font-bold text-slate-500">
                  {step === 1 ? (isAr ? 'التحقق من الملف' : 'Vérification du dossier') : (isAr ? 'التوجه للصالة' : 'Direction le Club')}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-snug mt-0.5">
                {step === 1
                  ? isAr
                    ? 'هل ملفك جاهز للتسجيل الفوري؟'
                    : 'Votre dossier est-il prêt pour l’inscription ?'
                  : isAr
                  ? 'رائع! كيف تفضل المتابعة الآن؟'
                  : 'Parfait ! Comment souhaitez-vous procéder ?'}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer flex-shrink-0"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5">
          {/* Selected Plan Summary Pill Card */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 text-white shadow-md relative overflow-hidden">
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {isAr ? durationLabelAr : durationLabelFr}
                  </span>
                  {isStudentPlan && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center gap-1">
                      <GraduationCap className="w-3 h-3" />
                      <span>{isAr ? 'عرض طلابي مخفض' : 'Tarif Étudiant'}</span>
                    </span>
                  )}
                  {plan.saunaSessions > 0 && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      <span>{isAr ? `+ ${plan.saunaSessions} ساونا مهداة` : `+ ${plan.saunaSessions} sauna(s) offert(s)`}</span>
                    </span>
                  )}
                </div>
                <h4 className="text-base sm:text-lg font-black text-white leading-tight">
                  {plan.name}
                </h4>
              </div>

              <div className="text-left rtl:text-right sm:text-right rtl:sm:text-left flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-700/60">
                <div className="flex items-baseline gap-1.5" dir="ltr">
                  <span className="text-2xl sm:text-3xl font-black text-amber-400 tabular-nums">
                    {formatPrice(plan.price)}
                  </span>
                  <span className="text-xs font-bold text-slate-300">DA</span>
                </div>
                {plan.savings && plan.savings > 0 && (
                  <p className="text-[11px] font-extrabold text-emerald-400">
                    {isAr ? `وفرت ${formatPrice(plan.savings)} دج` : `Économie de ${formatPrice(plan.savings)} DA`}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* STEP 1: INTERACTIVE DOSSIER CHECKLIST */}
          {step === 1 && (
            <div className="space-y-3.5 animate-in fade-in duration-200">
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                {isAr
                  ? 'لتسليمك شارة العضوية والبدء في التمارين في نفس اليوم، يتوجب تقديم الوثائق التالية في مكتب الاستقبال (CUB1) :'
                  : 'Pour vous remettre votre badge d’adhérent et commencer le jour même, voici les pièces requises à l’accueil :' }
              </p>

              {/* Checklist Items */}
              <div className="space-y-2.5">
                {/* 1. Medical Certificate */}
                <div
                  onClick={() => toggleCheck('medical')}
                  className={`p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    checkedItems.medical
                      ? 'bg-amber-50/70 border-amber-400 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
                      <Stethoscope className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                        {isAr ? 'شهادة طبية للياقة البدنية' : 'Certificat médical d’aptitude'}
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                        {isAr ? 'أقل من 3 أشهر (من أي طبيب عام أو مختص)' : 'Datant de moins de 3 mois (médecin généraliste)'}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all flex-shrink-0 ${
                      checkedItems.medical
                        ? 'bg-amber-500 border-amber-500 text-slate-950'
                        : 'border-slate-300 bg-slate-50'
                    }`}
                  >
                    {checkedItems.medical && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                {/* 2. Photos */}
                <div
                  onClick={() => toggleCheck('photos')}
                  className={`p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    checkedItems.photos
                      ? 'bg-amber-50/70 border-amber-400 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
                      <Camera className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                        {isAr ? '2 صور شمسية حديثة' : '2 Photos d’identité'}
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                        {isAr ? 'لطبع وتسليم بطاقة العضوية فورياً' : 'Pour l’édition immédiate de votre carte'}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all flex-shrink-0 ${
                      checkedItems.photos
                        ? 'bg-amber-500 border-amber-500 text-slate-950'
                        : 'border-slate-300 bg-slate-50'
                    }`}
                  >
                    {checkedItems.photos && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                {/* 3. CNI */}
                <div
                  onClick={() => toggleCheck('cni')}
                  className={`p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    checkedItems.cni
                      ? 'bg-amber-50/70 border-amber-400 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 flex-shrink-0">
                      <IdCard className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                        {isAr ? 'نسخة من بطاقة التعريف (CNI) أو رخصة السياقة' : 'Pièce d’identité (CNI ou Permis)'}
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                        {isAr ? 'أو الدفتر العائلي للقصر أقل من 18 سنة' : 'Ou livret de famille pour les mineurs (-18)'}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all flex-shrink-0 ${
                      checkedItems.cni
                        ? 'bg-amber-500 border-amber-500 text-slate-950'
                        : 'border-slate-300 bg-slate-50'
                    }`}
                  >
                    {checkedItems.cni && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                {/* 4. Student Card (Only for Student Plans) */}
                {isStudentPlan && (
                  <div
                    onClick={() => toggleCheck('studentCard')}
                    className={`p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      checkedItems.studentCard
                        ? 'bg-amber-50/70 border-amber-400 shadow-xs'
                        : 'bg-amber-50/30 border-amber-300 hover:border-amber-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-700 flex-shrink-0">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                            {isAr ? 'بطاقة الطالب أو شهادة مدرسية' : 'Carte d’étudiant ou certificat'}
                          </p>
                          <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-amber-200 text-amber-900">
                            {isAr ? 'للتخفيض' : 'Obligatoire'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 font-medium mt-0.5">
                          {isAr ? 'لإثبات صفة الطالب والاستفادة من السعر المخفض' : 'Pour valider votre réduction étudiant à la réception'}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all flex-shrink-0 ${
                        checkedItems.studentCard
                          ? 'bg-amber-500 border-amber-500 text-slate-950'
                          : 'border-amber-300 bg-white'
                      }`}
                    >
                      {checkedItems.studentCard && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                )}

                {/* 5. Cash payment */}
                <div
                  onClick={() => toggleCheck('cash')}
                  className={`p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    checkedItems.cash
                      ? 'bg-amber-50/70 border-amber-400 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                      <Banknote className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                        {isAr ? `تسديد المبلغ نقداً (${formatPrice(plan.price)} دج)` : `Règlement en espèces (${formatPrice(plan.price)} DA)`}
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                        {isAr ? 'الدفع مباشرة في مكتب الاستقبال (CUB1)' : 'Directement au comptoir d’accueil du club'}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all flex-shrink-0 ${
                      checkedItems.cash
                        ? 'bg-amber-500 border-amber-500 text-slate-950'
                        : 'border-slate-300 bg-slate-50'
                    }`}
                  >
                    {checkedItems.cash && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
              </div>

              {/* Free Trial Smart Callout for users without medical certificate */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-amber-500 text-base">⚡</span>
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      {isAr ? 'ملفك ليس جاهزاً بعد؟' : 'Votre dossier n’est pas encore prêt ?'}
                    </p>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {isAr
                        ? 'يمكنك تجربة الصالة بحصة أولى مجانية (فقط حذاء نظيف وهوية).'
                        : 'Testez d’abord avec 1 séance d’essai gratuite (sans certificat ce jour-là).'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleTrialRedirect}
                  className="text-xs font-bold text-amber-800 hover:text-amber-950 underline underline-offset-2 whitespace-nowrap self-start sm:self-auto cursor-pointer"
                >
                  {isAr ? 'حجز الحصة التجريبية ↗' : 'Réserver l’essai offert ↗'}
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: IMMEDIATE ACTION (GPS DIRECTIONS VS WHATSAPP NOTIFICATION) */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-300 text-center">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center mx-auto mb-2.5 shadow-md">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="text-base sm:text-lg font-black text-slate-900">
                  {isAr ? 'ملفك مكتمل! ننتظرك في Adrena Club' : 'Votre dossier est complet ! Bienvenue à Adrena Club'}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto font-medium">
                  {isAr
                    ? 'فريق الاستقبال في انتظارك لتسليمك شارة الدخول فورياً لتنطلق في تمارينك.'
                    : 'Notre équipe à la réception vous remettra votre badge immédiatement pour commencer votre entraînement.'}
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-black text-slate-500 uppercase tracking-wider">
                  {isAr ? 'اختر خطوتك التالية :' : 'Choisissez votre prochaine étape :'}
                </p>

                {/* Option 1: GOOGLE MAPS ITINERARY (High intent) */}
                <button
                  type="button"
                  onClick={handleOpenMaps}
                  className="w-full group p-4 rounded-2xl bg-slate-900 hover:bg-black text-white border border-slate-900 shadow-md hover:shadow-xl transition-all cursor-pointer flex items-center justify-between gap-3 text-left rtl:text-right"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Navigation className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-black text-white">
                          {isAr ? 'التوجه مباشرة للصالة عبر GPS (خرائط Google)' : 'Aller au Club via GPS (Google Maps)'}
                        </span>
                        <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-amber-400 text-slate-950">
                          {isAr ? 'موصى به' : 'Direct'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 font-medium mt-0.5">
                        {isAr ? 'فتح مسار الوصول المباشر إلى الرويبة (Adrena Club)' : 'Ouvrir l’itinéraire vers Adrena Club (Rouiba)'}
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-amber-400 flex-shrink-0" />
                </button>

                {/* Option 2: WHATSAPP NOTIFICATION (Confirm or question) */}
                <button
                  type="button"
                  onClick={handleWhatsAppNotify}
                  className="w-full group p-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-300 transition-all cursor-pointer flex items-center justify-between gap-3 text-left rtl:text-right"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-xs">
                      <MessageCircle className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-black text-emerald-950">
                          {isAr ? 'إشعار الاستقبال بقدومي عبر واتساب' : 'Prévenir l’accueil de ma venue (WhatsApp)'}
                        </span>
                      </div>
                      <p className="text-xs text-emerald-800 font-medium mt-0.5">
                        {isAr ? 'تأكيد تواجدهم لتجهيز شارتك فور وصولك' : 'Message pré-rempli pour confirmer l’ouverture de l’accueil'}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-emerald-700 rtl:rotate-180 flex-shrink-0" />
                </button>
              </div>

              {/* Club Opening Hours Quick Reminder */}
              <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 flex items-center gap-2.5 text-xs text-slate-700">
                <Clock className="w-4 h-4 text-slate-500 flex-shrink-0" />
                <span className="leading-tight font-medium">
                  {isAr
                    ? 'أوقات الاستقبال وكمال الأجسام مفتوحة يومياً من 06:00 صباحاً إلى 00:00 منتصف الليل.'
                    : 'Accueil et musculation ouverts en continu de 06h00 à 00h00 minuit.'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Actions Bar */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3 flex-shrink-0">
          {step === 1 ? (
            <>
              <button
                type="button"
                onClick={handleWhatsAppQuestions}
                className="inline-flex items-center justify-center gap-1.5 py-3 px-3.5 sm:px-4 rounded-xl text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-200/70 border border-slate-300 transition-all cursor-pointer whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>{isAr ? 'لدي استفسار 💬' : 'J’ai une question'}</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md active:scale-[0.98] cursor-pointer"
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
                className="inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-200/70 border border-slate-300 transition-all cursor-pointer whitespace-nowrap"
              >
                <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                <span>{isAr ? 'العودة لمراجعة الملف' : 'Retour au dossier'}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="py-3 px-4 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
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
