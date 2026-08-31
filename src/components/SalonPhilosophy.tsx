import React from 'react';
import { PHILOSOPHY_PILLARS } from '../data/salonData';
import { useLanguage } from '../context/LanguageContext';

export const SalonPhilosophy: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <section 
      id="philosophy-section"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-stone-900"
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">
          {t.philosophyTag}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-100 font-light mt-3 mb-6">
          {t.philosophyHeading}
        </h2>
        <p className="text-stone-400 text-sm sm:text-base leading-relaxed font-light">
          {t.philosophyDesc}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PHILOSOPHY_PILLARS.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div 
              key={idx}
              className="glass-panel-subtle rounded-xl p-6 border border-stone-800/80 hover:border-amber-400/30 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-lg bg-stone-900 border border-stone-800 group-hover:border-amber-400/40 text-amber-400 flex items-center justify-center mb-4 transition-colors">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-display font-medium text-base text-stone-100 mb-2">
                {pillar.title[language]}
              </h3>
              <p className="text-stone-400 text-xs sm:text-sm leading-relaxed font-light">
                {pillar.desc[language]}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
