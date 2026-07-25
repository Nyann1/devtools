import type { Metadata } from "next";
import { ToolLayout } from "@/components/tool-layout";
import { UuidTool } from "./uuid-tool";

export const metadata: Metadata = {
  title: "UUID Generator - Generate UUID v4 Random & v7 Time-Based GUIDs Online",
  description:
    "Free online UUID generator. Generate UUID v4 (random) and UUID v7 (time-based, sortable) identifiers. Batch generate up to 100 UUIDs. Uses crypto.randomUUID() in your browser.",
  alternates: { canonical: "https://free-toolkit.com/uuid-generator" },
};

const meta = { title: "UUID Generator", description: "Generate UUID v4 (random) and UUID v7 (time-sortable) identifiers — batch up to 100 at once.", path: "/uuid-generator" };

const faq = [
  { question: "How do I generate a random UUID v4?", answer: "Select the 'UUID v4' tab, set how many you need (1–100), and click Generate. Each UUID uses crypto.randomUUID() for cryptographically strong randomness. v4 UUIDs are fully random — ideal for general-purpose unique IDs." },
  { question: "What is UUID v7 and when should I use it?", answer: "UUID v7 includes a Unix timestamp in milliseconds as the first 48 bits, making them naturally sortable by creation time. Use v7 for database primary keys — they work better with B-tree indexes than random v4 UUIDs. Switch to the UUID v7 tab to generate them." },
  { question: "How do I copy or export generated UUIDs?", answer: "Hover over any UUID in the list and click the copy icon to copy that single UUID. The tool generates up to 100 UUIDs at a time, and you can generate new batches as many times as you want." },
];

export default function UuidPage() {
  return (
    <ToolLayout meta={meta} faq={faq} seoContent={
      <div className="space-y-6">
        <h2>Online UUID Generator</h2>
        <p>Generate universally unique identifiers (UUIDs) in bulk. UUID v4 uses crypto.randomUUID() for random IDs. UUID v7 embeds a timestamp prefix for sortable, database-friendly IDs. Generate 1–100 UUIDs per batch — all generation happens locally in your browser.</p>
      </div>
    }>
      <UuidTool />
    </ToolLayout>
  );
}
