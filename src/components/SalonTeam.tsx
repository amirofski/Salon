import React from 'react';
import { SALON_ARTISANS } from '../data/salonData';
import { useLanguage } from '../context/LanguageContext';

export const SalonTeam: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <section 
      id="team-section"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-stone-900"
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">
          {t.teamTag}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-100 font-light mt-3 mb-6">
          {t.teamHeading}
        </h2>
        <p className="text-stone-400 text-sm sm:text-base leading-relaxed font-light">
          {t.teamDesc}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SALON_ARTISANS.map((artisan, idx) => (
          <div 
            key={idx}
            className="glass-panel-subtle rounded-2xl p-6 border border-stone-800 hover:border-amber-400/30 transition-all text-center flex flex-col items-center group"
          >
            {/* Monogram / Avatar badge */}
            <div className="w-20 h-20 rounded-full border-2 border-amber-400/30 bg-stone-900 flex items-center justify-center text-amber-300 font-serif text-2xl font-light mb-5 shadow-lg group-hover:scale-105 transition-transform">
              {artisan.avatarText}
            </div>

            <h3 className="font-display font-semibold text-lg text-stone-100 mb-1">
              {artisan.name[language]}
            </h3>

            <p className="text-xs font-sans text-amber-400/90 tracking-wider mb-4">
              {artisan.role[language]}
            </p>

            <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed mb-6">
              {artisan.bio[language]}
            </p>

            <div className="mt-auto w-full pt-4 border-t border-stone-800/80 flex items-center justify-between text-[11px] font-sans text-stone-400">
              <span className="text-amber-300/90 font-medium">{artisan.specialty[language]}</span>
              <span>{artisan.experience[language]}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
