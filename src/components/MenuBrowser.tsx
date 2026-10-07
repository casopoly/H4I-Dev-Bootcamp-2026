"use client";
import { useState } from "react";
import { MenuItem } from "@/types/MenuItem";
import { MENU_CATEGORIES } from "@/constants/menu";
import MenuCard from "@/components/MenuItem";
import Container from "@/components/ui/Container";

export default function MenuBrowser({ items }: { items: MenuItem[] }) {
  const [query, setQuery] = useState("");
  const filtered = items.filter((item) => item.name.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search the menu"
        aria-label="Search"
        className="w-full text-brand-900 mb-6"
      />

      {filtered.length === 0 ? (
        <p className="text-brand-900">No items found.</p>
      ) : (
        MENU_CATEGORIES.map((category) => {
          const matches = filtered.filter((item) => item.category === category);
          if (matches.length === 0) return null;

          const id = category.toLowerCase().replace(/\s+/g, "-");

          return (
            <div key={category} className=" flex gap-8" id={category.toLowerCase().replace(/\s+/g, "-")}>
              <section className="sticky top-24 self-start hidden md:block px-2 w-1/6 text-center">
                <a
                  key={category}
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {category}
                </a>
              </section>

              <section key={category} className="py-2 w-5/6">
                <h1>{category}</h1>
                {matches.map((item) => (
                  <MenuCard key={item._id} item={item} />
                ))}
              </section>
            </div>
          );
        })
      )}
    </div>
  );
}
