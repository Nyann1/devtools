import type { ReactNode } from "react";
import { JsonLd } from "@/components/json-ld";

export interface ToolMeta {
  title: string;
  description: string;
  path: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface ToolLayoutProps {
  meta: ToolMeta;
  children: ReactNode;
  seoContent?: ReactNode;
  faq?: FaqItem[];
}

export function ToolLayout({ meta, children, seoContent, faq }: ToolLayoutProps) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://free-toolkit.com" },
      { "@type": "ListItem", position: 2, name: meta.title, item: `https://free-toolkit.com${meta.path}` },
    ],
  };

  const faqLd = faq && faq.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

  return (
    <>
      <JsonLd data={breadcrumb} />
      {faqLd && <JsonLd data={faqLd} />}
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">{meta.title}</h1>
          <p className="text-muted-foreground text-lg">{meta.description}</p>
        </div>
        <div className="mb-8">{children}</div>
        {seoContent && (
          <div className="prose prose-neutral max-w-none mt-16 border-t pt-8">
            {seoContent}
          </div>
        )}
      </div>
    </>
  );
}
