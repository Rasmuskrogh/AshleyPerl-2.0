export interface EmailData {
  name: string;
  email: string;
  message: string;
  /** Honeypot – ska vara tom. Fylls bara av bottar. */
  website?: string;
}
