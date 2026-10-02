import { MenuCategory, MenuSize } from "@/constants/menu";

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  size: MenuSize;
  price: number;
  description: string;
  image: string;
}
