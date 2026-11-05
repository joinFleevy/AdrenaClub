'use client';

import React, { useState, useEffect } from 'react';
import { Language } from '@/data/content';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import LiveStatusEngine from '@/components/LiveStatusEngine';
import PricingSection from '@/components/PricingSection';
import ScheduleSection from '@/components/ScheduleSection';
import WomensSanctuary from '@/components/WomensSanctuary';
import ReviewsSection from '@/components/ReviewsSection';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import MobileStickyBar from '@/components/MobileStickyBar';
import OfficialPostersModal from '@/components/OfficialPostersModal';
import Tour360Modal from '@/components/Tour360Modal';

export default function Home() {
  const [lang, setLang] = useState<Language>('fr');
  const [isPostersModalOpen, setIsPostersModalOpen] = useState<boolean>(false);
  const [activePosterId, setActivePosterId] = useState<string>('tarifs');
  const [is360ModalOpen, setIs360ModalOpen] = useState<boolean>(false);

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
      className="min-h-screen bg-slate-50 text-slate-900 pb-20 md:pb-0 font-sans"
    >
      {/* Navigation */}
      <Navbar
        lang={lang}
        onToggleLang={handleToggleLang}
        onOpen360={() => setIs360ModalOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        lang={lang}
        onOpen360={() => setIs360ModalOpen(true)}
      />

      {/* Real-time Gym Operational Status Strip */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <LiveStatusEngine lang={lang} />
      </section>

      {/* 1. Official Pricing & Formules */}
      <PricingSection lang={lang} onOpenPostersModal={handleOpenPostersModal} />

      {/* 2. Interactive Schedules 2026 */}
      <ScheduleSection lang={lang} onOpenPostersModal={handleOpenPostersModal} />

      {/* 3. Women's Sanctuary Spotlight (100% private, zero music) */}
      <WomensSanctuary lang={lang} />

      {/* 4. Social Proof & Google Reviews (160+ verified reviews & coach trust) */}
      <ReviewsSection lang={lang} />

      {/* 5. Objection-Busting FAQ (Cash payment, trial session, documents needed) */}
      <FAQSection lang={lang} />

      {/* 6. Location & Contact Section (Google Maps, hours, phone) */}
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

      {/* On-Demand Interactive 360° Virtual Tour Modal */}
      <Tour360Modal
        isOpen={is360ModalOpen}
        onClose={() => setIs360ModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
