"use client";

import { useCallback, useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Image from "next/image";
import { MenuItem } from "@/types/MenuItem";
import { MENU_CATEGORIES } from "@/constants/menu";
import Button from "@/components/ui/Button";
import { requestJson } from "@/lib/requestJson";

type Message = { kind: "success" | "error"; text: string };

// "loading" until the first answer arrives; "failed" keeps the error on screen with a Try again button
type LoadState = { kind: "loading" } | { kind: "ready" } | { kind: "failed"; error: string };

export default function AdminMenuList() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loadState, setLoadState] = useState<LoadState>({ kind: "loading" });
  const [message, setMessage] = useState<Message | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const cooldownTime = 3000; // milliseconds

  const loadItems = useCallback(async () => {
    // no-store so you never see a cached, out-of-date list
    const result = await requestJson<MenuItem[]>("/api/menu", { cache: "no-store" });
    if (!result.ok) {
      setLoadState({ kind: "failed", error: result.error });
      return;
    }
    setItems(result.data);
    setLoadState({ kind: "ready" });
  }, []);

  // Load once when the page opens
  useEffect(() => {
    loadItems();
  }, [loadItems]);

  function retryLoad() {
    setLoadState({ kind: "loading" });
    loadItems();
  }

  async function handleDelete(item: MenuItem) {
    if (!window.confirm(`Delete ${item.name}?`)) return;
    setIsDisabled(true);
    setMessage(null);

    const result = await requestJson(`/api/menu/${item._id}`, { method: "DELETE" });
    if (result.ok) {
      setMessage({ kind: "success", text: `Deleted ${item.name}` });
      await loadItems();
    } else {
      setMessage({ kind: "error", text: `Couldn't delete ${item.name}: ${result.error}` });
    }

    // Re-enable the buttons after the cooldown, whether the delete worked or not
    setTimeout(() => {
      setIsDisabled(false);
    }, cooldownTime);
  }

  if (loadState.kind === "loading") {
    return <p className="text-brand-800">Loading the menu...</p>;
  }

  if (loadState.kind === "failed") {
    return (
      <Card className="flex flex-col items-start gap-4">
        <p role="alert" className="font-medium text-red-700">
          Couldn&apos;t load the menu: {loadState.error}
        </p>
        <Button onClick={retryLoad}>Try again</Button>
      </Card>
    );
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
