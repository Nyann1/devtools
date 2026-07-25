import type { Metadata } from "next";
import { ToolLayout } from "@/components/tool-layout";
import { RegexTool } from "./regex-tool";

export const metadata: Metadata = {
  title: "Regex Tester & Explainer - Test RegExp Online with Syntax Highlighting",
  description:
    "Free online regex tester with syntax highlighting, detailed explanation panel, quick reference cheat sheet, replace mode, live match previews, capture groups, and named groups. Supports all JavaScript regex flags. Client-side, no data upload.",
  alternates: { canonical: "https://free-toolkit.com/regex-tester" },
};

const meta = { title: "Regex Tester", description: "Test, explain, and debug regular expressions with syntax highlighting, explanation panel, quick reference, and live match preview.", path: "/regex-tester" };

const faq = [
  { question: "How do I test a regular expression?", answer: "Enter your regex pattern between the slashes (e.g., \\d{3}-\\d{4}), set your flags (g, i, m, s, u, y), and type or paste your test string. Matches are highlighted in green in real-time. The Match Details section breaks down each match with index position and capture groups." },
  { question: "How does the regex explanation panel work?", answer: "As you type your pattern, the Explanation panel on the right decomposes it into individual tokens — character classes, quantifiers, anchors, groups, and more. Each token shows a color-coded label and a plain-English description. Hover over any explanation row to highlight the matching token in the token bar below the pattern input, or hover a token to highlight its explanation." },
  { question: "Does the tool support regex replace mode?", answer: "Yes — toggle the Replace tab to enter replacement text. Use $1, $2, etc. to reference capture groups. A live preview shows the substituted result. Works with all flags and supports JavaScript's full replace semantics." },
  { question: "What reference material is available in the tool?", answer: "A built-in Quick Reference panel covers character classes (\\d, \\w, \\s), quantifiers (*, +, {n,m}), groups and lookaround ((?=), (?<!), named groups), anchors (^, $, \\b), alternation, and common shorthand examples like phone and email patterns. It's searchable so you can quickly find the syntax you need." },
];

export default function RegexPage() {
  return (
    <ToolLayout meta={meta} faq={faq} seoContent={
      <div className="space-y-6">
        <h2>Online Regex Tester &amp; Explainer</h2>
        <p>Write, test, and understand regular expressions with live visual feedback. The pattern input supports syntax highlighting: character classes appear in blue, quantifiers in green, anchors in red, groups in purple, and alternation in orange. A token bar below the input mirrors the breakdown, and hovering any token (or its matching explanation row) highlights both in yellow for quick cross-referencing.</p>
        <p>The right sidebar contains a detailed Explanation panel that translates each part of your regex into plain English, plus a searchable Quick Reference covering character classes, quantifiers, groups, lookaround assertions, anchors, and common shorthand patterns. Supports all JavaScript regex features: lookahead/lookbehind assertions, named groups, Unicode property escapes, and dotAll mode.</p>
        <p>Switch to Replace mode to test substitutions with $1/$2 backreferences and see a live preview. All processing happens locally in your browser — no data is ever uploaded to a server.</p>
      </div>
    }>
      <RegexTool />
    </ToolLayout>
  );
}
