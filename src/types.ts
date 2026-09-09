export interface PujaService {
  id: string;
  title: string;
  hindiTitle: string;
  category: 'Popular' | 'Graha Shanti' | 'Festivals' | 'Sanskars' | 'Havan';
  description: string;
  duration: string;
  priestCount: number;
  basePrice: number;
  samagriPrice: number;
  image: string;
  tags: string[];
  benefits: string[];
  samagriList: {
    item: string;
    quantity: string;
    description?: string;
  }[];
}

export interface Astrologer {
  id: string;
  name: string;
  title: string;
  experienceYears: number;
  languages: string[];
  specialties: string[];
  rating: number;
  totalConsultations: number;
  ratePer15Min: number;
  image: string;
  isOnline: boolean;
  nextSlot: string;
}

export type TrackerStepStatus = 'completed' | 'in_progress' | 'upcoming';

export interface ProcedureStep {
  id: number;
  title: string;
  hindiTitle: string;
  status: TrackerStepStatus;
  estimatedTime: string;
  description: string;
  detailPoints: string[];
}

export interface ActiveBooking {
  bookingId: string;
  pujaName: string;
  hindiName: string;
  date: string;
  timeSlot: string;
  location: string;
  assignedPandit: {
    name: string;
    verifiedId: string;
    experience: string;
    vedicSchool: string;
    rating: number;
    phone: string;
    avatar: string;
    languages: string[];
  };
  samagriOpted: 'pandit_brings' | 'self_arranged';
  totalSteps: number;
  currentStepIndex: number;
  steps: ProcedureStep[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  quickActions?: {
    label: string;
    actionType: 'book_puja' | 'open_astrologer' | 'view_samagri';
    payload?: string;
  }[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  comment: string;
  rating: number;
  pujaAttended: string;
  avatar: string;
}
