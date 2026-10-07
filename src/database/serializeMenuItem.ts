import { MenuItem } from "@/types/MenuItem";

type MenuItemDoc = Omit<MenuItem, "_id"> & { _id: { toString(): string } };

/**
 * Converts a menu item read from MongoDB into a plain object that is safe to pass to client components.
 * MongoDB's `_id` is an ObjectId (not serializable), so it becomes a string, and `__v` is dropped.
 */
export function serializeMenuItem(doc: MenuItemDoc): MenuItem {
  return {
    _id: doc._id.toString(),
    name: doc.name,
    category: doc.category,
    sizes: doc.sizes.map((s) => ({ size: s.size, price: s.price })),
    description: doc.description,
    image: doc.image,
  };
}
