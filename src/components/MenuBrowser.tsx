"use client";
import { useState } from "react";
import { MenuItem } from "@/types/MenuItem";
import { MENU_CATEGORIES } from "@/constants/menu";
import MenuCard from "@/components/MenuItem";

export default function MenuBrowser({ items }: { items: MenuItem[] }) {
  const [query, setQuery] = useState("");
  const filtered = items.filter((item) => item.name.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search the menu" />

      {filtered.length === 0 ? (
        <p>No items found.</p>
      ) : (
        MENU_CATEGORIES.map((category) => {
          const matches = filtered.filter((item) => item.category === category);
          if (matches.length === 0) return null;

          return (
            <section key={category}>
              <h1>{category}</h1>
              {matches.map((item) => (
                <MenuCard key={item._id} item={item} />
              ))}
            </section>
          );
        })
      )}
    </div>
  );
}
