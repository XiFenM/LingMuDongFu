import "server-only";

import { readFileSync } from "node:fs";
import path from "node:path";

export type MarkdownDocument = {
  meta: Record<string, unknown>;
  body: string;
};

const contentRoot = path.join(process.cwd(), "content");

export function readMarkdown(relativePath: string): MarkdownDocument {
  const filePath = path.join(contentRoot, relativePath);
  const raw = readFileSync(filePath, "utf8").trim();
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!match) {
    return { meta: {}, body: raw };
  }

  return {
    meta: parseFrontmatter(match[1]),
    body: match[2].trim(),
  };
}

function parseFrontmatter(source: string): Record<string, unknown> {
  return source.split(/\r?\n/).reduce<Record<string, unknown>>((acc, line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return acc;

    const separator = trimmed.indexOf(":");
    if (separator === -1) return acc;

    const key = trimmed.slice(0, separator).trim();
    const rawValue = trimmed.slice(separator + 1).trim();
    acc[key] = parseValue(rawValue);
    return acc;
  }, {});
}

function parseValue(value: string): unknown {
  if (!value) return "";
  if (value === "true") return true;
  if (value === "false") return false;
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);
  if ((value.startsWith("[") && value.endsWith("]")) || (value.startsWith("{") && value.endsWith("}"))) {
    return JSON.parse(value);
  }
  return value.replace(/^['"]|['"]$/g, "");
}

export function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

export function asArray<T>(value: unknown, fallback: T[] = []): T[] {
  return Array.isArray(value) ? (value as T[]) : fallback;
}

export function splitHeadingSections(body: string) {
  const sections: { title: string; body: string }[] = [];
  const pattern = /^##\s+(.+)$/gm;
  const matches = [...body.matchAll(pattern)];

  for (let i = 0; i < matches.length; i += 1) {
    const current = matches[i];
    const next = matches[i + 1];
    const title = current[1].trim();
    const start = (current.index ?? 0) + current[0].length;
    const end = next?.index ?? body.length;
    sections.push({ title, body: body.slice(start, end).trim() });
  }

  return sections;
}

export function markdownList(body: string): string[] {
  return body
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2).trim())
    .filter(Boolean);
}
