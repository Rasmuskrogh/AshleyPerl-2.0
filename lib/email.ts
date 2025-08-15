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
    throw new Error("Failed to send email");
  }

  return response.json();
}
