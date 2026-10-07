import Navbar from "@/components/Navbar";
import { MenuItem } from "@/types/MenuItem";
import connectDB from "@/database/db";
import MenuItemModel from "@/database/menuSchema";
import { serializeMenuItem } from "@/database/serializeMenuItem";
import MenuBrowser from "@/components/MenuBrowser";
import Container from "@/components/ui/Container";

export const dynamic = "force-dynamic";

export default async function Menu() {
  await connectDB();
  const docs = await MenuItemModel.find({}).lean<MenuItem[]>();
  const menuItems: MenuItem[] = docs.map(serializeMenuItem);

  return (
    <main>
      <Navbar />
      <Container className="pb-16">
        <MenuBrowser items={menuItems} />
      </Container>
    </main>
  );
}
