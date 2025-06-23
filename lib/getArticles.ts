import pool from "./database";

export async function getArticles() {
  const result = await pool.query(`
    SELECT * FROM articles 
    ORDER BY 
      CAST(SUBSTRING(date FROM '\\d{4}') AS INTEGER) DESC,
      CASE 
        WHEN date LIKE 'January%' OR date LIKE 'Jan.%' THEN 1
        WHEN date LIKE 'February%' OR date LIKE 'Feb.%' THEN 2
        WHEN date LIKE 'March%' OR date LIKE 'Mar.%' THEN 3
        WHEN date LIKE 'April%' OR date LIKE 'Apr.%' THEN 4
        WHEN date LIKE 'May%' THEN 5
        WHEN date LIKE 'June%' OR date LIKE 'Jun.%' THEN 6
        WHEN date LIKE 'July%' OR date LIKE 'Jul.%' THEN 7
        WHEN date LIKE 'August%' OR date LIKE 'Aug.%' THEN 8
        WHEN date LIKE 'September%' OR date LIKE 'Sep.%' THEN 9
        WHEN date LIKE 'October%' OR date LIKE 'Oct.%' THEN 10
        WHEN date LIKE 'November%' OR date LIKE 'Nov.%' THEN 11
        WHEN date LIKE 'December%' OR date LIKE 'Dec.%' THEN 12
      END DESC,
      CAST(SUBSTRING(date FROM '\\d{1,2}') AS INTEGER) DESC
  `);
  return result.rows;
}
