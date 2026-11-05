'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
  MessageCircle,
  ArrowDown,
  MapPin,
  Clock,
  Play,
  Pause,
  Star,
  Dumbbell,
  Video,
  Compass,
} from 'lucide-react';
import { Language } from '@/data/content';

interface HeroProps {
  lang: Language;
  onOpen360?: () => void;
}

export default function Hero({ lang, onOpen360 }: HeroProps) {
  const isAr = lang === 'ar';
  const [activeMedia, setActiveMedia] = useState<'video' | 'photo'>('video');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section id="accueil" className="relative pt-24 pb-16 sm:pt-36 sm:pb-24 bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Human Athletic Statement */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Athletic Grounded Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-100/80 border border-amber-300 text-amber-950 text-xs sm:text-sm font-black uppercase tracking-wider mb-5 self-start">
              <span>{isAr ? 'باب الزوار (CUB1) • مركب رياضي على طابقين' : 'Bab Ezzouar (CUB1) • Complexe Sportif sur 2 Niveaux'}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.08] mb-5">
              <span>{isAr ? 'نادي رياضي حقيقي في باب الزوار.' : 'VOTRE SALLE DE SPORT À BAB EZZOUAR.'}</span>
              <span className="block text-amber-500 mt-1.5 text-2xl sm:text-4xl lg:text-5xl font-black">
                {isAr ? 'كمال أجسام، فنون قتالية وفضاء نسائي خاص.' : 'Musculation, Sports de Combat & Espace Femmes.'}
              </span>
            </h1>

            {/* Subtitle with Warm Human Tone */}
            <p className="text-base sm:text-lg text-slate-600 max-w-[54ch] leading-relaxed mb-7 font-medium">
              {isAr
                ? 'أجهزة كمال أجسام متطورة وأوزان حرة، حلبة ملاكمة وبساط نزال معتمد (كيك بوكسينغ، جودو، مصارعة)، وقاعة مستقلة 100% للنساء مع حصص بدون موسيقى. بإشراف مدربين ذوي بطولات وخبرة.'
                : 'Plateau musculation complet, ring de boxe officiel, tatami d\'arts martiaux et espace 100% femmes avec créneaux calmes sans musique. Ouvert 7j/7 jusqu\'à minuit sous l\'encadrement de coachs diplômés.'}
            </p>

            {/* Direct High-Contrast Action Pair */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <a
                href="https://wa.me/213771570378?text=Bonjour%20Adrena%20Club,%20je%20souhaite%20m'inscrire."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-slate-900 hover:bg-black text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-xl active:scale-[0.98] cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-amber-400 fill-current flex-shrink-0" />
                <span>{isAr ? 'سجل عبر واتساب مباشرة' : 'S\'inscrire via WhatsApp'}</span>
              </a>

              <a
                href="#tarifs"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 hover:border-slate-400 font-bold text-xs sm:text-sm transition-all shadow-sm active:scale-[0.98] cursor-pointer"
              >
                <span>{isAr ? 'الأسعار والبرنامج' : 'Voir les Tarifs & Planning'}</span>
                <ArrowDown className="w-4 h-4 text-slate-700 flex-shrink-0" />
              </a>

              {onOpen360 && (
                <button
                  type="button"
                  onClick={onOpen360}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3.5 sm:py-4 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-amber-600" />
                  <span>{isAr ? 'جولة 360°' : 'Visite 360°'}</span>
                </button>
              )}
            </div>

            {/* Human Proof Bar */}
            <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-600 font-semibold">
              <span className="flex items-center gap-1.5 text-slate-900">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500 flex-shrink-0" />
                <span>{isAr ? 'تقييم 4.9/5 على Google (+160 مشترك)' : '4.9/5 sur Google (+160 avis membres)'}</span>
              </span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5 text-slate-700">
                <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>Bab Ezzouar (CUB1)</span>
              </span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5 text-slate-700">
                <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>{isAr ? 'مفتوح حتى 00:00 (رجال)' : 'Jusqu\'à 00:00 (Hommes)'}</span>
              </span>
            </div>
          </div>

          {/* Right Column: Live Club Action Showcase (Video & Photo) */}
          <div className="lg:col-span-5 w-full">
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 shadow-2xl relative">
              
              {/* Media Mode Tabs */}
              <div className="flex items-center border-b border-slate-800 bg-slate-900 p-1.5 gap-1.5 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setActiveMedia('video')}
                  className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    activeMedia === 'video'
                      ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>{isAr ? 'فيديو من القاعة' : 'Vidéo en direct'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveMedia('photo')}
                  className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    activeMedia === 'photo'
                      ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Dumbbell className="w-3.5 h-3.5" />
                  <span>{isAr ? 'صورة القاعة' : 'Plateau musculation'}</span>
                </button>
              </div>

              {/* Viewport: Video or Photo */}
              <div className="relative aspect-[4/5] sm:aspect-[4/4] lg:aspect-[4/5] w-full bg-black overflow-hidden flex items-center justify-center">
                {activeMedia === 'video' ? (
                  <>
                    <video
                      ref={videoRef}
                      src="/videos/adrena-training.mp4"
                      poster="/images/video-poster.jpg"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />

                    {/* Gradient overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

                    {/* Video Player Floating Controls */}
                    <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
                      <button
                        type="button"
                        onClick={togglePlay}
                        className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-sm"
                        aria-label={isPlaying ? 'Pause' : 'Lire'}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                      </button>
                    </div>

                    {/* Bottom Video Badge */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white z-10">
                      <div className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                        <span className="font-bold text-amber-400">
                          {isAr ? 'أجواء التمرين والنزال بالبساط' : 'Tatami & Combat en action'}
                        </span>
                        <span className="block text-[11px] text-slate-300">
                          {isAr ? 'الكوتش حميمد وعبد الله مع الأبطال' : 'Coach Hmimed & Abdellah'}
                        </span>
                      </div>

                      {onOpen360 && (
                        <button
                          type="button"
                          onClick={onOpen360}
                          className="font-bold text-amber-400 hover:text-white bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 cursor-pointer flex items-center gap-1.5"
                        >
                          <Compass className="w-3.5 h-3.5" />
                          <span>{isAr ? 'جولة 360°' : 'Visite 360°'}</span>
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <Image
                      src="/images/hero/hero-gym-floor.jpg"
                      alt="Plateau Musculation Adrena Club Bab Ezzouar"
                      fill
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover object-center"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white z-10">
                      <span className="font-semibold bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                        {isAr ? 'كمال أجسام، أوزان حرة وحلبة' : 'Plateau Musculation & Ring'}
                      </span>
                      {onOpen360 && (
                        <button
                          type="button"
                          onClick={onOpen360}
                          className="font-bold text-amber-400 hover:text-white bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 cursor-pointer flex items-center gap-1.5"
                        >
                          <Compass className="w-3.5 h-3.5" />
                          <span>{isAr ? 'جولة 360°' : 'Visite 360°'}</span>
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
