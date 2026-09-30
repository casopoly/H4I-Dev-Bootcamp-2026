import connectDB from "@/database/db";
import MenuItem from "@/database/menuSchema";
import { NextResponse } from "next/server";

// Next 14 caches GET routes at build time unless told otherwise
export const dynamic = "force-dynamic";

/**
 * Returns every document in the menu_items collection
 */
export async function GET() {
  try {
    await connectDB();
    const items = await MenuItem.find({});
    return NextResponse.json(items);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch menu items" }, { status: 500 });
  }
}
