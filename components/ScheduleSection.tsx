'use client';

import React, { useState, useMemo } from 'react';
import { Clock, Image as ImageIcon, Dumbbell, Shield, Flame } from 'lucide-react';
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

  const disciplinePills: Array<{ id: DisciplineFilter; label: string; icon?: React.ElementType }> = [
    { id: 'all', label: isAr ? 'كل التخصصات' : 'Toutes disciplines' },
    { id: 'combat', label: isAr ? 'قتال ودفاع' : 'Combat & Boxe', icon: Shield },
    { id: 'cross', label: isAr ? 'كروس ترينينغ' : 'Cross-Training', icon: Flame },
    { id: 'muscu', label: isAr ? 'كمال أجسام' : 'Musculation', icon: Dumbbell },
  ];

  return (
    <section id="planning" className="py-20 relative bg-adrena-black border-b border-adrena-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header without generic kicker pills */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase leading-none">
              {t.title}
            </h2>
            <p className="mt-3 text-base text-neutral-300 max-w-[65ch] leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          <button
            onClick={() => onOpenPostersModal(activeTab)}
            className="font-display inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-adrena-gold hover:text-black border border-white/10 text-sm font-bold uppercase tracking-wider text-neutral-200 transition-all self-start md:self-auto"
          >
            <ImageIcon className="w-4 h-4 text-adrena-gold" />
            <span>{t.openPosterBtn}</span>
          </button>
        </div>

        {/* Filter Controls Row: Audience Tabs + Discipline Filter */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          {/* Audience Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-adrena-card border border-adrena-border rounded-xl w-fit">
            <button
              onClick={() => setActiveTab('hommes')}
              className={`px-4 sm:px-5 py-2.5 rounded-lg font-display font-black text-xs sm:text-sm uppercase tracking-wider transition-all ${
                activeTab === 'hommes'
                  ? 'bg-adrena-gold text-black shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {t.tabs.hommes}
            </button>

            <button
              onClick={() => setActiveTab('femmes')}
              className={`px-4 sm:px-5 py-2.5 rounded-lg font-display font-black text-xs sm:text-sm uppercase tracking-wider transition-all ${
                activeTab === 'femmes'
                  ? 'bg-adrena-gold text-black shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {t.tabs.femmes}
            </button>

            <button
              onClick={() => setActiveTab('enfants')}
              className={`px-4 sm:px-5 py-2.5 rounded-lg font-display font-black text-xs sm:text-sm uppercase tracking-wider transition-all ${
                activeTab === 'enfants'
                  ? 'bg-adrena-gold text-black shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {t.tabs.enfants}
            </button>
          </div>

          {/* Discipline In-Place Filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            {disciplinePills.map((p) => {
              const Icon = p.icon;
              const isActive = activeDiscipline === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveDiscipline(p.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-sans font-bold transition-all ${
                    isActive
                      ? 'bg-white text-black shadow-md'
                      : 'bg-black/40 text-neutral-300 hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  <span>{p.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Note Line */}
        <div className="mb-8 text-xs sm:text-sm text-neutral-300 flex items-center gap-2 font-medium">
          <span className="w-2 h-2 rounded-full bg-adrena-gold flex-shrink-0" />
          <span>{t.notes[activeTab]}</span>
        </div>

        {/* Unified 7-Day Grid: Single, Distilled, Non-Repetitive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
                className={`flex flex-col justify-between p-5 rounded-2xl border transition-all ${
                  isToday
                    ? 'bg-adrena-card border-adrena-gold/80 shadow-xl ring-1 ring-adrena-gold/30'
                    : 'bg-adrena-card/70 border-adrena-border hover:border-neutral-700'
                }`}
              >
                <div>
                  {/* Day Header */}
                  <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-white/5">
                    <span className="font-sans text-base font-extrabold text-white uppercase tracking-wider">
                      {lang === 'fr' ? day.dayNameFr : day.dayNameAr}
                    </span>
                    {isToday && (
                      <span className="font-sans px-2.5 py-0.5 rounded-full bg-adrena-gold/15 border border-adrena-gold/40 text-adrena-gold text-[10px] font-bold uppercase tracking-wider">
                        {lang === 'fr' ? "Aujourd'hui" : 'اليوم'}
                      </span>
                    )}
                  </div>

                  {/* Coached Activities first */}
                  {visibleActivities.length > 0 && (
                    <div className="space-y-2 mb-3">
                      {visibleActivities.map((act, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-black/60 border border-white/10 hover:border-adrena-gold/30 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <span className="text-sm font-bold text-white font-sans leading-tight">
                              {lang === 'fr' ? act.nameFr : act.nameAr}
                            </span>
                            {act.badge && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-neutral-300 uppercase tracking-wider font-sans flex-shrink-0">
                                {act.badge}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-adrena-gold tabular-nums">
                            <Clock className="w-3.5 h-3.5 text-adrena-gold/80" />
                            <span>{act.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Musculation open access */}
                  {showMuscu && (
                    <div className="space-y-1.5">
                      {day.muscuSlots.map((slot, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between px-3 py-2 rounded-xl bg-neutral-900/60 border border-white/5 text-xs"
                        >
                          <span className="flex items-center gap-1.5 text-neutral-400 font-medium font-sans">
                            <Dumbbell className="w-3.5 h-3.5 text-adrena-gold/70 flex-shrink-0" />
                            <span>{lang === 'fr' ? 'Musculation' : 'حديد حر'}</span>
                          </span>
                          <span className="font-mono tabular-nums text-neutral-200 font-semibold">{slot}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Empty state when discipline has no sessions this day */}
                  {!hasEntries && (
                    <div className="py-6 text-center text-xs text-neutral-500 font-medium font-sans">
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
