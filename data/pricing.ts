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
    featuresFr: ['Idéal pour maintien & tonification', 'Accès plateau force & cardio', 'Vestiaires sécurisés'],
    featuresAr: ['مثالي للمحافظة على اللياقة والشد', 'دخول قاعة الحديد والكارديو', 'خزائن ملابس آمنة'],
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
    featuresFr: ['La formule la plus équilibrée', 'Suivi de progression', 'Accès libre aux créneaux dédiés'],
    featuresAr: ['الباقة الأكثر توازناً وطلباً', 'متابعة التطور البدني', 'دخول مرن للفترات المخصصة'],
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
    featuresFr: ['Condition physique maximale', 'Dépassement de soi garanti', 'Équipe compétitive'],
    featuresAr: ['أعلى مستويات اللياقة البدنية', 'تحدي وتطور مستمر', 'بيئة تدريب محترفة'],
  },
];

export const combatPlans: PricingPlan[] = [
  {
    id: 'combat-kick-judo',
    nameFr: 'Kickboxing / Judo',
    nameAr: 'كيك بوكسينغ / جودو',
    frequencyFr: 'Hommes, Femmes & Enfants',
    frequencyAr: 'للرجال، النساء، والأطفال',
    price: 2500,
    periodFr: 'DA / mois',
    periodAr: 'دج / شهر',
    isPopular: true,
    featuresFr: ['Accès au ring officiel & tatami', 'Technique, self-défense & sparring', 'Groupes enfants et adultes séparés'],
    featuresAr: ['دخول الحلبة الرسمية وبساط التاتامي', 'تقنيات الدفاع عن النفس والنزال', 'أفواج مخصصة للأطفال والكبار'],
  },
  {
    id: 'combat-lutte',
    nameFr: 'Lutte Olympique',
    nameAr: 'المصارعة الأولمبية',
    frequencyFr: 'Hommes & Enfants',
    frequencyAr: 'للرجال والأطفال',
    price: 2500,
    periodFr: 'DA / mois',
    periodAr: 'دج / شهر',
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
    featuresFr: ['Bilan corporel complet', 'Régime adapté (perte de poids / prise de masse)', 'Conseils suppléments alimentaires'],
    featuresAr: ['تقييم بدني شامل', 'خطة غذائية (تضخيم / تنشيف / صحة)', 'توجيه في المكملات الغذائية'],
  },
];

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
