/**
 * Server-side validation for contact form (spam + format).
 * Kept minimal so it doesn't block real users.
 */

const NAME_MIN = 2;
const NAME_MAX = 100;
const NAME_NO_SPACE_MAX_LENGTH = 12; // single name without space, longer = likely bot
const EMAIL_MAX = 254;
const EMAIL_LOCAL_PART_MAX_DOTS = 2;
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 5000;

const NAME_REGEX = /^[\p{L}\s\-']+$/u;
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  website?: string; // honeypot
}

export function validateContactForm(data: ContactFormData): string | null {
  // Honeypot: om fältet är ifyllt = bot
  if (data.website?.trim()) {
    return "invalid";
  }

  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();
  const message = (data.message ?? "").trim();

  if (name.length < NAME_MIN || name.length > NAME_MAX) {
    return "invalid";
  }
  if (!NAME_REGEX.test(name)) {
    return "invalid";
  }
  // Namn utan mellanslag och längre än 12 tecken = ofta bot (t.ex. FaePYAcTbcLnaVtXprgBsC)
  if (!name.includes(" ") && name.length > NAME_NO_SPACE_MAX_LENGTH) {
    return "invalid";
  }

  if (email.length > EMAIL_MAX || !EMAIL_REGEX.test(email)) {
    return "invalid";
  }
  const localPart = email.split("@")[0] ?? "";
  const dotCount = (localPart.match(/\./g) ?? []).length;
  if (dotCount > EMAIL_LOCAL_PART_MAX_DOTS) {
    return "invalid";
  }

  if (message.length < MESSAGE_MIN || message.length > MESSAGE_MAX) {
    return "invalid";
  }

  return null;
}

export const contactValidationLimits = {
  nameMin: NAME_MIN,
  nameMax: NAME_MAX,
  messageMin: MESSAGE_MIN,
  messageMax: MESSAGE_MAX,
} as const;
