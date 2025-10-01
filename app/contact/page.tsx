import Link from "next/link";
import { Metadata } from "next";
import styles from "./contact.module.css";
import ContactForm from "@/components/ContactForm/ContactForm";

export const metadata: Metadata = {
  title: "Contact Ashley Perl - Freelance Journalist",
  description:
    "Get in touch with Ashley Perl for freelance journalism opportunities, writing collaborations, and fact-checking services. Based in Stockholm, Sweden.",
  keywords: [
    "contact Ashley Perl",
    "freelance journalist contact",
    "journalism collaboration",
    "fact-checking services",
    "freelance writing Stockholm",
    "hire journalist",
  ],
  openGraph: {
    title: "Contact Ashley Perl - Freelance Journalist",
    description:
      "Get in touch with Ashley Perl for freelance journalism opportunities, writing collaborations, and fact-checking services.",
    type: "website",
  },
};

export default function Contact() {
  return (
    <div className={styles.contact}>
      <h1 className={styles.contactHeader}>CONTACT</h1>
      <p className={styles.contactParagraph}>
        Get in touch about commissions, consulting or other freelance work.
      </p>
      <ContactForm />
    </div>
  );
}
