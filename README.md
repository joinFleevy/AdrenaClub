# Adrena Club - Site Officiel & Vitrine Digitale Premium

Plateforme web officielle pour **Adréna Club** (باب الزوار - Bab Ezzouar, Alger), complexe sportif moderne sur 2 étages dédié à la musculation, au cross-training, aux sports de combat (boxe, kickboxing, lutte, judo), aux créneaux féminins exclusifs sans musique, aux sections enfants et à la récupération (sauna & hijama).

---

## ⚡ Caractéristiques & Fonctionnalités

- **Bilingue Intégral (Français & Arabe RTL)** : Switch instantané avec préservation des ligatures cursives arabes (`Cairo`) et typographie athlétique occidentale (`Barlow Condensed` / `Outfit`).
- **Visite Virtuelle 360° Interactive** :
  - Intégration Pannellum avec projection équirectangulaire fluide sans gyroscope intempestif.
  - Bascule entre les espaces : Rez-de-chaussée (Musculation), Étage 1 (Combat & Ring), et Réception.
  - Lien direct vers la fiche Google Maps 360°.
- **Plannings Hebdomadaires 2026 Structurés** :
  - Onglets interactifs : Hommes (06:00 - 00:00), Femmes (Créneaux calmes sans musique), Enfants (Judo, Kickboxing, Lutte dès 6 ans).
  - Modal d'affichage des affiches originales haute définition avec zoom et téléchargement PDF direct.
- **Grille Tarifaire Officielle Complète** :
  - Musculation, Cross-training, Sports de combat, Packs mixtes et formules Sauna/Récupération.
  - Boutons de contact directs WhatsApp pré-remplis pour faciliter l'inscription.
- **Avis Google Maps Vérifiés** :
  - Vrais profils et avis authentiques extraits de Google Maps (Local Guides).
  - Bouton direct pour déposer un avis Google.
- **Section Contact & Accès Stratégique** :
  - Coordonnées précises (Cité Universitaire CUB1, Bab Ezzouar, Alger).
  - Liens rapides : Appel direct, WhatsApp, Itinéraire Google Maps.
  - Barre mobile fixe discrète en bas d'écran (Sticky Action Bar).

---

## 🛠 Stack Technique

- **Framework** : [Next.js 14](https://nextjs.org/) (App Router, React 18, TypeScript)
- **Styling** : [Tailwind CSS](https://tailwindcss.com/) avec palette sombre exclusive Adréna (`adrena-gold`, `adrena-black`, `adrena-card`)
- **Visualisation 360°** : [Pannellum](https://pannellum.org/)
- **Icônes** : [Lucide React](https://lucide.dev/)
- **Optimisation** : Zéro dépendance superflue, images optimisées Next.js (`next/image`)

---

## 🚀 Installation & Lancement Local

### Prérequis
- [Node.js](https://nodejs.org/) version 18.17+ ou supérieure
- `npm` ou `yarn` / `pnpm`

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/joinFleevy/AdrenaClub.git
cd AdrenaClub

# Installer les dépendances
npm install
```

### Développement

```bash
npm run dev
```
Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Build de Production

```bash
npm run build
npm run start
```

---

## 📁 Structure du Projet

```
├── app/
│   ├── globals.css          # Styles globaux, polices & variables CSS
│   ├── layout.tsx           # Layout racine avec chargement des polices Google
│   └── page.tsx             # Page principale d'accueil
├── components/
│   ├── ContactSection.tsx   # Coordonnées, horaires & boutons d'appel/maps
│   ├── Disciplines.tsx      # Espaces d'entraînement & disciplines
│   ├── Footer.tsx           # Pied de page officiel & liens rapides
│   ├── Hero.tsx             # Bannière d'accueil, USP & badges d'ouverture
│   ├── MobileStickyBar.tsx  # Barre d'action rapide sur mobile
│   ├── Navbar.tsx           # Navigation principale, sélecteur de langue
│   ├── OfficialPostersModal.tsx # Modal d'affichage des affiches originales
│   ├── PanoramaViewer.tsx   # Visualiseur 360° équirectangulaire
│   ├── PricingSection.tsx   # Grille tarifaire détaillée par formule
│   ├── ReviewsSection.tsx   # Avis vérifiés Google Maps avec photos
│   └── ScheduleSection.tsx  # Plannings hebdomadaires 2026 par catégorie
├── data/
│   └── content.ts           # Dictionnaire bilingue complet (FR / AR)
├── public/
│   ├── images/              # Panoramas 360, affiches officielles, photos
│   └── schedules/           # PDFs officiels des plannings
├── tailwind.config.js       # Configuration des thèmes & polices
└── tsconfig.json            # Configuration TypeScript
```

---

## 📍 Localisation

**Adréna Club**  
Cité Universitaire CUB1, Bab Ezzouar, Alger, Algérie  
Téléphone : `+213 771 57 03 78` / `+213 540 24 74 38`  
Email : `1adrenaclub@gmail.com`
