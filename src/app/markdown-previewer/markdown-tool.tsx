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
`;

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

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button onClick={copyHtml} variant="outline" size="sm">
          Copy HTML
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
