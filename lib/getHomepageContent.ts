import pool from "./database";

export interface HomepageContent {
  title: string;
  description: string;
  imageUrl: string;
}

export async function getHomepageContent(): Promise<HomepageContent> {
  try {
    const result = await pool.query(
      "SELECT title, description, image_url as imageUrl FROM homepage_content ORDER BY id DESC LIMIT 1"
    );

    console.log("Database result:", result.rows);
    console.log("Number of rows:", result.rows.length);

    if (result.rows.length > 0) {
      const row = result.rows[0];
      const content = {
        title: row.title,
        description: row.description,
        imageUrl: row.imageurl || row.imageUrl, // Handle both cases
      };
      console.log("Returning content:", content);
      return content;
    }
  } catch (error) {
    console.error("Error fetching homepage content:", error);
  }

  // Fallback to default content
  return {
    title: "Hello.",
    description:
      "I'm Ashley Perl – a journalist covering energy, climate and science stories.",
    imageUrl: "/PerlAshley.jpg",
  };
}

export async function updateHomepageContent(
  newContent: Partial<HomepageContent>
): Promise<HomepageContent> {
  try {
    // Get current content to preserve imageUrl if not provided
    const currentContent = await getHomepageContent();

    const title = newContent.title || currentContent.title;
    const description = newContent.description || currentContent.description;
    const imageUrl = newContent.imageUrl || currentContent.imageUrl;

    // Check if we have existing content
    const existingResult = await pool.query(
      "SELECT id FROM homepage_content ORDER BY id DESC LIMIT 1"
    );

    let result;
    if (existingResult.rows.length > 0) {
      // Update existing record
      result = await pool.query(
        `UPDATE homepage_content 
         SET title = $1, description = $2, image_url = $3, updated_at = NOW()
         WHERE id = $4
         RETURNING title, description, image_url as imageUrl`,
        [title, description, imageUrl, existingResult.rows[0].id]
      );
    } else {
      // Insert new record
      result = await pool.query(
        `INSERT INTO homepage_content (title, description, image_url, updated_at) 
         VALUES ($1, $2, $3, NOW())
         RETURNING title, description, image_url as imageUrl`,
        [title, description, imageUrl]
      );
    }

    return result.rows[0];
  } catch (error) {
    console.error("Error updating homepage content:", error);
    throw error;
  }
}
