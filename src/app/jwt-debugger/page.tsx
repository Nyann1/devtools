import type { Metadata } from "next";
import { ToolLayout } from "@/components/tool-layout";
import { JwtTool } from "./jwt-tool";

export const metadata: Metadata = {
  title: "JWT Debugger - Decode and Inspect JSON Web Tokens",
  description: "Free online JWT debugger. Decode and inspect JWT header, payload, and signature. All processing happens in your browser.",
};

export default function JwtPage() {
  return (
    <ToolLayout
      meta={{ title: "JWT Debugger", description: "Decode and inspect JWT tokens to view header and payload contents." }}
      seoContent={
        <div className="space-y-6">
          <h2>JWT Debugger & Decoder</h2>
          <p>JSON Web Tokens (JWT) are used for secure information exchange. This tool decodes the header and payload of a JWT token for inspection. The token is processed entirely in your browser — it is never sent to any server.</p>
        </div>
      }
    >
      <JwtTool />
    </ToolLayout>
  );
}
