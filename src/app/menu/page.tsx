import Navbar from "@/components/Navbar";
import { MenuItem } from "@/types/MenuItem";
import MenuCard from "@/components/MenuItem";
import { DUMMY_MENU } from "@/data/mockMenuItems";
// import connectDB from "@/database/db";

export default async function Menu() {
  const menuItems: MenuItem[] = DUMMY_MENU;
  return (
    <main>
      <Navbar />
      <h1>Hot Drinks</h1>
      {menuItems
        .filter((item) => item.category === "Hot Drinks")
        .map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      <h1>Cold Drinks</h1>
      {menuItems
        .filter((item) => item.category === "Cold Drinks")
        .map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      <h1>Pastries</h1>
      {menuItems
        .filter((item) => item.category === "Pastries")
        .map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
    </main>
  );
}
