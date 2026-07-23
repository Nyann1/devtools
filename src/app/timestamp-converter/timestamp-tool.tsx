"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function TimestampTool() {
  const now = Math.floor(Date.now() / 1000);
  const [timestamp, setTimestamp] = useState(now.toString());
  const [dateStr, setDateStr] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const toDate = useCallback(() => {
    const ts = parseInt(timestamp);
    if (isNaN(ts)) { setResult("Invalid timestamp"); return; }
    const ms = ts > 99999999999 ? ts : ts * 1000;
    const d = new Date(ms);
    setResult(
      `UTC:   ${d.toUTCString()}\nLocal: ${d.toLocaleString()}\nISO:   ${d.toISOString()}`
    );
  }, [timestamp]);

  const toTimestamp = useCallback(() => {
    if (!dateStr) return;
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) { setResult("Invalid date string"); return; }
    const sec = Math.floor(d.getTime() / 1000);
    const ms = d.getTime();
    setResult(`Seconds:      ${sec}\nMilliseconds: ${ms}\nISO 8601:     ${d.toISOString()}`);
  }, [dateStr]);

  const setNow = useCallback(() => {
    const ts = Math.floor(Date.now() / 1000).toString();
    setTimestamp(ts);
  }, []);

  const copyResult = useCallback(async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    toast.success("Copied to clipboard");
  }, [result]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3 p-4 border rounded-lg">
          <h3 className="font-semibold">Timestamp → Date</h3>
          <div className="flex gap-2">
            <Input
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              placeholder="Unix timestamp (seconds or ms)"
              className="font-mono"
            />
            <Button onClick={toDate} size="sm">Convert</Button>
          </div>
          <Button onClick={setNow} variant="outline" size="sm">
            Use Current Time
          </Button>
          <p className="text-xs text-muted-foreground mt-1">
            Current: {now} ({new Date().toUTCString()})
          </p>
        </div>
        <div className="space-y-3 p-4 border rounded-lg">
          <h3 className="font-semibold">Date → Timestamp</h3>
          <div className="flex gap-2">
            <Input
              value={dateStr}
              onChange={(e) => setDateStr(e.target.value)}
              placeholder="Date string (any format)"
              className="font-mono"
            />
            <Button onClick={toTimestamp} size="sm">Convert</Button>
          </div>
          <Button
            onClick={() => setDateStr(new Date().toISOString().slice(0, 19))}
            variant="outline"
            size="sm"
          >
            Use Current DateTime
          </Button>
        </div>
      </div>
      {result && (
        <div className="relative">
          <label className="text-sm font-medium mb-1.5 block text-muted-foreground">Result</label>
          <pre className="p-4 rounded-lg border bg-muted/30 font-mono text-sm whitespace-pre-wrap">{result}</pre>
          <Button onClick={copyResult} variant="secondary" size="sm" className="absolute top-8 right-2">Copy</Button>
        </div>
      )}
    </div>
  );
}
