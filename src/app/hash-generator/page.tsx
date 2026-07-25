import type { Metadata } from "next";
import { ToolLayout } from "@/components/tool-layout";
import { HashTool } from "./hash-tool";

export const metadata: Metadata = {
  title: "Hash Generator - MD5, SHA-1, SHA-256, SHA-512 Checksum Online",
  description:
    "Free online hash generator. Compute MD5, SHA-1, SHA-256, and SHA-512 cryptographic hashes from text. SHA-2 uses Web Crypto API. All local processing.",
  alternates: { canonical: "https://free-toolkit.com/hash-generator" },
};

const meta = { title: "Hash Generator", description: "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from any text input — all computed locally in your browser.", path: "/hash-generator" };

const faq = [
  { question: "How do I generate an MD5 hash?", answer: "Type or paste your text into the input field. The MD5 hash is generated automatically using a JavaScript implementation. The 32-character hexadecimal string appears in the MD5 card below — click the copy icon to copy it." },
  { question: "How do I generate a SHA-256 hash?", answer: "Enter your text and the SHA-256 hash appears instantly. Unlike MD5, SHA-256 uses your browser's built-in Web Crypto API (crypto.subtle.digest) for secure, hardware-accelerated hashing." },
  { question: "Which hash algorithm should I use?", answer: "Use SHA-256 or SHA-512 for security (password verification, file integrity, digital signatures). MD5 and SHA-1 are provided for legacy compatibility and checksums only — they have known collision vulnerabilities and should not be used for security purposes." },
];

export default function HashPage() {
  return (
    <ToolLayout meta={meta} faq={faq} seoContent={
      <div className="space-y-6">
        <h2>Online Hash Generator</h2>
        <p>Generate MD5, SHA-1, SHA-256, and SHA-512 cryptographic hashes from any text input. SHA-2 family hashes (SHA-256, SHA-512) use the browser's native Web Crypto API for performance. MD5 and SHA-1 run in JavaScript for legacy use — not recommended for security. All hashing is client-side; your input never leaves your device.</p>
      </div>
    }>
      <HashTool />
    </ToolLayout>
  );
}
