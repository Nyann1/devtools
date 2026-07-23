"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const SAMPLE = JSON.stringify(
  {
    users: [
      {
        id: 1,
        name: "Alice Chen",
        email: "alice@example.com",
        role: "admin",
        permissions: ["read", "write", "delete"],
        metadata: { department: "Engineering", level: "L5", joined: "2023-03-15" },
      },
      {
        id: 2,
        name: "Bob Smith",
        email: "bob@example.com",
        role: "editor",
        permissions: ["read", "write"],
        metadata: { department: "Design", level: "L4", joined: "2024-01-10" },
      },
      {
        id: 3,
        name: "Carol Wang",
        email: "carol@example.com",
        role: "viewer",
        permissions: ["read"],
        metadata: { department: "Marketing", level: "L3", joined: "2024-06-20" },
      },
    ],
    pagination: { page: 1, perPage: 20, total: 3, totalPages: 1 },
    _links: { self: "/api/v1/users?page=1", next: null, prev: null },
  },
  null,
  2,
);

export function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const format = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (e) {
      setError((e as SyntaxError).message);
      setOutput("");
    }
  }, [input]);

  const minify = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError(null);
    } catch (e) {
      setError((e as SyntaxError).message);
      setOutput("");
    }
  }, [input]);

  const validate = useCallback(() => {
    if (!input.trim()) {
      setError(null);
      toast.info("Enter JSON data to validate");
      return;
    }
    try {
      JSON.parse(input);
      setError(null);
      toast.success("Valid JSON");
    } catch (e) {
      setError((e as SyntaxError).message);
      toast.error("Invalid JSON");
    }
  }, [input]);

  const copyOutput = useCallback(async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard");
  }, [output]);

  const clear = useCallback(() => {
    setInput("");
    setOutput("");
    setError(null);
  }, []);

  const escape = useCallback(() => {
    if (!input.trim()) return;
    setOutput(JSON.stringify(input));
    setError(null);
  }, [input]);

  const unescape = useCallback(() => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setOutput(typeof parsed === "string" ? parsed : JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (e) {
      setError((e as SyntaxError).message);
    }
  }, [input]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={format} size="sm">
          Format
        </Button>
        <Button onClick={minify} variant="outline" size="sm">
          Minify
        </Button>
        <Button onClick={validate} variant="outline" size="sm">
          Validate
        </Button>
        <Button onClick={escape} variant="outline" size="sm">
          Escape
        </Button>
        <Button onClick={unescape} variant="outline" size="sm">
          Unescape
        </Button>
        <Button onClick={copyOutput} variant="outline" size="sm" disabled={!output}>
          Copy Result
        </Button>
        <Button onClick={() => { setInput(SAMPLE); setOutput(""); setError(null); }} variant="outline" size="sm">
          Load Sample
        </Button>
        <Button onClick={clear} variant="ghost" size="sm">
          Clear
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1.5 block text-muted-foreground">
            Input
          </label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Paste your JSON here... e.g. {"name":"John","age":30}'
            className="font-mono text-sm min-h-[400px] resize-y"
            spellCheck={false}
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block text-muted-foreground">
            Output
          </label>
          <div className="relative">
            <Textarea
              value={output}
              readOnly
              placeholder="Formatted JSON will appear here..."
              className="font-mono text-sm min-h-[400px] resize-y bg-muted/30"
              spellCheck={false}
            />
            {output && (
              <Button
                onClick={copyOutput}
                variant="secondary"
                size="sm"
                className="absolute top-2 right-2"
              >
                Copy
              </Button>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-destructive/10 border border-destructive/30 p-4">
          <p className="text-sm font-medium text-destructive mb-1">
            JSON Parse Error
          </p>
          <p className="text-sm font-mono text-destructive/80 break-all">
            {error}
          </p>
        </div>
      )}

      {output && (
        <div className="text-sm text-muted-foreground">
          {(() => {
            try {
              const parsed = JSON.parse(output);
              const count = typeof parsed === "object" && parsed !== null
                ? Object.keys(parsed).length
                : 0;
              const size = new Blob([output]).size;
              const formatted = new Blob([JSON.stringify(parsed, null, 2)]).size;
              return (
                <span>
                  {count > 0 && `${count} keys · `}
                  {formatted > 1024
                    ? `${(formatted / 1024).toFixed(1)} KB`
                    : `${formatted} B`}{" "}
                  formatted
                  {size !== formatted &&
                    ` · ${size > 1024 ? `${(size / 1024).toFixed(1)} KB` : `${size} B`} minified`}
                </span>
              );
            } catch {
              return null;
            }
          })()}
        </div>
      )}
    </div>
  );
}
