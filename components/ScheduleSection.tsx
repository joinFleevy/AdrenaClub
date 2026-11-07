'use client';

import React, { useState, useMemo } from 'react';
import { Clock, Image as ImageIcon, Dumbbell, VolumeX } from 'lucide-react';
import { Language, content } from '@/data/content';
import { hommesSchedule, femmesSchedule, enfantsSchedule, ScheduleDay } from '@/data/schedules';

interface ScheduleSectionProps {
  lang: Language;
  onOpenPostersModal: (posterName?: string) => void;
}

type TabType = 'hommes' | 'femmes' | 'enfants';

export default function ScheduleSection({ lang, onOpenPostersModal }: ScheduleSectionProps) {
  const t = content[lang].planning;
  const isAr = lang === 'ar';
  const [activeTab, setActiveTab] = useState<TabType>('hommes');
  const [mobileDay, setMobileDay] = useState<string>('today');
  const [mobileViewAll, setMobileViewAll] = useState<boolean>(false);

  const currentSchedule: ScheduleDay[] = useMemo(() => {
    return activeTab === 'hommes'
      ? hommesSchedule
      : activeTab === 'femmes'
      ? femmesSchedule
      : enfantsSchedule;
  }, [activeTab]);

  const getTodayId = (): string => {
    const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    const dayIndex = new Date().getDay();
    return days[dayIndex];
  };

  const todayId = getTodayId();
  const activeMobileDayId = mobileDay === 'today' ? todayId : mobileDay;

  const mobileFilteredSchedule = useMemo(() => {
    if (mobileViewAll) return currentSchedule;
    const found = currentSchedule.filter((d) => d.dayId === activeMobileDayId);
    return found.length > 0 ? found : currentSchedule.slice(0, 1);
  }, [currentSchedule, mobileViewAll, activeMobileDayId]);

  // Cleanly parse muscu slot to avoid awkward line wrapping
  const parseMuscuSlot = (rawSlot: string) => {
    const match = rawSlot.match(/^([\d:]+\s*[-–]\s*[\d:]+)(?:\s*\((.*?)\))?/);
    if (!match) return { time: rawSlot, period: '' };

    const time = match[1].replace('-', '–').trim();
    let period = match[2] || '';

    if (period.toLowerCase().includes('soirée continue')) {
      period = isAr ? 'مستمر' : 'Non-stop';
    } else if (period.toLowerCase().includes('après-midi & soirée') || period.toLowerCase().includes('après-midi')) {
      period = isAr ? 'مساءً' : 'Après-midi';
    } else if (period.toLowerCase().includes('matinée') || period.toLowerCase().includes('matin')) {
      period = isAr ? 'صباحاً' : 'Matin';
    } else if (period.toLowerCase().includes('midi')) {
      period = isAr ? 'ظهيرة' : 'Midi';
    } else if (period.toLowerCase().includes('journée continue')) {
      period = isAr ? 'مستمر' : 'Non-stop';
    } else if (period.toLowerCase().includes('soirée')) {
      period = isAr ? 'مساءً' : 'Soirée';
    }

    return { time, period };
  };

  return (
    <section id="planning" className="py-12 sm:py-20 lg:py-28 scroll-mt-20 sm:scroll-mt-28 relative bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with clear clearance */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs sm:text-sm font-extrabold text-amber-800 uppercase tracking-wider block mb-2">
              {isAr ? 'مواعيد دقيقة 7/7 أيام' : 'Plannings Officiels 2026'}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              {t.title}
            </h2>
            <p className="mt-2 text-base text-slate-600 max-w-[60ch] leading-relaxed font-medium">
              {t.subtitle}
            </p>
          </div>

          <button
            onClick={() => onOpenPostersModal(activeTab)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 transition-all self-start md:self-auto shadow-xs"
          >
            <ImageIcon className="w-4 h-4 text-amber-600" />
            <span>{t.openPosterBtn}</span>
          </button>
        </div>

        {/* Audience Switcher - Clean, Direct 3-Segment Selector */}
        <div className="mb-6 flex justify-center">
          <div className="w-full max-w-sm sm:max-w-md bg-white p-1.5 rounded-2xl border border-slate-200 grid grid-cols-3 gap-1.5 shadow-sm" role="tablist" aria-label="Catégorie de membres">
            <button
              role="tab"
              aria-selected={activeTab === 'hommes'}
              onClick={() => setActiveTab('hommes')}
              className={`py-2 px-3 rounded-xl font-black text-xs sm:text-sm transition-all text-center cursor-pointer ${
                activeTab === 'hommes'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t.tabs.hommes}
            </button>

            <button
              role="tab"
              aria-selected={activeTab === 'femmes'}
              onClick={() => setActiveTab('femmes')}
              className={`py-2 px-3 rounded-xl font-black text-xs sm:text-sm transition-all text-center leading-tight cursor-pointer ${
                activeTab === 'femmes'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {isAr ? 'النساء' : 'Femmes'}
            </button>

            <button
              role="tab"
              aria-selected={activeTab === 'enfants'}
              onClick={() => setActiveTab('enfants')}
              className={`py-2 px-3 rounded-xl font-black text-xs sm:text-sm transition-all text-center cursor-pointer ${
                activeTab === 'enfants'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t.tabs.enfants}
            </button>
          </div>
        </div>

        {/* Audience Note */}
        <div className="mb-4 text-xs sm:text-sm text-slate-600 flex items-center gap-2 font-medium px-1">
          <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
          <span>{t.notes[activeTab]}</span>
        </div>

        {/* Mobile Day Selector Strip (Zero-scroll day navigation) */}
        <div className="md:hidden mb-5">
          <div className="flex items-center justify-between mb-2.5 px-1">
            <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>{isAr ? 'اختر اليوم :' : 'Sélectionner le jour :'}</span>
            </span>
            <button
              onClick={() => setMobileViewAll(!mobileViewAll)}
              className="text-xs font-bold text-amber-700 hover:underline p-1"
            >
              {mobileViewAll
                ? (isAr ? 'عرض يوم بيوم' : 'Vue jour par jour')
                : (isAr ? 'عرض الأسبوع كاملاً (7)' : 'Voir les 7 jours')}
            </button>
          </div>

          {!mobileViewAll && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              <button
                onClick={() => setMobileDay('today')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap min-h-[42px] flex items-center gap-1.5 transition-all ${
                  mobileDay === 'today'
                    ? 'bg-amber-500 text-slate-950 shadow-sm font-black'
                    : 'bg-white text-slate-700 border border-slate-300'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>{isAr ? 'اليوم' : "Aujourd'hui"}</span>
              </button>

              {currentSchedule.map((d) => {
                const isSelected = mobileDay === d.dayId;
                const isCurrentToday = d.dayId === todayId;
                return (
                  <button
                    key={d.dayId}
                    onClick={() => setMobileDay(d.dayId)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap min-h-[42px] transition-all flex items-center gap-1 ${
                      isSelected
                        ? 'bg-slate-900 text-white font-black shadow-sm'
                        : 'bg-white text-slate-700 border border-slate-300'
                    }`}
                  >
                    <span>{isAr ? d.dayNameAr : d.dayNameFr.slice(0, 3)}</span>
                    {isCurrentToday && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Mobile View: Single Selected Day Card (or All if requested) */}
        <div className="md:hidden space-y-4">
          {mobileFilteredSchedule.map((day) => {
            const isToday = day.dayId === todayId;
            const visibleActivities = day.activities;
            const showMuscu = day.muscuSlots.length > 0;
            const hasEntries = visibleActivities.length > 0 || showMuscu;

            return (
              <div
                key={day.dayId}
                className={`flex flex-col justify-between p-5 rounded-2xl border transition-all ${
                  isToday
                    ? 'bg-white border-2 border-amber-500 shadow-xl ring-2 ring-amber-500/20'
                    : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-200">
                    <span className="text-lg font-black text-slate-900">
                      {lang === 'fr' ? day.dayNameFr : day.dayNameAr}
                    </span>
                    {isToday && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-black">
                        {lang === 'fr' ? "Aujourd'hui" : 'اليوم'}
                      </span>
                    )}
                  </div>

                  {visibleActivities.length > 0 && (
                    <div className="space-y-2.5 mb-3.5">
                      {visibleActivities.map((act, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-slate-50 border border-slate-200"
                        >
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-sm sm:text-base font-bold text-slate-900 font-sans leading-snug">
                              {lang === 'fr' ? act.nameFr : act.nameAr}
                            </span>
                            {act.badge && (
                              <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md bg-white text-slate-700 border border-slate-300 font-sans flex-shrink-0">
                                {act.badge}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-200">
                            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-sans font-semibold text-amber-800 tabular-nums whitespace-nowrap">
                              <Clock className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                              <span dir="ltr" className="inline-block tabular-nums font-sans">{act.time.replace('-', '–')}</span>
                            </div>
                            {act.musicMode === 'without_music' && (
                              <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-sans whitespace-nowrap flex-shrink-0">
                                <VolumeX className="w-3.5 h-3.5 text-emerald-600" />
                                <span>{lang === 'fr' ? 'Sans musique' : 'بدون موسيقى'}</span>
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {showMuscu && (
                    <div className="space-y-2">
                      {day.muscuSlots.map((rawSlot, idx) => {
                        const { time } = parseMuscuSlot(rawSlot);
                        return (
                          <div
                            key={idx}
                            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-sans gap-2"
                          >
                            <div className="flex items-center gap-2 text-slate-900">
                              <Dumbbell className="w-4 h-4 text-amber-500 flex-shrink-0" />
                              <span className="font-bold text-sm whitespace-nowrap">
                                {lang === 'fr' ? 'Musculation' : 'حديد حر'}
                              </span>
                            </div>
                            <span dir="ltr" className="font-sans font-semibold text-amber-800 tabular-nums text-xs sm:text-sm whitespace-nowrap flex-shrink-0">
                              {time}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {!hasEntries && (
                    <div className="py-6 text-center text-sm text-slate-500 font-medium font-sans">
                      {lang === 'fr' ? 'Aucun créneau programmé ce jour' : 'لا توجد حصص مبرمجة في هذا اليوم'}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop View: Full 7-Day Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {currentSchedule.map((day) => {
            const isToday = day.dayId === todayId;
            const visibleActivities = day.activities;
            const showMuscu = day.muscuSlots.length > 0;
            const hasEntries = visibleActivities.length > 0 || showMuscu;

            return (
              <div
                key={day.dayId}
                className={`flex flex-col justify-between p-5 sm:p-6 rounded-2xl border transition-all ${
                  isToday
                    ? 'bg-white border-2 border-amber-500 shadow-xl ring-2 ring-amber-500/20'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                <div>
                  {/* Day Header */}
                  <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-200">
                    <span className="text-lg sm:text-xl font-black text-slate-900">
                      {lang === 'fr' ? day.dayNameFr : day.dayNameAr}
                    </span>
                    {isToday && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-black">
                        {lang === 'fr' ? "Aujourd'hui" : 'اليوم'}
                      </span>
                    )}
                  </div>

                  {/* Coached Activities */}
                  {visibleActivities.length > 0 && (
                    <div className="space-y-2.5 mb-3.5">
                      {visibleActivities.map((act, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-400 transition-colors"
                        >
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-sm sm:text-base font-bold text-slate-900 font-sans leading-snug">
                              {lang === 'fr' ? act.nameFr : act.nameAr}
                            </span>
                            {act.badge && (
                              <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md bg-white text-slate-700 border border-slate-300 uppercase tracking-wider font-sans flex-shrink-0">
                                {act.badge}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-200">
                            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-sans font-semibold text-amber-800 tabular-nums whitespace-nowrap">
                              <Clock className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                              <span dir="ltr" className="inline-block tabular-nums font-sans">{act.time.replace('-', '–')}</span>
                            </div>
                            {act.musicMode === 'without_music' && (
                              <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-sans whitespace-nowrap flex-shrink-0">
                                <VolumeX className="w-3.5 h-3.5 text-emerald-600" />
                                <span>{lang === 'fr' ? 'Sans musique' : 'بدون موسيقى'}</span>
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Musculation open access */}
                  {showMuscu && (
                    <div className="space-y-2">
                      {day.muscuSlots.map((rawSlot, idx) => {
                        const { time } = parseMuscuSlot(rawSlot);
                        return (
                          <div
                            key={idx}
                            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-sans gap-2"
                          >
                            <div className="flex items-center gap-2 text-slate-900">
                              <Dumbbell className="w-4 h-4 text-amber-500 flex-shrink-0" />
                              <span className="font-bold text-sm whitespace-nowrap">
                                {lang === 'fr' ? 'Musculation' : 'حديد حر'}
                              </span>
                            </div>
                            <span dir="ltr" className="font-sans font-semibold text-amber-800 tabular-nums text-xs sm:text-sm whitespace-nowrap flex-shrink-0">
                              {time}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Empty state when discipline has no sessions this day */}
                  {!hasEntries && (
                    <div className="py-8 text-center text-sm text-slate-500 font-semibold font-sans">
                      {lang === 'fr' ? 'Pas de séance ce jour' : 'لا توجد حصص في هذا اليوم'}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

