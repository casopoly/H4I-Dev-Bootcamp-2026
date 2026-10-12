import Navbar from "@/components/Navbar";
import LocationCard from "@/components/Location";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import { LOCATIONS } from "@/data/mockLocations";
import Card from "@/components/ui/Card";
import ContactForm from "@/components/ContactForm";

export default function Contact() {
  return (
    <main>
      <Navbar />
      <Container className="pb-16">
        <PageHeader title="Contact us" subtitle="Questions, feedback or just saying hi? Send us a note." />

        {/* Full width but short (name and email side by side, a 3-row message, no heading under the page title), so the shops below stay near the top */}
        <section aria-label="Send us a message" className="mb-10 w-full">
          <Card className="p-5">
            <ContactForm type="contact" />
          </Card>
        </section>

        <h2 className="mb-2">Visit us</h2>
        <p className="mb-4 text-brand-800">Come say hi at either of our shops.</p>
        <div className="grid gap-4 md:grid-cols-2">
          {LOCATIONS.map((location) => (
            <LocationCard key={location._id} item={location} />
          ))}
        </div>
      </Container>
    </main>
  );
}
