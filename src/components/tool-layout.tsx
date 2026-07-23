import type { ReactNode } from "react";

export interface ToolMeta {
  title: string;
  description: string;
}

interface ToolLayoutProps {
  meta: ToolMeta;
  children: ReactNode;
  seoContent?: ReactNode;
}

export function ToolLayout({ meta, children, seoContent }: ToolLayoutProps) {
  return (
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
  );
}
