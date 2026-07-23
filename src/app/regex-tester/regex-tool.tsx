"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type RegexResult =
  | { type: "error"; message: string }
  | { type: "matches"; count: number; parts: string[]; matches: Array<{ full: string; groups: string[]; index: number; namedGroups: Record<string, string> }> }
  | { type: "none" };

export function RegexTool() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("");

  const result = useMemo((): RegexResult | null => {
    if (!pattern || !text) return null;
    let regex: RegExp;
    try {
      regex = new RegExp(pattern, flags);
    } catch {
      return { type: "error", message: "Invalid regular expression" };
    }
    const matches = [...text.matchAll(regex)];
    if (matches.length === 0) return { type: "none" };
    const highlighted = text.replace(regex, (match) => `\x00${match}\x01`);
    const parts = highlighted.split(/(\x00.*?\x01)/);
    return {
      type: "matches",
      matches: matches.map((m) => ({
        full: m[0],
        groups: m.slice(1),
        index: m.index ?? 0,
        namedGroups: (m.groups ?? {}) as Record<string, string>,
      })),
      count: matches.length,
      parts,
    };
  }, [pattern, flags, text]);

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="text-sm font-medium mb-1 block text-muted-foreground">Pattern</label>
            <div className="flex gap-2">
              <span className="flex items-center px-2 border rounded-md bg-muted font-mono text-muted-foreground">/</span>
              <Input value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="Regular expression" className="font-mono flex-1" />
              <span className="flex items-center px-2 border rounded-md bg-muted font-mono text-muted-foreground">/</span>
              <Input value={flags} onChange={(e) => setFlags(e.target.value)} placeholder="g" className="font-mono w-20" />
            </div>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block text-muted-foreground">Test String</label>
          <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text to test against..." className="font-mono text-sm min-h-[200px] resize-y" spellCheck={false} />
        </div>
      </div>

      {result && (
        <div className="space-y-4">
          {result.type === "error" && (
            <div className="rounded-md bg-destructive/10 border border-destructive/30 p-4">
              <p className="text-sm text-destructive font-mono">{result.message}</p>
            </div>
          )}
          {result.type === "none" && (
            <p className="text-sm text-muted-foreground">No matches found</p>
          )}
          {result.type === "matches" && (
            <>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-muted-foreground">{result.count} match{result.count !== 1 ? "es" : ""} found</span>
              </div>
              <div className="p-4 border rounded-lg bg-muted/10 font-mono text-sm whitespace-pre-wrap">
                {result.parts.map((part, i) =>
                  part.startsWith("\x00") ? (
                    <mark key={i} className="bg-emerald-200 dark:bg-emerald-800 rounded px-0.5">{part.slice(1, -1)}</mark>
                  ) : (
                    <span key={i}>{part}</span>
                  )
                )}
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold">Match Details</h3>
                {result.matches.map((m, i) => (
                  <div key={i} className="p-3 border rounded-md font-mono text-sm">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <span>Match {i + 1}</span>
                      <span>at index {m.index}</span>
                    </div>
                    <code>{m.full}</code>
                    {m.groups.length > 0 && (
                      <div className="mt-1 text-xs text-muted-foreground">
                        Groups: {m.groups.map((g, j) => (
                          <code key={j} className="mr-2 bg-muted px-1 rounded">${j + 1}: {g ?? "(undefined)"}</code>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
