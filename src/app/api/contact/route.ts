import connectDB from "@/database/db";
import MessageModel from "@/database/messageSchema";
import { serializeMessage } from "@/database/serializeMessage";
import { validateMessage } from "@/lib/validateMessage";
import { NextRequest, NextResponse } from "next/server";

// Next 14 caches GET routes at build time unless told otherwise
export const dynamic = "force-dynamic";

/**
 * Saves a message from the Contact page or the Apply pop-up. Public: anyone can send one.
 * Returns 201 with the saved message, or 400 with an error per field when the input is invalid
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

  const errors = validateMessage(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: Object.values(errors).join(". "), errors }, { status: 400 });
  }

  try {
    await connectDB();
    // Copy only the known fields, so a visitor can't set _id or createdAt themselves
    const saved = await MessageModel.create({
      name: body.name.trim(),
      email: body.email.trim(),
      message: body.message,
      // The Contact page can leave type out; the Apply pop-up sends "job-application"
      type: body.type ?? "contact",
      ...(body.subject?.trim() ? { subject: body.subject.trim() } : {}),
    });
    return NextResponse.json(serializeMessage(saved), { status: 201 });
  } catch (error) {
    // Bad data that got past the checks above is the client's mistake, not a server error
    if (error instanceof Error && error.name === "ValidationError") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}

/**
 * Returns every message, newest first. Admin only: src/middleware.ts answers 401 without the login cookie
 */
export async function GET() {
  try {
    await connectDB();
    const messages = await MessageModel.find({}).sort({ createdAt: -1 });
    return NextResponse.json(messages.map(serializeMessage));
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}
