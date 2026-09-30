import mongoose, { Schema } from "mongoose";
import { MenuItem } from "@/types/MenuItem";

const menuSchema = new Schema<MenuItem>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true, enum: ["Cold Drinks", "Hot Drinks", "Pastries"] },
  size: { type: String, required: true, enum: ["S", "M", "L"] },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

export default mongoose.models.MenuItem || mongoose.model("MenuItem", menuSchema, "menu_items");
