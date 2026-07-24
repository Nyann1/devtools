import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-3 text-sm">Formatters</h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/json-formatter"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                JSON Formatter
              </Link>
              <Link
                href="/markdown-previewer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Markdown Previewer
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-sm">Encoders</h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/base64"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Base64
              </Link>
              <Link
                href="/url-encoder"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                URL Encoder
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-sm">Generators</h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/uuid-generator"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                UUID Generator
              </Link>
              <Link
                href="/hash-generator"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Hash Generator
              </Link>
              <Link
                href="/qr-code-generator"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                QR Code Generator
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-sm">Debuggers</h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/jwt-debugger"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                JWT Debugger
              </Link>
              <Link
                href="/regex-tester"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Regex Tester
              </Link>
              <Link
                href="/timestamp-converter"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Timestamp Converter
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>
            All tools process data locally in your browser. No data is ever
            uploaded to any server.
          </p>
          <p>
            <a href="mailto:1326813680@qq.com" className="hover:text-foreground transition-colors underline underline-offset-2">
              Feedback? Email us
            </a>
            {" "}&middot; Built with Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
