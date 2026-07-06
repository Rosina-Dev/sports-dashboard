import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const generatedAt = new Date().toISOString();

const sources = [
  {
    id: "mlb-news",
    label: "MLB News",
    league: "MLB",
    url: "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/news",
    type: "espn-news",
    nextAction: "Refresh baseball headlines and compare against dashboard MLB context.",
  },
  {
    id: "nba-news",
    label: "NBA News",
    league: "NBA",
    url: "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/news",
    type: "espn-news",
    nextAction: "Refresh offseason and summer-league headline context.",
  },
  {
    id: "nhl-news",
    label: "NHL News",
    league: "NHL",
    url: "https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/news",
    type: "espn-news",
    nextAction: "Refresh offseason and schedule headline context.",
  },
  {
    id: "mls-news",
    label: "MLS News",
    league: "MLS",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/usa.1/news",
    type: "espn-news",
    nextAction: "Refresh MLS headline context and compare against dashboard standings snapshot.",
  },
  {
    id: "fifa-world-cup",
    label: "FIFA World Cup",
    league: "FIFA",
    url: "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026",
    type: "html-check",
    nextAction: "Check official World Cup event hub for major schedule/status changes.",
  },
  {
    id: "wimbledon",
    label: "Wimbledon",
    league: "Tennis",
    url: "https://www.wimbledon.com/en_GB/scores/schedule/index.html",
    type: "html-check",
    nextAction: "Check order of play while Wimbledon is active.",
  },
];

function cleanText(value = "") {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/â€”/g, "-")
    .replace(/â€“/g, "-")
    .replace(/Â/g, "")
    .replace(/^[-–—]\s*/, "")
    .replace(/\s+/g, " ")
    .trim();
}

function sentence(value = "", maxLength = 150) {
  const text = cleanText(value);
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trim()}...`;
}

function extractTitle(html, fallback) {
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1];
  return cleanText(h1 || title || fallback);
}

function summarizeHtml(html, label) {
  const text = cleanText(html);
  const signals = (text.match(/schedule|match|final|standings|draw|ranking|today|fixtures|results/gi) || []).length;
  return signals > 0
    ? `${label} responded and exposed ${signals} schedule or event signal(s) in the page text.`
    : `${label} responded; review the official page for current details.`;
}

function normalizeNewsItem(article, league) {
  const title = article?.headline || article?.title;
  if (!title) return undefined;
  return {
    title: sentence(title, 92),
    league,
    note: sentence(article?.description || article?.story || article?.linkText || "Recent headline from a public sports news feed.", 165),
    url: article?.links?.web?.href || article?.link || article?.url,
  };
}

async function checkSource(source) {
  const checkedAt = new Date().toISOString();
  try {
    const response = await fetch(source.url, {
      headers: {
        "user-agent": "sports-dashboard-source-check/1.0 (+https://github.com/Rosina-Dev/sports-dashboard)",
        accept: source.type === "espn-news" ? "application/json,text/plain;q=0.9,*/*;q=0.8" : "text/html,application/xhtml+xml",
      },
    });

    const contentType = response.headers.get("content-type") || "";
    const body = await response.text();
    const result = {
      id: source.id,
      label: source.label,
      league: source.league,
      url: source.url,
      status: response.ok ? "ok" : "warning",
      checkedAt,
      httpStatus: response.status,
      headline: source.label,
      summary: response.ok ? `${source.label} responded successfully.` : `${source.label} returned HTTP ${response.status}.`,
      nextAction: source.nextAction,
      newsItems: [],
    };

    if (response.ok && source.type === "espn-news" && contentType.includes("json")) {
      const json = JSON.parse(body);
      const articles = Array.isArray(json.articles) ? json.articles : [];
      result.headline = articles[0]?.headline || source.label;
      result.summary = articles.length
        ? `${source.label} returned ${articles.length} headline(s); the dashboard uses the top broad-interest item.`
        : `${source.label} responded, but no headline list was found.`;
      result.newsItems = articles.map((article) => normalizeNewsItem(article, source.league)).filter(Boolean).slice(0, 2);
    } else if (response.ok) {
      result.headline = extractTitle(body, source.label);
      result.summary = summarizeHtml(body, source.label);
    }

    return result;
  } catch (error) {
    return {
      id: source.id,
      label: source.label,
      league: source.league,
      url: source.url,
      status: "error",
      checkedAt,
      headline: `${source.label} check failed`,
      summary: error instanceof Error ? error.message : "Unknown fetch error. Keep curated fallback data visible.",
      nextAction: source.nextAction,
      newsItems: [],
    };
  }
}

const checkedSources = await Promise.all(sources.map(checkSource));
const newsItems = checkedSources
  .flatMap((source) => source.newsItems)
  .filter(Boolean)
  .slice(0, 5);

const snapshot = {
  schemaVersion: 1,
  generatedAt,
  cadence: "Weekly GitHub Actions refresh: public sports news feeds plus official event-page source checks.",
  sources: checkedSources.map(({ newsItems: _newsItems, ...source }) => source),
  newsItems,
  notes: [
    "The dashboard remains curated for calendar logic, major-event selection, and league context.",
    "This file adds a scheduled public-source freshness layer; it does not replace official league standings APIs.",
  ],
};

const outputPath = resolve("public", "sports-live.json");
await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
console.log(`Updated ${outputPath} at ${generatedAt}`);