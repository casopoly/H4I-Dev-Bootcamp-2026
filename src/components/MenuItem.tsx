import { MenuItem } from "@/types/MenuItem";
import Image from "next/image";
import Card from "@/components/ui/Card";

export default function MenuCard({ item }: { item: MenuItem }) {
  return (
    <Card className="flex items-center gap-4">
      <Image
        className="rounded-lg object-cover"
        src={item.image}
        alt={`Image of ${item.name}`}
        width={100}
        height={100}
      />
      <div>
        <h2 className="text-xl">{item.name}</h2>
        <p className="text-sm text-brand-800">
          {item.sizes.map((size) => (
            <span key={size.size} className="block">
              {size.size}: <strong>${size.price.toFixed(2)}</strong>
            </span>
          ))}
        </p>
        <p className="text-sm italic text-brand-800 line-clamp-3">{item.description}</p>
      </div>
    </Card>
  );
}
