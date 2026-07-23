"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export function UrlTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const process = useCallback(() => {
    if (!input.trim()) { setOutput(""); return; }
    try {
      setOutput(
        mode === "encode"
          ? encodeURIComponent(input)
          : decodeURIComponent(input)
      );
    } catch {
      setOutput("Decoding failed. Check for malformed percent-encoding.");
    }
  }, [input, mode]);

  const swapMode = useCallback(() => {
    setMode(mode === "encode" ? "decode" : "encode");
    setInput(output);
    setOutput("");
  }, [mode, output]);

  const copyOutput = useCallback(async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard");
  }, [output]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Tabs value={mode} onValueChange={(v) => { setMode(v as "encode" | "decode"); setOutput(""); }}>
          <TabsList>
            <TabsTrigger value="encode">Encode</TabsTrigger>
            <TabsTrigger value="decode">Decode</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button onClick={process} size="sm">{mode === "encode" ? "Encode" : "Decode"}</Button>
        <Button onClick={swapMode} variant="outline" size="sm">Swap</Button>
        <Button onClick={copyOutput} variant="outline" size="sm" disabled={!output}>Copy</Button>
        <Button onClick={() => { setInput(""); setOutput(""); }} variant="ghost" size="sm">Clear</Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1.5 block text-muted-foreground">
            {mode === "encode" ? "Text to Encode" : "URL to Decode"}
          </label>
          <Textarea value={input} onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "encode" ? "Enter text or URL..." : "Paste URL-encoded string..."}
            className="font-mono text-sm min-h-[400px] resize-y" spellCheck={false} />
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block text-muted-foreground">Output</label>
          <Textarea value={output} readOnly placeholder="Result..." className="font-mono text-sm min-h-[400px] resize-y bg-muted/30" spellCheck={false} />
        </div>
      </div>
    </div>
  );
}
