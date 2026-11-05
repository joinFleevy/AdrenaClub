'use client';

import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Navigation, Instagram, Facebook } from 'lucide-react';
import { Language, content } from '@/data/content';

interface ContactSectionProps {
  lang: Language;
}

export default function ContactSection({ lang }: ContactSectionProps) {
  const t = content[lang].contact;
  const isAr = lang === 'ar';

  return (
    <section id="contact" className="py-20 sm:py-28 lg:py-32 scroll-mt-28 relative bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs sm:text-sm font-extrabold text-amber-800 uppercase tracking-wider block mb-2">
            {isAr ? 'موقع النادي ووسائل الاتصال' : 'Localisation & Contact'}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            {t.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-[65ch] leading-relaxed font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm text-slate-900">
              <div className="space-y-6 text-sm">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0 text-amber-800 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 block">
                      {t.addressLabel}
                    </span>
                    <span className="font-bold text-slate-900 mt-0.5 block">{t.addressValue}</span>
                  </div>
                </div>

                {/* Phones */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0 text-amber-800 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 block">
                      {t.phoneLabel}
                    </span>
                    <div className="flex flex-col gap-1 mt-0.5 font-mono tabular-nums font-bold text-amber-700 text-base">
                      <a href="tel:+213771570378" className="hover:underline">
                        0771 57 03 78
                      </a>
                      <a href="tel:+213719925474" className="hover:underline text-slate-700">
                        0719 92 54 74
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0 text-amber-800 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 block">
                      {t.emailLabel}
                    </span>
                    <a
                      href="mailto:1adrenaclub@gmail.com"
                      className="font-bold text-slate-900 hover:text-amber-600 transition-colors mt-0.5 block"
                    >
                      {t.emailValue}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0 text-amber-800 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 block">
                      {t.hoursLabel}
                    </span>
                    <span className="font-bold text-slate-900 mt-0.5 block">{t.hoursValue}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col gap-3">
                <a
                  href="https://wa.me/213771570378"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-black text-white font-black uppercase text-xs tracking-wider transition-all shadow-md active:scale-98"
                >
                  <MessageCircle className="w-4 h-4 text-amber-400 fill-current" />
                  <span>{t.whatsappChat}</span>
                </a>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="tel:+213771570378"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-600" />
                    <span>{t.callNow}</span>
                  </a>
                  <a
                    href="https://maps.app.goo.gl/6YJepRtyWvXcrZoV9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    <Navigation className="w-3.5 h-3.5 text-amber-600" />
                    <span>{t.getDirections}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-around shadow-sm">
              <a
                href="https://www.instagram.com/adrena.club/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-pink-600 transition-colors"
              >
                <Instagram className="w-4 h-4 text-pink-600" />
                <span>Instagram</span>
              </a>
              <span className="text-slate-300">|</span>
              <a
                href="https://www.facebook.com/clubadrena/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors"
              >
                <Facebook className="w-4 h-4 text-blue-600" />
                <span>Facebook</span>
              </a>
              <span className="text-slate-300">|</span>
              <a
                href="https://www.tiktok.com/@adrena.club"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors"
              >
                <span className="font-mono text-sm text-amber-600 font-black">#</span>
                <span>TikTok</span>
              </a>
            </div>
          </div>

          {/* Right Column: Embedded Map */}
          <div className="lg:col-span-7 h-[420px] lg:h-[500px] rounded-2xl border border-slate-200 overflow-hidden bg-white relative shadow-md">
            <iframe
              title="Adrena Club Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.639472447947!2d3.183158076629731!3d36.73121907226685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128e510838572915%3A0x98c81818d117e070!2sAdr%C3%A9na%20club!5e0!3m2!1sfr!2sdz!4v1713000000000!5m2!1sfr!2sdz"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
