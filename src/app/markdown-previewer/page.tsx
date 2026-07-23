import type { Metadata } from "next";
import { ToolLayout } from "@/components/tool-layout";
import { MarkdownTool } from "./markdown-tool";

export const metadata: Metadata = {
  title: "Markdown Previewer - Online Markdown Editor & Preview",
  description: "Free online Markdown editor and previewer. Write and preview GitHub-flavored Markdown in real-time. All processing happens in your browser.",
};

export default function MarkdownPage() {
  return (
    <ToolLayout
      meta={{ title: "Markdown Previewer", description: "Write Markdown and see a live preview rendered in real-time." }}
      seoContent={
        <div className="space-y-6">
          <h2>Online Markdown Editor & Previewer</h2>
          <p>Write Markdown text on the left and see the rendered HTML preview on the right in real-time. Supports GitHub-flavored Markdown including tables, code blocks, task lists, and strikethrough.</p>
        </div>
      }
    >
      <MarkdownTool />
    </ToolLayout>
  );
}
