interface PersonSchema {
  "@context": string;
  "@type": string;
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  image: string;
  address: {
    "@type": string;
    addressLocality: string;
    addressCountry: string;
  };
  knowsAbout: string[];
  alumniOf: Array<{
    "@type": string;
    name: string;
  }>;
  award: string[];
  sameAs: string[];
}

interface OrganizationSchema {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url: string;
  founder: {
    "@type": string;
    name: string;
  };
  foundingDate: string;
  location: {
    "@type": string;
    addressLocality: string;
    addressCountry: string;
  };
}

export function PersonStructuredData() {
  const personSchema: PersonSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ashley Perl",
    jobTitle: "Freelance Journalist",
    description:
      "Ashley Perl is a freelance journalist based in Stockholm, Sweden, specializing in energy, climate, and science stories.",
    url: "https://ashleyperl.com",
    image: "https://ashleyperl.com/PerlAshley.jpg",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Stockholm",
      addressCountry: "Sweden",
    },
    knowsAbout: [
      "Energy journalism",
      "Climate journalism",
      "Science journalism",
      "Environmental reporting",
      "Sustainability journalism",
    ],
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "Stockholm University",
      },
      {
        "@type": "EducationalOrganization",
        name: "Western University",
      },
    ],
    award: [
      "Dalla Lana Fellowship in Journalism and Health Impact at the University of Toronto (2023-2024)",
    ],
    sameAs: [
      // Add social media profiles when available
      "https://x.com/ashleyaperl",
      "https://linkedin.com/in/ashleyperl",
      "https://muckrack.com/ashley-perl",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  );
}

export function OrganizationStructuredData() {
  const organizationSchema: OrganizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ashley Perl Journalism",
    description:
      "Freelance journalism services specializing in energy, climate, and science stories.",
    url: "https://ashleyperl.com",
    founder: {
      "@type": "Person",
      name: "Ashley Perl",
    },
    foundingDate: "2024", // Adjust based on when you started freelancing
    location: {
      "@type": "PostalAddress",
      addressLocality: "Stockholm",
      addressCountry: "Sweden",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}
