import mongoose, { Schema } from "mongoose";
import { MenuItem } from "@/types/MenuItem";
import { MENU_CATEGORIES, MENU_SIZES } from "@/constants/menu";

const menuSchema = new Schema<Omit<MenuItem, "_id">>({
  name: { type: String, required: true },
  category: { type: String, required: true, enum: MENU_CATEGORIES },
  sizes: {
    type: [
      {
        _id: false,
        size: { type: String, required: true, enum: MENU_SIZES },
        price: {
          type: Number,
          required: true,
          // min is inclusive, so a validator is needed to require more than 0
          validate: { validator: (price: number) => price > 0, message: "Price must be greater than 0" },
        },
      },
    ],
    validate: [
      {
        validator: (sizes: { size: string }[]) => sizes.length >= 1 && sizes.length <= MENU_SIZES.length,
        message: `An item needs between 1 and ${MENU_SIZES.length} sizes`,
      },
      {
        validator: (sizes: { size: string }[]) => new Set(sizes.map((s) => s.size)).size === sizes.length,
        message: "Each size can only appear once",
      },
    ],
  },
  description: { type: String, required: true },
  image: { type: String, required: true },
  available: { type: Boolean, default: true },
});

export default mongoose.models.MenuItem || mongoose.model("MenuItem", menuSchema, "menu_items");
