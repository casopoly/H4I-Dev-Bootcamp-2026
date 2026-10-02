import Navbar from "@/components/Navbar";
import { MenuItem } from "@/types/MenuItem";
import MenuCard from "@/components/MenuItem";
import { DUMMY_MENU } from "@/data/mockMenuItems";
import { MENU_CATEGORIES } from "@/constants/menu";
// import connectDB from "@/database/db";

export default async function Menu() {
  const menuItems: MenuItem[] = DUMMY_MENU;
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
