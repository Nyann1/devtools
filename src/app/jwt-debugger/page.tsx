import type { Metadata } from "next";
import { ToolLayout } from "@/components/tool-layout";
import { JwtTool } from "./jwt-tool";

export const metadata: Metadata = {
  title: "JWT Debugger - Decode JWT Header, Payload & Check Expiry Online",
  description:
    "Free online JWT debugger. Decode JWT tokens to inspect header, payload claims, and signature. Shows token expiry status. All decoding happens in your browser.",
  alternates: { canonical: "https://free-toolkit.com/jwt-debugger" },
};

const meta = { title: "JWT Debugger", description: "Paste a JWT token to decode and inspect header, payload claims, expiry status, and signature preview.", path: "/jwt-debugger" };

const faq = [
  { question: "How do I decode a JWT token?", answer: "Paste your JWT (the long Base64 string starting with eyJ...) into the input field. The tool automatically decodes the header and payload sections — no click needed. It shows the algorithm (e.g., HS256, RS256), token type, and all claims in the payload." },
  { question: "How do I check if my JWT has expired?", answer: "The tool reads the exp (expiration) claim from the payload and shows whether the token is still valid, expired, or about to expire. Expired tokens are highlighted in red with the expiration date. Valid tokens show remaining time in green." },
  { question: "Is it safe to paste real JWTs into this tool?", answer: "All decoding happens in your browser — the token is never transmitted to any server. However, JWTs often contain sensitive user data. Never share tokens publicly. Always treat decoded token contents as confidential." },
];

export default function JwtPage() {
  return (
    <ToolLayout meta={meta} faq={faq} seoContent={
      <div className="space-y-6">
        <h2>JWT Debugger & Decoder</h2>
        <p>Decode and inspect JSON Web Tokens. View the header (algorithm, token type), payload (claims, expiry, issuer, subject), and a signature preview. The tool highlights expiry status — valid, nearing expiry, or expired — with color coding. Token processing stays entirely in your browser.</p>
      </div>
    }>
      <JwtTool />
    </ToolLayout>
  );
}
