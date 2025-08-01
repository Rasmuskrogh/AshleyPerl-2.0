"use client";

import { useState, useEffect } from "react";
import styles from "./EditArticlesList.module.css";

interface Article {
  id: number;
  title: string;
  description: string;
  link: string;
  date: string;
  image_url: string;
}

interface ArticleFormData {
  title: string;
  description: string;
  link: string;
  date: string;
  imageUrl: string;
}

export default function EditArticlesList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [formData, setFormData] = useState<ArticleFormData>({
    title: "",
    description: "",
    link: "",
    date: "",
    imageUrl: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

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

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      description: article.description,
      link: article.link,
      date: article.date,
      imageUrl: article.image_url || "",
    });
    setMessage("");
  };

  const handleCancel = () => {
    setEditingArticle(null);
    setFormData({
      title: "",
      description: "",
      link: "",
      date: "",
      imageUrl: "",
    });
    setMessage("");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsSaving(true);
    setMessage("Uploading image...");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/admin/upload-image?folder=articles", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setFormData((prev) => ({ ...prev, imageUrl: data.imageUrl }));
        setMessage("Image uploaded successfully!");
      } else {
        const error = await response.json();
        const errorMessage = error.details
          ? `${error.error}: ${error.details}`
          : error.error;
        setMessage(`Upload error: ${errorMessage}`);
      }
    } catch (error) {
      setMessage("Error uploading image");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;

    setIsSaving(true);
    setMessage("");

    try {
      const response = await fetch(`/api/admin/articles/${editingArticle.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Article updated successfully!");
        await fetchArticles(); // Refresh the list
        handleCancel();
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.error}`);
      }
    } catch (error) {
      setMessage("Error updating article");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading articles...</div>;
  }

  return (
    <div className={styles.container}>
      <h3>Edit Articles</h3>

      {message && (
        <div
          className={`${styles.message} ${
            message.includes("Error") ||
            message.includes("error") ||
            message.includes("Upload error") ||
            message.includes("Failed")
              ? styles.error
              : styles.success
          }`}
        >
          {message}
        </div>
      )}

      {editingArticle ? (
        <div className={styles.editForm}>
          <h4>Editing: {editingArticle.title}</h4>

          <form onSubmit={handleSubmit}>
            <div className={styles.section}>
              <label htmlFor="edit-title">Title *</label>
              <input
                id="edit-title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.section}>
              <label htmlFor="edit-description">Description *</label>
              <textarea
                id="edit-description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                required
              />
            </div>

            <div className={styles.section}>
              <label htmlFor="edit-link">Link *</label>
              <input
                id="edit-link"
                name="link"
                type="url"
                value={formData.link}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.section}>
              <label htmlFor="edit-date">Date *</label>
              <input
                id="edit-date"
                name="date"
                type="text"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.section}>
              <label>Article Image</label>
              {formData.imageUrl && (
                <div className={styles.imagePreview}>
                  <img
                    src={formData.imageUrl}
                    alt="Article image"
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isSaving}
              />
            </div>

            <div className={styles.actions}>
              <button
                type="submit"
                disabled={isSaving}
                className={styles.saveButton}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
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
                      onClick={() => handleEdit(article)}
                      className={styles.editButton}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
