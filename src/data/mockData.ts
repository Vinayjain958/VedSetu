import { PujaService, Astrologer, ActiveBooking, Testimonial } from '../types';

export const POPULAR_PUJAS: PujaService[] = [
  {
    id: 'ganesh-puja',
    title: 'Ganesh Puja & Havan',
    hindiTitle: 'श्री गणेश पूजन एवं हवन',
    category: 'Popular',
    description: 'Vighnaharta Puja to remove obstacles, invoke prosperity, and bring auspicious beginnings to new homes, ventures, or life events.',
    duration: '90 - 120 mins',
    priestCount: 1,
    basePrice: 2100,
    samagriPrice: 1100,
    image: 'https://images.unsplash.com/photo-1567591414240-e179e8c4598d?auto=format&fit=crop&w=800&q=80',
    tags: ['New Beginnings', 'Prosperity', 'Vedic Chants', 'Most Booked'],
    benefits: ['Removes obstacles and negative energies', 'Blessings of Lord Ganesha for wisdom and success', 'Panchamrit Abhishek & 108 Durva Arpan'],
    samagriList: [
      { item: 'Ghee (Pure Cow Ghee)', quantity: '500 gm', description: 'For unbroken havan offerings' },
      { item: 'Havan Samagri Herbs Blend', quantity: '1 Packet (500g)', description: '32 medicinal Vedic herbs' },
      { item: 'Dry Coconuts (Shriphal)', quantity: '3 pieces', description: 'With fiber intact' },
      { item: 'Durva Grass (Fresh)', quantity: '21 strings', description: 'Directly sourced for Ganpati Bappa' },
      { item: 'Modak / Ladoo Prasad', quantity: '21 pieces', description: 'Bhagwan Naivedyam' },
      { item: 'Roli, Kumkum, Chandan, Haldi', quantity: '1 set', description: 'Sacred tilak samagri' },
      { item: 'Mauli / Kalava Sacred Thread', quantity: '2 rolls', description: 'Raksha sutra' },
      { item: 'Betel Leaves (Paan Patta) & Supari', quantity: '11 pairs', description: 'Ashtadikpala invocation' },
      { item: 'Dry Fruits & Panchmeva', quantity: '250 gm', description: 'Cashews, Almonds, Kishmish, Makhana' },
      { item: 'Camphor (Kapur) & Dhoop Cones', quantity: '1 pack', description: 'Aarti and purification' }
    ]
  },
  {
    id: 'griha-pravesh',
    title: 'Griha Pravesh & Vastu Shanti',
    hindiTitle: 'गृह प्रवेश एवं वास्तु शांति महापूजन',
    category: 'Popular',
    description: 'Purify your new residence, balance the five cosmic elements (Panchatatva), and invite Goddess Lakshmi into your sanctum.',
    duration: '2.5 - 3.5 hrs',
    priestCount: 2,
    basePrice: 5100,
    samagriPrice: 2100,
    image: 'https://images.unsplash.com/photo-1609358905581-e5088825bcf7?auto=format&fit=crop&w=800&q=80',
    tags: ['New Home', 'Vastu Dosh Nivaran', 'Lakshmi Prapti', '2 Pandits'],
    benefits: ['Harmonizes north-east Ishanya energy points', 'Milk boiling ceremony (Doodh Ufanna) guidance', 'Navagraha Homam for peace & abundance'],
    samagriList: [
      { item: 'Copper Kalash & Mango Leaves', quantity: '1 set', description: 'Purna Kumbha Sthapana' },
      { item: 'Navadhanya (9 Sacred Grains)', quantity: '1 set (500g)', description: 'For Navagraha invocation' },
      { item: 'Vastu Yantra (Copper)', quantity: '1 unit', description: 'Energized by Acharya' },
      { item: 'Pure Cow Milk & Clay Pot', quantity: '1 liter + 1 pot', description: 'Auspicious first boil ritual' },
      { item: 'Mango Wood Sticks (Samidha)', quantity: '3 kg', description: 'Smoke-free seasoned wood' },
      { item: 'Ghee (Desi Cow Bilona)', quantity: '1 kg', description: 'For Ahuti in Homam' },
      { item: 'Toran (Fresh Marigold & Ashoka)', quantity: '1 main entrance', description: 'Dwar Puja' }
    ]
  },
  {
    id: 'satyanarayan',
    title: 'Satyanarayan Katha & Puja',
    hindiTitle: 'श्री सत्यनारायण व्रत कथा',
    category: 'Popular',
    description: 'Timeless monthly or special-occasion devotional recital bringing harmony, health, and spiritual satisfaction to your household.',
    duration: '2 - 2.5 hrs',
    priestCount: 1,
    basePrice: 2500,
    samagriPrice: 1200,
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=800&q=80',
    tags: ['Purnima Special', 'Family Peace', 'Katha Recital', 'Prasad Making'],
    benefits: ['Recital of 5 sacred Adhyayas from Skanda Purana', 'Panchamrit & Sheera (Prasad) preparation guidance', 'Aarti with 108 Deepaks invocation'],
    samagriList: [
      { item: 'Panchamrit ingredients', quantity: '1 set', description: 'Milk, Curd, Ghee, Honey, Sugar' },
      { item: 'Banana Stems & Leaves', quantity: '4 stems + leaves', description: 'Mandap decoration' },
      { item: 'Tulsi Leaves (Shyama & Rama)', quantity: '51 leaves', description: 'Vishnu Priye arpan' },
      { item: 'Dry Fruits & Yellow Flowers', quantity: '500g + 1 garland', description: 'Yellow Champa / Marigold' }
    ]
  },
  {
    id: 'rudrabhishek',
    title: 'Maha Rudrabhishek Puja',
    hindiTitle: 'महा रुद्राभिषेक एवं शिव अर्चन',
    category: 'Havan',
    description: 'Powerful Vedic Shiva Aradhana with 11 Dravyas (milk, sugarcane juice, honey, bhasma, bilva patra) for health and mental strength.',
    duration: '2 - 3 hrs',
    priestCount: 1,
    basePrice: 3500,
    samagriPrice: 1500,
    image: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=800&q=80',
    tags: ['Shiva Tattva', 'Maha Mrityunjaya', 'Health & Vitality', 'Namakam Chamakam'],
    benefits: ['Recitation of Sri Rudram (Namakam Chamakam)', 'Destroys planetary afflictions (especially Rahu/Shani)', 'Profound inner tranquility & healing vibrations'],
    samagriList: [
      { item: 'Fresh Bilva Patra (Bel Patra)', quantity: '108 pieces', description: 'Clean unbroken trifoliate leaves' },
      { item: 'Bhasma / Vibhuti', quantity: '1 pack', description: 'Kashi Vishwanath certified' },
      { item: 'Sugarcane Juice (Ikshu Rasa)', quantity: '1 liter', description: 'Fresh extracted' },
      { item: 'Ganga Jal & Rose Water', quantity: '2 bottles', description: 'Gangotri source' },
      { item: 'Dhatura Fruit & Flowers', quantity: '5 pieces', description: 'Lord Shiva favorite pushpa' }
    ]
  },
  {
    id: 'navagraha-shanti',
    title: 'Navagraha Shanti & Dosh Nivaran',
    hindiTitle: 'नवग्रह शांति एवं दोष निवारण महायज्ञ',
    category: 'Graha Shanti',
    description: 'Pacify planetary imbalances, Sade Sati, Manglik Dosh, or Kaal Sarp afflictions guided by certified Vedic Jyotish Vidwans.',
    duration: '3 hrs',
    priestCount: 2,
    basePrice: 4500,
    samagriPrice: 1800,
    image: 'https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?auto=format&fit=crop&w=800&q=80',
    tags: ['Planetary Balance', 'Sade Sati', 'Astrology Remedies', 'Kundali Harmonization'],
    benefits: ['9 specific Grain Mandalas created for Sun through Ketu', 'Vedic Navagraha Beej Mantras (108 chants each)', 'Planetary gem energy activation guidance'],
    samagriList: [
      { item: '9 Color Cloth Pieces', quantity: '9 cloths', description: 'Red, White, Yellow, Green, Black, etc.' },
      { item: 'Navagraha Samidha (9 Plant Woods)', quantity: '1 set', description: 'Arka, Khadira, Apamarga, Shami, etc.' },
      { item: 'Navagraha Yantra', quantity: '1 unit', description: 'Copper embossed' },
      { item: 'Til, Jau, Ghee Ahuti mix', quantity: '1 kg', description: 'Special homam blend' }
    ]
  },
  {
    id: 'sundarkand-path',
    title: 'Akhand Sundarkand Path',
    hindiTitle: 'श्री सुंदरकांड संगीतमय पाठ',
    category: 'Festivals',
    description: 'Melodious, devotion-packed Hanumanji path chanting that drives away fears, protects families, and instills immense positive energy.',
    duration: '2.5 - 3.5 hrs',
    priestCount: 2,
    basePrice: 3100,
    samagriPrice: 900,
    image: 'https://images.unsplash.com/photo-1620802051782-725fa33f99aa?auto=format&fit=crop&w=800&q=80',
    tags: ['Courage & Protection', 'Musical Recital', 'Hanuman Chalisa', 'Sankat Mochan'],
    benefits: ['Musical accompaniment with harmonium/dholak reciters', 'Sindoor Arpan on Sri Hanuman Vigraha', 'Boondi / Besan Ladoo Bhog Arpan'],
    samagriList: [
      { item: 'Orange Sindoor (Hanuman Chola)', quantity: '100 gm', description: 'Sacred temple grade' },
      { item: 'Jasmine Oil (Chameli Tel)', quantity: '100 ml', description: 'Pure aromatic cold pressed' },
      { item: 'Betel Leaves with clove & cardamom', quantity: '11 beeda', description: 'Hanuman Paan Bhog' },
      { item: 'Boondi Prasad', quantity: '1 kg', description: 'Freshly made' }
    ]
  }
];

export const CERTIFIED_ASTROLOGERS: Astrologer[] = [
  {
    id: 'astro-1',
    name: 'Acharya Vidyadhar Shastri',
    title: 'Senior Vedic Astrologer & Vastu Acharya',
    experienceYears: 22,
    languages: ['Hindi', 'Sanskrit', 'English', 'Gujarati'],
    specialties: ['Kundali Milan', 'Career & Business', 'Vastu Consultation', 'Gemology'],
    rating: 4.9,
    totalConsultations: 3420,
    ratePer15Min: 60,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    isOnline: true,
    nextSlot: 'Available Now'
  },
  {
    id: 'astro-2',
    name: 'Dr. Radhika Sharma (PhD Jyotish)',
    title: 'KP System & Prashna Kundali Specialist',
    experienceYears: 16,
    languages: ['Hindi', 'English', 'Marathi'],
    specialties: ['Marriage & Relationships', 'Higher Education Abroad', 'Medical Astrology'],
    rating: 4.95,
    totalConsultations: 2850,
    ratePer15Min: 60,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    isOnline: true,
    nextSlot: 'Available Now'
  },
  {
    id: 'astro-3',
    name: 'Pt. Raghavendra Joshi',
    title: 'Nadi Astrology & Muhurat Specialist',
    experienceYears: 19,
    languages: ['Hindi', 'Kannada', 'Telugu', 'English'],
    specialties: ['Shubh Muhurat Selection', 'Graha Dosh Remedies', 'Financial Growth'],
    rating: 4.88,
    totalConsultations: 1920,
    ratePer15Min: 60,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    isOnline: false,
    nextSlot: 'Today at 6:30 PM'
  }
];

export const MOCK_ACTIVE_BOOKING: ActiveBooking = {
  bookingId: 'VED-2026-8942',
  pujaName: 'Ganesh Puja & Havan',
  hindiName: 'श्री गणेश पूजन एवं विघ्नहर्ता हवन',
  date: 'Today, 27 Aug 2026',
  timeSlot: '10:30 AM - 12:30 PM',
  location: 'Tower 4, Apt 902, Green Glen Heights, Bengaluru',
  assignedPandit: {
    name: 'Pandit Rameshwar Trivedi',
    verifiedId: 'DL-GUR-89214',
    experience: '14+ Years in Vedic Rituals',
    vedicSchool: 'Shri Kashi Vishwanath Gurukul, Varanasi',
    rating: 4.96,
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    languages: ['Hindi', 'Sanskrit', 'English', 'Bhojpuri']
  },
  samagriOpted: 'pandit_brings',
  totalSteps: 5,
  currentStepIndex: 2, // 0-based: 2 means Step 3: Puja Started (Active)
  steps: [
    {
      id: 1,
      title: 'Pandit Assigned',
      hindiTitle: 'पंडित जी का आवंटन',
      status: 'completed',
      estimatedTime: 'Completed at 09:45 AM',
      description: 'Pandit Rameshwar Trivedi (Certified Vedic Acharya) accepted your booking and confirmed arriving in traditional attire with consecrated Ganga Jal.',
      detailPoints: [
        'ID Verified via DigiLocker & Gurukul Credentials',
        'Direct phone line connected with priest',
        'Punctuality score: 99.4%'
      ]
    },
    {
      id: 2,
      title: 'Samagri Verified',
      hindiTitle: 'सामग्री प्रमाणीकरण',
      status: 'completed',
      estimatedTime: 'Completed at 10:20 AM',
      description: 'The 100% organic, vacuum-sealed Samagri kit with 32 Vedic medicinal herbs, pure bilona ghee, and fresh flowers was inspected and laid out.',
      detailPoints: [
        'Checked 10/10 essential items including dry fruits and brass havan kund',
        'Panchamrit (pure milk, curd, honey, mishri, ghee) sanctified',
        'All altar items cleansed with Ganga Jal'
      ]
    },
    {
      id: 3,
      title: 'Puja Started (Active)',
      hindiTitle: 'पूजन प्रारंभ (लाइव)',
      status: 'in_progress',
      estimatedTime: 'Live Now · Step 3 of 5',
      description: 'Currently performing Sankalp chanting with family Gotra and names, followed by 108 Durva Arpan on Bhagwan Ganesha idol.',
      detailPoints: [
        'Sankalpa recitation for family health and prosperity',
        'Gauri-Ganesh Sthapana & Kalash Sthapana in progress',
        'Live audio recitation of Ganpati Atharvashirsha underway'
      ]
    },
    {
      id: 4,
      title: 'Aarti & Prasad',
      hindiTitle: 'आरती एवं महाप्रसाद',
      status: 'upcoming',
      estimatedTime: 'Est. 11:50 AM (in ~35 mins)',
      description: 'Kapur Aarti with ringing of bells, distribution of sanctified Modak prasad, and Charanamrit distribution to all family members.',
      detailPoints: [
        'Singing of Jai Ganesh Deva Aarti in unison',
        '108 Deepak camphor offering',
        'Charanamrit & Modak bhog distribution'
      ]
    },
    {
      id: 5,
      title: 'Puja Completed',
      hindiTitle: 'पूर्णाहुति एवं आशीर्वाद',
      status: 'upcoming',
      estimatedTime: 'Est. 12:20 PM',
      description: 'Final Purnahuti ahuti in the havan kund, tying of sacred Raksha Sutra (Mauli) on family members, and Acharya Ashirwad.',
      detailPoints: [
        'Purnahuti with dry coconut offering in Agni Dev',
        'Vedic Ashirwad mantra recital',
        'Digital Certificate of Puja Completion & invoice generation'
      ]
    }
  ]
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Ananya & Rohit Sen',
    role: 'Software Engineers at Tech Park',
    location: 'Whitefield, Bengaluru',
    comment: 'Relocating to a new city, we had zero contacts for reliable Pandits who could explain the mantras in English/Hindi. Vedsetu arranged Pandit Shastri ji within 2 hours for our Griha Pravesh. The live procedure tracker was unbelievable!',
    rating: 5,
    pujaAttended: 'Griha Pravesh & Vastu Shanti',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 't2',
    name: 'Saurabh Kulkarni',
    role: 'PG Student (Staying away from hometown)',
    location: 'Kothrud, Pune',
    comment: 'Being a student staying away from family, I needed a Ganesh Puja for my new semester exam. The organic samagri kit option meant I didn’t have to hunt 20 kirana stores in the rain. Authentic and transparent pricing!',
    rating: 5,
    pujaAttended: 'Ganesh Puja & Havan',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 't3',
    name: 'Meenakshi Iyer',
    role: 'Homemaker & Mother of two',
    location: 'Indirapuram, NCR',
    comment: 'The Virtual Astrologer at ₹60 for 15 mins is such an honest service! Acharya ji patiently analyzed my son’s Kundali without fearmongering or selling expensive stones. Truly ethical spirituality.',
    rating: 5,
    pujaAttended: 'Virtual Astrology Consultation',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
  }
];

export const SAMAGRI_FAQ_ITEMS = [
  {
    question: 'What is the difference between "Pandit Brings Samagri" and "Self-Arranged"?',
    answer: 'If you choose "Pandit Brings Samagri", our certified priest arrives with a sealed, lab-tested, 100% organic kit including seasoned mango wood, cow bilona ghee, and fresh temple flowers. If you choose "Self-Arranged", you get a printable interactive checklist with exact gram weights and local shop tips.'
  },
  {
    question: 'Are the Pandits background-checked and Gurukul-certified?',
    answer: 'Yes! Every priest on Vedsetu undergoes a 3-tier verification: Government ID verification via DigiLocker, Gurukul Sanskrit degree verification (from institutions like BHU, Kashi Vidyapeeth, Tirupati), and a practical recitation interview by our Vedic Board.'
  },
  {
    question: 'Can I choose my regional language and tradition?',
    answer: 'Absolutely. We support North Indian (Vedic/Sanatan), South Indian (Tamil, Telugu, Kannada, Malayalam), Bengali, Marathi, and Gujarati traditions with native-speaking Acharyas.'
  }
];
