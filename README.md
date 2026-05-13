# 🏥 ClearSlot — NHS Appointment Intelligence Platform

[![Next.js 14](https://img.shields.io/badge/Next.js-14-black)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Utility--First-38B2AC)](#)
[![Vercel](https://img.shields.io/badge/Vercel-Ready-black)](#)
[![NHS Compliant](https://img.shields.io/badge/NHS-Standards--Aligned-005EB8)](#)
[![MIT License](https://img.shields.io/badge/License-MIT-green)](#license)

> "Predict the gap before it happens."

[Live Demo](https://clearslot-nhs.vercel.app) · [GitHub](https://github.com/YOUR_USERNAME/clearslot-nhs)

---

## The Problem

Every year, NHS services lose huge amounts of clinical capacity to DNAs (Did Not Attend). NHS England reporting and operational statistics highlight missed appointments at national scale, driving avoidable cost, longer waits, and reduced patient access.

ClearSlot focuses on the appointment-management layer (not clinical content) to help teams anticipate DNAs, reduce wasted time, and recover cancelled capacity safely and transparently.

## What ClearSlot Does

ClearSlot follows a simple operational loop:

**Predict → Prevent → Recover**

- **Predict**: score bookings 0–100 for DNA risk using operational and contextual features.
- **Prevent**: send smart reminders at the optimal time and channel.
- **Recover**: automatically backfill newly-available slots from a reserve list.

## Features

- **Landing** (`/`): NHS-styled product overview and impact narrative
- **Dashboard** (`/dashboard`): KPI bar, DNA trend, specialty DNA rates, recovery chart, equity breakdown, high-risk list
- **Risk Engine** (`/risk-engine`): interactive simulator calling `POST /api/risk-score` with transparent factors + recommendation
- **Backfill** (`/backfill`): slot recovery engine view, reserve list, performance chart
- **Compliance** (`/compliance`): DSPT / GDPR / DCB0129 alignment, data access boundaries, retention, risk register, integration flow
- **Roadmap** (`/roadmap`): phased implementation timeline, resource estimate, budget and funding options

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14 (App Router) | Full-stack framework |
| TypeScript (strict) | Type safety |
| Tailwind CSS | Styling |
| shadcn/ui-style primitives | Accessible UI building blocks |
| Recharts | Data visualisation |
| next-themes | Dark mode |
| Zod | API validation |
| Azure UK South | NHS-compliant hosting (target environment) |

## NHS Compliance

ClearSlot is designed around NHS governance expectations:

- **NHS DSPT** (in progress)
- **UK GDPR** (data minimisation; no clinical data stored)
- **DCB0129** clinical risk management alignment
- **GP Connect / FHIR R4** integration approach
- **Cyber Essentials Plus** (in progress)

## Data Sources

- NHS England — Monthly Operational Statistics: `https://www.england.nhs.uk/statistics/`
- BMA — NHS Backlog Data Analysis: `https://www.bma.org.uk/`
- GP Patient Survey 2025 (CQC): `https://www.gp-patient.co.uk/`
- House of Commons Library — NHS Key Statistics: `https://commonslibrary.parliament.uk/`

## Getting Started

```bash
git clone https://github.com/YOUR_USERNAME/clearslot-nhs
cd clearslot-nhs
npm install
cp .env.local .env.local
npm run dev
```

Open `http://localhost:3000`

## Deployment (Vercel)

1. Push to GitHub
2. Import the repository at `vercel.com`
3. Click **Deploy** (zero config needed)
4. Your URL: `https://clearslot-nhs.vercel.app`

## The Scoring Model

ClearSlot’s simulator mirrors a transparent scoring approach:

```
base_score = specialty_risk[specialty]
  + lead_time_factor(days)
  + previous_dnas_factor(previousDNAs)
  + (imd_score * 4)
  + day_time_factor(day, time)
  + weather_factor(weather)
  + transport_barrier(flagged)
  - reminder_discount(sent)

final_score = clamp(base_score, 0, 100)
```

Key weights:

- `specialty_risk`: Physiotherapy 22, Cardiology 18, Ophthalmology 17, Neurology 15, Trauma & Ortho 14, General Surgery 11, Dermatology 9, ENT 10, Gastroenterology 12, Urology 11
- `lead_time_factor`: >60:+15, 30–60:+10, 14–30:+6, 7–14:+3, <7:+0
- `previous_dnas`: None:+0, 1:+12, 2:+20, 3+:+28
- `imd_score`: score × 4 (IMD5 = +20)
- `weather`: Clear:+0, Cloudy:+1, Rain:+4, Heavy Rain:+8, Snow/Ice:+15
- `transport_barrier`: Yes:+12, No:+0
- `reminder_discount`: sent:-10, not sent:0

## Disclaimer

This is a research and educational demonstration built using publicly available NHS data. It is not a regulated medical device and is not intended for clinical use. All patient references are synthetic.

## License

MIT
