import Navbar from "@/components/Navbar";
import { MenuItem } from "@/types/MenuItem";
import MenuCard from "@/components/MenuItem";
import { DUMMY_MENU } from "@/data/mockMenuItems";
import { MENU_CATEGORIES } from "@/constants/menu";
import MenuBrowser from "@/components/MenuBrowser";
// import connectDB from "@/database/db";

export default async function Menu() {
  const menuItems: MenuItem[] = DUMMY_MENU;
  return (
    <main>
      <Navbar />
      <MenuBrowser items={menuItems} />
    </main>
  );
}
