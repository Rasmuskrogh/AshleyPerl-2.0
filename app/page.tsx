import Image from "next/image";
import styles from "./main.module.css";
import { getHomepageContent } from "../lib/getHomepageContent";

export default async function Home() {
  const content = await getHomepageContent();
  console.log("Homepage content:", content);

  return (
    <main>
      <div className={styles.sectionWrapper}>
        <section className={styles.presentationSection}>
          <h1>{content.title}</h1>
          <p>{content.description}</p>
        </section>
        <section className={styles.imageSection}>
          <Image
            src={content.imageUrl || "/PerlAshley.jpg"}
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
