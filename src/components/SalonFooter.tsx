import React from 'react';
import { Sparkles, MapPin, Phone, Mail, ArrowUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const SalonFooter: React.FC = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-stone-900 bg-stone-950 text-stone-300 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        
        {/* Brand Col */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-amber-400/40 bg-stone-900 flex items-center justify-center text-amber-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-serif tracking-widest text-lg font-light text-stone-100 uppercase">
              {t.brandName}
            </span>
          </div>
          <p className="text-xs text-stone-400 font-light leading-relaxed">
            {t.footerDesc}
          </p>
        </div>

        {/* Location & Contact */}
        <div className="space-y-3 text-xs font-light">
          <h4 className="font-display font-medium text-stone-100 uppercase tracking-wider text-xs">
            {t.sanctuaryAddressTitle}
          </h4>
          <div className="flex items-start gap-2 text-stone-400">
            <MapPin className="w-4 h-4 text-amber-400/80 shrink-0 mt-0.5" />
            <span>{t.sanctuaryAddress}</span>
          </div>
          <div className="flex items-center gap-2 text-stone-400">
            <Phone className="w-4 h-4 text-amber-400/80 shrink-0" />
            <span dir="ltr">{t.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-stone-400">
            <Mail className="w-4 h-4 text-amber-400/80 shrink-0" />
            <span dir="ltr">{t.email}</span>
          </div>
        </div>

        {/* Atelier Hours */}
        <div className="space-y-3 text-xs font-light">
          <h4 className="font-display font-medium text-stone-100 uppercase tracking-wider text-xs">
            {t.hoursTitle}
          </h4>
          <div className="space-y-2 text-[11px] text-stone-400 font-sans">
            <div className="flex justify-between items-center">
              <span>{t.tueFri}</span>
              <span className="text-stone-200">{t.tueFriHours}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>{t.sat}</span>
              <span className="text-stone-200">{t.satHours}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>{t.mon}</span>
              <span className="text-amber-400/80">{t.monHours}</span>
            </div>
          </div>
        </div>

        {/* Back to top & Newsletter */}
        <div className="space-y-4">
          <h4 className="font-display font-medium text-stone-100 uppercase tracking-wider text-xs">
            {t.newsletterTitle}
          </h4>
          <p className="text-xs text-stone-400 font-light">
            {t.newsletterDesc}
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder={t.newsletterPlaceholder}
              className="bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-400 flex-1"
            />
            <button className="px-3 py-2 bg-amber-400 text-stone-950 text-xs font-semibold rounded-lg hover:bg-amber-300 transition-colors">
              {t.newsletterBtn}
            </button>
          </div>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-xs text-amber-300 hover:text-amber-200 transition-colors pt-2"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>{t.returnToHero}</span>
          </button>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500 font-sans">
        <div>
          {t.copyright}
        </div>
        <div className="flex items-center gap-6">
          <span className="hover:text-stone-400 cursor-pointer">{t.privacy}</span>
          <span className="hover:text-stone-400 cursor-pointer">{t.terms}</span>
          <span className="hover:text-stone-400 cursor-pointer">{t.accessibility}</span>
        </div>
      </div>
    </footer>
  );
};
