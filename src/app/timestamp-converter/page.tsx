import type { Metadata } from "next";
import { ToolLayout } from "@/components/tool-layout";
import { TimestampTool } from "./timestamp-tool";

export const metadata: Metadata = {
  title: "Unix Timestamp Converter - Epoch to Human-Readable Date",
  description: "Free online Unix timestamp converter. Convert Unix epoch time to human-readable dates and vice versa. Supports seconds and milliseconds. All processing in your browser.",
  alternates: { canonical: "https://free-toolkit.com/timestamp-converter" },
};

const meta = { title: "Unix Timestamp Converter", description: "Convert between Unix timestamps and human-readable dates in real-time.", path: "/timestamp-converter" };

const faq = [
  { question: "What is a Unix timestamp?", answer: "A Unix timestamp (or epoch time) is the number of seconds since January 1, 1970, 00:00:00 UTC. It's a simple, timezone-independent way to represent dates as a single number, widely used in programming and databases." },
  { question: "Seconds vs milliseconds — what's the difference?", answer: "Unix timestamps are traditionally in seconds. However, JavaScript and some systems use milliseconds (timestamp × 1000). This tool auto-detects which format you entered and shows results in both." },
  { question: "How do I convert a date to a timestamp?", answer: "Switch to the Date → Timestamp tab, enter a date and time, and the tool instantly shows the Unix timestamp. You can also click 'Use Current Time' to get the timestamp for right now." },
];

export default function TimestampPage() {
  return (
    <ToolLayout meta={meta} faq={faq} seoContent={
      <div className="space-y-6">
        <h2>Unix Timestamp Converter</h2>
        <p>A Unix timestamp is the number of seconds or milliseconds since January 1, 1970 (UTC). This tool converts timestamps to readable dates and back, all locally in your browser.</p>
      </div>
    }>
      <TimestampTool />
    </ToolLayout>
  );
}
