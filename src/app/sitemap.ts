import type { MetadataRoute } from "next";

const tools = [
  { path: "/json-formatter", priority: 0.9, changeFreq: "weekly" as const },
  { path: "/base64", priority: 0.9, changeFreq: "weekly" as const },
  { path: "/url-encoder", priority: 0.8, changeFreq: "weekly" as const },
  { path: "/hash-generator", priority: 0.8, changeFreq: "monthly" as const },
  { path: "/uuid-generator", priority: 0.8, changeFreq: "monthly" as const },
  { path: "/qr-code-generator", priority: 0.7, changeFreq: "monthly" as const },
  { path: "/jwt-debugger", priority: 0.8, changeFreq: "weekly" as const },
  { path: "/regex-tester", priority: 0.8, changeFreq: "weekly" as const },
  { path: "/timestamp-converter", priority: 0.8, changeFreq: "weekly" as const },
  { path: "/markdown-previewer", priority: 0.7, changeFreq: "weekly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://free-toolkit.com";

  const home = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 1,
  };

  const pages = tools.map((t) => ({
    url: `${baseUrl}${t.path}`,
    lastModified: new Date(),
    changeFrequency: t.changeFreq,
    priority: t.priority,
  }));

  return [home, ...pages];
}
