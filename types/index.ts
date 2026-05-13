export type Specialty =
  | "Physiotherapy"
  | "Cardiology"
  | "Ophthalmology"
  | "Neurology"
  | "Trauma & Orthopaedics"
  | "Trauma & Ortho"
  | "General Surgery"
  | "Dermatology"
  | "ENT"
  | "Gastroenterology"
  | "Urology";

export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type TimeSlot =
  | "Early Morning (8-9am)"
  | "Morning (9am-12pm)"
  | "Afternoon (12-5pm)"
  | "Evening (5pm+)";

export type AgeGroup = "18-30" | "31-45" | "46-60" | "61-75" | "76+";

export type Weather = "Clear" | "Cloudy" | "Rain" | "Heavy Rain" | "Snow/Ice";

export type RiskBand = "LOW" | "MEDIUM" | "HIGH";

export interface KPIResponse {
  todayHighRisk: number;
  monthlyDNARate: number;
  slotsBackfilled: number;
  monthlySaving: number;
}

export interface HighRiskAppointment {
  id: string;
  time: string;
  patientRef: string;
  specialty: Specialty;
  riskScore: number;
  riskFactors: string[];
  action: "Contact Now";
}

export interface SpecialtyRate {
  specialty: string;
  rate: number;
}

export type SlotStatus = "Filled" | "Contacting" | "Pending";

export interface BackfillSlot {
  id: string;
  slotTime: string;
  specialty: Specialty;
  clinician: string;
  vacancyReason: string;
  reserveMatches: number;
  status: SlotStatus;
  action: "View" | "Activate";
}

export type ReservePriority = "Clinical Priority" | "Routine";

export interface ReservePatient {
  id: string;
  patientRef: string;
  specialty: Specialty;
  waitingSinceDays: number;
  maxTravel: string;
  preferredTimes: string;
  priority: ReservePriority;
}

export interface BackfillResponse {
  openSlots: number;
  reserveList: number;
  avgFillMinutes: number;
  slots: BackfillSlot[];
  reservePatients: ReservePatient[];
}

export interface RiskScoreRequest {
  specialty: Specialty;
  dayOfWeek: DayOfWeek;
  timeSlot: TimeSlot;
  leadTimeDays: number;
  ageGroup: AgeGroup;
  imdScore: 1 | 2 | 3 | 4 | 5;
  previousDNAs: "None" | "1 previous DNA" | "2 DNAs" | "3+ DNAs";
  reminderSent: boolean;
  weather: Weather;
  transportBarrier: boolean;
}

export interface RiskFactorContribution {
  key:
    | "specialty"
    | "leadTime"
    | "previousDNAs"
    | "deprivation"
    | "dayTime"
    | "weather"
    | "transport"
    | "reminder";
  label: string;
  points: number;
  direction: "increase" | "decrease";
}

export interface RiskRecommendation {
  title: string;
  action: string;
  channel: string;
  urgency: string;
}

export interface RiskScoreResponse {
  score: number;
  band: RiskBand;
  factors: RiskFactorContribution[];
  recommendation: RiskRecommendation;
}

