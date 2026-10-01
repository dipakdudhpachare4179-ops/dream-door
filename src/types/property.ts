export interface Property {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  price: string;
  type: 'Villa' | 'Penthouse' | 'Modern Residence' | 'Waterfront Estate';
  bedrooms: number;
  bathrooms: number;
  area: string; // e.g. "6,400 sq.ft."
  description: string;
  architecturalNotes: string;
  amenities: string[];
  features: { label: string; value: string }[];
  image?: string; // Supplied custom photo field (e.g. "/images/property-01.jpg")
  images: string[];
  featured?: boolean;
  status: 'Available' | 'Private Viewing' | 'Under Offer';
  contactAgent: {
    name: string;
    role: string;
    phonePlaceholder: string;
    whatsappPlaceholder: string;
  };
  // Link to master plan plot
  plotNumber?: string;
  facing?: 'EAST' | 'WEST' | 'NORTH' | 'SOUTH';
  dimensions?: string;
  areaSqYd?: string;
  areaSqMtr?: string;
  plcCharge?: string;
}

export interface MasterPlanPlot {
  id: string;
  plotNumber: string; // e.g. "PLOT-44"
  propertyId: string;
  title: string;
  type: string;
  facing: 'EAST' | 'WEST' | 'NORTH' | 'SOUTH';
  areaSqYd: string; // "145.235 Sq.Yd."
  dimensions: string; // "20.59 × 63.49 Ft"
  areaSqMtr: string; // "121.434 Sq.Mtr"
  plcCharge: string; // "₹500 / Sq.Yd."
  status: 'Available' | 'Reserved' | 'Under Offer';
  price: string;
  row: number; // 1, 2, 3, 4
  col: number; // index along row
  x: number; // percentage on canvas (0-100)
  y: number; // percentage on canvas (0-100)
  width: number;
  height: number;
  image?: string;
}

export interface ServiceItem {
  number: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  location: string;
  propertyType: string;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: string;
}
