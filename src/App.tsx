/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import Hero from './components/Hero';
import CinematicHouseExperience from './components/CinematicHouseExperience';
import Introduction from './components/Introduction';
import PropertyCollection from './components/PropertyCollection';
import FeaturedProperty from './components/FeaturedProperty';
import Services from './components/Services';
import WhyDreamDoor from './components/WhyDreamDoor';
import MasonryGallery from './components/MasonryGallery';
import SocialSection from './components/SocialSection';
import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import PropertyDetailModal from './components/PropertyDetailModal';
import LegalModal from './components/LegalModal';
import Floating3DViewTrigger from './components/Floating3DViewTrigger';
import MasterPlan3D from './components/MasterPlan3D';
import { Property } from './types/property';
import { PROPERTIES } from './data/properties';
import { MASTER_PLAN_PLOTS } from './data/masterPlanData';

export default function App() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [consultationProperty, setConsultationProperty] = useState<string>('General Portfolio Consultation');
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  // 3D Master Plan state
  const [is3DViewOpen, setIs3DViewOpen] = useState(false);
  const [active3DPlotId, setActive3DPlotId] = useState('plot-44');

  // Initialize Lenis smooth scroll for luxury Awwwards-level scrolling
  useEffect(() => {
    let rafId: number;
    let lenisInstance: Lenis | null = null;

    try {
      lenisInstance = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.95
      });

      function raf(time: number) {
        lenisInstance?.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    } catch {
      // Fallback to standard scroll
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenisInstance?.destroy();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookConsultation = (propertyTitle?: string) => {
    if (propertyTitle) {
      setConsultationProperty(propertyTitle);
    }
    scrollToSection('contact');
  };

  // Open 3D Master Plan focused on a selected property
  const handleOpen3DViewForProperty = (prop: Property) => {
    // Find matching plot if available, or default to plot-44
    const matchingPlot = MASTER_PLAN_PLOTS.find(
      (p) => p.propertyId === prop.id || p.plotNumber === prop.plotNumber
    );
    if (matchingPlot) {
      setActive3DPlotId(matchingPlot.id);
    } else {
      setActive3DPlotId('plot-44');
    }
    setIs3DViewOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#24150E] selection:bg-[#3D2314] selection:text-[#FAF8F5] relative">
      {/* Subtle Desktop Luxury Custom Cursor */}
      <CustomCursor />

      {/* Sticky Luxury Header with 3D Master Plan nav item */}
      <Header
        onNavigate={scrollToSection}
        onOpenProperties={() => scrollToSection('properties')}
        onBookConsultation={() => handleBookConsultation()}
        onOpen3DView={() => setIs3DViewOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        onExploreProperties={() => scrollToSection('properties')}
        onGetInTouch={() => scrollToSection('contact')}
        onScrollToExperience={() => scrollToSection('experience')}
      />

      {/* Signature Cinematic House Entry Section */}
      <CinematicHouseExperience
        onExploreProperties={() => scrollToSection('properties')}
        onBookTour={() => handleBookConsultation('The Solstice Villa (Signature Experience)')}
      />

      {/* Introduction Section */}
      <Introduction />

      {/* Filterable Property Collection */}
      <PropertyCollection
        onSelectProperty={(prop) => setSelectedProperty(prop)}
        onBookConsultation={handleBookConsultation}
        onOpen3DView={handleOpen3DViewForProperty}
      />

      {/* Split-Screen Featured Property Showcase */}
      <FeaturedProperty
        onSelectProperty={(prop) => setSelectedProperty(prop)}
      />

      {/* Services Section */}
      <Services
        onSelectService={(serviceTitle) => handleBookConsultation(serviceTitle)}
      />

      {/* Why Dream Door Properties Section */}
      <WhyDreamDoor />

      {/* Masonry Architectural Gallery & Fullscreen Lightbox */}
      <MasonryGallery />

      {/* Testimonials Carousel */}
      <Testimonials />

      {/* Official Instagram Journey Section */}
      <SocialSection />

      {/* Consultation & Enquiry Section */}
      <ContactSection initialProperty={consultationProperty} />

      {/* Luxury Footer */}
      <Footer
        onNavigate={scrollToSection}
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
      />

      {/* Floating 3D View Button Trigger (Appears when any property is selected) */}
      <Floating3DViewTrigger
        selectedProperty={selectedProperty}
        onOpen3DView={handleOpen3DViewForProperty}
      />

      {/* Interactive 3D Master Plan Interface (Exact match to reference screenshot) */}
      <MasterPlan3D
        isOpen={is3DViewOpen}
        initialSelectedPlotId={active3DPlotId}
        onClose={() => setIs3DViewOpen(false)}
        onViewProperty={(prop) => {
          setSelectedProperty(prop);
        }}
        propertiesList={PROPERTIES}
      />

      {/* Property Detail Brochure Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onScheduleVisit={(title) => {
          setSelectedProperty(null);
          handleBookConsultation(title);
        }}
      />

      {/* Legal & Terms Modal */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}
