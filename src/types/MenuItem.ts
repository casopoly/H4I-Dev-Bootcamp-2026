export interface MenuItem {
  id: string;
  name: string;
  category: "Cold Drinks" | "Hot Drinks" | "Pastries";
  size: "S" | "M" | "L";
  price: number;
  description: string;
  image: string;
}
