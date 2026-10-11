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

        <section aria-labelledby="send-message" className="mx-auto mb-12 w-full max-w-xl">
          <Card className="p-6">
            <h2 id="send-message" className="text-2xl font-semibold">
              Send us a message
            </h2>
            <div className="mt-4">
              <ContactForm type="contact" />
            </div>
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
