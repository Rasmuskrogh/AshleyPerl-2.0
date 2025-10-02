import ConditionalLayout from "@/components/ConditionalLayout";
import Providers from "@/components/Providers";
import {
  PersonStructuredData,
  OrganizationStructuredData,
} from "@/components/StructuredData";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="color-scheme" content="light only" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/AP-mini-logo.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/AP-mini-logo.png"
        />
        <link rel="apple-touch-icon" href="/AP-mini-logo.png" />
        <link rel="shortcut icon" href="/AP-mini-logo.png" />
        <meta name="msapplication-TileImage" content="/AP-mini-logo.png" />
        <PersonStructuredData />
        <OrganizationStructuredData />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          <ConditionalLayout>{children}</ConditionalLayout>
        </Providers>
      </body>
    </html>
  );
}
