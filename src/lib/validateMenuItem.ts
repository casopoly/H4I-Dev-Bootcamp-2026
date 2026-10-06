import { MENU_CATEGORIES, MENU_SIZES } from "@/constants/menu";

// The fields an admin can edit, and the error message (if any) for each one
export type MenuItemField = "name" | "category" | "size" | "price" | "description" | "image";
export type MenuItemErrors = Partial<Record<MenuItemField, string>>;

const isNonEmptyString = (value: unknown): value is string => typeof value === "string" && value.trim() !== "";

// Each rule returns an error message, or undefined when the value is fine
const rules: Record<MenuItemField, (value: unknown) => string | undefined> = {
  name: (value) => (isNonEmptyString(value) ? undefined : "Name is required"),
  category: (value) =>
    (MENU_CATEGORIES as readonly unknown[]).includes(value)
      ? undefined
      : `Category must be one of: ${MENU_CATEGORIES.join(", ")}`,
  size: (value) =>
    (MENU_SIZES as readonly unknown[]).includes(value) ? undefined : `Size must be one of: ${MENU_SIZES.join(", ")}`,
  price: (value) =>
    typeof value === "number" && Number.isFinite(value) && value > 0
      ? undefined
      : "Price must be a number greater than 0",
  description: (value) => (isNonEmptyString(value) ? undefined : "Description is required"),
  image: (value) =>
    typeof value === "string" && value.startsWith("/images/")
      ? undefined
      : 'Image must be a path that starts with "/images/"',
};

/**
 * Checks the editable fields of a menu item and returns an error message for each invalid field.
 * An empty object means the input is valid. Used by the edit form (before sending) and by the API routes
 * (before saving), so both apply the same rules.
 *
 * partial: only check the fields that are present in the input. Use this for updates (PUT) that send just some fields
 */
export function validateMenuItem(input: Record<string, unknown>, { partial = false } = {}): MenuItemErrors {
  const errors: MenuItemErrors = {};
  for (const field of Object.keys(rules) as MenuItemField[]) {
    if (partial && !(field in input)) continue;
    const message = rules[field](input[field]);
    if (message) errors[field] = message;
  }
  return errors;
}
