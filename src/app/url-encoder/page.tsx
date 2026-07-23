import type { Metadata } from "next";
import { ToolLayout } from "@/components/tool-layout";
import { UrlTool } from "./url-tool";

export const metadata: Metadata = {
  title: "URL Encoder & Decoder - Free Online URL Encoding Tool",
  description: "Free online URL encoder and decoder. URL-encode special characters or decode percent-encoded URLs. All processing happens in your browser.",
};

export default function UrlEncoderPage() {
  return (
    <ToolLayout
      meta={{ title: "URL Encoder & Decoder", description: "Encode special characters for URLs or decode percent-encoded strings." }}
      seoContent={
        <div className="space-y-6">
          <h2>Online URL Encoder & Decoder</h2>
          <p>URL encoding (percent-encoding) converts characters that are not allowed in URLs into a safe format. This tool encodes and decodes URL strings instantly in your browser.</p>
        </div>
      }
    >
      <UrlTool />
    </ToolLayout>
  );
}
