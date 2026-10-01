import { motion, AnimatePresence } from 'motion/react';
import { X, Shield } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export default function LegalModal({ type, onClose }: LegalModalProps) {
  if (!type) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl bg-[#FAF8F5] text-[#24150E] p-8 md:p-10 border border-[#331E14]/15 shadow-2xl"
        >
          <div className="flex items-center justify-between pb-6 border-b border-[#331E14]/10 mb-6">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-[#C4A47C]" />
              <h3 className="font-serif-luxury text-2xl text-[#24150E]">
                {type === 'privacy' ? 'Client Privacy Protocol' : 'Terms of Real Estate Advisory'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#5A3825] hover:text-[#24150E] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4 text-xs text-[#5A3825] font-light leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
            {type === 'privacy' ? (
              <>
                <p>
                  At <strong>{COMPANY_INFO.brandName}</strong>, client discretion is the bedrock of our practice. We maintain strict confidentiality protocols regarding all inquiries, property visits, financial assessments, and acquired portfolios.
                </p>
                <h4 className="font-serif-luxury text-base text-[#24150E] pt-2">
                  Information Collection &amp; Use
                </h4>
                <p>
                  Contact information provided through consultation forms is used strictly to coordinate requested viewings and provide tailored architectural dossiers. We never sell, lease, or monetize your contact records with third-party advertising networks.
                </p>
                <h4 className="font-serif-luxury text-base text-[#24150E] pt-2">
                  Confidential Property Viewings
                </h4>
                <p>
                  Private walkthroughs are scheduled under non-disclosure provisions when requested by either seller or buyer to protect family privacy and estate security.
                </p>
              </>
            ) : (
              <>
                <p>
                  Welcome to <strong>{COMPANY_INFO.brandName}</strong>. By exploring this portfolio, you acknowledge that all property specifications, architectural measurements, and pricing indications are subject to contract verification and availability.
                </p>
                <h4 className="font-serif-luxury text-base text-[#24150E] pt-2">
                  Advisory Services
                </h4>
                <p>
                  Our consultancy provides property representation, search advisory, and private negotiation coordination. Legal deed transfers and conveyance are completed in coordination with certified legal counsels in the property jurisdiction.
                </p>
                <h4 className="font-serif-luxury text-base text-[#24150E] pt-2">
                  Intellectual &amp; Architectural Media
                </h4>
                <p>
                  Architectural photography, blueprints, floor plans, and editorial text presented herein are protected assets. Unauthorized commercial distribution is prohibited.
                </p>
              </>
            )}
          </div>

          <div className="pt-6 mt-6 border-t border-[#331E14]/10 text-right">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#331E14] text-[#FAF8F5] text-xs uppercase tracking-widest font-semibold hover:bg-[#24150E] transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
