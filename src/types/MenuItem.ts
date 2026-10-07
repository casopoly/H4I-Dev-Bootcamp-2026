import { MenuCategory, MenuSize } from "@/constants/menu";

export interface MenuItem {
  _id: string;
  name: string;
  category: MenuCategory;
  sizes: { size: MenuSize; price: number }[];
  description: string;
  image: string;
}
