import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://adrena.club'),
  title: "Adréna Club | Salle de Sport & Fitness Premium à Bab Ezzouar",
  description: "Adréna Club Bab Ezzouar : Complexe sportif sur 2 étages. Musculation, CrossTraining, Kickboxing, Judo, Lutte, Sauna, Piscine et créneaux 100% privés pour femmes.",
  keywords: [
    "salle de sport bab ezzouar",
    "gym alger",
    "adrena club",
    "musculation alger",
    "crosstraining bab ezzouar",
    "kickboxing alger",
    "salle de sport femme alger",
    "fitness bab ezzouar",
    "club adrena sport",
  ],
  authors: [{ name: "Adrena Club" }],
  openGraph: {
    title: "Adréna Club | Complexe Sportif sur 2 Étages à Bab Ezzouar",
    description: "Musculation haut de gamme, CrossTraining, Sports de Combat, Sauna & Espace 100% femmes à Bab Ezzouar.",
    url: "https://adrena.club",
    siteName: "Adréna Club",
    images: [
      {
        url: "/images/posters/tarifs_officiels.jpg",
        width: 1200,
        height: 630,
        alt: "Adrena Club Bab Ezzouar",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900;1,700;1,800&family=Cairo:wght@400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-adrena-black text-white antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
