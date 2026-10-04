import { Job } from "../types/Job";

export const JOBS: Job[] = [
  {
    _id: "job_1",
    title: "Barista",
    hoursPerWeek: 20,
    rate: 18.5,
    description:
      "Prepare espresso drinks, teas, and pastries, take orders, and keep the bar clean. No experience required; we train on the job. Weekend availability preferred.",
    location: "loc_1",
  },
  {
    _id: "job_2",
    title: "Manager",
    hoursPerWeek: 40,
    rate: 25,
    description:
      "Run daily operations, build staff schedules, train new baristas, and handle inventory and supplier orders. At least one year of cafe or restaurant leadership experience required.",
    location: "loc_1",
  },
  {
    _id: "job_3",
    title: "Barista",
    hoursPerWeek: 25,
    rate: 22.5,
    description:
      "Prepare espresso drinks, teas, and pastries, take orders, and keep the bar clean. No experience required; we train on the job. Early morning availability preferred.",
    location: "loc_2",
  },
  {
    _id: "job_4",
    title: "Manager",
    hoursPerWeek: 40,
    rate: 29,
    description:
      "Run daily operations, build staff schedules, train new baristas, and handle inventory and supplier orders. At least one year of cafe or restaurant leadership experience required.",
    location: "loc_2",
  },
];
