import Navbar from "@/components/Navbar";
import LocationCard from "@/components/Location";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import { LOCATIONS } from "@/data/mockLocations";

// The message form (#79) goes under the location cards
export default function Contact() {
  return (
    <main>
      <Navbar />
      <Container className="pb-16">
        <PageHeader title="Contact us" subtitle="Come say hi at either of our shops." />

        <h2 className="mb-4">Visit us</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {LOCATIONS.map((location) => (
            <LocationCard key={location._id} item={location} />
          ))}
        </div>
      </Container>
    </main>
  );
}
