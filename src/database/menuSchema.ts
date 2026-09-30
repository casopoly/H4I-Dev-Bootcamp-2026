import mongoose, { Schema } from "mongoose";

const MenuItemSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  size: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

export default mongoose.models.MenuItem || mongoose.model("MenuItem", MenuItemSchema, "menu_items");
