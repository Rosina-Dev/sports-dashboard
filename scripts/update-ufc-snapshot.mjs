import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const sources = [
  {
    id: "ufc-events",
    label: "UFC Events",
    url: "https://www.ufc.com/events",
    nextAction: "Compare official event listings with curated upcoming-card data.",
  },
  {
    id: "ufc-news",
    label: "UFC News",
    url: "https://www.ufc.com/news",
    nextAction: "Refresh dashboard news pulse from recent official headlines.",
  },
  {
    id: "ufc-rankings",
    label: "UFC Rankings",
    url: "https://www.ufc.com/rankings",
    nextAction: "Compare official rankings with curated ranking impact notes.",
  },
];

const generatedAt = new Date().toISOString();

function cleanText(value = "") {
  return value.replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTitle(html, fallback) {
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1];
  return cleanText(h1 || title || fallback);
}

function summarize(html, label) {
  const text = cleanText(html);
  const eventHints = (text.match(/UFC\s+\d+|Fight Night|T-Mobile|Apex|PPV/gi) || []).length;
  const rankHints = (text.match(/Champion|Rankings|Lightweight|Welterweight|Middleweight|Bantamweight|Flyweight/gi) || []).length;
  const newsHints = (text.match(/news|interview|preview|fight week|results|announcement/gi) || []).length;
  const hints = Math.max(eventHints, rankHints, newsHints);
  return hints > 0
    ? `${label} responded and exposed ${hints} relevant UFC signal(s) in the page text.`
    : `${label} responded; review the official page for the newest details.`;
}

async function checkSource(source) {
  const checkedAt = new Date().toISOString();
  try {
    const response = await fetch(source.url, {
      headers: {
        "user-agent": "sports-dashboard-source-check/1.0 (+https://github.com/Rosina-Dev/sports-dashboard)",
        "accept": "text/html,application/xhtml+xml",
      },
    });
    const html = await response.text();
    return {
      ...source,
      status: response.ok ? "ok" : "warning",
      checkedAt,
      httpStatus: response.status,
      headline: extractTitle(html, source.label),
      summary: response.ok ? summarize(html, source.label) : `${source.label} returned HTTP ${response.status}. Keep curated fallback data visible.`,
    };
  } catch (error) {
    return {
      ...source,
      status: "error",
      checkedAt,
      headline: `${source.label} check failed`,
      summary: error instanceof Error ? error.message : "Unknown fetch error. Keep curated fallback data visible.",
    };
  }
}

const snapshot = {
  schemaVersion: 1,
  generatedAt,
  cadence: "Scheduled GitHub Pages refresh: official UFC source checks plus curated dashboard analysis.",
  sources: await Promise.all(sources.map(checkSource)),
  notes: [
    "The dashboard keeps curated fan analysis locally: card heat, why-it-matters notes, prospect labels, alerts, and ranking impact.",
    "This snapshot is refreshed from official UFC source pages and displayed as the live-ish verification layer.",
  ],
};

const outputPath = resolve("public", "ufc-live.json");
await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
console.log(`Updated ${outputPath} at ${generatedAt}`);
