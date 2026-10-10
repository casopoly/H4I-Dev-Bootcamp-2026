import Navbar from "@/components/Navbar";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import MenuItemEditForm from "@/components/MenuItemEditForm";

/**
 * Admin page for adding a menu item. The form is the one used for editing, left empty,
 * and saves through POST /api/menu
 */
export default function AdminNewMenuItemPage() {
  return (
    <main>
      <Navbar />
      <Container className="pb-12">
        <PageHeader title="Add menu item" subtitle="Fill in the details for the new item" />
        <MenuItemEditForm />
      </Container>
    </main>
  );
}
