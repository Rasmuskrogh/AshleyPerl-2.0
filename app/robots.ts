import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://ashleyperl.com"; // Replace with actual domain

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/_next/", "/static/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
