import { describe, expect, it } from "vitest";
import { validateMessage } from "@/lib/validateMessage";
import { MESSAGE_MAX_LENGTH } from "@/constants/messages";

const validMessage = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "Do you have oat milk?",
};

// These tests check which fields are rejected, not the wording of the messages, so the messages can change freely
const invalidFields = (input: Record<string, unknown>) => Object.keys(validateMessage(input));

describe("validateMessage", () => {
  it("accepts a valid contact message, and a job application with a subject", () => {
    expect(validateMessage(validMessage)).toEqual({});
    expect(
      validateMessage({ ...validMessage, type: "job-application", subject: "Application: Barista at 123 Higuera St" }),
    ).toEqual({});
  });

  it("rejects an empty or blank name", () => {
    expect(invalidFields({ ...validMessage, name: "" })).toEqual(["name"]);
    expect(invalidFields({ ...validMessage, name: "   " })).toEqual(["name"]);
  });

  it("rejects badly formed email addresses", () => {
    for (const email of ["", "ada", "ada@example", "ada @example.com", "@example.com"]) {
      expect(invalidFields({ ...validMessage, email })).toEqual(["email"]);
    }
  });

  it(`accepts a message of ${MESSAGE_MAX_LENGTH} characters and rejects a longer one`, () => {
    expect(invalidFields({ ...validMessage, message: "x".repeat(MESSAGE_MAX_LENGTH) })).toEqual([]);
    expect(invalidFields({ ...validMessage, message: "x".repeat(MESSAGE_MAX_LENGTH + 1) })).toEqual(["message"]);
  });

  it("rejects an empty message", () => {
    expect(invalidFields({ ...validMessage, message: "" })).toEqual(["message"]);
  });

  it("allows type to be left out, but rejects an unknown type or a subject that isn't text", () => {
    expect(invalidFields({ ...validMessage, type: "spam" })).toEqual(["type"]);
    expect(invalidFields({ ...validMessage, subject: 42 })).toEqual(["subject"]);
  });
});
