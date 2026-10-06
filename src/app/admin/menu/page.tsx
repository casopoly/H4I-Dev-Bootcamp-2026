import Navbar from "@/components/Navbar";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import AdminMenuList from "@/components/AdminMenuList";

export default function AdminMenuPage() {
  return (
    <main>
      <Navbar />
      <Container className="pb-12">
        <PageHeader title="Manage menu" subtitle="Update or delete menu items" />
        <AdminMenuList />
      </Container>
    </main>
  );
}
