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
      const isCross = inRange(16, 0, 18, 30);
      return {
        isOpen: true,
        audience: 'femmes',
        timeStr: timeFormatted,
        badgeLabelFr: 'Créneau Femmes en cours',
        badgeLabelAr: 'فترة النساء جارية الآن',
        headlineFr: isCross ? 'Espace Femmes : Musculation & Cross-Training' : 'Espace 100% Femmes (Musculation)',
        headlineAr: isCross ? 'فضاء النساء : كمال أجسام وكروس ترينينغ' : 'فضاء 100% نسائي (كمال أجسام)',
        sublineFr: 'Privatisation absolue sans musique avec coachs féminines.',
        sublineAr: 'خصوصية تامة بدون موسيقى مع مدربات مؤهلات.',
        closingTimeFr: 'Fin du créneau femmes à 19:00',
        closingTimeAr: 'نهاية الفترة النسائية على 19:00',
        activeDisciplineBadgeFr: isCross ? 'CrossTraining' : 'Sans Musique',
        activeDisciplineBadgeAr: isCross ? 'كروس ترينينغ' : 'بدون موسيقى',
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
      const isCross = inRange(16, 0, 18, 30);
      return {
        isOpen: true,
        audience: 'femmes',
        timeStr: timeFormatted,
        badgeLabelFr: 'Créneau Femmes en cours',
        badgeLabelAr: 'فترة النساء جارية الآن',
        headlineFr: isKick
          ? 'Espace Femmes : Kickboxing Féminin Dédié'
          : isCross
          ? 'Espace Femmes : Cross-Training Spécial'
          : 'Espace 100% Femmes (Musculation & Cardio)',
        headlineAr: isKick
          ? 'فضاء النساء : كيك بوكسينغ نسائي مخصص'
          : isCross
          ? 'فضاء النساء : كروس ترينينغ خاص'
          : 'فضاء 100% نسائي (كمال أجسام وكارديو)',
        sublineFr: '100% sans musique. Encadrement féminin diplômé.',
        sublineAr: '100% بدون موسيقى مع مدربات معتمدات.',
        closingTimeFr: 'Fin du créneau femmes à 19:00',
        closingTimeAr: 'نهاية الفترة النسائية على 19:00',
        activeDisciplineBadgeFr: isKick ? 'Kickboxing Femme' : isCross ? 'CrossTraining' : 'Sans Musique',
        activeDisciplineBadgeAr: isKick ? 'كيك بوكسينغ' : isCross ? 'كروس ترينينغ' : 'بدون موسيقى',
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
      const isCross = inRange(16, 0, 18, 30);
      return {
        isOpen: true,
        audience: 'femmes',
        timeStr: timeFormatted,
        badgeLabelFr: 'Créneau Femmes en cours',
        badgeLabelAr: 'فترة النساء جارية الآن',
        headlineFr: isCross ? 'Espace Femmes : Musculation & Cross-Training' : 'Espace 100% Femmes (Musculation)',
        headlineAr: isCross ? 'فضاء النساء : كمال أجسام وكروس ترينينغ' : 'فضاء 100% نسائي (كمال أجسام)',
        sublineFr: 'Intimité totale, pas de musique, vestiaires privés.',
        sublineAr: 'خصوصية كاملة، بدون موسيقى مع غرف تبديل خاصة.',
        closingTimeFr: 'Fin du créneau femmes à 19:00',
        closingTimeAr: 'نهاية الفترة النسائية على 19:00',
        activeDisciplineBadgeFr: isCross ? 'CrossTraining' : 'Sans Musique',
        activeDisciplineBadgeAr: isCross ? 'كروس ترينينغ' : 'بدون موسيقى',
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
    <div className="relative overflow-hidden rounded-2xl border border-adrena-border bg-adrena-card p-5 sm:p-7 shadow-lg transition-all duration-300">
      {/* Subtle background ambient hint */}
      <div
        className={`absolute -right-20 -top-20 w-64 h-64 rounded-full blur-[100px] pointer-events-none ${
          isWomen ? 'bg-fuchsia-600/10' : isMen ? 'bg-adrena-gold/10' : 'bg-neutral-600/5'
        }`}
      />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left column: Live Pulse Badge & Headline */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Live Indicator Pill */}
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider font-display border ${
                isWomen
                  ? 'bg-fuchsia-950/60 border-fuchsia-500/40 text-fuchsia-300'
                  : isMen
                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400'
                  : 'bg-neutral-900 border-neutral-700 text-neutral-400'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isWomen
                    ? 'bg-fuchsia-400 animate-pulse'
                    : isMen
                    ? 'bg-emerald-400 animate-pulse'
                    : 'bg-neutral-500'
                }`}
              />
              <span>{isAr ? status.badgeLabelAr : status.badgeLabelFr}</span>
              <span className="opacity-40">•</span>
              <span className="font-mono font-bold">{status.timeStr} (Alger)</span>
            </div>

            {/* Discipline Tag */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-adrena-surface border border-adrena-border text-xs font-bold text-adrena-gold uppercase tracking-wider">
              {isWomen ? <VolumeX className="w-3.5 h-3.5" /> : <Dumbbell className="w-3.5 h-3.5" />}
              <span>{isAr ? status.activeDisciplineBadgeAr : status.activeDisciplineBadgeFr}</span>
            </span>
          </div>

          {/* Main Headline */}
          <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-adrena-bone tracking-wide uppercase leading-tight">
            {isAr ? status.headlineAr : status.headlineFr}
          </h3>

          {/* Subline with clear practical guidance */}
          <p className="text-sm sm:text-base text-adrena-stone max-w-2xl leading-relaxed font-medium">
            {isAr ? status.sublineAr : status.sublineFr}
          </p>
        </div>

        {/* Right column: Clear CTAs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
          <a
            href="#planning"
            onClick={() => {
              if (onSelectAudience && (isWomen || isMen)) {
                onSelectAudience(isWomen ? 'femmes' : 'hommes');
              }
            }}
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-adrena-gold hover:bg-adrena-gold-light text-[#111215] font-display font-black text-sm uppercase tracking-wider transition-all shadow-md active:scale-95"
          >
            <span>{isAr ? 'عرض جدول الحصص' : 'Voir les créneaux du jour'}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </a>

          <a
            href="https://wa.me/213771570378?text=Bonjour%20Adrena%20Club,%20je%20souhaite%20m'inscrire%20ou%20demander%20des%20informations."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-adrena-surface hover:bg-[#252830] text-adrena-bone border border-adrena-border font-display font-bold text-sm uppercase tracking-wider transition-all"
          >
            <span>{isAr ? 'تواصل عبر واتساب' : 'Contacter sur WhatsApp'}</span>
          </a>
        </div>
      </div>

      {/* Bottom Timing Strip */}
      <div className="mt-5 pt-4 border-t border-adrena-border flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-adrena-stone">
        <div className="flex items-center gap-2 font-medium text-adrena-bone">
          <Clock className="w-4 h-4 text-adrena-gold flex-shrink-0" />
          <span>{isAr ? status.closingTimeAr : status.closingTimeFr}</span>
        </div>
        <div className="flex items-center gap-2 text-adrena-muted">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{isAr ? 'مفتوح 7/7 أيام للرجال والنساء في باب الزوار' : '7j/7 • Bab Ezzouar CUB1 • 2 Niveaux'}</span>
        </div>
      </div>
    </div>
  );
}
