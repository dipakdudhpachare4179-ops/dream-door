import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Compass, Eye, Volume2, VolumeX, Sparkles, ChevronRight, RotateCcw } from 'lucide-react';

interface CinematicHouseExperienceProps {
  onExploreProperties: () => void;
  onBookTour: () => void;
}

export default function CinematicHouseExperience({
  onExploreProperties,
  onBookTour
}: CinematicHouseExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [interactiveProgress, setInteractiveProgress] = useState<number | null>(null);
  const [ambientAudioActive, setAmbientAudioActive] = useState(false);

  // Track scroll progress through the pinned container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Smooth out scroll progress using a spring
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001
  });

  const [currentProgressVal, setCurrentProgressVal] = useState(0);

  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (latest) => {
      if (interactiveProgress === null) {
        setCurrentProgressVal(latest);
      }
    });
    return () => unsubscribe();
  }, [smoothProgress, interactiveProgress]);

  const activeP = interactiveProgress !== null ? interactiveProgress : currentProgressVal;

  // Exterior facade scale & positioning
  // Step 1 -> Step 2 -> Step 3 -> Step 4 -> Step 5
  // As activeP goes 0 -> 0.75, exterior scales from 1.0 up to 3.4 centered on the entrance door
  const exteriorScale = 1 + activeP * 2.6;
  const exteriorOpacity = activeP < 0.78 ? 1 : Math.max(0, 1 - (activeP - 0.78) * 6);
  
  // Parallax elements: foreground stone terraces & flora move outward
  const foregroundParallaxX = activeP * 120;
  const foregroundParallaxY = activeP * 80;

  // Door Pivot Angle: Starts opening around 0.65, fully open at 0.85
  const doorOpenAngle =
    activeP < 0.62
      ? 0
      : activeP > 0.85
      ? -80
      : -((activeP - 0.62) / 0.23) * 80;

  // Door opacity & scale as user approaches the doorway
  const doorWrapperOpacity =
    activeP < 0.5 ? 0 : activeP < 0.6 ? (activeP - 0.5) / 0.1 : 1;
  const doorWrapperScale =
    activeP < 0.5 ? 0.85 : 0.85 + (activeP - 0.5) * 0.45;

  // Interior Reveal: starts showing through doorway at 0.65, expands to full screen at 0.82 - 1.0
  const interiorOpacity =
    activeP < 0.65 ? 0 : Math.min(1, (activeP - 0.65) / 0.25);
  const interiorScale =
    activeP < 0.75 ? 0.92 : 0.92 + (activeP - 0.75) * 0.14;

  // Determine current active step index (0-6)
  const steps = [
    {
      num: '01',
      title: 'Panoramic Estate Facade',
      desc: 'The architectural composition rests in natural equilibrium with sunlight washing over limestone.'
    },
    {
      num: '02',
      title: 'Approaching Through The Grounds',
      desc: 'Gliding across the manicured stone driveway towards the cantilevered chocolate timber canopy.'
    },
    {
      num: '03',
      title: 'Travertine Terrace Parallax',
      desc: 'Sensing spatial depth as the reflecting water and structural columns frame the entryway.'
    },
    {
      num: '04',
      title: 'Approaching The Main Entrance',
      desc: 'The grand stone steps lead directly to the bespoke dark walnut pivot entrance door.'
    },
    {
      num: '05',
      title: 'Doorway Visual Focus',
      desc: 'Warm ambient illumination radiates from within as the entrance occupies the full vantage.'
    },
    {
      num: '06',
      title: 'Threshold Unlocks & Swings Open',
      desc: 'The oversized pivot door glides open in 3D perspective, revealing the private sanctuary.'
    },
    {
      num: '07',
      title: 'The Grand Interior Salon',
      desc: 'Step directly into the double-height living pavilion, soaring glass walls, and travertine tranquility.'
    }
  ];

  const currentStepIndex = Math.min(
    6,
    Math.max(0, Math.floor(activeP * 7))
  );

  return (
    <div
      ref={containerRef}
      id="experience"
      className="relative h-[380vh] w-full bg-[#140B07] text-[#FAF8F5]"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* ================= LAYER 1: EXTERIOR HOUSE FACADE ================= */}
        <div
          className="absolute inset-0 z-10 transition-transform duration-75 ease-out will-change-transform"
          style={{
            opacity: exteriorOpacity,
            transform: `scale(${exteriorScale}) translate3d(0, ${activeP * 4}%, 0)`,
            transformOrigin: '50% 58%'
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=75&fm=webp"
            srcSet="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=640&q=75&fm=webp 640w, https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1024&q=75&fm=webp 1024w, https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=75&fm=webp 1600w"
            sizes="100vw"
            alt="Dream Door Properties signature architectural facade"
            width={1920}
            height={1080}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center select-none"
          />
          {/* Subtle warm depth vignette */}
          <div className="absolute inset-0 bg-radial from-transparent via-[#1C100B]/30 to-[#140B07]/80" />
        </div>

        {/* Foreground Parallax Elements: Botanical foliage & entrance pillars */}
        <div
          className="absolute -bottom-10 -left-12 z-20 pointer-events-none transition-transform duration-75 will-change-transform"
          style={{
            opacity: exteriorOpacity * 0.85,
            transform: `translate3d(-${foregroundParallaxX}px, ${foregroundParallaxY}px, 0)`
          }}
        >
          <div className="w-80 h-80 rounded-full bg-[#1C100B]/40 blur-2xl" />
        </div>

        {/* ================= LAYER 2: INTERACTIVE GRAND PIVOT DOORWAY ================= */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none transition-opacity duration-300"
          style={{
            opacity: doorWrapperOpacity,
            transform: `scale(${doorWrapperScale})`
          }}
        >
          {/* Door Frame & Wall Threshold */}
          <div
            className="relative w-[340px] sm:w-[420px] md:w-[500px] h-[580px] sm:h-[680px] md:h-[760px] border-[12px] md:border-[16px] border-[#2B1810] shadow-[0_30px_90px_rgba(0,0,0,0.85)] overflow-hidden"
            style={{
              perspective: '1200px',
              perspectiveOrigin: '20% 50%',
              backgroundColor: '#1E110B'
            }}
          >
            {/* The Interior View seen directly through the opened doorway */}
            <div
              className="absolute inset-0 z-0 overflow-hidden"
              style={{
                opacity: interiorOpacity
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=75&fm=webp"
                srcSet="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=640&q=75&fm=webp 640w, https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1024&q=75&fm=webp 1024w, https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=75&fm=webp 1600w"
                sizes="100vw"
                alt="Interior grand salon with travertine and double-height glass"
                width={1920}
                height={1080}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-100 ease-out"
                style={{
                  transform: `scale(${interiorScale})`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C100B]/60 via-transparent to-black/20" />
            </div>

            {/* The 3D Rotating Pivot Door Slab */}
            <div
              className="absolute inset-0 z-10 origin-left transition-transform duration-100 ease-out"
              style={{
                transform: `rotateY(${doorOpenAngle}deg)`,
                transformStyle: 'preserve-3d',
                backgroundColor: '#2D1A12',
                boxShadow: 'inset 0 0 40px rgba(0,0,0,0.6)'
              }}
            >
              {/* Rich Chocolate Walnut Grain & Paneling */}
              <div className="w-full h-full relative border-r-4 border-[#3D2314] p-8 flex flex-col justify-between">
                {/* Horizontal architectural groove lines */}
                <div className="absolute inset-x-0 top-1/4 h-[1px] bg-[#180D08]/80 shadow-[0_1px_0_rgba(255,255,255,0.06)]" />
                <div className="absolute inset-x-0 top-2/4 h-[1px] bg-[#180D08]/80 shadow-[0_1px_0_rgba(255,255,255,0.06)]" />
                <div className="absolute inset-x-0 top-3/4 h-[1px] bg-[#180D08]/80 shadow-[0_1px_0_rgba(255,255,255,0.06)]" />

                {/* Minimalist vertical bronze bar handle */}
                <div className="absolute right-8 top-1/3 bottom-1/3 w-3 bg-gradient-to-r from-[#C4A47C] via-[#E8DFC8] to-[#9E7B54] rounded-sm shadow-[0_4px_12px_rgba(0,0,0,0.6)]" />

                {/* Small luxury emblem */}
                <div className="z-10 text-[10px] tracking-[0.3em] uppercase text-[#C4A47C]/80 font-medium">
                  Dream Door
                </div>

                <div className="z-10 text-[9px] tracking-[0.2em] uppercase text-[#FAF8F5]/40 font-mono">
                  Pivot Threshold 01
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= LAYER 3: FULLSCREEN INTERIOR TAKEOVER ================= */}
        {activeP >= 0.85 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: (activeP - 0.85) / 0.15 }}
            className="absolute inset-0 z-25 overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=75&fm=webp"
              srcSet="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=640&q=75&fm=webp 640w, https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1024&q=75&fm=webp 1024w, https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=75&fm=webp 1600w"
              sizes="100vw"
              alt="Grand interior sanctuary revealed"
              width={1920}
              height={1080}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C100B]/90 via-[#24150E]/30 to-black/30" />

            {/* Interior Congratulations & Next Step Callout */}
            <div className="absolute bottom-28 left-6 md:left-14 max-w-lg z-30">
              <span className="text-xs uppercase tracking-[0.3em] font-medium text-[#C4A47C] mb-2 block">
                Interior Sanctuary Revealed
              </span>
              <h3 className="font-serif-luxury text-3xl md:text-5xl font-light text-[#FAF8F5] mb-4">
                Welcome Inside
              </h3>
              <p className="text-sm md:text-base text-[#FAF8F5]/80 font-light leading-relaxed mb-6">
                Soaring 18-foot ceilings, custom walnut millwork, and seamless transitions into private gardens. Every detail considered.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={onExploreProperties}
                  className="px-6 py-3 bg-[#FAF8F5] text-[#24150E] text-xs uppercase tracking-widest font-semibold hover:bg-[#EFECE5] transition-colors cursor-pointer"
                >
                  Explore Collection
                </button>
                <button
                  onClick={onBookTour}
                  className="px-6 py-3 border border-[#FAF8F5]/70 text-[#FAF8F5] text-xs uppercase tracking-widest font-semibold hover:bg-white/10 transition-colors cursor-pointer"
                >
                  Book Private Tour
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ================= HUD & EXPERIENCE CONTROLS ================= */}
        {/* Top Bar Status */}
        <div className="absolute top-24 left-6 md:left-12 right-6 md:right-12 z-30 flex items-center justify-between pointer-events-none">
          <div className="inline-flex items-center gap-3 bg-[#1C100B]/80 backdrop-blur-md px-4 py-2 border border-white/10">
            <Compass className="w-3.5 h-3.5 text-[#C4A47C] animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.24em] font-medium text-[#FAF8F5]">
              Interactive House Entry Experience
            </span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-3 bg-[#1C100B]/80 backdrop-blur-md px-4 py-2 border border-white/10">
            <span className="text-[11px] font-mono tabular-nums text-[#C4A47C]">
              {Math.round(activeP * 100)}%
            </span>
            <span className="text-[11px] uppercase tracking-widest text-[#FAF8F5]/70">
              Scroll Progress
            </span>
          </div>
        </div>

        {/* Bottom Editorial Step Information Card */}
        <div className="absolute bottom-8 left-6 md:left-12 right-6 md:right-12 z-30 flex flex-col md:flex-row items-end md:items-center justify-between gap-6 pointer-events-auto">
          {/* Step narrative block */}
          <div className="bg-[#1C100B]/85 backdrop-blur-md p-5 md:p-6 border border-white/10 max-w-xl w-full">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-mono font-semibold text-[#C4A47C] tracking-widest">
                STEP {steps[currentStepIndex].num} / 07
              </span>
              <span className="w-4 h-[1px] bg-white/20" />
              <span className="text-xs uppercase tracking-widest text-[#FAF8F5]/70 font-medium">
                {steps[currentStepIndex].title}
              </span>
            </div>
            <p className="text-xs md:text-sm text-[#FAF8F5]/85 font-light leading-relaxed">
              {steps[currentStepIndex].desc}
            </p>

            {/* Step progress pills */}
            <div className="grid grid-cols-7 gap-1.5 mt-4">
              {steps.map((st, i) => (
                <button
                  key={st.num}
                  onClick={() => {
                    setInteractiveProgress(i / 6);
                  }}
                  className={`h-1 transition-all duration-300 rounded-none cursor-pointer ${
                    i <= currentStepIndex
                      ? 'bg-[#C4A47C]'
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                  title={st.title}
                />
              ))}
            </div>
          </div>

          {/* Interactive Walk-In Scrubber for mouse/touch */}
          <div className="bg-[#1C100B]/85 backdrop-blur-md p-4 md:p-5 border border-white/10 flex flex-col gap-3 min-w-[260px] md:min-w-[320px]">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-[#FAF8F5]/80 font-medium">
              <span>Scrub To Walk In</span>
              {interactiveProgress !== null && (
                <button
                  onClick={() => setInteractiveProgress(null)}
                  className="inline-flex items-center gap-1 text-[10px] text-[#C4A47C] hover:underline cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Sync Scroll</span>
                </button>
              )}
            </div>

            <input
              type="range"
              min="0"
              max="1"
              step="0.005"
              value={activeP}
              onChange={(e) => setInteractiveProgress(parseFloat(e.target.value))}
              className="w-full accent-[#C4A47C] bg-white/20 h-1.5 cursor-pointer"
            />

            <div className="flex items-center justify-between text-[10px] tracking-wider text-[#FAF8F5]/60 font-mono">
              <span>Exterior Facade</span>
              <span>Pivot Door</span>
              <span>Interior Foyer</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
