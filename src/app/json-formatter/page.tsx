import type { Metadata } from "next";
import { ToolLayout } from "@/components/tool-layout";
import { JsonFormatter } from "./json-formatter";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator - Format JSON Online",
  description:
    "Free online JSON formatter and validator. Beautify, minify, and validate JSON data instantly. All processing happens in your browser — your data stays private.",
  alternates: {
    canonical: "/json-formatter",
  },
};

const meta = {
  title: "JSON Formatter & Validator",
  description:
    "Format, validate, minify, and beautify JSON data instantly in your browser.",
};

export default function JsonFormatterPage() {
  return (
    <ToolLayout
      meta={meta}
      seoContent={
        <div className="space-y-6">
          <h2>Online JSON Formatter & Validator</h2>
          <p>
            Our free JSON formatter helps you beautify and validate JSON data
            instantly. Whether you&apos;re debugging API responses, cleaning up
            configuration files, or just want to make your JSON more readable,
            this tool makes it easy. The formatting and validation happens
            entirely in your browser — your JSON data is never sent to any
            server.
          </p>

          <h3>What is JSON?</h3>
          <p>
            JSON (JavaScript Object Notation) is a lightweight data-interchange
            format that is easy for humans to read and write, and easy for
            machines to parse and generate. It is the most widely used data
            format for APIs and web services.
          </p>

          <h3>Features</h3>
          <ul>
            <li>
              <strong>Format/Beautify:</strong> Add proper indentation and line
              breaks for readability
            </li>
            <li>
              <strong>Minify/Compress:</strong> Remove all whitespace to reduce
              file size
            </li>
            <li>
              <strong>Validate:</strong> Check if your JSON is syntactically
              correct with detailed error messages
            </li>
            <li>
              <strong>Copy:</strong> Copy the formatted output with one click
            </li>
            <li>
              <strong>Privacy:</strong> All processing happens locally in your
              browser
            </li>
          </ul>

          <h3>How to Use</h3>
          <ol>
            <li>Paste your JSON data into the input field</li>
            <li>
              Click &quot;Format&quot; to beautify, or &quot;Minify&quot; to
              compress
            </li>
            <li>
              The tool automatically validates your JSON and shows any errors
            </li>
            <li>Copy the result to your clipboard</li>
          </ol>
        </div>
      }
    >
      <JsonFormatter />
    </ToolLayout>
  );
}
