"use client";

import Image from "next/image";
import styles from "./main.module.css";

export default function Home() {
  return (
    <main>
      <div className={styles.sectionWrapper}>
        <section className={styles.presentationSection}>
          <h1>Hello.</h1>
          <p>
            I'm Ashley Perl – a journalist covering energy, climate and science
            stories.
          </p>
        </section>
        <section className={styles.imageSection}>
          <Image
            src="/PerlAshley.jpg"
            alt="headshot"
            width={500}
            height={500}
            style={{ width: "70%", height: "auto", aspectRatio: "1/1" }}
            priority
          />
        </section>
      </div>
    </main>
  );
}
