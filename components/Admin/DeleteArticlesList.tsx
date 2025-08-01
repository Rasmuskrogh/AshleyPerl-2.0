"use client";

import { useState, useEffect } from "react";
import styles from "./DeleteArticlesList.module.css";

interface Article {
  id: number;
  title: string;
  description: string;
  link: string;
  date: string;
  image_url: string;
}

export default function DeleteArticlesList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState("");
  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch("/api/admin/articles");
      if (response.ok) {
        const data = await response.json();
        setArticles(data);
      } else {
        setMessage("Failed to load articles");
      }
    } catch (error) {
      setMessage("Error loading articles");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (article: Article) => {
    setArticleToDelete(article);
    setMessage("");
  };

  const handleCancelDelete = () => {
    setArticleToDelete(null);
    setMessage("");
  };

  const handleConfirmDelete = async () => {
    if (!articleToDelete) return;

    setIsDeleting(true);
    setMessage("");

    try {
      const response = await fetch(
        `/api/admin/articles/${articleToDelete.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setMessage("Article deleted successfully!");
        await fetchArticles(); // Refresh the list
        setArticleToDelete(null);
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.error}`);
      }
    } catch (error) {
      setMessage("Error deleting article");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading articles...</div>;
  }

  return (
    <div className={styles.container}>
      <h3>Delete Articles</h3>
      <p className={styles.warning}>
        ⚠️ Warning: Deleting an article cannot be undone. Please be careful.
      </p>

      {message && (
        <div
          className={`${styles.message} ${
            message.includes("Error") ||
            message.includes("error") ||
            message.includes("Failed")
              ? styles.error
              : styles.success
          }`}
        >
          {message}
        </div>
      )}

      {articleToDelete && (
        <div className={styles.confirmationModal}>
          <div className={styles.confirmationContent}>
            <h4>Confirm Deletion</h4>
            <p>
              Are you sure you want to delete the article:{" "}
              <strong>"{articleToDelete.title}"</strong>?
            </p>
            <p>This action cannot be undone.</p>

            <div className={styles.confirmationActions}>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className={styles.confirmButton}
              >
                {isDeleting ? "Deleting..." : "Yes, Delete Article"}
              </button>
              <button
                onClick={handleCancelDelete}
                disabled={isDeleting}
                className={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.articlesList}>
        {articles.length === 0 ? (
          <p>No articles found.</p>
        ) : (
          <div className={styles.articlesGrid}>
            {articles.map((article) => (
              <div key={article.id} className={styles.articleCard}>
                {article.image_url && (
                  <div className={styles.articleImage}>
                    <img
                      src={article.image_url}
                      alt={article.title}
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}
                <div className={styles.articleContent}>
                  <h4>{article.title}</h4>
                  <p className={styles.articleDate}>{article.date}</p>
                  <p className={styles.articleDescription}>
                    {article.description && article.description.length > 100
                      ? `${article.description.substring(0, 100)}...`
                      : article.description || "No description"}
                  </p>
                  <button
                    onClick={() => handleDeleteClick(article)}
                    className={styles.deleteButton}
                  >
                    Delete Article
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
