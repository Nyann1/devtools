"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const process = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      return;
    }
    try {
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        const cleaned = input.replace(/\s/g, "");
        setOutput(decodeURIComponent(escape(atob(cleaned))));
      }
      setError(null);
    } catch (e) {
      setError(
        mode === "decode"
          ? "Invalid Base64 string. Please check your input."
          : "Encoding failed. Please check your input."
      );
      setOutput("");
    }
  }, [input, mode]);

  const swapMode = useCallback(() => {
    setMode(mode === "encode" ? "decode" : "encode");
    setInput(output);
    setOutput("");
    setError(null);
  }, [mode, output]);

  const copyOutput = useCallback(async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard");
  }, [output]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Tabs
          value={mode}
          onValueChange={(v) => {
            setMode(v as "encode" | "decode");
            setOutput("");
            setError(null);
          }}
        >
          <TabsList>
            <TabsTrigger value="encode">Encode</TabsTrigger>
            <TabsTrigger value="decode">Decode</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button onClick={process} size="sm">
          {mode === "encode" ? "Encode" : "Decode"}
        </Button>
        <Button onClick={swapMode} variant="outline" size="sm">
          Swap
        </Button>
        <Button onClick={copyOutput} variant="outline" size="sm" disabled={!output}>
          Copy Result
        </Button>
        <Button
          onClick={() => { setInput(""); setOutput(""); setError(null); }}
          variant="ghost"
          size="sm"
        >
          Clear
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1.5 block text-muted-foreground">
            {mode === "encode" ? "Text to Encode" : "Base64 to Decode"}
          </label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === "encode"
                ? "Enter text to encode..."
                : "Paste Base64 string..."
            }
            className="font-mono text-sm min-h-[400px] resize-y"
            spellCheck={false}
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block text-muted-foreground">
            {mode === "encode" ? "Base64 Output" : "Decoded Text"}
          </label>
          <Textarea
            value={output}
            readOnly
            placeholder="Result will appear here..."
            className="font-mono text-sm min-h-[400px] resize-y bg-muted/30"
            spellCheck={false}
          />
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-destructive/10 border border-destructive/30 p-4">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}
    </div>
  );
}
