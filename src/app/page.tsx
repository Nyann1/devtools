import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { JsonLd } from "@/components/json-ld";

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Free Toolkit",
  url: "https://free-toolkit.com",
  description: "Free online developer tools. Format JSON, encode Base64, debug JWT, test regex, generate UUIDs and more. All client-side processing.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://free-toolkit.com/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const featuredTools = [
  {
    href: "/json-formatter",
    title: "JSON Formatter",
    description:
      "Format, validate, and beautify JSON data. Tree view, error highlighting, and minify support.",
    icon: "{}",
  },
  {
    href: "/base64",
    title: "Base64 Encode/Decode",
    description:
      "Encode text to Base64 or decode Base64 strings back to text. Support for UTF-8 and binary.",
    icon: "64",
  },
  {
    href: "/url-encoder",
    title: "URL Encoder",
    description:
      "URL-encode or decode text strings. Handle query parameters and special characters safely.",
    icon: "%",
  },
  {
    href: "/timestamp-converter",
    title: "Timestamp Converter",
    description:
      "Convert Unix timestamps to human-readable dates and vice versa. Support for seconds and milliseconds.",
    icon: "@",
  },
  {
    href: "/jwt-debugger",
    title: "JWT Debugger",
    description:
      "Decode and inspect JWT tokens. View header, payload, and verify signature structure.",
    icon: "⟐",
  },
  {
    href: "/regex-tester",
    title: "Regex Tester",
    description:
      "Test regular expressions with real-time matching. Highlight groups and see match details.",
    icon: ".*",
  },
  {
    href: "/hash-generator",
    title: "Hash Generator",
    description:
      "Generate MD5, SHA-1, SHA-256, SHA-512 hashes. Compute HMAC with secret keys.",
    icon: "#",
  },
  {
    href: "/uuid-generator",
    title: "UUID Generator",
    description:
      "Generate random UUIDv4 and time-based UUIDv7 identifiers. Batch generation supported.",
    icon: "ID",
  },
  {
    href: "/qr-code-generator",
    title: "QR Code Generator",
    description:
      "Generate QR codes from text or URLs. Download as PNG or SVG. Customizable colors and size.",
    icon: "▣",
  },
  {
    href: "/markdown-previewer",
    title: "Markdown Previewer",
    description:
      "Write and preview Markdown in real-time. GitHub-flavored markdown with syntax highlighting.",
    icon: "M↓",
  },
];

export default function Home() {
  return (
    <>
      <JsonLd data={webSiteSchema} />
      <section className="border-b bg-muted/20">
        <div className="container mx-auto px-4 py-20 md:py-28 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Free Online Developer Tools
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6">
            Fast, private, and free tools for developers. JSON formatting,
            Base64 encoding, JWT debugging, regex testing, and more.
            <span className="font-medium text-foreground">
              {" "}
              All processing happens in your browser — no data is ever uploaded.
            </span>
          </p>
          <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
              </svg>
              No sign-up required
            </span>
            <Separator orientation="vertical" className="h-4" />
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
              </svg>
              100% client-side processing
            </span>
            <Separator orientation="vertical" className="h-4" />
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
              </svg>
              Completely free
            </span>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredTools.map((tool) => (
            <Link key={tool.href} href={tool.href} className="group">
              <Card className="h-full transition-colors hover:border-primary/50 hover:bg-accent/30">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-9 h-9 rounded-md bg-primary/10 text-primary font-mono text-sm font-bold group-hover:bg-primary/20 transition-colors">
                      {tool.icon}
                    </span>
                    <CardTitle className="text-base">{tool.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tool.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="rounded-xl bg-primary/5 border border-primary/20 px-6 py-5">
            <p className="text-sm font-medium mb-1">
              This site is under active development
            </p>
            <p className="text-sm text-muted-foreground">
              Got a tool request or feedback?{" "}
              <a href="mailto:1326813680@qq.com" className="text-primary underline underline-offset-2 hover:text-primary/80">
                1326813680@qq.com
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 border-t">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">
            Why Choose Our Developer Tools?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 text-left">
            <div>
              <h3 className="font-semibold mb-2">Privacy First</h3>
              <p className="text-sm text-muted-foreground">
                Every tool runs entirely in your browser. Your data never leaves
                your device. No servers, no logs, no tracking.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">
                No network round-trips for processing. Instant results as you
                type, with zero latency.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Always Free</h3>
              <p className="text-sm text-muted-foreground">
                All tools are free to use with no limits. No sign-up, no
                paywalls, no usage quotas.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
