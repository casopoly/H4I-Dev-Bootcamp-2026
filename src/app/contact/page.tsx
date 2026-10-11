import Navbar from "@/components/Navbar";
import LocationCard from "@/components/Location";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import { LOCATIONS } from "@/data/mockLocations";
import Card from "@/components/ui/Card";
import ContactForm from "@/components/ContactForm";

// The message form (#79) goes under the location cards
export default function Contact() {
  return (
    <main>
      <Navbar />
      <Container className="pb-16">
        <PageHeader title="Contact us" subtitle="Come say hi at either of our shops." />

        <h2 className="mb-4">Visit us</h2>

        <section aria-labelledby="send-message" className="mx-auto w-full max-w-xl">
          <Card className="p-6">
            <h2 id="send-message" className="text-2xl font-semibold">
              Send us a message
            </h2>
            <div className="mt-4">
              <ContactForm type="contact" />
            </div>
          </Card>
        </section>

        <div className="grid gap-4 md:grid-cols-2">
          {LOCATIONS.map((location) => (
            <LocationCard key={location._id} item={location} />
          ))}
        </div>
      </Container>
    </main>
  );
}
