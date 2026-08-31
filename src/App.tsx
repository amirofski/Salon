import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { CinematicHero } from './components/CinematicHero';
import { SalonNavbar } from './components/SalonNavbar';
import { SalonPhilosophy } from './components/SalonPhilosophy';
import { SalonServices } from './components/SalonServices';
import { SalonTeam } from './components/SalonTeam';
import { SalonFooter } from './components/SalonFooter';
import { SalonBookingModal } from './components/SalonBookingModal';
import { VideoScrubberConfig, SalonService } from './types';
import { toggleAudioAmbience } from './utils/audioAmbience';

function SalonAppContent() {
  const [config] = useState<VideoScrubberConfig>({
    videoSrcDesktop: '/videos/video16-9.mp4',
    videoSrcMobile: '/videos/video9-16.mp4',
    heroHeightVh: 500, // 500vh recommended height
    lerpFactor: 0.20,
    minSeekDeltaSeconds: 0.015,
    objectPosition: 'center center',
  });

  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<SalonService | null>(null);
  const [isAmbienceActive, setIsAmbienceActive] = useState<boolean>(false);

  const handleToggleAmbience = () => {
    const active = toggleAudioAmbience();
    setIsAmbienceActive(active);
  };

  const handleSelectService = (service: SalonService) => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 selection:bg-amber-400 selection:text-stone-950 font-sans transition-all duration-300">
      {/* Sticky Secondary Navigation Bar (fades in once visitor scrolls past the hero) */}
      <SalonNavbar
        onOpenBooking={() => {
          setSelectedService(null);
          setIsBookingOpen(true);
        }}
        isAmbiencePlaying={isAmbienceActive}
        onToggleAmbience={handleToggleAmbience}
      />

      {/* Primary Cinematic Hero Section */}
      <CinematicHero
        config={config}
        onOpenBooking={() => {
          setSelectedService(null);
          setIsBookingOpen(true);
        }}
        isAmbiencePlaying={isAmbienceActive}
        onToggleAmbience={handleToggleAmbience}
      />

      {/* Spatial Philosophy & Architectural Highlights */}
      <SalonPhilosophy />

      {/* Curated Service Menu & Bespoke Treatments */}
      <SalonServices onSelectService={handleSelectService} />

      {/* Master Artisans & Creative Directors */}
      <SalonTeam />

      {/* Atelier Footer */}
      <SalonFooter />

      {/* Private Atelier Booking Modal */}
      <SalonBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedService={selectedService}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <SalonAppContent />
    </LanguageProvider>
  );
}
