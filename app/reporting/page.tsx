import Image from "next/image";
import styles from "./reporting.module.css";
import { getArticles, getPublications } from "../../lib/getArticles";
import ReportingClient from "./ReportingClient";

export default async function Reporting() {
  const articles = await getArticles();
  const publications = await getPublications();

  return (
    <div className={styles.reportingWrapper}>
      <section className={styles.reportingHeaderSection}>
        <h1>REPORTING</h1>
        <h2>Explore my bylines.</h2>
      </section>
      <ReportingClient articles={articles} publications={publications} />
    </div>
  );
}
