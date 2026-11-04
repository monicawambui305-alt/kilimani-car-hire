export interface FAQItem {
  id: string;
  category: 'insurance' | 'booking' | 'driver' | 'payment' | 'safari';
  question: string;
  answer: string;
  highlight?: string;
}

export const FAQS_DATA: FAQItem[] = [
  {
    id: 'insurance-coverage',
    category: 'insurance',
    question: 'What insurance is included with Prime Carhire rentals?',
    answer:
      'All our vehicles come with comprehensive commercial vehicle insurance covering third-party liabilities, fire, theft, and accidental damage. For complete peace of mind, an optional Collision Damage Waiver (CDW) is available to minimize excess liability. In the event of an unforeseen incident, our 24/7 roadside response team is dispatched immediately across Nairobi and environs.',
    highlight: 'Comprehensive insurance included on all vehicles'
  },
  {
    id: 'fuel-policy',
    category: 'booking',
    question: 'What is the fuel policy when hiring a vehicle?',
    answer:
      'We operate on a straightforward Full-to-Full fuel policy. You will receive your vehicle with a full tank of quality fuel inspected at our Ojijo Rd depot or doorstep handover, and you simply return it with a full tank. This ensures you only pay for the fuel you actually consume, with zero hidden refueling surcharges.',
    highlight: 'Full-to-Full policy with zero hidden surcharges'
  },
  {
    id: 'driver-requirements',
    category: 'driver',
    question: 'What documents and qualifications are required to hire a vehicle?',
    answer:
      'To rent and drive any vehicle from Prime Carhire, drivers must be at least 21 years of age and present: (1) A valid Kenyan Driving License or an International Driving Permit (IDP) held for at least 2 years; (2) A valid National ID card or international Passport; (3) Proof of accommodation or itinerary for visitors. Professional chauffeured services are also available if you prefer not to drive yourself.',
    highlight: 'Minimum age 21+ · Kenyan DL or International Permit (IDP)'
  },
  {
    id: 'security-deposit',
    category: 'payment',
    question: 'Is a security deposit required, and how quickly is it refunded?',
    answer:
      'A refundable security deposit is held at vehicle handover to cover potential traffic penalties, toll road fees (Nairobi Expressway), or minor fuel deficits. The deposit can be secured via M-Pesa or major debit/credit cards, and is refunded promptly within 24 to 48 hours following vehicle return and routine inspection clearance.',
    highlight: 'Rapid deposit refund within 24–48 hours post inspection'
  },
  {
    id: 'payment-methods',
    category: 'payment',
    question: 'What payment methods does Prime Carhire accept?',
    answer:
      'We accept all major Kenyan and international payment methods: M-Pesa (Buy Goods Till / Paybill), Visa, Mastercard, American Express, direct electronic bank transfers (RTGS/EFT), and USD / EUR / KES cash upon physical vehicle handover at our Ojijo Rd depot or your apartment.',
    highlight: 'M-Pesa, Visa/Mastercard, Bank Transfer & Multi-Currency Cash'
  },
  {
    id: 'safari-cross-border',
    category: 'safari',
    question: 'Can I take the vehicle for a safari to Maasai Mara, Amboseli, or Naivasha?',
    answer:
      'Yes! Our 4WD fleet—including the Toyota Land Cruiser V8, Prado TX, and AWD crossovers—are specially outfitted and regularly inspected for Kenyan terrain and national park safari expeditions. Please inform our reservations desk prior to departure so we can equip your vehicle with high-lift jacks, spare tires, and ensure appropriate COMESA yellow card cover if cross-border travel (e.g., Uganda, Tanzania) is intended.',
    highlight: 'Safari-ready 4WD vehicles with park clearance & COMESA options'
  },
  {
    id: 'delivery-and-depot',
    category: 'booking',
    question: 'Where is Prime Carhire located and do you offer doorstep delivery?',
    answer:
      'Our physical agency and staging depot is located along Ojijo Rd in Nairobi (Plus Code: PRJ6+XJ Nairobi, open until 4:00 PM for walk-ins). We provide prompt doorstep delivery across Parklands, Westlands, Kilimani, Kileleshwa, Lavington, and 24/7 dedicated terminal meet-and-greet transfers at Jomo Kenyatta International Airport (JKIA) and Wilson Airport.',
    highlight: 'Depot on Ojijo Rd + 24/7 Airport & Apartment Doorstep Delivery'
  },
  {
    id: 'mileage-limit',
    category: 'booking',
    question: 'Is there a mileage limit on rentals?',
    answer:
      'Most of our standard Nairobi city rentals and upcountry packages come with generous daily kilometer allowances or unlimited mileage options for long-term hires. Full details are clearly stated in your rental contract before departure so there are never any unexpected mileage surprises.',
    highlight: 'Generous daily allowances & unlimited options available'
  }
];
