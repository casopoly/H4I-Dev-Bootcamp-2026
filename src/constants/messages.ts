// Single source of truth for message types and limits.
// Use these in the type, schema, validation and forms instead of typing the values again.
export const MESSAGE_TYPES = ["contact", "job-application"] as const;
export type MessageType = (typeof MESSAGE_TYPES)[number];

// Longest message body a visitor can send
export const MESSAGE_MAX_LENGTH = 1000;
