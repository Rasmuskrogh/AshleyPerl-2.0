import Image from "next/image";
import styles from "./reporting.module.css";
import { articles } from "./DUMMY_DATA";

export default function Reporting() {
  return (
    <div className={styles.reportingWrapper}>
      <section className={styles.reportingHeaderSection}>
        <h1>REPORTING</h1>
        <h2>Explore my bylines.</h2>
      </section>
      <section className={styles.cardSection}>
        {articles.map((article) => (
          <article key={article.id} className={styles.card}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <figure className={styles.figure}>
                <Image
                  src={article.image}
                  alt={article.imageAlt}
                  fill
                  priority={article.id <= 4}
                />
              </figure>
              <div className={styles.informationWrapper}>
                <p className={styles.publicationDate}>
                  {article.publication} | {article.date}
                </p>
                <h3 className={styles.cardTitle}>{article.title}</h3>
              </div>
            </a>
          </article>
        ))}
      </section>
    </div>
  );
}
