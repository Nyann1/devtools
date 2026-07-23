"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import QRCode from "qrcode";

export function QrTool() {
  const [text, setText] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!text.trim() || !canvasRef.current) return;
    const timer = setTimeout(() => {
      QRCode.toCanvas(canvasRef.current, text, {
        width: 256,
        margin: 2,
        color: { dark: "#000000", light: "#ffffff" },
        errorCorrectionLevel: "M",
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [text]);

  const downloadPNG = useCallback(() => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-1.5 block text-muted-foreground">
          Text or URL
        </label>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text or URL to encode..."
          className="font-mono text-sm min-h-[100px] resize-y"
          spellCheck={false}
        />
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="border rounded-lg p-4 bg-white inline-block">
          <canvas ref={canvasRef} width={256} height={256} className="block" />
        </div>
        {text.trim() && (
          <Button onClick={downloadPNG} size="sm">
            Download PNG
          </Button>
        )}
      </div>
    </div>
  );
}
