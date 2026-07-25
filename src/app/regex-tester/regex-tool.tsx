"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// --- Regex Tokenizer & Explainer ---

type TokenType =
  | "char-class" | "quantifier" | "anchor" | "group" | "lookaround"
  | "charset" | "alternation" | "escape" | "literal" | "flag";

interface Token {
  raw: string;
  type: TokenType;
  desc: string;
}

const CHAR_CLASSES: Record<string, string> = {
  "\\d": "matches any digit (0-9)",
  "\\D": "matches any non-digit",
  "\\w": "matches any word character (a-z, A-Z, 0-9, _)",
  "\\W": "matches any non-word character",
  "\\s": "matches any whitespace (space, tab, newline)",
  "\\S": "matches any non-whitespace",
  ".": "matches any character except newline",
  "\\n": "matches a newline character",
  "\\t": "matches a tab character",
  "\\r": "matches a carriage return",
  "\\0": "matches a null character",
};

const ANCHORS: Record<string, string> = {
  "^": "asserts position at the start of the string (or line with m flag)",
  "$": "asserts position at the end of the string (or line with m flag)",
  "\\b": "word boundary — position between a word char and a non-word char",
  "\\B": "non-word boundary",
};

const QUANTIFIERS: Record<string, string> = {
  "*": "matches 0 or more times (greedy)",
  "*?": "matches 0 or more times (lazy)",
  "+": "matches 1 or more times (greedy)",
  "+?": "matches 1 or more times (lazy)",
  "?": "matches 0 or 1 time (greedy)",
  "??": "matches 0 or 1 time (lazy)",
};

const LOOKAROUNDS: Record<string, string> = {
  "(?=": "positive lookahead — asserts what follows matches the pattern",
  "(?!": "negative lookahead — asserts what follows does NOT match",
  "(?<=": "positive lookbehind — asserts what precedes matches the pattern",
  "(?<!": "negative lookbehind — asserts what precedes does NOT match",
};

const FLAG_DESCS: Record<string, string> = {
  g: "global — find all matches, not just the first",
  i: "case-insensitive — a matches A and vice versa",
  m: "multiline — ^ and $ match start/end of each line",
  s: "dotAll — dot (.) matches newline characters too",
  u: "unicode — enables full Unicode support",
  y: "sticky — matches only from lastIndex position",
};

function tokenizeRegex(pattern: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  let safety = 0;

  while (i < pattern.length) {
    if (safety++ > 500) break; // prevent infinite loop on malformed input
    if (pattern[i] === "\\" && i + 1 < pattern.length) {
      const seq = pattern[i] + pattern[i + 1];
      if (CHAR_CLASSES[seq]) {
        tokens.push({ raw: seq, type: "char-class", desc: CHAR_CLASSES[seq] });
      } else if (ANCHORS[seq]) {
        tokens.push({ raw: seq, type: "anchor", desc: ANCHORS[seq] });
      } else {
        tokens.push({ raw: seq, type: "escape", desc: `escaped character: matches a literal '${pattern[i + 1]}'` });
      }
      i += 2;
      continue;
    }

    if (pattern[i] === "[" && (i === 0 || pattern[i - 1] !== "\\")) {
      const start = i;
      i++;
      if (pattern[i] === "^") i++;
      while (i < pattern.length && pattern[i] !== "]") {
        if (pattern[i] === "\\") i++;
        i++;
      }
      if (i < pattern.length) i++;
      const raw = pattern.slice(start, i);
      const negated = raw.startsWith("[^");
      tokens.push({ raw, type: "charset", desc: negated ? "matches any character NOT in the set" : "matches any character in the set" });
      continue;
    }

    if (pattern[i] === ".") {
      tokens.push({ raw: ".", type: "char-class", desc: CHAR_CLASSES["."] });
      i++;
      continue;
    }

    if (pattern[i] === "^" && (i === 0 || "([|".includes(pattern[i - 1] ?? ""))) {
      tokens.push({ raw: "^", type: "anchor", desc: ANCHORS["^"] });
      i++;
      continue;
    }
    if (pattern[i] === "$") {
      const isEnd = i === pattern.length - 1 || !/[)\w]/.test(pattern[i + 1] ?? "");
      if (isEnd) {
        tokens.push({ raw: "$", type: "anchor", desc: ANCHORS["$"] });
        i++;
        continue;
      }
    }

    if (pattern[i] === "(") {
      if (pattern[i + 1] === "?") {
        const sub = pattern.slice(i, i + 4);
        if (LOOKAROUNDS[sub]) {
          const start = i;
          let depth = 1;
          i += 3;
          while (i < pattern.length && depth > 0) {
            if (pattern[i] === "(") depth++;
            else if (pattern[i] === ")") depth--;
            i++;
          }
          tokens.push({ raw: pattern.slice(start, i), type: "lookaround", desc: LOOKAROUNDS[sub] });
          continue;
        }
        if (sub === "(?:") {
          const start = i;
          let depth = 1;
          i += 3;
          while (i < pattern.length && depth > 0) {
            if (pattern[i] === "(") depth++;
            else if (pattern[i] === ")") depth--;
            i++;
          }
          tokens.push({ raw: pattern.slice(start, i), type: "group", desc: "non-capturing group — groups without creating a backreference" });
          continue;
        }
        if (pattern.slice(i, i + 4) === "(?<") {
          const start = i;
          let depth = 1;
          i += 3;
          while (i < pattern.length && depth > 0) {
            if (pattern[i] === "(") depth++;
            else if (pattern[i] === ")") depth--;
            i++;
          }
          tokens.push({ raw: pattern.slice(start, i), type: "group", desc: "named capture group — captures match into a named group" });
          continue;
        }
      }
      const start = i;
      let depth = 1;
      i++;
      while (i < pattern.length && depth > 0) {
        if (pattern[i] === "\\") { i += 2; continue; }
        if (pattern[i] === "(") depth++;
        else if (pattern[i] === ")") depth--;
        i++;
      }
      tokens.push({ raw: pattern.slice(start, i), type: "group", desc: "capture group — captures matched text for backreference or extraction" });
      continue;
    }

    if (pattern[i] === "|") {
      tokens.push({ raw: "|", type: "alternation", desc: "alternation — acts like a boolean OR, matches either the left or right side" });
      i++;
      continue;
    }

    const ch = pattern[i];
    if (QUANTIFIERS[ch] && tokens.length > 0) {
      if (ch === "?" && pattern[i + 1] === "?") {
        tokens.push({ raw: "??", type: "quantifier", desc: QUANTIFIERS["??"] });
        i += 2;
        continue;
      }
      if ((ch === "*" || ch === "+" || ch === "?") && pattern[i + 1] === "?") {
        const key = ch + "?";
        tokens.push({ raw: key, type: "quantifier", desc: QUANTIFIERS[key] });
        i += 2;
        continue;
      }
      tokens.push({ raw: ch, type: "quantifier", desc: QUANTIFIERS[ch] });
      i++;
      continue;
    }

    if (ch === "{" && /\d/.test(pattern[i + 1] ?? "")) {
      const start = i;
      while (i < pattern.length && pattern[i] !== "}") i++;
      if (i < pattern.length) i++;
      const raw = pattern.slice(start, i);
      tokens.push({ raw, type: "quantifier", desc: `matches exactly or between the specified number of times` });
      continue;
    }

    let literal = "";
    while (i < pattern.length) {
      const c = pattern[i];
      if ("\\^$.[](){}*+?|".includes(c)) {
        if (literal) break;
        literal = c;
        i++;
        break;
      }
      if (c === "{" && /\d/.test(pattern[i + 1] ?? "")) break;
      literal += c;
      i++;
    }
    if (literal) {
      tokens.push({ raw: literal, type: "literal", desc: `matches the literal text "${literal}"` });
    }
  }

  return tokens;
}

function explainFlags(flags: string): Token[] {
  return flags.split("").filter(Boolean).map((f) => ({
    raw: f,
    type: "flag" as const,
    desc: FLAG_DESCS[f] ?? "unknown flag",
  }));
}

// --- Quick Reference Data ---

const REFERENCE = [
  { title: "Character Classes", items: [
    { token: "\\d", desc: "digit (0-9)" },
    { token: "\\w", desc: "word char (a-z, A-Z, 0-9, _)" },
    { token: "\\s", desc: "whitespace (space, tab, newline)" },
    { token: ".", desc: "any character except \\n" },
    { token: "\\D \\W \\S", desc: "inverse of \\d \\w \\s" },
  ]},
  { title: "Quantifiers", items: [
    { token: "*", desc: "0 or more (greedy)" },
    { token: "+", desc: "1 or more (greedy)" },
    { token: "?", desc: "0 or 1 (greedy)" },
    { token: "{n}", desc: "exactly n times" },
    { token: "{n,m}", desc: "n to m times" },
    { token: "{n,}", desc: "n or more times" },
    { token: "*? +?", desc: "lazy (non-greedy) versions" },
  ]},
  { title: "Groups & Lookaround", items: [
    { token: "(...)", desc: "capture group — stores match in $1, $2..." },
    { token: "(?:...)", desc: "non-capturing group — no backreference" },
    { token: "(?<name>...)", desc: "named group — access by name" },
    { token: "(?=...)", desc: "positive lookahead" },
    { token: "(?!...)", desc: "negative lookahead" },
    { token: "(?<=...)", desc: "positive lookbehind" },
    { token: "(?<!...)", desc: "negative lookbehind" },
  ]},
  { title: "Anchors & Boundaries", items: [
    { token: "^", desc: "start of string (or line w/ m flag)" },
    { token: "$", desc: "end of string (or line w/ m flag)" },
    { token: "\\b", desc: "word boundary" },
    { token: "\\B", desc: "non-word boundary" },
  ]},
  { title: "Alternation & Misc", items: [
    { token: "|", desc: "OR — match left or right side" },
    { token: "\\", desc: "escape next character" },
    { token: "[...]", desc: "character set — match any inside" },
    { token: "[^...]", desc: "negated set — match anything NOT inside" },
  ]},
  { title: "Shorthand Examples", items: [
    { token: "\\d{3}-\\d{4}", desc: "phone pattern (3 digits — 4 digits)" },
    { token: "\\w+@\\w+\\.\\w+", desc: "simple email pattern" },
    { token: "https?://.*", desc: "URL starting with http(s)" },
    { token: "^[A-Z][a-z]+$", desc: "capitalized word (full line)" },
  ]},
];

// --- Types ---

type RegexResult =
  | { type: "error"; message: string }
  | { type: "matches"; count: number; parts: string[]; matches: Array<{ full: string; groups: string[]; index: number; namedGroups: Record<string, string> }> }
  | { type: "none" };

export function RegexTool() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("");
  const [replace, setReplace] = useState("");
  const [mode, setMode] = useState<"match" | "replace">("match");
  const [refSearch, setRefSearch] = useState("");

  const result = useMemo((): RegexResult | null => {
    if (!pattern || !text) return null;
    let regex: RegExp;
    try {
      regex = new RegExp(pattern, flags);
    } catch (e) {
      return { type: "error", message: (e as SyntaxError).message };
    }
    const matches = [...text.matchAll(regex)];
    if (matches.length === 0) return { type: "none" };
    const highlighted = text.replace(regex, (match) => `\x00${match}\x01`);
    const parts = mode === "match" ? highlighted.split(/(\x00.*?\x01)/) : [];
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
  }, [pattern, flags, text, mode]);

  const replacedText = useMemo(() => {
    if (mode !== "replace" || !pattern || !text || result?.type !== "matches") return "";
    try {
      const regex = new RegExp(pattern, flags);
      return text.replace(regex, replace);
    } catch {
      return "";
    }
  }, [mode, pattern, flags, text, replace, result]);

  const tokens = useMemo(() => {
    if (!pattern) return [];
    try {
      return tokenizeRegex(pattern);
    } catch {
      return [];
    }
  }, [pattern]);

  const flagTokens = useMemo(() => explainFlags(flags), [flags]);

  const filteredRef = useMemo(() => {
    if (!refSearch.trim()) return REFERENCE;
    const q = refSearch.toLowerCase();
    return REFERENCE
      .map((section) => ({
        ...section,
        items: section.items.filter(
          (item) => item.token.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q),
        ),
      }))
      .filter((section) => section.items.length > 0);
  }, [refSearch]);

  return (
    <div className="lg:grid lg:grid-cols-3 gap-6">
      {/* Left: inputs + results */}
      <div className="lg:col-span-2 space-y-4">
        {/* Pattern & Flags */}
        <div>
          <label className="text-sm font-medium mb-1 block text-muted-foreground">Pattern</label>
          <div className="flex gap-2">
            <span className="flex items-center px-2 border rounded-md bg-muted font-mono text-muted-foreground">/</span>
            <Input value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="Regular expression" className="font-mono flex-1" />
            <span className="flex items-center px-2 border rounded-md bg-muted font-mono text-muted-foreground">/</span>
            <Input value={flags} onChange={(e) => setFlags(e.target.value)} placeholder="g" className="font-mono w-20" />
          </div>
        </div>

        {/* Mode Tabs */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode("match")}
            className={`text-xs px-3 py-1 rounded-md border font-mono ${mode === "match" ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground hover:text-foreground"}`}
          >
            Match
          </button>
          <button
            onClick={() => setMode("replace")}
            className={`text-xs px-3 py-1 rounded-md border font-mono ${mode === "replace" ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground hover:text-foreground"}`}
          >
            Replace
          </button>
          {mode === "replace" && (
            <Input value={replace} onChange={(e) => setReplace(e.target.value)} placeholder="Replacement text (use $1, $2 for groups)" className="font-mono text-sm flex-1 h-8" />
          )}
        </div>

        {/* Test String */}
        <div>
          <label className="text-sm font-medium mb-1 block text-muted-foreground">Test String</label>
          <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text to test against..." className="font-mono text-sm min-h-[160px] resize-y" spellCheck={false} />
        </div>

        {/* Results */}
        {result && result.type === "error" && (
          <div className="rounded-md bg-destructive/10 border border-destructive/30 p-4">
            <p className="text-sm text-destructive font-mono">{result.message}</p>
          </div>
        )}
        {!pattern && (
          <p className="text-sm text-muted-foreground">Enter a regex pattern to see explanation and matches</p>
        )}
        {result?.type === "none" && (
          <p className="text-sm text-muted-foreground">No matches found</p>
        )}

        {/* Highlighted Matches */}
        {result?.type === "matches" && mode === "match" && (
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
          </>
        )}

        {/* Replace Preview */}
        {mode === "replace" && replacedText && (
          <div>
            <label className="text-sm font-medium mb-1.5 block text-muted-foreground">Replace Preview</label>
            <div className="p-4 border rounded-lg bg-muted/10 font-mono text-sm whitespace-pre-wrap break-all">
              {replacedText}
            </div>
          </div>
        )}

        {/* Match Details */}
        {result?.type === "matches" && (
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
                {Object.keys(m.namedGroups).length > 0 && (
                  <div className="mt-1 text-xs text-muted-foreground">
                    Named: {Object.entries(m.namedGroups).map(([k, v]) => (
                      <code key={k} className="mr-2 bg-muted px-1 rounded">{k}: {v ?? "(undefined)"}</code>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Sidebar: Explanation + Reference — aligned with Pattern & Test String */}
      <div className="space-y-4">
        {/* Regex Explanation */}
        {(tokens.length > 0 || flagTokens.length > 0) && (
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-semibold mb-3">Explanation</h3>
            <div className="space-y-2">
              {tokens.map((t, i) => (
                <div key={i} className="flex items-start gap-2 text-xs">
                  <code className={`shrink-0 mt-0.5 px-1.5 py-0.5 rounded font-mono text-xs ${
                    t.type === "char-class" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                    t.type === "quantifier" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
                    t.type === "anchor" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" :
                    t.type === "group" || t.type === "lookaround" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                    t.type === "charset" ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400" :
                    t.type === "alternation" ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" :
                    t.type === "escape" ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400" :
                    "bg-muted text-muted-foreground"
                  }`}>{t.raw}</code>
                  <span className="text-muted-foreground leading-relaxed">{t.desc}</span>
                </div>
              ))}
              {flagTokens.length > 0 && tokens.length > 0 && (
                <div className="border-t pt-2 mt-2" />
              )}
              {flagTokens.map((t, i) => (
                <div key={`f${i}`} className="flex items-start gap-2 text-xs">
                  <code className="shrink-0 mt-0.5 px-1.5 py-0.5 rounded font-mono text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">{t.raw}</code>
                  <span className="text-muted-foreground leading-relaxed">{t.desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Reference */}
        <div className="border rounded-lg p-4">
          <h3 className="text-sm font-semibold mb-2">Quick Reference</h3>
          <Input
            value={refSearch}
            onChange={(e) => setRefSearch(e.target.value)}
            placeholder="Search tokens..."
            className="font-mono text-xs h-7 mb-3"
          />
          {filteredRef.length === 0 ? (
            <p className="text-xs text-muted-foreground">No matches</p>
          ) : (
            <div className="space-y-3">
              {filteredRef.map((section) => (
                <div key={section.title}>
                  <h4 className="text-xs font-medium text-muted-foreground mb-1.5">{section.title}</h4>
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <div key={item.token} className="flex items-center gap-2 text-xs">
                        <code className="shrink-0 px-1 py-0.5 rounded font-mono bg-muted">{item.token}</code>
                        <span className="text-muted-foreground truncate">{item.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
