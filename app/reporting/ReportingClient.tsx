"use client";

import { useState, useEffect } from "react";
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

export default function ReportingClient() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [publications, setPublications] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPublication, setSelectedPublication] = useState<string>("All");

  // Function to convert publication name to title case
  const toTitleCase = (str: string) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articlesRes, publicationsRes] = await Promise.all([
          fetch("/api/articles"),
          fetch("/api/publications"),
        ]);

        if (articlesRes.ok && publicationsRes.ok) {
          const articlesData = await articlesRes.json();
          const publicationsData = await publicationsRes.json();
          setArticles(articlesData);
          setPublications(publicationsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredArticles =
    selectedPublication === "All"
      ? articles
      : articles.filter(
          (article) => article.publication === selectedPublication
        );

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <p>Loading articles...</p>
      </div>
    );
  }

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
