import pool from "./database";

export interface AboutContent {
  content: string;
  imageUrl: string;
}

export async function getAboutContent(): Promise<AboutContent> {
  try {
    const result = await pool.query(
      "SELECT content, image_url FROM about_content ORDER BY id DESC LIMIT 1"
    );

    console.log("About database result:", result.rows);
    console.log("Number of rows:", result.rows.length);

    if (result.rows.length > 0) {
      const row = result.rows[0];
      const content = {
        content: row.content,
        imageUrl: row.imageurl || row.image_url, // Handle both cases
      };
      console.log("Returning about content:", content);
      return content;
    }
  } catch (error) {
    console.error("Error fetching about content:", error);
  }

  // Fallback to default content
  return {
    content: `I'm Ashley Perl, a freelance journalist based in Stockholm.

I love a good story – and the challenge of taking a concept and crafting it into something that connects to people.

I mostly cover stories about energy, climate and science. But I also write about other topics that spark my interest.

If you would like to talk about working together, please write me. I would be happy to chat.

A little bit more about me: I was a fellow in the Dalla Lana Fellowship in Journalism and Health Impact at the University of Toronto (2023-2024).

I also have a:
* Master of science in sustainability, Stockholm University (2012-2015)
* Honors bachelor of arts in psychology, Western University in London, Ont. (2007-2012)`,
    imageUrl: "/Scenic.jpg",
  };
}

export async function updateAboutContent(
  newContent: Partial<AboutContent>
): Promise<AboutContent> {
  try {
    // Get current content to preserve imageUrl if not provided
    const currentContent = await getAboutContent();

    let content = newContent.content || currentContent.content;
    const imageUrl = newContent.imageUrl || currentContent.imageUrl;

    // Convert * to • for bullet points
    if (content) {
      content = content.replace(/\*/g, "•");
    }

    // Check if we have existing content
    const existingResult = await pool.query(
      "SELECT id FROM about_content ORDER BY id DESC LIMIT 1"
    );

    let result;
    if (existingResult.rows.length > 0) {
      // Update existing record
      result = await pool.query(
        `UPDATE about_content 
         SET content = $1, image_url = $2, updated_at = NOW()
         WHERE id = $3
         RETURNING content, image_url as imageUrl`,
        [content, imageUrl, existingResult.rows[0].id]
      );
    } else {
      // Insert new record
      result = await pool.query(
        `INSERT INTO about_content (content, image_url, updated_at) 
         VALUES ($1, $2, NOW())
         RETURNING content, image_url as imageUrl`,
        [content, imageUrl]
      );
    }

    return result.rows[0];
  } catch (error) {
    console.error("Error updating about content:", error);
    throw error;
  }
}
