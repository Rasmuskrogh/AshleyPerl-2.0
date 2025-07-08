"use client";

import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "@/app/admin/admin.module.css";

export default function AdminAuth() {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Redirect om användaren inte är inloggad och vi inte är på inloggningssidan
  useEffect(() => {
    if (status === "unauthenticated") {
      // Användaren är inte inloggad, visa inloggningsformuläret
    }
  }, [status]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Felaktigt användarnamn eller lösenord");
      }
    } catch (error) {
      setError("Ett fel uppstod. Försök igen.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/admin" });
  };

  // Visa laddning medan vi kontrollerar session
  if (status === "loading") {
    return (
      <div className={styles.adminContainer}>
        <p>Laddar...</p>
      </div>
    );
  }

  // Om användaren är inloggad, visa admin dashboard
  if (session) {
    return (
      <div className={styles.adminContainer}>
        <h1>Admin Dashboard</h1>
        <p>Välkommen, {session.user?.name || session.user?.username}!</p>
        <p>Du är inloggad som admin.</p>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logga ut
        </button>
      </div>
    );
  }

  // Om användaren inte är inloggad, visa inloggningsformulär
  return (
    <div className={styles.adminContainer}>
      <h1>Admin Login</h1>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Användarnamn:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Lösenord:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && (
          <div style={{ color: "red", textAlign: "center" }}>{error}</div>
        )}
        <button
          type="submit"
          className={styles.loginButton}
          disabled={isLoading}
        >
          {isLoading ? "Loggar in..." : "Logga in"}
        </button>
      </form>
    </div>
  );
}
