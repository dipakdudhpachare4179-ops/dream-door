import { Property } from '../types/property';

export const PROPERTIES: Property[] = [
  {
    id: 'prop-01',
    title: 'The Solstice Villa',
    subtitle: 'Contemporary Architectural Sanctuary',
    location: 'Beverly Crest Enclave, California',
    price: '$12,850,000',
    type: 'Villa',
    bedrooms: 5,
    bathrooms: 7,
    area: '7,800 sq.ft.',
    description:
      'A masterpiece of contemporary residential engineering. Defined by cantilevered dark chocolate walnut timber eaves, vein-matched travertine courtyards, and seamless glass horizons. Built around a central reflection pool, this home dissolves the boundary between serene botanical surroundings and bespoke interior living.',
    architecturalNotes:
      'Designed with thermal-efficient double-glazed low-iron glass, reclaimed teak wall treatments, and smart circadian lighting systems throughout.',
    amenities: [
      'Infinity Horizon Edge Pool',
      'Temperature-Controlled Wine Cellar',
      'Private Wellness Suite & Sauna',
      'Bespoke Valcucine Italian Kitchen',
      'Subterranean 4-Vehicle Gallery',
      'Automated Solar Screening'
    ],
    features: [
      { label: 'Year of Completion', value: '2024' },
      { label: 'Lot Size', value: '0.68 Acres' },
      { label: 'Ceiling Height', value: '14.5 ft' },
      { label: 'Exposure', value: 'South-Southwest' }
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=75&fm=webp',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=75&fm=webp',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=75&fm=webp',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1400&q=75&fm=webp'
    ],
    featured: true,
    status: 'Available',
    contactAgent: {
      name: 'Advisory Team',
      role: 'Private Portfolio Director',
      phonePlaceholder: '+1 (555) 019-2834',
      whatsappPlaceholder: 'https://wa.me/15550192834'
    }
  },
  {
    id: 'prop-02',
    title: 'The Skybridge Penthouse',
    subtitle: 'Duplex Horizon Residence',
    location: 'Metropolitan Park Quarter',
    price: '$8,400,000',
    type: 'Penthouse',
    bedrooms: 4,
    bathrooms: 5,
    area: '5,450 sq.ft.',
    description:
      'Commanding unobstructed 270-degree skyline vistas, this private sky residence marries dark espresso oak joinery with creamy limestone slabs. Features a double-height grand salon with a floating sculptural staircase and a 900-square-foot wrap-around twilight terrace.',
    architecturalNotes:
      'Custom acoustic insulation, private elevator foyer with biometric access, and integrated motorized blackout louvers.',
    amenities: [
      'Private High-Speed Elevator',
      'Sky Lounge with Fire Hearth',
      'Chef-Grade Gaggenau Suite',
      'Wrap-Around Sunset Terrace',
      '24/7 Dedicated Concierge',
      'Dual Private Valet Bays'
    ],
    features: [
      { label: 'Floor Level', value: '48th & 49th' },
      { label: 'Terrace Area', value: '920 sq.ft.' },
      { label: 'Ceiling Clearance', value: '21 ft Foyer' },
      { label: 'View Angle', value: 'Panoramic Skyline' }
    ],
    images: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=75&fm=webp',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=75&fm=webp',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=75&fm=webp'
    ],
    featured: false,
    status: 'Available',
    contactAgent: {
      name: 'Advisory Team',
      role: 'High-Rise Specialist',
      phonePlaceholder: '+1 (555) 019-2834',
      whatsappPlaceholder: 'https://wa.me/15550192834'
    }
  },
  {
    id: 'prop-03',
    title: 'Aura Modernist Estate',
    subtitle: 'Minimalist Family Compound',
    location: 'Pinecrest Woodlands',
    price: '$9,950,000',
    type: 'Modern Residence',
    bedrooms: 6,
    bathrooms: 6,
    area: '8,200 sq.ft.',
    description:
      'Conceived as an intimate modern courtyard villa, the Aura Estate orchestrates light and natural materials into a serene domestic retreat. Warm chocolate stained cedar louvers provide passive shading while framing mature heritage olive trees.',
    architecturalNotes:
      'Geothermal climate regulation, natural rainwater harvesting reservoir, and hand-finished lime plaster walls.',
    amenities: [
      'Central Courtyard with Olive Grove',
      'Heated 25m Lap Pool',
      'Detached Guest Pavillion',
      'Screening Room with Dolby Atmos',
      'Organic Herb Garden & Orchard',
      'High-Speed EV Charging Hub'
    ],
    features: [
      { label: 'Grounds', value: '1.2 Acres' },
      { label: 'Main House', value: '6,900 sq.ft.' },
      { label: 'Guest Villa', value: '1,300 sq.ft.' },
      { label: 'Energy Rating', value: 'Net Zero Ready' }
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=75&fm=webp',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1400&q=75&fm=webp',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=75&fm=webp'
    ],
    featured: false,
    status: 'Private Viewing',
    contactAgent: {
      name: 'Advisory Team',
      role: 'Estate Acquisitions',
      phonePlaceholder: '+1 (555) 019-2834',
      whatsappPlaceholder: 'https://wa.me/15550192834'
    }
  },
  {
    id: 'prop-04',
    title: 'The Shoreline Pavilion',
    subtitle: 'Waterfront Architectural Residence',
    location: 'Coastal Point Bay',
    price: '$15,400,000',
    type: 'Waterfront Estate',
    bedrooms: 5,
    bathrooms: 7,
    area: '9,100 sq.ft.',
    description:
      'Perched directly overlooking private coastal waters, this residence celebrates maritime serenity with expansive chocolate teak boardwalks, full-height motorized glass walls, and a private dock capable of accommodating a 60-foot yacht.',
    architecturalNotes:
      'Marine-grade structural steel and bronze hardware, saltwater-resistant timber decking, and motorized storm protection.',
    amenities: [
      'Private Deepwater Mooring & Pier',
      'Dual-Level Seaside Pool',
      'Al-Fresco Outdoor Culinary Kitchen',
      'Primary Suite with Ocean Panorama',
      'Wine & Tasting Vault',
      'Private Security Gatehouse'
    ],
    features: [
      { label: 'Water Frontage', value: '180 Linear ft' },
      { label: 'Dock Capacity', value: 'Up to 60 ft' },
      { label: 'Pool Surface', value: 'Infinity Edge Heated' },
      { label: 'Security', value: '24/7 Monitored Access' }
    ],
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=75&fm=webp',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=75&fm=webp',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=75&fm=webp'
    ],
    featured: false,
    status: 'Available',
    contactAgent: {
      name: 'Advisory Team',
      role: 'Waterfront Specialist',
      phonePlaceholder: '+1 (555) 019-2834',
      whatsappPlaceholder: 'https://wa.me/15550192834'
    }
  }
];
