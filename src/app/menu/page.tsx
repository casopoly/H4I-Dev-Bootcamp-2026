import Navbar from "@/components/Navbar";
import { MenuItem } from "@/types/MenuItem";
import MenuCard from "@/components/MenuItem";
import { MENU_CATEGORIES } from "@/constants/menu";
import connectDB from "@/database/db";
import MenuItemModel from "@/database/menuSchema";
import { serializeMenuItem } from "@/database/serializeMenuItem";

export const dynamic = "force-dynamic";

export default async function Menu() {
  await connectDB();
  const docs = await MenuItemModel.find({}).lean<MenuItem[]>();
  const menuItems: MenuItem[] = docs.map(serializeMenuItem);
  return (
    <main>
      <Navbar />
      {MENU_CATEGORIES.map((category) => (
        <section key={category}>
          <h1>{category}</h1>
          {menuItems
            .filter((item) => item.category === category)
            .map((item) => (
              <MenuCard key={item._id} item={item} />
            ))}
        </section>
      ))}
    </main>
  );
}
