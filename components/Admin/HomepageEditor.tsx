"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./HomepageEditor.module.css";

interface HomepageContent {
  title: string;
  description: string;
  imageUrl: string;
}

export default function HomepageEditor() {
  const [content, setContent] = useState<HomepageContent>({
    title: "",
    description: "",
    imageUrl: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch("/api/admin/homepage");
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      } else {
        setMessage("Failed to load content");
      }
    } catch (error) {
      setMessage("Error loading content");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage("");

    try {
      console.log("Sending content to API:", content);
      const response = await fetch("/api/admin/homepage", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      });

      if (response.ok) {
        setMessage("Content saved successfully!");
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.error}`);
      }
    } catch (error) {
      setMessage("Error saving content");
    } finally {
      setIsSaving(false);
    }
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

      const response = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setContent((prev) => ({ ...prev, imageUrl: data.imageUrl }));
        setMessage("Image uploaded successfully!");
      } else {
        const error = await response.json();
        setMessage(`Upload error: ${error.error}`);
      }
    } catch (error) {
      setMessage("Error uploading image");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.editor}>
      <h2>Homepage Editor</h2>

      {message && (
        <div
          className={`${styles.message} ${
            message.includes("Error") ? styles.error : styles.success
          }`}
        >
          {message}
        </div>
      )}

      <div className={styles.section}>
        <label htmlFor="title">Title (H1)</label>
        <input
          id="title"
          type="text"
          value={content.title}
          onChange={(e) =>
            setContent((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Enter title..."
        />
      </div>

      <div className={styles.section}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={content.description}
          onChange={(e) =>
            setContent((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="Enter description..."
          rows={4}
        />
      </div>

      <div className={styles.section}>
        <label>Current Image</label>
        {content.imageUrl && (
          <div className={styles.imagePreview}>
            <img
              src={content.imageUrl}
              alt="Homepage image"
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
            />
          </div>
        )}

        <label htmlFor="imageUpload">Upload New Image</label>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={isSaving}
        />
      </div>

      <div className={styles.actions}>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={styles.saveButton}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
