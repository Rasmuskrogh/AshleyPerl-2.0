import Link from "next/link";
import styles from "./contact.module.css";

export default function Contact() {
  return (
    <div className={styles.contact}>
      <h1 className={styles.contactHeader}>CONTACT</h1>
      <p className={styles.contactParagraph}>
        Get in touch to talk about writing, fact-checking, journalism or other
        collaborations.
      </p>
      <p className={styles.contactInformation}>You can reach me via:</p>
      <p className={styles.contactInformation}>
        <a href="mailto:ashleyaperl@gmail.com">
          ashleyaperl [at] gmail [dot] com
        </a>
      </p>
      <p className={styles.contactInformation}>
        <a
          href="https://www.linkedin.com/in/ashleyperl/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </p>
      <p className={styles.contactInformation}>
        <a
          href="https://x.com/ashleyaperl"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter/X
        </a>
      </p>
    </div>
  );
}
