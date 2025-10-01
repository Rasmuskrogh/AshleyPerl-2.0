import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p> &copy; Ashley Perl 2025</p>
      <div className={styles.footerLinks}>
        <a
          href="https://www.linkedin.com/in/ashleyperl/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/linkedin.svg"
            alt="linkedIn logo"
            width={20}
            height={20}
          />
        </a>
        <a
          className={styles.xLogo}
          href="https://x.com/ashleyaperl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/XLogo.jpg" alt="X logo" width={20} height={17} />
        </a>
        <a
          className={styles.muckrackLogo}
          href="https://muckrack.com/ashley-perl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/mr_logo_vertical-1024x638.png"
            alt="muckrack logo"
            width={20}
            height={20}
          />
        </a>
      </div>
    </footer>
  );
}
