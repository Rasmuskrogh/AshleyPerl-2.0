"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import HomepageEditor from "./HomepageEditor";
import AboutEditor from "./AboutEditor";
import ArticlesEditor from "./ArticlesEditor";

interface DashboardStats {
  articleCount: number;
  lastUpdated: string;
  lastUpdatedSource: string;
}

export default function Dashboard() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState<DashboardStats>({
    articleCount: 0,
    lastUpdated: "Loading...",
    lastUpdatedSource: "Unknown",
  });

  const handleLogout = () => {
    signOut({ callbackUrl: "/admin" });
  };

  // Fetch dashboard stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/dashboard-stats");
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Ashmin Dashboard</h1>
          <div className={styles.userInfo}>
            <span>
              Welcome, {session?.user?.name || session?.user?.username}
            </span>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className={styles.navigation}>
        <button
          className={`${styles.navButton} ${
            activeTab === "overview" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("overview")}
        >
          📊 Overview
        </button>
        <button
          className={`${styles.navButton} ${
            activeTab === "home" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("home")}
        >
          🏠 Home Page
        </button>
        <button
          className={`${styles.navButton} ${
            activeTab === "about" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("about")}
        >
          👤 About Page
        </button>
        <button
          className={`${styles.navButton} ${
            activeTab === "articles" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("articles")}
        >
          📰 Articles
        </button>
      </nav>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {activeTab === "overview" && (
          <div className={styles.overviewSection}>
            <h2>Overview</h2>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <h3>Articles</h3>
                <p className={styles.statNumber}>{stats.articleCount}</p>
                <p className={styles.statLabel}>Total count</p>
              </div>
              <div className={styles.statCard}>
                <h3>Last Updated</h3>
                <p className={styles.statNumber}>{stats.lastUpdated}</p>
                <p className={styles.statLabel}>{stats.lastUpdatedSource}</p>
              </div>
              <div className={styles.statCard}>
                <h3>Quick Actions</h3>
                <div className={styles.quickActions}>
                  <button
                    className={styles.quickButton}
                    onClick={() => setActiveTab("articles")}
                  >
                    Add Article
                  </button>
                  <button
                    className={styles.quickButton}
                    onClick={() => setActiveTab("home")}
                  >
                    Edit Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "home" && (
          <div className={styles.contentSection}>
            <HomepageEditor />
          </div>
        )}

        {activeTab === "about" && (
          <div className={styles.contentSection}>
            <AboutEditor />
          </div>
        )}

        {activeTab === "contact" && (
          <div className={styles.contentSection}>
            <h2>Contact Page Editor</h2>
            <p>Edit contact information.</p>
            <div className={styles.comingSoon}>
              <p>🚧 Under Development</p>
              <p>Contact page editor coming soon!</p>
            </div>
          </div>
        )}

        {activeTab === "articles" && (
          <div className={styles.contentSection}>
            <ArticlesEditor />
          </div>
        )}
      </main>
    </div>
  );
}
