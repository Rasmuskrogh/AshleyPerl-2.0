import { MetadataRoute } from "next";
import { getArticles } from "@/lib/getArticles";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ashleyperl.com"; // Replace with actual domain

  // Get articles for dynamic routes
  const articles = await getArticles();

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  // Dynamic article pages (if you have individual article pages)
  const articlePages = articles.map((article) => ({
    url: `${baseUrl}/articles/${article.id}`, // Adjust based on your routing
    lastModified: new Date(article.updated_at),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...articlePages];
}
