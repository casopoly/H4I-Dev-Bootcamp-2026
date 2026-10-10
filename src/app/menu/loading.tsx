import Navbar from "@/components/Navbar";
import Container from "@/components/ui/Container";

export default function Loading() {
  return (
    <main>
      <Navbar />
      <Container className="pb-16">
        <p role="status" className="text-sm font-medium text-brand-800">
          Loading menu...
        </p>
      </Container>
    </main>
  );
}
