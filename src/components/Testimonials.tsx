import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/content';

export default function Testimonials() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const prevTestimonial = () => {
    setCurrentIdx((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIdx((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const item = TESTIMONIALS[currentIdx];

  return (
    <section className="py-28 md:py-36 bg-[#FAF8F5] text-[#24150E] overflow-hidden border-b border-[#331E14]/10">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.28em] font-semibold text-[#8A6D56]">
            Client Experiences
          </span>
        </div>

        {/* Testimonial Stage */}
        <div className="relative min-h-[280px] md:min-h-[320px] flex flex-col justify-between items-center text-center">
          <Quote className="w-12 h-12 text-[#C4A47C]/40 mx-auto mb-6" />

          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl"
            >
              <p className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-[#24150E] font-light italic leading-relaxed mb-8">
                &ldquo;{item.quote}&rdquo;
              </p>

              <div>
                <span className="font-medium text-sm uppercase tracking-wider text-[#24150E] block">
                  {item.author}
                </span>
                <span className="text-xs text-[#8A6D56] font-light">
                  {item.location} · {item.propertyType}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Navigation Dots & Arrows */}
          <div className="flex items-center gap-6 mt-12">
            <button
              onClick={prevTestimonial}
              className="p-2.5 rounded-full border border-[#331E14]/15 hover:border-[#331E14] text-[#331E14] hover:bg-[#331E14] hover:text-[#FAF8F5] transition-all cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => setCurrentIdx(idx)}
                  className={`h-1.5 transition-all duration-300 cursor-pointer ${
                    currentIdx === idx
                      ? 'w-6 bg-[#331E14]'
                      : 'w-1.5 bg-[#331E14]/20 hover:bg-[#331E14]/40'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-2.5 rounded-full border border-[#331E14]/15 hover:border-[#331E14] text-[#331E14] hover:bg-[#331E14] hover:text-[#FAF8F5] transition-all cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
