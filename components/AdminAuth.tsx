"use client";

import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "./Admin/LoginForm.module.css";
import Dashboard from "./Admin/Dashboard";
import { useInactivityTimeout } from "../hooks/useInactivityTimeout";

export default function AdminAuth() {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);

  // Set up inactivity timeout (30 minutes with 5 minute warning)
  useInactivityTimeout({
    timeout: 30 * 60 * 1000, // 30 minutes
    warningTime: 5 * 60 * 1000, // 5 minutes warning
    onWarning: () => {
      setShowTimeoutWarning(true);
    },
    onTimeout: () => {
      signOut({ callbackUrl: "/admin" });
    },
  });

  // Redirect if user is not logged in and we're not on the login page
  useEffect(() => {
    if (status === "unauthenticated") {
      // User is not logged in, show login form
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
        setError("Invalid username or password");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStayLoggedIn = () => {
    setShowTimeoutWarning(false);
    // Reset the timeout by triggering activity
    window.dispatchEvent(new Event("mousedown"));
  };

  // Show loading while checking session
  if (status === "loading") {
    return (
      <div className={styles.loginContainer}>
        <p className={styles.loadingMessage}>Loading...</p>
      </div>
    );
  }

  // If user is logged in, show dashboard
  if (session) {
    return (
      <>
        {showTimeoutWarning && (
          <div className={styles.timeoutWarning}>
            <div className={styles.warningContent}>
              <h3>⚠️ Session Timeout Warning</h3>
              <p>You will be automatically logged out due to inactivity.</p>
              <p>
                Please refresh the page or perform an action to stay logged in.
              </p>
              <button
                onClick={handleStayLoggedIn}
                className={styles.warningButton}
              >
                Stay Logged In
              </button>
            </div>
          </div>
        )}
        <Dashboard />
      </>
    );
  }

  // If user is not logged in, show login form
  return (
    <div className={styles.loginContainer}>
      <h1>Admin Login</h1>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className={styles.errorMessage}>{error}</div>}
        <button
          type="submit"
          className={styles.loginButton}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
