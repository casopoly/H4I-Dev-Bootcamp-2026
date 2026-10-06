import Navbar from "../../components/Navbar";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import JobCard from "@/components/Job";
import { JOBS } from "@/data/mockJobs";

export default function Jobs() {
  return (
    <Container className="pb-16">
      <Navbar></Navbar>
      <PageHeader title="Jobs" subtitle="Join our team." />
      <div className="space-y-4">
        {JOBS.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </Container>
  );
}
