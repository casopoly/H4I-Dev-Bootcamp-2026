// Single source of truth for menu categories and sizes. The array order is the display order.
// Use these in the type, schema, validation, forms and menu page instead of typing the strings again.
export const MENU_CATEGORIES = ["Hot Drinks", "Cold Drinks", "Pastries"] as const;
export type MenuCategory = (typeof MENU_CATEGORIES)[number];

export const MENU_SIZES = ["S", "M", "L"] as const;
export type MenuSize = (typeof MENU_SIZES)[number];

// One entry per size an item is sold in. An item has 1–3 of these (at most one per size).
export type MenuSizePrice = { size: MenuSize; price: number };
