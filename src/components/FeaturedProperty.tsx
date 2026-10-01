import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Bed, Bath, Maximize2, Sparkles } from 'lucide-react';
import { Property } from '../types/property';
import { PROPERTIES } from '../data/properties';
import OptimizedImage from './OptimizedImage';

interface FeaturedPropertyProps {
  onSelectProperty: (property: Property) => void;
}

export default function FeaturedProperty({ onSelectProperty }: FeaturedPropertyProps) {
  const featured = PROPERTIES.find((p) => p.featured) || PROPERTIES[0];
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-36 bg-[#2B1810] text-[#FAF8F5] overflow-hidden"
    >
      {/* Decorative ambient background blur */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#C4A47C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (7 cols): Large Architectural Image with Scroll Parallax */}
          <div className="lg:col-span-7">
            <div
              onClick={() => onSelectProperty(featured)}
              className="relative aspect-[4/3] w-full overflow-hidden cursor-pointer group border border-white/10"
            >
              <motion.div style={{ y: imageY }} className="w-full h-[115%] -mt-[7%]">
                <OptimizedImage
                  src={featured.images[0]}
                  alt={featured.title}
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  widths={[640, 800, 1024, 1440]}
                  width={1200}
                  height={900}
                  quality={75}
                  priority={false}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

              <div className="absolute top-6 left-6 inline-flex items-center gap-2 bg-[#1C100B]/80 backdrop-blur-md px-3.5 py-1.5 border border-white/10">
                <Sparkles className="w-3 h-3 text-[#C4A47C]" />
                <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#FAF8F5]">
                  Curator&apos;s Highlight
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Rich Chocolate Editorial Content */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="inline-flex items-center gap-3 mb-4"
              >
                <span className="w-6 h-[1px] bg-[#C4A47C]" />
                <span className="text-xs uppercase tracking-[0.28em] font-semibold text-[#C4A47C]">
                  Featured Property
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                onClick={() => onSelectProperty(featured)}
                className="font-serif-luxury text-3xl sm:text-5xl md:text-5xl font-light text-[#FAF8F5] leading-tight mb-3 cursor-pointer hover:text-[#E8DFC8] transition-colors"
              >
                {featured.title}
              </motion.h2>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="text-xs uppercase tracking-widest text-[#C4A47C] font-medium mb-4"
              >
                {featured.location}
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-sm md:text-base text-[#FAF8F5]/80 font-light leading-relaxed mb-8"
              >
                {featured.description}
              </motion.p>

              {/* Specs Grid */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.25 }}
                className="grid grid-cols-3 gap-4 py-6 border-y border-white/10 mb-8"
              >
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#FAF8F5]/50 block mb-1">
                    Bedrooms
                  </span>
                  <div className="flex items-center gap-1.5 font-serif-luxury text-lg text-[#FAF8F5]">
                    <Bed className="w-3.5 h-3.5 text-[#C4A47C]" />
                    <span>{featured.bedrooms} Suites</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#FAF8F5]/50 block mb-1">
                    Bathrooms
                  </span>
                  <div className="flex items-center gap-1.5 font-serif-luxury text-lg text-[#FAF8F5]">
                    <Bath className="w-3.5 h-3.5 text-[#C4A47C]" />
                    <span>{featured.bathrooms} Baths</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#FAF8F5]/50 block mb-1">
                    Living Area
                  </span>
                  <div className="flex items-center gap-1.5 font-serif-luxury text-lg text-[#FAF8F5]">
                    <Maximize2 className="w-3.5 h-3.5 text-[#C4A47C]" />
                    <span>{featured.area}</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Price & Primary Action */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="flex items-center justify-between gap-4"
            >
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#FAF8F5]/50 block">
                  Guide Price
                </span>
                <span className="font-serif-luxury text-2xl md:text-3xl font-medium text-[#FAF8F5]">
                  {featured.price}
                </span>
              </div>

              <button
                onClick={() => onSelectProperty(featured)}
                className="px-6 py-3.5 bg-[#FAF8F5] text-[#24150E] text-xs uppercase tracking-widest font-semibold hover:bg-[#EFECE5] transition-colors flex items-center gap-2 cursor-pointer group"
              >
                <span>View Property</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
