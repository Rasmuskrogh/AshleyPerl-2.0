"use client";

import { useState } from "react";
import { sendEmail } from "@/lib/email";
import { contactValidationLimits } from "@/lib/contactValidation";
import styles from "./ContactForm.module.css";

const NAME_REGEX = /^[\p{L}\s\-']+$/u;
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function clientValidate(
  name: string,
  email: string,
  message: string
): string | null {
  const n = name.trim();
  const e = email.trim();
  const m = message.trim();
  if (
    n.length < contactValidationLimits.nameMin ||
    n.length > contactValidationLimits.nameMax
  ) {
    return "Ange ett namn (2–100 tecken).";
  }
  if (!NAME_REGEX.test(n)) {
    return "Namnet får bara innehålla bokstäver, mellanslag, bindestreck och apostrof.";
  }
  if (!n.includes(" ") && n.length > 12) {
    return "Ange för- och efternamn (minst ett mellanslag).";
  }
  if (!EMAIL_REGEX.test(e)) {
    return "Ange en giltig e-postadress.";
  }
  const localPart = e.split("@")[0] ?? "";
  if ((localPart.match(/\./g) ?? []).length > 2) {
    return "Ange en giltig e-postadress.";
  }
  if (
    m.length < contactValidationLimits.messageMin ||
    m.length > contactValidationLimits.messageMax
  ) {
    return `Meddelandet ska vara 10–${contactValidationLimits.messageMax} tecken.`;
  }
  return null;
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "", // honeypot – ska förbli tom
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const validationError = clientValidate(
      formData.name,
      formData.email,
      formData.message
    );
    if (validationError) {
      setStatus("error");
      setErrorMessage(validationError);
      return;
    }

    setStatus("submitting");

    try {
      await sendEmail({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        website: formData.website,
      });
      setFormData({ name: "", email: "", message: "", website: "" });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Något gick fel.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* Honeypot – dolt för användare, bottar fyller i det */}
      <div className={styles.honeypotWrap} aria-hidden="true">
        <label className={styles.honeypotLabel}>
          <span className={styles.honeypotLabelText}>Website</span>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
            className={styles.honeypotInput}
          />
        </label>
      </div>

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

      {status === "error" && errorMessage && (
        <p className={styles.errorMessage} role="alert">
          {errorMessage}
        </p>
      )}

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
