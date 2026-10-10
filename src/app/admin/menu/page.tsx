import Navbar from "@/components/Navbar";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import AdminMenuList from "@/components/AdminMenuList";

export default function AdminMenuPage() {
  return (
    <main>
      <Navbar />
      <Container className="pb-12">
        <PageHeader title="Manage menu" subtitle="Add, update or delete menu items" />
        <div className="mb-8">
          <Button href="/admin/menu/new">Add item</Button>
        </div>
        <AdminMenuList />
      </Container>
    </main>
  );
}
