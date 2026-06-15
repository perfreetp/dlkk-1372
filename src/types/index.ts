export interface Pet {
  id: string;
  name: string;
  type: 'dog' | 'cat' | 'other';
  breed: string;
  age: string;
  gender: 'male' | 'female';
  weight: string;
  avatar: string;
  vaccineStatus: boolean;
  sterilized: boolean;
}

export interface RoomType {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  size: string;
  features: string[];
  image: string;
  stock: number;
}

export interface Booking {
  id: string;
  petId: string;
  petName: string;
  roomId: string;
  roomName: string;
  checkInDate: string;
  checkOutDate: string;
  days: number;
  status: 'pending' | 'confirmed' | 'inProgress' | 'completed' | 'cancelled';
  totalPrice: number;
  createTime: string;
}

export interface FeedingRecord {
  time: string;
  foodType: string;
  amount: string;
  note?: string;
}

export interface Medication {
  name: string;
  dosage: string;
  time: string;
  note?: string;
}

export interface WalkRequirement {
  timesPerDay: number;
  duration: string;
  specialNote?: string;
}

export interface HandoverItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  checked: boolean;
}

export interface HandoverForm {
  bookingId: string;
  petId: string;
  feedingSchedule: FeedingRecord[];
  dietaryRestrictions: string;
  medications: Medication[];
  walkRequirement: WalkRequirement;
  specialNotes: string;
  petPhotos: string[];
  handoverItems: HandoverItem[];
  status: 'draft' | 'submitted' | 'checkedIn' | 'completed';
}

export interface DailyRecord {
  id: string;
  date: string;
  bookingId: string;
  petId: string;
  mood: 'happy' | 'normal' | 'sad' | 'anxious';
  appetite: 'good' | 'normal' | 'poor';
  meals: FeedingRecord[];
  waterIntake: string;
  poopTimes: number;
  poopStatus: string;
  peeTimes: number;
  walkTimes: number;
  notes: string;
  photos: string[];
  videos?: string[];
  createTime: string;
  createdBy: string;
}

export interface Message {
  id: string;
  type: 'system' | 'service' | 'alert' | 'chat';
  title: string;
  content: string;
  time: string;
  read: boolean;
  bookingId?: string;
  avatar?: string;
}

export interface ExpenseItem {
  id: string;
  name: string;
  type: 'room' | 'service' | 'extra';
  price: number;
  quantity: number;
  unit: string;
  date?: string;
}

export interface AddOnService {
  id: string;
  name: string;
  description: string;
  price: number;
  duration?: string;
  icon: string;
  category: 'grooming' | 'walking' | 'training' | 'medical' | 'other';
}

export interface UserInfo {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  memberLevel: string;
  points: number;
}
