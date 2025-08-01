"use client";

import { useState, useEffect } from "react";
import styles from "./AboutEditor.module.css";

interface AboutContent {
  content: string;
  imageUrl: string;
}

export default function AboutEditor() {
  const [content, setContent] = useState<AboutContent>({
    content: "",
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
      const response = await fetch("/api/admin/about");
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
      const response = await fetch("/api/admin/about", {
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

      const response = await fetch("/api/admin/upload-image?folder=about", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setContent((prev) => ({ ...prev, imageUrl: data.imageUrl }));
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

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.editor}>
      <h2>About Page Editor</h2>

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

      <div className={styles.section}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content.content}
          onChange={(e) =>
            setContent((prev) => ({ ...prev, content: e.target.value }))
          }
          placeholder="Enter about content..."
          rows={15}
        />
        <p className={styles.helpText}>
          Use * for bullet points. Lines starting with * will become bullet
          points automatically.
        </p>
      </div>

      <div className={styles.section}>
        <label>Current Image</label>
        {content.imageUrl && (
          <div className={styles.imagePreview}>
            <img
              src={content.imageUrl}
              alt="About page image"
              style={{
                width: "300px",
                height: "auto",
                maxHeight: "200px",
                objectFit: "cover",
              }}
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
