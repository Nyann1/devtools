import type { Metadata } from "next";
import { ToolLayout } from "@/components/tool-layout";
import { HashTool } from "./hash-tool";

export const metadata: Metadata = {
  title: "Hash Generator - MD5, SHA-1, SHA-256, SHA-512 Online",
  description: "Free online hash generator. Generate MD5, SHA-1, SHA-256, SHA-512 hashes from text. All processing happens in your browser using the Web Crypto API.",
};

export default function HashPage() {
  return (
    <ToolLayout
      meta={{ title: "Hash Generator", description: "Generate cryptographic hashes using MD5, SHA-1, SHA-256, or SHA-512." }}
      seoContent={
        <div className="space-y-6">
          <h2>Online Hash Generator</h2>
          <p>Generate secure cryptographic hashes from any text input. Uses your browser&apos;s built-in Web Crypto API for SHA-2 family hashes. MD5 and SHA-1 are provided for legacy compatibility but should not be used for security purposes.</p>
        </div>
      }
    >
      <HashTool />
    </ToolLayout>
  );
}
