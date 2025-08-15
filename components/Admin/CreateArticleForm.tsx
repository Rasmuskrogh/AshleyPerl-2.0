"use client";

import { useState } from "react";
import styles from "./CreateArticleForm.module.css";

interface ArticleFormData {
  title: string;
  description: string; // This maps to 'publication' in database
  link: string; // This maps to 'url' in database
  date: string;
  imageUrl: string;
}

export default function CreateArticleForm() {
  const [formData, setFormData] = useState<ArticleFormData>({
    title: "",
    description: "",
    link: "",
    date: "",
    imageUrl: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

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
    setIsSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Article created successfully!");
        setFormData({
          title: "",
          description: "",
          link: "",
          date: "",
          imageUrl: "",
        });
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.error}`);
      }
    } catch (error) {
      setMessage("Error creating article");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.form}>
      <h3>Create New Article</h3>

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

      <form onSubmit={handleSubmit}>
        <div className={styles.section}>
          <label htmlFor="title">Title *</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter article title..."
            required
          />
        </div>

        <div className={styles.section}>
          <label htmlFor="description">Publication *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter publication name..."
            rows={4}
            required
          />
        </div>

        <div className={styles.section}>
          <label htmlFor="link">URL *</label>
          <input
            id="link"
            name="link"
            type="url"
            value={formData.link}
            onChange={handleInputChange}
            placeholder="https://example.com/article"
            required
          />
        </div>

        <div className={styles.section}>
          <label htmlFor="date">Date *</label>
          <input
            id="date"
            name="date"
            type="text"
            value={formData.date}
            onChange={handleInputChange}
            placeholder="e.g., January 2024, March 15, 2024"
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
            className={styles.submitButton}
          >
            {isSaving ? "Creating..." : "Create Article"}
          </button>
        </div>
      </form>
    </div>
  );
}
