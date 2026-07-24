import type { Metadata } from "next";
import { ToolLayout } from "@/components/tool-layout";
import { UrlTool } from "./url-tool";

export const metadata: Metadata = {
  title: "URL Encoder & Decoder - Free Online URL Encoding Tool",
  description: "Free online URL encoder and decoder. URL-encode special characters or decode percent-encoded URLs. All processing happens in your browser.",
  alternates: { canonical: "https://free-toolkit.com/url-encoder" },
};

const meta = { title: "URL Encoder & Decoder", description: "Encode special characters for URLs or decode percent-encoded strings.", path: "/url-encoder" };

const faq = [
  { question: "What is URL encoding?", answer: "URL encoding (also called percent-encoding) converts special characters into a % followed by two hexadecimal digits. For example, spaces become %20. This ensures URLs contain only valid ASCII characters." },
  { question: "When do I need URL encoding?", answer: "Any time you include special characters in a URL — spaces, non-ASCII characters like Chinese or emoji, or reserved characters like &, ?, #. These must be encoded to be safely transmitted in a URL." },
  { question: "Where is the data processed?", answer: "All encoding and decoding runs entirely in your browser using JavaScript's encodeURIComponent and decodeURIComponent functions. No data is ever sent to a server." },
];

export default function UrlEncoderPage() {
  return (
    <ToolLayout meta={meta} faq={faq} seoContent={
      <div className="space-y-6">
        <h2>Online URL Encoder & Decoder</h2>
        <p>URL encoding (percent-encoding) converts characters that are not allowed in URLs into a safe format. This tool encodes and decodes URL strings instantly in your browser.</p>
      </div>
    }>
      <UrlTool />
    </ToolLayout>
  );
}
