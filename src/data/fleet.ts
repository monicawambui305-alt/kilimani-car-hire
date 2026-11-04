export interface Vehicle {
  id: string;
  name: string;
  category: 'suv' | 'sedan' | 'van' | 'crossover';
  categoryLabel: string;
  tagline: string;
  plateNumber: string;
  dailyRateKes?: number | null;
  dailyRateUsd?: number | null;
  weeklyRateKes?: number | null;
  monthlyRateKes?: number | null;
  depositKes?: number | null;
  specs: {
    transmission: 'Automatic' | 'Manual';
    fuel: 'Diesel' | 'Petrol' | 'Hybrid';
    seats: number;
    drive: '4WD' | 'AWD' | 'FWD' | 'RWD';
    luggage: string;
    engine: string;
    consumption: string;
  };
  features: string[];
  idealFor: string[];
  authenticImage: string;
  showcaseImage: string;
  extraImages?: string[];
  available: boolean;
}

export const COMPANY_INFO = {
  name: 'Prime Carhire',
  tagline: 'Premier Executive & Safari Fleet on Ojijo Rd, Nairobi',
  phone: '0104 709282',
  phoneInternational: '+254104709282',
  whatsappUrl: 'https://wa.me/254104709282?text=Hello%20Prime%20Carhire%20Ojijo%20Rd%2C%20I%20would%20like%20to%20inquire%20about%20renting%20a%20vehicle.',
  address: 'Ojijo Rd, Parklands / Westlands, Nairobi, Kenya',
  plusCode: 'PRJ6+XJ Nairobi',
  hours: 'Open · Closes 4:00 PM (24/7 WhatsApp & Airport Dispatch)',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=PRJ6%2BXJ+Nairobi'
};

export const FLEET_DATA: Vehicle[] = [
  {
    id: 'toyota-landcruiser-v8',
    name: 'Toyota Land Cruiser V8 200 Series ZX',
    category: 'suv',
    categoryLabel: 'VIP Flagship 4WD SUV',
    tagline: 'Presidential comfort, maximum road presence and effortless luxury',
    plateNumber: 'KDK 077B',
    dailyRateKes: null,
    dailyRateUsd: null,
    weeklyRateKes: null,
    monthlyRateKes: null,
    depositKes: null,
    specs: {
      transmission: 'Automatic',
      fuel: 'Diesel',
      seats: 7,
      drive: '4WD',
      luggage: '6 Large Bags',
      engine: '4.5L Twin-Turbo Diesel V8',
      consumption: '8.5 km/L'
    },
    features: [
      'Executive air suspension & bullet-proof durability',
      'Cool box center console refrigerator',
      'Premium JBL Synthesis surround sound',
      'Electric sunroof & ventilated leather seats',
      'Armored presence & privacy tinted windows'
    ],
    idealFor: [
      'State & VIP dignitary motorcades across Nairobi',
      'Executive airport pickups at JKIA Terminal 1',
      'High-end Maasai Mara and Amboseli safaris'
    ],
    authenticImage: '/assets/aistudio/Screenshot_2026-11-04_112436_43b5dbc1.png',
    showcaseImage: '/assets/aistudio/Screenshot_2026-11-04_112509_2fd92255.png',
    extraImages: [
      '/assets/aistudio/Screenshot_2026-11-04_112509_2fd92255.png',
      '/src/assets/images/toyota_prado_safari_expedition_1793562811687.jpg'
    ],
    available: true
  },
  {
    id: 'mercedes-benz-cclass',
    name: 'Mercedes-Benz C-Class / E-Class AMG Line',
    category: 'sedan',
    categoryLabel: 'Executive Luxury Sedan',
    tagline: 'Pristine German precision, refined prestige, and aerodynamic grace',
    plateNumber: 'KDM 754A',
    dailyRateKes: null,
    dailyRateUsd: null,
    weeklyRateKes: null,
    monthlyRateKes: null,
    depositKes: null,
    specs: {
      transmission: 'Automatic',
      fuel: 'Petrol',
      seats: 5,
      drive: 'RWD',
      luggage: '3 Large Bags',
      engine: '2.0L Turbocharged 9G-Tronic',
      consumption: '14.2 km/L'
    },
    features: [
      'AMG sports styling with alloy diamond wheels',
      'Ambient LED cabin illumination & Burmester audio',
      'Panoramic glass sunroof & dual climate zones',
      'Agility control adaptive suspension',
      'Distronic adaptive cruise control'
    ],
    idealFor: [
      'Corporate executive meetings in Westlands & Upper Hill',
      'Weddings and formal red-carpet events',
      'High-profile business dining and airport transfers'
    ],
    authenticImage: '/assets/aistudio/Screenshot_2026-11-04_112448_a6bfd6d9.png',
    showcaseImage: '/src/assets/images/fleet_showroom_luxury_1793603919585.jpg',
    extraImages: ['/src/assets/images/vip_airport_transfer_chauffeur_1793562812012.jpg'],
    available: true
  },
  {
    id: 'toyota-harrier-suv',
    name: 'Toyota Harrier Elegance Premium',
    category: 'suv',
    categoryLabel: 'Executive Crossover SUV',
    tagline: 'Dynamic eagle-eye silhouette, plush leather sanctuary, and smooth cruise',
    plateNumber: 'KDS 130K',
    dailyRateKes: null,
    dailyRateUsd: null,
    weeklyRateKes: null,
    monthlyRateKes: null,
    depositKes: null,
    specs: {
      transmission: 'Automatic',
      fuel: 'Petrol',
      seats: 5,
      drive: 'AWD',
      luggage: '4 Large Bags',
      engine: '2.0L Dual VVT-i Valvematic',
      consumption: '13.8 km/L'
    },
    features: [
      'Distinctive eagle emblem front fascia',
      'Wine-red / black contrast leather upholstery',
      'Power tailgate with hands-free foot sensor',
      'Multi-angle 360-degree parking assistance',
      'Quiet acoustic glass cabin'
    ],
    idealFor: [
      'Leisure weekends to Naivasha & Lake Elementaita',
      'Diplomats and NGO consultants staying in Parklands',
      'Smooth city commuting through Nairobi traffic'
    ],
    authenticImage: '/assets/aistudio/Screenshot_2026-11-04_112459_71b49cce.png',
    showcaseImage: '/src/assets/images/nairobi_expressway_drive_1793562810227.jpg',
    extraImages: ['/src/assets/images/hero_luxury_suv_kilimani_1793603898398.jpg'],
    available: true
  },
  {
    id: 'toyota-voxy-hybrid',
    name: 'Toyota Voxy / Noah Hybrid Executive',
    category: 'van',
    categoryLabel: 'VIP 7-Seater Hybrid MPV',
    tagline: 'Ultra-low emissions, whisper-quiet cabin, and first-class passenger comfort',
    plateNumber: 'KDX 183R',
    dailyRateKes: null,
    dailyRateUsd: null,
    weeklyRateKes: null,
    monthlyRateKes: null,
    depositKes: null,
    specs: {
      transmission: 'Automatic',
      fuel: 'Hybrid',
      seats: 7,
      drive: 'FWD',
      luggage: '6 Bags',
      engine: '1.8L Hybrid Synergy Drive',
      consumption: '21.5 km/L'
    },
    features: [
      'Dual power electric sliding doors',
      'Captain ottoman chairs in second row',
      'Superior 21+ km/L fuel savings',
      'Ceiling-mounted rear entertainment screen',
      'Low floor entry for family & elderly accessibility'
    ],
    idealFor: [
      'Family road trips & Airbnb vacationers',
      'VIP group airport transfers with bulky luggage',
      'Corporate team travel along the Nairobi Expressway'
    ],
    authenticImage: '/assets/aistudio/Screenshot_2026-11-04_112423_85a8c264.png',
    showcaseImage: '/src/assets/images/cockpit_dashboard_interior_1793603919741.jpg',
    available: true
  },
  {
    id: 'toyota-noah-esquire',
    name: 'Toyota Noah / Esquire Luxury Coach',
    category: 'van',
    categoryLabel: 'Executive Group Carrier',
    tagline: 'Generous multi-passenger cabin with refined executive appointments',
    plateNumber: 'KDR 548M',
    dailyRateKes: null,
    dailyRateUsd: null,
    weeklyRateKes: null,
    monthlyRateKes: null,
    depositKes: null,
    specs: {
      transmission: 'Automatic',
      fuel: 'Petrol',
      seats: 8,
      drive: 'FWD',
      luggage: '7 Bags',
      engine: '2.0L Valvematic Engine',
      consumption: '14.0 km/L'
    },
    features: [
      'Split-folding third-row bench for massive cargo',
      'Triple-zone air conditioning with nanoe purifier',
      'Keyless push start & remote dual power doors',
      'High driver seating position with clear visibility',
      'Reverse guide cameras with dynamic trajectory'
    ],
    idealFor: [
      'Large family relocations and holiday travel',
      'Church delegations & wedding convoy transport',
      'Group day tours to Nairobi National Park & Giraffe Centre'
    ],
    authenticImage: '/assets/aistudio/Screenshot_2026-11-04_112517_400098b9.png',
    showcaseImage: '/assets/aistudio/Screenshot_2026-11-04_112526_9d9eec96.png',
    available: true
  },
  {
    id: 'toyota-voxy-aerotourer',
    name: 'Toyota Voxy Aerotourer White Edition',
    category: 'van',
    categoryLabel: 'Luxury 8-Seater Van',
    tagline: 'Spacious touring vehicle built for extended journeys across Kenya',
    plateNumber: 'KDP 824M',
    dailyRateKes: null,
    dailyRateUsd: null,
    weeklyRateKes: null,
    monthlyRateKes: null,
    depositKes: null,
    specs: {
      transmission: 'Automatic',
      fuel: 'Petrol',
      seats: 8,
      drive: 'FWD',
      luggage: '6 Bags',
      engine: '2.0L Valvematic 4-Cylinder',
      consumption: '13.5 km/L'
    },
    features: [
      'Aerodynamic aero kit and alloy wheels',
      'Tinted privacy glass all around',
      'Dual sliding doors with one-touch opening',
      'Fold-flat seating converting to sleeper bed',
      'USB fast-charging ports across all rows'
    ],
    idealFor: [
      'Inter-county highway travel to Nakuru, Kisumu & Eldoret',
      'Airbnb guest shuttle service in Nairobi',
      'Photography and safari production crews'
    ],
    authenticImage: '/assets/aistudio/Screenshot_2026-11-04_112526_9d9eec96.png',
    showcaseImage: '/assets/aistudio/Screenshot_2026-11-04_112423_85a8c264.png',
    available: true
  },
  {
    id: 'toyota-prado-tx',
    name: 'Toyota Land Cruiser Prado TX/TZ 4x4',
    category: 'suv',
    categoryLabel: 'Heavy-Duty Safari 4x4 SUV',
    tagline: 'The undisputed master of rough African terrain and diplomatic travel',
    plateNumber: 'KDT Series',
    dailyRateKes: null,
    dailyRateUsd: null,
    weeklyRateKes: null,
    monthlyRateKes: null,
    depositKes: null,
    specs: {
      transmission: 'Automatic',
      fuel: 'Diesel',
      seats: 7,
      drive: '4WD',
      luggage: '5 Large Bags',
      engine: '2.8L D-4D Turbo Diesel',
      consumption: '10.5 km/L'
    },
    features: [
      'High ground clearance for safari trail conquest',
      'Full leather interior & multi-zone climate control',
      'Heavy-duty roof rails & tow hitch capacity',
      'Crawl Control & Multi-Terrain Select (MTS)',
      'High-strength underbody armor protection'
    ],
    idealFor: [
      'Safari expeditions to Maasai Mara, Amboseli & Samburu',
      'Diplomatic escorts and VIP security convoys',
      'All-weather upcountry driving in any season'
    ],
    authenticImage: '/assets/aistudio/Screenshot_2026-11-01_224639_1f335937.png',
    showcaseImage: '/src/assets/images/hero_safari_prado_rift_valley_1793603901093.jpg',
    extraImages: ['/src/assets/images/toyota_prado_safari_expedition_1793562811687.jpg'],
    available: true
  },
  {
    id: 'mazda-cx5-red',
    name: 'Mazda CX-5 Soul Red AWD',
    category: 'crossover',
    categoryLabel: 'Sport Luxury AWD Crossover',
    tagline: 'Stunning Soul Red metallic styling, i-Activ AWD and exhilarating handling',
    plateNumber: 'KDT Series',
    dailyRateKes: null,
    dailyRateUsd: null,
    weeklyRateKes: null,
    monthlyRateKes: null,
    depositKes: null,
    specs: {
      transmission: 'Automatic',
      fuel: 'Petrol',
      seats: 5,
      drive: 'AWD',
      luggage: '4 Bags',
      engine: '2.5L SkyActiv-G AWD',
      consumption: '13.2 km/L'
    },
    features: [
      'Signature Soul Red Crystal metallic finish',
      'i-Activ AWD system for superior wet weather grip',
      'Bose 10-speaker surround audio system',
      'Head-up Active Driving Display on windshield',
      'Apple CarPlay & Android Auto integration'
    ],
    idealFor: [
      'Couples exploring Nairobi cafes and art galleries',
      'Weekend getaways to Tigoni tea estates and Naivasha',
      'Tech executives and expat professionals'
    ],
    authenticImage: '/assets/aistudio/Screenshot_2026-11-01_224620_58651457.png',
    showcaseImage: '/src/assets/images/nairobi_guides_bg_1793564135430.jpg',
    available: true
  },
  {
    id: 'toyota-alphard-lounge',
    name: 'Toyota Alphard Executive Lounge 3.5L',
    category: 'van',
    categoryLabel: 'First-Class VIP Lounge',
    tagline: 'Private jet luxury on wheels with recline loungers and ambient bar lighting',
    plateNumber: 'KDM 444L',
    dailyRateKes: null,
    dailyRateUsd: null,
    weeklyRateKes: null,
    monthlyRateKes: null,
    depositKes: null,
    specs: {
      transmission: 'Automatic',
      fuel: 'Petrol',
      seats: 7,
      drive: 'FWD',
      luggage: '5 Large Bags',
      engine: '3.5L V6 24-Valve Dual VVT-i',
      consumption: '9.8 km/L'
    },
    features: [
      'Power reclining captain chairs with extendable leg rests',
      'Dual sunroofs with 16-color ambient mood lighting',
      'Power fold-out wood-grain workstation tables',
      'JBL 17-speaker cinematic theatre sound',
      'Private partition curtains for discreet travel'
    ],
    idealFor: [
      'Celebrity, artist & diplomatic dignitary logistics',
      'Ultra-luxury executive airport transfers via Expressway',
      'Executive boardroom on wheels for deals on the move'
    ],
    authenticImage: '/assets/aistudio/Screenshot_2026-11-01_224709_37f5cdb3.png',
    showcaseImage: '/src/assets/images/loyalty_vip_concierge_lounge_1793603900725.jpg',
    available: true
  },
  {
    id: 'mazda-cx5-silver',
    name: 'Mazda CX-5 Pure Silver Edition',
    category: 'crossover',
    categoryLabel: 'Urban Luxury Crossover',
    tagline: 'Sleek modern lines, refined Japanese minimalism, and whisper comfort',
    plateNumber: 'KDU Series',
    dailyRateKes: null,
    dailyRateUsd: null,
    weeklyRateKes: null,
    monthlyRateKes: null,
    depositKes: null,
    specs: {
      transmission: 'Automatic',
      fuel: 'Petrol',
      seats: 5,
      drive: 'FWD',
      luggage: '4 Bags',
      engine: '2.0L SkyActiv-G',
      consumption: '14.5 km/L'
    },
    features: [
      'Refined sonic silver metallic exterior',
      'Ergonomic heated leather driver seat',
      'Smart City Brake Support & Blind Spot Monitor',
      'Crystal clear rearview camera with dynamic lines',
      'Dual USB and fast smartphone charging dock'
    ],
    idealFor: [
      'Seamless daily driving across Ojijo Rd & Westlands',
      'Visiting Airbnb guests seeking comfort and economy',
      'Short business trips around Nairobi'
    ],
    authenticImage: '/assets/aistudio/Screenshot_2026-11-01_224649_96e48f76.png',
    showcaseImage: '/src/assets/images/hero_kilimani_fleet_banner_1793562810160.jpg',
    available: true
  }
];

export const SERVICE_AREAS = [
  { name: 'Ojijo Rd Depot & Parklands', time: 'Immediate Pickup', fee: 'Depot Handover & Free Walk-in' },
  { name: 'Westlands & Sarit Centre', time: '10 Mins Delivery', fee: 'FREE Doorstep Delivery' },
  { name: 'Kilimani & Yaya Centre', time: '15 Mins Delivery', fee: 'FREE Doorstep Delivery' },
  { name: 'Kileleshwa & Lavington', time: '15 Mins Delivery', fee: 'FREE Doorstep Delivery' },
  { name: 'JKIA Airport (Terminal 1 & 2)', time: 'Expressway Direct', fee: 'VIP Airport Meet & Greet' },
  { name: 'Wilson Airport (Domestic)', time: '15 Mins Delivery', fee: 'Terminal Handover' }
];

export const GOOGLE_REVIEWS = [
  {
    author: 'Verified Ojijo Rd Customer',
    rating: 5,
    date: 'Recent',
    comment: 'Punctual vehicle delivery right to our Parklands apartment. The Land Cruiser was immaculate and handled our Naivasha road trip effortlessly.',
    badge: 'Verified Renter · Google Review',
    source: 'Google Maps Business Profile'
  },
  {
    author: 'Business Executive',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Hired the Mercedes C-Class for a 4-day corporate summit in Westlands. Smooth handover on Ojijo Rd, transparent paperwork, and no hassle with deposit return.',
    badge: 'Corporate Client · 4-Day Hire',
    source: 'Google Maps Business Profile'
  },
  {
    author: 'Safari Traveler',
    rating: 5,
    date: '1 month ago',
    comment: 'Best 4WD rental in Nairobi. The Prado TX was fully serviced and came with good tires for Mara trails. 10/10 service from the Prime Carhire team.',
    badge: 'Expedition Renter · Safari Client',
    source: 'Google Maps Business Profile'
  }
];
