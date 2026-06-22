import {
  Stethoscope,
  Sparkles,
  Smile,
  Activity,
  Crown,
  Layers,
  Baby,
  ShieldAlert,
  Brush,
  HeartPulse,
  type LucideIcon,
} from 'lucide-react'

export const clinic = {
  name: 'Sultan Rahman Dental Clinic',
  shortName: 'Sultan Rahman Dental',
  tagline: 'Where Quality Meets Confidence',
  phone: '090 438 286',
  phoneHref: 'tel:+23290438286',
  emergencyPhone: '090 438 286',
  emergencyHref: 'tel:+23290438286',
  whatsapp: '23290438286',
  email: 'info@sultanrahmandentalclinic.com',
  address: 'Congress Junction, Eastern Old Road, Kissy, Freetown, Sierra Leone',
  mapQuery: 'Congress Junction, Eastern Old Road, Kissy, Freetown, Sierra Leone',
  hours: [
    { day: 'Monday – Friday', time: '9:00 AM – 6:30 PM' },
    { day: 'Saturday', time: '10:00 AM – 5:00 PM' },
    { day: 'Sunday', time: 'Emergencies only' },
  ],
  branches: ['Wilkinson Road (Main)', 'Lumley Branch', 'Aberdeen Branch'],
  rating: 9.8,
  reviewCount: 986,
  patientsServed: '12,000+',
  social: {
    googleBusiness: 'https://share.google/3DxLG53Yggh7bz3S6',
    facebook: 'https://www.facebook.com/profile.php?id=100082505421510',
    tiktok: 'https://tiktok.com/@sultanrahmandentalclinic',
  },
}

export const whatsappLink = (message?: string) =>
  `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(
    message ??
      'Hello, I would like to book an appointment at Sultan Rahman Dental Clinic.',
  )}`

export type Service = {
  slug: string
  title: string
  short: string
  icon: LucideIcon
  category: 'General' | 'Cosmetic' | 'Orthodontics' | 'Restorative' | 'Specialty'
  overview: string
  benefits: string[]
  procedure: { step: string; detail: string }[]
  faqs: { q: string; a: string }[]
  priceRange: string
}

export const services: Service[] = [
  {
    slug: 'general-dentistry',
    title: 'General Dentistry',
    short: 'Comprehensive checkups, cleanings and preventive care for the whole family.',
    icon: Stethoscope,
    category: 'General',
    overview:
      'Routine dental care is the foundation of a healthy smile. Our general dentistry services keep your teeth and gums healthy with thorough examinations, professional cleanings, and personalised prevention plans.',
    benefits: [
      'Early detection of cavities and gum disease',
      'Professional cleaning that brightens your smile',
      'Personalised oral hygiene guidance',
      'Family-friendly, gentle care',
    ],
    procedure: [
      { step: 'Examination', detail: 'A full assessment of your teeth, gums and bite.' },
      { step: 'Cleaning', detail: 'Removal of plaque and tartar, followed by polishing.' },
      { step: 'Plan', detail: 'A tailored prevention and treatment roadmap.' },
    ],
    faqs: [
      { q: 'How often should I visit?', a: 'We recommend a checkup and cleaning every six months for most patients.' },
      { q: 'Does a cleaning hurt?', a: 'Cleanings are gentle and comfortable. Let us know if you have sensitivity and we will adjust.' },
    ],
    priceRange: 'Le 150 \u2013 Le 600',
  },
  {
    slug: 'teeth-whitening',
    title: 'Teeth Whitening',
    short: 'Professional whitening that removes stains for a brighter, confident smile.',
    icon: Sparkles,
    category: 'Cosmetic',
    overview:
      'Restore the natural brightness of your smile with safe, professional whitening. We use clinically proven systems that deliver noticeable results without harming your enamel.',
    benefits: [
      'Visible results in a single visit',
      'Safe, enamel-friendly formulas',
      'Customised shade selection',
      'Long-lasting brightness',
    ],
    procedure: [
      { step: 'Consultation', detail: 'We assess your enamel and choose the right shade.' },
      { step: 'Treatment', detail: 'A protective whitening gel is applied and activated.' },
      { step: 'Aftercare', detail: 'Simple guidance to keep your smile bright.' },
    ],
    faqs: [
      { q: 'How long do results last?', a: 'With good care, results typically last 1\u20132 years.' },
      { q: 'Is whitening safe?', a: 'Yes. Professional whitening is safe when supervised by a dentist.' },
    ],
    priceRange: 'Le 800 \u2013 Le 2,500',
  },
  {
    slug: 'braces-orthodontics',
    title: 'Braces & Orthodontics',
    short: 'Straighten crowded or crooked teeth with modern braces and aligners.',
    icon: Smile,
    category: 'Orthodontics',
    overview:
      'Achieve a beautifully aligned smile with our orthodontic treatments. From traditional braces to clear aligners, we create a plan that fits your lifestyle and goals.',
    benefits: [
      'Corrects crowding, gaps and bite issues',
      'Options for adults and children',
      'Improved oral health and function',
      'Flexible payment plans',
    ],
    procedure: [
      { step: 'Assessment', detail: 'Digital scans and a personalised alignment plan.' },
      { step: 'Fitting', detail: 'Braces or aligners are fitted comfortably.' },
      { step: 'Adjustments', detail: 'Regular visits guide your teeth into place.' },
    ],
    faqs: [
      { q: 'How long does treatment take?', a: 'Most cases take 12\u201324 months depending on complexity.' },
      { q: 'Are aligners available?', a: 'Yes, we offer clear aligners as a discreet alternative.' },
    ],
    priceRange: 'Le 6,000 \u2013 Le 18,000',
  },
  {
    slug: 'dental-implants',
    title: 'Dental Implants',
    short: 'Permanent, natural-looking replacements for missing teeth.',
    icon: Layers,
    category: 'Restorative',
    overview:
      'Dental implants are the gold standard for replacing missing teeth. They look, feel and function like natural teeth, restoring both your smile and your confidence.',
    benefits: [
      'Permanent, durable solution',
      'Preserves jawbone health',
      'Natural look and feel',
      'Restores full chewing function',
    ],
    procedure: [
      { step: 'Planning', detail: 'Imaging and a precise surgical plan.' },
      { step: 'Placement', detail: 'The implant is placed into the jawbone.' },
      { step: 'Crown', detail: 'A custom crown completes your new tooth.' },
    ],
    faqs: [
      { q: 'How long do implants last?', a: 'With good care, implants can last a lifetime.' },
      { q: 'Is the procedure painful?', a: 'It is performed under local anaesthetic and is very comfortable.' },
    ],
    priceRange: 'Le 12,000 \u2013 Le 35,000',
  },
  {
    slug: 'crowns-bridges',
    title: 'Crowns & Bridges',
    short: 'Restore damaged or missing teeth with durable, natural-looking restorations.',
    icon: Crown,
    category: 'Restorative',
    overview:
      'Crowns and bridges repair and replace damaged or missing teeth, restoring strength and a seamless appearance using high-quality, tooth-coloured materials.',
    benefits: [
      'Strengthens weakened teeth',
      'Closes gaps from missing teeth',
      'Natural, tooth-coloured finish',
      'Long-lasting durability',
    ],
    procedure: [
      { step: 'Preparation', detail: 'The tooth is shaped and an impression taken.' },
      { step: 'Fabrication', detail: 'Your custom restoration is crafted.' },
      { step: 'Fitting', detail: 'The crown or bridge is fitted and adjusted.' },
    ],
    faqs: [
      { q: 'How long do crowns last?', a: 'Crowns typically last 10\u201315 years with good care.' },
      { q: 'Will it match my teeth?', a: 'Yes, restorations are colour-matched to your natural teeth.' },
    ],
    priceRange: 'Le 4,000 \u2013 Le 14,000',
  },
  {
    slug: 'root-canal',
    title: 'Root Canal Treatment',
    short: 'Pain-free treatment that saves infected or damaged teeth.',
    icon: Activity,
    category: 'Restorative',
    overview:
      'Root canal therapy relieves pain and saves teeth that are badly infected or decayed. Our gentle approach makes the procedure comfortable and stress-free.',
    benefits: [
      'Relieves severe tooth pain',
      'Saves your natural tooth',
      'Prevents the spread of infection',
      'Quick recovery',
    ],
    procedure: [
      { step: 'Diagnosis', detail: 'We confirm the infection with imaging.' },
      { step: 'Cleaning', detail: 'The infected pulp is removed and cleaned.' },
      { step: 'Sealing', detail: 'The tooth is sealed and often crowned.' },
    ],
    faqs: [
      { q: 'Is a root canal painful?', a: 'Modern techniques make it no more uncomfortable than a filling.' },
      { q: 'How many visits are needed?', a: 'Most cases are completed in 1\u20132 visits.' },
    ],
    priceRange: 'Le 3,500 \u2013 Le 10,000',
  },
  {
    slug: 'gum-treatment',
    title: 'Gum Treatment',
    short: 'Treat bleeding gums and gum disease to protect your smile.',
    icon: HeartPulse,
    category: 'Specialty',
    overview:
      'Healthy gums are essential to a healthy smile. We treat gum disease at every stage, from early gingivitis to advanced periodontitis, with effective, gentle care.',
    benefits: [
      'Stops bleeding and inflammation',
      'Prevents tooth loss',
      'Freshens breath',
      'Protects overall health',
    ],
    procedure: [
      { step: 'Assessment', detail: 'We measure gum health and pocket depth.' },
      { step: 'Deep clean', detail: 'Scaling and root planing remove bacteria.' },
      { step: 'Maintenance', detail: 'A care plan keeps your gums healthy.' },
    ],
    faqs: [
      { q: 'Why do my gums bleed?', a: 'Bleeding gums are an early sign of gum disease and should be assessed.' },
      { q: 'Is gum disease reversible?', a: 'Early-stage gum disease is reversible with prompt treatment.' },
    ],
    priceRange: 'Le 1,000 \u2013 Le 6,000',
  },
  {
    slug: 'pediatric-dentistry',
    title: 'Pediatric Dentistry',
    short: 'Gentle, friendly dental care designed for children.',
    icon: Baby,
    category: 'General',
    overview:
      'We make dental visits fun and stress-free for children. Our caring team builds healthy habits early and ensures your child enjoys a lifetime of healthy smiles.',
    benefits: [
      'Child-friendly, gentle approach',
      'Builds positive dental habits',
      'Preventive care and fluoride',
      'Education for parents and kids',
    ],
    procedure: [
      { step: 'Welcome', detail: 'A friendly introduction to ease any nerves.' },
      { step: 'Checkup', detail: 'A gentle exam and cleaning.' },
      { step: 'Prevention', detail: 'Fluoride and sealants where needed.' },
    ],
    faqs: [
      { q: 'When should my child first visit?', a: 'By their first birthday or when the first tooth appears.' },
      { q: 'Do you offer sealants?', a: 'Yes, sealants are a great way to protect young teeth.' },
    ],
    priceRange: 'Le 150 \u2013 Le 800',
  },
  {
    slug: 'teeth-cleaning',
    title: 'Teeth Cleaning',
    short: 'Professional scaling and polishing for a fresh, healthy mouth.',
    icon: Brush,
    category: 'General',
    overview:
      'A professional cleaning removes plaque and tartar that brushing alone cannot reach, leaving your mouth fresh, healthy, and your smile brighter.',
    benefits: [
      'Removes stubborn plaque and tartar',
      'Prevents cavities and gum disease',
      'Freshens breath',
      'Brightens your smile',
    ],
    procedure: [
      { step: 'Scaling', detail: 'Plaque and tartar are gently removed.' },
      { step: 'Polishing', detail: 'Teeth are polished to a smooth finish.' },
      { step: 'Advice', detail: 'Tips to maintain results at home.' },
    ],
    faqs: [
      { q: 'How often should I get a cleaning?', a: 'Every six months is ideal for most patients.' },
      { q: 'Will it remove stains?', a: 'Cleaning removes surface stains; whitening goes further.' },
    ],
    priceRange: 'Le 150 \u2013 Le 500',
  },
  {
    slug: 'emergency-care',
    title: 'Emergency Dental Care',
    short: 'Same-day relief for severe pain, swelling, and dental trauma.',
    icon: ShieldAlert,
    category: 'Specialty',
    overview:
      'Dental emergencies need fast, expert care. We offer same-day appointments to relieve pain, treat injuries, and protect your smile when you need us most.',
    benefits: [
      'Same-day appointments',
      'Fast pain relief',
      'Trauma and injury treatment',
      'Experienced emergency team',
    ],
    procedure: [
      { step: 'Call', detail: 'Reach our emergency line for immediate guidance.' },
      { step: 'Assessment', detail: 'Rapid examination to find the cause.' },
      { step: 'Relief', detail: 'Immediate treatment to relieve pain.' },
    ],
    faqs: [
      { q: 'What counts as an emergency?', a: 'Severe pain, swelling, bleeding, or a knocked-out tooth.' },
      { q: 'Do you treat the same day?', a: 'Yes, we prioritise emergencies for same-day care.' },
    ],
    priceRange: 'From Le 500',
  },
]

export const galleryCategories = [
  'All',
  'Braces',
  'Whitening',
  'Implants',
  'Smile Makeovers',
] as const

export type GalleryCase = {
  id: string
  category: Exclude<(typeof galleryCategories)[number], 'All'>
  treatment: string
  duration: string
  summary: string
  before: string
  after: string
}

export const galleryCases: GalleryCase[] = [
  {
    id: 'braces-1',
    category: 'Braces',
    treatment: 'Full Braces',
    duration: '18 months',
    summary: 'Severe crowding corrected into a perfectly aligned, confident smile.',
    before: '/images/case-braces-before.png',
    after: '/images/case-braces-after.png',
  },
  {
    id: 'whitening-1',
    category: 'Whitening',
    treatment: 'Professional Whitening',
    duration: '1 visit',
    summary: 'Years of staining removed for a noticeably brighter smile in one session.',
    before: '/images/case-whitening-before.png',
    after: '/images/case-whitening-after.png',
  },
  {
    id: 'implants-1',
    category: 'Implants',
    treatment: 'Single Tooth Implant',
    duration: '3 months',
    summary: 'A missing front tooth replaced with a natural-looking, permanent implant.',
    before: '/images/case-braces-before.png',
    after: '/images/case-braces-after.png',
  },
  {
    id: 'makeover-1',
    category: 'Smile Makeovers',
    treatment: 'Full Smile Makeover',
    duration: '4 months',
    summary: 'Combined whitening and alignment for a complete smile transformation.',
    before: '/images/case-whitening-before.png',
    after: '/images/case-whitening-after.png',
  },
]

export const whyChooseUs = [
  { title: 'Modern Technology', detail: 'State-of-the-art equipment for precise, comfortable treatment.' },
  { title: 'Experienced Team', detail: 'Skilled dentists dedicated to gentle, patient-first care.' },
  { title: 'Comfortable Environment', detail: 'A calm, welcoming clinic designed to ease anxiety.' },
  { title: 'Emergency Support', detail: 'Same-day appointments when you need urgent care.' },
  { title: 'Flexible Appointments', detail: 'Convenient scheduling that fits your life.' },
  { title: 'Patient Satisfaction', detail: 'Thousands of happy patients and 5-star reviews.' },
]

export const testimonials = [
  {
    name: 'Mariama Kamara',
    treatment: 'Braces',
    quote:
      'I was nervous about getting braces as an adult, but the team made me feel so comfortable. My smile has completely transformed!',
    rating: 5,
  },
  {
    name: 'Ibrahim Sesay',
    treatment: 'Dental Implant',
    quote:
      'After losing a tooth, I thought my smile was ruined. The implant looks and feels completely natural. Highly recommend.',
    rating: 5,
  },
  {
    name: 'Fatmata Koroma',
    treatment: 'Teeth Whitening',
    quote:
      'Quick, painless, and the results were amazing. Dr. Rahman and his team are true professionals.',
    rating: 5,
  },
  {
    name: 'Mohamed Bangura',
    treatment: 'Emergency Care',
    quote:
      'I had severe tooth pain on a weekend and they saw me the same day. The relief was immediate. Lifesavers!',
    rating: 5,
  },
]

export const faqs = [
  {
    q: 'How do I book an appointment?',
    a: 'You can book online through our booking form, message us on WhatsApp, or call the clinic directly. We will confirm your appointment promptly.',
  },
  {
    q: 'Do braces hurt?',
    a: 'You may feel mild pressure after fittings and adjustments, but this is temporary and easily managed. Modern braces are more comfortable than ever.',
  },
  {
    q: 'How much does teeth whitening cost?',
    a: 'Professional whitening starts from Le 800. The exact cost depends on your chosen treatment, which we will discuss during your consultation.',
  },
  {
    q: 'Are dental implants painful?',
    a: 'Implant placement is performed under local anaesthetic and most patients report little to no discomfort during the procedure.',
  },
  {
    q: 'What should I do in a dental emergency?',
    a: 'Call our emergency line immediately for guidance. We offer same-day appointments for severe pain, swelling, bleeding, or dental trauma.',
  },
  {
    q: 'Do you offer payment plans?',
    a: 'Yes. We offer flexible payment options for larger treatments such as braces and implants. Ask our team for details.',
  },
]

export const doctor = {
  name: 'Dr. Sultan Rahman',
  title: 'Lead Dentist & Founder, BDS, MFDS',
  image: '/images/dr-sultan-rahman.png',
  bio: 'With over 15 years of experience, Dr. Sultan Rahman is one of Sierra Leone\u2019s most trusted dental professionals. He founded Sultan Rahman Dental Clinic with a single mission: to bring world-class, compassionate dental care to the people of Freetown.',
  philosophy:
    'I believe every patient deserves to feel heard, comfortable, and confident in their care. Great dentistry is about more than teeth \u2014 it is about transforming lives, one smile at a time.',
  credentials: [
    'Bachelor of Dental Surgery (BDS)',
    'Member, Faculty of Dental Surgery (MFDS)',
    '15+ years of clinical experience',
    'Advanced training in implantology',
  ],
  stats: [
    { value: '15+', label: 'Years experience' },
    { value: '12,000+', label: 'Patients treated' },
    { value: '9.8\u2605', label: 'Average rating' },
  ],
}

export const dentists = [
  'Dr. Sultan Rahman',
  'Dr. Aisha Conteh',
  'Dr. James Koroma',
  'No preference',
]

export const timeSlots = [
  '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM',
]

export const dentalConcerns = [
  'Tooth Pain', 'Bleeding Gums', 'Missing Tooth', 'Crooked Teeth',
  'Whitening', 'Braces', 'Bad Breath', 'Emergency', 'Routine Checkup',
]
