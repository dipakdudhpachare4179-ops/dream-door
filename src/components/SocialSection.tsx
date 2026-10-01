import { motion } from 'motion/react';
import { Instagram, ArrowUpRight } from 'lucide-react';
import { INSTAGRAM_POSTS, COMPANY_INFO } from '../data/content';
import OptimizedImage from './OptimizedImage';

export default function SocialSection() {
  return (
    <section className="py-24 md:py-32 bg-[#F5F2EB] text-[#24150E] overflow-hidden border-b border-[#331E14]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 mb-4"
            >
              <Instagram className="w-4 h-4 text-[#C4A47C]" />
              <span className="text-xs uppercase tracking-[0.26em] font-semibold text-[#8A6D56]">
                @{COMPANY_INFO.instagramHandle}
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif-luxury text-3xl sm:text-5xl text-[#24150E] font-light leading-tight tracking-tight"
            >
              Follow The Journey
            </motion.h2>
          </div>

          <a
            href={COMPANY_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#331E14] text-[#FAF8F5] text-xs uppercase tracking-widest font-semibold hover:bg-[#24150E] transition-colors cursor-pointer self-start md:self-auto"
          >
            <span>Follow Us On Instagram</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Visual Instagram Feed Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {INSTAGRAM_POSTS.map((post, idx) => (
            <motion.a
              key={post.id}
              href={COMPANY_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative aspect-square overflow-hidden bg-[#24150E]/10 border border-[#331E14]/10 cursor-pointer"
            >
              <OptimizedImage
                src={post.imageUrl}
                alt="Instagram feed preview"
                sizes="(max-width: 640px) 50vw, 25vw"
                widths={[320, 480, 640]}
                width={400}
                height={400}
                quality={75}
                priority={false}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />

              {/* Hover overlay with caption */}
              <div className="absolute inset-0 bg-[#24150E]/80 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-between text-white">
                <div className="flex items-center justify-between text-xs text-[#C4A47C]">
                  <Instagram className="w-4 h-4" />
                  <span className="font-mono text-[10px] uppercase tracking-wider">
                    {post.likes}
                  </span>
                </div>
                <p className="text-xs text-[#FAF8F5]/90 font-light leading-relaxed line-clamp-3">
                  {post.caption}
                </p>
                <div className="text-[10px] uppercase tracking-widest text-[#E8DFC8]">
                  View on Instagram →
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
