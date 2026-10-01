import { motion } from 'motion/react';
import { Box, Sparkles, ArrowRight } from 'lucide-react';
import { Property } from '../types/property';

interface Floating3DViewTriggerProps {
  selectedProperty: Property | null;
  onOpen3DView: (property: Property) => void;
}

export default function Floating3DViewTrigger({
  selectedProperty,
  onOpen3DView
}: Floating3DViewTriggerProps) {
  if (!selectedProperty) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 30, scale: 0.9 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-8 right-8 z-40"
    >
      <button
        onClick={() => onOpen3DView(selectedProperty)}
        className="group flex items-center gap-3.5 bg-[#FAF8F5] text-[#24150E] pl-4 pr-5 py-3 rounded-full border border-[#331E14]/15 shadow-[0_12px_36px_rgba(51,30,20,0.18)] hover:shadow-[0_16px_44px_rgba(51,30,20,0.25)] hover:border-[#331E14]/35 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
        title="Open interactive 3D master-plan visualization"
      >
        {/* Isometric 3D Cube Icon Container */}
        <div className="w-9 h-9 rounded-full bg-[#331E14] text-[#FAF8F5] flex items-center justify-center shadow-inner group-hover:scale-108 transition-transform">
          <Box className="w-4 h-4 text-[#C4A47C]" />
        </div>

        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#331E14]">
              3D View
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C4A47C] animate-pulse" />
          </div>
          <span className="text-[10px] text-[#8A6D56] font-medium tracking-wide truncate max-w-[130px]">
            {selectedProperty.plotNumber || selectedProperty.title}
          </span>
        </div>

        <ArrowRight className="w-4 h-4 text-[#8A6D56] group-hover:text-[#331E14] group-hover:translate-x-1 transition-all" />
      </button>
    </motion.div>
  );
}
