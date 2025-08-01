"use client";

import { useState } from "react";
import styles from "./ArticlesEditor.module.css";
import CreateArticleForm from "./CreateArticleForm";
import EditArticlesList from "./EditArticlesList";
import DeleteArticlesList from "./DeleteArticlesList";

type TabType = "create" | "edit" | "delete";

export default function ArticlesEditor() {
  const [activeTab, setActiveTab] = useState<TabType>("create");

  return (
    <div className={styles.editor}>
      <h2>Articles Management</h2>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            activeTab === "create" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("create")}
        >
          Create Article
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "edit" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("edit")}
        >
          Edit Articles
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "delete" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("delete")}
        >
          Delete Articles
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === "create" && <CreateArticleForm />}
        {activeTab === "edit" && <EditArticlesList />}
        {activeTab === "delete" && <DeleteArticlesList />}
      </div>
    </div>
  );
}
