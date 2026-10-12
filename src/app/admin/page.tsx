import Navbar from "@/components/Navbar";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import { CoffeeCupIcon, MailIcon } from "@/components/ui/icons";

export default function AdminPage() {
  return (
    <main>
      <Navbar />
      <Container className="pb-16">
        <PageHeader title="Admin Page" subtitle="Click the buttons to view messages or edit the menu" />
        <div className="flex flex-col gap-6 sm:items-start">
          <Button href="/admin/messages" variant="dark" size="lg" className="w-full sm:w-72">
            <MailIcon className="h-7 w-7" />
            Messages
          </Button>
          <Button href="/admin/menu" variant="dark" size="lg" className="w-full sm:w-72">
            <CoffeeCupIcon className="h-7 w-7" />
            Menu
          </Button>
        </div>
      </Container>
    </main>
  );
}
