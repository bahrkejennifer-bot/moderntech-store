import { Helmet } from "react-helmet-async";

const SITE = "https://moderntech.store";
const LOGO = `${SITE}/lovable-uploads/modern-tech-logo.png`;

const ORG = {
  "@type": "Organization",
  "@id": `${SITE}/#organization`,
  name: "Modern Tech LLC",
  url: SITE,
  logo: {
    "@type": "ImageObject",
    url: LOGO,
  },
  sameAs: [
    "https://www.pinterest.com/moderntechstore",
    "https://www.youtube.com/@moderntechllc",
    "https://www.instagram.com/moderntechllc",
  ],
};

interface StructuredDataProps {
  /** Page title (defaults to current document title at render time) */
  title?: string;
  /** Page description */
  description?: string;
  /** Canonical path, e.g. "/digital-products". Defaults to "/" */
  path?: string;
  /** Optional: include WebSite schema with SearchAction (use on homepage) */
  includeWebSite?: boolean;
  /** Optional: extra @graph nodes (e.g. BlogPosting) */
  extraGraph?: Record<string, unknown>[];
}

/**
 * Site-wide JSON-LD: Organization + WebPage (and optionally WebSite).
 * Safe to render on every page; pass extraGraph for page-specific schemas.
 */
const StructuredData = ({
  title,
  description,
  path = "/",
  includeWebSite = false,
  extraGraph = [],
}: StructuredDataProps) => {
  const url = `${SITE}${path}`;

  const webPage = {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { "@id": `${SITE}/#website` },
    inLanguage: "en-US",
    publisher: { "@id": `${SITE}/#organization` },
  };

  const webSite = includeWebSite
    ? [
        {
          "@type": "WebSite",
          "@id": `${SITE}/#website`,
          url: SITE,
          name: "Modern Tech LLC",
          publisher: { "@id": `${SITE}/#organization` },
          inLanguage: "en-US",
          potentialAction: {
            "@type": "SearchAction",
            target: `${SITE}/blog?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        },
      ]
    : [];

  const graph = [ORG, ...webSite, webPage, ...extraGraph];

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({ "@context": "https://schema.org", "@graph": graph })}
      </script>
    </Helmet>
  );
};

export default StructuredData;
