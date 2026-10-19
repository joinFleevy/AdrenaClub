'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Download, ZoomIn } from 'lucide-react';
import { Language } from '@/data/content';

interface OfficialPostersModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPoster?: string;
  lang: Language;
}

const posters = [
  {
    id: 'tarifs',
    titleFr: 'Grille Officielle des Tarifs 2026',
    titleAr: 'قائمة الأسعار الرسمية 2026',
    src: '/images/posters/tarifs_officiels.jpg',
  },
  {
    id: 'hommes',
    titleFr: 'Planning Hommes — Musculation (06:00 - 00:00)',
    titleAr: 'مخطط كمال الأجسام للرجال (06:00 - 00:00)',
    src: '/images/posters/planning_hommes_muscu.jpg',
  },
  {
    id: 'combat',
    titleFr: 'Planning Hommes — Combat & CrossTraining',
    titleAr: 'مخطط فنون القتال والكروس ترينينغ للرجال',
    src: '/images/posters/planning_hommes_combat.jpg',
  },
  {
    id: 'femmes',
    titleFr: 'Planning Femmes — 100% Privé & Sans Musique',
    titleAr: 'مخطط النساء — خصوصية تامة وبدون موسيقى',
    src: '/images/posters/planning_femmes.jpg',
  },
  {
    id: 'enfants',
    titleFr: 'Planning Enfants — Judo, Kickboxing, Lutte',
    titleAr: 'مخطط الأطفال — جودو، كيك بوكسينغ، ومصارعة',
    src: '/images/posters/planning_enfants.jpg',
  },
];

export default function OfficialPostersModal({
  isOpen,
  onClose,
  initialPoster = 'tarifs',
  lang,
}: OfficialPostersModalProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    const idx = posters.findIndex((p) => p.id === initialPoster);
    return idx !== -1 ? idx : 0;
  });

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : posters.length - 1));
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev < posters.length - 1 ? prev + 1 : 0));
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentPoster = posters[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : posters.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev < posters.length - 1 ? prev + 1 : 0));
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={lang === 'fr' ? currentPoster.titleFr : currentPoster.titleAr}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full bg-adrena-card border border-adrena-border rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-adrena-dark">
          <div>
            <h3 className="font-display text-base sm:text-xl font-black text-white uppercase tracking-wide">
              {lang === 'fr' ? currentPoster.titleFr : currentPoster.titleAr}
            </h3>
            <span className="font-display text-xs text-neutral-400 font-bold tabular-nums">
              {currentIndex + 1} / {posters.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={currentPoster.src}
              download
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
              title="Télécharger l'affiche"
            >
              <Download className="w-5 h-5" />
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Poster Image Area */}
        <div className="relative flex-1 min-h-[380px] sm:min-h-[520px] bg-black flex items-center justify-center p-2 overflow-auto">
          <div className="relative w-full h-[380px] sm:h-[520px]">
            <Image
              src={currentPoster.src}
              alt={lang === 'fr' ? currentPoster.titleFr : currentPoster.titleAr}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-contain"
              priority
            />
          </div>

          {/* Nav arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-adrena-gold text-white hover:text-black transition-all border border-white/10"
            aria-label={lang === 'fr' ? 'Précédent' : 'السابق'}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-adrena-gold text-white hover:text-black transition-all border border-white/10"
            aria-label={lang === 'fr' ? 'Suivant' : 'التالي'}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Bottom Thumbnails Strip */}
        <div className="px-4 py-3 bg-adrena-dark border-t border-white/10 flex items-center justify-center gap-2 overflow-x-auto">
          {posters.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                currentIndex === idx
                  ? 'border-adrena-gold scale-105'
                  : 'border-white/10 opacity-50 hover:opacity-100'
              }`}
            >
              <Image src={p.src} alt={lang === 'fr' ? p.titleFr : p.titleAr} fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
