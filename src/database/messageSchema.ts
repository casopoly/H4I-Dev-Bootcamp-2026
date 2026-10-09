import mongoose, { Schema } from "mongoose";
import { Message } from "@/types/Message";
import { MESSAGE_MAX_LENGTH, MESSAGE_TYPES } from "@/constants/messages";

// createdAt is a Date in MongoDB; serializeMessage turns it into a string for the frontend
type MessageFields = Omit<Message, "_id" | "createdAt"> & { createdAt: Date };

const messageSchema = new Schema<MessageFields>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    message: { type: String, required: true, maxlength: MESSAGE_MAX_LENGTH },
    type: { type: String, required: true, enum: MESSAGE_TYPES, default: "contact" },
    subject: { type: String, trim: true },
  },
  // MongoDB sets createdAt when the message is saved. Messages are never edited, so there is no updatedAt
  { timestamps: { createdAt: true, updatedAt: false } },
);

export default mongoose.models.Message || mongoose.model("Message", messageSchema, "messages");
