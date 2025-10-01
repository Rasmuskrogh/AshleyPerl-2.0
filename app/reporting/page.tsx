import styles from "./reporting.module.css";
import ReportingClient from "./ReportingClient";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export default function Reporting() {
  return (
    <div className={styles.reportingWrapper}>
      <section className={styles.reportingHeaderSection}>
        <h1>REPORTING</h1>
        <h2>Explore my bylines.</h2>
      </section>
      <ReportingClient />
    </div>
  );
}
