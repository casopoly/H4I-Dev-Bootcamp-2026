import mongoose, { Schema } from "mongoose";
import { Message } from "@/types/Message";
import {
  EMAIL_MAX_LENGTH,
  MESSAGE_MAX_LENGTH,
  MESSAGE_TYPES,
  NAME_MAX_LENGTH,
  SUBJECT_MAX_LENGTH,
} from "@/constants/messages";

// createdAt is a Date in MongoDB; serializeMessage turns it into a string for the frontend
type MessageFields = Omit<Message, "_id" | "createdAt"> & { createdAt: Date };

const messageSchema = new Schema<MessageFields>(
  {
    name: { type: String, required: true, trim: true, maxlength: NAME_MAX_LENGTH },
    email: { type: String, required: true, trim: true, maxlength: EMAIL_MAX_LENGTH },
    message: { type: String, required: true, maxlength: MESSAGE_MAX_LENGTH },
    type: { type: String, required: true, enum: MESSAGE_TYPES, default: "contact" },
    subject: { type: String, trim: true, maxlength: SUBJECT_MAX_LENGTH },
  },
  // MongoDB sets createdAt when the message is saved. Messages are never edited, so there is no updatedAt
  { timestamps: { createdAt: true, updatedAt: false } },
);

export default mongoose.models.Message || mongoose.model("Message", messageSchema, "messages");
