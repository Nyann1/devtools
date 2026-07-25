import type { Metadata } from "next";
import { ToolLayout } from "@/components/tool-layout";
import { QrTool } from "./qr-tool";

export const metadata: Metadata = {
  title: "QR Code Generator - Create QR Codes from Text & URLs, Download PNG",
  description:
    "Free online QR code generator. Create QR codes from text, URLs, or any data. Download as PNG image. Error correction level M. All generation happens in your browser.",
  alternates: { canonical: "https://free-toolkit.com/qr-code-generator" },
};

const meta = { title: "QR Code Generator", description: "Generate QR codes from text, URLs, WiFi credentials, or any data — download as PNG.", path: "/qr-code-generator" };

const faq = [
  { question: "How do I create a QR code from a URL?", answer: "Type or paste your URL into the input field. The QR code appears automatically (with a 300ms debounce to avoid excessive regeneration). Click 'Download PNG' to save the 256×256 pixel QR code image to your device." },
  { question: "What can QR codes store?", answer: "QR codes can encode URLs, plain text, contact information (vCards), WiFi credentials, email addresses, phone numbers, and SMS messages. This tool encodes any text you enter — use standard vCard or WiFi formats for specialized QR uses." },
  { question: "How does QR code error correction work?", answer: "This generator uses error correction level M, meaning the QR code can still be scanned even if up to 15% of the code is damaged or obscured. QR codes are generated entirely in your browser using the qrcode library — your data is never sent to any server." },
];

export default function QrPage() {
  return (
    <ToolLayout meta={meta} faq={faq} seoContent={
      <div className="space-y-6">
        <h2>Free Online QR Code Generator</h2>
        <p>Create scannable QR codes for URLs, text, contact information, WiFi networks, and more. The QR code updates as you type with a smooth debounce. Download as a 256×256 PNG image. Error correction level M ensures reliable scanning even with partial damage. Generated locally in your browser — your data never leaves your device.</p>
      </div>
    }>
      <QrTool />
    </ToolLayout>
  );
}
