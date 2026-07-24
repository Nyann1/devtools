import type { Metadata } from "next";
import { ToolLayout } from "@/components/tool-layout";
import { HashTool } from "./hash-tool";

export const metadata: Metadata = {
  title: "Hash Generator - MD5, SHA-1, SHA-256, SHA-512 Online",
  description: "Free online hash generator. Generate MD5, SHA-1, SHA-256, SHA-512 hashes from text. All processing happens in your browser using the Web Crypto API.",
  alternates: { canonical: "https://free-toolkit.com/hash-generator" },
};

const meta = { title: "Hash Generator", description: "Generate cryptographic hashes using MD5, SHA-1, SHA-256, and SHA-512.", path: "/hash-generator" };

const faq = [
  { question: "What is a hash function?", answer: "A hash function takes input data and produces a fixed-size string of characters. The same input always produces the same hash. Hash functions are one-way — you cannot reverse a hash back to the original data." },
  { question: "Which hash algorithm should I use?", answer: "For security, use SHA-256 or SHA-512. MD5 and SHA-1 are provided for legacy compatibility but should not be used for security-sensitive applications as they have known vulnerabilities." },
  { question: "Is the hash computed on a server?", answer: "No. SHA-256 and SHA-512 use your browser's Web Crypto API. MD5 and SHA-1 are computed in JavaScript. All hashing happens locally — your input text never leaves your device." },
];

export default function HashPage() {
  return (
    <ToolLayout meta={meta} faq={faq} seoContent={
      <div className="space-y-6">
        <h2>Online Hash Generator</h2>
        <p>Generate cryptographic hashes from any text input. Uses your browser's built-in Web Crypto API for SHA-2 family hashes. MD5 and SHA-1 are provided for legacy compatibility but should not be used for security purposes.</p>
      </div>
    }>
      <HashTool />
    </ToolLayout>
  );
}
