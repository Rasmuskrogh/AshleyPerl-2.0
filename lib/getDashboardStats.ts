import pool from "./database";

export interface DashboardStats {
  articleCount: number;
  lastUpdated: string;
  lastUpdatedSource: string;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    // Get article count
    const articleCountResult = await pool.query(
      "SELECT COUNT(*) as count FROM articles"
    );
    const articleCount = parseInt(articleCountResult.rows[0].count);

    // Get the most recent update from all tables
    const lastUpdatedResult = await pool.query(`
      SELECT 
        'articles' as source,
        MAX(updated_at) as last_updated
      FROM articles
      UNION ALL
      SELECT 
        'homepage' as source,
        MAX(updated_at) as last_updated
      FROM homepage_content
      UNION ALL
      SELECT 
        'about' as source,
        MAX(updated_at) as last_updated
      FROM about_content
      ORDER BY last_updated DESC
      LIMIT 1
    `);

    const lastUpdated = lastUpdatedResult.rows[0]?.last_updated;
    const lastUpdatedSource = lastUpdatedResult.rows[0]?.source || "unknown";

    // Format the date
    let formattedDate = "Never";
    if (lastUpdated) {
      const date = new Date(lastUpdated);
      const now = new Date();
      const diffInHours = Math.floor(
        (now.getTime() - date.getTime()) / (1000 * 60 * 60)
      );

      if (diffInHours < 1) {
        formattedDate = "Just now";
      } else if (diffInHours < 24) {
        formattedDate = `${diffInHours} hours ago`;
      } else if (diffInHours < 48) {
        formattedDate = "Yesterday";
      } else {
        formattedDate = date.toLocaleDateString("sv-SE", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      }
    }

    return {
      articleCount,
      lastUpdated: formattedDate,
      lastUpdatedSource:
        lastUpdatedSource === "articles"
          ? "Articles"
          : lastUpdatedSource === "homepage"
          ? "Home page"
          : lastUpdatedSource === "about"
          ? "About page"
          : "Unknown",
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      articleCount: 0,
      lastUpdated: "Error",
      lastUpdatedSource: "Unknown",
    };
  }
}
