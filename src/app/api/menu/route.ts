import connectDB from "@/database/db";
import MenuItem from "@/database/menuSchema";
import { serializeMenuItem } from "@/database/serializeMenuItem";
import { MENU_PLACEHOLDER_IMAGE } from "@/constants/menu";
import { validateMenuItem } from "@/lib/validateMenuItem";
import { NextRequest, NextResponse } from "next/server";

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

/**
 * Creates a menu item from the request body and returns it with status 201.
 * Unlike PUT, the whole body is validated. A missing or blank image gets the placeholder.
 * Returns 400 with an error per field when the input is invalid. Admin only: src/middleware.ts answers 401 without the login cookie
 */
export async function POST(request: NextRequest) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON" }, { status: 400 });
  }

  // The body must be an object of fields (not null, an array or a plain value)
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return NextResponse.json({ error: "Request body must be a JSON object" }, { status: 400 });
  }

  const hasImage = typeof body.image === "string" ? body.image.trim() !== "" : body.image != null;
  const fields = { ...body, image: hasImage ? body.image : MENU_PLACEHOLDER_IMAGE };

  const errors = validateMenuItem(fields);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: Object.values(errors).join(". "), errors }, { status: 400 });
  }

  try {
    await connectDB();
    // Copy only the known fields, so the client can't set _id
    const saved = await MenuItem.create({
      name: fields.name,
      category: fields.category,
      sizes: fields.sizes,
      description: fields.description,
      image: fields.image,
    });
    return NextResponse.json(serializeMenuItem(saved), { status: 201 });
  } catch (error) {
    // Bad data that got past the checks above (a schema ValidationError or a wrong type) is the client's mistake, not a server error
    if (error instanceof Error && (error.name === "ValidationError" || error.name === "CastError")) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ error: "Failed to create menu item" }, { status: 500 });
  }
}
