'use client';

import React, { useState } from 'react';
import { Clock, Image as ImageIcon } from 'lucide-react';
import { Language, content } from '@/data/content';
import { hommesSchedule, femmesSchedule, enfantsSchedule, ScheduleDay } from '@/data/schedules';

interface ScheduleSectionProps {
  lang: Language;
  onOpenPostersModal: (posterName?: string) => void;
}

type TabType = 'hommes' | 'femmes' | 'enfants';

export default function ScheduleSection({ lang, onOpenPostersModal }: ScheduleSectionProps) {
  const t = content[lang].planning;
  const [activeTab, setActiveTab] = useState<TabType>('hommes');

  const currentSchedule: ScheduleDay[] =
    activeTab === 'hommes'
      ? hommesSchedule
      : activeTab === 'femmes'
      ? femmesSchedule
      : enfantsSchedule;

  const getTodayId = (): string => {
    const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    const dayIndex = new Date().getDay();
    return days[dayIndex];
  };

  const todayId = getTodayId();

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

        {/* Tab Selection */}
        <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 bg-adrena-card/80 border border-adrena-border rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('hommes')}
            className={`px-5 py-2.5 rounded-lg font-display font-black text-xs sm:text-sm uppercase tracking-wider transition-all ${
              activeTab === 'hommes'
                ? 'bg-adrena-gold text-black shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {t.tabs.hommes}
          </button>

          <button
            onClick={() => setActiveTab('femmes')}
            className={`px-5 py-2.5 rounded-lg font-display font-black text-xs sm:text-sm uppercase tracking-wider transition-all ${
              activeTab === 'femmes'
                ? 'bg-adrena-gold text-black shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {t.tabs.femmes}
          </button>

          <button
            onClick={() => setActiveTab('enfants')}
            className={`px-5 py-2.5 rounded-lg font-display font-black text-xs sm:text-sm uppercase tracking-wider transition-all ${
              activeTab === 'enfants'
                ? 'bg-adrena-gold text-black shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {t.tabs.enfants}
          </button>
        </div>

        {/* Note Line */}
        <div className="mb-8 text-xs sm:text-sm text-neutral-300 flex items-center gap-2 font-medium">
          <span className="w-2 h-2 rounded-full bg-adrena-gold flex-shrink-0" />
          <span>{t.notes[activeTab]}</span>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {currentSchedule.map((day) => {
            const isToday = day.dayId === todayId;
            return (
              <div
                key={day.dayId}
                className={`flex flex-col justify-between p-5 rounded-xl border transition-all ${
                  isToday
                    ? 'bg-adrena-card border-adrena-gold shadow-lg'
                    : 'bg-adrena-card/60 border-adrena-border hover:border-neutral-700'
                }`}
              >
                <div>
                  {/* Day Header */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
                    <span className="font-display text-lg font-black text-white uppercase tracking-wider">
                      {lang === 'fr' ? day.dayNameFr : day.dayNameAr}
                    </span>
                    {isToday && (
                      <span className="font-display px-2 py-0.5 rounded bg-adrena-gold text-black text-[10px] font-black uppercase tracking-wider">
                        {lang === 'fr' ? "Aujourd'hui" : 'اليوم'}
                      </span>
                    )}
                  </div>

                  {/* Musculation */}
                  {day.muscuSlots.length > 0 && (
                    <div className="mb-3">
                      <span className="font-display text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-1.5">
                        Musculation
                      </span>
                      <div className="space-y-1">
                        {day.muscuSlots.map((slot, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-black/40 border border-white/5 text-xs font-mono tabular-nums text-neutral-200"
                          >
                            <Clock className="w-3 h-3 text-neutral-400" />
                            <span>{slot}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Activities */}
                  {day.activities.length > 0 && (
                    <div>
                      <span className="font-display text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-1.5">
                        {lang === 'fr' ? 'Séances du jour' : 'الحصص'}
                      </span>
                      <div className="space-y-1.5">
                        {day.activities.map((act, idx) => (
                          <div key={idx} className="p-2.5 rounded bg-black/50 border border-white/5">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="text-xs sm:text-sm font-bold text-white">
                                {lang === 'fr' ? act.nameFr : act.nameAr}
                              </span>
                              {act.badge && (
                                <span className="font-display text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/10 text-neutral-300 uppercase tracking-wider">
                                  {act.badge}
                                </span>
                              )}
                            </div>
                            <span className="text-xs font-mono tabular-nums text-adrena-gold font-bold">{act.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {day.muscuSlots.length === 0 && day.activities.length === 0 && (
                    <div className="py-4 text-center text-xs text-neutral-500 font-medium">
                      {lang === 'fr' ? 'Aucun cours programmé' : 'لا توجد حصص'}
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
