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
      {MENU_CATEGORIES.map((category) => {
        const matches = filtered.filter((item) => item.category === category);
        if (matches.length === 0) return null;

        return (
          <section key={category} hidden={!matches}>
            <h1>{category}</h1>
            {matches.map((item) => (
              <div key={item.name} hidden={!matches}>
                <MenuCard item={item} />
              </div>
            ))}
          </section>
        );
      })}
    </div>
  );
}
