import type {
  DayOfWeek,
  RiskBand,
  RiskFactorContribution,
  RiskRecommendation,
  RiskScoreRequest,
  RiskScoreResponse,
  Specialty,
  TimeSlot,
  Weather,
} from "@/types";
import { clamp } from "@/lib/utils";

export const specialtyRisk: Record<Specialty, number> = {
  Physiotherapy: 22,
  Cardiology: 18,
  Ophthalmology: 17,
  Neurology: 15,
  "Trauma & Orthopaedics": 14,
  "Trauma & Ortho": 14,
  "General Surgery": 11,
  Dermatology: 9,
  ENT: 10,
  Gastroenterology: 12,
  Urology: 11,
};

export function leadTimeFactor(days: number): number {
  if (days > 60) return 15;
  if (days >= 30) return 10;
  if (days >= 14) return 6;
  if (days >= 7) return 3;
  return 0;
}

export function previousDNAsFactor(previous: RiskScoreRequest["previousDNAs"]): number {
  switch (previous) {
    case "None":
      return 0;
    case "1 previous DNA":
      return 12;
    case "2 DNAs":
      return 20;
    case "3+ DNAs":
      return 28;
  }
}

export function dayTimeFactor(day: DayOfWeek, time: TimeSlot): number {
  const isMonday = day === "Monday";
  const isFriday = day === "Friday";
  const isEarly = time.startsWith("Early Morning");
  const isEvening = time.startsWith("Evening");
  const isAfternoon = time.startsWith("Afternoon");

  if (isMonday && isEarly) return 8;
  if (isFriday && (isAfternoon || isEvening)) return 6;

  // gentle shaping 0–4
  let points = 0;
  if (isEarly) points += 3;
  if (isEvening) points += 2;
  if (isMonday) points += 1;
  if (day === "Saturday" || day === "Sunday") points += 1;
  return Math.min(4, points);
}

export function weatherFactor(weather: Weather): number {
  switch (weather) {
    case "Clear":
      return 0;
    case "Cloudy":
      return 1;
    case "Rain":
      return 4;
    case "Heavy Rain":
      return 8;
    case "Snow/Ice":
      return 15;
  }
}

export function transportBarrierFactor(flagged: boolean): number {
  return flagged ? 12 : 0;
}

export function reminderDiscount(sent: boolean): number {
  return sent ? 10 : 0;
}

export function bandForScore(score: number): RiskBand {
  if (score >= 70) return "HIGH";
  if (score >= 40) return "MEDIUM";
  return "LOW";
}

export function recommendationForBand(band: RiskBand): RiskRecommendation {
  if (band === "LOW") {
    return {
      title: "Standard Monitoring",
      action: "Send 1 reminder 48 hours before appointment",
      channel: "SMS",
      urgency: "Routine",
    };
  }
  if (band === "MEDIUM") {
    return {
      title: "Enhanced Engagement",
      action:
        "Send reminder at 7 days and 48 hours. Enable 2-way SMS reply for easy cancellation.",
      channel: "SMS + Email",
      urgency: "Moderate",
    };
  }
  return {
    title: "Priority Intervention",
    action:
      "Send reminders at 14 days, 4 days, and 24 hours. Flag for staff call if no confirmation received. Pre-activate backfill slot.",
    channel: "SMS + Email + Staff Alert",
    urgency: "High — Act Now",
  };
}

export function scoreRisk(input: RiskScoreRequest): RiskScoreResponse {
  const specialtyPoints = specialtyRisk[input.specialty];
  const leadPoints = leadTimeFactor(input.leadTimeDays);
  const prevPoints = previousDNAsFactor(input.previousDNAs);
  const deprivationPoints = input.imdScore * 4;
  const dayTimePoints = dayTimeFactor(input.dayOfWeek, input.timeSlot);
  const weatherPoints = weatherFactor(input.weather);
  const transportPoints = transportBarrierFactor(input.transportBarrier);
  const reminderPoints = reminderDiscount(input.reminderSent);

  const base =
    specialtyPoints +
    leadPoints +
    prevPoints +
    deprivationPoints +
    dayTimePoints +
    weatherPoints +
    transportPoints -
    reminderPoints;

  const score = clamp(base, 0, 100);
  const band = bandForScore(score);

  const factors: RiskFactorContribution[] = [
    {
      key: "specialty",
      label: "Specialty weight",
      points: specialtyPoints,
      direction: "increase",
    },
    { key: "leadTime", label: "Lead time", points: leadPoints, direction: "increase" },
    {
      key: "previousDNAs",
      label: "Previous DNAs",
      points: prevPoints,
      direction: "increase",
    },
    {
      key: "deprivation",
      label: "Deprivation",
      points: deprivationPoints,
      direction: "increase",
    },
    { key: "dayTime", label: "Day/time", points: dayTimePoints, direction: "increase" },
    { key: "weather", label: "Weather", points: weatherPoints, direction: "increase" },
    { key: "transport", label: "Transport barrier", points: transportPoints, direction: "increase" },
    {
      key: "reminder",
      label: "Reminder status",
      points: -reminderPoints,
      direction: "decrease",
    },
  ];

  return {
    score,
    band,
    factors,
    recommendation: recommendationForBand(band),
  };
}

