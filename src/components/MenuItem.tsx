import { MenuItem } from "@/types/MenuItem";
import Image from "next/image";

// Update class names for Tailwind Styles
export default function MenuCard({ item }: { item: MenuItem }) {
  return (
    <div className="card">
      <div className="cardContent">
        <Image className="image" src={item.image} alt={`Image of ${item.name}`} width={100} height={100} />
        <div className="cardHeader">
          <h2 className="name">{item.name}</h2>
        </div>
        <p className="size">{item.size}</p>
        <p className="price">${item.price.toFixed(2)}</p>
      </div>
    </div>
  );
}
