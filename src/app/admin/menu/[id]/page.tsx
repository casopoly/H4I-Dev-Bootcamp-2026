import { notFound } from "next/navigation";
import { isValidObjectId } from "mongoose";
import connectDB from "@/database/db";
import MenuItemModel from "@/database/menuSchema";
import { serializeMenuItem } from "@/database/serializeMenuItem";
import Navbar from "@/components/Navbar";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import MenuItemEditForm from "@/components/MenuItemEditForm";

// Always load the latest data from MongoDB instead of a cached copy
export const dynamic = "force-dynamic";

/**
 * Admin page for editing one menu item. Loads the item on the server,
 * then hands it to the client-side form, which saves through PUT /api/menu/<_id>
 */
export default async function AdminMenuItemPage({ params }: { params: { id: string } }) {
  // An id that isn't a valid ObjectId can't match any item (and findById would throw on it)
  if (!isValidObjectId(params.id)) {
    notFound();
  }

  await connectDB();
  const doc = await MenuItemModel.findById(params.id);
  if (!doc) {
    notFound();
  }
  const item = serializeMenuItem(doc);

  return (
    <main>
      <Navbar />
      <Container className="pb-12">
        <PageHeader title="Edit menu item" subtitle={item.name} />
        <MenuItemEditForm item={item} />
      </Container>
    </main>
  );
}
