'use client';

import React, { useState, useEffect } from 'react';
import { Language } from '@/data/content';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PanoramaViewer from '@/components/PanoramaViewer';
import Disciplines from '@/components/Disciplines';
import WomensSanctuary from '@/components/WomensSanctuary';
import CoachSection from '@/components/CoachSection';
import ScheduleSection from '@/components/ScheduleSection';
import PricingSection from '@/components/PricingSection';
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
      className={`min-h-screen bg-adrena-black text-white ${
        isRtl ? 'font-sans' : 'font-sans'
      }`}
    >
      {/* Navigation */}
      <Navbar lang={lang} onToggleLang={handleToggleLang} />

      {/* Hero Section */}
      <Hero lang={lang} />

      {/* 360 Interactive Virtual Tour */}
      <PanoramaViewer lang={lang} />

      {/* Disciplines & Programs */}
      <Disciplines lang={lang} />

      {/* Women's Sanctuary Spotlight */}
      <WomensSanctuary lang={lang} />

      {/* Coach Profiles & Expertise */}
      <CoachSection lang={lang} />

      {/* Interactive Schedules & Class Finder */}
      <ScheduleSection lang={lang} onOpenPostersModal={handleOpenPostersModal} />

      {/* Interactive Pricing & Custom Formula Calculator */}
      <PricingSection lang={lang} onOpenPostersModal={handleOpenPostersModal} />

      {/* Social Proof & Google Reviews */}
      <ReviewsSection lang={lang} />

      {/* Objection-Busting FAQ Accordion */}
      <FAQSection lang={lang} />

      {/* Location & Contact Section */}
      <ContactSection lang={lang} />

      {/* Footer */}
      <Footer lang={lang} />

      {/* Mobile Sticky CTA Bar */}
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
