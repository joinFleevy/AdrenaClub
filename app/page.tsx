'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Language } from '@/data/content';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import LiveStatusEngine from '@/components/LiveStatusEngine';
import PricingSection from '@/components/PricingSection';
import ScheduleSection from '@/components/ScheduleSection';
import WomensSanctuary from '@/components/WomensSanctuary';
import Disciplines from '@/components/Disciplines';
import CoachSection from '@/components/CoachSection';
import ReviewsSection from '@/components/ReviewsSection';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import MobileStickyBar from '@/components/MobileStickyBar';
import OfficialPostersModal from '@/components/OfficialPostersModal';

// Code-split Three.js WebGL Panorama to reduce initial page load JS by >50%
const PanoramaViewer = dynamic(() => import('@/components/PanoramaViewer'), {
  ssr: false,
  loading: () => (
    <section className="py-20 bg-adrena-black border-b border-adrena-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-[450px] sm:h-[550px] md:h-[650px] bg-adrena-card border border-adrena-border rounded-2xl flex flex-col items-center justify-center gap-3 animate-pulse text-adrena-stone text-sm">
          <div className="w-8 h-8 rounded-full border-2 border-adrena-gold border-t-transparent animate-spin" />
          <span>Chargement de la visite 360°...</span>
        </div>
      </div>
    </section>
  ),
});

export default function Home() {
  const [lang, setLang] = useState<Language>('fr');
  const [isPostersModalOpen, setIsPostersModalOpen] = useState<boolean>(false);
  const [activePosterId, setActivePosterId] = useState<string>('tarifs');

  // Load saved language from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem('adrena_lang') as Language;
    if (saved === 'fr' || saved === 'ar') {
      setLang(saved);
    }
  }, []);

  // Sync documentElement lang and dir for screen readers and bidi layout
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const handleToggleLang = () => {
    const nextLang: Language = lang === 'fr' ? 'ar' : 'fr';
    setLang(nextLang);
    localStorage.setItem('adrena_lang', nextLang);
  };

  const handleOpenPostersModal = (posterId: string = 'tarifs') => {
    setActivePosterId(posterId);
    setIsPostersModalOpen(true);
  };

  const isRtl = lang === 'ar';

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-adrena-black text-adrena-bone ${
        isRtl ? 'font-sans' : 'font-sans'
      }`}
    >
      {/* Navigation */}
      <Navbar lang={lang} onToggleLang={handleToggleLang} />

      {/* Hero Section */}
      <Hero lang={lang} />

      {/* Real-time Gym Operational Status Board */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 mb-4">
        <LiveStatusEngine lang={lang} />
      </section>

      {/* 1. Pricing & Custom Formula Calculator */}
      <PricingSection lang={lang} onOpenPostersModal={handleOpenPostersModal} />

      {/* 2. Interactive Schedules & Class Finder (Directly follows pricing) */}
      <ScheduleSection lang={lang} onOpenPostersModal={handleOpenPostersModal} />

      {/* 3. Women's Sanctuary Spotlight (100% private, zero music) */}
      <WomensSanctuary lang={lang} />

      {/* 4. Disciplines & Programs (2 levels: RDC & Sous-sol bays) */}
      <Disciplines lang={lang} />

      {/* 5. Coach Profiles & Expertise (Coaches Abdellah & Hmimed) */}
      <CoachSection lang={lang} />

      {/* 6. 360 Interactive Virtual Tour (Placed as social proof & physical tour; no scroll-hijack) */}
      <PanoramaViewer lang={lang} />

      {/* 7. Social Proof & Google Reviews (160+ verified reviews) */}
      <ReviewsSection lang={lang} />

      {/* 8. Objection-Busting FAQ (Cash payment, trial session, documents needed) */}
      <FAQSection lang={lang} />

      {/* 9. Location & Contact Section (Google Maps, hours, phone) */}
      <ContactSection lang={lang} />

      {/* Footer */}
      <Footer lang={lang} />

      {/* High-Converting Mobile Sticky CTA Bar */}
      <MobileStickyBar lang={lang} />

      {/* Official Graphic Posters Lightbox Modal */}
      <OfficialPostersModal
        isOpen={isPostersModalOpen}
        onClose={() => setIsPostersModalOpen(false)}
        initialPoster={activePosterId}
        lang={lang}
      />
    </div>
  );
}
