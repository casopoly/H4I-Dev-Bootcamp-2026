import { MenuItem } from "@/types/MenuItem";
import Image from "next/image";
import Card from "@/components/ui/Card";
import ItemPrices from "@/components/ItemPrices";

export default function MenuCard({ item }: { item: MenuItem }) {
  // Only an explicit false is sold out; a missing value counts as available
  const soldOut = item.available === false;
  // Fade everything except the Sold out badge
  const faded = soldOut ? "opacity-60" : "";
  return (
    <Card className="flex items-center gap-4">
      <Image
        className={`rounded-lg object-cover ${soldOut ? "opacity-60 grayscale" : ""}`}
        src={item.image}
        alt={`Image of ${item.name}`}
        width={100}
        height={100}
      />
      <div>
        <h2 className="text-xl">
          <span className={faded}>{item.name}</span>
          {soldOut && (
            <span className="ml-2 inline-block rounded bg-rose-800/80 px-2 py-0.5 align-middle font-sans text-xs font-semibold uppercase tracking-wide text-white">
              Sold out
            </span>
          )}
        </h2>
        <div className={faded}>
          <ItemPrices sizes={item.sizes} />
        </div>
        <p className={`text-sm italic text-brand-800 line-clamp-3 ${faded}`}>{item.description}</p>
      </div>
    </Card>
  );
}
