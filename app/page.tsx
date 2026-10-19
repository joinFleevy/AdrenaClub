'use client';

import React, { useState, useEffect } from 'react';
import { Language } from '@/data/content';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import LiveStatusEngine from '@/components/LiveStatusEngine';
import PricingSection from '@/components/PricingSection';
import ScheduleSection from '@/components/ScheduleSection';
import WomensSanctuary from '@/components/WomensSanctuary';
import Disciplines from '@/components/Disciplines';
import CoachSection from '@/components/CoachSection';
import PanoramaViewer from '@/components/PanoramaViewer';
import ReviewsSection from '@/components/ReviewsSection';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import MobileStickyBar from '@/components/MobileStickyBar';
import OfficialPostersModal from '@/components/OfficialPostersModal';

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

      {/* Real-Time Facility Activity Engine (Live open/closed, Women vs Men session) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20 mb-8 sm:mb-12">
        <LiveStatusEngine lang={lang} />
      </div>

      {/* Fast Mobile Action Anchors (Allows mobile visitors to jump directly without scroll fatigue) */}
      <div className="block sm:hidden px-4 py-3 bg-[#0E0F13] border-y border-adrena-border overflow-x-auto scrollbar-none mb-4">
        <div className="flex items-center gap-2 text-xs font-bold font-display uppercase tracking-wider text-adrena-bone w-max">
          <a
            href="#tarifs"
            className="px-3.5 py-2 rounded-xl bg-adrena-gold text-[#111215] shadow-sm flex items-center gap-1.5"
          >
            <span>⚡ {lang === 'fr' ? 'Tarifs dès 3 000 DA' : 'الأسعار من 3 000 دج'}</span>
          </a>
          <a
            href="#planning"
            className="px-3.5 py-2 rounded-xl bg-adrena-card border border-adrena-border text-adrena-bone"
          >
            <span>📅 {lang === 'fr' ? 'Plannings 2026' : 'المواقيت والحصص'}</span>
          </a>
          <a
            href="#femmes"
            className="px-3.5 py-2 rounded-xl bg-adrena-card border border-adrena-border text-adrena-bone"
          >
            <span>🌸 {lang === 'fr' ? 'Espace Femmes' : 'فضاء النساء'}</span>
          </a>
          <a
            href="#contact"
            className="px-3.5 py-2 rounded-xl bg-adrena-card border border-adrena-border text-adrena-bone"
          >
            <span>📍 {lang === 'fr' ? 'Accès CUB1' : 'الموقع والوصول'}</span>
          </a>
          <a
            href="#tour-360"
            className="px-3.5 py-2 rounded-xl bg-adrena-card border border-adrena-border text-adrena-bone"
          >
            <span>🔄 {lang === 'fr' ? 'Visite 360°' : 'جولة 360°'}</span>
          </a>
        </div>
      </div>

      {/* 1. Pricing & Custom Formula Calculator (Moved UP for immediate purchase clarity) */}
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
