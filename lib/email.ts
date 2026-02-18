import { EmailData } from "@/types/email";

export async function sendEmail(data: EmailData) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const message = typeof body?.message === "string" ? body.message : "Kunde inte skicka meddelandet.";
    throw new Error(message);
  }

  return response.json();
}
