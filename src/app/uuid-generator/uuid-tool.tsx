"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

function generateUUIDv4(): string {
  return crypto.randomUUID();
}

function generateUUIDv7(): string {
  const timestamp = Date.now();
  const uuid = crypto.randomUUID();
  // Create a UUIDv7-like format: timestamp prefix + random suffix
  const tsHex = timestamp.toString(16).padStart(12, "0");
  const rest = uuid.slice(12);
  const v7 = tsHex.slice(0, 8) + "-" + tsHex.slice(8, 12) + "-7" + rest.slice(13);
  return v7;
}

export function UuidTool() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>([]);
  const [mode, setMode] = useState<"v4" | "v7">("v4");

  const generate = useCallback(() => {
    const countNum = Math.min(Math.max(count || 1, 1), 100);
    const newUuids: string[] = [];
    for (let i = 0; i < countNum; i++) {
      newUuids.push(mode === "v4" ? generateUUIDv4() : generateUUIDv7());
    }
    setUuids(newUuids);
  }, [count, mode]);

  const copyAll = useCallback(async () => {
    await navigator.clipboard.writeText(uuids.join("\n"));
    toast.success(`${uuids.length} UUIDs copied`);
  }, [uuids]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <label className="text-sm font-medium mb-1 block text-muted-foreground">Version</label>
          <div className="flex border rounded-md overflow-hidden">
            <button
              onClick={() => setMode("v4")}
              className={`px-3 py-1.5 text-sm font-mono transition-colors ${mode === "v4" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"}`}
            >
              v4 (Random)
            </button>
            <button
              onClick={() => setMode("v7")}
              className={`px-3 py-1.5 text-sm font-mono transition-colors ${mode === "v7" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"}`}
            >
              v7 (Time-based)
            </button>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block text-muted-foreground">Count</label>
          <Input type="number" min={1} max={100} value={count}
            onChange={(e) => setCount(parseInt(e.target.value) || 1)}
            className="w-20" />
        </div>
        <Button onClick={generate} size="sm">Generate</Button>
        {uuids.length > 0 && (
          <Button onClick={copyAll} variant="outline" size="sm">Copy All</Button>
        )}
      </div>
      {uuids.length > 0 && (
        <div className="space-y-1 p-4 border rounded-lg bg-muted/20 font-mono text-sm">
          {uuids.map((uuid, i) => (
            <div key={i} className="group flex items-center justify-between hover:bg-muted/50 rounded px-2 py-1">
              <code>{uuid}</code>
              <Button
                variant="ghost"
                size="xs"
                className="opacity-0 group-hover:opacity-100"
                onClick={() => { navigator.clipboard.writeText(uuid); toast.success("UUID copied"); }}
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
