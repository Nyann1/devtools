import type { Metadata } from "next";
import { ToolLayout } from "@/components/tool-layout";
import { UuidTool } from "./uuid-tool";

export const metadata: Metadata = {
  title: "UUID Generator - Generate UUID v4 & v7 Online Free",
  description: "Free online UUID generator. Generate random UUIDv4 and time-based UUIDv7 identifiers. Batch generation supported. All processing happens in your browser.",
  alternates: { canonical: "https://free-toolkit.com/uuid-generator" },
};

const meta = { title: "UUID Generator", description: "Generate UUID v4 (random) and UUID v7 (time-based) identifiers.", path: "/uuid-generator" };

const faq = [
  { question: "What is a UUID?", answer: "A Universally Unique Identifier (UUID) is a 128-bit number used to uniquely identify information. UUIDs are widely used as database keys, session IDs, and transaction IDs because the chance of collision is astronomically low." },
  { question: "UUID v4 vs v7 — which should I use?", answer: "UUID v4 is fully random — good for general use. UUID v7 includes a timestamp prefix, making it sortable by creation time. Use v7 when you need database-friendly, time-ordered IDs that work well with B-tree indexes." },
  { question: "Are UUIDs truly unique?", answer: "UUID v4 uses crypto.randomUUID(), generating 122 random bits. The probability of collision is roughly 1 in 2.7 × 10¹⁸ per UUID. You'd need to generate 1 billion UUIDs per second for 85 years to have a 50% chance of a single collision." },
];

export default function UuidPage() {
  return (
    <ToolLayout meta={meta} faq={faq} seoContent={
      <div className="space-y-6">
        <h2>Online UUID Generator</h2>
        <p>Generate universally unique identifiers (UUIDs) for free. UUID v4 (random) and UUID v7 (time-based, sortable) are supported. All generation happens locally in your browser using the crypto.randomUUID() API.</p>
      </div>
    }>
      <UuidTool />
    </ToolLayout>
  );
}
