import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { GALLERY_IMAGES } from '../data/content';
import OptimizedImage from './OptimizedImage';

export default function MasonryGallery() {
  const [selectedImageIdx, setSelectedImageIdx] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIdx === null) return;
      if (e.key === 'Escape') setSelectedImageIdx(null);
      if (e.key === 'ArrowRight') {
        setSelectedImageIdx((prev) =>
          prev !== null ? (prev + 1) % GALLERY_IMAGES.length : 0
        );
      }
      if (e.key === 'ArrowLeft') {
        setSelectedImageIdx((prev) =>
          prev !== null
            ? (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
            : 0
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIdx]);

  return (
    <section id="gallery" className="py-28 md:py-36 bg-[#FAF8F5] text-[#24150E] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 mb-4"
            >
              <span className="w-5 h-[1px] bg-[#C4A47C]" />
              <span className="text-xs uppercase tracking-[0.26em] font-semibold text-[#8A6D56]">
                Visual Narrative
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#24150E] font-light leading-tight tracking-tight"
            >
              Architectural Gallery
            </motion.h2>
          </div>
          <p className="text-xs md:text-sm text-[#5A3825] font-light max-w-md">
            Moments of light, form, and material balance captured across our curated residences.
          </p>
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {GALLERY_IMAGES.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelectedImageIdx(idx)}
              className="group relative overflow-hidden bg-[#24150E]/5 border border-[#331E14]/10 cursor-pointer"
            >
              <div className={`relative ${item.aspect} w-full overflow-hidden`}>
                <OptimizedImage
                  src={item.src}
                  alt={item.title}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  widths={[400, 640, 800, 1024]}
                  width={800}
                  height={600}
                  quality={75}
                  priority={false}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300" />

                <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                  <div className="self-end p-2 bg-black/40 backdrop-blur-xs">
                    <Maximize2 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#E8DFC8] block mb-1">
                      {item.category}
                    </span>
                    <h3 className="font-serif-luxury text-xl font-medium">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1C100B]/95 backdrop-blur-md flex flex-col justify-between p-6 md:p-10 select-none"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between text-[#FAF8F5]">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-widest text-[#C4A47C] font-semibold">
                  Dream Door Gallery
                </span>
                <span className="text-white/20">|</span>
                <span className="font-mono text-xs text-[#FAF8F5]/80">
                  {selectedImageIdx + 1} / {GALLERY_IMAGES.length}
                </span>
              </div>

              <button
                onClick={() => setSelectedImageIdx(null)}
                className="p-2 text-[#FAF8F5] hover:text-[#C4A47C] transition-colors cursor-pointer"
                aria-label="Close fullscreen gallery"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Central Media Container */}
            <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
              <OptimizedImage
                src={GALLERY_IMAGES[selectedImageIdx].src}
                alt={GALLERY_IMAGES[selectedImageIdx].title}
                sizes="90vw"
                widths={[800, 1200, 1600]}
                quality={78}
                priority={true}
                className="max-h-[75vh] max-w-[90vw] object-contain shadow-2xl transition-all duration-300"
              />

              {/* Navigation controls */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImageIdx((prev) =>
                    prev !== null
                      ? (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
                      : 0
                  );
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 text-white hover:bg-black/80 backdrop-blur-xs transition-colors cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImageIdx((prev) =>
                    prev !== null ? (prev + 1) % GALLERY_IMAGES.length : 0
                  );
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 text-white hover:bg-black/80 backdrop-blur-xs transition-colors cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption Bar */}
            <div className="text-center text-[#FAF8F5] max-w-xl mx-auto">
              <span className="text-[11px] uppercase tracking-widest text-[#C4A47C] block mb-1">
                {GALLERY_IMAGES[selectedImageIdx].category}
              </span>
              <h4 className="font-serif-luxury text-2xl font-light">
                {GALLERY_IMAGES[selectedImageIdx].title}
              </h4>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
