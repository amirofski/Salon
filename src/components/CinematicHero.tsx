import React, { useEffect, useRef, useState, useCallback } from 'react';
import { SalonChapter, VideoScrubberConfig } from '../types';
import { SALON_CHAPTERS } from '../data/salonData';
import { useLanguage } from '../context/LanguageContext';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  ChevronDown, 
  Languages
} from 'lucide-react';

interface CinematicHeroProps {
  config: VideoScrubberConfig;
  onOpenBooking: () => void;
  isAmbiencePlaying: boolean;
  onToggleAmbience: () => void;
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({
  config,
  onOpenBooking,
  isAmbiencePlaying,
  onToggleAmbience,
}) => {
  const { language, toggleLanguage, t, isRtl } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Dynamic responsive video source selection based on viewport & orientation
  const getActiveVideoSrc = useCallback(() => {
    if (typeof window === 'undefined') {
      return config.videoSrcDesktop || config.videoSrc || '/videos/video16-9.mp4';
    }
    const isMobileOrPortrait = window.innerWidth <= 768 || window.matchMedia('(orientation: portrait)').matches;
    if (isMobileOrPortrait) {
      return config.videoSrcMobile || '/videos/video9-16.mp4';
    }
    return config.videoSrcDesktop || config.videoSrc || '/videos/video16-9.mp4';
  }, [config.videoSrcDesktop, config.videoSrcMobile, config.videoSrc]);

  const [activeVideoSrc, setActiveVideoSrc] = useState<string>(getActiveVideoSrc);

  useEffect(() => {
    const handleResize = () => {
      const nextSrc = getActiveVideoSrc();
      setActiveVideoSrc((prev) => (prev !== nextSrc ? nextSrc : prev));
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [getActiveVideoSrc]);

  // Direct DOM refs to avoid React re-renders during high-frequency RAF loop
  const progressBarRef = useRef<HTMLDivElement>(null);
  const chapterNumberBadgeRef = useRef<HTMLSpanElement>(null);
  const chapterNameBadgeRef = useRef<HTMLSpanElement>(null);
  const scrollPromptRef = useRef<HTMLDivElement>(null);
  
  // Chapter overlay cards refs for smooth direct opacity/transform transitions
  const chapterCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // High-frequency mutable animation state
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const targetTimeRef = useRef<number>(0);
  const currentTimeRef = useRef<number>(0);
  const lastScrollYRef = useRef<number>(0);
  const isReducedMotionRef = useRef<boolean>(false);
  const rafIdRef = useRef<number | null>(null);

  // Cached layout metrics
  const cachedMetricsRef = useRef({
    heroTop: 0,
    heroHeight: 0,
    viewportHeight: typeof window !== 'undefined' ? window.innerHeight : 800,
    scrollableDistance: 1,
    duration: 12,
  });

  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);

  // Recalculate and cache section dimensions
  const updateCachedBounds = useCallback(() => {
    if (!heroRef.current) return;
    const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    const heroRect = heroRef.current.getBoundingClientRect();
    const heroTop = scrollY + heroRect.top;
    const heroHeight = heroRect.height;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const scrollableDistance = Math.max(heroHeight - viewportHeight, 1);

    cachedMetricsRef.current = {
      heroTop,
      heroHeight,
      viewportHeight,
      scrollableDistance,
      duration: videoRef.current?.duration || cachedMetricsRef.current.duration || 12,
    };
  }, []);

  // Update target progress from native scroll position
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    const { heroTop, scrollableDistance } = cachedMetricsRef.current;

    // Calculate normalized progress from actual hero section position
    const rawProgress = (scrollY - heroTop) / scrollableDistance;
    const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);

    lastScrollYRef.current = scrollY;
    targetProgressRef.current = clampedProgress;
    const duration = videoRef.current?.duration || cachedMetricsRef.current.duration || 12;
    targetTimeRef.current = clampedProgress * duration;
  }, []);

  // Set up video initial frame & state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Check reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    isReducedMotionRef.current = motionQuery.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotionRef.current = e.matches;
    };
    motionQuery.addEventListener('change', handleMotionChange);

    const onLoadedMetadata = () => {
      video.pause();
      const dur = video.duration || 12;
      cachedMetricsRef.current.duration = dur;
      try {
        const initialSeekTime = Math.max(0.001, targetTimeRef.current || 0);
        video.currentTime = initialSeekTime;
      } catch (err) {
        console.warn('Initial currentTime seek prevented by browser', err);
      }
      updateCachedBounds();
    };

    const onCanPlay = () => {
      video.pause();
    };

    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('canplay', onCanPlay);

    if (video.readyState >= 1) {
      onLoadedMetadata();
    }

    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('canplay', onCanPlay);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, [activeVideoSrc, updateCachedBounds]);

  // Main Unified requestAnimationFrame Synchronization Loop
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isRunning = true;

    const renderLoop = () => {
      if (!isRunning) return;

      if (isReducedMotionRef.current) {
        rafIdRef.current = requestAnimationFrame(renderLoop);
        return;
      }

      const duration = video.duration || cachedMetricsRef.current.duration || 12;
      const targetProgress = targetProgressRef.current;
      const targetTime = targetProgress * duration;
      const currentProgress = currentProgressRef.current;
      const currentTime = currentTimeRef.current;

      const progressDelta = targetProgress - currentProgress;
      const absProgressDelta = Math.abs(progressDelta);
      const timeDelta = targetTime - currentTime;
      const absTimeDelta = Math.abs(timeDelta);

      let effectiveLerp = config.lerpFactor;
      if (absTimeDelta < 0.05) {
        effectiveLerp = 0.4;
      } else if (absTimeDelta > 0.8) {
        effectiveLerp = Math.min(0.35, config.lerpFactor * 1.4);
      }

      // Smooth progress update
      const nextProgress = currentProgress + progressDelta * effectiveLerp;
      const finalProgress = absProgressDelta < 0.0001 ? targetProgress : nextProgress;
      currentProgressRef.current = finalProgress;

      // Smooth time update
      const nextTime = currentTime + timeDelta * effectiveLerp;
      const finalTime = absTimeDelta < 0.002 ? targetTime : nextTime;
      currentTimeRef.current = finalTime;

      // Seeking rules
      const isSeeking = video.seeking;
      const timeDiffFromVideo = Math.abs(finalTime - video.currentTime);
      const shouldSeek = !isSeeking && timeDiffFromVideo >= config.minSeekDeltaSeconds;

      if (shouldSeek) {
        try {
          video.currentTime = finalTime;
        } catch (err) {
          // Ignore transient seek errors
        }
      }

      // Direct DOM updates (zero React re-render overhead)
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${finalProgress})`;
      }

      // Fade out initial scroll prompt as user scrubs down
      if (scrollPromptRef.current) {
        const promptOpacity = Math.max(0, 1 - finalProgress * 10);
        scrollPromptRef.current.style.opacity = promptOpacity.toString();
        scrollPromptRef.current.style.pointerEvents = promptOpacity < 0.1 ? 'none' : 'auto';
      }

      // Update Chapter Narrative Overlays based on scroll progress intervals
      let activeIdx = 0;
      SALON_CHAPTERS.forEach((ch, idx) => {
        const card = chapterCardRefs.current[idx];
        if (!card) return;

        const center = (ch.startProgress + ch.endProgress) / 2;
        const halfSpan = (ch.endProgress - ch.startProgress) / 2;
        const distFromCenter = Math.abs(finalProgress - center);
        
        let opacity = 0;
        let translateY = 20;

        if (finalProgress >= ch.startProgress && finalProgress <= ch.endProgress) {
          activeIdx = idx;
          const normDist = distFromCenter / halfSpan;
          opacity = Math.max(0, 1 - Math.pow(normDist, 2.5));
          translateY = (finalProgress - center) * -40;
        } else if (idx === 0 && finalProgress < ch.startProgress) {
          opacity = Math.max(0, 1 - finalProgress * 4);
          translateY = 0;
        }

        card.style.opacity = opacity.toFixed(3);
        card.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0)`;
        card.style.pointerEvents = opacity > 0.3 ? 'auto' : 'none';
      });

      // Update chapter badge text in HUD
      if (chapterNumberBadgeRef.current && chapterNameBadgeRef.current) {
        const currentCh = SALON_CHAPTERS[activeIdx] || SALON_CHAPTERS[0];
        chapterNumberBadgeRef.current.textContent = language === 'fa' ? currentCh.numberFa : currentCh.number;
        chapterNameBadgeRef.current.textContent = currentCh.title[language];
      }

      rafIdRef.current = requestAnimationFrame(renderLoop);
    };

    const onPassiveScroll = () => {
      handleScroll();
    };

    const onResize = () => {
      updateCachedBounds();
      handleScroll();
    };

    updateCachedBounds();
    handleScroll();

    window.addEventListener('scroll', onPassiveScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('orientationchange', onResize, { passive: true });

    rafIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      isRunning = false;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      window.removeEventListener('scroll', onPassiveScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, [config, handleScroll, updateCachedBounds, language]);

  // Jump to specific chapter helper
  const scrollToChapter = (chapter: SalonChapter) => {
    if (!heroRef.current) return;
    const { heroTop, scrollableDistance } = cachedMetricsRef.current;
    const targetScrollY = heroTop + chapter.startProgress * scrollableDistance;
    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
  };

  // Scroll to services section directly below hero
  const scrollToServices = () => {
    const servicesEl = document.getElementById('services-section');
    if (servicesEl) {
      servicesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      id="cinematic-hero-section"
      className="cinematic-hero relative w-full bg-stone-950 text-stone-100"
      style={{ height: `${config.heroHeightVh}vh` }}
      aria-label="Cinematic Salon Walkthrough"
    >
      {/* Sticky Viewport: 100vw × 100vh with position: sticky; top: 0; */}
      <div 
        ref={stickyRef}
        className="hero-sticky flex flex-col justify-between"
      >
        {/* The Responsive MP4 Video Element (16:9 for desktop, 9:16 for mobile/portrait) */}
        <video
          ref={videoRef}
          id="salon-cinematic-video"
          src={activeVideoSrc}
          preload="auto"
          muted
          playsInline
          className="hero-video-element absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{
            objectPosition: config.objectPosition || 'center center',
          }}
          aria-hidden="true"
        />

        {/* Ambient Darkened Gradient Masks for Architectural Elegance and Readability */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/25 to-stone-950/70 pointer-events-none"
          aria-hidden="true"
        />
        <div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(12,10,9,0.7)_100%)] pointer-events-none"
          aria-hidden="true"
        />

        {/* Hero Overlay: Top Header HUD, Narrative Cards, Bottom Scrub Bar */}
        <div className="hero-overlay relative z-10 flex flex-col justify-between h-full p-4 md:p-8 select-none">
          
          {/* Top Bar: Brand, Language Toggle, Audio Ambience & Booking CTA */}
          <header className="flex items-center justify-between gap-4 w-full">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-amber-400/30 bg-stone-950/60 backdrop-blur-md flex items-center justify-center text-amber-300 shadow-inner">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif font-semibold tracking-widest text-sm md:text-base text-stone-100 uppercase">
                    {t.brandName}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-mono tracking-wider bg-amber-400/10 text-amber-300 border border-amber-400/20 rounded-full">
                    {t.timelineBadge}
                  </span>
                </div>
                <p className="text-[11px] font-sans text-stone-400 tracking-wide hidden sm:block">
                  {t.brandSub}
                </p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Language Switcher Button */}
              <button
                id="header-language-toggle-btn"
                onClick={toggleLanguage}
                title={language === 'fa' ? 'Switch to English' : 'تغییر به زبان فارسی'}
                className="px-3 py-2 rounded-full border border-stone-800 bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-amber-300 hover:border-amber-400/40 backdrop-blur-md transition-all text-xs flex items-center gap-1.5"
              >
                <Languages className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-semibold text-[11px] uppercase tracking-wider">
                  {language === 'fa' ? 'English' : 'فارسی'}
                </span>
              </button>

              {/* Ambience Audio Toggle */}
              <button
                id="toggle-audio-ambience-btn"
                onClick={onToggleAmbience}
                title={t.ambienceTitle}
                className={`p-2.5 rounded-full border transition-all text-xs flex items-center gap-2 ${
                  isAmbiencePlaying 
                    ? 'bg-amber-400/20 text-amber-200 border-amber-400/40 shadow-lg shadow-amber-400/10' 
                    : 'bg-stone-900/60 text-stone-400 border-stone-800 hover:text-stone-200 hover:bg-stone-800'
                } backdrop-blur-md`}
              >
                {isAmbiencePlaying ? <Volume2 className="w-4 h-4 text-amber-300" /> : <VolumeX className="w-4 h-4" />}
                <span className="text-[11px] font-medium hidden md:inline">
                  {isAmbiencePlaying ? t.ambienceOn : t.ambienceOff}
                </span>
              </button>

              {/* Direct Booking CTA */}
              <button
                id="hero-header-book-cta"
                onClick={onOpenBooking}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-semibold text-xs tracking-wider transition-all shadow-md shadow-amber-950/40"
              >
                {t.reserveBtn}
              </button>
            </div>
          </header>

          {/* Central Narrative Layer: Direct DOM Driven Chapters */}
          <main className="relative flex-1 flex items-center justify-center pointer-events-none">
            {SALON_CHAPTERS.map((chapter, idx) => (
              <div
                key={chapter.id}
                ref={(el) => (chapterCardRefs.current[idx] = el)}
                className="absolute max-w-2xl w-full mx-auto px-4 md:px-6 py-6 text-center transition-all duration-300 ease-out"
                style={{
                  opacity: idx === 0 ? 1 : 0,
                  transform: 'translate3d(0, 0px, 0)',
                }}
              >
                {/* Chapter Metadata Tag */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-950/70 border border-amber-400/20 text-amber-300 backdrop-blur-md mb-3 text-xs font-mono tracking-widest uppercase">
                  <span>{t.chapter} {language === 'fa' ? chapter.numberFa : chapter.number}</span>
                  <span className="w-1 h-1 rounded-full bg-amber-400" />
                  <span className="text-[10px] text-stone-400">{chapter.coordinates[language]}</span>
                </div>

                {/* Main Architectural Heading */}
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-stone-100 font-light tracking-tight leading-tight mb-3">
                  {chapter.title[language]}
                </h1>

                {/* Subtitle */}
                <p className="font-display text-xs md:text-sm font-semibold tracking-widest text-amber-300/90 uppercase mb-4">
                  {chapter.subtitle[language]}
                </p>

                {/* Description */}
                <p className="font-sans text-sm md:text-base text-stone-300/90 max-w-xl mx-auto leading-relaxed font-light mb-6">
                  {chapter.description[language]}
                </p>

                {/* Highlights Tags */}
                <div className="flex flex-wrap items-center justify-center gap-2 pointer-events-auto">
                  {chapter.highlights[language].map((highlight, hIdx) => (
                    <span 
                      key={hIdx}
                      className="px-2.5 py-1 rounded-md text-[11px] font-sans bg-stone-900/60 border border-stone-800 text-stone-300 backdrop-blur-sm"
                    >
                      {highlight}
                    </span>
                  ))}
                  <button
                    onClick={scrollToServices}
                    className="px-3 py-1 rounded-md text-[11px] font-sans bg-amber-400/10 border border-amber-400/30 text-amber-300 hover:bg-amber-400/20 transition-colors flex items-center gap-1.5"
                  >
                    <span>{t.viewMenu}</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}

            {/* Scroll Indicator Prompt (fades away as scroll progress begins) */}
            <div 
              ref={scrollPromptRef}
              className="absolute bottom-6 flex flex-col items-center gap-2 text-stone-400 transition-opacity duration-300 pointer-events-auto cursor-pointer"
              onClick={() => {
                window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
              }}
            >
              <span className="text-[11px] font-sans tracking-wider text-stone-400">
                {t.scrollPrompt}
              </span>
              <div className="w-5 h-8 rounded-full border border-stone-600/80 flex items-start justify-center p-1">
                <div className="w-1.5 h-2.5 rounded-full bg-amber-300 animate-bounce" />
              </div>
            </div>
          </main>

          {/* Bottom HUD: Timeline Scrubber Bar & Chapter Switcher */}
          <footer className="w-full space-y-3">
            
            {/* Interactive Chapter Jumps & Current Chapter Tracker */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs">
              {/* Active Chapter Label */}
              <div className="flex items-center gap-2 text-[12px] text-stone-400">
                <span className="text-amber-400 font-bold font-mono">
                  {t.chapter} <span ref={chapterNumberBadgeRef}>{language === 'fa' ? '۰۱' : '01'}</span>
                </span>
                <span className="text-stone-600">/</span>
                <span ref={chapterNameBadgeRef} className="text-stone-200 font-medium truncate max-w-[260px] sm:max-w-md">
                  {SALON_CHAPTERS[0].title[language]}
                </span>
              </div>

              {/* Quick Jump Chapter Pills */}
              <div className="flex items-center gap-1.5 bg-stone-950/70 p-1.5 rounded-full border border-stone-800/80 backdrop-blur-md">
                {SALON_CHAPTERS.map((ch, idx) => (
                  <button
                    key={ch.id}
                    id={`chapter-jump-btn-${idx}`}
                    onClick={() => scrollToChapter(ch)}
                    title={`Jump to ${ch.title[language]}`}
                    className="px-3 py-1 rounded-full text-[11px] font-medium text-stone-400 hover:text-amber-300 hover:bg-stone-800/80 transition-colors"
                  >
                    {language === 'fa' ? ch.numberFa : `0${idx + 1}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Cinematic Sticky Timeline Progress Bar */}
            <div 
              className="relative w-full h-1.5 sm:h-2 bg-stone-900/80 rounded-full overflow-hidden border border-stone-800 cursor-pointer shadow-inner"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickProgress = isRtl
                  ? (rect.right - e.clientX) / rect.width
                  : (e.clientX - rect.left) / rect.width;
                if (!heroRef.current) return;
                const { heroTop, scrollableDistance } = cachedMetricsRef.current;
                window.scrollTo({
                  top: heroTop + clickProgress * scrollableDistance,
                  behavior: 'smooth',
                });
              }}
            >
              {/* Direct DOM Scaled Fill */}
              <div 
                ref={progressBarRef}
                className={`absolute inset-y-0 ${isRtl ? 'right-0 origin-right' : 'left-0 origin-left'} w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-200`}
                style={{ transform: 'scaleX(0)' }}
              />

              {/* Subtle Chapter Dividers on Progress Bar */}
              {SALON_CHAPTERS.map((ch, idx) => (
                <div
                  key={idx}
                  className="absolute top-0 bottom-0 w-0.5 bg-stone-950/80 pointer-events-none"
                  style={isRtl ? { right: `${ch.startProgress * 100}%` } : { left: `${ch.startProgress * 100}%` }}
                />
              ))}
            </div>

          </footer>

        </div>
      </div>
    </section>
  );
};
