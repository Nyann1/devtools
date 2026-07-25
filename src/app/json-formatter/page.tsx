import type { Metadata } from "next";
import { ToolLayout } from "@/components/tool-layout";
import { JsonFormatter } from "./json-formatter";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator - Beautify, Minify & Fix JSON Online",
  description:
    "Free online JSON formatter with beautify, minify, validate, escape, and unescape tools. Pretty-print messy JSON with one click. All processing happens in your browser — no upload.",
  alternates: { canonical: "https://free-toolkit.com/json-formatter" },
};

const meta = { title: "JSON Formatter & Validator", description: "Beautify, minify, validate, escape, and unescape JSON data — instantly, all in your browser.", path: "/json-formatter" };

const faq = [
  { question: "How do I beautify or pretty-print JSON?", answer: "Paste your compact or messy JSON into the input field and click Format. The tool adds proper indentation (2 spaces), line breaks, and color-codes the structure. You can also Minify to compress JSON back to a single line to reduce file size." },
  { question: "How do I check if my JSON is valid?", answer: "Click the Validate button. The tool checks your JSON against JavaScript's built-in JSON parser and shows specific error messages pointing to the exact location of any syntax issues, like missing commas, unclosed brackets, or trailing commas." },
  { question: "What is JSON escape and when do I need it?", answer: "JSON escape converts special characters in a string so it can be safely embedded inside another JSON document or code. For example, double quotes inside a string become \\\". Our Escape button does this with one click; Unescape reverses it." },
];

export default function JsonFormatterPage() {
  return (
    <ToolLayout meta={meta} faq={faq} seoContent={
      <div className="space-y-6">
        <h2>Online JSON Formatter & Validator</h2>
        <p>Format messy, minified, or single-line JSON into clean, indented output. Validate JSON syntax with detailed error messages pointing to exactly where the problem is. Escape or unescape JSON strings for embedding in code.</p>
        <h3>What You Can Do</h3>
        <ul>
          <li><strong>Format / Beautify:</strong> Turn compressed JSON into readable, indented output with tree structure</li>
          <li><strong>Minify / Compress:</strong> Strip all whitespace to minimize file size for production</li>
          <li><strong>Validate:</strong> Find syntax errors with exact position information</li>
          <li><strong>Escape:</strong> Convert text into a safe JSON string (adds quotes, escapes special chars)</li>
          <li><strong>Unescape:</strong> Parse escaped JSON strings back to readable text</li>
        </ul>
        <h3>How It Works</h3>
        <ol>
          <li>Paste your JSON into the left panel</li>
          <li>Click Format, Minify, Validate, Escape, or Unescape</li>
          <li>See the result instantly in the right panel</li>
          <li>Copy with one click — formatted output shows key count and file size</li>
        </ol>
      </div>
    }>
      <JsonFormatter />
    </ToolLayout>
  );
}
