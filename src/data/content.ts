import { ServiceItem, TestimonialItem, InstagramPost } from '../types/property';

export const COMPANY_INFO = {
  brandName: 'Dream Door Properties',
  tagline: 'Find a Place Worth Coming Home To.',
  introHeading: 'More Than A Property. A Place To Belong.',
  introParagraph:
    'At Dream Door Properties, we understand that finding an exceptional home is never simply a transaction—it is the discovery of a sanctuary aligned with how you choose to live. Our curated advisory brings together rare architectural estates, discrete private consultations, and transparent guidance at every chapter.',
  instagramHandle: 'dream_door_properties',
  instagramUrl: 'https://www.instagram.com/dream_door_properties/?__pwa=1',
  contactPlaceholder: {
    phone: '+1 (555) 019-2834',
    email: 'advisory@dreamdoorproperties.com',
    address: 'Private Advisory Suite, Financial & Design District',
    hours: 'Monday – Saturday: 09:00 – 19:00 By Appointment',
    whatsapp: 'https://wa.me/15550192834'
  }
};

export const SERVICES: ServiceItem[] = [
  {
    number: '01',
    title: 'Property Discovery',
    tagline: 'Tailored architectural search matching life ethos.',
    description:
      'We curate access to premier private listings and architectural residences filtered to your exact spatial and lifestyle aspirations.',
    highlights: ['Bespoke Property Shortlisting', 'Off-Market Private Portfolios', 'Neighborhood Demographics Analysis']
  },
  {
    number: '02',
    title: 'Private Acquisitions',
    tagline: 'Discrete representation for high-value properties.',
    description:
      'Guiding buyers through sophisticated deal structures, strategic valuation assessment, and confidential negotiations from initial viewing to final deed.',
    highlights: ['Confidential Representation', 'Comparative Market Valuation', 'Transaction Contract Oversight']
  },
  {
    number: '03',
    title: 'Property Selling & Advisory',
    tagline: 'High-impact editorial presentation for distinguished homes.',
    description:
      'Showcasing architecturally significant properties through cinematic visual production, editorial curation, and qualified buyer networks.',
    highlights: ['Cinematic Visual Marketing', 'Qualified Buyer Matching', 'Discretion & Privacy Protocols']
  },
  {
    number: '04',
    title: 'Private Site Visits',
    tagline: 'Immersive, unhurried property walkthroughs.',
    description:
      'Experiencing a residence requires time and perspective. We coordinate seamless private viewings tailored to your schedule and privacy preferences.',
    highlights: ['Private Chauffeur Coordination (Optional)', 'Architectural Deep-Dive', 'Flexible Viewing Hours']
  }
];

export const TRUST_POINTS = [
  {
    number: '01',
    title: 'Curated Properties',
    description:
      'Every residence in our portfolio undergoes stringent architectural and legal evaluation, ensuring unmatched spatial character and craftsmanship.'
  },
  {
    number: '02',
    title: 'Personalised Assistance',
    description:
      'We prioritize individual client vision over volume, delivering dedicated one-on-one attention throughout your property search and closing.'
  },
  {
    number: '03',
    title: 'Transparent Communication',
    description:
      'Clarity is paramount. We provide candid property assessments, clear documentation timelines, and unvarnished market context.'
  },
  {
    number: '04',
    title: 'End-to-End Support',
    description:
      'From the initial consultation through key handover and settlement, our advisory ensures a seamless, stress-free transition.'
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't-01',
    quote:
      'Dream Door Properties took the time to understand the nuances of what our family needed—not merely square footage, but light, flow, and privacy. The acquisition was seamless and handled with absolute discretion.',
    author: 'Private Client (Placeholder)',
    location: 'Residential Acquisition',
    propertyType: 'Contemporary Villa'
  },
  {
    id: 't-02',
    quote:
      'The attention to detail in their presentation and the respect for our privacy made working with Dream Door Properties an effortless experience. Truly an editorial-standard consultancy.',
    author: 'Homeowner (Placeholder)',
    location: 'Property Advisory',
    propertyType: 'Penthouse Residence'
  },
  {
    id: 't-03',
    quote:
      'From our first site visit to the signature, every milestone was executed with calm precision and total transparency. We found our forever home through their careful curation.',
    author: 'Family Office Representative (Placeholder)',
    location: 'Private Purchase',
    propertyType: 'Waterfront Estate'
  }
];

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'ig-01',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=75&fm=webp',
    caption: 'Sunlight washing over travertine pavilions. Architectural harmony in every angle. #DreamDoorProperties',
    likes: 'Curated'
  },
  {
    id: 'ig-02',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=75&fm=webp',
    caption: 'Double-height volume with bespoke walnut accents. Finding spaces worth coming home to.',
    likes: 'Editorial'
  },
  {
    id: 'ig-03',
    imageUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=75&fm=webp',
    caption: 'Evening calm at the courtyard pool. Modern living defined by stillness. #LuxuryRealEstate',
    likes: 'Showcase'
  },
  {
    id: 'ig-04',
    imageUrl: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=75&fm=webp',
    caption: 'Private viewing arranged. Every door opens to a new perspective.',
    likes: 'Featured'
  }
];

export const GALLERY_IMAGES = [
  {
    id: 'g-01',
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=75&fm=webp',
    title: 'The Solstice Pavilion',
    category: 'Architecture · Exterior',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 'g-02',
    src: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=75&fm=webp',
    title: 'Skybridge Living Salon',
    category: 'Interior · Foyer',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 'g-03',
    src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=75&fm=webp',
    title: 'Courtyard Reflection Pool',
    category: 'Landscape · Water Feature',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 'g-04',
    src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=75&fm=webp',
    title: 'Minimalist Chef Kitchen',
    category: 'Culinary · Detail',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 'g-05',
    src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=75&fm=webp',
    title: 'Shoreline Waterfront Deck',
    category: 'Terrace · Sunset',
    aspect: 'aspect-[16/9]'
  },
  {
    id: 'g-06',
    src: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=75&fm=webp',
    title: 'Primary Sanctuary Suite',
    category: 'Bedroom · Suite',
    aspect: 'aspect-[4/3]'
  }
];
