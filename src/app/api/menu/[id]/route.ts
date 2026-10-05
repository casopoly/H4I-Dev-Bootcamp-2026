import connectDB from "@/database/db";
import MenuItem from "@/database/menuSchema";
import { serializeMenuItem } from "@/database/serializeMenuItem";
import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

// Next 14 caches GET routes at build time unless told otherwise
export const dynamic = "force-dynamic";

type Params = { params: { id: string } };

/**
 * Returns the menu item with the given _id
 * Returns 404 if there isn't one, and 400 if the id is invalid
 */
export async function GET(_request: NextRequest, { params }: Params) {
  // A string that isn't a valid ObjectId can't match any item, and findById would throw on it
  if (!isValidObjectId(params.id)) {
    return NextResponse.json({ error: "Menu item id not valid" }, { status: 400 });
  }

  try {
    await connectDB();
    const item = await MenuItem.findById(params.id);
    if (!item) {
      return NextResponse.json({ error: "Menu item not found" }, { status: 404 });
    }
    return NextResponse.json(serializeMenuItem(item));
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch menu item" }, { status: 500 });
  }
}

/**
 * Updates the menu item with the given _id using the fields in the request body,
 * then returns the updated item. Returns 404 if there isn't one, and 400 if the id is invalid
 */
export async function PUT(request: NextRequest, { params }: Params) {
  if (!isValidObjectId(params.id)) {
    return NextResponse.json({ error: "Menu item id not valid" }, { status: 400 });
  }

  let updates;
  try {
    updates = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON" }, { status: 400 });
  }

  try {
    // _id is set by MongoDB and can't be changed
    delete updates._id;
    await connectDB();
    // new: true returns the item after the update instead of before it
    const item = await MenuItem.findByIdAndUpdate(params.id, updates, { new: true });
    if (!item) {
      return NextResponse.json({ error: "Menu item not found" }, { status: 404 });
    }
    return NextResponse.json(serializeMenuItem(item));
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update menu item" }, { status: 500 });
  }
}

/**
 * Deletes the menu item with the given _id
 * Returns 404 if there isn't one, and 400 if the id is invalid
 */
export async function DELETE(_request: NextRequest, { params }: Params) {
  if (!isValidObjectId(params.id)) {
    return NextResponse.json({ error: "Menu item id not valid" }, { status: 400 });
  }

  try {
    await connectDB();
    const item = await MenuItem.findByIdAndDelete(params.id);
    if (!item) {
      return NextResponse.json({ error: "Menu item not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Menu item deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete menu item" }, { status: 500 });
  }
}
