import type { Metadata } from "next";
import { ToolLayout } from "@/components/tool-layout";
import { Base64Tool } from "./base64-tool";

export const metadata: Metadata = {
  title: "Base64 Encode & Decode - Online Base64 Converter",
  description: "Free online Base64 encoder and decoder. Convert text to Base64 and decode Base64 strings. Supports UTF-8. All processing happens in your browser.",
  alternates: { canonical: "https://free-toolkit.com/base64" },
};

const meta = { title: "Base64 Encoder & Decoder", description: "Encode text to Base64 or decode Base64 strings back to readable text.", path: "/base64" };

const faq = [
  { question: "What is Base64 encoding?", answer: "Base64 encoding converts binary data into ASCII text using 64 characters (A-Z, a-z, 0-9, +, /). It's used to safely transmit data through text-only channels like JSON, XML, email, and URLs." },
  { question: "How do I decode a Base64 string?", answer: "Paste your Base64 string into the input field and switch to the Decode tab. The tool automatically handles UTF-8 text decoding so non-ASCII characters display correctly." },
  { question: "Does this tool send my data to a server?", answer: "No. All encoding and decoding is done locally in your browser using built-in JavaScript functions. Your data never leaves your device." },
];

export default function Base64Page() {
  return (
    <ToolLayout meta={meta} faq={faq} seoContent={
      <div className="space-y-6">
        <h2>Online Base64 Encoder & Decoder</h2>
        <p>Base64 encoding converts binary data into ASCII text using 64 characters. This tool lets you encode plain text to Base64 and decode Base64 strings back to text, all locally in your browser.</p>
        <h3>Common Use Cases</h3>
        <ul>
          <li>Encoding binary data for JSON or XML APIs</li>
          <li>Embedding images as Base64 data URIs in HTML/CSS</li>
          <li>Encoding credentials for HTTP Basic Authentication</li>
          <li>Transferring data through text-only channels</li>
        </ul>
      </div>
    }>
      <Base64Tool />
    </ToolLayout>
  );
}
