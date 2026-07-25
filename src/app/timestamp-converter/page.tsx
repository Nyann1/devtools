import type { Metadata } from "next";
import { ToolLayout } from "@/components/tool-layout";
import { TimestampTool } from "./timestamp-tool";

export const metadata: Metadata = {
  title: "Unix Timestamp Converter - Convert Epoch to Date & Date to Timestamp",
  description:
    "Free online Unix timestamp converter. Convert epoch time (seconds or milliseconds) to human-readable dates and vice versa. Auto-detects format. All local processing.",
  alternates: { canonical: "https://free-toolkit.com/timestamp-converter" },
};

const meta = { title: "Unix Timestamp Converter", description: "Convert Unix timestamps to readable dates and dates back to timestamps. Auto-detects seconds vs milliseconds.", path: "/timestamp-converter" };

const faq = [
  { question: "How do I convert a Unix timestamp to a date?", answer: "Enter your timestamp in the 'Timestamp → Date' panel. The tool auto-detects whether it's in seconds (10 digits) or milliseconds (13 digits) and shows the corresponding UTC date and your local time. Click 'Use Current Time' to get today's timestamp." },
  { question: "How do I convert a date to a Unix timestamp?", answer: "Scroll to the 'Date → Timestamp' panel. Enter year, month, day, hours, minutes, and seconds, and the tool shows both seconds and millisecond timestamps. Use 'Use Current Time' to auto-fill with the present moment." },
  { question: "What's the difference between seconds and milliseconds timestamps?", answer: "A timestamp in seconds is 10 digits (e.g., 1710800000). In milliseconds it's 13 digits (e.g., 1710800000000). JavaScript uses milliseconds; most APIs and databases use seconds. This converter auto-detects your input format so you don't need to worry about it." },
];

export default function TimestampPage() {
  return (
    <ToolLayout meta={meta} faq={faq} seoContent={
      <div className="space-y-6">
        <h2>Unix Timestamp Converter</h2>
        <p>Convert between Unix epoch timestamps and human-readable dates. Supports both seconds (10-digit) and milliseconds (13-digit) with automatic format detection. Shows results in UTC and your local timezone. Two-way conversion — timestamp to date and date to timestamp — with a handy 'current time' shortcut.</p>
      </div>
    }>
      <TimestampTool />
    </ToolLayout>
  );
}
