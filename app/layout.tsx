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
