'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Clock, Dumbbell, Shield, Flame, Sparkles, VolumeX, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Language } from '@/data/content';

interface LiveStatusEngineProps {
  lang: Language;
  onSelectAudience?: (audience: 'hommes' | 'femmes' | 'enfants') => void;
}

export interface LiveStatusData {
  isOpen: boolean;
  audience: 'hommes' | 'femmes' | 'enfants' | 'closed';
  timeStr: string;
  badgeLabelFr: string;
  badgeLabelAr: string;
  headlineFr: string;
  headlineAr: string;
  sublineFr: string;
  sublineAr: string;
  closingTimeFr: string;
  closingTimeAr: string;
  activeDisciplineBadgeFr: string;
  activeDisciplineBadgeAr: string;
}

export function computeAlgiersLiveStatus(): LiveStatusData {
  // Compute current Algerian time (UTC+1, Africa/Algiers)
  const now = new Date();
  const algiersTimeStr = now.toLocaleString('en-US', { timeZone: 'Africa/Algiers' });
  const algiersDate = new Date(algiersTimeStr);

  const dayIndex = algiersDate.getDay(); // 0 = Dim, 1 = Lun, 2 = Mar, 3 = Mer, 4 = Jeu, 5 = Ven, 6 = Sam
  const hours = algiersDate.getHours();
  const minutes = algiersDate.getMinutes();
  const currentMinutes = hours * 60 + minutes;
  const timeFormatted = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

  // Helper to parse interval "HH:MM-HH:MM"
  const inRange = (startH: number, startM: number, endH: number, endM: number): boolean => {
    const start = startH * 60 + startM;
    let end = endH * 60 + endM;
    if (endH === 0 && endM === 0) end = 24 * 60; // Midnight = 1440
    return currentMinutes >= start && currentMinutes < end;
  };

  // Evaluate by Day
  // 1. Samedi (dayIndex === 6)
  if (dayIndex === 6) {
    if (inRange(9, 0, 13, 0)) {
      return {
        isOpen: true,
        audience: 'femmes',
        timeStr: timeFormatted,
        badgeLabelFr: 'Créneau Femmes en cours',
        badgeLabelAr: 'فترة النساء جارية الآن',
        headlineFr: 'Espace 100% Femmes (Musculation & Cardio)',
        headlineAr: 'فضاء 100% نسائي (كمال الأجسام وكارديو)',
        sublineFr: '100% Privé, calme & sans musique. Vestiaires dédiés.',
        sublineAr: 'خصوصية تامة، هدوء وبدون أي موسيقى مع غرف تبديل خاصة.',
        closingTimeFr: 'Fin du créneau femmes à 13:00',
        closingTimeAr: 'نهاية الفترة النسائية على 13:00',
        activeDisciplineBadgeFr: 'Sans Musique',
        activeDisciplineBadgeAr: 'بدون موسيقى',
      };
    }
    if (inRange(13, 0, 24, 0)) {
      let activityFr = 'Plateau Musculation Hommes Ouvert';
      let activityAr = 'قاعة كمال الأجسام للرجال مفتوحة';
      let disciplineBadgeFr = 'Musculation';
      let disciplineBadgeAr = 'حديد حر';

      if (inRange(18, 0, 19, 30)) {
        activityFr = 'Musculation + Kickboxing 1 Hommes';
        activityAr = 'كمال أجسام + كيك بوكسينغ رجال';
        disciplineBadgeFr = 'Combat Ring';
        disciplineBadgeAr = 'حلبة القتال';
      } else if (inRange(19, 30, 20, 30)) {
        activityFr = 'Musculation + Cross-Training WOD';
        activityAr = 'كمال أجسام + كروس ترينينغ';
        disciplineBadgeFr = 'CrossTraining';
        disciplineBadgeAr = 'كروس ترينينغ';
      }

      return {
        isOpen: true,
        audience: 'hommes',
        timeStr: timeFormatted,
        badgeLabelFr: 'Ouvert Hommes (Non-stop)',
        badgeLabelAr: 'مفتوح للرجال (مستمر)',
        headlineFr: activityFr,
        headlineAr: activityAr,
        sublineFr: "Accès libre au plateau force & ring. Ouvert jusqu'à minuit (00:00).",
        sublineAr: 'دخول حر لقاعة الأوزان والحلبة. مفتوح إلى غاية منتصف الليل (00:00).',
        closingTimeFr: "Fermeture ce soir à 00:00 (Minuit)",
        closingTimeAr: 'الغلق الليلة على 00:00 (منتصف الليل)',
        activeDisciplineBadgeFr: disciplineBadgeFr,
        activeDisciplineBadgeAr: disciplineBadgeAr,
      };
    }
  }

  // 2. Dimanche (dayIndex === 0)
  if (dayIndex === 0) {
    if (inRange(6, 0, 15, 0)) {
      return {
        isOpen: true,
        audience: 'hommes',
        timeStr: timeFormatted,
        badgeLabelFr: 'Musculation Hommes (Matinée)',
        badgeLabelAr: 'كمال أجسام رجال (صباحي)',
        headlineFr: 'Plateau Musculation & Force Hommes',
        headlineAr: 'قاعة كمال الأجسام والقوة للرجال',
        sublineFr: 'Accès libre aux machines & poids libres.',
        sublineAr: 'دخول حر للأجهزة والأوزان الحرة.',
        closingTimeFr: 'Pause hommes à 15:00 pour le créneau femmes',
        closingTimeAr: 'استراحة الرجال على 15:00 لبدء فترة النساء',
        activeDisciplineBadgeFr: 'Musculation',
        activeDisciplineBadgeAr: 'حديد حر',
      };
    }
    if (inRange(15, 0, 19, 0)) {
      const isCrossWithMusic = inRange(16, 0, 17, 0);
      const isCrossNoMusic = inRange(17, 30, 18, 30);

      let headlineFr = 'Espace 100% Femmes (Plateau Musculation)';
      let headlineAr = 'فضاء 100% نسائي (قاعة كمال الأجسام)';
      let sublineFr = 'Accès libre aux machines & poids libres avec coachs féminines.';
      let sublineAr = 'دخول حر للأجهزة والأوزان الحرة مع مدربات مؤهلات.';
      let badgeFr = 'Musculation';
      let badgeAr = 'حديد حر';

      if (isCrossWithMusic) {
        headlineFr = 'Espace Femmes : Cross-Training (Avec musique)';
        headlineAr = 'فضاء النساء : كروس ترينينغ (بالموسيقى)';
        sublineFr = 'Séance coachée dynamique et rythmée avec musique.';
        sublineAr = 'حصة تدريبية حماسية ومكثفة مع الموسيقى.';
        badgeFr = 'Avec Musique';
        badgeAr = 'بالموسيقى';
      } else if (isCrossNoMusic) {
        headlineFr = 'Espace Femmes : Cross-Training (Sans musique)';
        headlineAr = 'فضاء النساء : كروس ترينينغ (بدون موسيقى)';
        sublineFr = 'Séance coachée sereine et calme, sans aucune musique.';
        sublineAr = 'حصة تدريبية هادئة ومريحة، بدون أي موسيقى.';
        badgeFr = 'Sans Musique';
        badgeAr = 'بدون موسيقى';
      }

      return {
        isOpen: true,
        audience: 'femmes',
        timeStr: timeFormatted,
        badgeLabelFr: 'Créneau Femmes en cours',
        badgeLabelAr: 'فترة النساء جارية الآن',
        headlineFr,
        headlineAr,
        sublineFr,
        sublineAr,
        closingTimeFr: 'Fin du créneau femmes à 19:00',
        closingTimeAr: 'نهاية الفترة النسائية على 19:00',
        activeDisciplineBadgeFr: badgeFr,
        activeDisciplineBadgeAr: badgeAr,
      };
    }
    if (inRange(19, 0, 24, 0)) {
      const isKick = inRange(19, 0, 20, 30);
      return {
        isOpen: true,
        audience: 'hommes',
        timeStr: timeFormatted,
        badgeLabelFr: 'Ouvert Hommes (Soirée)',
        badgeLabelAr: 'مفتوح للرجال (مسائي)',
        headlineFr: isKick ? 'Musculation + Kickboxing 2 (Avancé)' : 'Plateau Musculation Hommes',
        headlineAr: isKick ? 'كمال أجسام + كيك بوكسينغ متقدم' : 'قاعة كمال الأجسام للرجال',
        sublineFr: "Séance du soir ouverte jusqu'à 00:00 (Minuit).",
        sublineAr: 'حصة المساء مفتوحة إلى غاية منتصف الليل (00:00).',
        closingTimeFr: 'Fermeture à 00:00',
        closingTimeAr: 'الغلق على 00:00',
        activeDisciplineBadgeFr: isKick ? 'Kickboxing Avancé' : 'Musculation',
        activeDisciplineBadgeAr: isKick ? 'كيك بوكسينغ' : 'حديد حر',
      };
    }
  }

  // 3. Lundi (dayIndex === 1)
  if (dayIndex === 1) {
    if (inRange(6, 0, 12, 0)) {
      return {
        isOpen: true,
        audience: 'hommes',
        timeStr: timeFormatted,
        badgeLabelFr: 'Musculation Hommes (Matinée)',
        badgeLabelAr: 'كمال أجسام رجال (صباحي)',
        headlineFr: 'Plateau Musculation & Force Hommes',
        headlineAr: 'قاعة كمال الأجسام والقوة للرجال',
        sublineFr: 'Dès 06:00 le matin pour les lève-tôt et étudiants USTHB.',
        sublineAr: 'منذ السادسة صباحاً للرياضيين الصباحيين وطلبة الجامعة.',
        closingTimeFr: 'Pause hommes à 12:00 pour créneau femmes',
        closingTimeAr: 'استراحة الرجال على 12:00 لفترة النساء',
        activeDisciplineBadgeFr: 'Musculation',
        activeDisciplineBadgeAr: 'حديد حر',
      };
    }
    if (inRange(12, 0, 16, 30)) {
      return {
        isOpen: true,
        audience: 'femmes',
        timeStr: timeFormatted,
        badgeLabelFr: 'Créneau Femmes en cours',
        badgeLabelAr: 'فترة النساء جارية الآن',
        headlineFr: 'Espace 100% Femmes (Midi & Après-Midi)',
        headlineAr: 'فضاء 100% نسائي (فترة الظهيرة)',
        sublineFr: 'Calme garanti, 100% sans musique et intimité complète.',
        sublineAr: 'هدوء مضمون، 100% بدون موسيقى وخصوصية تامة.',
        closingTimeFr: 'Fin du créneau femmes à 16:30',
        closingTimeAr: 'نهاية الفترة النسائية على 16:30',
        activeDisciplineBadgeFr: 'Sans Musique',
        activeDisciplineBadgeAr: 'بدون موسيقى',
      };
    }
    if (inRange(16, 30, 24, 0)) {
      let actFr = 'Plateau Musculation Hommes Ouvert';
      let actAr = 'قاعة كمال الأجسام للرجال مفتوحة';
      let badgeFr = 'Musculation';
      let badgeAr = 'حديد حر';

      if (inRange(18, 0, 19, 30)) {
        actFr = 'Musculation + Kickboxing 1 Hommes';
        actAr = 'كمال أجسام + كيك بوكسينغ رجال';
        badgeFr = 'Combat Ring';
        badgeAr = 'حلبة القتال';
      } else if (inRange(19, 30, 20, 30)) {
        actFr = 'Musculation + Cross-Training WOD';
        actAr = 'كمال أجسام + كروس ترينينغ';
        badgeFr = 'CrossTraining';
        badgeAr = 'كروس ترينينغ';
      }

      return {
        isOpen: true,
        audience: 'hommes',
        timeStr: timeFormatted,
        badgeLabelFr: 'Ouvert Hommes (Soirée Continue)',
        badgeLabelAr: 'مفتوح للرجال (أمسية مستمرة)',
        headlineFr: actFr,
        headlineAr: actAr,
        sublineFr: "Entraînement en soirée jusqu'à minuit (00:00).",
        sublineAr: 'تدريب مسائي إلى غاية منتصف الليل (00:00).',
        closingTimeFr: 'Fermeture à 00:00',
        closingTimeAr: 'الغلق على 00:00',
        activeDisciplineBadgeFr: badgeFr,
        activeDisciplineBadgeAr: badgeAr,
      };
    }
  }

  // 4. Mardi (dayIndex === 2)
  if (dayIndex === 2) {
    if (inRange(6, 0, 14, 0)) {
      return {
        isOpen: true,
        audience: 'hommes',
        timeStr: timeFormatted,
        badgeLabelFr: 'Musculation Hommes (Matinée)',
        badgeLabelAr: 'كمال أجسام رجال (صباحي)',
        headlineFr: 'Plateau Musculation & Force Hommes',
        headlineAr: 'قاعة كمال الأجسام والقوة للرجال',
        sublineFr: 'Machines guidées et poids libres disponibles dès 06:00.',
        sublineAr: 'أجهزة متطورة وأوزان حرة متوفرة ابتداءً من 06:00.',
        closingTimeFr: 'Pause hommes à 14:00 pour le créneau femmes',
        closingTimeAr: 'استراحة الرجال على 14:00 لفترة النساء',
        activeDisciplineBadgeFr: 'Musculation',
        activeDisciplineBadgeAr: 'حديد حر',
      };
    }
    if (inRange(14, 0, 19, 0)) {
      const isKick = inRange(14, 0, 15, 15);
      const isCrossWithMusic = inRange(16, 0, 17, 0);
      const isCrossNoMusic = inRange(17, 30, 18, 30);

      let headlineFr = 'Espace 100% Femmes (Musculation & Cardio)';
      let headlineAr = 'فضاء 100% نسائي (كمال أجسام وكارديو)';
      let sublineFr = 'Accès libre aux machines et plateau force avec coachs féminines.';
      let sublineAr = 'دخول حر للعتاد والأوزان الحرة مع مدربات مؤهلات.';
      let badgeFr = 'Musculation';
      let badgeAr = 'حديد حر';

      if (isKick) {
        headlineFr = 'Espace Femmes : Kickboxing Féminin Dédié';
        headlineAr = 'فضاء النساء : كيك بوكسينغ نسائي مخصص';
        sublineFr = 'Entraînement combat & self-défense encadré par des coachs féminines.';
        sublineAr = 'تدريب قتالي ودفاع عن النفس مع مدربات مؤهلات.';
        badgeFr = 'Kickboxing Femme';
        badgeAr = 'كيك بوكسينغ';
      } else if (isCrossWithMusic) {
        headlineFr = 'Espace Femmes : Cross-Training (Avec musique)';
        headlineAr = 'فضاء النساء : كروس ترينينغ (بالموسيقى)';
        sublineFr = 'Séance coachée dynamique et rythmée avec musique.';
        sublineAr = 'حصة تدريبية حماسية ومكثفة مع الموسيقى.';
        badgeFr = 'Avec Musique';
        badgeAr = 'بالموسيقى';
      } else if (isCrossNoMusic) {
        headlineFr = 'Espace Femmes : Cross-Training (Sans musique)';
        headlineAr = 'فضاء النساء : كروس ترينينغ (بدون موسيقى)';
        sublineFr = 'Séance coachée sereine et calme, sans aucune musique.';
        sublineAr = 'حصة تدريبية هادئة ومريحة، بدون أي موسيقى.';
        badgeFr = 'Sans Musique';
        badgeAr = 'بدون موسيقى';
      }

      return {
        isOpen: true,
        audience: 'femmes',
        timeStr: timeFormatted,
        badgeLabelFr: 'Créneau Femmes en cours',
        badgeLabelAr: 'فترة النساء جارية الآن',
        headlineFr,
        headlineAr,
        sublineFr,
        sublineAr,
        closingTimeFr: 'Fin du créneau femmes à 19:00',
        closingTimeAr: 'نهاية الفترة النسائية على 19:00',
        activeDisciplineBadgeFr: badgeFr,
        activeDisciplineBadgeAr: badgeAr,
      };
    }
    if (inRange(19, 0, 24, 0)) {
      const isLutte = inRange(19, 30, 21, 0);
      return {
        isOpen: true,
        audience: 'hommes',
        timeStr: timeFormatted,
        badgeLabelFr: 'Ouvert Hommes (Soirée)',
        badgeLabelAr: 'مفتوح للرجال (مسائي)',
        headlineFr: isLutte ? 'Musculation + Lutte Hommes (Tatami)' : 'Plateau Musculation Hommes',
        headlineAr: isLutte ? 'كمال أجسام + مصارعة حرة (تاتامي)' : 'قاعة كمال الأجسام للرجال',
        sublineFr: "Tatami de combat & musculation ouverts jusqu'à 00:00.",
        sublineAr: 'بساط المصارعة وقاعة الحديد مفتوحة إلى غاية 00:00.',
        closingTimeFr: 'Fermeture à 00:00',
        closingTimeAr: 'الغلق على 00:00',
        activeDisciplineBadgeFr: isLutte ? 'Lutte Tatami' : 'Musculation',
        activeDisciplineBadgeAr: isLutte ? 'مصارعة' : 'حديد حر',
      };
    }
  }

  // 5. Mercredi (dayIndex === 3)
  if (dayIndex === 3) {
    if (inRange(6, 0, 10, 0)) {
      return {
        isOpen: true,
        audience: 'hommes',
        timeStr: timeFormatted,
        badgeLabelFr: 'Musculation Hommes (Matin)',
        badgeLabelAr: 'كمال أجسام رجال (صباحي)',
        headlineFr: 'Plateau Musculation & Force Hommes',
        headlineAr: 'قاعة كمال الأجسام والقوة للرجال',
        sublineFr: 'Séance matinale dès 06:00.',
        sublineAr: 'حصة الصباح الباكر منذ 06:00.',
        closingTimeFr: 'Pause hommes à 10:00 pour le créneau femmes',
        closingTimeAr: 'استراحة الرجال على 10:00 لفترة النساء',
        activeDisciplineBadgeFr: 'Musculation',
        activeDisciplineBadgeAr: 'حديد حر',
      };
    }
    if (inRange(10, 0, 16, 30)) {
      return {
        isOpen: true,
        audience: 'femmes',
        timeStr: timeFormatted,
        badgeLabelFr: 'Créneau Femmes en cours',
        badgeLabelAr: 'فترة النساء جارية الآن',
        headlineFr: 'Espace 100% Femmes (Journée Continue)',
        headlineAr: 'فضاء 100% نسائي (فترة مستمرة)',
        sublineFr: 'Créneau continu en journée. Zéro musique & intimité totale.',
        sublineAr: 'فترة نهارية مستمرة. بدون أي موسيقى وخصوصية تامة.',
        closingTimeFr: 'Fin du créneau femmes à 16:30',
        closingTimeAr: 'نهاية الفترة النسائية على 16:30',
        activeDisciplineBadgeFr: 'Sans Musique',
        activeDisciplineBadgeAr: 'بدون موسيقى',
      };
    }
    if (inRange(16, 30, 24, 0)) {
      let actFr = 'Plateau Musculation Hommes Ouvert';
      let actAr = 'قاعة كمال الأجسام للرجال مفتوحة';
      let bFr = 'Musculation';
      let bAr = 'حديد حر';

      if (inRange(18, 0, 19, 30)) {
        actFr = 'Musculation + Kickboxing 2 (Avancé)';
        actAr = 'كمال أجسام + كيك بوكسينغ متقدم';
        bFr = 'Kickboxing Avancé';
        bAr = 'كيك بوكسينغ';
      } else if (inRange(19, 30, 20, 30)) {
        actFr = 'Musculation + Cross-Training WOD';
        actAr = 'كمال أجسام + كروس ترينينغ';
        bFr = 'CrossTraining';
        bAr = 'كروس ترينينغ';
      }

      return {
        isOpen: true,
        audience: 'hommes',
        timeStr: timeFormatted,
        badgeLabelFr: 'Ouvert Hommes (Soirée Continue)',
        badgeLabelAr: 'مفتوح للرجال (أمسية مستمرة)',
        headlineFr: actFr,
        headlineAr: actAr,
        sublineFr: "Accès libre musculation & ring jusqu'à minuit (00:00).",
        sublineAr: 'دخول حر للحديد والحلبة إلى غاية منتصف الليل (00:00).',
        closingTimeFr: 'Fermeture à 00:00',
        closingTimeAr: 'الغلق على 00:00',
        activeDisciplineBadgeFr: bFr,
        activeDisciplineBadgeAr: bAr,
      };
    }
  }

  // 6. Jeudi (dayIndex === 4)
  if (dayIndex === 4) {
    if (inRange(6, 0, 15, 0)) {
      return {
        isOpen: true,
        audience: 'hommes',
        timeStr: timeFormatted,
        badgeLabelFr: 'Musculation Hommes (Matinée)',
        badgeLabelAr: 'كمال أجسام رجال (صباحي)',
        headlineFr: 'Plateau Musculation & Force Hommes',
        headlineAr: 'قاعة كمال الأجسام والقوة للرجال',
        sublineFr: 'Entraînement libre machines et haltères.',
        sublineAr: 'تدريب حر للأجهزة والأوزان.',
        closingTimeFr: 'Pause hommes à 15:00 pour le créneau femmes',
        closingTimeAr: 'استراحة الرجال على 15:00 لفترة النساء',
        activeDisciplineBadgeFr: 'Musculation',
        activeDisciplineBadgeAr: 'حديد حر',
      };
    }
    if (inRange(15, 0, 19, 0)) {
      const isCrossWithMusic = inRange(16, 0, 17, 0);
      const isCrossNoMusic = inRange(17, 30, 18, 30);

      let headlineFr = 'Espace 100% Femmes (Plateau Musculation)';
      let headlineAr = 'فضاء 100% نسائي (قاعة كمال الأجسام)';
      let sublineFr = 'Accès libre aux machines & poids libres avec coachs féminines.';
      let sublineAr = 'دخول حر للأجهزة والأوزان الحرة مع مدربات مؤهلات.';
      let badgeFr = 'Musculation';
      let badgeAr = 'حديد حر';

      if (isCrossWithMusic) {
        headlineFr = 'Espace Femmes : Cross-Training (Avec musique)';
        headlineAr = 'فضاء النساء : كروس ترينينغ (بالموسيقى)';
        sublineFr = 'Séance coachée dynamique et rythmée avec musique.';
        sublineAr = 'حصة تدريبية حماسية ومكثفة مع الموسيقى.';
        badgeFr = 'Avec Musique';
        badgeAr = 'بالموسيقى';
      } else if (isCrossNoMusic) {
        headlineFr = 'Espace Femmes : Cross-Training (Sans musique)';
        headlineAr = 'فضاء النساء : كروس ترينينغ (بدون موسيقى)';
        sublineFr = 'Séance coachée sereine et calme, sans aucune musique.';
        sublineAr = 'حصة تدريبية هادئة ومريحة، بدون أي موسيقى.';
        badgeFr = 'Sans Musique';
        badgeAr = 'بدون موسيقى';
      }

      return {
        isOpen: true,
        audience: 'femmes',
        timeStr: timeFormatted,
        badgeLabelFr: 'Créneau Femmes en cours',
        badgeLabelAr: 'فترة النساء جارية الآن',
        headlineFr,
        headlineAr,
        sublineFr,
        sublineAr,
        closingTimeFr: 'Fin du créneau femmes à 19:00',
        closingTimeAr: 'نهاية الفترة النسائية على 19:00',
        activeDisciplineBadgeFr: badgeFr,
        activeDisciplineBadgeAr: badgeAr,
      };
    }
    if (inRange(19, 0, 24, 0)) {
      const isLutte = inRange(19, 30, 21, 0);
      return {
        isOpen: true,
        audience: 'hommes',
        timeStr: timeFormatted,
        badgeLabelFr: 'Ouvert Hommes (Soirée)',
        badgeLabelAr: 'مفتوح للرجال (مسائي)',
        headlineFr: isLutte ? 'Musculation + Lutte Hommes (Tatami)' : 'Plateau Musculation Hommes',
        headlineAr: isLutte ? 'كمال أجسام + مصارعة حرة (تاتامي)' : 'قاعة كمال الأجسام للرجال',
        sublineFr: "Séance du jeudi soir ouverte jusqu'à 00:00.",
        sublineAr: 'حصة سهرة الخميس مفتوحة إلى غاية منتصف الليل (00:00).',
        closingTimeFr: 'Fermeture à 00:00',
        closingTimeAr: 'الغلق على 00:00',
        activeDisciplineBadgeFr: isLutte ? 'Lutte Tatami' : 'Musculation',
        activeDisciplineBadgeAr: isLutte ? 'مصارعة' : 'حديد حر',
      };
    }
  }

  // 7. Vendredi (dayIndex === 5)
  if (dayIndex === 5) {
    if (inRange(8, 0, 12, 0)) {
      return {
        isOpen: true,
        audience: 'femmes',
        timeStr: timeFormatted,
        badgeLabelFr: 'Créneau Femmes (Matinée)',
        badgeLabelAr: 'فترة النساء (صباح الجمعة)',
        headlineFr: 'Espace 100% Femmes (Musculation & Cardio)',
        headlineAr: 'فضاء 100% نسائي (كمال أجسام وكارديو)',
        sublineFr: 'Matinée calme sans musique pour démarrer le week-end.',
        sublineAr: 'صباح هادئ بدون موسيقى لبداية عطلة نهاية الأسبوع.',
        closingTimeFr: 'Fin de la matinée femmes à 12:00',
        closingTimeAr: 'نهاية الفترة الصباحية للنساء على 12:00',
        activeDisciplineBadgeFr: 'Sans Musique',
        activeDisciplineBadgeAr: 'بدون موسيقى',
      };
    }
    if (inRange(14, 0, 15, 15)) {
      return {
        isOpen: true,
        audience: 'femmes',
        timeStr: timeFormatted,
        badgeLabelFr: 'Créneau Femmes (Après-Midi)',
        badgeLabelAr: 'فترة النساء (مساء الجمعة)',
        headlineFr: 'Espace Femmes : Musculation & Kickboxing',
        headlineAr: 'فضاء النساء : كمال أجسام وكيك بوكسينغ',
        sublineFr: 'Dernière séance féminine de la semaine.',
        sublineAr: 'آخر حصة نسائية في الأسبوع.',
        closingTimeFr: 'Fin du créneau femmes à 15:15',
        closingTimeAr: 'نهاية الفترة النسائية على 15:15',
        activeDisciplineBadgeFr: 'Kickboxing Femme',
        activeDisciplineBadgeAr: 'كيك بوكسينغ',
      };
    }
    if (inRange(15, 30, 24, 0)) {
      const isKick = inRange(18, 30, 20, 0);
      return {
        isOpen: true,
        audience: 'hommes',
        timeStr: timeFormatted,
        badgeLabelFr: 'Ouvert Hommes (Vendredi Soir)',
        badgeLabelAr: 'مفتوح للرجال (سهرة الجمعة)',
        headlineFr: isKick ? 'Musculation + Kickboxing 2 (Avancé)' : 'Plateau Musculation Hommes',
        headlineAr: isKick ? 'كمال أجسام + كيك بوكسينغ متقدم' : 'قاعة كمال الأجسام للرجال',
        sublineFr: "Soirée continue jusqu'à minuit (00:00).",
        sublineAr: 'سهرة مستمرة إلى غاية منتصف الليل (00:00).',
        closingTimeFr: 'Fermeture à 00:00',
        closingTimeAr: 'الغلق على 00:00',
        activeDisciplineBadgeFr: isKick ? 'Kickboxing Avancé' : 'Musculation',
        activeDisciplineBadgeAr: isKick ? 'كيك بوكسينغ' : 'حديد حر',
      };
    }
  }

  // Fallback: Currently Closed (Night 00:00 - 06:00 or Friday prayer break)
  return {
    isOpen: false,
    audience: 'closed',
    timeStr: timeFormatted,
    badgeLabelFr: 'Club Actuellement Fermé',
    badgeLabelAr: 'القاعة مغلقة حالياً',
    headlineFr: dayIndex === 5 && currentMinutes < 480
      ? 'Fermé — Prochaine ouverture à 08:00 (Femmes)'
      : dayIndex === 6 && currentMinutes < 540
      ? 'Fermé — Prochaine ouverture à 09:00 (Femmes)'
      : 'Fermé — Prochaine ouverture à 06:00 (Musculation Hommes)',
    headlineAr: dayIndex === 5 && currentMinutes < 480
      ? 'مغلق — الافتتاح القادم على 08:00 (فترة النساء)'
      : dayIndex === 6 && currentMinutes < 540
      ? 'مغلق — الافتتاح القادم على 09:00 (فترة النساء)'
      : 'مغلق — الافتتاح القادم على 06:00 (كمال أجسام رجال)',
    sublineFr: 'Accès automatisé sécurisé par portiques RFID pendant les heures d\'ouverture.',
    sublineAr: 'دخول مؤمن ببطاقات RFID الذكية خلال ساعات العمل الرسمية.',
    closingTimeFr: 'Ouvert 7j/7 selon les plannings officiels',
    closingTimeAr: 'مفتوح 7/7 أيام حسب المخطط الرسمي',
    activeDisciplineBadgeFr: 'Fermé',
    activeDisciplineBadgeAr: 'مغلق',
  };
}

export default function LiveStatusEngine({ lang, onSelectAudience }: LiveStatusEngineProps) {
  const [status, setStatus] = useState<LiveStatusData | null>(null);
  const isAr = lang === 'ar';

  useEffect(() => {
    // Initial compute
    setStatus(computeAlgiersLiveStatus());

    // Auto-update every 30 seconds
    const interval = setInterval(() => {
      setStatus(computeAlgiersLiveStatus());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (!status) return null;

  const isWomen = status.audience === 'femmes';
  const isMen = status.audience === 'hommes';
  const isClosed = !status.isOpen;

  return (
    <div className="rounded-xl border border-adrena-border bg-adrena-card py-3 px-4 sm:px-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
        
        {/* Left: Operational status in human words */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <span
            className={`w-2 h-2 rounded-full flex-shrink-0 ${
              isWomen
                ? 'bg-fuchsia-400'
                : isMen
                ? 'bg-emerald-400'
                : 'bg-neutral-500'
            }`}
          />
          <span className="font-bold text-white">
            {isAr ? status.badgeLabelAr : status.badgeLabelFr} :
          </span>
          <span className="text-adrena-stone">
            {isAr ? status.headlineAr : status.headlineFr}
          </span>
          <span className="text-adrena-muted hidden md:inline">
            ({isAr ? status.closingTimeAr : status.closingTimeFr})
          </span>
        </div>

        {/* Right: Clean Schedule Link */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <a
            href="#planning"
            onClick={() => {
              if (onSelectAudience && (isWomen || isMen)) {
                onSelectAudience(isWomen ? 'femmes' : 'hommes');
              }
            }}
            className="inline-flex items-center gap-1.5 font-bold text-adrena-gold hover:text-white transition-colors"
          >
            <span>{isAr ? 'عرض جدول الأسبوع' : 'Voir le planning complet'}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </a>
        </div>
      </div>
    </div>
  );
}
