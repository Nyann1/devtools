import type { Metadata } from "next";
import { ToolLayout } from "@/components/tool-layout";
import { RegexTool } from "./regex-tool";

export const metadata: Metadata = {
  title: "Regex Tester - Test RegExp Online with Match Highlights & Groups",
  description:
    "Free online regex tester with real-time matching, capture groups, named groups, and highlighted matches. Supports all JavaScript regex flags. All local processing.",
  alternates: { canonical: "https://free-toolkit.com/regex-tester" },
};

const meta = { title: "Regex Tester", description: "Test regular expressions with live match highlighting, capture groups, named groups, and regex flags.", path: "/regex-tester" };

const faq = [
  { question: "How do I test a regular expression?", answer: "Enter your regex pattern between the slashes (e.g., \\d{3}-\\d{4}), set your flags (g, i, m, s, u, y), and type or paste your test string. Matches are highlighted in green in real-time. The Match Details section breaks down each match with index position and capture groups." },
  { question: "What do capture groups show?", answer: "When your regex has parentheses groups like (\\d{3})-(\\d{4}), the Match Details section shows each captured group ($1, $2, etc.) with their values. Named groups like (?<area>\\d{3}) also appear with their group names." },
  { question: "What regex flags does this tool support?", answer: "All JavaScript RegExp flags: g (global — all matches), i (case-insensitive), m (multiline — ^ and $ match line boundaries), s (dotAll — . matches newlines), u (Unicode), and y (sticky). Enter flags in the text field after the closing slash." },
];

export default function RegexPage() {
  return (
    <ToolLayout meta={meta} faq={faq} seoContent={
      <div className="space-y-6">
        <h2>Online Regex Tester</h2>
        <p>Write and test regular expressions with live feedback. Matches highlight in green directly in your test string. See each match's index position, full text, and individual capture groups (both numbered and named). Supports all JavaScript regex features: lookahead/lookbehind assertions, named groups, Unicode property escapes, and dotAll mode.</p>
      </div>
    }>
      <RegexTool />
    </ToolLayout>
  );
}
