"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./reporting.module.css";

interface Article {
  id: number;
  title: string;
  publication: string;
  date: string;
  image_url: string;
  image_alt: string;
  url: string;
}

interface ReportingClientProps {
  articles: Article[];
  publications: string[];
}

export default function ReportingClient({
  articles,
  publications,
}: ReportingClientProps) {
  const [selectedPublication, setSelectedPublication] = useState<string>("All");

  // Function to convert publication name to title case
  const toTitleCase = (str: string) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const filteredArticles =
    selectedPublication === "All"
      ? articles
      : articles.filter(
          (article) => article.publication === selectedPublication
        );

  return (
    <>
      <section className={styles.filterSection}>
        <div className={styles.filterWrapper}>
          <label htmlFor="publication-filter" className={styles.filterLabel}>
            Filter by publication:
          </label>
          <select
            id="publication-filter"
            value={selectedPublication}
            onChange={(e) => setSelectedPublication(e.target.value)}
            className={styles.filterDropdown}
          >
            <option value="All">All Publications</option>
            {publications.map((publication) => (
              <option key={publication} value={publication}>
                {toTitleCase(publication)}
              </option>
            ))}
          </select>
        </div>
      </section>
      <section className={styles.cardSection}>
        {filteredArticles.map((article) => (
          <article key={article.id} className={styles.card}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <figure className={styles.figure}>
                <Image
                  src={article.image_url}
                  alt={article.image_alt}
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
    </>
  );
}
