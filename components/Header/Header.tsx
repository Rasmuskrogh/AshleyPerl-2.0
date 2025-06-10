"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import Hamburger from "@/components/Hamburger/Hamburger";

export default function Header() {
  const [openBurger, setOpenBurger] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleBurger = () => {
    setOpenBurger(!openBurger);
  };

  return (
    <header
      className={
        openBurger
          ? `${styles.mainHeader} ${styles.mainHeaderBurger}`
          : styles.mainHeader
      }
    >
      <h1>
        <Link href="/" onClick={openBurger ? toggleBurger : undefined}>
          ASHLEY PERL
        </Link>
      </h1>
      <nav>
        <ul
          className={
            !mounted || !openBurger
              ? styles.headerList
              : `${styles.headerList} ${styles.open}`
          }
        >
          <li className={styles.headerLinks}>
            <Link href="/about" onClick={toggleBurger}>
              ABOUT
            </Link>
          </li>
          <li className={styles.headerLinks}>
            <Link href="/reporting" onClick={toggleBurger}>
              REPORTING
            </Link>
          </li>
          <li className={styles.headerLinks}>
            <Link href="/contact" onClick={toggleBurger}>
              CONTACT
            </Link>
          </li>
        </ul>
        <div className={styles.hamburger} onClick={toggleBurger}>
          <Hamburger isOpen={openBurger} />
        </div>
      </nav>
    </header>
  );
}
