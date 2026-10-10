import Navbar from "@/components/Navbar";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function AdminPage() {
  return (
    <main>
      <Navbar />
      <Container className="pb-16">
        <PageHeader title="Admin Page" subtitle="Click the buttons to view messages or edit the menu" />
        <Card>
          <Button href="/admin/messages" variant="dark" size="lg">
            Messages
          </Button>
        </Card>
        <Card>
          <Button href="/admin/menu" variant="dark" size="lg">
            Menu
          </Button>
        </Card>
      </Container>
    </main>
  );
}
