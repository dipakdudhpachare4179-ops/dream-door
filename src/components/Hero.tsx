import { motion } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

interface HeroProps {
  onExploreProperties: () => void;
  onGetInTouch: () => void;
  onScrollToExperience: () => void;
}

export default function Hero({
  onExploreProperties,
  onGetInTouch,
  onScrollToExperience
}: HeroProps) {
  const headlineWords = ['Find', 'a', 'Place', 'Worth', 'Coming', 'Home', 'To.'];

  return (
    <section id="hero" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#1E110B]">
      {/* Cinematic Background Image with Sequential Zoom In */}
      <motion.div
        initial={{ scale: 1.15, opacity: 0.8 }}
        animate={{ scale: 1.0, opacity: 1 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=75&fm=webp"
          srcSet="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=640&q=75&fm=webp 640w, https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1024&q=75&fm=webp 1024w, https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1440&q=75&fm=webp 1440w, https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=75&fm=webp 1920w"
          sizes="100vw"
          alt="Luxury architectural residence at golden dusk"
          width={1920}
          height={1080}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
        {/* Editorial contrast scrim: warm dark chocolate vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C100B]/90 via-[#2B1810]/45 to-black/40" />
        <div className="absolute inset-0 bg-[#2D1A12]/20 mix-blend-multiply" />
      </motion.div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center pt-24 pb-20">
        {/* Step 4: Small Uppercase Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-3 mb-6"
        >
          <span className="w-8 h-[1px] bg-[#C4A47C]/80" />
          <span className="text-xs md:text-[13px] uppercase tracking-[0.28em] font-medium text-[#FAF8F5]/90">
            Luxury Real Estate
          </span>
          <span className="w-8 h-[1px] bg-[#C4A47C]/80" />
        </motion.div>

        {/* Step 5: Main Headline revealed word-by-word */}
        <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#FAF8F5] font-light leading-[1.08] tracking-tight mb-7 flex flex-wrap justify-center gap-x-3.5 gap-y-2 max-w-4xl">
          {headlineWords.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.7 + i * 0.08,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Step 6: Description fades upward */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg md:text-xl text-[#FAF8F5]/85 font-light max-w-2xl leading-relaxed mb-10 text-balance"
        >
          Curating distinguished private residences, modern architectural villas, and rare residential estates defined by timeless craftsmanship and enduring character.
        </motion.p>

        {/* Step 7: Dual CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto"
        >
          <button
            onClick={onExploreProperties}
            className="w-full sm:w-auto px-8 py-4 bg-[#FAF8F5] text-[#24150E] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#EFECE5] hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer group"
          >
            <span>Explore Properties</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <button
            onClick={onGetInTouch}
            className="w-full sm:w-auto px-8 py-4 border border-[#FAF8F5]/60 text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#FAF8F5]/10 hover:border-[#FAF8F5] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer backdrop-blur-[2px]"
          >
            <span>Get In Touch</span>
          </button>
        </motion.div>
      </div>

      {/* Step 8: Scroll Indicator appears last */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.0 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center cursor-pointer group"
        onClick={onScrollToExperience}
      >
        <span className="text-[11px] uppercase tracking-[0.3em] font-medium text-[#FAF8F5]/70 group-hover:text-[#FAF8F5] transition-colors mb-2">
          Scroll To Explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="text-[#FAF8F5]/70 group-hover:text-[#FAF8F5] transition-colors"
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
