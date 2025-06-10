"use client";

import styles from "./Hamburger.module.css";

interface HamburgerProps {
  isOpen: boolean;
}

export default function Hamburger({ isOpen }: HamburgerProps) {
  return (
    <div className={styles.hamburger}>
      <div
        className={
          !isOpen ? styles.burger : `${styles.burger} ${styles.burger1}`
        }
      />
      <div
        className={
          !isOpen ? styles.burger : `${styles.burger} ${styles.burger2}`
        }
      />
      <div
        className={
          !isOpen ? styles.burger : `${styles.burger} ${styles.burger3}`
        }
      />
    </div>
  );
}
