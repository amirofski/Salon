import React, { useState } from 'react';
import { SALON_SERVICES } from '../data/salonData';
import { SalonService } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Clock, ArrowRight, ArrowLeft } from 'lucide-react';

interface SalonServicesProps {
  onSelectService: (service: SalonService) => void;
}

export const SalonServices: React.FC<SalonServicesProps> = ({ onSelectService }) => {
  const { language, t, isRtl } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'all' | 'color' | 'cut' | 'ritual' | 'spa'>('all');

  const filteredServices = activeCategory === 'all'
    ? SALON_SERVICES
    : SALON_SERVICES.filter(s => s.category === activeCategory);

  const categories = [
    { id: 'all', label: t.allCategories },
    { id: 'color', label: t.colorCategory },
    { id: 'cut', label: t.cutCategory },
    { id: 'ritual', label: t.ritualCategory },
    { id: 'spa', label: t.spaCategory },
  ];

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section 
      id="services-section"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-stone-900"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">
            {t.servicesTag}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-100 font-light mt-2">
            {t.servicesHeading}
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-stone-900/80 rounded-xl border border-stone-800 self-start md:self-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-sans transition-all ${
                activeCategory === cat.id
                  ? 'bg-amber-400 text-stone-950 font-semibold shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="glass-panel-subtle rounded-2xl p-6 border border-stone-800/80 hover:border-amber-400/40 transition-all flex flex-col justify-between group relative"
          >
            <div>
              {/* Highlight Badge */}
              {service.highlight && (
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[10px] font-mono uppercase tracking-wider mb-4">
                  <Sparkles className="w-3 h-3" />
                  <span>{service.highlight[language]}</span>
                </div>
              )}

              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="font-display font-medium text-lg text-stone-100 group-hover:text-amber-200 transition-colors">
                  {service.name[language]}
                </h3>
                <span className="font-mono text-sm font-semibold text-amber-300 whitespace-nowrap">
                  {service.price[language]}
                </span>
              </div>

              <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed mb-6">
                {service.description[language]}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-stone-800/60">
              <div className="flex items-center gap-1.5 text-xs text-stone-400 font-mono">
                <Clock className="w-3.5 h-3.5 text-amber-400/80" />
                <span>{service.duration[language]}</span>
              </div>

              <button
                onClick={() => onSelectService(service)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-300 hover:text-amber-200 group-hover:translate-x-0.5 transition-all"
              >
                <span>{t.reserveTreatment}</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
