export interface Person {
  id: number;
  name: string;
  dob: string; // Format: YYYY-MM-DD
  placeOfBirth: string;
  parents: number[]; // Array of parent IDs
  gender: 'male' | 'female';
  photoUrl?: string;
  spouseId?: number; // ID of the spouse
  dateOfExpiry?: string; // Format: YYYY-MM-DD
  dateOfMarriage?: string; // Format: YYYY-MM-DD
}

export interface UpcomingEvent {
  personId: number;
  personName: string;
  spouseName?: string;
  type: 'Birthday' | 'Marriage Anniversary' | 'Death Anniversary';
  date: Date;
  daysUntil: number;
  age?: number; // For birthdays
  anniversaryYear?: number; // For anniversaries
}