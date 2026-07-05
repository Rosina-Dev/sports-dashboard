import React from "react";
import ReactDOM from "react-dom/client";
import { Activity, AlertTriangle, BarChart3, CalendarDays, ChevronRight, Clock3, Flame, Newspaper, Radio, Search, Shield, Star, Trophy, Users } from "lucide-react";
import "./ufc.css";

type Division = "All" | "Heavyweight" | "Light Heavyweight" | "Middleweight" | "Welterweight" | "Lightweight" | "Featherweight" | "Bantamweight" | "Flyweight" | "Women Strawweight" | "Women Flyweight";
type EventType = "All" | "PPV" | "Fight Night" | "International";
type BoutTier = "Main Event" | "Co-main" | "Main Card" | "Prelims" | "Early Prelims";
type Priority = "Must-watch" | "Style clash" | "Rankings impact" | "Prospect watch" | "Upset watch" | "Volatility watch";
type Fight = { id: string; tier: BoutTier; division: Exclude<Division, "All">; red: string; blue: string; stakes: string; ranked: number; priority: Priority; impact: string; why: string; alerts?: string[]; title?: boolean; rivalry?: boolean; late?: boolean };
type UFCEvent = { id: string; name: string; type: Exclude<EventType, "All">; date: string; venue: string; city: string; watch: string; url: string; sourceUrl: string; sourceLabel: string; image: string; tagline: string; note: string; fights: Fight[]; timeline: Array<{ label: string; date: string; time: string; note: string }> };
type Fighter = { name: string; division: Exclude<Division, "All">; record: string; streak: string; next?: string; last: string; tag: string };
type Ranking = { division: Exclude<Division, "All">; champion: string; contenders: string[]; movement: string; state: "Hot" | "Crowded" | "Waiting" };

const links = {
  events: "https://www.ufc.com/events",
  news: "https://www.ufc.com/news",
  rankings: "https://www.ufc.com/rankings",
  ufc329: "https://en.wikipedia.org/wiki/UFC_329",
  fightNight281: "https://en.wikipedia.org/wiki/UFC_Fight_Night_281",
};
const lastUpdated = "Curated card data last updated July 5, 2026";
const MS = 24 * 60 * 60 * 1000;
const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

const events: UFCEvent[] = [
  {
    id: "ufc-329",
    name: "UFC 329: McGregor vs. Holloway 2",
    type: "PPV",
    date: "2026-07-11",
    venue: "T-Mobile Arena",
    city: "Paradise / Las Vegas, NV",
    watch: "Paramount+ / official listing to verify before fight night",
    url: links.events,
    sourceUrl: links.ufc329,
    sourceLabel: "UFC 329 card source",
    image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=1600&q=80",
    tagline: "International Fight Week with McGregor's return, Holloway's welterweight jump, ranked contenders, and several volatility flags.",
    note: "Official source check: verify final bout order, broadcast windows, and late replacements against UFC.com before lock-in.",
    fights: [
      { id: "329-1", tier: "Main Event", division: "Welterweight", red: "Conor McGregor", blue: "Max Holloway", stakes: "Legacy rematch, McGregor return, Holloway welterweight debut", ranked: 2, priority: "Must-watch", impact: "Star power and title-adjacent fallout", why: "The story is bigger than rankings: comeback, weight move, history, and the most fragile fight-week risk on the card.", alerts: ["Mauricio Ruffy expected as backup", "High scrutiny return fight"], rivalry: true },
      { id: "329-2", tier: "Main Card", division: "Lightweight", red: "Benoit Saint Denis", blue: "Paddy Pimblett", stakes: "Lightweight contender sorting", ranked: 2, priority: "Rankings impact", impact: "Winner can argue for a top-tier lightweight step-up", why: "Pimblett's profile meets Saint Denis' pressure style, so this is both rankings test and brand test." },
      { id: "329-3", tier: "Main Card", division: "Bantamweight", red: "Cory Sandhagen", blue: "Mario Bautista", stakes: "Bantamweight top-five pressure", ranked: 2, priority: "Style clash", impact: "Could reshape a crowded title-shot queue", why: "Sandhagen's range and creativity meet Bautista's pace and grappling threats." },
      { id: "329-4", tier: "Main Card", division: "Flyweight", red: "Brandon Royval", blue: "Lone'er Kavanagh", stakes: "Flyweight contender gatekeeper test", ranked: 2, priority: "Upset watch", impact: "A Kavanagh win would instantly compress the flyweight rankings", why: "Royval fights chaotic, high-event MMA; that creates both finishing chances and upset windows." },
      { id: "329-5", tier: "Main Card", division: "Lightweight", red: "King Green", blue: "Terrance McKinney", stakes: "Veteran craft vs early danger", ranked: 1, priority: "Volatility watch", impact: "Not a title eliminator, but a card-energy fight", why: "McKinney is most dangerous early; Green is built to punish mistakes if the first storm passes." },
      { id: "329-6", tier: "Prelims", division: "Light Heavyweight", red: "Robert Whittaker", blue: "Nikita Krylov", stakes: "Former champion moving into a dangerous light heavyweight lane", ranked: 2, priority: "Must-watch", impact: "Whittaker's divisional move could create a fresh contender story", why: "A former middleweight champion facing a proven light heavyweight gives the prelims real main-card weight." },
      { id: "329-7", tier: "Prelims", division: "Heavyweight", red: "Gable Steveson", blue: "Elisha Ellison", stakes: "Olympic wrestler UFC development check", ranked: 0, priority: "Prospect watch", impact: "Heavyweight prospect signal", why: "Steveson's wrestling pedigree makes this a ceiling-check fight more than a ranking fight." },
      { id: "329-8", tier: "Prelims", division: "Bantamweight", red: "Cody Garbrandt", blue: "Adrian Yanez", stakes: "Veteran name vs action striker", ranked: 1, priority: "Volatility watch", impact: "Could revive or reroute either fighter's matchmaking", why: "Both carry knockout danger and defensive questions, which makes it a high-swing prelim." },
      { id: "329-9", tier: "Early Prelims", division: "Women Flyweight", red: "Tracy Cortez", blue: "Wang Cong", stakes: "Women's flyweight ranking pressure", ranked: 2, priority: "Rankings impact", impact: "Winner stays visible in a shallow contender pool", why: "This is the type of ranked early fight that can matter more than its card placement suggests." },
      { id: "329-10", tier: "Early Prelims", division: "Flyweight", red: "Alessandro Costa", blue: "Cody Durden", stakes: "Replacement-driven flyweight bout", ranked: 1, priority: "Volatility watch", impact: "Card-change alert and flyweight depth check", why: "The opponent change makes preparation uncertainty part of the fight story.", alerts: ["Ode Osbourne withdrawal reported", "Replacement bout"] },
      { id: "329-11", tier: "Early Prelims", division: "Bantamweight", red: "Farid Basharat", blue: "TBD", stakes: "Opponent search / card-change watch", ranked: 1, priority: "Volatility watch", impact: "Bout status should be checked before fight week", why: "A TBD opponent is exactly where a dashboard beats a static card page: it should raise a visible alert.", alerts: ["Opponent TBD", "Replacement search reported"], late: true },
    ],
    timeline: [
      { label: "International Fight Week", date: "2026-07-08", time: "All week", note: "Hall of Fame and media signals can change storylines before the card." },
      { label: "Official weigh-ins", date: "2026-07-10", time: "Morning", note: "Backup fighter and TBD/replacement bouts should be rechecked here." },
      { label: "Ceremonial weigh-ins", date: "2026-07-10", time: "Evening", note: "Final public faceoffs and card confidence check." },
      { label: "Early prelims", date: "2026-07-11", time: "TBD", note: "Watch for replacement and prospect fights." },
      { label: "Main card", date: "2026-07-11", time: "TBD", note: "McGregor vs. Holloway 2 anchors the night." },
    ],
  },
  {
    id: "fn-281",
    name: "UFC Fight Night 281: du Plessis vs. Usman",
    type: "Fight Night",
    date: "2026-07-18",
    venue: "Paycom Center",
    city: "Oklahoma City, OK",
    watch: "Paramount+ / official listing to verify before fight night",
    url: links.events,
    sourceUrl: links.fightNight281,
    sourceLabel: "Fight Night 281 card source",
    image: "https://images.unsplash.com/photo-1517438322307-e67111335449?auto=format&fit=crop&w=1600&q=80",
    tagline: "A fight-night card with a huge middleweight name-value main event and several useful prospect/ranking reads.",
    note: "Official source check: Fight Night cards often move quickly, so verify bout order and late withdrawals on UFC.com.",
    fights: [
      { id: "281-1", tier: "Main Event", division: "Middleweight", red: "Dricus du Plessis", blue: "Kamaru Usman", stakes: "Five-round middleweight headline fight", ranked: 2, priority: "Must-watch", impact: "Could alter the middleweight title conversation", why: "Du Plessis brings championship-level chaos; Usman brings elite experience in a new divisional context." },
      { id: "281-2", tier: "Main Card", division: "Middleweight", red: "Jared Cannonier", blue: "Christian Leroy Duncan", stakes: "Veteran contender vs rising striker", ranked: 2, priority: "Rankings impact", impact: "Middleweight queue sorting", why: "Cannonier is a measuring stick; Duncan gets a chance to turn prospect buzz into contender relevance." },
      { id: "281-3", tier: "Main Card", division: "Welterweight", red: "Kevin Holland", blue: "Jacobe Smith", stakes: "Name fighter vs emerging welterweight", ranked: 1, priority: "Style clash", impact: "Could launch or halt Smith's climb", why: "Holland's length, pace, and improvisation make him a difficult test for almost any developing welterweight." },
      { id: "281-4", tier: "Main Card", division: "Lightweight", red: "Chase Hooper", blue: "Mitch Ramirez", stakes: "Lightweight development fight", ranked: 0, priority: "Prospect watch", impact: "Progress check for Hooper's lightweight form", why: "Hooper's evolution is the story: grappling base, improved striking, and whether he can keep building momentum." },
      { id: "281-5", tier: "Main Card", division: "Women Strawweight", red: "Tabatha Ricci", blue: "Fatima Kline", stakes: "Replacement reshapes a women's strawweight test", ranked: 2, priority: "Volatility watch", impact: "Winner stays relevant in a compact strawweight field", why: "Ribas withdrawing changes the style read; Ricci vs Kline is still meaningful but should be labeled as changed.", alerts: ["Amanda Ribas withdrawal reported", "Tabatha Ricci replacement reported"], late: true },
      { id: "281-6", tier: "Main Card", division: "Featherweight", red: "Tommy McMillen", blue: "Alberto Montes", stakes: "Featherweight prospect read", ranked: 0, priority: "Prospect watch", impact: "Prospect layer on the main card", why: "This is the sort of fight casual viewers miss unless the dashboard flags it as a development watch." },
      { id: "281-7", tier: "Prelims", division: "Women Flyweight", red: "Veronica Hardy", blue: "Dione Barbosa", stakes: "Women's flyweight depth fight", ranked: 1, priority: "Style clash", impact: "Useful read on flyweight depth", why: "Hardy's movement and Barbosa's grappling threat give the prelims a clear tactical hook." },
      { id: "281-8", tier: "Prelims", division: "Featherweight", red: "Austin Bashi", blue: "Jose Miguel Delgado", stakes: "Featherweight prospect sorting", ranked: 0, priority: "Prospect watch", impact: "Winner earns a cleaner prospect label", why: "This is a classic fight-night value add: not famous yet, but useful for tracking who may matter later." },
      { id: "281-9", tier: "Prelims", division: "Heavyweight", red: "Allen Frye Jr.", blue: "Alvin Hines", stakes: "Heavyweight volatility", ranked: 0, priority: "Upset watch", impact: "Low-rank heavyweight chaos", why: "Heavyweight prelims can flip quickly, and the dashboard should flag that volatility instead of hiding it." },
      { id: "281-10", tier: "Prelims", division: "Light Heavyweight", red: "Levi Rodrigues Jr.", blue: "Felipe Franco", stakes: "Light heavyweight development", ranked: 0, priority: "Prospect watch", impact: "Depth chart tracking", why: "A quiet division-depth fight can become relevant if the winner strings together finishes." },
      { id: "281-11", tier: "Prelims", division: "Flyweight", red: "Alden Coria", blue: "Stewart Nicoll", stakes: "Flyweight pace fight", ranked: 0, priority: "Style clash", impact: "Depth and pace check", why: "Flyweight prelims often carry high action even when rankings are not involved." },
      { id: "281-12", tier: "Prelims", division: "Bantamweight", red: "Marlon Vera", blue: "Charles Jourdain", stakes: "Announced bout watch", ranked: 2, priority: "Must-watch", impact: "Could become one of the card's best action fights", why: "If finalized, Vera vs Jourdain is a fan-friendly violence tax on the card.", alerts: ["Listed as announced bout; verify final placement"] },
    ],
    timeline: [
      { label: "Media availability", date: "2026-07-16", time: "Afternoon", note: "Main-event messaging and replacement-bout confidence check." },
      { label: "Official weigh-ins", date: "2026-07-17", time: "Morning", note: "Recheck Ricci/Kline and announced-bout status." },
      { label: "Prelims", date: "2026-07-18", time: "TBD", note: "Prospect-heavy block with several depth reads." },
      { label: "Main card", date: "2026-07-18", time: "TBD", note: "du Plessis vs. Usman carries the card." },
    ],
  },
  {
    id: "ufc-330",
    name: "UFC 330",
    type: "PPV",
    date: "2026-08-15",
    venue: "Wells Fargo Center",
    city: "Philadelphia, PA",
    watch: "ESPN+ PPV / official listing TBD",
    url: links.events,
    sourceUrl: links.events,
    sourceLabel: "UFC Events source",
    image: "https://images.unsplash.com/photo-1569517282132-25d22f4573e6?auto=format&fit=crop&w=1600&q=80",
    tagline: "Future PPV shell ready for official bout confirmations.",
    note: "Official source check: keep this as a shell until UFC publishes/locks the card.",
    fights: [
      { id: "330-1", tier: "Main Event", division: "Bantamweight", red: "Main event TBD", blue: "Opponent TBD", stakes: "Official card pending", ranked: 0, priority: "Volatility watch", impact: "No ranked impact until official fights are listed", why: "This card should stay visually distinct from confirmed cards so users do not confuse placeholders with facts.", alerts: ["Card details pending"], late: true },
    ],
    timeline: [
      { label: "Fight week arrivals", date: "2026-08-12", time: "All day", note: "Watch final bout order updates." },
      { label: "Official weigh-ins", date: "2026-08-14", time: "Morning", note: "Title-fight backup rules may matter if added." },
      { label: "Main card", date: "2026-08-15", time: "Night", note: "PPV card and rankings impact TBD." },
    ],
  },
  {
    id: "shanghai-fn",
    name: "UFC Fight Night Shanghai",
    type: "International",
    date: "2026-08-29",
    venue: "Shanghai event venue TBD",
    city: "Shanghai, China",
    watch: "ESPN platforms / local schedule TBD",
    url: links.events,
    sourceUrl: links.events,
    sourceLabel: "UFC Events source",
    image: "https://images.unsplash.com/photo-1533591380348-14193f1de18f?auto=format&fit=crop&w=1600&q=80",
    tagline: "International card shell for prospects, regional momentum, and time-zone alerts.",
    note: "Official source check: time-zone conversion and official venue should be checked before fight week.",
    fights: [
      { id: "sh-1", tier: "Main Event", division: "Flyweight", red: "Main event TBD", blue: "Opponent TBD", stakes: "Official card pending", ranked: 0, priority: "Volatility watch", impact: "No ranked impact until official fights are listed", why: "The useful feature here is the future time-zone and confirmation alert, not fake fight certainty.", alerts: ["Card details pending", "Venue/time-zone TBD"], late: true },
    ],
    timeline: [
      { label: "Local media day", date: "2026-08-27", time: "Local afternoon", note: "International broadcast details expected." },
      { label: "Official weigh-ins", date: "2026-08-28", time: "Local morning", note: "Time-zone reminder for US viewers." },
      { label: "Main card", date: "2026-08-29", time: "Local night", note: "International Fight Night window." },
    ],
  },
];

const fighters: Fighter[] = [
  { name: "Conor McGregor", division: "Welterweight", record: "UFC return", streak: "First fight since 2021", next: "Max Holloway at UFC 329", last: "Leg injury comeback story", tag: "Legacy watch" },
  { name: "Max Holloway", division: "Welterweight", record: "Former featherweight champion", streak: "Welterweight debut", next: "Conor McGregor at UFC 329", last: "Elite-level activity and durability", tag: "Weight-jump watch" },
  { name: "Paddy Pimblett", division: "Lightweight", record: "High-profile contender", streak: "Needs ranked proof", next: "Benoit Saint Denis at UFC 329", last: "Profile keeps rising", tag: "Brand vs merit" },
  { name: "Dricus du Plessis", division: "Middleweight", record: "Champion-level name", streak: "Five-round main event", next: "Kamaru Usman at UFC Fight Night 281", last: "Middleweight title picture", tag: "Chaos engine" },
  { name: "Kamaru Usman", division: "Middleweight", record: "Former welterweight champion", streak: "Middleweight test", next: "Dricus du Plessis at UFC Fight Night 281", last: "Elite experience", tag: "Division switch" },
  { name: "Gable Steveson", division: "Heavyweight", record: "Olympic wrestling pedigree", streak: "UFC development phase", next: "Elisha Ellison at UFC 329", last: "Prospect onboarding", tag: "Ceiling check" },
];
const rankings: Ranking[] = [
  { division: "Heavyweight", champion: "Champion lane TBD", contenders: ["Tom Aspinall", "Ciryl Gane", "Sergei Pavlovich"], movement: "Gable Steveson is not a title factor yet, but heavyweight prospect tracking matters early.", state: "Waiting" },
  { division: "Light Heavyweight", champion: "Alex Pereira lane", contenders: ["Robert Whittaker watch", "Nikita Krylov", "Magomed Ankalaev"], movement: "Whittaker vs. Krylov can create a fresh light heavyweight storyline if Whittaker looks real at the weight.", state: "Hot" },
  { division: "Middleweight", champion: "Dricus du Plessis lane", contenders: ["Kamaru Usman", "Jared Cannonier", "Christian Leroy Duncan"], movement: "Fight Night 281 is unusually relevant for middleweight because both main and co-main touch the queue.", state: "Hot" },
  { division: "Welterweight", champion: "Champion lane TBD", contenders: ["Conor McGregor", "Max Holloway", "Shavkat Rakhmonov"], movement: "McGregor vs. Holloway is more legacy than pure rankings, but the welterweight placement makes it impossible to ignore.", state: "Crowded" },
  { division: "Lightweight", champion: "Islam Makhachev lane", contenders: ["Benoit Saint Denis", "Paddy Pimblett", "King Green"], movement: "Saint Denis vs. Pimblett has the cleanest lightweight rankings consequence on UFC 329.", state: "Hot" },
  { division: "Bantamweight", champion: "Champion lane TBD", contenders: ["Cory Sandhagen", "Mario Bautista", "Cody Garbrandt"], movement: "Sandhagen vs. Bautista is the rankings fight; Garbrandt vs. Yanez is the volatility fight.", state: "Crowded" },
  { division: "Flyweight", champion: "Champion lane TBD", contenders: ["Brandon Royval", "Lone'er Kavanagh", "Alessandro Costa"], movement: "Royval vs. Kavanagh is a meaningful flyweight queue fight, with Costa/Durden as depth volatility.", state: "Crowded" },
  { division: "Women Strawweight", champion: "Zhang Weili lane", contenders: ["Tabatha Ricci", "Fatima Kline", "Tatiana Suarez"], movement: "Ricci replacing Ribas changes the read, but Kline still gets a meaningful test.", state: "Crowded" },
];
const news = [
  { title: "Official source check before lock-in", tone: "Official", source: "UFC Events", url: links.events, summary: "Use UFC.com as the final source for bout order, broadcast details, and late card changes.", updated: "Before each fight week" },
  { title: "McGregor vs. Holloway has backup risk", tone: "Breaking", source: "UFC 329 card source", url: links.ufc329, summary: "Mauricio Ruffy is listed as expected backup for the UFC 329 main event, making replacement risk a visible dashboard alert.", updated: "Jul 5" },
  { title: "Fight Night 281 has replacement context", tone: "Watch", source: "Fight Night 281 card source", url: links.fightNight281, summary: "Amanda Ribas is listed as withdrawn, with Tabatha Ricci replacing her against Fatima Kline.", updated: "Card watch" },
  { title: "Rankings pages remain the weekly calibration", tone: "Media", source: "UFC Rankings", url: links.rankings, summary: "After each card, ranked-fighter labels should be recalibrated against UFC's official rankings page.", updated: "Weekly" },
];
const storylines = [
  { title: "McGregor vs. Holloway is a dashboard-perfect fight", division: "Welterweight", impact: "Legacy plus volatility", why: "A normal event page lists the fight; the dashboard explains the comeback, weight jump, backup fighter, and risk profile in one scan." },
  { title: "Saint Denis vs. Pimblett has real lightweight consequence", division: "Lightweight", impact: "Rankings impact", why: "This is the cleanest UFC 329 contender-sorter because fame, pressure style, and divisional movement all meet." },
  { title: "Sandhagen vs. Bautista sharpens bantamweight", division: "Bantamweight", impact: "Contender sorting", why: "The division is crowded enough that a high-level style clash can change who gets a bigger name next." },
  { title: "du Plessis vs. Usman lifts a Fight Night", division: "Middleweight", impact: "Main-event gravity", why: "The card becomes more than a routine Fight Night because the main event touches former champion status and middleweight title perception." },
  { title: "Replacement flags are the hidden fan value", division: "Women Strawweight", impact: "Card-change alert", why: "Ricci replacing Ribas is exactly the kind of context a fan dashboard should surface instantly." },
  { title: "Prospect fights need labels", division: "Heavyweight", impact: "Prospect watch", why: "Steveson vs. Ellison is not a rankings fight, but it is a ceiling-check fight casual fans may want highlighted." },
];
const results = [
  { event: "Dashboard value example", date: "2026-07-05", winner: "Confirmed card context", loser: "Flat event listing", division: "Welterweight", method: "Better scan", impact: "The dashboard adds why-it-matters notes, alerts, rankings impact, and watch priority." },
  { event: "Card-change watch", date: "2026-07-05", winner: "Visible alert flags", loser: "Hidden TBDs", division: "Women Strawweight", method: "Replacement context", impact: "Withdrawals and replacements become first-class fan information." },
  { event: "Prospect tracking", date: "2026-07-05", winner: "Watch labels", loser: "Undifferentiated prelims", division: "Heavyweight", method: "Priority tags", impact: "Prospect and upset-watch fights become easy to spot." },
];
const divisions: Division[] = ["All", "Heavyweight", "Light Heavyweight", "Middleweight", "Welterweight", "Lightweight", "Featherweight", "Bantamweight", "Flyweight", "Women Strawweight", "Women Flyweight"];
const eventTypes: EventType[] = ["All", "PPV", "Fight Night", "International"];

const parseDate = (value: string) => new Date(`${value}T12:00:00`);
const daysUntil = (value: string) => Math.round((new Date(parseDate(value).getFullYear(), parseDate(value).getMonth(), parseDate(value).getDate()).getTime() - today.getTime()) / MS);
const formatDate = (value: string) => new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(parseDate(value));
const countdown = (value: string) => { const days = daysUntil(value); if (days === 0) return "Tonight"; if (days === 1) return "Tomorrow"; return days > 1 ? `${days} days` : `${Math.abs(days)} days ago`; };
const priorityWeight: Record<Priority, number> = { "Must-watch": 20, "Rankings impact": 14, "Style clash": 10, "Prospect watch": 6, "Upset watch": 8, "Volatility watch": 5 };
const heat = (event: UFCEvent) => Math.min(100, 18 + event.fights.reduce((total, fight) => total + fight.ranked * 5 + priorityWeight[fight.priority] + (fight.alerts?.length ? 2 : 0), 0) + (event.type === "PPV" ? 10 : 2) - event.fights.filter((fight) => fight.late).length * 2);
const mainFight = (event: UFCEvent, tier: BoutTier) => event.fights.find((fight) => fight.tier === tier);
const fightText = (fight?: Fight) => fight ? `${fight.red} vs ${fight.blue}` : "Bout details awaiting official confirmation";
const nextEvent = () => events.find((event) => daysUntil(event.date) >= 0) ?? events[events.length - 1];
const matchesDivision = (fight: Fight, division: Division) => division === "All" || fight.division === division;

function EmptyState({ title, note }: { title: string; note: string }) {
  return <div className="emptyState"><Shield size={22} /><strong>{title}</strong><span>{note}</span></div>;
}
function App() {
  const [division, setDivision] = React.useState<Division>("All");
  const [eventType, setEventType] = React.useState<EventType>("All");
  const [query, setQuery] = React.useState("");
  const [selectedId, setSelectedId] = React.useState(nextEvent().id);
  const filteredEvents = events.filter((event) => {
    const text = `${event.name} ${event.type} ${event.city} ${event.venue} ${event.fights.map((fight) => `${fight.red} ${fight.blue} ${fight.division} ${fight.priority} ${fight.impact}`).join(" ")}`.toLowerCase();
    return (eventType === "All" || event.type === eventType) && event.fights.some((fight) => matchesDivision(fight, division)) && text.includes(query.toLowerCase());
  });
  const selected = events.find((event) => event.id === selectedId) ?? nextEvent();
  const main = mainFight(selected, "Main Event");
  const coMain = selected.fights.find((fight) => fight.id !== main?.id && (fight.tier === "Co-main" || fight.tier === "Main Card"));
  const fights = selected.fights.filter((fight) => matchesDivision(fight, division));
  const watchlist = fighters.filter((fighter) => division === "All" || fighter.division === division);
  const activeRankings = rankings.filter((ranking) => division === "All" || ranking.division === division);
  const activeStories = storylines.filter((story) => division === "All" || story.division === division);
  const cardHeat = heat(selected);
  const heatLabel = cardHeat >= 85 ? "Must watch" : cardHeat >= 70 ? "Strong card" : "Scout card";
  const alertCount = selected.fights.reduce((total, fight) => total + (fight.alerts?.length ?? 0), 0);

  return <main className="shell">
    <section className="hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(6,6,8,.94), rgba(20,22,28,.62)), url(${nextEvent().image})` }}>
      <div className="heroCopy"><p className="eyebrow">UFC Fan Command</p><h1>UFC Fight Dashboard</h1><p className="intro">More than the event page: scan who is fighting, why it matters, what could change, and which fights deserve your attention.</p><div className="sourceRail"><a href={links.events} target="_blank" rel="noreferrer">UFC Events</a><a href={links.news} target="_blank" rel="noreferrer">UFC News</a><a href={links.rankings} target="_blank" rel="noreferrer">UFC Rankings</a></div></div>
      <div className="heroStats"><div><strong>{countdown(nextEvent().date)}</strong><span>Until next card</span></div><div><strong>{events.length}</strong><span>Tracked events</span></div><div><strong>{alertCount}</strong><span>Card-change alerts</span></div></div>
    </section>
    <section className="toolbar"><label className="searchBox"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search events, fighters, divisions, priority..." /></label><select value={division} onChange={(event) => setDivision(event.target.value as Division)}>{divisions.map((option) => <option key={option} value={option}>{option === "All" ? "All divisions" : option}</option>)}</select><div className="segments">{eventTypes.map((option) => <button className={eventType === option ? "selected" : ""} key={option} onClick={() => setEventType(option)}>{option}</button>)}</div></section>
    <section className="noticeBar sourceCheck"><Radio size={18} /><span>{lastUpdated}. Curated from public card listings; verify the official UFC Events page before fight night.</span></section>
    <section className="spotlightLayout"><article className="eventSpotlight"><div className="spotlightImage" style={{ backgroundImage: `url(${selected.image})` }} /><div className="spotlightBody"><div className="sectionLabel"><span>{selected.type}</span><span>{countdown(selected.date)}</span></div><h2>{selected.name}</h2><p>{selected.tagline}</p><div className="eventFacts"><span><CalendarDays size={16} />{formatDate(selected.date)}</span><span><Activity size={16} />{selected.venue}, {selected.city}</span><span><Clock3 size={16} />{selected.watch}</span></div><div className="mainFights"><div><small>Main event</small><strong>{fightText(main)}</strong><span>{main?.stakes ?? "Official listing pending"}</span></div><div><small>Next priority fight</small><strong>{fightText(coMain)}</strong><span>{coMain?.stakes ?? "Official listing pending"}</span></div></div><div className="linkRow"><a href={selected.sourceUrl} target="_blank" rel="noreferrer">{selected.sourceLabel}</a><a href={selected.url} target="_blank" rel="noreferrer">Official UFC check</a></div></div></article><aside className="heatPanel"><div className="panelTitle"><Flame size={21} /><h2>Card Heat</h2></div><div className="heatScore" style={{ "--score": `${cardHeat}%` } as React.CSSProperties}><strong>{cardHeat}</strong><span>{heatLabel}</span></div><div className="heatBreakdown"><span>{selected.fights.filter((fight) => fight.priority === "Must-watch").length} must-watch fights</span><span>{selected.fights.reduce((total, fight) => total + fight.ranked, 0)} ranked/name-value signals</span><span>{selected.fights.filter((fight) => fight.priority === "Prospect watch").length} prospect watches</span><span>{alertCount} alert flags</span></div><p>{selected.note}</p><a href={selected.url} target="_blank" rel="noreferrer">Check official event page</a></aside></section>
    <section className="dashboardGrid topGrid"><article className="panel"><div className="panelTitle"><CalendarDays size={20} /><h2>Upcoming Fight Cards</h2></div><div className="eventList">{filteredEvents.length ? filteredEvents.map((event) => <button className={`eventRow ${selected.id === event.id ? "isSelected" : ""}`} key={event.id} onClick={() => setSelectedId(event.id)}><div><strong>{event.name}</strong><span>{event.city} - {mainFight(event, "Main Event")?.division ?? "Card details pending"}</span></div><time>{formatDate(event.date)}</time><span className="heatBadge">{heat(event)}</span><ChevronRight size={18} /></button>) : <EmptyState title="No cards match" note="Clear search or widen the division/event filter." />}</div></article><article className="panel"><div className="panelTitle"><Newspaper size={20} /><h2>News Pulse</h2></div><div className="newsList">{news.map((item) => <a className="newsItem" href={item.url} target="_blank" rel="noreferrer" key={item.title}><span className={`newsTone tone${item.tone}`}>{item.tone}</span><strong>{item.title}</strong><p>{item.summary}</p><small>{item.source} - {item.updated}</small></a>)}</div></article></section>
    <section className="dashboardGrid detailGrid"><article className="panel fightCardPanel"><div className="panelTitle"><Users size={20} /><h2>{selected.name} Card</h2></div><div className="fightList">{fights.length ? fights.map((fight) => <div className="fightRow" key={fight.id}><div className="fightTier"><span>{fight.tier}</span><small>{fight.division}</small><b className="priority">{fight.priority}</b></div><div className="fighters"><strong>{fight.red}</strong><span>vs</span><strong>{fight.blue}</strong></div><div className="fightNotes"><p>{fight.stakes}</p><small>{fight.impact}</small><em>{fight.why}</em>{fight.alerts?.length ? <div className="alertStrip">{fight.alerts.map((alert) => <span key={alert}>{alert}</span>)}</div> : null}</div><div className="fightFlags">{fight.title ? <span>Title stakes</span> : null}{fight.rivalry ? <span>Rivalry</span> : null}{fight.late ? <span>Card-change risk</span> : null}{!fight.title && !fight.rivalry && !fight.late ? <span>{fight.ranked} ranked/name signal(s)</span> : null}</div></div>) : <EmptyState title="No bouts in this division" note="The selected event has no matching fights in the current fallback data." />}</div></article><article className="panel"><div className="panelTitle"><Clock3 size={20} /><h2>Fight Week Timeline</h2></div><div className="timeline">{selected.timeline.map((item) => <div className="timelineItem" key={`${item.label}-${item.date}`}><time>{formatDate(item.date)}</time><div><strong>{item.label}</strong><span>{item.time}</span><p>{item.note}</p></div></div>)}</div></article></section>
    <section className="dashboardGrid midGrid"><article className="panel"><div className="panelTitle"><Trophy size={20} /><h2>Champions & Rankings Radar</h2></div><div className="rankingGrid">{activeRankings.length ? activeRankings.map((ranking) => <div className="rankingCard" key={ranking.division}><div><span className={`state state${ranking.state}`}>{ranking.state}</span><h3>{ranking.division}</h3><strong>{ranking.champion}</strong></div><ol>{ranking.contenders.map((name) => <li key={name}>{name}</li>)}</ol><p>{ranking.movement}</p></div>) : <EmptyState title="No ranking panel" note="This division is ready for data once official rankings are added." />}</div></article><article className="panel"><div className="panelTitle"><Star size={20} /><h2>Fighter Watchlist</h2></div><div className="watchList">{watchlist.length ? watchlist.map((fighter) => <div className="watchItem" key={fighter.name}><div><strong>{fighter.name}</strong><span>{fighter.division} - {fighter.record}</span></div><p>{fighter.next ?? "No booked fight in fallback data"}</p><small>{fighter.streak} - {fighter.last}</small><b>{fighter.tag}</b></div>) : <EmptyState title="No watchlist fighters" note="No saved fighters match the active division filter." />}</div></article></section>
    <section className="dashboardGrid bottomGrid"><article className="panel"><div className="panelTitle"><Flame size={20} /><h2>Storylines</h2></div><div className="storyList">{activeStories.length ? activeStories.map((story) => <div className="storyCard" key={story.title}><span>{story.impact}</span><h3>{story.title}</h3><p>{story.why}</p></div>) : <EmptyState title="No storyline yet" note="This filter has no curated storyline in the current fallback set." />}</div></article><article className="panel"><div className="panelTitle"><BarChart3 size={20} /><h2>Dashboard Edge</h2></div><div className="resultsList">{results.map((result) => <div className="resultRow" key={`${result.event}-${result.winner}`}><time>{formatDate(result.date)}</time><div><strong>{result.winner}</strong><span>beats {result.loser} - {result.method}</span><p>{result.impact}</p></div></div>)}</div></article><article className="panel"><div className="panelTitle"><AlertTriangle size={20} /><h2>Alert & Breakout Watch</h2></div><div className="upsetList">{events.flatMap((event) => event.fights.filter((fight) => fight.alerts?.length || fight.priority === "Prospect watch" || fight.priority === "Upset watch" || fight.priority === "Volatility watch").map((fight) => ({ event, fight }))).slice(0, 7).map(({ event, fight }) => <div className="upsetItem" key={`${event.id}-${fight.id}`}><strong>{fight.red} vs {fight.blue}</strong><span>{event.name} - {fight.division} - {fight.priority}</span><p>{fight.alerts?.[0] ?? fight.why}</p></div>)}</div></article></section>
    <footer><Shield size={18} />Curated fan command layer: official UFC source links, richer fight context, card-change alerts, and API-ready data shapes.</footer>
  </main>;
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
