'use client';

import React, { useState, useMemo } from 'react';
import { Clock, Image as ImageIcon, Dumbbell, Shield, Flame, VolumeX } from 'lucide-react';
import { Language, content } from '@/data/content';
import { hommesSchedule, femmesSchedule, enfantsSchedule, ScheduleDay } from '@/data/schedules';

interface ScheduleSectionProps {
  lang: Language;
  onOpenPostersModal: (posterName?: string) => void;
}

type TabType = 'hommes' | 'femmes' | 'enfants';
type DisciplineFilter = 'all' | 'combat' | 'cross' | 'muscu';

export default function ScheduleSection({ lang, onOpenPostersModal }: ScheduleSectionProps) {
  const t = content[lang].planning;
  const isAr = lang === 'ar';
  const [activeTab, setActiveTab] = useState<TabType>('hommes');
  const [activeDiscipline, setActiveDiscipline] = useState<DisciplineFilter>('all');
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

  const disciplinePills: Array<{ id: DisciplineFilter; label: string; icon?: React.ElementType }> = [
    { id: 'all', label: isAr ? 'كل التخصصات' : 'Toutes disciplines' },
    { id: 'combat', label: isAr ? 'قتال ودفاع' : 'Combat & Boxe', icon: Shield },
    { id: 'cross', label: isAr ? 'كروس ترينينغ' : 'Cross-Training', icon: Flame },
    { id: 'muscu', label: isAr ? 'كمال أجسام' : 'Musculation', icon: Dumbbell },
  ];

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
    <section id="planning" className="py-20 scroll-mt-28 relative bg-adrena-black border-b border-adrena-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with clear clearance */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              {t.title}
            </h2>
            <p className="mt-2 text-base text-adrena-stone max-w-[60ch] leading-relaxed font-medium">
              {t.subtitle}
            </p>
          </div>

          <button
            onClick={() => onOpenPostersModal(activeTab)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-adrena-card hover:bg-adrena-surface border border-adrena-border text-xs sm:text-sm font-bold text-adrena-stone hover:text-white transition-all self-start md:self-auto shadow-sm"
          >
            <ImageIcon className="w-4 h-4 text-adrena-gold" />
            <span>{t.openPosterBtn}</span>
          </button>
        </div>

        {/* Unified Controls Panel (Clean Segmented Selector & Horizontal Filter on Mobile) */}
        <div className="mb-6 p-2.5 sm:p-4 rounded-xl bg-adrena-card border border-adrena-border flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4 shadow-sm">
          {/* Audience Tabs - 3 Equal Segments on Mobile */}
          <div className="grid grid-cols-3 sm:flex items-center gap-1 p-1 bg-adrena-dark border border-adrena-border rounded-lg w-full sm:w-fit" role="tablist" aria-label="Catégorie de membres">
            <button
              role="tab"
              aria-selected={activeTab === 'hommes'}
              onClick={() => setActiveTab('hommes')}
              className={`py-2 px-3 sm:px-5 rounded-md font-extrabold text-xs sm:text-sm transition-all text-center ${
                activeTab === 'hommes'
                  ? 'bg-adrena-gold text-adrena-black shadow-sm'
                  : 'text-adrena-stone hover:text-white'
              }`}
            >
              {t.tabs.hommes}
            </button>

            <button
              role="tab"
              aria-selected={activeTab === 'femmes'}
              onClick={() => setActiveTab('femmes')}
              className={`py-2 px-3 sm:px-5 rounded-md font-extrabold text-xs sm:text-sm transition-all text-center leading-tight ${
                activeTab === 'femmes'
                  ? 'bg-adrena-gold text-adrena-black shadow-sm'
                  : 'text-adrena-stone hover:text-white'
              }`}
            >
              {isAr ? 'النساء' : 'Femmes'}
            </button>

            <button
              role="tab"
              aria-selected={activeTab === 'enfants'}
              onClick={() => setActiveTab('enfants')}
              className={`py-2 px-3 sm:px-5 rounded-md font-extrabold text-xs sm:text-sm transition-all text-center ${
                activeTab === 'enfants'
                  ? 'bg-adrena-gold text-adrena-black shadow-sm'
                  : 'text-adrena-stone hover:text-white'
              }`}
            >
              {t.tabs.enfants}
            </button>
          </div>

          {/* Discipline Filter - Sleek Horizontal Strip without screen-blocking wrapping */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5" role="radiogroup" aria-label="Filtrer par discipline">
            {disciplinePills.map((p) => {
              const Icon = p.icon;
              const isActive = activeDiscipline === p.id;
              return (
                <button
                  key={p.id}
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => setActiveDiscipline(p.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-adrena-surface text-white border border-adrena-gold shadow-sm'
                      : 'bg-adrena-dark text-adrena-stone hover:text-white border border-adrena-border'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5 text-adrena-gold flex-shrink-0" />}
                  <span>{p.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Audience Note */}
        <div className="mb-4 text-xs sm:text-sm text-adrena-stone flex items-center gap-2 font-medium px-1">
          <span className="w-2 h-2 rounded-full bg-adrena-gold flex-shrink-0" />
          <span>{t.notes[activeTab]}</span>
        </div>

        {/* Mobile Day Selector Strip (Zero-scroll day navigation) */}
        <div className="md:hidden mb-5">
          <div className="flex items-center justify-between mb-2.5 px-1">
            <span className="text-xs font-semibold text-adrena-bone flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-adrena-gold" />
              <span>{isAr ? 'اختر اليوم :' : 'Sélectionner le jour :'}</span>
            </span>
            <button
              onClick={() => setMobileViewAll(!mobileViewAll)}
              className="text-xs font-semibold text-adrena-gold hover:underline p-1"
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
                    ? 'bg-adrena-gold text-[#111215] shadow-sm'
                    : 'bg-adrena-card text-adrena-stone border border-adrena-border'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
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
                        ? 'bg-adrena-bone text-[#111215] font-bold shadow-sm'
                        : 'bg-adrena-card text-adrena-stone border border-adrena-border hover:text-adrena-bone'
                    }`}
                  >
                    <span>{isAr ? d.dayNameAr : d.dayNameFr.slice(0, 3)}</span>
                    {isCurrentToday && (
                      <span className="w-1.5 h-1.5 rounded-full bg-adrena-gold" />
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
            const visibleActivities = day.activities.filter((act) => {
              if (activeDiscipline === 'all') return true;
              if (activeDiscipline === 'muscu') return false;
              const nameLower = act.nameFr.toLowerCase();
              if (activeDiscipline === 'combat') {
                return nameLower.includes('kickboxing') || nameLower.includes('lutte') || nameLower.includes('judo');
              }
              if (activeDiscipline === 'cross') {
                return nameLower.includes('cross');
              }
              return true;
            });
            const showMuscu = (activeDiscipline === 'all' || activeDiscipline === 'muscu') && day.muscuSlots.length > 0;
            const hasEntries = visibleActivities.length > 0 || showMuscu;

            return (
              <div
                key={day.dayId}
                className={`flex flex-col justify-between p-5 rounded-2xl border transition-all ${
                  isToday
                    ? 'bg-adrena-card border-adrena-gold shadow-xl ring-1 ring-adrena-gold/40'
                    : 'bg-adrena-card border-adrena-border shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-adrena-border">
                    <span className="text-lg font-bold text-adrena-bone">
                      {lang === 'fr' ? day.dayNameFr : day.dayNameAr}
                    </span>
                    {isToday && (
                      <span className="px-2.5 py-0.5 rounded-full bg-adrena-gold/20 text-adrena-gold text-xs font-semibold">
                        {lang === 'fr' ? "Aujourd'hui" : 'اليوم'}
                      </span>
                    )}
                  </div>

                  {visibleActivities.length > 0 && (
                    <div className="space-y-2.5 mb-3.5">
                      {visibleActivities.map((act, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-adrena-surface border border-adrena-border"
                        >
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-sm sm:text-base font-bold text-adrena-bone font-sans leading-snug">
                              {lang === 'fr' ? act.nameFr : act.nameAr}
                            </span>
                            {act.badge && (
                              <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md bg-adrena-card text-adrena-stone border border-adrena-border font-sans flex-shrink-0">
                                {act.badge}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-between gap-2 pt-2 border-t border-adrena-border/60">
                            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-sans font-semibold text-adrena-gold tabular-nums whitespace-nowrap">
                              <Clock className="w-3.5 h-3.5 text-adrena-gold flex-shrink-0" />
                              <span dir="ltr" className="inline-block tabular-nums font-sans">{act.time.replace('-', '–')}</span>
                            </div>
                            {act.musicMode === 'without_music' && (
                              <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/35 font-sans whitespace-nowrap flex-shrink-0">
                                <VolumeX className="w-3.5 h-3.5 text-emerald-400" />
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
                            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-adrena-surface border border-adrena-border text-sm font-sans gap-2"
                          >
                            <div className="flex items-center gap-2 text-adrena-bone">
                              <Dumbbell className="w-4 h-4 text-adrena-gold flex-shrink-0" />
                              <span className="font-bold text-sm whitespace-nowrap">
                                {lang === 'fr' ? 'Musculation' : 'حديد حر'}
                              </span>
                            </div>
                            <span dir="ltr" className="font-sans font-semibold text-adrena-gold tabular-nums text-xs sm:text-sm whitespace-nowrap flex-shrink-0">
                              {time}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {!hasEntries && (
                    <div className="py-6 text-center text-sm text-adrena-muted font-medium font-sans">
                      {lang === 'fr' ? 'Aucun créneau programmé ce jour pour ce filtre' : 'لا توجد حصص مبرمجة اليوم لهذا التخصص'}
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

            // Filter activities according to activeDiscipline
            const visibleActivities = day.activities.filter((act) => {
              if (activeDiscipline === 'all') return true;
              if (activeDiscipline === 'muscu') return false;
              const nameLower = act.nameFr.toLowerCase();
              if (activeDiscipline === 'combat') {
                return nameLower.includes('kickboxing') || nameLower.includes('lutte') || nameLower.includes('judo');
              }
              if (activeDiscipline === 'cross') {
                return nameLower.includes('cross');
              }
              return true;
            });

            // Filter muscu slots according to activeDiscipline
            const showMuscu = (activeDiscipline === 'all' || activeDiscipline === 'muscu') && day.muscuSlots.length > 0;
            const hasEntries = visibleActivities.length > 0 || showMuscu;

            return (
              <div
                key={day.dayId}
                className={`flex flex-col justify-between p-5 sm:p-6 rounded-2xl border transition-all ${
                  isToday
                    ? 'bg-adrena-card border-adrena-gold shadow-xl ring-1 ring-adrena-gold/40'
                    : 'bg-adrena-card border-adrena-border hover:border-neutral-600 shadow-sm'
                }`}
              >
                <div>
                  {/* Day Header */}
                  <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-adrena-border">
                    <span className="text-lg sm:text-xl font-bold text-adrena-bone">
                      {lang === 'fr' ? day.dayNameFr : day.dayNameAr}
                    </span>
                    {isToday && (
                      <span className="px-2.5 py-0.5 rounded-full bg-adrena-gold/20 text-adrena-gold text-xs font-semibold">
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
                          className="p-3.5 rounded-xl bg-adrena-surface border border-adrena-border hover:border-adrena-gold/40 transition-colors"
                        >
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-sm sm:text-base font-bold text-adrena-bone font-sans leading-snug">
                              {lang === 'fr' ? act.nameFr : act.nameAr}
                            </span>
                            {act.badge && (
                              <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md bg-adrena-card text-adrena-stone border border-adrena-border uppercase tracking-wider font-sans flex-shrink-0">
                                {act.badge}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-between gap-2 pt-2 border-t border-adrena-border/60">
                            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-sans font-semibold text-adrena-gold tabular-nums whitespace-nowrap">
                              <Clock className="w-3.5 h-3.5 text-adrena-gold flex-shrink-0" />
                              <span dir="ltr" className="inline-block tabular-nums font-sans">{act.time.replace('-', '–')}</span>
                            </div>
                            {act.musicMode === 'without_music' && (
                              <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/35 font-sans whitespace-nowrap flex-shrink-0">
                                <VolumeX className="w-3.5 h-3.5 text-emerald-400" />
                                <span>{lang === 'fr' ? 'Sans musique' : 'بدون موسيقى'}</span>
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Musculation open access (Clean 1-line layout, zero text wrapping) */}
                  {showMuscu && (
                    <div className="space-y-2">
                      {day.muscuSlots.map((rawSlot, idx) => {
                        const { time } = parseMuscuSlot(rawSlot);
                        return (
                          <div
                            key={idx}
                            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-adrena-surface border border-adrena-border text-sm font-sans gap-2"
                          >
                            <div className="flex items-center gap-2 text-adrena-bone">
                              <Dumbbell className="w-4 h-4 text-adrena-gold flex-shrink-0" />
                              <span className="font-bold text-sm whitespace-nowrap">
                                {lang === 'fr' ? 'Musculation' : 'حديد حر'}
                              </span>
                            </div>
                            <span dir="ltr" className="font-sans font-semibold text-adrena-gold tabular-nums text-xs sm:text-sm whitespace-nowrap flex-shrink-0">
                              {time}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Empty state when discipline has no sessions this day */}
                  {!hasEntries && (
                    <div className="py-8 text-center text-sm text-adrena-muted font-semibold font-sans">
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

