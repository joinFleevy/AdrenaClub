export type Language = 'fr' | 'ar';

export interface ContentStrings {
  meta: {
    title: string;
    description: string;
  };
  topBar: {
    address: string;
    phone: string;
    statusOpen: string;
    statusClosed: string;
    womenSession: string;
    menSession: string;
  };
  nav: {
    home: string;
    tour360: string;
    disciplines: string;
    planning: string;
    tarifs: string;
    reviews: string;
    contact: string;
    ctaButton: string;
  };
  hero: {
    tagline: string;
    title: string;
    subtitle: string;
    motto: string;
    ctaPrimary: string;
    ctaSecondary: string;
    pillars: Array<{
      title: string;
      desc: string;
    }>;
    trustBadges: Array<{
      title: string;
      subtitle: string;
    }>;
  };
  tour360: {
    title: string;
    subtitle: string;
    floors: {
      rdc: { title: string; badge: string; desc: string };
      muscu: { title: string; badge: string; desc: string };
      combat: { title: string; badge: string; desc: string };
    };
    tip: string;
    googleMapsBtn: string;
  };
  disciplines: {
    title: string;
    subtitle: string;
    items: Array<{
      id: string;
      title: string;
      desc: string;
      category: string;
      image: string;
      features: string[];
    }>;
  };
  planning: {
    title: string;
    subtitle: string;
    tabs: {
      hommes: string;
      femmes: string;
      enfants: string;
    };
    days: {
      samedi: string;
      dimanche: string;
      lundi: string;
      mardi: string;
      mercredi: string;
      jeudi: string;
      vendredi: string;
    };
    notes: {
      femmes: string;
      hommes: string;
      enfants: string;
    };
    openPosterBtn: string;
  };
  tarifs: {
    title: string;
    subtitle: string;
    tabs: {
      musculation: string;
      crosstraining: string;
      combat: string;
      mixtes: string;
      wellness: string;
    };
    perMonth: string;
    perSession: string;
    choosePlan: string;
    popular: string;
    viewPosterBtn: string;
  };
  reviews: {
    title: string;
    subtitle: string;
    verifiedGuide: string;
    leaveReview: string;
    viewAllGoogle: string;
    items: Array<{
      author: string;
      avatar: string;
      meta: string;
      text: string;
      rating: number;
    }>;
  };
  contact: {
    title: string;
    subtitle: string;
    addressLabel: string;
    addressValue: string;
    phoneLabel: string;
    emailLabel: string;
    emailValue: string;
    hoursLabel: string;
    hoursValue: string;
    callNow: string;
    whatsappChat: string;
    getDirections: string;
  };
  mobileBar: {
    call: string;
    whatsapp: string;
    schedule: string;
    location: string;
  };
  coaches: {
    title: string;
    subtitle: string;
    items: Array<{
      id: string;
      name: string;
      role: string;
      disciplines: string[];
      bio: string;
      image: string;
    }>;
  };
  scheduleFinder: {
    title: string;
    subtitle: string;
    filterAll: string;
    filterToday: string;
    dayLabel: string;
    disciplineLabel: string;
    classesFound: string;
    noClasses: string;
    allDays: string;
    allDisciplines: string;
  };
  calculator: {
    title: string;
    subtitle: string;
    step1Title: string;
    step2Title: string;
    muscuOption: string;
    muscuDesc: string;
    mixteOption: string;
    mixteDesc: string;
    combatLabel: string;
    sessionsPerWeek: string;
    totalLabel: string;
    savingsTag: string;
    ctaWhatsapp: string;
  };
  womensSanctuary: {
    title: string;
    subtitle: string;
    tag: string;
    features: Array<{
      title: string;
      desc: string;
    }>;
    cta: string;
  };
  faq: {
    title: string;
    subtitle: string;
    items: Array<{
      q: string;
      a: string;
    }>;
  };
}

export const content: Record<Language, ContentStrings> = {
  fr: {
    meta: {
      title: "Adréna Club | Salle de Sport à Bab Ezzouar (Alger)",
      description: "Adréna Club Bab Ezzouar : Complexe sportif sur 2 étages. Musculation lourde, Cross-Training, Ring de Boxe, Lutte, Judo, Sauna et créneaux femmes sans musique.",
    },
    topBar: {
      address: "Cité Universitaire CUB1, Bab Ezzouar, Alger",
      phone: "0771 57 03 78",
      statusOpen: "Ouvert actuellement",
      statusClosed: "Fermé actuellement",
      womenSession: "Créneau Femmes (Privé)",
      menSession: "Créneau Hommes (Jusqu'à 00:00)",
    },
    nav: {
      home: "Accueil",
      tour360: "Visite 360°",
      disciplines: "Espaces",
      planning: "Plannings",
      tarifs: "Tarifs",
      reviews: "Avis",
      contact: "Accès",
      ctaButton: "Contacter le Club",
    },
    hero: {
      tagline: "Complexe Sportif • Bab Ezzouar • 2 Étages",
      title: "2 ÉTAGES DÉDIÉS À LA PERFORMANCE.",
      subtitle: "Plateau musculation complet, ring de combat officiel, tatami & cross-training. Créneaux femmes 100% privés, calmes et sans musique. Ouvert tous les jours jusqu'à minuit.",
      motto: "« Discipline, Respect & Dépassement de Soi : L'Excellence Sportive à Bab Ezzouar »",
      ctaPrimary: "Nous contacter sur WhatsApp",
      ctaSecondary: "Explorer la salle en 360°",
      pillars: [
        { title: "2 Niveaux d'Entraînement", desc: "Accueil & vestiaires au RDC, plateaux d'entraînement au sous-sol" },
        { title: "Jusqu'à Minuit (00:00)", desc: "Ouvert tous les soirs pour les hommes dès 06:00" },
        { title: "Créneaux Femmes Privés", desc: "100% sans musique avec coachs féminines" },
        { title: "Sports de Combat & Ring", desc: "Kickboxing, Lutte & Judo avec coachs diplômés" },
      ],
      trustBadges: [
        { title: "2 Étages Dédiés", subtitle: "Plateau Musculation & Espace Combat" },
        { title: "Ring & Tatami Officiels", subtitle: "Aux normes pour Boxe & Lutte" },
        { title: "Créneaux Femmes Dédiés", subtitle: "100% sans musique & intimité totale" },
        { title: "160+ Avis Google", subtitle: "Noté 4.9/5 par les membres" },
      ],
    },
    tour360: {
      title: "Visite Interactive 360°",
      subtitle: "Sélectionnez un espace pour explorer nos deux niveaux comme si vous y étiez.",
      floors: {
        rdc: {
          title: "RDC : Accueil & Portiques",
          badge: "Rez-de-chaussée",
          desc: "Accès sécurisé par tourniquets RFID, comptoir d'accueil, espace boissons fraîches & compléments, vestiaires et sauna.",
        },
        muscu: {
          title: "Sous-Sol : Plateau Musculation",
          badge: "Sous-Sol",
          desc: "Grand plateau équipé en machines professionnelles jaune et noir, charges libres, développé couché et bancs de tirage.",
        },
        combat: {
          title: "Sous-Sol : Ring & Cross-Training",
          badge: "Sous-Sol",
          desc: "Ring de boxe aux normes, surface tatami de combat, sacs de frappe lourds, cordes ondulatoires et équipement WOD.",
        },
      },
      tip: "Faites glisser pour faire pivoter la caméra",
      googleMapsBtn: "Ouvrir sur Google Maps 360°",
    },
    disciplines: {
      title: "Nos Espaces d'Entraînement",
      subtitle: "Un matériel robuste et un encadrement sérieux pour des résultats concrets.",
      items: [
        {
          id: "muscu",
          title: "Musculation & Force",
          category: "Plateau Force",
          image: "/images/disciplines/musculation.jpg",
          desc: "Parc complet de machines guidées et postes libres pour travailler chaque groupe musculaire avec précision et sécurité.",
          features: ["Machines professionnelles ciblées", "Zone haltères et barres olympiques", "Espace cardio training"],
        },
        {
          id: "cross",
          title: "Cross-Training",
          category: "Conditionnement",
          image: "/images/disciplines/crossfit.jpg",
          desc: "Séances fonctionnelles à haute intensité axées sur le cardio, la force et l'agilité sous la direction de coachs expérimentés.",
          features: ["WODs structurés et progressifs", "Kettlebells, cordes & box jumps", "Ambiance d'entraînement rigoureuse"],
        },
        {
          id: "combat",
          title: "Sports de Combat",
          category: "Ring & Tatami",
          image: "/images/disciplines/combat.jpg",
          desc: "Kickboxing, Lutte olympique et Judo encadrés par les coachs Abdellah et Hmimed sur ring et tatami adaptés.",
          features: ["Véritable ring de combat", "Sacs de frappe suspendus", "Entraînement technique et sparring"],
        },
        {
          id: "femmes",
          title: "Créneaux Femmes (Sans Musique)",
          category: "100% Réservé",
          image: "/images/disciplines/femmes.jpg",
          desc: "Horaires exclusifs pour femmes assurant intimité et sérénité. Ambiance calme sans musique avec des coachs féminines qualifiées.",
          features: ["Portes fermées & intimité totale", "Kickboxing féminin dédié", "Musculation & Cross-training adaptés"],
        },
        {
          id: "enfants",
          title: "Section Enfants",
          category: "Jeunes dès 6 ans",
          image: "/images/disciplines/enfants.jpg",
          desc: "Apprentissage du Judo, du Kickboxing et de la Lutte pour développer motricité, respect, confiance et discipline.",
          features: ["Encadrement pédagogique attentif", "Groupes d'âge et niveaux séparés", "Horaires adaptés au calendrier scolaire"],
        },
        {
          id: "wellness",
          title: "Sauna, Piscine & Récupération",
          category: "Bien-Être & Santé",
          image: "/images/disciplines/reception.jpg",
          desc: "Séances de sauna privatisées (1h15 sur réservation), suivi en nutrition sportive et soins de récupération.",
          features: ["Sauna traditionnel privatisé", "Suivi nutritionniste personnalisé", "Espace calme pour la détente"],
        },
      ],
    },
    planning: {
      title: "Plannings Hebdomadaires 2026",
      subtitle: "Des horaires pensés pour votre emploi du temps, du matin jusqu'à minuit.",
      tabs: {
        hommes: "Hommes",
        femmes: "Femmes (Sans Musique)",
        enfants: "Enfants",
      },
      days: {
        samedi: "Samedi",
        dimanche: "Dimanche",
        lundi: "Lundi",
        mardi: "Mardi",
        mercredi: "Mercredi",
        jeudi: "Jeudi",
        vendredi: "Vendredi",
      },
      notes: {
        hommes: "Musculation ouverte dès 06:00 le matin et tous les soirs jusqu'à 00:00 (Minuit).",
        femmes: "Créneaux strictement fermés aux hommes, encadrés par des femmes, sans musique.",
        enfants: "Séances de combat et motricité adaptées aux plus jeunes.",
      },
      openPosterBtn: "Afficher l'affiche officielle",
    },
    tarifs: {
      title: "Grille Tarifaire Officielle",
      subtitle: "Des prix clairs sans frais cachés, basés sur les tarifs officiels du club.",
      tabs: {
        musculation: "Musculation",
        crosstraining: "Cross-Training",
        combat: "Sports de Combat",
        mixtes: "Formules Mixtes",
        wellness: "Sauna & Nutrition",
      },
      perMonth: "DA / mois",
      perSession: "DA / séance",
      choosePlan: "S'inscrire sur WhatsApp",
      popular: "Formule Recommandée",
      viewPosterBtn: "Voir la grille originale du club",
    },
    reviews: {
      title: "Avis des Membres sur Google Maps",
      subtitle: "Retours d'expérience réels de sportifs qui s'entraînent quotidiennement au club.",
      verifiedGuide: "Local Guide Google vérifié",
      leaveReview: "Donner votre avis",
      viewAllGoogle: "Consulter les 160+ avis sur Google Maps",
      items: [
        {
          author: "Ayoub Bougueroua",
          avatar: "/images/reviews/ayoub-bougueroua.jpg",
          meta: "Local Guide • 164 avis",
          rating: 5,
          text: "Cette salle est exceptionnelle, équipée de matériel de pointe adapté à tous types d'entraînements. En plus de la musculation traditionnelle, elle propose un large éventail d'activités, notamment pour enfants. Le cross-training est un point fort, animé par les coachs compétents Abdellah et Hmimed. Pour la détente, sauna sur réservation, massages et hijama.",
        },
        {
          author: "Mehdy LesCoins",
          avatar: "/images/reviews/mehdy-lescoins.jpg",
          meta: "Local Guide • 142 avis",
          rating: 5,
          text: "Très belle salle de sport, les coachs sont formidables. Ambiance sérieuse, disciplinée et motivante. Bonne continuation à toute l'équipe !",
        },
        {
          author: "Aggoun Walid",
          avatar: "/images/reviews/aggoun-walid.jpg",
          meta: "Local Guide • 59 avis",
          rating: 5,
          text: "Salle spacieuse, très propre, avec des équipements diversifiés, hammam/sauna et une grande salle d'entraînement pour les sports de combat avec ring. Je la recommande vivement !",
        },
      ],
    },
    contact: {
      title: "Accès & Coordonnées",
      subtitle: "Idéalement situé à Bab Ezzouar, à proximité directe de la Cité Universitaire CUB1.",
      addressLabel: "Adresse",
      addressValue: "Cité Universitaire CUB1, Bab Ezzouar, Alger",
      phoneLabel: "Téléphones",
      emailLabel: "Email",
      emailValue: "1adrenaclub@gmail.com",
      hoursLabel: "Horaires généraux",
      hoursValue: "Samedi - Jeudi : 06:00 - 00:00 | Vendredi : 08:00 - 00:00",
      callNow: "Appeler le 0771 57 03 78",
      whatsappChat: "Message WhatsApp",
      getDirections: "Itinéraire Google Maps",
    },
    mobileBar: {
      call: "Appeler",
      whatsapp: "WhatsApp",
      schedule: "Plannings",
      location: "Itinéraire",
    },
    coaches: {
      title: "Nos Coachs & Encadrement",
      subtitle: "Des professionnels passionnés et exigeants pour vous guider vers vos objectifs.",
      items: [
        {
          id: "abdellah",
          name: "Coach Abdellah",
          role: "Head Coach Combat & Conditionnement",
          disciplines: ["Kickboxing", "Préparation Physique", "Cross-Training"],
          bio: "Spécialiste du combat debout et du conditionnement cardio. Pédagogue rigoureux, il forme athlètes confirmés comme débutants dans une ambiance de respect et de dépassement.",
          image: "/images/coaches/coach-abdellah.jpg",
        },
        {
          id: "hmimed",
          name: "Coach Hmimed",
          role: "Maître Judo & Lutte Olympique",
          disciplines: ["Judo (Ceinture Noire)", "Lutte", "Préparation Athlétique"],
          bio: "Éducateur sportif fédéral, axé sur les valeurs fondamentales des arts martiaux : discipline, respect de l'adversaire et solidité technique dès le plus jeune âge.",
          image: "/images/coaches/coach-hmimed.jpg",
        },
        {
          id: "youth",
          name: "Coach Jeunesse & Motricité",
          role: "Instructeur Section Enfants",
          disciplines: ["Éveil Martial", "Judo Enfants", "Souplesse & Agilité"],
          bio: "Dédié au développement physique et moral des enfants dès 6 ans. Un encadrement bienveillant et structuré pour bâtir la confiance en soi et l'esprit d'équipe.",
          image: "/images/coaches/coach-youth.jpg",
        },
      ],
    },
    scheduleFinder: {
      title: "Trouvez Votre Créneau",
      subtitle: "Sélectionnez votre discipline ou votre jour disponible pour afficher instantanément vos séances.",
      filterAll: "Tous les créneaux",
      filterToday: "Aujourd'hui",
      dayLabel: "Jour d'entraînement",
      disciplineLabel: "Discipline",
      classesFound: "séance(s) trouvée(s)",
      noClasses: "Aucune séance pour ces critères. Consultez les plannings complets ci-dessous.",
      allDays: "Tous les jours",
      allDisciplines: "Toutes les disciplines",
    },
    calculator: {
      title: "Calculateur d'Abonnement",
      subtitle: "Composez votre formule sur-mesure et obtenez instantanément votre tarif officiel.",
      step1Title: "1. Choisissez votre base d'entraînement",
      step2Title: "2. Ajoutez une discipline de combat ou cross-training",
      muscuOption: "Musculation Seule",
      muscuDesc: "Accès libre aux machines de force, charges libres & cardio (06h - 00h)",
      mixteOption: "Pack Mixte (Recommandé)",
      mixteDesc: "Musculation illimitée + cours encadrés de combat ou cross-training",
      combatLabel: "Nombre de séances de combat / cross-training par semaine",
      sessionsPerWeek: "séance(s) / sem",
      totalLabel: "Tarif Mensuel Officiel",
      savingsTag: "Formule Économique — Meilleur Rapport Progrès / Prix",
      ctaWhatsapp: "Réserver cette formule via WhatsApp",
    },
    womensSanctuary: {
      title: "Créneaux 100% Réservés aux Femmes",
      subtitle: "Un espace d'entraînement pensé pour votre sérénité, sans compromis sur l'exigence sportive.",
      tag: "Sanctuaire Féminin • Bab Ezzouar",
      features: [
        {
          title: "Intimité Absolue & Portes Closes",
          desc: "Accès strictement interdit aux hommes pendant les horaires féminins. Entrées et fenêtres occultées pour une tranquillité totale.",
        },
        {
          title: "Ambiance Calme Sans Aucune Musique",
          desc: "Zéro musique diffusée. Un cadre apaisant et respectueux favorisant la concentration, l'effort sain et le bien-être.",
        },
        {
          title: "Coachs Féminines Qualifiées",
          desc: "Séances de musculation guidée, cross-training adapté et kickboxing féminin encadrées exclusivement par des coachs femmes attentives.",
        },
        {
          title: "Vestiaires & Douches Privatisés",
          desc: "Espaces sanitaires soignés, douches chaudes individuelles et casiers sécurisés pour un confort optimal.",
        },
      ],
      cta: "Découvrir les horaires femmes",
    },
    faq: {
      title: "Questions Fréquentes",
      subtitle: "Tout ce que vous devez savoir avant de débuter votre entraînement à Adréna Club.",
      items: [
        {
          q: "Les douches et vestiaires sont-ils inclus et entretenus ?",
          a: "Oui, l'accès aux vestiaires spacieux, aux casiers sécurisés et aux douches chaudes individuelles est inclus dans tous nos abonnements. Les espaces sont nettoyés et désinfectés en continu tout au long de la journée.",
        },
        {
          q: "Comment fonctionne l'accès au sauna traditionnel ?",
          a: "Notre sauna traditionnel en bois est privatisé par créneau de 1h15 sur réservation préalable auprès de la réception. Cela garantit un calme absolu, une hygiène irréprochable et un moment de récupération exclusif.",
        },
        {
          q: "Puis-je faire une séance d'essai avant de m'abonner ?",
          a: "Absolument ! Des séances à l'unité (séance libre musculation ou cours de combat) sont disponibles à la réception pour vous permettre de tester les équipements, l'ambiance et la pédagogie des coachs sans engagement.",
        },
        {
          q: "Les débutants complets peuvent-ils intégrer les cours de combat et cross-training ?",
          a: "Oui, sans aucune hésitation. Les coachs Abdellah et Hmimed adaptent l'intensité selon votre condition physique. L'accent est d'abord mis sur la posture, la technique et la sécurité avant tout entraînement plus poussé.",
        },
        {
          q: "Faut-il apporter son propre matériel pour la boxe et les arts martiaux ?",
          a: "Pour des raisons d'hygiène et de confort personnel, nous recommandons d'avoir vos propres bandages et gants de boxe (ou kimono pour le judo). Du matériel de base peut être prêté lors de vos premières séances ou acheté à notre boutique d'accueil.",
        },
      ],
    },
  },
  ar: {
    meta: {
      title: "نادي أدرينا سبورت | صالة تدريب رياضية في باب الزوار",
      description: "نادي أدرينا سبورت باب الزوار: مجمع رياضي على طابقين. كمال أجسام، كروس ترينينغ، حلبة ملاكمة، مصارعة، جودو، ساونا وفترات خاصة للنساء بدون موسيقى.",
    },
    topBar: {
      address: "الحي الجامعي CUB1، باب الزوار، الجزائر العاصمة",
      phone: "0771 57 03 78",
      statusOpen: "مفتوح الآن",
      statusClosed: "مغلق حالياً",
      womenSession: "فترة النساء (خصوصية تامة)",
      menSession: "فترة الرجال (حتى منتصف الليل)",
    },
    nav: {
      home: "الرئيسية",
      tour360: "جولة 360°",
      disciplines: "القاعات",
      planning: "المواقيت",
      tarifs: "الأسعار",
      reviews: "التقييمات",
      contact: "الموقع",
      ctaButton: "تواصل مع النادي",
    },
    hero: {
      tagline: "مجمع رياضي متكامل • باب الزوار • طابقان",
      title: "طابقان من التدريب والاحتراف في باب الزوار.",
      subtitle: "كمال أجسام بأحدث الأجهزة، حلبة ملاكمة وبساط تاتامي، وفترات خاصة ومغلقة للنساء بدون موسيقى. مفتوح يومياً حتى منتصف الليل.",
      motto: "« الانضباط، الاحترام، والتطور البدني : بيئة تدريب استثنائية في باب الزوار »",
      ctaPrimary: "تواصل معنا مباشرة عبر واتساب",
      ctaSecondary: "جولة 360° داخل الصالة",
      pillars: [
        { title: "طابقان مجهزان بالكامل", desc: "الاستقبال والخدمات بالطابق الأرضي، وقاعات التدريب بالطابق السفلي" },
        { title: "حتى منتصف الليل (00:00)", desc: "مفتوح يومياً للرجال ابتداءً من 06:00 صباحاً" },
        { title: "فترات خاصة للنساء", desc: "100% خصوصية وبدون موسيقى مع مدربات" },
        { title: "حلبة ملاكمة وبساط نزال", desc: "كيك بوكسينغ، مصارعة وجودو مع مدربين معتمدين" },
      ],
      trustBadges: [
        { title: "طابقان مجهزان بالكامل", subtitle: "كمال أجسام وفنون قتالية" },
        { title: "حلبة وبساط معتمد", subtitle: "للملاكمة والمصارعة والجودو" },
        { title: "أوقات مخصصة للنساء", subtitle: "بدون أي موسيقى وخصوصية تامة" },
        { title: "+160 تقييم Google", subtitle: "تقييم 4.9/5 من الأعضاء" },
      ],
    },
    tour360: {
      title: "جولة افتراضية تفاعلية 360°",
      subtitle: "اختر القاعة التي تريد استكشافها وتجوّل داخل طابقي النادي من هاتفك.",
      floors: {
        rdc: {
          title: "الطابق الأرضي : الاستقبال والبوابات",
          badge: "الطابق الأرضي",
          desc: "بوابات إلكترونية ذكية RFID، مكتب الاستقبال، ركن المشروبات والمكملات، غرف تبديل الملابس والساونا.",
        },
        muscu: {
          title: "الطابق السفلي : قاعة كمال الأجسام",
          badge: "الطابق السفلي",
          desc: "قاعة واسعة تضم تشكيلة متكاملة من أجهزة الحديد الصفراء والسوداء، أوزان حرة ومقاعد تدريب متعددة.",
        },
        combat: {
          title: "الطابق السفلي : حلبة القتال والكروس فيت",
          badge: "الطابق السفلي",
          desc: "حلبة ملاكمة رسمية، بساط تاتامي للنزال، أكياس ملاكمة ثقيلة، ومعدات كروس ترينينغ متنوعة.",
        },
      },
      tip: "اسحب الشاشة بيدك لتدوير الكاميرا في كل الاتجاهات",
      googleMapsBtn: "فتح الجولة على خرائط Google 360°",
    },
    disciplines: {
      title: "قاعات وبرامج التدريب",
      subtitle: "عتاد تدريبي متين وتأطير تقني جاد لتحقيق أهدافك الرياضية.",
      items: [
        {
          id: "muscu",
          title: "كمال الأجسام والحديد",
          category: "قاعة الأوزان",
          image: "/images/disciplines/musculation.jpg",
          desc: "مجموعة شاملة من الآلات الموجهة والأوزان الحرة لتمرين كل عضلات الجسم بأمان ودقة.",
          features: ["آلات احترافية دقيقة الزوايا", "منطقة أوزان حرة وقضبان أولمبية", "ركن مخصص لأجهزة الكارديو"],
        },
        {
          id: "cross",
          title: "كروس ترينينغ",
          category: "اللياقة الوظيفية",
          image: "/images/disciplines/crossfit.jpg",
          desc: "تمارين وظيفية عالية الشدة لتطوير التنفس والقدرة العضلية والسرعة بإشراف مدربين أكفاء.",
          features: ["برامج WODs متدرجة ومدروسة", "كرات وأثقال روسية وحبال مقاومة", "بيئة تدريب جماعية محفزة"],
        },
        {
          id: "combat",
          title: "فنون القتال والدفاع عن النفس",
          category: "الحلبة والتاتامي",
          image: "/images/disciplines/combat.jpg",
          desc: "كيك بوكسينغ، مصارعة أولمبية وجودو مع الكوتشين عبد الله وحميمد على حلبة وتاتامي معتمدين.",
          features: ["حلبة ملاكمة مطابقة للمواصفات", "أكياس ملاكمة معلقة", "نزالات تدريبية مأمونة"],
        },
        {
          id: "femmes",
          title: "فترات النساء (بدون موسيقى)",
          category: "خصوصية تامة",
          image: "/images/disciplines/femmes.jpg",
          desc: "مواعيد مغلقة تماماً للنساء تضمن الهدوء والاحترام بدون موسيقى، بإشراف مدربات متخصصات.",
          features: ["أبواب مغلقة وخصوصية كاملة", "كيك بوكسينغ نسائي مخصص", "حصص كمال أجسام ورشاقة ملائمة"],
        },
        {
          id: "enfants",
          title: "قسم الأطفال",
          category: "ابتداءً من 6 سنوات",
          image: "/images/disciplines/enfants.jpg",
          desc: "تعليم الجودو والكيك بوكسينغ والمصارعة لتربية الأطفال على الانضباط، الثقة بالنفس، والاحترام.",
          features: ["تأطير بيداغوجي وأمان تام", "فصل الفئات حسب السن والمستوى", "مواعيد مناسبة للدوام المدرسي"],
        },
        {
          id: "wellness",
          title: "الساونا، المسبح والاسترجاع",
          category: "العافية والصحة",
          image: "/images/disciplines/reception.jpg",
          desc: "جلسات ساونا فردية ومغلقة (1h15 بالحجز مسبقاً)، برامج تغذية مخصصة واستشفاء عضلي.",
          features: ["ساونا تقليدية مريحة بالحجز", "متابعة مع أخصائي تغذية معتمد", "أجواء استرخاء واسترجاع بدني"],
        },
      ],
    },
    planning: {
      title: "جداول المواعيد الأسبوعية 2026",
      subtitle: "مخططات منظمة لتوزيع أوقاتك بكل أريحية من الصباح الباكر حتى منتصف الليل.",
      tabs: {
        hommes: "الرجال",
        femmes: "النساء (بدون موسيقى)",
        enfants: "الأطفال",
      },
      days: {
        samedi: "السبت",
        dimanche: "الأحد",
        lundi: "الإثنين",
        mardi: "الثلاثاء",
        mercredi: "الأربعاء",
        jeudi: "الخميس",
        vendredi: "الجمعة",
      },
      notes: {
        hommes: "كمال الأجسام مفتوح من 06:00 صباحاً ويستمر يومياً حتى منتصف الليل (00:00).",
        femmes: "فترات مغلقة تماماً على الرجال، بإشراف مدربات، وبدون أي موسيقى.",
        enfants: "حصص تدريبية آمنة تناسب أعمار الصغار وقدراتهم.",
      },
      openPosterBtn: "عرض الملصق الأصلي",
    },
    tarifs: {
      title: "قائمة الأسعار الرسمية",
      subtitle: "أسعار واضحة ومباشرة مطابقة للملصقات الرسمية الخاصة بالنادي.",
      tabs: {
        musculation: "كمال الأجسام",
        crosstraining: "كروس ترينينغ",
        combat: "فنون القتال",
        mixtes: "الباقات المدمجة",
        wellness: "الساونا والتغذية",
      },
      perMonth: "دج / شهر",
      perSession: "دج / حصة",
      choosePlan: "التسجيل عبر واتساب",
      popular: "الباقة المفضلة",
      viewPosterBtn: "مشاهدة الملصق الأصلي للنادي",
    },
    reviews: {
      title: "آراء المشتركين على Google Maps",
      subtitle: "تجارب وتقييمات حقيقية من أعضاء يتدربون يومياً في الصالة.",
      verifiedGuide: "مرشد محلي معتمد لدى Google",
      leaveReview: "كتابة تقييم جديد",
      viewAllGoogle: "مشاهدة أكثر من 160 تقييماً على خرائط Google",
      items: [
        {
          author: "Ayoub Bougueroua",
          avatar: "/images/reviews/ayoub-bougueroua.jpg",
          meta: "مرشد محلي • 164 تقييماً",
          rating: 5,
          text: "هذه الصالة استثنائية، مجهزة بمعدات متطورة مناسبة لمختلف التمارين. بالإضافة إلى كمال الأجسام، تقدم أنشطة متنوعة وخاصة للأطفال. الكروس ترينينغ مميز جداً مع الكوتشين المحترفين عبد الله وحميمد. وللاسترخاء يوجد ساونا بالحجز وتدليك وحجامة.",
        },
        {
          author: "Mehdy LesCoins",
          avatar: "/images/reviews/mehdy-lescoins.jpg",
          meta: "مرشد محلي • 142 تقييماً",
          rating: 5,
          text: "قاعة رياضة رائعة جداً، والمدربون ممتازون. انضباط وجدية وأجواء تدريبية تحفز على التطور. بالتوفيق لكل فريق العمل !",
        },
        {
          author: "Aggoun Walid",
          avatar: "/images/reviews/aggoun-walid.jpg",
          meta: "مرشد محلي • 59 تقييماً",
          rating: 5,
          text: "قاعة واسعة، نظيفة للغاية، معدات متنوعة، حمام وساونا، وقاعة تدريب واسعة لرياضات القتال مع حلبة رسمية. أوصي بها بشدة !",
        },
      ],
    },
    contact: {
      title: "الموقع ومعلومات الاتصال",
      subtitle: "موقع استراتيجي في باب الزوار، بجوار الحي الجامعي CUB1 مباشرة.",
      addressLabel: "العنوان",
      addressValue: "الحي الجامعي CUB1، بلدية باب الزوار، الجزائر العاصمة",
      phoneLabel: "الهاتف",
      emailLabel: "البريد الإلكتروني",
      emailValue: "1adrenaclub@gmail.com",
      hoursLabel: "أوقات الدوام العامة",
      hoursValue: "السبت - الخميس: 06:00 - 00:00 | الجمعة: 08:00 - 00:00",
      callNow: "اتصال هاتفي مباشر",
      whatsappChat: "مراسلة عبر واتساب",
      getDirections: "الاتجاهات على الخريطة",
    },
    mobileBar: {
      call: "اتصال",
      whatsapp: "واتساب",
      schedule: "المواقيت",
      location: "الموقع",
    },
    coaches: {
      title: "فريق التدريب والتأطير التقني",
      subtitle: "نخبة من المدربين المعتمدين وأبطال الحلبة لمرافقتك نحو أهدافك البدنية والرياضية بكل احترافية.",
      items: [
        {
          id: "abdellah",
          name: "الكوتش عبد الله (Coach Abdellah)",
          role: "مدرب الفنون القتالية والكيك بوكسينغ",
          disciplines: ["كيك بوكسينغ", "ملاكمة إنجليزية", "كروس ترينينغ"],
          bio: "خبير وممارس متمرس في رياضات القتال مع سنوات من التأطير على الحلبة. يركز على سلامة الرياضي، دقة الضربات والتكنيك، وبناء اللياقة البدنية والصلابة الذهنية.",
          image: "/images/coaches/coach-abdellah.jpg",
        },
        {
          id: "hmimed",
          name: "الكوتش حميمد (Coach Hmimed)",
          role: "أستاذ ومدرب الجودو والمصارعة",
          disciplines: ["جودو", "حزام أسود", "مصارعة أولمبية"],
          bio: "حزام أسود وخبير تاتامي متخصص في تقنيات الإسقاط، التثبيت الأرضي وتطوير القوة الوظيفية. يشرف على تدريب الفئات الصغرى والشباب على الانضباط والاحترام.",
          image: "/images/coaches/coach-hmimed.jpg",
        },
        {
          id: "youth",
          name: "فريق الإعداد والكروس ترينينغ",
          role: "مدرب الإعداد البدني والناشئين",
          disciplines: ["كروس ترينينغ", "لياقة وظيفية", "فئات الناشئين"],
          bio: "تأطير ديناميكي وحصص WODs حماسية تجمع بين الكارديو والقوة العضلية لتطوير الأداء الحركي والقدرة على التحمل لدى الكبار والصغار.",
          image: "/images/coaches/coach-youth.jpg",
        },
      ],
    },
    scheduleFinder: {
      title: "دليل الحصص والمواقيت الذكي",
      subtitle: "اعثر بضغطة زر على الحصة المناسبة ليومك وبرنامجك من بين أكثر من 40 حصة أسبوعياً.",
      filterAll: "كل الحصص",
      filterToday: "حصص اليوم",
      dayLabel: "اختر اليوم",
      disciplineLabel: "الرياضة أو النشاط",
      classesFound: "حصة تدريبية مبرمجة",
      noClasses: "لا توجد حصص مبرمجة لهذا اليوم والنشاط المختار. يرجى مراجعة الجدول الكامل.",
      allDays: "جميع أيام الأسبوع",
      allDisciplines: "جميع التخصصات",
    },
    calculator: {
      title: "حاسبة الاشتراكات التفاعلية",
      subtitle: "اختر صيغة تدريبك المناسبة واكتشف تسعيرتك الرسمية فوراً بدون مفاجآت.",
      step1Title: "1. اختر قاعدة التدريب الخاصة بك",
      step2Title: "2. أضف حصص الفنون القتالية أو الكروس ترينينغ",
      muscuOption: "كمال الأجسام فقط (حديد)",
      muscuDesc: "دخول غير محدود لقاعة الأجهزة، الأوزان الحرة والكارديو (06:00 - 00:00)",
      mixteOption: "الباقة المدمجة (الأكثر طلباً)",
      mixteDesc: "كمال أجسام غير محدود + حصص قتالية مؤطرة أو كروس ترينينغ",
      combatLabel: "عدد حصص القتال / الكروس ترينينغ أسبوعياً",
      sessionsPerWeek: "حصص / أسبوع",
      totalLabel: "الاشتراك الشهري الرسمي",
      savingsTag: "صيغة اقتصادية موفرة — أفضل مردود بدني مقابل السعر",
      ctaWhatsapp: "تأكيد وتسجيل هذه الباقة عبر واتساب",
    },
    womensSanctuary: {
      title: "فترات 100% مخصصة ومغلقة للنساء",
      subtitle: "مساحة رياضية متكاملة مصممة لراحتكِ وخصوصيتكِ التامة، بأعلى معايير الانضباط الرياضي.",
      tag: "فضاء النساء الحصري • باب الزوار",
      features: [
        {
          title: "أبواب مغلقة وخصوصية مطلقة",
          desc: "منع تام لدخول الرجال خلال الأوقات المخصصة للنساء. نوافذ ومداخل محجوبة بالكامل لتوفير بيئة تدريب آمنة ومريحة.",
        },
        {
          title: "بيئة هادئة ومحترمة بدون موسيقى",
          desc: "صفر موسيقى نهائياً. جو نقي ومركز يمنحكِ الراحة النفسية والتركيز التام على التمارين والصحة البدنية.",
        },
        {
          title: "مدربات معتمدات ومتخصصات",
          desc: "تأطير نسائي حصري في كمال الأجسام، الرشاقة، الكروس ترينينغ والكيك بوكسينغ لمتابعة تطوركِ خطوة بخطوة.",
        },
        {
          title: "غرف تبديل ملابس ودوشات خاصة",
          desc: "مرافق صحية نظيفة وخزائن أمانات ودوشات دافئة تضمن أعلى مستويات الراحة والنظافة المستمرة.",
        },
      ],
      cta: "اطّلعي على جدول أوقات النساء",
    },
    faq: {
      title: "الأسئلة الشائعة",
      subtitle: "إجابات واضحة ودقيقة عن كل ما يهمك معرفته قبل بدء التدريب في أدرينا كلوب.",
      items: [
        {
          q: "هل غرف تبديل الملابس والدوشات مشمولة ونظيفة ؟",
          a: "نعم، الدخول إلى غرف تبديل الملابس الفسيحة، الخزائن المؤمنة، والدوشات الفردية الساخنة مشمول في جميع الاشتراكات بدون أي رسوم إضافية. تخضع المرافق للتنظيف والتعقيم المستمر على مدار اليوم.",
        },
        {
          q: "كيف تتم الاستفادة من الساونا التقليدية ؟",
          a: "الساونا الخشبية التقليدية تكون مغلقة ومخصصة فردياً بحصة مدتها 1 ساعة و15 دقيقة بعد الحجز المسبق في مكتب الاستقبال. يضمن ذلك هدوءاً تاماً ونظافة مثالية وجلسة استرجاع خاصة بك.",
        },
        {
          q: "هل يمكنني إجراء حصة تجريبية قبل الاشتراك الشهري ؟",
          a: "بالتأكيد ! نوفر إمكانية دفع حصة فردية واحدة (كمال أجسام أو حصة قتالية/كروس ترينينغ) في مكتب الاستقبال لتجربة القاعة، العتاد، وأجواء التدريب بحرية تامة.",
        },
        {
          q: "هل يمكن للمبتدئين تماماً الانضمام لحصص القتال والكروس ترينينغ ؟",
          a: "نعم بكل تأكيد. يقوم الكوتش عبد الله والكوتش حميمد بملاءمة مستوى التمارين والشدة حسب لياقتك البدنية، مع التركيز التام في البداية على الوضعيات الصحيحة، الحركات الأساسية والأمان قبل أي احتكاك متقدم.",
        },
        {
          q: "هل أحتاج لإحضار عتادي الخاص لحصص الملاكمة والفنون القتالية ؟",
          a: "لأسباب تتعلق بالنظافة والراحة الشخصية، نوصي بالحصول على ضمادات اليدين (bandages) وقفازات الملاكمة الخاصة بك (أو بدلة الكيمونو للجودو). كما تتوفر معدات أساسية للإعارة في الحصص الأولى أو للشراء من متجر الاستقبال.",
        },
      ],
    },
  },
};
