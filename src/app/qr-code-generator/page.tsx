import type { Metadata } from "next";
import { ToolLayout } from "@/components/tool-layout";
import { QrTool } from "./qr-tool";

export const metadata: Metadata = {
  title: "QR Code Generator - Create QR Codes Online Free",
  description: "Free online QR code generator. Create QR codes from text or URLs. Download as PNG. All processing happens in your browser.",
};

export default function QrPage() {
  return (
    <ToolLayout
      meta={{ title: "QR Code Generator", description: "Generate QR codes from text, URLs, or any data. Download as PNG image." }}
      seoContent={
        <div className="space-y-6">
          <h2>Free Online QR Code Generator</h2>
          <p>Create QR codes for URLs, text, WiFi credentials, contact information, and more. QR codes are generated entirely in your browser using a client-side library — your data is never sent to a server.</p>
        </div>
      }
    >
      <QrTool />
    </ToolLayout>
  );
}
