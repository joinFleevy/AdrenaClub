'use client';

import React from 'react';
import Image from 'next/image';
import { Instagram, Facebook, MapPin, Phone, Mail, Heart } from 'lucide-react';
import { Language, content } from '@/data/content';

interface FooterProps {
  lang: Language;
}

export default function Footer({ lang }: FooterProps) {
  const t = content[lang];

  return (
    <footer className="bg-[#0D0E11] border-t border-adrena-border text-adrena-stone text-sm pb-24 md:pb-12 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Slogan */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image src="/logo.png" alt="Adrena Club Logo" fill sizes="40px" className="object-contain" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-display text-2xl font-black text-adrena-bone tracking-widest uppercase">ADRENA</span>
                <span className="font-display text-2xl font-black text-adrena-gold tracking-widest uppercase">CLUB</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-adrena-stone leading-relaxed max-w-[38ch]">
              {lang === 'fr'
                ? 'Complexe sportif haut de gamme sur 2 étages à Bab Ezzouar. Musculation, CrossTraining, Sports de Combat, Sauna & Espace 100% femmes.'
                : 'مجمع رياضي متكامل على طابقين في باب الزوار. كمال أجسام، كروس ترينينغ، رياضات قتالية، ساونا وفترات خاصة للنساء.'}
            </p>

            <div className="p-3.5 rounded-xl bg-adrena-card border border-adrena-border text-xs italic text-adrena-gold font-medium leading-relaxed">
              {t.hero.motto}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-display text-xs font-black text-adrena-bone uppercase tracking-wider mb-4">
              {lang === 'fr' ? 'Navigation' : 'روابط سريعة'}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-adrena-stone">
              <li>
                <a href="#accueil" className="hover:text-adrena-gold transition-colors">
                  {t.nav.home}
                </a>
              </li>
              <li>
                <a href="#tour-360" className="hover:text-adrena-gold transition-colors">
                  {t.nav.tour360}
                </a>
              </li>
              <li>
                <a href="#activites" className="hover:text-adrena-gold transition-colors">
                  {t.nav.disciplines}
                </a>
              </li>
              <li>
                <a href="#planning" className="hover:text-adrena-gold transition-colors">
                  {t.nav.planning}
                </a>
              </li>
              <li>
                <a href="#tarifs" className="hover:text-adrena-gold transition-colors">
                  {t.nav.tarifs}
                </a>
              </li>
              <li>
                <a href="#avis" className="hover:text-adrena-gold transition-colors">
                  {t.nav.reviews}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-adrena-gold transition-colors">
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Disciplines */}
          <div>
            <h4 className="font-display text-xs font-black text-adrena-bone uppercase tracking-wider mb-4">
              {lang === 'fr' ? 'Activités du Club' : 'الأنشطة المتاحة'}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-adrena-stone">
              {lang === 'fr' ? (
                <>
                  <li>• Musculation & Plateau Force</li>
                  <li>• CrossTraining & WODs</li>
                  <li>• Kickboxing (Hommes & Femmes)</li>
                  <li>• Lutte Olympique & Combat</li>
                  <li>• Académie Judo & Boxe Enfants</li>
                  <li>• Sauna & Récupération</li>
                  <li>• Suivi Nutritionnel Personnalisé</li>
                </>
              ) : (
                <>
                  <li>• كمال الأجسام وقاعة الأوزان</li>
                  <li>• كروس ترينينغ ولياقة بدنية</li>
                  <li>• كيك بوكسينغ (رجال ونساء)</li>
                  <li>• مصارعة أولمبية وفنون قتالية</li>
                  <li>• أكاديمية جودو وملاكمة للأطفال</li>
                  <li>• ساونا واسترجاع عضلي</li>
                  <li>• متابعة غذائية مخصصة</li>
                </>
              )}
            </ul>
          </div>

          {/* Col 4: Contact & Social */}
          <div>
            <h4 className="font-display text-xs font-black text-adrena-bone uppercase tracking-wider mb-4">
              {lang === 'fr' ? 'Contact & Réseaux' : 'التواصل والشبكات'}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm mb-6">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-adrena-gold flex-shrink-0" />
                <span>Bab Ezzouar (CUB1), Alger</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-adrena-gold flex-shrink-0" />
                <a href="tel:+213771570378" className="hover:text-adrena-gold font-mono tabular-nums font-bold">
                  0771 57 03 78
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-adrena-gold flex-shrink-0" />
                <span>1adrenaclub@gmail.com</span>
              </li>
            </ul>

            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/adrena.club/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-pink-500 hover:text-white border border-white/10 flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/clubadrena/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-blue-600 hover:text-white border border-white/10 flex items-center justify-center transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.tiktok.com/@adrena.club"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white hover:text-black border border-white/10 flex items-center justify-center transition-all font-mono font-bold text-xs"
                aria-label="TikTok"
              >
                #
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 text-center sm:text-left rtl:sm:text-right">
          <p>
            {lang === 'fr'
              ? `© ${new Date().getFullYear()} Adréna Club Bab Ezzouar. Tous droits réservés.`
              : `© ${new Date().getFullYear()} نادي أدرينا كلوب باب الزوار. جميع الحقوق محفوظة.`}
          </p>
          <p className="flex items-center gap-1 justify-center">
            <span>
              {lang === 'fr'
                ? 'Conçu pour la haute performance sportive'
                : 'مُصمم للأداء الرياضي العالي والنزاهة الرياضية'}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
