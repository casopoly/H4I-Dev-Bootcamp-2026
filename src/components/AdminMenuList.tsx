"use client";

import { useCallback, useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Image from "next/image";
import { MenuItem } from "@/types/MenuItem";
import { MENU_CATEGORIES } from "@/constants/menu";
import Button from "@/components/ui/Button";
import { tree } from "next/dist/build/templates/app-page";

type Message = { kind: "success" | "error"; text: string };

export default function AdminMenuList() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [message, setMessage] = useState<Message | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const cooldownTime = 3000; // milliseconds

  const loadItems = useCallback(async () => {
    try {
      // no-store so you never see a cached, out-of-date list
      const response = await fetch("/api/menu", { cache: "no-store" });
      if (!response.ok) {
        setMessage({ kind: "error", text: "Could not load the menu" });
        return;
      }
      if (isLoading) {
        setMessage({ kind: "success", text: "Loading menu..." });
      }
      setItems(await response.json());
    } catch {
      setMessage({ kind: "error", text: "Could not reach the server" });
    } finally {
      setIsLoading(false);
      setMessage({ kind: "success", text: "No menu items yet" });
    }
  }, []);

  // Load once when the page opens
  useEffect(() => {
    loadItems();
  }, [loadItems]);

  async function handleDelete(item: MenuItem) {
    if (!window.confirm(`Delete ${item.name}?`)) return;
    setIsDisabled(true);
    setMessage(null);
    try {
      const response = await fetch(`/api/menu/${item._id}`, { method: "DELETE" });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        setMessage({ kind: "error", text: body.error ?? "Could not delete the item" });
        return;
      }
      setMessage({ kind: "success", text: `Deleted ${item.name}` });
      await loadItems();
    } catch {
      setMessage({ kind: "error", text: "Could not reach the server" });
    }

    setTimeout(() => {
      setIsDisabled(false);
    }, cooldownTime);
  }

  return (
    <div className="flex flex-col gap-8">
      <p
        role="status"
        className={`text-sm font-medium ${message?.kind === "error" ? "text-red-700" : "text-brand-800"}`}
      >
        {message?.text}
      </p>
      {MENU_CATEGORIES.map((category) => (
        <section key={category}>
          <h1>{category}</h1>
          {items
            .filter((item) => item.category === category)
            .map((item) => (
              <div key={item._id}>
                <Card className="flex flex-col gap-4 sm:flex-row sm:items-center">
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
                  <div className="flex flex-row gap-4 text-center sm:ml-auto">
                    <Button variant="dark" onClick={() => handleDelete(item)} disabled={isDisabled}>
                      Delete
                    </Button>
                    <Button href={`menu/${item._id}`}>Update</Button>
                  </div>
                </Card>
              </div>
            ))}
        </section>
      ))}
    </div>
  );
}
