import type { Metadata } from "next";
import { ToolLayout } from "@/components/tool-layout";
import { Base64Tool } from "./base64-tool";

export const metadata: Metadata = {
  title: "Base64 Encoder & Decoder - Encode Text, Decode Base64 Strings Online",
  description:
    "Free online Base64 encoder and decoder. Convert text to Base64 and decode Base64 back to text. Supports UTF-8, binary strings, and data URIs. All local processing.",
  alternates: { canonical: "https://free-toolkit.com/base64" },
};

const meta = { title: "Base64 Encoder & Decoder", description: "Encode text to Base64 or decode Base64 strings back to readable text with UTF-8 support.", path: "/base64" };

const faq = [
  { question: "How do I encode text to Base64?", answer: "Switch to the Encode tab, type or paste your text, and the Base64-encoded output appears instantly. The tool uses JavaScript's btoa() function with UTF-8 handling so non-ASCII characters (Chinese, emoji, etc.) encode correctly." },
  { question: "How do I decode a Base64 string back to text?", answer: "Switch to the Decode tab, paste your Base64 string, and the decoded text appears immediately. The tool handles multi-byte UTF-8 characters automatically — unlike basic atob() decoders, it won't produce garbled text for non-Latin characters." },
  { question: "What is Base64 used for?", answer: "Common uses include: encoding binary data for JSON/XML APIs, embedding images as data URIs in HTML and CSS (e.g., data:image/png;base64,...), encoding credentials for HTTP Basic Authentication headers, and transmitting data through text-only channels like email." },
];

export default function Base64Page() {
  return (
    <ToolLayout meta={meta} faq={faq} seoContent={
      <div className="space-y-6">
        <h2>Online Base64 Encoder & Decoder</h2>
        <p>Encode plain text to Base64 or decode Base64 strings back to readable text. Unlike simple btoa/atob tools, this encoder properly handles multi-byte UTF-8 characters including Chinese, Japanese, emoji, and accented letters.</p>
        <h3>Common Use Cases</h3>
        <ul>
          <li>Encoding binary or text data for JSON and XML API payloads</li>
          <li>Creating Base64 data URIs to embed images in HTML/CSS</li>
          <li>Encoding credentials for HTTP Basic Authentication</li>
          <li>Transferring data through email or text-only protocols</li>
        </ul>
      </div>
    }>
      <Base64Tool />
    </ToolLayout>
  );
}
