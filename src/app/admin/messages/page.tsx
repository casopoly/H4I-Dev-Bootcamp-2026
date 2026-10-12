import Navbar from "@/components/Navbar";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import AdminMessageList from "@/components/AdminMessageList";

export default function AdminMessagesPage() {
  return (
    <main>
      <Navbar />
      <Container className="pb-12">
        <PageHeader title="Messages" subtitle="Messages from the Contact page and job applications, newest first" />
        <AdminMessageList />
      </Container>
    </main>
  );
}
