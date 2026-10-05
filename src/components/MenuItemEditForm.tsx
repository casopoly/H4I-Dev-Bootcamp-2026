"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MenuItem } from "@/types/MenuItem";
import { MENU_CATEGORIES, MENU_SIZES, MenuCategory, MenuSize } from "@/constants/menu";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// Shared look for every text input, dropdown and textarea in the form
const fieldClass =
  "w-full rounded-lg border border-brand-200 bg-white px-3 py-2 text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200";
const labelClass = "mb-1 block text-sm font-semibold text-brand-700";

type Status = { kind: "idle" } | { kind: "saving" } | { kind: "success" } | { kind: "error"; message: string };

/**
 * Form for editing every field of one menu item.
 * Save sends the fields to PUT /api/menu/<_id>; Cancel goes back to the admin list
 */
export default function MenuItemEditForm({ item }: { item: MenuItem }) {
  const [name, setName] = useState(item.name);
  const [category, setCategory] = useState<MenuCategory>(item.category);
  const [size, setSize] = useState<MenuSize>(item.size);
  // Kept as a string so the input can be empty or half-typed (e.g. "5.") while editing
  const [price, setPrice] = useState(item.price.toString());
  const [description, setDescription] = useState(item.description);
  const [image, setImage] = useState(item.image);
  const [imageFailed, setImageFailed] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Stop the browser from reloading the page on submit
    event.preventDefault();
    setStatus({ kind: "saving" });

    try {
      const response = await fetch(`/api/menu/${item._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, category, size, price: Number(price), description, image }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        setStatus({ kind: "error", message: body.error ?? `Request failed (${response.status})` });
        return;
      }
      setStatus({ kind: "success" });
    } catch {
      setStatus({ kind: "error", message: "Could not reach the server" });
    }
  }

  // next/image only accepts paths that start with "/", so anything else gets the placeholder
  const showPreview = image.startsWith("/") && !imageFailed;

  return (
    <Card>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-brand-50">
            {showPreview ? (
              <Image
                // key resets the image when the path changes, so a new path gets a fresh load
                key={image}
                src={image}
                alt={`Preview of ${name}`}
                width={96}
                height={96}
                // Load the file as-is: it is a tiny preview, and the optimizer would log an error for every half-typed path
                unoptimized
                className="h-full w-full object-cover"
                onError={() => setImageFailed(true)}
              />
            ) : (
              <span className="px-2 text-center text-xs text-brand-700">No image</span>
            )}
          </div>
          <div className="w-full">
            <label htmlFor="image" className={labelClass}>
              Image path
            </label>
            <input
              id="image"
              type="text"
              className={fieldClass}
              value={image}
              placeholder="/images/menu/drinks/latte-m.jpg"
              onChange={(e) => {
                setImage(e.target.value);
                setImageFailed(false);
              }}
            />
          </div>
        </div>

        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input id="name" type="text" className={fieldClass} value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="category" className={labelClass}>
              Category
            </label>
            <select
              id="category"
              className={fieldClass}
              value={category}
              onChange={(e) => setCategory(e.target.value as MenuCategory)}
            >
              {MENU_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="size" className={labelClass}>
              Size
            </label>
            <select id="size" className={fieldClass} value={size} onChange={(e) => setSize(e.target.value as MenuSize)}>
              {MENU_SIZES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="price" className={labelClass}>
              Price ($)
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              min="0"
              className={fieldClass}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className={labelClass}>
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            className={fieldClass}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-between">
          <p role="status" className="text-sm font-medium text-brand-800">
            {status.kind === "success" && "Saved."}
            {status.kind === "error" && `Couldn't save: ${status.message}`}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/admin/menu" className="font-medium">
              Cancel
            </Link>
            <Button type="submit" disabled={status.kind === "saving"}>
              {status.kind === "saving" ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
}
