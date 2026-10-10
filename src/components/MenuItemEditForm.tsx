"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MenuItem } from "@/types/MenuItem";
import {
  MENU_CATEGORIES,
  MENU_PLACEHOLDER_IMAGE,
  MENU_SIZES,
  MenuCategory,
  MenuSize,
  MenuSizePrice,
} from "@/constants/menu";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { MenuItemErrors, MenuItemField, validateMenuItem } from "@/lib/validateMenuItem";

// Shared look for every text input, dropdown and textarea in the form
const fieldClass =
  "w-full rounded-lg border border-brand-200 bg-white px-3 py-2 text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 aria-invalid:border-red-500";
const labelClass = "mb-1 block text-sm font-semibold text-brand-700";

// Error message shown under a field (renders nothing when the field is valid)
function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-sm text-red-700">
      {message}
    </p>
  );
}

type Status = { kind: "idle" } | { kind: "saving" } | { kind: "success" } | { kind: "error"; message: string };

/**
 * Form for every field of one menu item.
 * With an item, Save sends the fields to PUT /api/menu/<_id>. Without one (create mode), the form starts
 * empty and Save sends them to POST /api/menu, then goes back to the admin list. Cancel also goes back to the list
 */
export default function MenuItemEditForm({ item }: { item?: MenuItem }) {
  const router = useRouter();
  const [name, setName] = useState(item?.name ?? "");
  const [category, setCategory] = useState<MenuCategory>(item?.category ?? MENU_CATEGORIES[0]);
  // One price input per size, kept as text; a blank input means the item isn't sold in that size
  const [prices, setPrices] = useState<Record<MenuSize, string>>(() => {
    const initial: Record<MenuSize, string> = { S: "", M: "", L: "" };
    for (const { size, price } of item?.sizes ?? []) initial[size] = String(price);
    return initial;
  });
  const [description, setDescription] = useState(item?.description ?? "");
  const [image, setImage] = useState(item?.image ?? "");
  const [imageFailed, setImageFailed] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<MenuItemErrors>({});

  // Remove a field's error message as soon as the user edits that field
  function clearError(field: MenuItemField) {
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Stop the browser from reloading the page on submit
    event.preventDefault();

    // Check the fields first, and don't send anything to the server if any of them is invalid
    // Only sizes with a price entered are included
    const sizes: MenuSizePrice[] = MENU_SIZES.filter((s) => prices[s].trim() !== "").map((s) => ({
      size: s,
      price: Number(prices[s]),
    }));
    // A new item with no image gets the placeholder (the server does the same)
    const fields = {
      name,
      category,
      sizes,
      description,
      image: !item && image.trim() === "" ? MENU_PLACEHOLDER_IMAGE : image,
    };
    const found = validateMenuItem(fields);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus({ kind: "error", message: "please fix the highlighted fields" });
      return;
    }

    setStatus({ kind: "saving" });

    try {
      const response = await fetch(item ? `/api/menu/${item._id}` : "/api/menu", {
        method: item ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        // The server applies the same rules, so show its field messages too
        if (body.errors) setErrors(body.errors);
        setStatus({ kind: "error", message: body.error ?? `Request failed (${response.status})` });
        return;
      }
      setStatus({ kind: "success" });
      // A new item has nothing left to edit here, so show it in the list
      if (!item) router.push("/admin/menu");
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
              placeholder={item ? "/images/menu/drinks/latte-m.jpg" : "Leave blank to use a placeholder image"}
              aria-invalid={errors.image ? true : undefined}
              aria-describedby={errors.image ? "image-error" : undefined}
              onChange={(e) => {
                setImage(e.target.value);
                setImageFailed(false);
                clearError("image");
              }}
            />
            <FieldError id="image-error" message={errors.image} />
          </div>
        </div>

        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            type="text"
            className={fieldClass}
            value={name}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            onChange={(e) => {
              setName(e.target.value);
              clearError("name");
            }}
          />
          <FieldError id="name-error" message={errors.name} />
        </div>

        <div>
          <div>
            <label htmlFor="category" className={labelClass}>
              Category
            </label>
            <select
              id="category"
              className={fieldClass}
              value={category}
              aria-invalid={errors.category ? true : undefined}
              aria-describedby={errors.category ? "category-error" : undefined}
              onChange={(e) => {
                setCategory(e.target.value as MenuCategory);
                clearError("category");
              }}
            >
              {MENU_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <FieldError id="category-error" message={errors.category} />
          </div>
        </div>

        <fieldset>
          <legend className={labelClass}>Prices ($) — leave a size blank to not sell it</legend>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {MENU_SIZES.map((s) => (
              <div key={s}>
                <label htmlFor={`price-${s}`} className="mb-1 block text-sm text-brand-700">
                  {s}
                </label>
                <input
                  id={`price-${s}`}
                  type="number"
                  step="0.01"
                  min="0"
                  className={fieldClass}
                  value={prices[s]}
                  aria-invalid={errors.sizes ? true : undefined}
                  aria-describedby={errors.sizes ? "sizes-error" : undefined}
                  onChange={(e) => {
                    setPrices((previous) => ({ ...previous, [s]: e.target.value }));
                    clearError("sizes");
                  }}
                />
              </div>
            ))}
          </div>
          <FieldError id="sizes-error" message={errors.sizes} />
        </fieldset>

        <div>
          <label htmlFor="description" className={labelClass}>
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            className={fieldClass}
            value={description}
            aria-invalid={errors.description ? true : undefined}
            aria-describedby={errors.description ? "description-error" : undefined}
            onChange={(e) => {
              setDescription(e.target.value);
              clearError("description");
            }}
          />
          <FieldError id="description-error" message={errors.description} />
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
