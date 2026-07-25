import type { Metadata } from "next";
import { ToolLayout } from "@/components/tool-layout";
import { MarkdownTool } from "./markdown-tool";

export const metadata: Metadata = {
  title: "Markdown Previewer - Live Editor & Two-Column PDF Export",
  description:
    "Free online Markdown editor with live preview, GitHub-flavored Markdown support, and PDF export with single or two-column layout. Write and preview Markdown in real-time.",
  alternates: { canonical: "https://free-toolkit.com/markdown-previewer" },
};

const meta = { title: "Markdown Previewer & PDF Export", description: "Write Markdown, see a live preview, and export as single or two-column PDF — perfect for papers and notes.", path: "/markdown-previewer" };

const faq = [
  { question: "What is Markdown?", answer: "Markdown is a lightweight markup language that uses plain text formatting syntax. Created by John Gruber in 2004, it is widely used for README files, documentation, blogging, and note-taking. This tool renders GitHub-flavored Markdown with tables, code blocks, and task lists." },
  { question: "How do I export Markdown as a PDF?", answer: "Click 'Export PDF (Single)' for standard one-column layout, or 'Export PDF (Two Columns)' for a paper-style two-column layout. A new window opens with the rendered HTML and the print dialog — choose 'Save as PDF' in your browser's print settings." },
  { question: "What does the two-column PDF export look like?", answer: "The two-column layout mimics academic papers and exercise book formatting using CSS columns. Content flows naturally across two columns with a separator line, using Times New Roman 12pt for a professional print appearance." },
];

export default function MarkdownPage() {
  return (
    <ToolLayout meta={meta} faq={faq} seoContent={
      <div className="space-y-6">
        <h2>Online Markdown Editor with Two-Column PDF Export</h2>
        <p>Write Markdown text on the left and see the rendered HTML preview on the right in real-time. Supports GitHub-flavored Markdown including tables, fenced code blocks with syntax highlighting, task lists, strikethrough, and blockquotes.</p>
        <h3>PDF Export — Single & Two-Column Layouts</h3>
        <p>Unlike most Markdown tools that only offer basic single-column export, this previewer supports <strong>two-column PDF export</strong> ideal for academic paper drafts, study notes, and exercise worksheets. Click the export button, choose your layout, and save as PDF from the print dialog. All rendering happens locally in your browser.</p>
        <h3>Features</h3>
        <ul>
          <li>Live preview as you type — no refresh needed</li>
          <li>GitHub-flavored Markdown: tables, task lists, strikethrough</li>
          <li>Fenced code blocks with language labels</li>
          <li>Single-column and two-column PDF export</li>
          <li>Copy rendered HTML to clipboard</li>
          <li>Pre-loaded with sample content</li>
        </ul>
      </div>
    }>
      <MarkdownTool />
    </ToolLayout>
  );
}
