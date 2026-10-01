import { motion } from 'motion/react';
import { Compass, UserCheck, FileText, CheckCircle } from 'lucide-react';
import { TRUST_POINTS } from '../data/content';

export default function WhyDreamDoor() {
  const icons = [Compass, UserCheck, FileText, CheckCircle];

  return (
    <section className="py-28 md:py-36 bg-[#F5F2EB] text-[#24150E] overflow-hidden border-b border-[#331E14]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <span className="w-5 h-[1px] bg-[#C4A47C]" />
            <span className="text-xs uppercase tracking-[0.26em] font-semibold text-[#8A6D56]">
              Our Guiding Principles
            </span>
            <span className="w-5 h-[1px] bg-[#C4A47C]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#24150E] font-light leading-tight tracking-tight"
          >
            Guiding You From Search To Signature.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-[#5A3825] font-light mt-4"
          >
            A deliberate philosophy built on discretion, architectural acumen, and unwavering client advocacy.
          </motion.p>
        </div>

        {/* 4 Trust Points Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TRUST_POINTS.map((point, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <motion.div
                key={point.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#FAF8F5] p-8 border border-[#331E14]/10 hover:border-[#331E14]/30 hover:shadow-[0_12px_30px_rgba(51,30,20,0.04)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-semibold text-[#8A6D56]">
                      {point.number}
                    </span>
                    <Icon className="w-5 h-5 text-[#C4A47C]" />
                  </div>

                  <h3 className="font-serif-luxury text-xl md:text-2xl text-[#24150E] font-medium mb-3">
                    {point.title}
                  </h3>

                  <p className="text-xs md:text-sm text-[#5A3825] font-light leading-relaxed">
                    {point.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#331E14]/10 flex items-center justify-between text-[10px] uppercase tracking-widest text-[#8A6D56]">
                  <span>Protocol {point.number}</span>
                  <span className="text-[#C4A47C]">Standard</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
