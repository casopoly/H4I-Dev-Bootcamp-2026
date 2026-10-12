import { MenuItem } from "@/types/MenuItem";

// The prices of one menu item. Several sizes line up in two columns (size, price); a single size shows just the price
export default function ItemPrices({ sizes }: { sizes: MenuItem["sizes"] }) {
  return (
    <div className="text-sm text-brand-800">
      {sizes.map((size) => (
        <div key={size.size} className="flex gap-2">
          {sizes.length > 1 && <span className="w-4">{size.size}:</span>}
          <strong className="tabular-nums">${size.price.toFixed(2)}</strong>
        </div>
      ))}
    </div>
  );
}
