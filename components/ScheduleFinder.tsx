'use client';

import React, { useState, useMemo } from 'react';
import { Search, Clock, Users, Dumbbell, Shield, Flame, Check } from 'lucide-react';
import { Language, content } from '@/data/content';
import { hommesSchedule, femmesSchedule, enfantsSchedule } from '@/data/schedules';

interface ScheduleFinderProps {
  lang: Language;
}

interface FilteredSession {
  id: string;
  dayId: string;
  dayName: string;
  audience: 'hommes' | 'femmes' | 'enfants';
  audienceLabel: string;
  title: string;
  time: string;
  category: 'muscu' | 'combat' | 'cross' | 'other';
  badge?: string;
  badgeColor?: string;
}

export default function ScheduleFinder({ lang }: ScheduleFinderProps) {
  const t = content[lang].scheduleFinder;
  const isAr = lang === 'ar';

  const daysList = useMemo(() => [
    { id: 'all', label: isAr ? 'جميع الأيام' : 'Tous les jours' },
    { id: 'samedi', label: isAr ? 'السبت' : 'Samedi' },
    { id: 'dimanche', label: isAr ? 'الأحد' : 'Dimanche' },
    { id: 'lundi', label: isAr ? 'الإثنين' : 'Lundi' },
    { id: 'mardi', label: isAr ? 'الثلاثاء' : 'Mardi' },
    { id: 'mercredi', label: isAr ? 'الأربعاء' : 'Mercredi' },
    { id: 'jeudi', label: isAr ? 'الخميس' : 'Jeudi' },
    { id: 'vendredi', label: isAr ? 'الجمعة' : 'Vendredi' },
  ], [isAr]);

  const disciplineCategories = useMemo(() => [
    { id: 'all', label: isAr ? 'جميع الرياضات' : 'Toutes disciplines', icon: Dumbbell },
    { id: 'combat', label: isAr ? 'فنون القتال (بوكسينغ، جودو، مصارعة)' : 'Combat (Boxe, Judo, Lutte)', icon: Shield },
    { id: 'cross', label: isAr ? 'كروس ترينينغ' : 'Cross-Training', icon: Flame },
    { id: 'muscu', label: isAr ? 'كمال الأجسام' : 'Musculation', icon: Dumbbell },
  ], [isAr]);

  const audienceFilters = useMemo(() => [
    { id: 'all', label: isAr ? 'الكل' : 'Tous' },
    { id: 'hommes', label: isAr ? 'رجال' : 'Hommes' },
    { id: 'femmes', label: isAr ? 'نساء (بدون موسيقى)' : 'Femmes' },
    { id: 'enfants', label: isAr ? 'أطفال' : 'Enfants' },
  ], [isAr]);

  const [selectedDay, setSelectedDay] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAudience, setSelectedAudience] = useState<string>('all');

  // Compile all sessions into a flat searchable array
  const allSessions = useMemo<FilteredSession[]>(() => {
    const list: FilteredSession[] = [];

    const processSchedule = (
      schedule: typeof hommesSchedule,
      audience: 'hommes' | 'femmes' | 'enfants',
      audienceLabel: string
    ) => {
      schedule.forEach((day) => {
        // Muscu slot if present
        day.muscuSlots.forEach((slot, idx) => {
          list.push({
            id: `${audience}-${day.dayId}-muscu-${idx}`,
            dayId: day.dayId,
            dayName: isAr ? day.dayNameAr : day.dayNameFr,
            audience,
            audienceLabel,
            title: isAr ? 'كمال الأجسام وحمل الأثقال' : 'Musculation & Cardio',
            time: slot,
            category: 'muscu',
            badge: isAr ? 'حديد حر' : 'Plateau',
            badgeColor: 'bg-zinc-800 text-neutral-300 border-zinc-700',
          });
        });

        // Specific structured classes
        day.activities.forEach((act, aIdx) => {
          let category: FilteredSession['category'] = 'other';
          const nameLower = act.nameFr.toLowerCase();
          if (nameLower.includes('kickboxing') || nameLower.includes('lutte') || nameLower.includes('judo')) {
            category = 'combat';
          } else if (nameLower.includes('cross')) {
            category = 'cross';
          }

          list.push({
            id: `${audience}-${day.dayId}-act-${aIdx}`,
            dayId: day.dayId,
            dayName: isAr ? day.dayNameAr : day.dayNameFr,
            audience,
            audienceLabel,
            title: isAr ? act.nameAr : act.nameFr,
            time: act.time,
            category,
            badge: act.badge,
            badgeColor: act.badgeColor,
          });
        });
      });
    };

    processSchedule(hommesSchedule, 'hommes', isAr ? 'رجال' : 'Hommes');
    processSchedule(femmesSchedule, 'femmes', isAr ? 'نساء' : 'Femmes');
    processSchedule(enfantsSchedule, 'enfants', isAr ? 'أطفال' : 'Enfants');

    return list;
  }, [isAr]);

  // Filter based on user's active choices
  const filteredSessions = useMemo(() => {
    return allSessions.filter((sess) => {
      const matchDay = selectedDay === 'all' || sess.dayId === selectedDay;
      const matchCategory = selectedCategory === 'all' || sess.category === selectedCategory;
      const matchAudience = selectedAudience === 'all' || sess.audience === selectedAudience;
      return matchDay && matchCategory && matchAudience;
    });
  }, [allSessions, selectedDay, selectedCategory, selectedAudience]);

  return (
    <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-adrena-card/90 border border-adrena-border shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-adrena-border">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-adrena-gold/10 border border-adrena-gold/30 text-adrena-gold text-xs font-display font-semibold uppercase tracking-wider mb-2">
            <Search className="w-3.5 h-3.5" />
            <span>{isAr ? 'البحث السريع في الحصص' : 'Filtre Express de Cours'}</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
            {t.title}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 mt-1">
            {t.subtitle}
          </p>
        </div>

        {/* Counter of results */}
        <div className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-neutral-900 border border-white/10 text-neutral-300 self-start md:self-auto">
          <span className="text-adrena-gold font-bold mr-1 rtl:mr-0 rtl:ml-1">{filteredSessions.length}</span>
          {t.classesFound}
        </div>
      </div>

      {/* Filter Controls Row 1: Days */}
      <div className="mb-4">
        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 font-display">
          {t.dayLabel}
        </label>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {daysList.map((day) => (
            <button
              key={day.id}
              onClick={() => setSelectedDay(day.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-150 ${
                selectedDay === day.id
                  ? 'bg-adrena-gold text-black shadow-md'
                  : 'bg-black/40 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-white/5'
              }`}
            >
              {day.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Controls Row 2: Discipline & Audience */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 font-display">
            {t.disciplineLabel}
          </label>
          <div className="flex flex-wrap gap-1.5">
            {disciplineCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'bg-black/40 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-white/5'
                }`}
              >
                <cat.icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 font-display">
            {isAr ? 'الفئة المستهدفة' : 'Public'}
          </label>
          <div className="flex flex-wrap gap-1.5">
            {audienceFilters.map((aud) => (
              <button
                key={aud.id}
                onClick={() => setSelectedAudience(aud.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                  selectedAudience === aud.id
                    ? 'bg-adrena-gold/90 text-black font-bold shadow-md'
                    : 'bg-black/40 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-white/5'
                }`}
              >
                {aud.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Grid */}
      {filteredSessions.length === 0 ? (
        <div className="p-8 text-center rounded-2xl bg-black/40 border border-dashed border-neutral-800 text-neutral-400 text-sm">
          {t.noClasses}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[440px] overflow-y-auto pr-1 rtl:pr-0 rtl:pl-1">
          {filteredSessions.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-black/50 border border-white/5 hover:border-adrena-gold/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold font-display uppercase tracking-wider text-adrena-gold">
                    {item.dayName}
                  </span>
                  <span
                    className={`text-[11px] font-medium px-2 py-0.5 rounded border ${
                      item.audience === 'femmes'
                        ? 'bg-pink-500/10 text-pink-300 border-pink-500/20'
                        : item.audience === 'enfants'
                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                        : 'bg-blue-500/10 text-blue-300 border-blue-500/20'
                    }`}
                  >
                    {item.audienceLabel}
                  </span>
                </div>
                <h4 className="font-display text-sm font-bold text-white mb-2 line-clamp-1">
                  {item.title}
                </h4>
              </div>

              <div className="flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-white/5">
                <span className="flex items-center gap-1 text-neutral-300 font-mono text-[11px]">
                  <Clock className="w-3 h-3 text-neutral-400" />
                  {item.time}
                </span>
                {item.badge && (
                  <span className="text-[10px] uppercase font-bold text-neutral-400 px-1.5 py-0.5 rounded bg-white/5">
                    {item.badge}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
