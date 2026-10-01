import { motion } from 'motion/react';
import { COMPANY_INFO } from '../data/content';

export default function Introduction() {
  return (
    <section className="py-28 md:py-36 bg-[#FAF8F5] text-[#24150E] overflow-hidden border-b border-[#331E14]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Editorial Sub-header Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-3 mb-8"
        >
          <span className="w-6 h-[1px] bg-[#C4A47C]" />
          <span className="text-xs uppercase tracking-[0.26em] font-semibold text-[#8A6D56]">
            {COMPANY_INFO.brandName}
          </span>
        </motion.div>

        {/* 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Grand Editorial Heading */}
          <div className="lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#24150E] font-normal leading-[1.14] tracking-tight"
            >
              More Than A Property.
              <br />
              <span className="italic font-light text-[#5A3825]">A Place To Belong.</span>
            </motion.h2>
          </div>

          {/* Right Column: Statement & Perspective */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-base md:text-lg text-[#5A3825] font-light leading-relaxed mb-8"
            >
              {COMPANY_INFO.introParagraph}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.85, delay: 0.35 }}
              className="flex items-center gap-6 text-xs uppercase tracking-widest text-[#8A6D56] font-medium"
            >
              <span>Sanctuary</span>
              <span aria-hidden="true">·</span>
              <span>Architecture</span>
              <span aria-hidden="true">·</span>
              <span>Discretion</span>
            </motion.div>
          </div>
        </div>

        {/* Decorative Animated Line drawing horizontally */}
        <div className="mt-20 overflow-hidden">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="h-[1px] bg-gradient-to-r from-[#C4A47C]/20 via-[#331E14]/30 to-[#C4A47C]/20 origin-left"
          />
        </div>
      </div>
    </section>
  );
}
