"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface JwtParts {
  header: unknown;
  payload: unknown;
  signature: string;
}

function decodeJwt(token: string): JwtParts | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    const decode = (s: string) =>
      JSON.parse(decodeURIComponent(escape(atob(s.replace(/-/g, "+").replace(/_/g, "/")))));
    return {
      header: decode(parts[0]),
      payload: decode(parts[1]),
      signature: parts[2],
    };
  } catch {
    return null;
  }
}

export function JwtTool() {
  const [token, setToken] = useState("");
  const [result, setResult] = useState<JwtParts | null>(null);
  const [error, setError] = useState<string | null>(null);

  const decode = useCallback(() => {
    if (!token.trim()) return;
    const parts = token.trim().split(".");
    if (parts.length !== 3) {
      setError("Invalid JWT format. Token must have three parts: header.payload.signature");
      setResult(null);
      return;
    }
    if (parts[0].length === 0 || parts[1].length === 0 || parts[2].length === 0) {
      setError("Invalid JWT: one or more parts are empty");
      setResult(null);
      return;
    }
    const decoded = decodeJwt(token.trim());
    if (!decoded) {
      setError("Failed to decode JWT. The token may be malformed or encoded incorrectly.");
      setResult(null);
      return;
    }
    setResult(decoded);
    setError(null);
  }, [token]);

  const getExpiryStatus = useCallback(() => {
    if (!result) return null;
    const p = result.payload as Record<string, unknown>;
    if (typeof p.exp !== "number") return null;
    const expMs = p.exp * 1000;
    const now = Date.now();
    if (now > expMs) return { text: "EXPIRED", color: "text-destructive" };
    const remaining = expMs - now;
    const days = Math.floor(remaining / 86400000);
    const hours = Math.floor((remaining % 86400000) / 3600000);
    return {
      text: `Expires in ${days > 0 ? `${days}d ` : ""}${hours}h`,
      color: days < 1 ? "text-amber-500" : "text-emerald-500",
    };
  }, [result]);

  const expiry = result ? getExpiryStatus() : null;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Paste JWT Token
        </label>
        <Textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste your JWT token here... (e.g. eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0...)"
          className="font-mono text-sm min-h-[120px] resize-y"
          spellCheck={false}
        />
        <div className="flex gap-2">
          <Button onClick={decode} size="sm">Decode</Button>
          <Button onClick={() => { setToken(""); setResult(null); setError(null); }} variant="ghost" size="sm">Clear</Button>
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-destructive/10 border border-destructive/30 p-4">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {result && (
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm">Header</h3>
              <Button
                variant="ghost"
                size="xs"
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(result.header, null, 2));
                  toast.success("Header copied");
                }}
              >
                Copy
              </Button>
            </div>
            <pre className="bg-muted/30 rounded p-3 font-mono text-sm overflow-x-auto">
              {JSON.stringify(result.header, null, 2)}
            </pre>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm">Payload</h3>
              <div className="flex items-center gap-2">
                {expiry && <span className={`text-xs font-medium ${expiry.color}`}>{expiry.text}</span>}
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(result.payload, null, 2));
                    toast.success("Payload copied");
                  }}
                >
                  Copy
                </Button>
              </div>
            </div>
            <pre className="bg-muted/30 rounded p-3 font-mono text-sm overflow-x-auto">
              {JSON.stringify(result.payload, null, 2)}
            </pre>
          </div>
          <div className="text-xs text-muted-foreground">
            <p>
              <strong>Signature:</strong>{" "}
              <code className="text-xs break-all">{result.signature.slice(0, 32)}...</code>
            </p>
            <p className="mt-1">
              The signature is decoded for display only. Cryptographic verification is not performed.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
