import type { Metadata } from "next";
import { ToolLayout } from "@/components/tool-layout";
import { RegexTool } from "./regex-tool";

export const metadata: Metadata = {
  title: "Regex Tester - Test Regular Expressions Online",
  description: "Free online regex tester. Test regular expressions with real-time matching, groups, and flags. All processing happens in your browser.",
};

export default function RegexPage() {
  return (
    <ToolLayout
      meta={{ title: "Regex Tester", description: "Test and debug regular expressions with live match results and capture groups." }}
      seoContent={
        <div className="space-y-6">
          <h2>Online Regex Tester</h2>
          <p>Test your regular expressions against sample text and see matches, groups, and flags in real-time. Supports all JavaScript regex features including lookahead, lookbehind, named groups, and Unicode.</p>
        </div>
      }
    >
      <RegexTool />
    </ToolLayout>
  );
}
