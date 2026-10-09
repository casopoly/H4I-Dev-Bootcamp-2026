import { MESSAGE_MAX_LENGTH, MESSAGE_TYPES } from "@/constants/messages";

// The fields a visitor sends, and the error message (if any) for each one
export type MessageField = "name" | "email" | "message" | "type" | "subject";
export type MessageErrors = Partial<Record<MessageField, string>>;

const isNonEmptyString = (value: unknown): value is string => typeof value === "string" && value.trim() !== "";

// Something@something.something with no spaces. Loose on purpose: it catches typos without rejecting real addresses
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Each rule returns an error message, or undefined when the value is fine
const rules: Record<MessageField, (value: unknown) => string | undefined> = {
  name: (value) => (isNonEmptyString(value) ? undefined : "Name is required"),
  email: (value) =>
    typeof value === "string" && EMAIL_PATTERN.test(value.trim()) ? undefined : "Enter a valid email address",
  message: (value) => {
    if (!isNonEmptyString(value)) return "Message is required";
    if (value.length > MESSAGE_MAX_LENGTH) return `Message must be ${MESSAGE_MAX_LENGTH} characters or fewer`;
    return undefined;
  },
  // Optional: leave it out for a contact message (it defaults to "contact"), or send one of MESSAGE_TYPES
  type: (value) =>
    value === undefined || (MESSAGE_TYPES as readonly unknown[]).includes(value)
      ? undefined
      : `Type must be one of: ${MESSAGE_TYPES.join(", ")}`,
  // Optional: leave it out, or send a string
  subject: (value) => (value === undefined || typeof value === "string" ? undefined : "Subject must be text"),
};

/**
 * Checks a message from the Contact page or the Apply pop-up and returns an error message for each invalid field.
 * An empty object means the input is valid. Used by the forms (before sending) and by POST /api/contact
 * (before saving), so both apply the same rules. Has no server-only imports, so client components can use it
 */
export function validateMessage(input: Record<string, unknown>): MessageErrors {
  const errors: MessageErrors = {};
  for (const field of Object.keys(rules) as MessageField[]) {
    const message = rules[field](input[field]);
    if (message) errors[field] = message;
  }
  return errors;
}
