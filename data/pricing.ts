export type TargetAudience = 'all' | 'hommes' | 'femmes' | 'enfants';

export interface PricingPlan {
  id: string;
  nameFr: string;
  nameAr: string;
  frequencyFr: string;
  frequencyAr: string;
  price: number;
  periodFr: string;
  periodAr: string;
  isPopular?: boolean;
  audience: TargetAudience[];
  audienceLabelFr: string;
  audienceLabelAr: string;
  featuresFr: string[];
  featuresAr: string[];
}

export const musculationPlans: PricingPlan[] = [
  {
    id: 'muscu-1',
    nameFr: '1 Séance / Semaine',
    nameAr: 'حصة واحدة / أسبوعياً',
    frequencyFr: '4 séances par mois',
    frequencyAr: '4 حصص في الشهر',
    price: 2000,
    periodFr: 'DA / mois',
    periodAr: 'دج / شهر',
    audience: ['hommes', 'femmes'],
    audienceLabelFr: 'Hommes & Femmes (Créneaux Séparés)',
    audienceLabelAr: 'رجال ونساء (فترات منفصلة)',
    featuresFr: ['Accès complet au plateau musculation', 'Machines guidées & poids libres', 'Accès aux vestiaires & douches'],
    featuresAr: ['دخول كامل لقاعة كمال الأجسام', 'أجهزة متطورة وأوزان حرة', 'غرف تبديل الملابس ودوش'],
  },
  {
    id: 'muscu-2',
    nameFr: '2 Séances / Semaine',
    nameAr: 'حصتان / أسبوعياً',
    frequencyFr: '8 séances par mois',
    frequencyAr: '8 حصص في الشهر',
    price: 3000,
    periodFr: 'DA / mois',
    periodAr: 'دج / شهر',
    audience: ['hommes', 'femmes'],
    audienceLabelFr: 'Hommes & Femmes (Créneaux Séparés)',
    audienceLabelAr: 'رجال ونساء (فترات منفصلة)',
    featuresFr: ['Accès au plateau charges libres & cardio', 'Créneaux hommes & femmes au choix', 'Vestiaires, douches & casiers inclus'],
    featuresAr: ['دخول قاعة الحديد والأوزان والكارديو', 'أوقات متاحة للرجال والنساء', 'غرف تبديل، دوشات وخزائن آمنة'],
  },
  {
    id: 'muscu-3',
    nameFr: '3 Séances / Semaine',
    nameAr: '3 حصص / أسبوعياً',
    frequencyFr: '12 séances par mois',
    frequencyAr: '12 حصة في الشهر',
    price: 3500,
    periodFr: 'DA / mois',
    periodAr: 'دج / شهر',
    isPopular: true,
    audience: ['hommes', 'femmes'],
    audienceLabelFr: 'Hommes & Femmes (Créneaux Séparés)',
    audienceLabelAr: 'رجال ونساء (فترات منفصلة)',
    featuresFr: ['Fréquence idéale pour progresser', 'Accès libre à tous les créneaux du planning', 'Machines guidées, charges libres & cardio', 'Vestiaires, douches & casiers inclus'],
    featuresAr: ['التردد المثالي لتحقيق تطور ملحوظ', 'دخول مرن لكافة أوقات البرنامج', 'أجهزة متطورة، أوزان حرة وكارديو', 'غرف تبديل، دوشات وخزائن آمنة'],
  },
  {
    id: 'muscu-4',
    nameFr: '4 Séances / Semaine',
    nameAr: '4 حصص / أسبوعياً',
    frequencyFr: '16 séances par mois',
    frequencyAr: '16 حصة في الشهر',
    price: 4000,
    periodFr: 'DA / mois',
    periodAr: 'دج / شهر',
    audience: ['hommes', 'femmes'],
    audienceLabelFr: 'Hommes & Femmes (Créneaux Séparés)',
    audienceLabelAr: 'رجال ونساء (فترات منفصلة)',
    featuresFr: ['Pour pratiquants réguliers', 'Programmes split musculaire', 'Espace force & cardio'],
    featuresAr: ['للمتدربين المنتظمين', 'برامج تقسيم عضلات متقدمة', 'مساحات قوة ولياقة'],
  },
  {
    id: 'muscu-5',
    nameFr: '5 Séances / Semaine',
    nameAr: '5 حصص / أسبوعياً',
    frequencyFr: '20 séances par mois',
    frequencyAr: '20 حصة في الشهر',
    price: 4200,
    periodFr: 'DA / mois',
    periodAr: 'دج / شهر',
    audience: ['hommes', 'femmes'],
    audienceLabelFr: 'Hommes & Femmes (Créneaux Séparés)',
    audienceLabelAr: 'رجال ونساء (فترات منفصلة)',
    featuresFr: ['Intensité & transformation rapide', 'Suivi rigoureux', 'Accès prioritaire'],
    featuresAr: ['تدريب مكثف ونتائج سريعة', 'انضباط رياضي عالي', 'أولوية الاستفادة من المعدات'],
  },
  {
    id: 'muscu-libre',
    nameFr: 'Accès Libre (Illimité)',
    nameAr: 'اشتراك حر (غير محدود)',
    frequencyFr: 'Entraînements illimités',
    frequencyAr: 'تمارين غير محدودة طيلة الشهر',
    price: 4500,
    periodFr: 'DA / mois',
    periodAr: 'دج / شهر',
    isPopular: true,
    audience: ['hommes', 'femmes'],
    audienceLabelFr: 'Hommes (06h-00h) & Femmes (RDC)',
    audienceLabelAr: 'رجال (06:00-00:00) ونساء (طابق أرضي)',
    featuresFr: ['Accès tous les jours sans restriction', 'Matin dès 06:00 jusqu\'à 00:00 (Hommes)', 'Créneaux femmes complets', 'Le meilleur rapport qualité/prix'],
    featuresAr: ['دخول يومي بدون قيود', 'من 06:00 صباحاً حتى 00:00 ليلاً للرجال', 'فترات نسائية كاملة', 'أفضل قيمة وأعلى مرونة'],
  },
];

export const crosstrainingPlans: PricingPlan[] = [
  {
    id: 'cross-1',
    nameFr: '1 Séance / Semaine',
    nameAr: 'حصة واحدة / أسبوعياً',
    frequencyFr: '4 séances par mois',
    frequencyAr: '4 حصص شهرياً',
    price: 2000,
    periodFr: 'DA / mois',
    periodAr: 'دج / شهر',
    audience: ['hommes', 'femmes'],
    audienceLabelFr: 'Hommes & Femmes (Créneaux Dédiés)',
    audienceLabelAr: 'رجال ونساء (فترات مخصصة)',
    featuresFr: ['Encadrement coach spécialisé', 'WODs progressifs', 'Brûlage calorique intense'],
    featuresAr: ['إشراف مدربين متخصصين', 'تمارين WODs تدريجية', 'حرق دهون ورفع لياقة'],
  },
  {
    id: 'cross-2',
    nameFr: '2 Séances / Semaine',
    nameAr: 'حصتان / أسبوعياً',
    frequencyFr: '8 séances par mois',
    frequencyAr: '8 حصص شهرياً',
    price: 2500,
    periodFr: 'DA / mois',
    periodAr: 'دج / شهر',
    isPopular: true,
    audience: ['hommes', 'femmes'],
    audienceLabelFr: 'Hommes & Femmes (Créneaux Dédiés)',
    audienceLabelAr: 'رجال ونساء (فترات مخصصة)',
    featuresFr: ['Amélioration cardio & puissance', 'Entraînements fonctionnels variés', 'Motivation de groupe'],
    featuresAr: ['رفع قوة التحمل والسرعة', 'تمارين وظيفية متنوعة', 'تحفيز جماعي عالي'],
  },
  {
    id: 'cross-3',
    nameFr: '3 Séances / Semaine',
    nameAr: '3 حصص / أسبوعياً',
    frequencyFr: '12 séances par mois',
    frequencyAr: '12 حصة شهرياً',
    price: 3000,
    periodFr: 'DA / mois',
    periodAr: 'دج / شهر',
    audience: ['hommes', 'femmes'],
    audienceLabelFr: 'Hommes & Femmes (Créneaux Dédiés)',
    audienceLabelAr: 'رجال ونساء (فترات مخصصة)',
    featuresFr: ['Condition physique maximale', 'Dépassement de soi garanti', 'Équipe compétitive'],
    featuresAr: ['أعلى مستويات اللياقة البدنية', 'تحدي وتطور مستمر', 'بيئة تدريب محترفة'],
  },
];

export const combatPlans: PricingPlan[] = [
  {
    id: 'combat-enfants',
    nameFr: 'Académie Enfants (Judo & Boxe)',
    nameAr: 'أكاديمية الأطفال (جودو وملاكمة)',
    frequencyFr: '6 à 14 ans • Créneaux dédiés',
    frequencyAr: 'من 6 إلى 14 سنة • فترات خاصة',
    price: 2500,
    periodFr: 'DA / mois',
    periodAr: 'دج / شهر',
    isPopular: true,
    audience: ['enfants'],
    audienceLabelFr: 'Enfants (6 à 14 ans)',
    audienceLabelAr: 'أطفال (من 6 إلى 14 سنة)',
    featuresFr: [
      'Encadrement certifié par maîtres diplômés',
      'Tatami haute densité sécurisé & désinfecté',
      'Discipline, self-défense et motricité',
      'Horaires adaptés après l\'école & week-end',
    ],
    featuresAr: [
      'تأطير احترافي مع مدربين معتمدين',
      'بساط تاتامي عالي الكثافة معقم وآمن تماماً',
      'انضباط، تنمية حركية وثقة عالية بالنفس',
      'مواعيد مناسبة بعد الدوام ونهاية الأسبوع',
    ],
  },
  {
    id: 'combat-kick-judo',
    nameFr: 'Kickboxing / Judo (Adultes)',
    nameAr: 'كيك بوكسينغ / جودو (كبار)',
    frequencyFr: 'Hommes & Femmes (Créneaux Séparés)',
    frequencyAr: 'للرجال والنساء (فترات منفصلة)',
    price: 2500,
    periodFr: 'DA / mois',
    periodAr: 'دج / شهر',
    isPopular: true,
    audience: ['hommes', 'femmes'],
    audienceLabelFr: 'Hommes & Femmes (Créneaux Séparés)',
    audienceLabelAr: 'رجال ونساء (فترات منفصلة)',
    featuresFr: ['Accès au ring officiel & tatami', 'Technique, self-défense & sparring', 'Encadrement par champions nationaux'],
    featuresAr: ['دخول الحلبة الرسمية وبساط التاتامي', 'تقنيات الدفاع عن النفس والنزال المنضبط', 'تدريب مباشر مع أبطال ومدربين معتمدين'],
  },
  {
    id: 'combat-lutte',
    nameFr: 'Lutte Olympique',
    nameAr: 'المصارعة الأولمبية',
    frequencyFr: 'Section Hommes & Juniors (Mardi & Jeudi)',
    frequencyAr: 'فئة الرجال والشباب (الثلاثاء والخميس)',
    price: 2500,
    periodFr: 'DA / mois',
    periodAr: 'دج / شهر',
    audience: ['hommes'],
    audienceLabelFr: 'Hommes & Juniors',
    audienceLabelAr: 'رجال وشباب',
    featuresFr: ['Discipline, force brute et agilité', 'Tatami haute densité sécurisé', 'Encadrement d\'élite'],
    featuresAr: ['انضباط، قوة بدنية ومرونة', 'بساط تاتامي عالي الكثافة وآمن', 'تدريب مع كوتشات نخبويين'],
  },
];

export const wellnessPlans: PricingPlan[] = [
  {
    id: 'wellness-sauna',
    nameFr: 'Séance Sauna & Piscine',
    nameAr: 'حصة ساونا ومسبح',
    frequencyFr: 'Durée : 1h15',
    frequencyAr: 'المدة: ساعة وربع (1h15)',
    price: 2000,
    periodFr: 'DA / séance',
    periodAr: 'دج / حصة',
    isPopular: true,
    audience: ['hommes', 'femmes'],
    audienceLabelFr: 'Hommes & Femmes',
    audienceLabelAr: 'رجال ونساء',
    featuresFr: ['Sur réservation préalable', 'Détente musculaire & récupération', 'Privatisation & calme absolu'],
    featuresAr: ['حجز مسبق لضمان الراحة', 'استرخاء واسترجاع عضلي فوري', 'خصوصية وهدوء تام'],
  },
  {
    id: 'wellness-nutrition',
    nameFr: 'Programme Nutritionniste',
    nameAr: 'برنامج أخصائي التغذية',
    frequencyFr: 'Programme personnalisé',
    frequencyAr: 'برنامج غذائي مخصص',
    price: 2000,
    periodFr: 'DA / programme',
    periodAr: 'دج / برنامج',
    audience: ['hommes', 'femmes'],
    audienceLabelFr: 'Hommes & Femmes',
    audienceLabelAr: 'رجال ونساء',
    featuresFr: ['Bilan corporel complet', 'Régime adapté (perte de poids / prise de masse)', 'Conseils suppléments alimentaires'],
    featuresAr: ['تقييم بدني شامل', 'خطة غذائية (تضخيم / تنشيف / صحة)', 'توجيه في المكملات الغذائية'],
  },
];

export const mixedPlans: PricingPlan[] = [
  {
    id: 'mixte-cross-2-muscu-2',
    nameFr: 'Cross 2 + Muscu 2',
    nameAr: 'كروس 2 + كمال أجسام 2',
    frequencyFr: '2x Cross + 2x Musculation / semaine',
    frequencyAr: 'حصتان كروس + حصتان كمال أجسام أسبوعياً',
    price: 4500,
    periodFr: 'DA / mois',
    periodAr: 'دج / شهر',
    isPopular: true,
    audience: ['hommes', 'femmes'],
    audienceLabelFr: 'Hommes & Femmes',
    audienceLabelAr: 'رجال ونساء',
    featuresFr: [
      'La formule mixte la plus demandée au club',
      '4 entraînements complets par semaine (16 séances/mois)',
      'Économisez 1 000 DA par rapport aux tarifs séparés',
      'Vestiaires, casiers & douches inclus',
    ],
    featuresAr: [
      'الباقة المدمجة الأكثر طلباً في النادي',
      '4 حصص تدريب أسبوعياً (16 حصة في الشهر)',
      'توفير 1 000 دج مقارنة بالاشتراكات المنفصلة',
      'غرف تبديل الملابس ودوشات وخزائن مؤمنة',
    ],
  },
  {
    id: 'mixte-cross-1-muscu-2',
    nameFr: 'Cross 1 + Muscu 2',
    nameAr: 'كروس 1 + كمال أجسام 2',
    frequencyFr: '1x Cross + 2x Musculation / semaine',
    frequencyAr: 'حصة كروس + حصتان كمال أجسام أسبوعياً',
    price: 3500,
    periodFr: 'DA / mois',
    periodAr: 'دج / شهر',
    audience: ['hommes', 'femmes'],
    audienceLabelFr: 'Hommes & Femmes',
    audienceLabelAr: 'رجال ونساء',
    featuresFr: [
      'Idéal pour allier routine musculation & cardio WOD',
      '3 entraînements équilibrés par semaine',
      'Économisez 1 500 DA par rapport aux tarifs séparés',
      'Accès complet aux équipements des deux disciplines',
    ],
    featuresAr: [
      'مثالية للجمع بين الحديد وحصص الكارديو WOD',
      '3 حصص تدريب متوازنة أسبوعياً',
      'توفير 1 500 دج مقارنة بالاشتراكات المنفصلة',
      'استفادة كاملة من عتاد التخصصين',
    ],
  },
  {
    id: 'mixte-kick-muscu-2',
    nameFr: 'Kickboxing + Muscu 2',
    nameAr: 'كيك بوكسينغ + كمال أجسام 2',
    frequencyFr: 'Kickboxing (Adultes) + 2x Musculation / sem',
    frequencyAr: 'كيك بوكسينغ (كبار) + حصتان كمال أجسام أسبوعياً',
    price: 4500,
    periodFr: 'DA / mois',
    periodAr: 'دج / شهر',
    isPopular: true,
    audience: ['hommes', 'femmes'],
    audienceLabelFr: 'Hommes & Femmes',
    audienceLabelAr: 'رجال ونساء',
    featuresFr: [
      'Ring officiel, sparring contrôlé & plateau musculation',
      'Entraînement combat technique + renforcement force',
      'Économisez 1 000 DA par rapport aux tarifs séparés',
      'Encadrement par les champions et coachs diplômés',
    ],
    featuresAr: [
      'الحلبة الرسمية ونزال منضبط + قاعة الحديد والأوزان',
      'تدريب قتالي تقني + تقوية عضلية وبدنية',
      'توفير 1 000 دج مقارنة بالاشتراكات المنفصلة',
      'إشراف مباشر من أبطال ومدربين معتمدين',
    ],
  },
  {
    id: 'mixte-cross-2-muscu-3',
    nameFr: 'Cross 2 + Muscu 3',
    nameAr: 'كروس 2 + كمال أجسام 3',
    frequencyFr: '2x Cross + 3x Musculation / semaine',
    frequencyAr: 'حصتان كروس + 3 حصص كمال أجسام أسبوعياً',
    price: 4800,
    periodFr: 'DA / mois',
    periodAr: 'دج / شهر',
    audience: ['hommes', 'femmes'],
    audienceLabelFr: 'Hommes & Femmes',
    audienceLabelAr: 'رجال ونساء',
    featuresFr: [
      'Formule complète pour sportifs assidus (5 séances/sem)',
      'Développement physique et endurance maximale',
      'Économisez 1 200 DA par rapport aux tarifs séparés',
      'Plateau force libre et espace WOD sans restriction',
    ],
    featuresAr: [
      'باقة مكثفة للمتدربين المنتظمين (5 حصص أسبوعياً)',
      'تطوير القوة البدنية ورفع التحمل إلى أقصى حد',
      'توفير 1 200 دج مقارنة بالاشتراكات المنفصلة',
      'قاعة الحديد ومساحة الكروس بدون قيود',
    ],
  },
  {
    id: 'mixte-kick-muscu-1',
    nameFr: 'Kickboxing + Muscu 1',
    nameAr: 'كيك بوكسينغ + كمال أجسام 1',
    frequencyFr: 'Kickboxing + 1x Musculation / semaine',
    frequencyAr: 'كيك بوكسينغ + حصة واحدة كمال أجسام أسبوعياً',
    price: 3500,
    periodFr: 'DA / mois',
    periodAr: 'دج / شهر',
    audience: ['hommes', 'femmes'],
    audienceLabelFr: 'Hommes & Femmes',
    audienceLabelAr: 'رجال ونساء',
    featuresFr: [
      'Formule idéale pour se concentrer sur les arts martiaux',
      'Une séance de musculation d\'appoint pour le gainage',
      'Économisez 1 000 DA par rapport aux tarifs séparés',
      'Accès vestiaires, douches et casiers sécurisés',
    ],
    featuresAr: [
      'باقة ممتازة للتركيز على رياضة القتال والدفاع عن النفس',
      'حصة حديد أسبوعية مساعدة لتقوية العضلات الأساسية',
      'توفير 1 000 دج مقارنة بالاشتراكات المنفصلة',
      'غرف تبديل الملابس ودوشات وخزائن مؤمنة',
    ],
  },
  {
    id: 'mixte-lutte-muscu-2',
    nameFr: 'Lutte + Muscu 2',
    nameAr: 'مصارعة + كمال أجسام 2',
    frequencyFr: 'Lutte Olympique + 2x Musculation / semaine',
    frequencyAr: 'مصارعة أولمبية + حصتان كمال أجسام أسبوعياً',
    price: 4500,
    periodFr: 'DA / mois',
    periodAr: 'دج / شهر',
    audience: ['hommes'],
    audienceLabelFr: 'Hommes & Juniors',
    audienceLabelAr: 'رجال وشباب',
    featuresFr: [
      'Tatami officiel (Mardi & Jeudi) + 2 séances musculation',
      'Force brute, préhension et puissance musculaire',
      'Économisez 1 000 DA par rapport aux tarifs séparés',
      'Encadrement technique de haut niveau',
    ],
    featuresAr: [
      'بساط التاتامي (الثلاثاء والخميس) + حصتان حديد وكارديو',
      'قوة بدنية عالية، انضباط ومرونة قتالية',
      'توفير 1 000 دج مقارنة بالاشتراكات المنفصلة',
      'تأطير تقني احترافي عالي المستوى',
    ],
  },
];

export type MixedDisciplineKey = 'cross' | 'kick' | 'lutte';

export interface OfficialMixedRate {
  discipline: MixedDisciplineKey;
  disciplineSessions: number;
  muscuSessions: number;
  price: number;
}

export const officialMixedRates: OfficialMixedRate[] = [
  // Cross + Muscu
  { discipline: 'cross', disciplineSessions: 1, muscuSessions: 1, price: 3000 },
  { discipline: 'cross', disciplineSessions: 1, muscuSessions: 2, price: 3500 },
  { discipline: 'cross', disciplineSessions: 1, muscuSessions: 3, price: 4200 },
  { discipline: 'cross', disciplineSessions: 1, muscuSessions: 4, price: 4800 },
  { discipline: 'cross', disciplineSessions: 1, muscuSessions: 5, price: 5000 },
  { discipline: 'cross', disciplineSessions: 1, muscuSessions: 6, price: 5500 },
  { discipline: 'cross', disciplineSessions: 2, muscuSessions: 1, price: 3500 },
  { discipline: 'cross', disciplineSessions: 2, muscuSessions: 2, price: 4500 },
  { discipline: 'cross', disciplineSessions: 2, muscuSessions: 3, price: 4800 },
  { discipline: 'cross', disciplineSessions: 2, muscuSessions: 4, price: 5000 },
  { discipline: 'cross', disciplineSessions: 2, muscuSessions: 5, price: 5500 },
  { discipline: 'cross', disciplineSessions: 2, muscuSessions: 6, price: 6000 },
  { discipline: 'cross', disciplineSessions: 3, muscuSessions: 1, price: 4000 },
  { discipline: 'cross', disciplineSessions: 3, muscuSessions: 2, price: 4800 },
  { discipline: 'cross', disciplineSessions: 3, muscuSessions: 3, price: 5000 },
  { discipline: 'cross', disciplineSessions: 3, muscuSessions: 4, price: 5500 },
  { discipline: 'cross', disciplineSessions: 3, muscuSessions: 5, price: 6000 },
  { discipline: 'cross', disciplineSessions: 3, muscuSessions: 6, price: 6500 },
  { discipline: 'cross', disciplineSessions: 4, muscuSessions: 1, price: 5000 },
  { discipline: 'cross', disciplineSessions: 4, muscuSessions: 2, price: 5500 },
  { discipline: 'cross', disciplineSessions: 4, muscuSessions: 3, price: 6000 },

  // Kickboxing + Muscu
  { discipline: 'kick', disciplineSessions: 1, muscuSessions: 1, price: 3500 },
  { discipline: 'kick', disciplineSessions: 1, muscuSessions: 2, price: 4000 },
  { discipline: 'kick', disciplineSessions: 1, muscuSessions: 3, price: 4500 },
  { discipline: 'kick', disciplineSessions: 1, muscuSessions: 4, price: 5000 },
  { discipline: 'kick', disciplineSessions: 1, muscuSessions: 5, price: 5500 },
  { discipline: 'kick', disciplineSessions: 1, muscuSessions: 6, price: 6000 },
  { discipline: 'kick', disciplineSessions: 2, muscuSessions: 1, price: 3500 },
  { discipline: 'kick', disciplineSessions: 2, muscuSessions: 2, price: 4500 },
  { discipline: 'kick', disciplineSessions: 2, muscuSessions: 3, price: 4800 },
  { discipline: 'kick', disciplineSessions: 2, muscuSessions: 4, price: 5000 },
  { discipline: 'kick', disciplineSessions: 2, muscuSessions: 5, price: 5500 },
  { discipline: 'kick', disciplineSessions: 3, muscuSessions: 1, price: 4000 },
  { discipline: 'kick', disciplineSessions: 3, muscuSessions: 2, price: 5000 },
  { discipline: 'kick', disciplineSessions: 3, muscuSessions: 3, price: 5500 },
  { discipline: 'kick', disciplineSessions: 3, muscuSessions: 4, price: 6000 },
  { discipline: 'kick', disciplineSessions: 3, muscuSessions: 5, price: 6500 },
  { discipline: 'kick', disciplineSessions: 4, muscuSessions: 1, price: 5000 },
  { discipline: 'kick', disciplineSessions: 4, muscuSessions: 2, price: 6000 },
  { discipline: 'kick', disciplineSessions: 4, muscuSessions: 3, price: 6500 },
  { discipline: 'kick', disciplineSessions: 4, muscuSessions: 4, price: 7000 },

  // Lutte + Muscu
  { discipline: 'lutte', disciplineSessions: 2, muscuSessions: 1, price: 3500 },
  { discipline: 'lutte', disciplineSessions: 2, muscuSessions: 2, price: 4500 },
  { discipline: 'lutte', disciplineSessions: 2, muscuSessions: 3, price: 4800 },
  { discipline: 'lutte', disciplineSessions: 2, muscuSessions: 4, price: 5000 },
];

export const muscuStandalonePrices: Record<number, number> = {
  1: 2000,
  2: 3000,
  3: 3500,
  4: 4000,
  5: 4200,
  6: 4500,
};

export const disciplineStandalonePrices: Record<MixedDisciplineKey, Record<number, number>> = {
  cross: { 1: 2000, 2: 2500, 3: 3000, 4: 4000 },
  kick: { 1: 2000, 2: 2500, 3: 3000, 4: 4000 },
  lutte: { 2: 2500 },
};

export function lookupOfficialMixedRate(
  discipline: MixedDisciplineKey,
  disciplineSessions: number,
  muscuSessions: number
): { price: number; standalonePrice: number; savings: number } {
  const match = officialMixedRates.find(
    (r) =>
      r.discipline === discipline &&
      r.disciplineSessions === disciplineSessions &&
      r.muscuSessions === muscuSessions
  );

  const muscuCost = muscuStandalonePrices[muscuSessions] || 4500;
  const discCost =
    disciplineStandalonePrices[discipline]?.[disciplineSessions] ||
    (discipline === 'lutte' ? 2500 : 2500);
  const standaloneTotal = muscuCost + discCost;

  if (match) {
    const savings = Math.max(0, standaloneTotal - match.price);
    return { price: match.price, standalonePrice: standaloneTotal, savings };
  }

  // Fallback calculation if combination outside standard grid
  const fallbackPrice = Math.max(3500, standaloneTotal - 1000);
  return { price: fallbackPrice, standalonePrice: standaloneTotal, savings: 1000 };
}

export const formulesMixtesMatrix = [
  { cross: 1, muscu: 1, price: 3000 },
  { cross: 1, muscu: 2, price: 3500 },
  { cross: 1, muscu: 3, price: 4200 },
  { cross: 1, muscu: 4, price: 4800 },
  { cross: 1, muscu: 5, price: 5000 },
  { cross: 1, muscu: 6, price: 5500 },
  { cross: 2, muscu: 1, price: 3500 },
  { cross: 2, muscu: 2, price: 4500 },
  { cross: 2, muscu: 3, price: 4800 },
  { cross: 2, muscu: 4, price: 5000 },
  { cross: 2, muscu: 5, price: 5500 },
  { cross: 2, muscu: 6, price: 6000 },
  { cross: 3, muscu: 1, price: 4000 },
  { cross: 3, muscu: 2, price: 4800 },
  { cross: 3, muscu: 3, price: 5000 },
  { cross: 3, muscu: 4, price: 5500 },
  { cross: 3, muscu: 5, price: 6000 },
  { cross: 3, muscu: 6, price: 6500 },
];
