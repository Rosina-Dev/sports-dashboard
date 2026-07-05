import React from "react";
import ReactDOM from "react-dom/client";
import { Activity, AlertTriangle, BarChart3, CalendarDays, ChevronRight, Clock3, Flame, Newspaper, Radio, Search, Shield, Star, Trophy, Users } from "lucide-react";
import "./ufc.css";

type Division = "All" | "Heavyweight" | "Light Heavyweight" | "Middleweight" | "Welterweight" | "Lightweight" | "Featherweight" | "Bantamweight" | "Flyweight" | "Women Strawweight" | "Women Flyweight";
type EventType = "All" | "PPV" | "Fight Night" | "International";
type BoutTier = "Main Event" | "Co-main" | "Main Card" | "Prelims";
type Fight = { id: string; tier: BoutTier; division: Exclude<Division, "All">; red: string; blue: string; stakes: string; ranked: number; title?: boolean; rivalry?: boolean; late?: boolean };
type UFCEvent = { id: string; name: string; type: Exclude<EventType, "All">; date: string; venue: string; city: string; watch: string; url: string; image: string; tagline: string; note: string; fights: Fight[]; timeline: Array<{ label: string; date: string; time: string; note: string }> };
type Fighter = { name: string; division: Exclude<Division, "All">; record: string; streak: string; next?: string; last: string; tag: string };
type Ranking = { division: Exclude<Division, "All">; champion: string; contenders: string[]; movement: string; state: "Hot" | "Crowded" | "Waiting" };

const links = { events: "https://www.ufc.com/events", news: "https://www.ufc.com/news", rankings: "https://www.ufc.com/rankings" };
const lastUpdated = "Manual fallback data last updated July 5, 2026";
const MS = 24 * 60 * 60 * 1000;
const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

const events: UFCEvent[] = [
  { id: "ufc-329", name: "UFC 329", type: "PPV", date: "2026-07-11", venue: "T-Mobile Arena", city: "Las Vegas, NV", watch: "ESPN+ PPV, prelims on ESPN platforms", url: links.events, image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=1600&q=80", tagline: "International Fight Week pressure, title stakes, and ranked contenders packed into one card.", note: "Fight week watch: verify bout order and official start times before lock-in.", fights: [
    { id: "f1", tier: "Main Event", division: "Lightweight", red: "Champion TBD", blue: "Top contender TBD", stakes: "Title implications and pound-for-pound movement", ranked: 2, title: true },
    { id: "f2", tier: "Co-main", division: "Welterweight", red: "Ranked welterweight", blue: "Rising contender", stakes: "Winner moves into the title-shot conversation", ranked: 2, rivalry: true },
    { id: "f3", tier: "Main Card", division: "Bantamweight", red: "Pressure boxer", blue: "Scramble-heavy grappler", stakes: "Style clash with breakout potential", ranked: 1 },
    { id: "f4", tier: "Prelims", division: "Featherweight", red: "Prospect watch", blue: "Short-notice veteran", stakes: "Upset alert and late replacement volatility", ranked: 0, late: true }], timeline: [
    { label: "Fight week media day", date: "2026-07-08", time: "Afternoon", note: "Track quotes, staredowns, and card-change clues." },
    { label: "Official weigh-ins", date: "2026-07-10", time: "Morning", note: "Highest-risk moment for bout changes." },
    { label: "Ceremonial weigh-ins", date: "2026-07-10", time: "Evening", note: "Final public faceoff before fight night." },
    { label: "Early prelims", date: "2026-07-11", time: "Evening", note: "Prospects and late-notice fights start here." },
    { label: "Main card", date: "2026-07-11", time: "Night", note: "PPV window and ranked fight focus." }] },
  { id: "fn-281", name: "UFC Fight Night 281", type: "Fight Night", date: "2026-07-18", venue: "Paycom Center", city: "Oklahoma City, OK", watch: "ESPN platforms", url: links.events, image: "https://images.unsplash.com/photo-1517438322307-e67111335449?auto=format&fit=crop&w=1600&q=80", tagline: "A rankings maintenance card where one sharp performance can reset a division queue.", note: "Main card order is treated as manual fallback until official listing is checked.", fights: [
    { id: "f5", tier: "Main Event", division: "Middleweight", red: "Top-five contender", blue: "Durable finisher", stakes: "Five-round test with title-eliminator flavor", ranked: 2 },
    { id: "f6", tier: "Co-main", division: "Women Flyweight", red: "Former title challenger", blue: "Fast-rising striker", stakes: "Winner enters the short list for a contender fight", ranked: 2 },
    { id: "f7", tier: "Main Card", division: "Heavyweight", red: "Power puncher", blue: "Wrestling-heavy veteran", stakes: "Low-margin heavyweight chaos", ranked: 1 }], timeline: [
    { label: "Media availability", date: "2026-07-16", time: "Afternoon", note: "Watch for five-round cardio questions." },
    { label: "Official weigh-ins", date: "2026-07-17", time: "Morning", note: "Weight checks and bout changes matter." },
    { label: "Prelims", date: "2026-07-18", time: "Evening", note: "Prospect block and regional names." },
    { label: "Main card", date: "2026-07-18", time: "Night", note: "Ranked middleweight main event." }] },
  { id: "ufc-330", name: "UFC 330", type: "PPV", date: "2026-08-15", venue: "Wells Fargo Center", city: "Philadelphia, PA", watch: "ESPN+ PPV, prelims on ESPN platforms", url: links.events, image: "https://images.unsplash.com/photo-1569517282132-25d22f4573e6?auto=format&fit=crop&w=1600&q=80", tagline: "East Coast PPV with title-room consequences across lighter divisions.", note: "Card shell is ready for official bout confirmations.", fights: [
    { id: "f8", tier: "Main Event", division: "Bantamweight", red: "Champion lane", blue: "No. 1 contender lane", stakes: "Possible title fight or title eliminator", ranked: 2, title: true },
    { id: "f9", tier: "Co-main", division: "Light Heavyweight", red: "Knockout artist", blue: "Measured counter striker", stakes: "Division reboot fight", ranked: 2 },
    { id: "f10", tier: "Main Card", division: "Women Strawweight", red: "Former champion", blue: "New contender", stakes: "Champion watch and ranking compression", ranked: 2 }], timeline: [
    { label: "Fight week arrivals", date: "2026-08-12", time: "All day", note: "Watch final bout order updates." },
    { label: "Official weigh-ins", date: "2026-08-14", time: "Morning", note: "Title-fight backup rules may matter." },
    { label: "Main card", date: "2026-08-15", time: "Night", note: "PPV card and rankings impact." }] },
  { id: "shanghai-fn", name: "UFC Fight Night Shanghai", type: "International", date: "2026-08-29", venue: "Shanghai event venue TBD", city: "Shanghai, China", watch: "ESPN platforms, local schedule TBD", url: links.events, image: "https://images.unsplash.com/photo-1533591380348-14193f1de18f?auto=format&fit=crop&w=1600&q=80", tagline: "International card built for prospects, regional momentum, and odd viewing hours.", note: "Time-zone conversion and official venue should be checked before fight week.", fights: [
    { id: "f11", tier: "Main Event", division: "Flyweight", red: "Ranked flyweight", blue: "International contender", stakes: "High-speed contender sorting", ranked: 2 },
    { id: "f12", tier: "Co-main", division: "Featherweight", red: "Action fighter", blue: "Prospect watch", stakes: "Breakout or veteran check", ranked: 1 }], timeline: [
    { label: "Local media day", date: "2026-08-27", time: "Local afternoon", note: "International broadcast details expected." },
    { label: "Official weigh-ins", date: "2026-08-28", time: "Local morning", note: "Time-zone reminder for US viewers." },
    { label: "Main card", date: "2026-08-29", time: "Local night", note: "International Fight Night window." }] }
];

const fighters: Fighter[] = [
  { name: "Islam Makhachev", division: "Lightweight", record: "26-1", streak: "Long win streak", next: "Awaiting official booking", last: "Title defense win", tag: "Champion watch" },
  { name: "Alex Pereira", division: "Light Heavyweight", record: "12-3", streak: "Title-form volatility", next: "Opponent TBD", last: "Statement win/loss tracker", tag: "Must-watch power" },
  { name: "Zhang Weili", division: "Women Strawweight", record: "25-3", streak: "Elite title form", next: "Contender queue forming", last: "Championship-level performance", tag: "Division anchor" },
  { name: "Shavkat Rakhmonov", division: "Welterweight", record: "18-0", streak: "Unbeaten", next: "Title eliminator watch", last: "Ranked win", tag: "Breakout pressure" },
  { name: "Tom Aspinall", division: "Heavyweight", record: "15-3", streak: "Fast-finisher run", next: "Heavyweight title picture", last: "First-round finish", tag: "Clock starts fast" }
];
const rankings: Ranking[] = [
  { division: "Heavyweight", champion: "Champion lane TBD", contenders: ["Tom Aspinall", "Ciryl Gane", "Sergei Pavlovich"], movement: "Title clarity and injury timing drive the queue.", state: "Waiting" },
  { division: "Light Heavyweight", champion: "Alex Pereira lane", contenders: ["Magomed Ankalaev", "Jiri Prochazka", "Jamahal Hill"], movement: "One result can reorder the top three quickly.", state: "Hot" },
  { division: "Welterweight", champion: "Champion lane TBD", contenders: ["Shavkat Rakhmonov", "Belal Muhammad", "Leon Edwards"], movement: "Crowded title-shot debate with stylistic splits.", state: "Crowded" },
  { division: "Lightweight", champion: "Islam Makhachev lane", contenders: ["Arman Tsarukyan", "Charles Oliveira", "Justin Gaethje"], movement: "Every ranked fight affects the title waitlist.", state: "Hot" },
  { division: "Women Strawweight", champion: "Zhang Weili lane", contenders: ["Tatiana Suarez", "Yan Xiaonan", "Amanda Lemos"], movement: "Top contenders need clean availability and a signature win.", state: "Crowded" }
];
const news = [
  { title: "Official event schedule check", tone: "Official", source: "UFC Events", url: links.events, summary: "Use the official events page as the live source of truth for bout order, venues, and broadcast windows.", updated: "Today" },
  { title: "Card-change risk window", tone: "Breaking", source: "UFC News", url: links.news, summary: "The highest-risk period is weigh-in week: missed weights, medical scratches, and short-notice replacements can reshape the card.", updated: "Fight week" },
  { title: "Ranking movement tracker", tone: "Watch", source: "UFC Rankings", url: links.rankings, summary: "Ranked main-card fights should be checked against official rankings after each event for contender movement.", updated: "Weekly" },
  { title: "Media day signal board", tone: "Media", source: "UFC News", url: links.news, summary: "Press conference quotes, open workouts, and faceoffs are storyline signals, not official fight data.", updated: "As posted" }
];
const storylines = [
  { title: "Lightweight title queue stays unforgiving", division: "Lightweight", impact: "Title implications", why: "A single injury, missed weight, or upset can move a contender from waiting room to main event." },
  { title: "Welterweight needs a clean eliminator", division: "Welterweight", impact: "Contender sorting", why: "The division has names for debate, but not enough clean separation at the top." },
  { title: "International cards are prospect accelerators", division: "Featherweight", impact: "Breakout watch", why: "Regional showcases often reveal fighters before they become main-card fixtures in US time slots." },
  { title: "Women's strawweight remains compact and dangerous", division: "Women Strawweight", impact: "Champion pressure", why: "The top tier is small enough that one dominant performance can feel like a title argument." }
];
const results = [
  { event: "Recent PPV sample", date: "2026-06-29", winner: "Ranked lightweight", loser: "Top-ten veteran", division: "Lightweight", method: "Decision, 5 rounds", impact: "Contender stayed alive but did not create a clear title claim." },
  { event: "Recent Fight Night sample", date: "2026-06-22", winner: "Unranked prospect", loser: "Ranked veteran", division: "Featherweight", method: "TKO, Round 2", impact: "Breakout watchlist upgraded after a ranked finish." },
  { event: "Recent international sample", date: "2026-06-15", winner: "Flyweight contender", loser: "Former challenger", division: "Flyweight", method: "Submission, Round 3", impact: "Flyweight queue became more crowded near the top five." }
];
const divisions: Division[] = ["All", "Heavyweight", "Light Heavyweight", "Middleweight", "Welterweight", "Lightweight", "Featherweight", "Bantamweight", "Flyweight", "Women Strawweight", "Women Flyweight"];
const eventTypes: EventType[] = ["All", "PPV", "Fight Night", "International"];

const parseDate = (value: string) => new Date(`${value}T12:00:00`);
const daysUntil = (value: string) => Math.round((new Date(parseDate(value).getFullYear(), parseDate(value).getMonth(), parseDate(value).getDate()).getTime() - today.getTime()) / MS);
const formatDate = (value: string) => new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(parseDate(value));
const countdown = (value: string) => { const days = daysUntil(value); if (days === 0) return "Tonight"; if (days === 1) return "Tomorrow"; return days > 1 ? `${days} days` : `${Math.abs(days)} days ago`; };
const heat = (event: UFCEvent) => Math.min(100, 34 + event.fights.filter((f) => f.title).length * 26 + event.fights.reduce((t, f) => t + f.ranked * 8, 0) + event.fights.filter((f) => f.rivalry).length * 10 + (event.type === "PPV" ? 12 : 4) - event.fights.filter((f) => f.late).length * 4);
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
    const text = `${event.name} ${event.type} ${event.city} ${event.venue} ${event.fights.map((fight) => `${fight.red} ${fight.blue} ${fight.division}`).join(" ")}`.toLowerCase();
    return (eventType === "All" || event.type === eventType) && event.fights.some((fight) => matchesDivision(fight, division)) && text.includes(query.toLowerCase());
  });
  const selected = events.find((event) => event.id === selectedId) ?? nextEvent();
  const main = mainFight(selected, "Main Event");
  const coMain = mainFight(selected, "Co-main");
  const fights = selected.fights.filter((fight) => matchesDivision(fight, division));
  const watchlist = fighters.filter((fighter) => division === "All" || fighter.division === division);
  const activeRankings = rankings.filter((ranking) => division === "All" || ranking.division === division);
  const activeStories = storylines.filter((story) => division === "All" || story.division === division);
  const cardHeat = heat(selected);
  const heatLabel = cardHeat >= 85 ? "Must watch" : cardHeat >= 70 ? "Strong card" : "Scout card";

  return <main className="shell">
    <section className="hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(6,6,8,.94), rgba(20,22,28,.62)), url(${nextEvent().image})` }}>
      <div className="heroCopy"><p className="eyebrow">UFC Fan Command</p><h1>UFC Fight Dashboard</h1><p className="intro">Next fights, card heat, rankings pressure, fight-week signals, and the stories that make a bout matter.</p><div className="sourceRail"><a href={links.events} target="_blank" rel="noreferrer">UFC Events</a><a href={links.news} target="_blank" rel="noreferrer">UFC News</a><a href={links.rankings} target="_blank" rel="noreferrer">UFC Rankings</a></div></div>
      <div className="heroStats"><div><strong>{countdown(nextEvent().date)}</strong><span>Until next card</span></div><div><strong>{events.length}</strong><span>Upcoming events</span></div><div><strong>{selected.fights.filter((fight) => fight.ranked > 0).length}</strong><span>Ranked fights on deck</span></div></div>
    </section>
    <section className="toolbar"><label className="searchBox"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search events, fighters, divisions..." /></label><select value={division} onChange={(event) => setDivision(event.target.value as Division)}>{divisions.map((option) => <option key={option} value={option}>{option === "All" ? "All divisions" : option}</option>)}</select><div className="segments">{eventTypes.map((option) => <button className={eventType === option ? "selected" : ""} key={option} onClick={() => setEventType(option)}>{option}</button>)}</div></section>
    <section className="noticeBar"><Radio size={18} /><span>{lastUpdated}. Official UFC pages are linked for live verification before fight night.</span></section>
    <section className="spotlightLayout"><article className="eventSpotlight"><div className="spotlightImage" style={{ backgroundImage: `url(${selected.image})` }} /><div className="spotlightBody"><div className="sectionLabel"><span>{selected.type}</span><span>{countdown(selected.date)}</span></div><h2>{selected.name}</h2><p>{selected.tagline}</p><div className="eventFacts"><span><CalendarDays size={16} />{formatDate(selected.date)}</span><span><Activity size={16} />{selected.venue}, {selected.city}</span><span><Clock3 size={16} />{selected.watch}</span></div><div className="mainFights"><div><small>Main event</small><strong>{fightText(main)}</strong><span>{main?.stakes ?? "Official listing pending"}</span></div><div><small>Co-main</small><strong>{fightText(coMain)}</strong><span>{coMain?.stakes ?? "Official listing pending"}</span></div></div></div></article><aside className="heatPanel"><div className="panelTitle"><Flame size={21} /><h2>Card Heat</h2></div><div className="heatScore" style={{ "--score": `${cardHeat}%` } as React.CSSProperties}><strong>{cardHeat}</strong><span>{heatLabel}</span></div><div className="heatBreakdown"><span>{selected.fights.filter((fight) => fight.title).length} title-stakes fights</span><span>{selected.fights.reduce((total, fight) => total + fight.ranked, 0)} ranked fighters</span><span>{selected.fights.filter((fight) => fight.rivalry).length} rivalry flags</span><span>{selected.fights.filter((fight) => fight.late).length} replacement alerts</span></div><p>{selected.note}</p><a href={selected.url} target="_blank" rel="noreferrer">Check official event page</a></aside></section>
    <section className="dashboardGrid topGrid"><article className="panel"><div className="panelTitle"><CalendarDays size={20} /><h2>Upcoming Fight Cards</h2></div><div className="eventList">{filteredEvents.length ? filteredEvents.map((event) => <button className={`eventRow ${selected.id === event.id ? "isSelected" : ""}`} key={event.id} onClick={() => setSelectedId(event.id)}><div><strong>{event.name}</strong><span>{event.city} - {mainFight(event, "Main Event")?.division ?? "Card details pending"}</span></div><time>{formatDate(event.date)}</time><span className="heatBadge">{heat(event)}</span><ChevronRight size={18} /></button>) : <EmptyState title="No cards match" note="Clear search or widen the division/event filter." />}</div></article><article className="panel"><div className="panelTitle"><Newspaper size={20} /><h2>News Pulse</h2></div><div className="newsList">{news.map((item) => <a className="newsItem" href={item.url} target="_blank" rel="noreferrer" key={item.title}><span className={`newsTone tone${item.tone}`}>{item.tone}</span><strong>{item.title}</strong><p>{item.summary}</p><small>{item.source} - {item.updated}</small></a>)}</div></article></section>
    <section className="dashboardGrid detailGrid"><article className="panel fightCardPanel"><div className="panelTitle"><Users size={20} /><h2>{selected.name} Card</h2></div><div className="fightList">{fights.length ? fights.map((fight) => <div className="fightRow" key={fight.id}><div className="fightTier"><span>{fight.tier}</span><small>{fight.division}</small></div><div className="fighters"><strong>{fight.red}</strong><span>vs</span><strong>{fight.blue}</strong></div><p>{fight.stakes}</p><div className="fightFlags">{fight.title ? <span>Title stakes</span> : null}{fight.rivalry ? <span>Rivalry</span> : null}{fight.late ? <span>Late replacement</span> : null}{!fight.title && !fight.rivalry && !fight.late ? <span>{fight.ranked} ranked fighter(s)</span> : null}</div></div>) : <EmptyState title="No bouts in this division" note="The selected event has no matching fights in the current fallback data." />}</div></article><article className="panel"><div className="panelTitle"><Clock3 size={20} /><h2>Fight Week Timeline</h2></div><div className="timeline">{selected.timeline.map((item) => <div className="timelineItem" key={`${item.label}-${item.date}`}><time>{formatDate(item.date)}</time><div><strong>{item.label}</strong><span>{item.time}</span><p>{item.note}</p></div></div>)}</div></article></section>
    <section className="dashboardGrid midGrid"><article className="panel"><div className="panelTitle"><Trophy size={20} /><h2>Champions & Rankings Radar</h2></div><div className="rankingGrid">{activeRankings.length ? activeRankings.map((ranking) => <div className="rankingCard" key={ranking.division}><div><span className={`state state${ranking.state}`}>{ranking.state}</span><h3>{ranking.division}</h3><strong>{ranking.champion}</strong></div><ol>{ranking.contenders.map((name) => <li key={name}>{name}</li>)}</ol><p>{ranking.movement}</p></div>) : <EmptyState title="No ranking panel" note="This division is ready for data once official rankings are added." />}</div></article><article className="panel"><div className="panelTitle"><Star size={20} /><h2>Fighter Watchlist</h2></div><div className="watchList">{watchlist.length ? watchlist.map((fighter) => <div className="watchItem" key={fighter.name}><div><strong>{fighter.name}</strong><span>{fighter.division} - {fighter.record}</span></div><p>{fighter.next ?? "No booked fight in fallback data"}</p><small>{fighter.streak} - {fighter.last}</small><b>{fighter.tag}</b></div>) : <EmptyState title="No watchlist fighters" note="No saved fighters match the active division filter." />}</div></article></section>
    <section className="dashboardGrid bottomGrid"><article className="panel"><div className="panelTitle"><Flame size={20} /><h2>Storylines</h2></div><div className="storyList">{activeStories.length ? activeStories.map((story) => <div className="storyCard" key={story.title}><span>{story.impact}</span><h3>{story.title}</h3><p>{story.why}</p></div>) : <EmptyState title="No storyline yet" note="This filter has no curated storyline in the current fallback set." />}</div></article><article className="panel"><div className="panelTitle"><BarChart3 size={20} /><h2>Recent Results</h2></div><div className="resultsList">{results.map((result) => <div className="resultRow" key={`${result.event}-${result.winner}`}><time>{formatDate(result.date)}</time><div><strong>{result.winner}</strong><span>def. {result.loser} - {result.method}</span><p>{result.impact}</p></div></div>)}</div></article><article className="panel"><div className="panelTitle"><AlertTriangle size={20} /><h2>Upset & Breakout Watch</h2></div><div className="upsetList">{events.flatMap((event) => event.fights.filter((fight) => fight.late || fight.ranked <= 1).map((fight) => ({ event, fight }))).slice(0, 5).map(({ event, fight }) => <div className="upsetItem" key={`${event.id}-${fight.id}`}><strong>{fight.red} vs {fight.blue}</strong><span>{event.name} - {fight.division}</span><p>{fight.late ? "Short-notice volatility can create live upset value." : "Prospect or lower-ranked fighter has a path to a breakout moment."}</p></div>)}</div></article></section>
    <footer><Shield size={18} />Hybrid dashboard: curated fallback data first, official UFC links for verification, API-ready shapes for later live feeds.</footer>
  </main>;
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
