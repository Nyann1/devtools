import type { Metadata } from "next";
import { ToolLayout } from "@/components/tool-layout";
import { Base64Tool } from "./base64-tool";

export const metadata: Metadata = {
  title: "Base64 Encode & Decode - Online Base64 Converter",
  description:
    "Free online Base64 encoder and decoder. Convert text to Base64 and decode Base64 strings. Supports UTF-8. All processing happens in your browser.",
};

const meta = {
  title: "Base64 Encoder & Decoder",
  description:
    "Encode text to Base64 or decode Base64 strings back to readable text.",
};

export default function Base64Page() {
  return (
    <ToolLayout
      meta={meta}
      seoContent={
        <div className="space-y-6">
          <h2>Online Base64 Encoder & Decoder</h2>
          <p>
            Base64 encoding converts binary data into ASCII text using 64
            characters. This tool lets you encode plain text to Base64 and
            decode Base64 strings back to text, all locally in your browser.
          </p>
          <h3>Common Use Cases</h3>
          <ul>
            <li>Encoding binary data for JSON or XML APIs</li>
            <li>Embedding images as Base64 data URIs in HTML/CSS</li>
            <li>Encoding credentials for HTTP Basic Authentication</li>
            <li>Transferring data through text-only channels</li>
          </ul>
        </div>
      }
    >
      <Base64Tool />
    </ToolLayout>
  );
}
