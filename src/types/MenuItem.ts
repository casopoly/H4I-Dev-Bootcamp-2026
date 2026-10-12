import { MenuCategory, MenuSize } from "@/constants/menu";

export interface MenuItem {
  _id: string;
  name: string;
  category: MenuCategory;
  sizes: { size: MenuSize; price: number }[];
  description: string;
  image: string;
  // false means sold out. Optional so older items and code that doesn't know the field still work: a missing value counts as available
  available?: boolean;
}
