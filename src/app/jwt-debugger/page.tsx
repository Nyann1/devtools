import type { Metadata } from "next";
import { ToolLayout } from "@/components/tool-layout";
import { JwtTool } from "./jwt-tool";

export const metadata: Metadata = {
  title: "JWT Debugger - Decode and Inspect JSON Web Tokens Online",
  description: "Free online JWT debugger. Decode and inspect JWT header, payload, and signature. All processing happens in your browser.",
  alternates: { canonical: "https://free-toolkit.com/jwt-debugger" },
};

const meta = { title: "JWT Debugger", description: "Decode and inspect JWT tokens to view header and payload contents.", path: "/jwt-debugger" };

const faq = [
  { question: "What is a JWT token?", answer: "JSON Web Token (JWT) is a compact, URL-safe way to represent claims between two parties. It consists of three Base64-encoded parts separated by dots: header, payload, and signature. JWTs are widely used for authentication and authorization." },
  { question: "Is it safe to paste my JWT into an online tool?", answer: "This tool processes your JWT entirely in your browser — the token is never sent to any server. However, JWTs often contain sensitive data, so be cautious about where you paste them even with client-side tools." },
  { question: "What can I see with this debugger?", answer: "The tool decodes the header (algorithm and token type) and payload (claims like subject, issuer, expiration). It also shows whether the token has expired and displays a truncated preview of the signature." },
];

export default function JwtPage() {
  return (
    <ToolLayout meta={meta} faq={faq} seoContent={
      <div className="space-y-6">
        <h2>JWT Debugger & Decoder</h2>
        <p>JSON Web Tokens (JWT) are used for secure information exchange. This tool decodes the header and payload of a JWT token for inspection. The token is processed entirely in your browser.</p>
      </div>
    }>
      <JwtTool />
    </ToolLayout>
  );
}
