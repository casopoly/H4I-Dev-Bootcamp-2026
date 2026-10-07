"use client";
import { useState } from "react";
import { MenuItem } from "@/types/MenuItem";
import { MENU_CATEGORIES } from "@/constants/menu";
import MenuCard from "@/components/MenuItem";

const slug = (s: string): string => s.toLowerCase().replace(/\s+/g, "-");

export default function MenuBrowser({ items }: { items: MenuItem[] }) {
  const [query, setQuery] = useState("");
  const filtered = items.filter((item) => item.name.toLowerCase().includes(query.trim().toLowerCase()));

  const groups = MENU_CATEGORIES.map((category) => ({
    category,
    items: filtered.filter((item) => item.category === category),
  })).filter((group) => group.items.length > 0);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search the menu"
        aria-label="Search"
        className="w-full text-brand-900 mb-6"
      />

      <div className="flex gap-8">
        <aside className="hidden w-48 shrink-0 md:block">
          <ul className="sticky top-24 space-y-2">
            {groups.map(({ category }) => (
              <li key={category}>
                <a
                  href={`#${slug(category)}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(slug(category))?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </aside>
        <div className="flex-1 space-y-10">
          {groups.map(({ category, items }) => (
            <section key={category} id={category.toLowerCase().replace(/\s+/g, "-")} className="scroll-mt-24">
              <h2>{category}</h2>
              {items.map((item) => (
                <MenuCard key={item._id} item={item} />
              ))}
            </section>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-brand-900">No items found.</p>
      ) : (
        MENU_CATEGORIES.map((category) => {
          const matches = filtered.filter((item) => item.category === category);
          if (matches.length === 0) return null;
        })
      )}
    </div>
  );
}
