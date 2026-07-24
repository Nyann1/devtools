import type { Metadata } from "next";
import { ToolLayout } from "@/components/tool-layout";
import { JsonFormatter } from "./json-formatter";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator - Format JSON Online Free",
  description:
    "Free online JSON formatter and validator. Beautify, minify, validate, escape, and unescape JSON data instantly. All processing happens in your browser — your data stays private.",
  alternates: { canonical: "https://free-toolkit.com/json-formatter" },
};

const meta = { title: "JSON Formatter & Validator", description: "Format, validate, minify, and beautify JSON data instantly in your browser.", path: "/json-formatter" };

const faq = [
  { question: "What is JSON?", answer: "JSON (JavaScript Object Notation) is a lightweight data-interchange format that is easy for humans to read and write, and easy for machines to parse and generate. It is the most widely used data format for APIs and web services." },
  { question: "How do I format JSON with this tool?", answer: "Paste your JSON data into the input field and click Format. The tool adds proper indentation and line breaks. You can also Minify to compress JSON, Validate to check syntax, or Escape/Unescape for embedding JSON in code." },
  { question: "Is my JSON data secure?", answer: "Yes. All processing happens locally in your browser using JavaScript's built-in JSON parser. Your data is never uploaded to any server — it never leaves your device." },
];

export default function JsonFormatterPage() {
  return (
    <ToolLayout
      meta={meta}
      faq={faq}
      seoContent={
        <div className="space-y-6">
          <h2>Online JSON Formatter & Validator</h2>
          <p>Our free JSON formatter helps you beautify and validate JSON data instantly. Whether you're debugging API responses, cleaning up configuration files, or just want to make your JSON more readable, this tool makes it easy.</p>
          <h3>Features</h3>
          <ul>
            <li><strong>Format/Beautify:</strong> Add proper indentation and line breaks for readability</li>
            <li><strong>Minify/Compress:</strong> Remove all whitespace to reduce file size</li>
            <li><strong>Validate:</strong> Check if your JSON is syntactically correct with detailed error messages</li>
            <li><strong>Escape/Unescape:</strong> Convert JSON to a string or parse escaped JSON strings</li>
            <li><strong>Privacy:</strong> All processing happens locally in your browser</li>
          </ul>
          <h3>How to Use</h3>
          <ol>
            <li>Paste your JSON data into the input field</li>
            <li>Click "Format" to beautify, or "Minify" to compress</li>
            <li>Click "Validate" to check if your JSON is valid</li>
            <li>Copy the result to your clipboard</li>
          </ol>
        </div>
      }
    >
      <JsonFormatter />
    </ToolLayout>
  );
}
