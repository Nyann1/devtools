import type { Metadata } from "next";
import { ToolLayout } from "@/components/tool-layout";
import { UrlTool } from "./url-tool";

export const metadata: Metadata = {
  title: "URL Encoder & Decoder - Encode URLs, Decode Percent Encoding Online",
  description:
    "Free online URL encoder and decoder. Encode special characters for safe URLs and decode percent-encoded strings. Uses encodeURIComponent/decodeURIComponent in your browser.",
  alternates: { canonical: "https://free-toolkit.com/url-encoder" },
};

const meta = { title: "URL Encoder & Decoder", description: "URL-encode special characters (spaces, symbols, Unicode) or decode percent-encoded URLs back to plain text.", path: "/url-encoder" };

const faq = [
  { question: "How do I URL-encode a string?", answer: "Switch to the Encode tab and paste your text. Characters like spaces become %20, Chinese characters become percent-encoded UTF-8 sequences (%E4%B8...), and reserved URL characters like &?# are properly escaped." },
  { question: "How do I decode a percent-encoded URL?", answer: "Switch to the Decode tab and paste the encoded URL. The tool converts percent-encoded sequences back to their original characters — %20 becomes a space, %2F becomes /, and encoded Chinese text renders correctly." },
  { question: "Why does my URL have %20 and other symbols in it?", answer: "URLs can only contain ASCII characters. Spaces, non-Latin characters (Chinese, Arabic, etc.), and reserved symbols like &, ?, # must be percent-encoded. For example, a space becomes %20 and the Chinese character 中 becomes %E4%B8%AD." },
];

export default function UrlEncoderPage() {
  return (
    <ToolLayout meta={meta} faq={faq} seoContent={
      <div className="space-y-6">
        <h2>Online URL Encoder & Decoder</h2>
        <p>Encode special characters, spaces, and Unicode text into safe URL percent-encoding (also called URL escaping). Decode percent-encoded URLs or query strings back to readable text. All encoding and decoding happens instantly in your browser using JavaScript's encodeURIComponent and decodeURIComponent functions.</p>
      </div>
    }>
      <UrlTool />
    </ToolLayout>
  );
}
