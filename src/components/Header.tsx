import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  onOpenProperties: () => void;
  onBookConsultation: () => void;
  onOpen3DView: () => void;
}

export default function Header({
  onNavigate,
  onOpenProperties,
  onBookConsultation,
  onOpen3DView
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: 'hero' },
    { label: 'Cinematic Entry', href: 'experience' },
    { label: '3D Master Plan', href: '3d-map' },
    { label: 'Properties', href: 'properties' },
    { label: 'Services', href: 'services' },
    { label: 'Gallery', href: 'gallery' },
    { label: 'Contact', href: 'contact' }
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href === '3d-map') {
      onOpen3DView();
    } else {
      onNavigate(href);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#331E14]/10 shadow-[0_4px_24px_rgba(51,30,20,0.03)] py-4'
            : 'bg-gradient-to-b from-black/60 via-black/25 to-transparent text-white py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Zone 1: Single element wordmark */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('hero');
            }}
            className={`font-serif-luxury text-xl md:text-2xl font-medium tracking-wide transition-colors ${
              isScrolled ? 'text-[#24150E] hover:text-[#331E14]' : 'text-white hover:text-[#FAF8F5]'
            }`}
          >
            Dream Door Properties
          </a>

          {/* Zone 2: Navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] tracking-wider uppercase font-medium">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href)}
                className={`transition-colors duration-200 cursor-pointer luxury-link-underline whitespace-nowrap ${
                  isScrolled
                    ? 'text-[#4A2C1D] hover:text-[#24150E]'
                    : 'text-white/85 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Primary action button + Mobile toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenProperties}
              className={`hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest transition-all duration-300 rounded-none cursor-pointer whitespace-nowrap border ${
                isScrolled
                  ? 'border-[#331E14] text-[#FAF8F5] bg-[#331E14] hover:bg-[#24150E] hover:border-[#24150E]'
                  : 'border-white/80 text-white bg-black/20 backdrop-blur-xs hover:bg-white hover:text-[#24150E]'
              }`}
            >
              <span>Explore Properties</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 transition-colors cursor-pointer ${
                isScrolled ? 'text-[#24150E]' : 'text-white'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu with Staggered Links */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-30 bg-[#FAF8F5] flex flex-col justify-between p-8 pt-28 lg:hidden"
          >
            <div className="flex flex-col gap-6">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#8A6D56]">
                Navigation Menu
              </span>
              <div className="flex flex-col gap-4">
                {navLinks.map((link, idx) => (
                  <motion.button
                    key={link.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.3 }}
                    onClick={() => handleLinkClick(link.href)}
                    className="text-left font-serif-luxury text-2xl text-[#24150E] hover:text-[#C4A47C] transition-colors py-1 cursor-pointer"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-[#331E14]/15 flex flex-col gap-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenProperties();
                }}
                className="w-full py-3.5 text-center text-xs uppercase tracking-widest font-semibold bg-[#331E14] text-[#FAF8F5] cursor-pointer"
              >
                Explore Properties
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookConsultation();
                }}
                className="w-full py-3.5 text-center text-xs uppercase tracking-widest font-semibold border border-[#331E14] text-[#331E14] hover:bg-[#331E14]/5 transition-colors cursor-pointer"
              >
                Request Consultation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
