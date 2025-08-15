import Link from "next/link";
import styles from "./contact.module.css";
import ContactForm from "@/components/ContactForm/ContactForm";

export default function Contact() {
  return (
    <div className={styles.contact}>
      <h1 className={styles.contactHeader}>CONTACT</h1>
      <p className={styles.contactParagraph}>
        Get in touch to talk about writing, fact-checking, journalism or other
        collaborations.
      </p>
      <ContactForm />
    </div>
  );
}
