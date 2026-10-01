import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Bed, Bath, Maximize2, Compass, Box } from 'lucide-react';
import { Property } from '../types/property';
import { PROPERTIES } from '../data/properties';
import OptimizedImage from './OptimizedImage';

interface PropertyCollectionProps {
  onSelectProperty: (property: Property) => void;
  onBookConsultation: (propertyTitle?: string) => void;
  onOpen3DView: (property: Property) => void;
}

export default function PropertyCollection({
  onSelectProperty,
  onBookConsultation,
  onOpen3DView
}: PropertyCollectionProps) {
  const [filterType, setFilterType] = useState<string>('All');

  const propertyTypes = ['All', 'Villa', 'Penthouse', 'Modern Residence', 'Waterfront Estate'];

  const filteredProperties =
    filterType === 'All'
      ? PROPERTIES
      : PROPERTIES.filter((p) => p.type === filterType);

  return (
    <section id="properties" className="py-28 md:py-36 bg-[#F5F2EB] text-[#24150E] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 mb-4"
            >
              <span className="w-5 h-[1px] bg-[#C4A47C]" />
              <span className="text-xs uppercase tracking-[0.26em] font-semibold text-[#8A6D56]">
                Curated Collection
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#24150E] font-light leading-tight tracking-tight"
            >
              Explore Our Properties
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-sm md:text-base text-[#5A3825] font-light mt-3 max-w-xl"
            >
              Curated spaces selected for modern living. Each residence represents uncompromising craftsmanship and privacy.
            </motion.p>
          </div>

          {/* Interactive Filter Segmented Control */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#FAF8F5] border border-[#331E14]/10 self-start md:self-auto">
            {propertyTypes.map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3.5 py-1.5 text-xs tracking-wider uppercase font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  filterType === type
                    ? 'bg-[#331E14] text-[#FAF8F5] shadow-xs'
                    : 'text-[#6B4B35] hover:text-[#24150E] hover:bg-[#331E14]/5'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Property Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
          {filteredProperties.map((property, idx) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-[#FAF8F5] border border-[#331E14]/10 flex flex-col justify-between hover:border-[#331E14]/30 hover:shadow-[0_16px_40px_rgba(51,30,20,0.06)] transition-all duration-400"
            >
              {/* Card Image Container with Hover Zoom */}
              <div
                onClick={() => onSelectProperty(property)}
                className="relative aspect-[16/10] overflow-hidden cursor-pointer bg-[#24150E]/5"
              >
                <OptimizedImage
                  src={property.images[0]}
                  alt={property.title}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  widths={[400, 640, 800, 1024]}
                  width={800}
                  height={500}
                  quality={75}
                  priority={false}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Subtle unboxed metadata overlay at bottom left */}
                <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-white text-xs font-medium tracking-wider">
                  <div className="flex items-center gap-2">
                    <span className="uppercase text-[11px] tracking-[0.2em] text-[#E8DFC8]">
                      {property.type}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="text-white/90">{property.status}</span>
                  </div>
                  <span className="font-serif-luxury text-base tracking-normal font-medium text-[#FAF8F5]">
                    {property.price}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 md:p-8 flex flex-col flex-1 justify-between">
                <div>
                  {/* Clean unboxed location metadata */}
                  <div className="flex items-center gap-2 text-xs text-[#8A6D56] uppercase tracking-wider mb-2 font-medium">
                    <span>{property.location}</span>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => onSelectProperty(property)}
                    className="font-serif-luxury text-2xl md:text-3xl text-[#24150E] font-medium group-hover:text-[#5A3825] transition-colors cursor-pointer mb-2"
                  >
                    {property.title}
                  </h3>

                  <p className="text-xs md:text-sm text-[#5A3825] font-light line-clamp-2 leading-relaxed mb-6">
                    {property.description}
                  </p>
                </div>

                {/* Specifications Bar (Clean unboxed text with subtle icons and dividers) */}
                <div className="pt-5 border-t border-[#331E14]/10 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-[#5A3825] font-light">
                    <span className="inline-flex items-center gap-1.5">
                      <Bed className="w-3.5 h-3.5 text-[#8A6D56]" />
                      <span>{property.bedrooms} Beds</span>
                    </span>
                    <span aria-hidden="true" className="text-[#331E14]/20">·</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Bath className="w-3.5 h-3.5 text-[#8A6D56]" />
                      <span>{property.bathrooms} Baths</span>
                    </span>
                    <span aria-hidden="true" className="text-[#331E14]/20">·</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5 text-[#8A6D56]" />
                      <span>{property.area}</span>
                    </span>
                  </div>

                  {/* Action Links */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpen3DView(property);
                      }}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] uppercase tracking-wider font-semibold text-[#8A6D56] hover:text-[#331E14] hover:bg-[#331E14]/5 transition-colors cursor-pointer border border-[#331E14]/15"
                      title="View on 3D Master Plan"
                    >
                      <Box className="w-3 h-3 text-[#C4A47C]" />
                      <span>3D View</span>
                    </button>

                    <button
                      onClick={() => onSelectProperty(property)}
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#331E14] group-hover:text-[#8A6D56] transition-colors cursor-pointer"
                    >
                      <span>View Property</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA block */}
        <div className="mt-16 text-center">
          <p className="text-xs uppercase tracking-widest text-[#8A6D56] mb-4">
            Seeking an off-market or bespoke architectural brief?
          </p>
          <button
            onClick={() => onBookConsultation()}
            className="px-8 py-3.5 bg-[#331E14] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#24150E] transition-all cursor-pointer"
          >
            Request Private Search Brief
          </button>
        </div>
      </div>
    </section>
  );
}
