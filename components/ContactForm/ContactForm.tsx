"use client";

import { useState } from "react";
import { sendEmail } from "@/lib/email";
import styles from "./ContactForm.module.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      await sendEmail(formData);
      setFormData({ name: "", email: "", message: "" });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label}>
        <span className={styles.labelText}>Name</span>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className={styles.field}
          placeholder="Your name"
        />
      </label>

      <label className={styles.label}>
        <span className={styles.labelText}>Email</span>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={styles.field}
          placeholder="Your email"
        />
      </label>

      <label className={`${styles.label} ${styles.labelLargeMargin}`}>
        <span className={styles.labelText}>Message</span>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          className={`${styles.field} ${styles.textarea}`}
          placeholder="Your message"
        ></textarea>
      </label>

      <button
        type="submit"
        disabled={status === "submitting"}
        className={styles.button}
      >
        {status === "submitting" ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
