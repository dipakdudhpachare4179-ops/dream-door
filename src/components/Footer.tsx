import { motion } from 'motion/react';
import { ArrowUp, Instagram } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export default function Footer({ onNavigate, onOpenPrivacy, onOpenTerms }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1C100B] text-[#FAF8F5] pt-28 pb-16 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Grand Closing Headline */}
        <div className="mb-24 pb-16 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C4A47C] block mb-4"
            >
              The Next Chapter
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-light text-[#FAF8F5] tracking-tight leading-none"
            >
              Let&apos;s Find Your Place.
            </motion.h2>
          </div>

          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            onClick={scrollToTop}
            className="self-start md:self-auto inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#FAF8F5]/70 hover:text-[#C4A47C] transition-colors cursor-pointer group"
          >
            <span>Back To Top</span>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#C4A47C] transition-colors">
              <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
            </div>
          </motion.button>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20 text-xs">
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4">
            <span className="font-serif-luxury text-2xl text-[#FAF8F5] block mb-4">
              {COMPANY_INFO.brandName}
            </span>
            <p className="text-[#FAF8F5]/70 font-light leading-relaxed mb-6 max-w-sm">
              Curated luxury residences, modern architectural villas, and bespoke property consultation. Every door opens to a new perspective.
            </p>
            <a
              href={COMPANY_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#C4A47C] hover:text-[#FAF8F5] transition-colors"
            >
              <Instagram className="w-4 h-4" />
              <span>@{COMPANY_INFO.instagramHandle}</span>
            </a>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#C4A47C] block mb-4">
              Navigation
            </span>
            <ul className="space-y-2.5 text-[#FAF8F5]/80 font-light">
              <li>
                <button
                  onClick={() => onNavigate('hero')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('experience')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Cinematic Entry
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('properties')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Properties
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#C4A47C] block mb-4">
              Private Advisory
            </span>
            <p className="text-[#FAF8F5]/80 font-light leading-relaxed">
              {COMPANY_INFO.contactPlaceholder.address}
            </p>
            <p className="text-[#FAF8F5]/80 font-light">
              {COMPANY_INFO.contactPlaceholder.phone}
            </p>
            <p className="text-[#FAF8F5]/80 font-light">
              {COMPANY_INFO.contactPlaceholder.email}
            </p>
          </div>

          {/* Discretion Note (2 cols) */}
          <div className="lg:col-span-2">
            <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#C4A47C] block mb-4">
              Discretion
            </span>
            <p className="text-[11px] text-[#FAF8F5]/60 font-light leading-relaxed">
              All client identities and proprietary transactions are protected under institutional privacy agreements.
            </p>
          </div>
        </div>

        {/* Legal & Copyright Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#FAF8F5]/50">
          <p>© {new Date().getFullYear()} {COMPANY_INFO.brandName}. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-[#FAF8F5] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={onOpenTerms}
              className="hover:text-[#FAF8F5] transition-colors cursor-pointer"
            >
              Terms of Advisory
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
