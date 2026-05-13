import type {
  BackfillResponse,
  HighRiskAppointment,
  KPIResponse,
  SpecialtyRate,
} from "@/types";

export const kpis: KPIResponse = {
  todayHighRisk: 23,
  monthlyDNARate: 4.2,
  slotsBackfilled: 47,
  monthlySaving: 18400,
};

export const dnaTrend12Months: Array<{
  month: string;
  before: number | null;
  after: number | null;
}> = [
  { month: "Jun 25", before: 6.4, after: null },
  { month: "Jul 25", before: 6.1, after: null },
  { month: "Aug 25", before: 6.3, after: null },
  { month: "Sep 25", before: 6.0, after: 5.8 },
  { month: "Oct 25", before: 5.7, after: 5.1 },
  { month: "Nov 25", before: 5.9, after: 4.8 },
  { month: "Dec 25", before: 5.5, after: 4.4 },
  { month: "Jan 26", before: 5.8, after: 4.2 },
  { month: "Feb 26", before: 5.6, after: 4.0 },
  { month: "Mar 26", before: 5.4, after: 3.8 },
  { month: "Apr 26", before: null, after: 3.9 },
  { month: "May 26", before: null, after: 4.2 },
];

export const specialtyRates: SpecialtyRate[] = [
  { specialty: "Physiotherapy", rate: 11.0 },
  { specialty: "Cardiology", rate: 8.9 },
  { specialty: "Ophthalmology", rate: 8.8 },
  { specialty: "Trauma & Ortho", rate: 7.9 },
  { specialty: "Neurology", rate: 7.2 },
  { specialty: "General Surgery", rate: 5.8 },
  { specialty: "Dermatology", rate: 5.1 },
  { specialty: "Average", rate: 6.4 },
];

export const slotsRecoveredMonthly: Array<{ month: string; slots: number }> = [
  { month: "Sep 25", slots: 12 },
  { month: "Oct 25", slots: 28 },
  { month: "Nov 25", slots: 35 },
  { month: "Dec 25", slots: 41 },
  { month: "Jan 26", slots: 38 },
  { month: "Feb 26", slots: 47 },
  { month: "Mar 26", slots: 52 },
  { month: "Apr 26", slots: 49 },
  { month: "May 26", slots: 47 },
];

export const todayRiskDistribution: Array<{
  name: string;
  value: number;
  color: string;
}> = [
  { name: "Low Risk (0-39)", value: 142, color: "#007F3B" },
  { name: "Medium Risk (40-69)", value: 38, color: "#FFB81C" },
  { name: "High Risk (70-100)", value: 23, color: "#DA291C" },
];

export const equityBreakdown: Array<{
  quintile: number;
  label: string;
  rate: string;
  change: string;
  status: "Improving" | "On Target";
}> = [
  {
    quintile: 1,
    label: "Most Deprived",
    rate: "7.8%",
    change: "-2.4%",
    status: "Improving",
  },
  {
    quintile: 2,
    label: "Deprived",
    rate: "6.1%",
    change: "-1.9%",
    status: "Improving",
  },
  { quintile: 3, label: "Average", rate: "4.8%", change: "-1.5%", status: "On Target" },
  { quintile: 4, label: "Affluent", rate: "3.9%", change: "-1.1%", status: "On Target" },
  {
    quintile: 5,
    label: "Least Deprived",
    rate: "3.2%",
    change: "-0.9%",
    status: "On Target",
  },
];

export const highRiskAppointments: HighRiskAppointment[] = [
  {
    id: "apt-1",
    time: "09:15",
    patientRef: "PT-2847",
    specialty: "Physiotherapy",
    riskScore: 87,
    riskFactors: ["Previous DNA x2", "Mon AM", "IMD Q1"],
    action: "Contact Now",
  },
  {
    id: "apt-2",
    time: "10:30",
    patientRef: "PT-1923",
    specialty: "Cardiology",
    riskScore: 82,
    riskFactors: ["Long booking lead time", "rain forecast"],
    action: "Contact Now",
  },
  {
    id: "apt-3",
    time: "11:00",
    patientRef: "PT-3341",
    specialty: "Ophthalmology",
    riskScore: 79,
    riskFactors: ["Age 74", "no prev confirmation"],
    action: "Contact Now",
  },
  {
    id: "apt-4",
    time: "14:15",
    patientRef: "PT-0892",
    specialty: "Trauma & Orthopaedics",
    riskScore: 76,
    riskFactors: ["Previous DNA x1", "IMD Q2"],
    action: "Contact Now",
  },
  {
    id: "apt-5",
    time: "15:20",
    patientRef: "PT-4510",
    specialty: "Neurology",
    riskScore: 74,
    riskFactors: ["Lead time 62 days", "Heavy rain", "Fri PM"],
    action: "Contact Now",
  },
  {
    id: "apt-6",
    time: "16:05",
    patientRef: "PT-7703",
    specialty: "Physiotherapy",
    riskScore: 73,
    riskFactors: ["Previous DNA x1", "Transport barrier flagged"],
    action: "Contact Now",
  },
  {
    id: "apt-7",
    time: "17:10",
    patientRef: "PT-2088",
    specialty: "Cardiology",
    riskScore: 71,
    riskFactors: ["Mon early", "IMD Q1", "No reminder sent"],
    action: "Contact Now",
  },
  {
    id: "apt-8",
    time: "18:00",
    patientRef: "PT-6135",
    specialty: "Ophthalmology",
    riskScore: 70,
    riskFactors: ["Age 76+", "Snow/Ice forecast", "No confirmation"],
    action: "Contact Now",
  },
];

export const backfillData: BackfillResponse = {
  openSlots: 7,
  reserveList: 143,
  avgFillMinutes: 107,
  slots: [
    {
      id: "slot-1",
      slotTime: "Today 14:30",
      specialty: "Physiotherapy",
      clinician: "Dr. Okafor",
      vacancyReason: "Patient Cancelled",
      reserveMatches: 12,
      status: "Contacting",
      action: "View",
    },
    {
      id: "slot-2",
      slotTime: "Today 15:00",
      specialty: "Cardiology",
      clinician: "Dr. Patel",
      vacancyReason: "Predicted DNA (score: 91)",
      reserveMatches: 3,
      status: "Pending",
      action: "Activate",
    },
    {
      id: "slot-3",
      slotTime: "Tomorrow 09:15",
      specialty: "Ophthalmology",
      clinician: "Mr. Hassan",
      vacancyReason: "Patient Cancelled",
      reserveMatches: 8,
      status: "Filled",
      action: "View",
    },
    {
      id: "slot-4",
      slotTime: "Tomorrow 10:30",
      specialty: "Neurology",
      clinician: "Dr. Singh",
      vacancyReason: "Predicted DNA (score: 78)",
      reserveMatches: 5,
      status: "Pending",
      action: "Activate",
    },
    {
      id: "slot-5",
      slotTime: "Tomorrow 14:00",
      specialty: "Dermatology",
      clinician: "Dr. Williams",
      vacancyReason: "Patient Cancelled",
      reserveMatches: 19,
      status: "Contacting",
      action: "View",
    },
    {
      id: "slot-6",
      slotTime: "14 May 09:00",
      specialty: "General Surgery",
      clinician: "Mr. Ali",
      vacancyReason: "Patient Cancelled",
      reserveMatches: 7,
      status: "Pending",
      action: "Activate",
    },
    {
      id: "slot-7",
      slotTime: "14 May 11:15",
      specialty: "Physiotherapy",
      clinician: "Dr. Okafor",
      vacancyReason: "Predicted DNA (score: 74)",
      reserveMatches: 14,
      status: "Pending",
      action: "Activate",
    },
  ],
  reservePatients: [
    {
      id: "rp-1",
      patientRef: "PT-1847",
      specialty: "Physiotherapy",
      waitingSinceDays: 23,
      maxTravel: "< 5 miles",
      preferredTimes: "Any",
      priority: "Clinical Priority",
    },
    {
      id: "rp-2",
      patientRef: "PT-2293",
      specialty: "Cardiology",
      waitingSinceDays: 45,
      maxTravel: "< 10 miles",
      preferredTimes: "Mornings",
      priority: "Routine",
    },
    {
      id: "rp-3",
      patientRef: "PT-0934",
      specialty: "Ophthalmology",
      waitingSinceDays: 31,
      maxTravel: "< 3 miles",
      preferredTimes: "Afternoons",
      priority: "Clinical Priority",
    },
    {
      id: "rp-4",
      patientRef: "PT-5701",
      specialty: "Neurology",
      waitingSinceDays: 18,
      maxTravel: "< 8 miles",
      preferredTimes: "Mornings",
      priority: "Routine",
    },
    {
      id: "rp-5",
      patientRef: "PT-6109",
      specialty: "Dermatology",
      waitingSinceDays: 27,
      maxTravel: "< 4 miles",
      preferredTimes: "Afternoons",
      priority: "Routine",
    },
    {
      id: "rp-6",
      patientRef: "PT-3120",
      specialty: "General Surgery",
      waitingSinceDays: 52,
      maxTravel: "< 12 miles",
      preferredTimes: "Any",
      priority: "Clinical Priority",
    },
    {
      id: "rp-7",
      patientRef: "PT-1184",
      specialty: "Physiotherapy",
      waitingSinceDays: 9,
      maxTravel: "< 2 miles",
      preferredTimes: "Evenings",
      priority: "Routine",
    },
    {
      id: "rp-8",
      patientRef: "PT-4452",
      specialty: "Cardiology",
      waitingSinceDays: 21,
      maxTravel: "< 6 miles",
      preferredTimes: "Mornings",
      priority: "Clinical Priority",
    },
    {
      id: "rp-9",
      patientRef: "PT-8066",
      specialty: "Ophthalmology",
      waitingSinceDays: 13,
      maxTravel: "< 3 miles",
      preferredTimes: "Any",
      priority: "Routine",
    },
    {
      id: "rp-10",
      patientRef: "PT-9012",
      specialty: "ENT",
      waitingSinceDays: 34,
      maxTravel: "< 5 miles",
      preferredTimes: "Afternoons",
      priority: "Routine",
    },
  ],
};

export const backfillPerformance8Weeks: Array<{
  week: string;
  recovered: number;
  lost: number;
}> = [
  { week: "W1 Mar", recovered: 28, lost: 14 },
  { week: "W2 Mar", recovered: 31, lost: 11 },
  { week: "W3 Mar", recovered: 35, lost: 9 },
  { week: "W4 Mar", recovered: 29, lost: 13 },
  { week: "W1 Apr", recovered: 38, lost: 8 },
  { week: "W2 Apr", recovered: 41, lost: 7 },
  { week: "W3 Apr", recovered: 44, lost: 6 },
  { week: "W4 Apr", recovered: 47, lost: 5 },
];

