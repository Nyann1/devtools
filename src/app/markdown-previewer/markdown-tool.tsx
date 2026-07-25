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

function openPrintWindow(html: string, columns: 1 | 2) {
  const w = window.open("", "_blank", "width=800,height=600");
  if (!w) {
    toast.error("Pop-up blocked. Please allow pop-ups for this site.");
    return;
  }

  w.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: "Times New Roman", Georgia, serif;
      font-size: 12pt;
      line-height: 1.6;
      color: #1a1a1a;
      padding: 1.5rem;
    }
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
    ${columns === 2 ? "body { column-count: 2; column-gap: 2rem; column-rule: 1px solid #e5e7eb; }" : ""}
    @media print {
      body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
      @page { size: A4; margin: ${columns === 2 ? "1.5cm" : "2cm"}; }
    }
  </style>
</head>
<body>${html}</body>
</html>`);
  w.document.close();
  w.focus();
  w.print();
}

export function MarkdownTool() {
  const [input, setInput] = useState(SAMPLE);

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

  const handlePrint = useCallback(
    (columns: 1 | 2) => {
      if (!html) return;
      openPrintWindow(html, columns);
    },
    [html],
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={copyHtml} variant="outline" size="sm">
          Copy HTML
        </Button>
        <Button onClick={() => handlePrint(1)} variant="outline" size="sm">
          Export PDF (Single)
        </Button>
        <Button onClick={() => handlePrint(2)} variant="outline" size="sm">
          Export PDF (Two Columns)
        </Button>
        <span className="text-xs text-muted-foreground ml-1">
          Choose "Save as PDF" in the print dialog
        </span>
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
