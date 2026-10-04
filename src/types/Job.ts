export interface Job {
  _id: string; // e.g. "job_1"
  title: string; // "Barista" or "Manager"
  hoursPerWeek: number; // expected weekly hours, between 10 and 40
  rate: number; // hourly pay in US dollars
  description: string; // brief summary of duties and qualifications
  location: string; // _id of the Location this job is at ("loc_1" or "loc_2", see src/data/mockLocations.ts)
}
