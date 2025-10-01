import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default:
      "Ashley Perl - Freelance Journalist | Energy, Climate & Science Stories",
    template: "%s | Ashley Perl - Freelance Journalist",
  },
  description:
    "Ashley Perl is a freelance journalist based in Stockholm, Sweden, specializing in energy, climate, and science stories. Experienced reporter covering environmental issues and sustainability.",
  keywords: [
    "Ashley Perl",
    "freelance journalist",
    "energy journalist",
    "climate journalist",
    "science journalist",
    "Stockholm journalist",
    "Sweden journalist",
    "environmental reporter",
    "sustainability journalist",
    "freelance writer Stockholm",
    "freelance journalist Stockholm",
    "sustainability journalist",
    "freelance writer Stockholm",
    "freelance journalist Stockholm",
    "environmental reporter",
    "sustainability journalist",
    "freelance writer Stockholm",
  ],
  authors: [{ name: "Ashley Perl" }],
  creator: "Ashley Perl",
  publisher: "Ashley Perl",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ashleyperl.com",
    title:
      "Ashley Perl - Freelance Journalist | Energy, Climate & Science Stories",
    description:
      "Ashley Perl is a freelance journalist based in Stockholm, Sweden, specializing in energy, climate, and science stories.",
    siteName: "Ashley Perl Portfolio",
    images: [
      {
        url: "/PerlAshley.jpg",
        width: 1200,
        height: 630,
        alt: "Ashley Perl - Freelance Journalist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Ashley Perl - Freelance Journalist | Energy, Climate & Science Stories",
    description:
      "Ashley Perl is a freelance journalist based in Stockholm, Sweden, specializing in energy, climate, and science stories.",
    images: ["/PerlAshley.jpg"],
    creator: "@ashleyperl", // Replace with actual Twitter handle if available
  },
  alternates: {
    canonical: "https://ashleyperl.com",
  },
  category: "journalism",
  classification: "Personal Portfolio",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ashleyperl.com"), // Replace with actual domain
};
