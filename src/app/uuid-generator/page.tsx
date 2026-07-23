import type { Metadata } from "next";
import { ToolLayout } from "@/components/tool-layout";
import { UuidTool } from "./uuid-tool";

export const metadata: Metadata = {
  title: "UUID Generator - Generate UUID v4 & v7 Online",
  description: "Free online UUID generator. Generate random UUIDv4 and time-based UUIDv7 identifiers. Batch generation supported. All processing happens in your browser.",
};

export default function UuidPage() {
  return (
    <ToolLayout
      meta={{ title: "UUID Generator", description: "Generate UUID v4 (random) and UUID v7 (time-based) identifiers." }}
      seoContent={
        <div className="space-y-6">
          <h2>Online UUID Generator</h2>
          <p>Generate universally unique identifiers (UUIDs). UUIDv4 uses random numbers. UUIDv7 is time-based and sortable. All generation happens locally in your browser.</p>
        </div>
      }
    >
      <UuidTool />
    </ToolLayout>
  );
}
