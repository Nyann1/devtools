import type { Metadata } from "next";
import { ToolLayout } from "@/components/tool-layout";
import { TimestampTool } from "./timestamp-tool";

export const metadata: Metadata = {
  title: "Unix Timestamp Converter - Epoch to Human-Readable Date",
  description: "Free online Unix timestamp converter. Convert epoch time to human-readable dates and vice versa. Supports seconds and milliseconds.",
};

export default function TimestampPage() {
  return (
    <ToolLayout
      meta={{ title: "Unix Timestamp Converter", description: "Convert between Unix timestamps and human-readable dates." }}
      seoContent={
        <div className="space-y-6">
          <h2>Unix Timestamp Converter</h2>
          <p>A Unix timestamp is the number of seconds (or milliseconds) since January 1, 1970 (UTC). This tool converts timestamps to readable dates and back, all locally in your browser.</p>
        </div>
      }
    >
      <TimestampTool />
    </ToolLayout>
  );
}
