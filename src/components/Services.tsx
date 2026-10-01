import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES } from '../data/content';

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  return (
    <section id="services" className="py-28 md:py-36 bg-[#FAF8F5] text-[#24150E] overflow-hidden border-b border-[#331E14]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <span className="w-5 h-[1px] bg-[#C4A47C]" />
            <span className="text-xs uppercase tracking-[0.26em] font-semibold text-[#8A6D56]">
              Advisory Capabilities
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif-luxury text-3xl sm:text-5xl text-[#24150E] font-light leading-tight tracking-tight"
          >
            Bespoke Real Estate Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-[#5A3825] font-light mt-3"
          >
            Structured around total discretion, architectural appreciation, and individual client outcomes.
          </motion.p>
        </div>

        {/* Editorial Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onSelectService(service.title)}
              className="group relative bg-[#F5F2EB] p-8 md:p-10 border border-[#331E14]/10 hover:border-[#331E14]/30 hover:bg-[#FAF8F5] transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden shadow-xs hover:shadow-[0_12px_32px_rgba(51,30,20,0.05)]"
            >
              {/* Subtle background numeral watermark */}
              <span className="absolute -right-4 -bottom-6 font-serif-luxury text-8xl md:text-9xl font-light text-[#331E14]/5 select-none transition-transform duration-500 group-hover:scale-105 group-hover:text-[#331E14]/8">
                {service.number}
              </span>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-xs font-semibold tracking-widest text-[#8A6D56]">
                    {service.number}
                  </span>
                  <div className="w-9 h-9 rounded-full border border-[#331E14]/15 flex items-center justify-center text-[#331E14] group-hover:bg-[#331E14] group-hover:text-[#FAF8F5] group-hover:border-[#331E14] transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                <h3 className="font-serif-luxury text-2xl md:text-3xl text-[#24150E] font-medium mb-3 group-hover:text-[#5A3825] transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs md:text-sm text-[#8A6D56] font-medium tracking-wide mb-4">
                  {service.tagline}
                </p>

                <p className="text-xs md:text-sm text-[#5A3825] font-light leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="relative z-10 pt-5 border-t border-[#331E14]/10 flex flex-wrap gap-x-4 gap-y-2 text-[11px] uppercase tracking-wider text-[#8A6D56]">
                {service.highlights.map((hl, hIdx) => (
                  <span key={hIdx} className="inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C4A47C]" />
                    <span>{hl}</span>
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
