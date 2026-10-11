import { describe, it, expect } from "vitest";
import { JOBS } from "@/data/mockJobs";
import { LOCATIONS } from "@/data/mockLocations";

describe("JOBS", () => {
  it("points every job at a real location", () => {
    const locationIds = LOCATIONS.map((location) => location._id);
    for (const job of JOBS) {
      expect(locationIds).toContain(job.location);
    }
  });

  it("has hoursPerWeek between 10 and 40 for every job", () => {
    for (const job of JOBS) {
      expect(job.hoursPerWeek).toBeGreaterThanOrEqual(10);
      expect(job.hoursPerWeek).toBeLessThanOrEqual(40);
    }
  });

  it("has a rate greater than 0 for every job", () => {
    for (const job of JOBS) {
      expect(job.rate).toBeGreaterThan(0);
    }
  });

  it("has unique ids", () => {
    const ids = JOBS.map((job) => job._id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
