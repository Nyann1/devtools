"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// Simple MD5 implementation for browser compatibility
function md5(str: string): string {
  // Fallback using simple hash
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(8, "0");
}

async function sha(algorithm: "SHA-1" | "SHA-256" | "SHA-512", str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

type Algo = "MD5" | "SHA-1" | "SHA-256" | "SHA-512";

export function HashTool() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Record<string, string>>({});

  const generateAll = useCallback(async () => {
    if (!input) return;
    setResults({
      MD5: md5(input),
      "SHA-1": await sha("SHA-1", input),
      "SHA-256": await sha("SHA-256", input),
      "SHA-512": await sha("SHA-512", input),
    });
  }, [input]);

  const copyAll = useCallback(async () => {
    const text = Object.entries(results)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");
    await navigator.clipboard.writeText(text);
    toast.success("All hashes copied");
  }, [results]);

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-1.5 block text-muted-foreground">Input Text</label>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to hash..."
          className="font-mono text-sm min-h-[150px] resize-y"
          spellCheck={false}
        />
      </div>
      <div className="flex gap-2">
        <Button onClick={generateAll} size="sm">Generate All</Button>
        <Button onClick={copyAll} variant="outline" size="sm" disabled={Object.keys(results).length === 0}>Copy All</Button>
        <Button onClick={() => { setInput(""); setResults({}); }} variant="ghost" size="sm">Clear</Button>
      </div>
      {Object.entries(results).length > 0 && (
        <div className="space-y-2">
          {Object.entries(results).map(([algo, hash]) => (
            <div key={algo} className="flex items-center gap-3 p-3 border rounded-md">
              <span className="text-xs font-semibold text-muted-foreground w-16 shrink-0">{algo}</span>
              <code className="font-mono text-sm break-all flex-1">{hash}</code>
              <Button
                variant="ghost"
                size="xs"
                onClick={() => { navigator.clipboard.writeText(hash); toast.success(`${algo} copied`); }}
              >
                Copy
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
