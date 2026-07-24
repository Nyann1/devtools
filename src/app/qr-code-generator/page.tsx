import type { Metadata } from "next";
import { ToolLayout } from "@/components/tool-layout";
import { QrTool } from "./qr-tool";

export const metadata: Metadata = {
  title: "QR Code Generator - Create QR Codes Online Free",
  description: "Free online QR code generator. Create QR codes from text or URLs. Download as PNG. All processing happens in your browser.",
  alternates: { canonical: "https://free-toolkit.com/qr-code-generator" },
};

const meta = { title: "QR Code Generator", description: "Generate QR codes from text, URLs, or any data. Download as PNG image.", path: "/qr-code-generator" };

const faq = [
  { question: "What is a QR code?", answer: "A QR code (Quick Response code) is a two-dimensional barcode that can store text, URLs, contact information, WiFi credentials, and more. Smartphones can scan and decode QR codes using their built-in camera apps." },
  { question: "Is there a size limit for QR codes?", answer: "A standard QR code can store up to 2,953 bytes of text. For longer content, the QR code becomes more complex (larger grid). This tool generates 256×256 pixel QR codes suitable for most use cases." },
  { question: "Does the tool send my data to a server?", answer: "No. The QR code is generated entirely in your browser using a client-side library. Your text or URL is never transmitted to any server. The Download PNG button saves directly from your browser." },
];

export default function QrPage() {
  return (
    <ToolLayout meta={meta} faq={faq} seoContent={
      <div className="space-y-6">
        <h2>Free Online QR Code Generator</h2>
        <p>Create QR codes for URLs, text, WiFi credentials, contact information, and more. QR codes are generated entirely in your browser using a client-side library — your data is never sent to a server.</p>
      </div>
    }>
      <QrTool />
    </ToolLayout>
  );
}
