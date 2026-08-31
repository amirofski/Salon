import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, Volume2, VolumeX, Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SalonNavbarProps {
  onOpenBooking: () => void;
  isAmbiencePlaying: boolean;
  onToggleAmbience: () => void;
}

export const SalonNavbar: React.FC<SalonNavbarProps> = ({
  onOpenBooking,
  isAmbiencePlaying,
  onToggleAmbience,
}) => {
  const { language, toggleLanguage, t } = useLanguage();
  const [scrolledPastHero, setScrolledPastHero] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById('cinematic-hero-section');
      if (heroEl) {
        const heroBottom = heroEl.getBoundingClientRect().bottom;
        setScrolledPastHero(heroBottom < 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolledPastHero
            ? 'bg-stone-950/90 backdrop-blur-md border-b border-stone-800 py-3 shadow-lg'
            : 'bg-transparent py-4 opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 cursor-pointer pointer-events-auto"
          >
            <div className="w-8 h-8 rounded-full border border-amber-400/40 bg-stone-900 flex items-center justify-center text-amber-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-serif tracking-widest text-lg font-light text-stone-100 uppercase">
              {t.brandName}
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-7 text-xs font-sans font-medium tracking-wider uppercase text-stone-300 pointer-events-auto">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-amber-300 transition-colors"
            >
              {t.navHero}
            </button>
            <button 
              onClick={() => scrollToSection('philosophy-section')}
              className="hover:text-amber-300 transition-colors"
            >
              {t.navArchitecture}
            </button>
            <button 
              onClick={() => scrollToSection('services-section')}
              className="hover:text-amber-300 transition-colors"
            >
              {t.navTreatments}
            </button>
            <button 
              onClick={() => scrollToSection('team-section')}
              className="hover:text-amber-300 transition-colors"
            >
              {t.navArtisans}
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2.5 pointer-events-auto">
            {/* Language Switcher Button */}
            <button
              onClick={toggleLanguage}
              title={language === 'fa' ? 'Switch to English' : 'تغییر به زبان فارسی'}
              className="px-2.5 py-1.5 rounded-full border border-stone-800 bg-stone-900 text-stone-300 hover:text-amber-300 hover:border-amber-400/40 transition-all text-xs flex items-center gap-1.5"
            >
              <Languages className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold text-[11px] uppercase tracking-wider">
                {language === 'fa' ? 'EN' : 'فارسی'}
              </span>
            </button>

            {/* Ambience Audio Toggle */}
            <button
              onClick={onToggleAmbience}
              title={t.ambienceTitle}
              className={`p-2 rounded-full border transition-all text-xs flex items-center ${
                isAmbiencePlaying 
                  ? 'bg-amber-400/20 text-amber-200 border-amber-400/40' 
                  : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-200'
              }`}
            >
              {isAmbiencePlaying ? <Volume2 className="w-4 h-4 text-amber-300" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Booking CTA */}
            <button
              onClick={onOpenBooking}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-semibold text-xs tracking-wider transition-all shadow-sm"
            >
              {t.reserveBtn}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-stone-400 hover:text-stone-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-stone-950/95 border-b border-stone-800 px-6 py-4 space-y-3 text-sm">
            <button 
              onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }}
              className="block w-full text-start py-1.5 text-stone-300 hover:text-amber-300"
            >
              {t.navHero}
            </button>
            <button 
              onClick={() => scrollToSection('philosophy-section')}
              className="block w-full text-start py-1.5 text-stone-300 hover:text-amber-300"
            >
              {t.navArchitecture}
            </button>
            <button 
              onClick={() => scrollToSection('services-section')}
              className="block w-full text-start py-1.5 text-stone-300 hover:text-amber-300"
            >
              {t.navTreatments}
            </button>
            <button 
              onClick={() => scrollToSection('team-section')}
              className="block w-full text-start py-1.5 text-stone-300 hover:text-amber-300"
            >
              {t.navArtisans}
            </button>
          </div>
        )}
      </nav>
    </>
  );
};
