'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { X, ExternalLink, Compass } from 'lucide-react';
import { Language, content } from '@/data/content';

const PanoramaViewer = dynamic(() => import('@/components/PanoramaViewer'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] sm:h-[550px] bg-slate-900/80 rounded-2xl border border-slate-800 flex flex-col items-center justify-center gap-3 animate-pulse text-slate-300 text-sm">
      <div className="w-8 h-8 rounded-full border-2 border-adrena-gold border-t-transparent animate-spin" />
      <span>Chargement de la visite 360°...</span>
    </div>
  ),
});

interface Tour360ModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export default function Tour360Modal({ isOpen, onClose, lang }: Tour360ModalProps) {
  const isAr = lang === 'ar';
  const t = content[lang].tour360;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-4 md:p-6 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={t.title}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        dir={isAr ? 'rtl' : 'ltr'}
        className="relative max-w-5xl w-full bg-slate-950 border border-slate-800 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[95vh]"
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-3.5 sm:px-6 py-3 sm:py-3.5 border-b border-slate-800 bg-slate-900/95 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-800/90 border border-slate-700/80 flex items-center justify-center text-adrena-gold flex-shrink-0 shadow-sm">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                {t.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400 hidden sm:block">
                {t.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://maps.app.goo.gl/6YJepRtyWvXcrZoV9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold transition-all shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5 text-adrena-gold" />
              <span className="hidden sm:inline">{t.googleMapsBtn}</span>
              <span className="sm:hidden">Google Maps</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
              aria-label={isAr ? 'إغلاق' : 'Fermer'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Viewer Body */}
        <div className="p-2.5 sm:p-4 overflow-y-auto">
          <PanoramaViewer lang={lang} isModal={true} />
        </div>
      </div>
    </div>
  );
}
