import { Job } from "@/types/Job";
import { LOCATIONS } from "@/data/mockLocations";
import Card from "@/components/ui/Card";

// Displays one job listing as a two-column table (label, value)
export default function JobCard({ job }: { job: Job }) {
  // job.location stores a Location _id, so look up its city and state to display
  const location = LOCATIONS.find((loc) => loc._id === job.location);

  const rows = [
    { label: "Position", value: job.title },
    { label: "Hours", value: `${job.hoursPerWeek}/week` },
    { label: "Rate", value: `$${job.rate.toFixed(2)}/hour` },
    { label: "Description", value: job.description },
    { label: "Location", value: location ? `${location.city}, ${location.state}` : job.location },
  ];

  return (
    <Card>
      <table className="w-full text-left">
        <tbody className="divide-y divide-brand-100">
          {rows.map((row) => (
            <tr key={row.label} className="align-baseline">
              <th scope="row" className="w-28 py-2 pr-4 text-sm font-semibold text-brand-700">
                {row.label}
              </th>
              <td className="py-2 text-ink">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
