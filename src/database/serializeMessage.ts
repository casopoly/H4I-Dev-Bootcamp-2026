import { Message } from "@/types/Message";

type MessageDoc = Omit<Message, "_id" | "createdAt"> & {
  _id: { toString(): string };
  createdAt: Date;
};

/**
 * Converts a message read from MongoDB into a plain object that is safe to pass to client components.
 * `_id` (an ObjectId) and `createdAt` (a Date) become strings, and `__v` is dropped.
 */
export function serializeMessage(doc: MessageDoc): Message {
  return {
    _id: doc._id.toString(),
    name: doc.name,
    email: doc.email,
    message: doc.message,
    type: doc.type,
    // Leave subject out entirely when the message has none
    ...(doc.subject ? { subject: doc.subject } : {}),
    createdAt: doc.createdAt.toISOString(),
  };
}
