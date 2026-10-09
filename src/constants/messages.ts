// Single source of truth for message types and limits.
// Use these in the type, schema, validation and forms instead of typing the values again.
export const MESSAGE_TYPES = ["contact", "job-application"] as const;
export type MessageType = (typeof MESSAGE_TYPES)[number];

// Longest value a visitor can send for each field. The endpoint is public, so every text field has a cap
export const MESSAGE_MAX_LENGTH = 1000;
export const NAME_MAX_LENGTH = 100;
export const EMAIL_MAX_LENGTH = 254; // the longest valid email address
export const SUBJECT_MAX_LENGTH = 200;
