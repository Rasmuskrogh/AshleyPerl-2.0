import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    console.log(process.env.EMAIL_USER);
    const { name, email, message } = await req.json();

    // Konfigurera nodemailer-transportören
    const transporter = nodemailer.createTransport({
      service: "gmail", // Ändra om du använder en annan leverantör
      auth: {
        user: process.env.EMAIL_USER, // Din e-postadress
        pass: process.env.EMAIL_PASS, // Använd ett app-lösenord om du använder Gmail
      },
      tls: {
        rejectUnauthorized:
          process.env.NODE_ENV === "development" ? false : true,
      },
    });

    // Konfigurera e-postmeddelandet
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, // Din egen e-postadress
      subject: `Nytt meddelande från ${name}`,
      text: `Namn: ${name}\nE-post: ${email}\n\nMeddelande:\n${message}`,
    };

    // Skicka e-post
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "E-post skickad!" });
  } catch (error) {
    console.error("E-postfel:", error);
    return NextResponse.json(
      { success: false, message: "Misslyckades att skicka e-post." },
      { status: 500 }
    );
  }
}
