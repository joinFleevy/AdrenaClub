export interface ScheduleDay {
  dayId: 'samedi' | 'dimanche' | 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi';
  dayNameFr: string;
  dayNameAr: string;
  muscuSlots: string[];
  activities: Array<{
    nameFr: string;
    nameAr: string;
    time: string;
    badge?: string;
    badgeColor?: string;
    musicMode?: 'without_music';
  }>;
}

export const hommesSchedule: ScheduleDay[] = [
  {
    dayId: 'samedi',
    dayNameFr: 'Samedi',
    dayNameAr: 'السبت',
    muscuSlots: ['13:00 - 00:00 (Soirée continue)'],
    activities: [
      { nameFr: 'Kickboxing 1', nameAr: 'كيك بوكسينغ 1', time: '18:00 - 19:30', badge: 'Combat', badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30' },
      { nameFr: 'CrossTraining', nameAr: 'كروس ترينينغ', time: '19:30 - 20:30', badge: 'WOD', badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
    ],
  },
  {
    dayId: 'dimanche',
    dayNameFr: 'Dimanche',
    dayNameAr: 'الأحد',
    muscuSlots: ['06:00 - 15:00 (Matin)', '19:00 - 00:00 (Soirée)'],
    activities: [
      { nameFr: 'Kickboxing 2 (Avancé)', nameAr: 'كيك بوكسينغ 2 (متقدم)', time: '19:00 - 20:30', badge: 'Combat', badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30' },
    ],
  },
  {
    dayId: 'lundi',
    dayNameFr: 'Lundi',
    dayNameAr: 'الإثنين',
    muscuSlots: ['06:00 - 12:00 (Matin)', '16:30 - 00:00 (Soirée)'],
    activities: [
      { nameFr: 'Kickboxing 1', nameAr: 'كيك بوكسينغ 1', time: '18:00 - 19:30', badge: 'Combat', badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30' },
      { nameFr: 'CrossTraining', nameAr: 'كروس ترينينغ', time: '19:30 - 20:30', badge: 'WOD', badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
    ],
  },
  {
    dayId: 'mardi',
    dayNameFr: 'Mardi',
    dayNameAr: 'الثلاثاء',
    muscuSlots: ['06:00 - 14:00 (Matin)', '19:00 - 00:00 (Soirée)'],
    activities: [
      { nameFr: 'Lutte', nameAr: 'المصارعة', time: '19:30 - 21:00', badge: 'Tatami', badgeColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
    ],
  },
  {
    dayId: 'mercredi',
    dayNameFr: 'Mercredi',
    dayNameAr: 'الأربعاء',
    muscuSlots: ['06:00 - 10:00 (Matin)', '16:30 - 00:00 (Soirée)'],
    activities: [
      { nameFr: 'Kickboxing 2 (Avancé)', nameAr: 'كيك بوكسينغ 2 (متقدم)', time: '18:00 - 19:30', badge: 'Combat', badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30' },
      { nameFr: 'CrossTraining', nameAr: 'كروس ترينينغ', time: '19:30 - 20:30', badge: 'WOD', badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
    ],
  },
  {
    dayId: 'jeudi',
    dayNameFr: 'Jeudi',
    dayNameAr: 'الخميس',
    muscuSlots: ['06:00 - 15:00 (Matin)', '19:00 - 00:00 (Soirée)'],
    activities: [
      { nameFr: 'Lutte', nameAr: 'المصارعة', time: '19:30 - 21:00', badge: 'Tatami', badgeColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
    ],
  },
  {
    dayId: 'vendredi',
    dayNameFr: 'Vendredi',
    dayNameAr: 'الجمعة',
    muscuSlots: ['15:30 - 00:00 (Après-midi & Soirée)'],
    activities: [
      { nameFr: 'Kickboxing 2 (Avancé)', nameAr: 'كيك بوكسينغ 2 (متقدم)', time: '18:30 - 20:00', badge: 'Combat', badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30' },
    ],
  },
];

export const femmesSchedule: ScheduleDay[] = [
  {
    dayId: 'samedi',
    dayNameFr: 'Samedi',
    dayNameAr: 'السبت',
    muscuSlots: ['09:00 - 13:00 (Matinée)'],
    activities: [],
  },
  {
    dayId: 'dimanche',
    dayNameFr: 'Dimanche',
    dayNameAr: 'الأحد',
    muscuSlots: ['15:00 - 19:00 (Après-midi)'],
    activities: [
      {
        nameFr: 'CrossTraining Femme',
        nameAr: 'كروس ترينينغ نسائي',
        time: '16:00 - 17:00',
        badge: 'Fitness',
        badgeColor: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
      },
      {
        nameFr: 'CrossTraining Femme',
        nameAr: 'كروس ترينينغ نسائي',
        time: '17:30 - 18:30',
        badge: 'Fitness',
        badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        musicMode: 'without_music',
      },
    ],
  },
  {
    dayId: 'lundi',
    dayNameFr: 'Lundi',
    dayNameAr: 'الإثنين',
    muscuSlots: ['12:00 - 16:30 (Midi)'],
    activities: [],
  },
  {
    dayId: 'mardi',
    dayNameFr: 'Mardi',
    dayNameAr: 'الثلاثاء',
    muscuSlots: ['14:00 - 19:00 (Après-midi)'],
    activities: [
      {
        nameFr: 'Kickboxing Femme',
        nameAr: 'كيك بوكسينغ نسائي',
        time: '14:00 - 15:15',
        badge: 'Self-Défense',
        badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30',
      },
      {
        nameFr: 'CrossTraining Femme',
        nameAr: 'كروس ترينينغ نسائي',
        time: '16:00 - 17:00',
        badge: 'Fitness',
        badgeColor: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
      },
      {
        nameFr: 'CrossTraining Femme',
        nameAr: 'كروس ترينينغ نسائي',
        time: '17:30 - 18:30',
        badge: 'Fitness',
        badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        musicMode: 'without_music',
      },
    ],
  },
  {
    dayId: 'mercredi',
    dayNameFr: 'Mercredi',
    dayNameAr: 'الأربعاء',
    muscuSlots: ['10:00 - 16:30 (Journée continue)'],
    activities: [],
  },
  {
    dayId: 'jeudi',
    dayNameFr: 'Jeudi',
    dayNameAr: 'الخميس',
    muscuSlots: ['15:00 - 19:00 (Après-midi)'],
    activities: [
      {
        nameFr: 'CrossTraining Femme',
        nameAr: 'كروس ترينينغ نسائي',
        time: '16:00 - 17:00',
        badge: 'Fitness',
        badgeColor: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
      },
      {
        nameFr: 'CrossTraining Femme',
        nameAr: 'كروس ترينينغ نسائي',
        time: '17:30 - 18:30',
        badge: 'Fitness',
        badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        musicMode: 'without_music',
      },
    ],
  },
  {
    dayId: 'vendredi',
    dayNameFr: 'Vendredi',
    dayNameAr: 'الجمعة',
    muscuSlots: ['08:00 - 12:00 (Matinée)', '14:00 - 15:15 (Après-midi)'],
    activities: [
      {
        nameFr: 'Kickboxing Femme',
        nameAr: 'كيك بوكسينغ نسائي',
        time: '14:00 - 15:15',
        badge: 'Self-Défense',
        badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30',
      },
    ],
  },
];

export const enfantsSchedule: ScheduleDay[] = [
  {
    dayId: 'samedi',
    dayNameFr: 'Samedi',
    dayNameAr: 'السبت',
    muscuSlots: [],
    activities: [
      { nameFr: 'Kickboxing Enfants 1', nameAr: 'كيك بوكسينغ أطفال 1', time: '17:00 - 18:00', badge: 'Débutant', badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30' },
    ],
  },
  {
    dayId: 'dimanche',
    dayNameFr: 'Dimanche',
    dayNameAr: 'الأحد',
    muscuSlots: [],
    activities: [
      { nameFr: 'Kickboxing Enfants 2', nameAr: 'كيك بوكسينغ أطفال 2', time: '19:15 - 21:00', badge: 'Avancé', badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    ],
  },
  {
    dayId: 'lundi',
    dayNameFr: 'Lundi',
    dayNameAr: 'الإثنين',
    muscuSlots: [],
    activities: [
      { nameFr: 'Kickboxing Enfants 1', nameAr: 'كيك بوكسينغ أطفال 1', time: '17:00 - 18:00', badge: 'Débutant', badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30' },
    ],
  },
  {
    dayId: 'mardi',
    dayNameFr: 'Mardi',
    dayNameAr: 'الثلاثاء',
    muscuSlots: [],
    activities: [
      { nameFr: 'Lutte Enfants', nameAr: 'مصارعة أطفال', time: '19:15 - 21:00', badge: 'Tatami', badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    ],
  },
  {
    dayId: 'mercredi',
    dayNameFr: 'Mercredi',
    dayNameAr: 'الأربعاء',
    muscuSlots: [],
    activities: [
      { nameFr: 'Judo Enfants', nameAr: 'جودو أطفال', time: '17:00 - 18:00', badge: 'Dojo', badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
      { nameFr: 'Kickboxing Enfants 2', nameAr: 'كيك بوكسينغ أطفال 2', time: '18:00 - 19:30', badge: 'Avancé', badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    ],
  },
  {
    dayId: 'jeudi',
    dayNameFr: 'Jeudi',
    dayNameAr: 'الخميس',
    muscuSlots: [],
    activities: [
      { nameFr: 'Lutte Enfants', nameAr: 'مصارعة أطفال', time: '19:15 - 21:00', badge: 'Tatami', badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    ],
  },
  {
    dayId: 'vendredi',
    dayNameFr: 'Vendredi',
    dayNameAr: 'الجمعة',
    muscuSlots: [],
    activities: [
      { nameFr: 'Judo Enfants', nameAr: 'جودو أطفال', time: '17:00 - 18:15', badge: 'Dojo', badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
      { nameFr: 'Kickboxing Enfants 2', nameAr: 'كيك بوكسينغ أطفال 2', time: '18:30 - 20:00', badge: 'Avancé', badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    ],
  },
];
