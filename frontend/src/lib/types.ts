export type SkillLevel = "beginner" | "intermediate" | "advanced";

export interface SkillInterest {
  name: string;
  level?: SkillLevel;
  topics?: string[];
  goal?: string;
}

export interface AvailabilitySlot {
  day: string;
  start: string;
  end: string;
  timezone: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  location?: string;
  bio?: string;
  teach: SkillInterest[];
  learn: SkillInterest[];
  availability: AvailabilitySlot[];
  rating?: number;
  reviews?: number;
}

export interface Match {
  id: string;
  user: UserProfile;
  compatibility: number;
  overlapMinutes: number;
  sharedGoals?: string[];
}

export interface Swap {
  id: string;
  partner: UserProfile;
  teachMinutes: number;
  learnMinutes: number;
  status: "proposed" | "active" | "completed";
  contractNote?: string;
  meetingLink?: string;
}

export interface Session {
  id: string;
  swapId: string;
  topic: string;
  scheduledFor: string;
  durationMinutes: number;
  meetingLink?: string;
  status: "scheduled" | "completed";
  notes?: string;
}
