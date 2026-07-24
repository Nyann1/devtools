import type { Metadata } from "next";
import { ToolLayout } from "@/components/tool-layout";
import { MarkdownTool } from "./markdown-tool";

export const metadata: Metadata = {
  title: "Markdown Previewer - Online Markdown Editor & Preview",
  description: "Free online Markdown editor and previewer. Write and preview GitHub-flavored Markdown in real-time. All processing happens in your browser.",
  alternates: { canonical: "https://free-toolkit.com/markdown-previewer" },
};

const meta = { title: "Markdown Previewer", description: "Write Markdown and see a live preview rendered in real-time.", path: "/markdown-previewer" };

const faq = [
  { question: "What is Markdown?", answer: "Markdown is a lightweight markup language that uses plain text formatting syntax. Created by John Gruber in 2004, it's designed to be easy to read and write, then converted to HTML. It's widely used for README files, documentation, and blogging." },
  { question: "What is GitHub-flavored Markdown (GFM)?", answer: "GFM extends standard Markdown with tables, task lists, strikethrough, auto-linked URLs, and fenced code blocks with syntax highlighting. This previewer uses the marked library with GFM enabled to match GitHub's rendering." },
  { question: "Can I copy the rendered HTML?", answer: "Yes. Click the Copy HTML button to copy the full rendered HTML output to your clipboard. All rendering is done locally in your browser using the marked library." },
];

export default function MarkdownPage() {
  return (
    <ToolLayout meta={meta} faq={faq} seoContent={
      <div className="space-y-6">
        <h2>Online Markdown Editor & Previewer</h2>
        <p>Write Markdown text on the left and see the rendered HTML preview on the right in real-time. Supports GitHub-flavored Markdown including tables, code blocks, task lists, and strikethrough.</p>
      </div>
    }>
      <MarkdownTool />
    </ToolLayout>
  );
}
