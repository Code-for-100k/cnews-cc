import type { Thing, WithContext } from "schema-dts";

interface JsonLdProps<T extends Thing> {
  data: WithContext<T>;
}

export function JsonLd<T extends Thing>({ data }: JsonLdProps<T>) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebsiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "cnews.cc",
        alternateName: "Canton Network Intelligence",
        url: "https://cnews.cc",
        description:
          "The premier data and intelligence hub for the Canton Network ecosystem. Real-time analytics, validator metrics, token data, and DeFi insights.",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://cnews.cc/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        } as any,
      }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "cnews.cc",
        url: "https://cnews.cc",
        logo: "https://cnews.cc/logo.png",
        description:
          "Canton Network data intelligence and analytics platform.",
        sameAs: ["https://twitter.com/cnewscc"],
      }}
    />
  );
}
