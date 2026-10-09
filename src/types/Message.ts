import { MessageType } from "@/constants/messages";

export interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  type: MessageType; // "contact" (Contact page) or "job-application" (Apply pop-up)
  subject?: string; // optional, e.g. "Application: Barista at 123 Higuera St"
  createdAt: string; // when it was sent, as an ISO date string (e.g. "2026-10-09T18:30:00.000Z")
}
