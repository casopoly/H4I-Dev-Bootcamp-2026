import { Location } from "@/types/Location";
import Image from "next/image";
import Card from "@/components/ui/Card";
import { mapsUrl } from "@/lib/mapsUrl";

// One location: the photo on top, with the address, phone and hours underneath
export default function LocationCard({ item }: { item: Location }) {
  return (
    <Card className="flex flex-col gap-4">
      <Image
        className="h-48 w-full rounded-lg object-cover object-[50%_30%]"
        src={item.image}
        alt={`Our ${item.city} location`}
        width={600}
        height={400}
      />
      <div>
        <h2 className="text-xl">
          <a
            href={mapsUrl(item)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-950 hover:text-brand-600 hover:underline"
          >
            {item.address}
            <span className="sr-only"> (opens Google Maps in a new tab)</span>
          </a>
        </h2>
        <p className="text-brand-800">
          {item.city}, {item.state} {item.zip}
        </p>
        <p className="mt-2 text-sm text-brand-800">
          Phone: <a href={`tel:${item.phone}`}>{item.phone}</a>
        </p>
        <p className="text-sm text-brand-800">Hours: {item.hours}</p>
      </div>
    </Card>
  );
}
