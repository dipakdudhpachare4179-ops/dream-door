import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Bed,
  Bath,
  Maximize2,
  Calendar,
  Phone,
  MessageCircle,
  Share2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  MapPin,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Property } from '../types/property';
import OptimizedImage from './OptimizedImage';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  onScheduleVisit: (propertyTitle: string) => void;
}

export default function PropertyDetailModal({
  property,
  onClose,
  onScheduleVisit
}: PropertyDetailModalProps) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [enquirySent, setEnquirySent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: ''
  });

  if (!property) return null;

  // Ensure supplied custom photo takes primary position
  const displayImages = property.image
    ? [property.image, ...property.images.filter((img) => img !== property.image)]
    : property.images;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnquirySent(true);
    setTimeout(() => {
      setEnquirySent(false);
      onClose();
    }, 2800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex justify-center p-0 md:p-6 lg:p-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-6xl bg-[#FAF8F5] text-[#24150E] shadow-2xl my-auto overflow-hidden border border-[#331E14]/15"
        >
          {/* Header Action Bar */}
          <div className="sticky top-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-md px-6 py-4 border-b border-[#331E14]/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-[0.24em] font-semibold text-[#8A6D56]">
                Property Dossier
              </span>
              <span aria-hidden="true" className="text-[#331E14]/20">·</span>
              <span className="text-xs uppercase tracking-wider text-[#5A3825] font-medium">
                {property.status}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="p-2 text-[#5A3825] hover:text-[#24150E] hover:bg-[#331E14]/5 transition-colors cursor-pointer"
                title="Share Property"
              >
                <Share2 className="w-4 h-4" />
              </button>
              {copiedLink && (
                <span className="text-xs text-[#8A6D56] font-medium animate-fade-in">
                  Link Copied
                </span>
              )}
              <button
                onClick={onClose}
                className="p-2 text-[#5A3825] hover:text-[#24150E] hover:bg-[#331E14]/5 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6 md:p-10 max-h-[85vh] overflow-y-auto">
            {/* Gallery Viewport */}
            <div className="mb-10">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#24150E]">
                <OptimizedImage
                  src={displayImages[activeImageIdx] || property.images[0]}
                  alt={`${property.title} view ${activeImageIdx + 1}`}
                  sizes="(max-width: 1024px) 100vw, 1100px"
                  widths={[640, 960, 1200, 1600]}
                  width={1200}
                  height={675}
                  quality={78}
                  priority={true}
                  className="w-full h-full object-cover object-center transition-all duration-500"
                />

                {/* Left/Right image switcher */}
                {displayImages.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setActiveImageIdx((prev) =>
                          prev === 0 ? displayImages.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/40 text-white hover:bg-black/70 backdrop-blur-xs transition-colors cursor-pointer"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() =>
                        setActiveImageIdx((prev) =>
                          prev === displayImages.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/40 text-white hover:bg-black/70 backdrop-blur-xs transition-colors cursor-pointer"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Counter */}
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-xs px-3 py-1 text-white text-xs font-mono">
                  {activeImageIdx + 1} / {displayImages.length}
                </div>
              </div>

              {/* Thumbnails row */}
              {displayImages.length > 1 && (
                <div className="grid grid-cols-4 gap-3 mt-3">
                  {displayImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`relative aspect-[16/10] overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImageIdx === idx
                          ? 'border-[#331E14] opacity-100'
                          : 'border-transparent opacity-60 hover:opacity-90'
                      }`}
                    >
                      <OptimizedImage
                        src={img}
                        alt={`${property.title} thumbnail ${idx + 1}`}
                        sizes="25vw"
                        widths={[200, 360]}
                        width={300}
                        height={180}
                        quality={70}
                        priority={false}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Split Content: Overview & Sticky Enquiry Column */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Column (8 cols): Property Narrative & Specs */}
              <div className="lg:col-span-8 space-y-10">
                {/* Title & Price Header */}
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8A6D56] font-medium mb-2">
                    <MapPin className="w-3.5 h-3.5 text-[#C4A47C]" />
                    <span>{property.location}</span>
                  </div>
                  <h1 className="font-serif-luxury text-3xl md:text-5xl font-normal text-[#24150E] leading-tight mb-3">
                    {property.title}
                  </h1>

                  {property.plotNumber && (
                    <div className="mb-4 inline-flex flex-wrap items-center gap-3 px-3 py-1.5 bg-[#FAF1E6] border border-[#E07830]/40 text-xs text-[#A25022] font-mono">
                      <span className="font-bold">● {property.plotNumber}</span>
                      {property.facing && <span>· {property.facing} FACING</span>}
                      {property.areaSqYd && <span>· {property.areaSqYd}</span>}
                      {property.dimensions && <span>· {property.dimensions}</span>}
                      {property.plcCharge && <span>· PLC: {property.plcCharge}</span>}
                    </div>
                  )}

                  <p className="text-base text-[#5A3825] font-light italic mb-4">
                    {property.subtitle}
                  </p>
                  <div className="font-serif-luxury text-2xl md:text-3xl text-[#331E14] font-medium">
                    {property.price}
                  </div>
                </div>

                {/* Key Architectural Metrics */}
                <div className="grid grid-cols-3 gap-4 py-6 border-y border-[#331E14]/10">
                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-wider text-[#8A6D56] font-medium mb-1">
                      Bedrooms
                    </span>
                    <div className="flex items-center gap-2 text-lg font-serif-luxury text-[#24150E]">
                      <Bed className="w-4 h-4 text-[#C4A47C]" />
                      <span>{property.bedrooms} Suites</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-wider text-[#8A6D56] font-medium mb-1">
                      Bathrooms
                    </span>
                    <div className="flex items-center gap-2 text-lg font-serif-luxury text-[#24150E]">
                      <Bath className="w-4 h-4 text-[#C4A47C]" />
                      <span>{property.bathrooms} Baths</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-wider text-[#8A6D56] font-medium mb-1">
                      Built-up Area
                    </span>
                    <div className="flex items-center gap-2 text-lg font-serif-luxury text-[#24150E]">
                      <Maximize2 className="w-4 h-4 text-[#C4A47C]" />
                      <span>{property.area}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h2 className="text-xs uppercase tracking-[0.24em] font-semibold text-[#8A6D56] mb-4">
                    The Architectural Overview
                  </h2>
                  <p className="text-sm md:text-base text-[#5A3825] font-light leading-relaxed mb-6">
                    {property.description}
                  </p>
                  <div className="p-5 bg-[#F5F2EB] border-l-2 border-[#C4A47C]">
                    <span className="text-xs uppercase tracking-wider text-[#8A6D56] font-semibold block mb-1">
                      Design Notes &amp; Specifications
                    </span>
                    <p className="text-xs md:text-sm text-[#5A3825] font-light leading-relaxed">
                      {property.architecturalNotes}
                    </p>
                  </div>
                </div>

                {/* Amenities Grid */}
                <div>
                  <h2 className="text-xs uppercase tracking-[0.24em] font-semibold text-[#8A6D56] mb-5">
                    Curated Amenities &amp; Inclusions
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {property.amenities.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 bg-[#FAF8F5] border border-[#331E14]/10 text-xs text-[#24150E]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C4A47C] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Features table */}
                <div>
                  <h2 className="text-xs uppercase tracking-[0.24em] font-semibold text-[#8A6D56] mb-4">
                    Property Dossier Parameters
                  </h2>
                  <div className="divide-y divide-[#331E14]/10 border border-[#331E14]/10 bg-[#FAF8F5]">
                    {property.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3.5 text-xs"
                      >
                        <span className="text-[#8A6D56]">{feat.label}</span>
                        <span className="font-mono text-[#24150E] font-medium">
                          {feat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column (4 cols): Sticky Enquiry & Private Viewing Form */}
              <div className="lg:col-span-4">
                <div className="sticky top-20 bg-[#F5F2EB] p-6 md:p-7 border border-[#331E14]/15">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-4 h-4 text-[#C4A47C]" />
                    <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8A6D56]">
                      Private Advisory
                    </span>
                  </div>
                  <h3 className="font-serif-luxury text-2xl text-[#24150E] font-medium mb-2">
                    Schedule A Visit
                  </h3>
                  <p className="text-xs text-[#5A3825] font-light mb-6">
                    Private walkthroughs conducted with complete discretion and dedicated architectural consultation.
                  </p>

                  {enquirySent ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-5 bg-[#FAF8F5] border border-[#331E14]/20 text-center"
                    >
                      <CheckCircle2 className="w-8 h-8 text-[#C4A47C] mx-auto mb-2" />
                      <h4 className="font-serif-luxury text-lg text-[#24150E] mb-1">
                        Viewing Request Received
                      </h4>
                      <p className="text-xs text-[#5A3825] font-light">
                        Our private client team will connect shortly to finalize your itinerary.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleEnquirySubmit} className="space-y-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#8A6D56] font-medium mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="Your full name"
                          className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#331E14]/15 text-xs text-[#24150E] focus:outline-none focus:border-[#331E14]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#8A6D56] font-medium mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="client@sanctuary.com"
                          className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#331E14]/15 text-xs text-[#24150E] focus:outline-none focus:border-[#331E14]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#8A6D56] font-medium mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#331E14]/15 text-xs text-[#24150E] focus:outline-none focus:border-[#331E14]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#8A6D56] font-medium mb-1">
                          Preferred Viewing Date
                        </label>
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) =>
                            setFormData({ ...formData, date: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#331E14]/15 text-xs text-[#24150E] focus:outline-none focus:border-[#331E14]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#8A6D56] font-medium mb-1">
                          Private Notes / Confidential Inquiries
                        </label>
                        <textarea
                          rows={2}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          placeholder="Specific timing, privacy requirements or questions..."
                          className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#331E14]/15 text-xs text-[#24150E] focus:outline-none focus:border-[#331E14] resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 bg-[#331E14] text-[#FAF8F5] text-xs uppercase tracking-widest font-semibold hover:bg-[#24150E] transition-colors cursor-pointer"
                      >
                        Request Private Viewing
                      </button>
                    </form>
                  )}

                  {/* Direct Contact Alternatives */}
                  <div className="mt-6 pt-5 border-t border-[#331E14]/10 flex items-center justify-between">
                    <a
                      href={property.contactAgent.whatsappPlaceholder}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#331E14] hover:text-[#8A6D56] font-medium cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>WhatsApp</span>
                    </a>

                    <a
                      href={`tel:${property.contactAgent.phonePlaceholder}`}
                      className="inline-flex items-center gap-1.5 text-xs text-[#331E14] hover:text-[#8A6D56] font-medium cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#C4A47C]" />
                      <span>Direct Call</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
