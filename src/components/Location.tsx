import { Location } from "@/types/Location";
import Image from "next/image";
import Card from "@/components/ui/Card";

export default function LocationCard({ item }: { item: Location }) {
  return (
    <Card className="flex items-center gap-4">
      <Image
        className="rounded-lg object-cover"
        src={item.image}
        alt={`Image of ${item.city}`}
        width={100}
        height={100}
      />
      <div>
        <h2 className="text_x1">{item.address}</h2>
        <p className="text-sm text-brand-800">{item.city}</p>
        <p className="text-sm text-brand-800">{item.state}</p>
        <p className="text-sm text-brand-800">{item.zip}</p>
        <p className="text-sm text-brand-800">{item.phone}</p>
        <p className="text-sm text-brand-800">{item.hours}</p>
      </div>
    </Card>
  );
}
