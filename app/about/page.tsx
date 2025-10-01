import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import styles from "./about.module.css";
import { getAboutContent } from "../../lib/getAboutContent";

// Revalidate about page when content changes
export const revalidate = 0;

export const metadata: Metadata = {
  title: "About Ashley Perl - Freelance Journalist",
  description:
    "Learn about Ashley Perl, a freelance journalist based in Stockholm, Sweden. Specializing in energy, climate, and science stories with experience from University of Toronto and Stockholm University.",
  keywords: [
    "Ashley Perl biography",
    "freelance journalist Stockholm",
    "energy journalist background",
    "climate reporter experience",
    "University of Toronto fellow",
    "Stockholm University journalist",
  ],
  openGraph: {
    title: "About Ashley Perl - Freelance Journalist",
    description:
      "Learn about Ashley Perl, a freelance journalist based in Stockholm, Sweden. Specializing in energy, climate, and science stories.",
    type: "profile",
    images: ["/Scenic.jpg"],
  },
};

export default async function About() {
  const aboutData = await getAboutContent();

  // Parse content and handle bullet points
  const paragraphs = aboutData.content.split("\n\n").filter((p) => p.trim());

  // Render content
  const renderContent = () => {
    return paragraphs.map((paragraph, index) => {
      const lines = paragraph.split("\n");

      // Check if this paragraph contains bullet points (lines starting with *)
      const bulletLines = lines.filter(
        (line) => line.trim().startsWith("*") || line.trim().startsWith("•")
      );

      if (bulletLines.length > 0) {
        // Handle mixed content (regular text + bullet points)
        return (
          <div key={index} className={styles.paragraph}>
            {lines.map((line, lineIndex) => {
              if (line.trim().startsWith("*") || line.trim().startsWith("•")) {
                // This is a bullet point
                return (
                  <ul key={lineIndex} className={styles.singleItemList}>
                    <li>{line.replace(/^[*•]\s*/, "").trim()}</li>
                  </ul>
                );
              } else {
                // This is regular text
                return <p key={lineIndex}>{line}</p>;
              }
            })}
          </div>
        );
      } else {
        // Regular paragraph - preserve line breaks
        if (lines.length === 1) {
          return (
            <p key={index} className={styles.paragraph}>
              {paragraph}
            </p>
          );
        } else {
          return (
            <div key={index} className={styles.paragraph}>
              {lines.map((line, lineIndex) => (
                <p key={lineIndex}>{line}</p>
              ))}
            </div>
          );
        }
      }
    });
  };
  return (
    <div className={styles.aboutWrapper}>
      <aside className={styles.textAside}>
        <h1>ABOUT</h1>
        {renderContent()}
      </aside>
      <figure className={styles.figureSection}>
        {aboutData.imageUrl.startsWith("/") ? (
          <img
            src={aboutData.imageUrl}
            alt="a scenic austian village and lake"
            style={{ width: "100%", height: "auto" }}
          />
        ) : (
          <Image
            src={aboutData.imageUrl}
            alt="a scenic austian village and lake"
            width={800}
            height={600}
            priority
          />
        )}
      </figure>
    </div>
  );
}
