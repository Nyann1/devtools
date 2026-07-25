"use client";

import { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { marked } from "marked";
import { toast } from "sonner";

const SAMPLE = `# Hello Markdown

## Features

- **Bold** and *italic* text
- [Links](https://example.com)
- \`inline code\`
- Code blocks with syntax highlighting

### Code Example

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

### Table

| Name | Value |
|------|-------|
| Foo  | 42    |
| Bar  | 100   |

> Blockquotes look like this.

1. Ordered lists
2. Second item
   - Nested item

---

Task list:
- [x] Done item
- [ ] Pending item

## A Longer Section for Two-Column Preview

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

### Subsection

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
in culpa qui officia deserunt mollit anim id est laborum.
`;

async function generatePdf(html: string, columns: 1 | 2) {
  const { default: html2pdf } = await import("html2pdf.js");
  const container = document.createElement("div");
  container.innerHTML = html;
  container.style.fontFamily = '"Times New Roman", Georgia, serif';
  container.style.fontSize = "12pt";
  container.style.lineHeight = "1.6";
  container.style.color = "#1a1a1a";
  container.style.padding = "1.5rem";

  if (columns === 2) {
    container.style.columnCount = "2";
    container.style.columnGap = "2rem";
    container.style.columnRule = "1px solid #e5e7eb";
  }

  const style = document.createElement("style");
  style.textContent = `
    h1 { font-size: 1.6rem; border-bottom: 2px solid #333; padding-bottom: 0.3rem; margin-top: 0; }
    h2 { font-size: 1.3rem; border-bottom: 1px solid #ccc; padding-bottom: 0.2rem; }
    h3 { font-size: 1.1rem; }
    pre { background: #f3f4f6; padding: 0.8rem; border-radius: 4px; font-size: 0.85rem; white-space: pre-wrap; }
    code { font-family: "Courier New", monospace; font-size: 0.9em; }
    table { border-collapse: collapse; width: 100%; margin: 1rem 0; }
    th, td { border: 1px solid #d1d5db; padding: 0.4rem 0.6rem; text-align: left; }
    th { background: #f3f4f6; }
    blockquote { border-left: 3px solid #d1d5db; padding-left: 1rem; color: #6b7280; margin-left: 0; }
    img { max-width: 100%; }
    ${columns === 2 ? `
    @page { size: A4; margin: 1.5cm; }
    ` : `
    @page { size: A4; margin: 2cm; }
    `}
  `;
  container.appendChild(style);

  const filename = columns === 2 ? "markdown-two-column.pdf" : "markdown.pdf";

  container.style.position = "absolute";
  container.style.left = "-9999px";
  container.style.top = "0";
  container.style.width = columns === 2 ? "210mm" : "190mm";
  container.style.background = "#fff";
  document.body.appendChild(container);

  await html2pdf().set({
    margin: columns === 2 ? [5, 5, 5, 5] : 10,
    filename,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  }).from(container).save();

  document.body.removeChild(container);
}

export function MarkdownTool() {
  const [input, setInput] = useState(SAMPLE);
  const [exporting, setExporting] = useState(false);

  const html = useMemo(() => {
    try {
      const result = marked.parse(input, { breaks: true, gfm: true });
      return typeof result === "string" ? result : "";
    } catch {
      return "<p class='text-destructive'>Render error</p>";
    }
  }, [input]);

  const copyHtml = useCallback(async () => {
    await navigator.clipboard.writeText(html);
    toast.success("HTML copied to clipboard");
  }, [html]);

  const handleExport = useCallback(
    async (columns: 1 | 2) => {
      if (!html) return;
      setExporting(true);
      try {
        await generatePdf(html, columns);
      } catch (e) {
        toast.error(`PDF export failed: ${(e as Error).message || String(e)}`);
      } finally {
        setExporting(false);
      }
    },
    [html],
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button onClick={copyHtml} variant="outline" size="sm">
          Copy HTML
        </Button>
        <Button onClick={() => handleExport(1)} variant="outline" size="sm" disabled={exporting}>
          {exporting ? "Exporting..." : "Download PDF"}
        </Button>
        <Button onClick={() => handleExport(2)} variant="outline" size="sm" disabled={exporting}>
          {exporting ? "Exporting..." : "Download PDF (Two Columns)"}
        </Button>
        <Button onClick={() => setInput("")} variant="ghost" size="sm">
          Clear
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1.5 block text-muted-foreground">
            Markdown
          </label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="font-mono text-sm min-h-[500px] resize-y"
            spellCheck={false}
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block text-muted-foreground">
            Preview
          </label>
          <div
            className="border rounded-lg p-4 min-h-[500px] prose prose-sm max-w-none dark:prose-invert overflow-auto"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </div>
  );
}
