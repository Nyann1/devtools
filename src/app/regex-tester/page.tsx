import type { Metadata } from "next";
import { ToolLayout } from "@/components/tool-layout";
import { RegexTool } from "./regex-tool";

export const metadata: Metadata = {
  title: "Regex Tester - Test Regular Expressions Online Free",
  description: "Free online regex tester. Test regular expressions with real-time matching, capture groups, and flags. All processing happens in your browser.",
  alternates: { canonical: "https://free-toolkit.com/regex-tester" },
};

const meta = { title: "Regex Tester", description: "Test and debug regular expressions with live match results and capture groups.", path: "/regex-tester" };

const faq = [
  { question: "What is a regular expression (regex)?", answer: "A regular expression is a sequence of characters that defines a search pattern. Regex is used for pattern matching in text — finding, validating, or replacing strings based on patterns rather than exact matches." },
  { question: "What regex flags are supported?", answer: "This tool supports all JavaScript regex flags: g (global — find all matches), i (case-insensitive), m (multiline), s (dotAll — dot matches newlines), u (Unicode), and y (sticky). Enter flags in the flags input field." },
  { question: "Can I test capture groups?", answer: "Yes. The Match Details section shows capture groups for each match, both numbered ($1, $2, etc.) and named groups. Highlighted matches appear in green directly in the test string." },
];

export default function RegexPage() {
  return (
    <ToolLayout meta={meta} faq={faq} seoContent={
      <div className="space-y-6">
        <h2>Online Regex Tester</h2>
        <p>Test your regular expressions against sample text and see matches, groups, and flags in real-time. Supports all JavaScript regex features including lookahead, lookbehind, named groups, and Unicode.</p>
      </div>
    }>
      <RegexTool />
    </ToolLayout>
  );
}
