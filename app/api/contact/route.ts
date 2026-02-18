import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { validateContactForm } from "@/lib/contactValidation";

const RATE_LIMIT_MS = 60 * 1000; // 1 minut mellan förfrågningar per IP
const rateLimitMap = new Map<string, number>();

function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return req.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const last = rateLimitMap.get(ip);
  if (last != null && now - last < RATE_LIMIT_MS) {
    return true;
  }
  rateLimitMap.set(ip, now);
  return false;
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          message: "Du kan skicka ett nytt meddelande om en minut. Tack för din förståelse.",
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, message, website } = body;

    const validationError = validateContactForm({
      name: name ?? "",
      email: email ?? "",
      message: message ?? "",
      website,
    });
    if (validationError) {
      return NextResponse.json(
        {
          success: false,
          message: "Kunde inte skicka. Kontrollera att alla fält är ifyllda korrekt.",
        },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: process.env.NODE_ENV === "development" ? false : true,
      },
    });

    const mailOptions = {
      from: (email as string).trim(),
      to: process.env.EMAIL_USER,
      subject: `Nytt meddelande från ${(name as string).trim()}`,
      text: `Namn: ${(name as string).trim()}\nE-post: ${(email as string).trim()}\n\nMeddelande:\n${(message as string).trim()}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "E-post skickad!" });
  } catch (error) {
    console.error("E-postfel:", error);
    return NextResponse.json({ success: false, message: "Misslyckades att skicka e-post." }, { status: 500 });
  }
}
