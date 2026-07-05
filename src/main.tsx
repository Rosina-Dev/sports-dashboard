import React from "react";
import ReactDOM from "react-dom/client";
import { CalendarDays, CheckCircle2, ChevronRight, Clock3, Globe2, MapPin, Plus, Search, Trophy } from "lucide-react";
import "./styles.css";

type Region = "USA" | "Schweiz" | "Global";
type Sport =
  | "Football"
  | "Basketball"
  | "Baseball"
  | "Soccer"
  | "Ice Hockey"
  | "Tennis"
  | "Golf"
  | "Motorsport"
  | "Combat Sports"
  | "Sailing"
  | "Track & Field"
  | "Cycling"
  | "Extras";
type Status = "active now" | "upcoming" | "off-season" | "major event soon";

type ScheduleEntry = {
  label: string;
  date: string;
  location?: string;
  note?: string;
};

type MegaEvent = {
  title: string;
  date: string;
  location: string;
  note: string;
};

type SportsItem = {
  id: string;
  title: string;
  sport: Sport;
  region: Region;
  seasonStart: string;
  seasonEnd: string;
  keyDate: string;
  keyDateLabel: string;
  phases: string[];
  timezone: "US" | "CH" | "Global";
  note: string;
  source: "curated" | "api-ready";
  details?: ScheduleEntry[];
};

const today = new Date();
const MS_PER_DAY = 24 * 60 * 60 * 1000;

const f1Races: ScheduleEntry[] = [
  { label: "Australian Grand Prix", date: "2026-03-08", location: "Melbourne" },
  { label: "Chinese Grand Prix", date: "2026-03-15", location: "Shanghai" },
  { label: "Japanese Grand Prix", date: "2026-03-29", location: "Suzuka" },
  { label: "Bahrain Grand Prix", date: "2026-04-12", location: "Sakhir" },
  { label: "Saudi Arabian Grand Prix", date: "2026-04-19", location: "Jeddah" },
  { label: "Miami Grand Prix", date: "2026-05-03", location: "Miami" },
  { label: "Canadian Grand Prix", date: "2026-05-24", location: "Montreal" },
  { label: "Monaco Grand Prix", date: "2026-06-07", location: "Monte Carlo" },
  { label: "Spanish Grand Prix", date: "2026-06-14", location: "Barcelona" },
  { label: "Austrian Grand Prix", date: "2026-06-28", location: "Spielberg" },
  { label: "British Grand Prix", date: "2026-07-05", location: "Silverstone" },
  { label: "Belgian Grand Prix", date: "2026-07-19", location: "Spa-Francorchamps" },
  { label: "Hungarian Grand Prix", date: "2026-07-26", location: "Budapest" },
  { label: "Dutch Grand Prix", date: "2026-08-23", location: "Zandvoort" },
  { label: "Italian Grand Prix", date: "2026-09-06", location: "Monza" },
  { label: "Azerbaijan Grand Prix", date: "2026-09-27", location: "Baku" },
  { label: "Singapore Grand Prix", date: "2026-10-11", location: "Singapore" },
  { label: "United States Grand Prix", date: "2026-10-25", location: "Austin" },
  { label: "Mexico City Grand Prix", date: "2026-11-01", location: "Mexico City" },
  { label: "Sao Paulo Grand Prix", date: "2026-11-08", location: "Interlagos" },
  { label: "Las Vegas Grand Prix", date: "2026-11-21", location: "Las Vegas" },
  { label: "Qatar Grand Prix", date: "2026-11-29", location: "Lusail" },
  { label: "Abu Dhabi Grand Prix", date: "2026-12-06", location: "Yas Marina" },
];

const worldCupRounds: ScheduleEntry[] = [
  { label: "Group stage", date: "2026-06-11", location: "USA, Mexico, Canada", note: "June 11-27" },
  { label: "Round of 32", date: "2026-06-28", location: "North America", note: "June 28-July 3" },
  { label: "Round of 16", date: "2026-07-04", location: "North America", note: "July 4-7" },
  { label: "Quarterfinals", date: "2026-07-09", location: "North America", note: "July 9-11" },
  { label: "Semifinals", date: "2026-07-14", location: "North America", note: "July 14-15" },
  { label: "Third-place match", date: "2026-07-18", location: "North America" },
  { label: "Final", date: "2026-07-19", location: "New York/New Jersey" },
];


const ufcEvents: ScheduleEntry[] = [
  { label: "UFC 329", date: "2026-07-11", location: "T-Mobile Arena, Las Vegas", note: "International Fight Week" },
  { label: "UFC Fight Night 281", date: "2026-07-18", location: "Paycom Center, Oklahoma City" },
  { label: "UFC 330", date: "2026-08-15", location: "Philadelphia" },
  { label: "UFC Fight Night", date: "2026-08-29", location: "Shanghai" },
];

const sailGpEvents: ScheduleEntry[] = [
  { label: "Perth Sail Grand Prix", date: "2026-01-17", location: "Perth, Australia", note: "Jan 17-18" },
  { label: "New Zealand Sail Grand Prix", date: "2026-02-14", location: "Auckland, New Zealand", note: "Feb 14-15" },
  { label: "Sydney Sail Grand Prix", date: "2026-02-28", location: "Sydney, Australia", note: "Feb 28-Mar 1" },
  { label: "Rio Sail Grand Prix", date: "2026-04-11", location: "Rio de Janeiro, Brazil", note: "Apr 11-12" },
  { label: "Bermuda Sail Grand Prix", date: "2026-05-10", location: "Bermuda", note: "May 10-11" },
  { label: "New York Sail Grand Prix", date: "2026-05-31", location: "New York City, USA", note: "May 31-Jun 1" },
  { label: "Canada Sail Grand Prix", date: "2026-06-21", location: "Halifax, Canada", note: "Jun 21-22" },
  { label: "Great Britain Sail Grand Prix", date: "2026-07-26", location: "Portsmouth, Great Britain", note: "Jul 26-27" },
  { label: "Germany Sail Grand Prix", date: "2026-08-23", location: "Sassnitz, Germany", note: "Aug 23-24" },
  { label: "Spain Sail Grand Prix", date: "2026-09-05", location: "Valencia, Spain", note: "Sep 5-6" },
  { label: "Switzerland Sail Grand Prix", date: "2026-09-19", location: "Geneva, Switzerland", note: "Sep 19-20" },
  { label: "Dubai Sail Grand Prix", date: "2026-11-21", location: "Dubai, UAE", note: "Nov 21-22" },
  { label: "Abu Dhabi Grand Final", date: "2026-11-28", location: "Abu Dhabi, UAE", note: "Nov 28-29" },
];
const nwslEvents: ScheduleEntry[] = [
  { label: "Regular season kickoff", date: "2026-03-13", location: "USA", note: "16 teams, 30-match regular season" },
  { label: "Regular season final day", date: "2026-11-01", location: "USA" },
  { label: "NWSL playoffs begin", date: "2026-11-06", location: "USA" },
  { label: "NWSL Championship", date: "2026-11-21", location: "USA" },
];

const uswntEvents: ScheduleEntry[] = [
  { label: "SheBelieves Cup: USA vs Argentina", date: "2026-03-01", location: "Nashville, TN" },
  { label: "SheBelieves Cup: USA vs Canada", date: "2026-03-04", location: "Columbus, OH" },
  { label: "SheBelieves Cup: USA vs Colombia", date: "2026-03-07", location: "Harrison, NJ" },
  { label: "2027 Women's World Cup prep cycle", date: "2026-09-01", location: "International windows", note: "Use API later for exact friendlies" },
];

const championsLeagueEvents: ScheduleEntry[] = [
  { label: "League phase begins", date: "2026-09-15", location: "Europe", note: "Matchday 1 window" },
  { label: "League phase final matchday", date: "2027-01-27", location: "Europe" },
  { label: "Knockout phase play-offs", date: "2027-02-16", location: "Europe", note: "Two-leg ties" },
  { label: "Round of 16", date: "2027-03-09", location: "Europe" },
  { label: "Quarterfinals", date: "2027-04-06", location: "Europe" },
  { label: "Semifinals", date: "2027-04-27", location: "Europe" },
  { label: "Champions League Final", date: "2027-06-05", location: "Europe" },
];

const trackFieldEvents: ScheduleEntry[] = [
  { label: "Diamond League summer stretch", date: "2026-07-10", location: "Global", note: "Elite meet season" },
  { label: "USATF Outdoor Championships window", date: "2027-06-24", location: "United States", note: "US national outdoor title window" },
  { label: "World Athletics Championships", date: "2027-09-11", location: "Beijing, China", note: "Sep 11-19, 2027" },
  { label: "LA28 athletics", date: "2028-07-14", location: "Los Angeles", note: "Olympic track & field anchor" },
];

const cyclingEvents: ScheduleEntry[] = [
  { label: "Giro d'Italia", date: "2026-05-08", location: "Italy", note: "Grand Tour window" },
  { label: "Tour de France", date: "2026-07-04", location: "France / Barcelona start", note: "Jul 4-26" },
  { label: "Vuelta a Espana", date: "2026-08-22", location: "Spain", note: "Grand Tour window" },
  { label: "UCI Road World Championships", date: "2026-09-20", location: "Montreal, Canada", note: "Sep 20-27" },
  { label: "Tour de Suisse", date: "2027-06-06", location: "Switzerland", note: "Swiss cycling anchor" },
];
const megaEvents: MegaEvent[] = [
  {
    title: "FIFA World Cup 2026",
    date: "2026-06-11",
    location: "USA, Mexico, Canada",
    note: "Biggest men's World Cup yet; US hosts 11 of 16 host cities and the final is in New York/New Jersey.",
  },
  {
    title: "LA28 Olympic Games",
    date: "2028-07-14",
    location: "Los Angeles + select US venues",
    note: "Summer Olympics return to the US, with opening ceremony and events across LA.",
  },
  {
    title: "LA28 Paralympic Games",
    date: "2028-08-15",
    location: "Los Angeles",
    note: "Paralympics follow the Olympics and should be tracked as their own mega event.",
  },
  {
    title: "FIFA Women's World Cup 2031",
    date: "2031-01-01",
    location: "United States, Mexico, Costa Rica, Jamaica",
    note: "The US is part of the sole 2031 bid, with Mexico, Costa Rica and Jamaica also included; final FIFA Congress approval is expected in 2026.",
  },
  {
    title: "Men's Rugby World Cup 2031",
    date: "2031-09-01",
    location: "United States",
    note: "First Rugby World Cup hosted in the Americas; exact dates and cities still to be finalized.",
  },
  {
    title: "Women's Rugby World Cup 2033",
    date: "2033-01-01",
    location: "United States",
    note: "Women's Rugby World Cup is awarded to the US after the men's 2031 tournament.",
  },
  {
    title: "Utah 2034 Winter Olympics",
    date: "2034-02-10",
    location: "Utah",
    note: "Winter Olympics return to Salt Lake City/Utah from February 10-26, 2034.",
  },
];

const items: SportsItem[] = [
  {
    id: "world-cup-2026",
    title: "FIFA World Cup 2026",
    sport: "Soccer",
    region: "Global",
    seasonStart: "2026-06-11",
    seasonEnd: "2026-07-19",
    keyDate: "2026-07-19",
    keyDateLabel: "World Cup Final",
    phases: ["Group stage", "Round of 32", "Round of 16", "Quarterfinals", "Semifinals", "Final"],
    timezone: "Global",
    note: "Grosses Soccer-Highlight in USA, Mexico und Canada. Schweizer und US-Kontext sind beide relevant.",
    source: "curated",
    details: worldCupRounds,
  },
  {
    id: "nfl",
    title: "NFL",
    sport: "Football",
    region: "USA",
    seasonStart: "2026-09-03",
    seasonEnd: "2027-02-14",
    keyDate: "2027-02-14",
    keyDateLabel: "Super Bowl LXI",
    phases: ["Preseason", "Regular Season", "Playoffs", "Super Bowl"],
    timezone: "US",
    note: "US Football calendar with Super Bowl as the peak event.",
    source: "api-ready",
  },
  {
    id: "march-madness",
    title: "NCAA March Madness",
    sport: "Basketball",
    region: "USA",
    seasonStart: "2026-03-17",
    seasonEnd: "2026-04-06",
    keyDate: "2026-04-06",
    keyDateLabel: "National Championship",
    phases: ["First Four", "Sweet 16", "Final Four", "Championship"],
    timezone: "US",
    note: "College basketball tournament window, separate from regular NCAA season.",
    source: "curated",
  },
  {
    id: "nba",
    title: "NBA",
    sport: "Basketball",
    region: "USA",
    seasonStart: "2026-10-20",
    seasonEnd: "2027-06-20",
    keyDate: "2027-06-20",
    keyDateLabel: "NBA Finals window",
    phases: ["Regular Season", "Play-In", "Playoffs", "Finals"],
    timezone: "US",
    note: "Useful for following the long winter season into early summer.",
    source: "api-ready",
  },
  {
    id: "mlb",
    title: "MLB",
    sport: "Baseball",
    region: "USA",
    seasonStart: "2026-03-26",
    seasonEnd: "2026-11-04",
    keyDate: "2026-10-23",
    keyDateLabel: "World Series starts",
    phases: ["Opening Day", "All-Star Break", "Postseason", "World Series"],
    timezone: "US",
    note: "Baseball season runs through spring, summer, and fall.",
    source: "api-ready",
  },
  {
    id: "nhl",
    title: "NHL",
    sport: "Ice Hockey",
    region: "USA",
    seasonStart: "2026-10-07",
    seasonEnd: "2027-06-22",
    keyDate: "2027-06-20",
    keyDateLabel: "Stanley Cup Final window",
    phases: ["Regular Season", "Playoffs", "Stanley Cup Final"],
    timezone: "US",
    note: "North American hockey with clear playoff focus.",
    source: "api-ready",
  },
  {
    id: "college-football",
    title: "College Football",
    sport: "Football",
    region: "USA",
    seasonStart: "2026-08-29",
    seasonEnd: "2027-01-19",
    keyDate: "2027-01-19",
    keyDateLabel: "CFP National Championship",
    phases: ["Regular Season", "Conference Championships", "Bowls", "CFP"],
    timezone: "US",
    note: "Adds the big Saturday autumn calendar that NFL alone misses.",
    source: "curated",
  },
  {
    id: "nwsl",
    title: "NWSL",
    sport: "Soccer",
    region: "USA",
    seasonStart: "2026-03-13",
    seasonEnd: "2026-11-21",
    keyDate: "2026-11-21",
    keyDateLabel: "NWSL Championship",
    phases: ["Regular season", "Playoffs", "Championship"],
    timezone: "US",
    note: "Top-tier US women's club soccer with 16 teams and a full spring-to-fall season.",
    source: "curated",
    details: nwslEvents,
  },
  {
    id: "uswnt",
    title: "USWNT",
    sport: "Soccer",
    region: "USA",
    seasonStart: "2026-01-01",
    seasonEnd: "2026-12-31",
    keyDate: "2026-09-01",
    keyDateLabel: "International windows / 2027 prep",
    phases: ["SheBelieves Cup", "Friendlies", "Tournament prep", "World Cup cycle"],
    timezone: "US",
    note: "US Women's National Team calendar layer for friendlies, SheBelieves Cup and tournament prep.",
    source: "curated",
    details: uswntEvents,
  },
  {
    id: "mls",
    title: "MLS",
    sport: "Soccer",
    region: "USA",
    seasonStart: "2026-02-21",
    seasonEnd: "2026-12-05",
    keyDate: "2026-12-05",
    keyDateLabel: "MLS Cup target window",
    phases: ["Regular Season", "Leagues Cup", "Playoffs", "MLS Cup"],
    timezone: "US",
    note: "US soccer calendar, especially useful around playoffs.",
    source: "api-ready",
  },
  {
    id: "champions-league",
    title: "UEFA Champions League",
    sport: "Soccer",
    region: "Global",
    seasonStart: "2026-09-15",
    seasonEnd: "2027-06-05",
    keyDate: "2027-06-05",
    keyDateLabel: "Champions League Final",
    phases: ["League phase", "Knockout play-offs", "Round of 16", "Quarterfinals", "Semifinals", "Final"],
    timezone: "Global",
    note: "Europe's top club competition, useful for weekday soccer nights and final planning.",
    source: "curated",
    details: championsLeagueEvents,
  },  {
    id: "super-league",
    title: "Swiss Super League",
    sport: "Soccer",
    region: "Schweiz",
    seasonStart: "2026-07-18",
    seasonEnd: "2027-05-30",
    keyDate: "2027-05-30",
    keyDateLabel: "Finalrunde / Saisonfinal",
    phases: ["Hinrunde", "Winterpause", "Championship/Relegation Group", "Finalrunde"],
    timezone: "CH",
    note: "Schwiizer Fussball im Liga-Modus, guet fuer Weekend-Planig.",
    source: "api-ready",
  },
  {
    id: "challenge-league",
    title: "Swiss Challenge League",
    sport: "Soccer",
    region: "Schweiz",
    seasonStart: "2026-07-18",
    seasonEnd: "2027-05-30",
    keyDate: "2027-05-30",
    keyDateLabel: "Aufstieg / Barrage window",
    phases: ["Hinrunde", "Winterpause", "Rueckrunde", "Barrage"],
    timezone: "CH",
    note: "Optional, but important if Swiss football depth matters.",
    source: "curated",
  },
  {
    id: "national-league",
    title: "National League",
    sport: "Ice Hockey",
    region: "Schweiz",
    seasonStart: "2026-09-08",
    seasonEnd: "2027-04-30",
    keyDate: "2027-04-30",
    keyDateLabel: "Playoff Final window",
    phases: ["Regular Season", "Play-In", "Playoffs", "Final"],
    timezone: "CH",
    note: "Schwiizer Iishockey-Saison mit Playoff-Schwerpunkt.",
    source: "api-ready",
  },
  {
    id: "swiss-cup",
    title: "Swiss Cup",
    sport: "Soccer",
    region: "Schweiz",
    seasonStart: "2026-08-15",
    seasonEnd: "2027-06-06",
    keyDate: "2027-06-06",
    keyDateLabel: "Cup Final",
    phases: ["Early rounds", "Quarterfinal", "Semifinal", "Final"],
    timezone: "CH",
    note: "Knockout-Wettbewerb als eigene Rubrik neben der Liga.",
    source: "curated",
  },
  {
    id: "swiss-indoors",
    title: "Swiss Indoors Basel",
    sport: "Tennis",
    region: "Schweiz",
    seasonStart: "2026-10-24",
    seasonEnd: "2026-11-01",
    keyDate: "2026-11-01",
    keyDateLabel: "Final in Basel",
    phases: ["Qualifying", "Main Draw", "Semifinals", "Final"],
    timezone: "CH",
    note: "Basel-spezifisches Highlight im Tennis-Kalender.",
    source: "curated",
  },
  {
    id: "tennis-majors",
    title: "Tennis Grand Slams",
    sport: "Tennis",
    region: "Global",
    seasonStart: "2026-01-12",
    seasonEnd: "2026-09-13",
    keyDate: "2026-08-31",
    keyDateLabel: "US Open stretch",
    phases: ["Australian Open", "Roland-Garros", "Wimbledon", "US Open"],
    timezone: "Global",
    note: "Global tennis anchors, with majors as calendar markers.",
    source: "curated",
  },
  {
    id: "golf-majors",
    title: "Golf Majors",
    sport: "Golf",
    region: "Global",
    seasonStart: "2026-04-09",
    seasonEnd: "2026-07-19",
    keyDate: "2026-04-12",
    keyDateLabel: "Masters Sunday",
    phases: ["Masters", "PGA Championship", "U.S. Open", "The Open"],
    timezone: "Global",
    note: "Four majors as the clean first version for golf.",
    source: "curated",
  },
  {
    id: "f1",
    title: "Formula 1",
    sport: "Motorsport",
    region: "Global",
    seasonStart: "2026-03-08",
    seasonEnd: "2026-12-06",
    keyDate: "2026-07-05",
    keyDateLabel: "British GP race day",
    phases: ["Opening races", "European summer", "Flyaways", "Finale"],
    timezone: "Global",
    note: "Click here to see individual race dates and locations.",
    source: "curated",
    details: f1Races,
  },
  {
    id: "ufc",
    title: "UFC",
    sport: "Combat Sports",
    region: "USA",
    seasonStart: "2026-01-24",
    seasonEnd: "2026-12-31",
    keyDate: "2026-07-11",
    keyDateLabel: "UFC 329",
    phases: ["Fight Nights", "PPV cards", "International Fight Week", "Title fights"],
    timezone: "US",
    note: "Major UFC cards and Fight Nights, with upcoming US-heavy events first.",
    source: "curated",
    details: ufcEvents,
  },
  {
    id: "sailgp",
    title: "SailGP",
    sport: "Sailing",
    region: "Global",
    seasonStart: "2026-01-17",
    seasonEnd: "2026-11-29",
    keyDate: "2026-09-19",
    keyDateLabel: "Switzerland Sail Grand Prix",
    phases: ["Global events", "Fleet racing", "Finals", "Grand Final"],
    timezone: "Global",
    note: "Global F50 racing calendar, including the Geneva Switzerland Sail Grand Prix.",
    source: "curated",
    details: sailGpEvents,
  },
  {
    id: "track-field",
    title: "Track & Field",
    sport: "Track & Field",
    region: "Global",
    seasonStart: "2026-07-10",
    seasonEnd: "2028-08-02",
    keyDate: "2027-09-11",
    keyDateLabel: "World Athletics Championships",
    phases: ["Diamond League", "National championships", "World Championships", "Olympics"],
    timezone: "Global",
    note: "Major athletics meets, US championship windows and the road to LA28.",
    source: "curated",
    details: trackFieldEvents,
  },
  {
    id: "cycling",
    title: "Cycling",
    sport: "Cycling",
    region: "Global",
    seasonStart: "2026-05-08",
    seasonEnd: "2026-09-27",
    keyDate: "2026-07-04",
    keyDateLabel: "Tour de France starts",
    phases: ["Giro", "Tour de France", "Vuelta", "World Championships", "Tour de Suisse"],
    timezone: "Global",
    note: "Grand Tours, World Championships and Swiss cycling anchors.",
    source: "curated",
    details: cyclingEvents,
  },  {
    id: "ryder-presidents",
    title: "Ryder / Presidents Cup",
    sport: "Golf",
    region: "Global",
    seasonStart: "2026-09-24",
    seasonEnd: "2026-09-27",
    keyDate: "2026-09-27",
    keyDateLabel: "Team golf final day",
    phases: ["Practice", "Fourballs", "Foursomes", "Singles"],
    timezone: "Global",
    note: "Included as an important extra when team golf is in season.",
    source: "curated",
  },
];

const missingSuggestions = [
  "UFC / Boxing fight nights",
  "WNBA",
  "LPGA and womens golf majors",
  "Rugby World Cup / major rugby windows",
  "Volleyball Nations League / LOVB",
  "Olympics / World Championships",
  "Ski Alpin, Schwingen oder Radsport fuer Schweiz",
  "Europa League / Conference League",
];

const regionOptions: Array<Region | "All"> = ["All", "USA", "Schweiz", "Global"];
const sportOptions: Array<Sport | "All"> = [
  "All",
  "Football",
  "Basketball",
  "Baseball",
  "Soccer",
  "Ice Hockey",
  "Tennis",
  "Golf",
  "Motorsport",
  "Combat Sports",
  "Sailing",
  "Track & Field",
  "Cycling",
  "Extras",
];

function parseDate(value: string) {
  return new Date(`${value}T12:00:00`);
}

function daysUntil(value: string) {
  return Math.ceil((parseDate(value).getTime() - today.getTime()) / MS_PER_DAY);
}

function getStatus(item: SportsItem): Status {
  const start = parseDate(item.seasonStart);
  const end = parseDate(item.seasonEnd);
  const keyIn = daysUntil(item.keyDate);
  if (today >= start && today <= end) {
    if (keyIn >= 0 && keyIn <= 30) return "major event soon";
    return "active now";
  }
  if (today < start) return "upcoming";
  return "off-season";
}

function formatDate(value: string, timezone: SportsItem["timezone"]) {
  const date = parseDate(value);
  const locale = timezone === "US" ? "en-US" : "de-CH";
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function statusLabel(status: Status) {
  const labels: Record<Status, string> = {
    "active now": "Jetzt aktiv",
    upcoming: "Kommt bald",
    "off-season": "Off-season",
    "major event soon": "Highlight bald",
  };
  return labels[status];
}

function regionClass(region: Region) {
  return `region-${region.toLowerCase()}`;
}

function nextDetail(details: ScheduleEntry[] | undefined) {
  if (!details?.length) return undefined;
  return details.find((detail) => daysUntil(detail.date) >= 0) ?? details[details.length - 1];
}

function App() {
  const [region, setRegion] = React.useState<Region | "All">("All");
  const [sport, setSport] = React.useState<Sport | "All">("All");
  const [query, setQuery] = React.useState("");
  const [selectedId, setSelectedId] = React.useState("f1");

  const enriched = React.useMemo(
    () =>
      items
        .map((item) => ({ ...item, status: getStatus(item), keyIn: daysUntil(item.keyDate) }))
        .sort((a, b) => parseDate(a.keyDate).getTime() - parseDate(b.keyDate).getTime()),
    [],
  );

  const filtered = enriched.filter((item) => {
    const matchesRegion = region === "All" || item.region === region;
    const matchesSport = sport === "All" || item.sport === sport;
    const text = `${item.title} ${item.sport} ${item.region} ${item.keyDateLabel}`.toLowerCase();
    return matchesRegion && matchesSport && text.includes(query.toLowerCase());
  });

  const selected = enriched.find((item) => item.id === selectedId) ?? enriched[0];
  const active = enriched.filter((item) => item.status === "active now" || item.status === "major event soon");
  const upcoming = filtered.filter((item) => item.status === "upcoming" || item.status === "major event soon").slice(0, 6);
  const selectedNext = nextDetail(selected.details);

  return (
    <main className="shell">
      <section className="hero">
        <div>
          <p className="eyebrow">USA + Schweiz Sportkalender</p>
          <h1>Sports Dashboard</h1>
          <p className="intro">Was laeuft jetzt, was chunnt als naechsts, und welche Saisonfenster sind wichtig.</p>
        </div>
        <div className="heroStats" aria-label="dashboard summary">
          <div>
            <strong>{active.length}</strong>
            <span>Jetzt aktiv</span>
          </div>
          <div>
            <strong>{items.length}</strong>
            <span>Rubriken</span>
          </div>
          <div>
            <strong>3</strong>
            <span>Regionen</span>
          </div>
        </div>
      </section>

      <section className="toolbar" aria-label="filters">
        <label className="searchBox">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Suche Liga, Event, Sport..." />
        </label>
        <div className="segments" aria-label="region filter">
          {regionOptions.map((option) => (
            <button className={`${region === option ? "selected" : ""} ${option === "Schweiz" ? "swissRegister" : ""} ${option === "Global" ? "globalRegister" : ""}`} key={option} onClick={() => setRegion(option)}>
              {option === "All" ? "Alle" : option}
            </button>
          ))}
        </div>
        <select value={sport} onChange={(event) => setSport(event.target.value as Sport | "All")} aria-label="sport filter">
          {sportOptions.map((option) => (
            <option key={option} value={option}>
              {option === "All" ? "Alle Sportarten" : option}
            </option>
          ))}
        </select>
      </section>

      <section className="sectionHeader">
        <div>
          <p className="eyebrow">Live-Rubrik</p>
          <h2>Now Active</h2>
        </div>
        <span>Click a card or row for details</span>
      </section>

      <section className="activeGrid">
        {active.map((item) => (
          <button className={`featureCard ${regionClass(item.region)} ${selected.id === item.id ? "isSelected" : ""}`} key={item.id} onClick={() => setSelectedId(item.id)}>
            <div className="cardTop">
              <span className={`status ${item.status.replace(/ /g, "-")}`}>{statusLabel(item.status)}</span>
              <span>{item.region}</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.note}</p>
            <div className="metricLine">
              <Trophy size={18} />
              <span>{item.keyDateLabel}</span>
            </div>
            <div className="dateRange">
              {formatDate(item.seasonStart, item.timezone)} - {formatDate(item.seasonEnd, item.timezone)}
            </div>
          </button>
        ))}
      </section>

      <section className={`detailPanel ${regionClass(selected.region)}`} aria-live="polite">
        <div className="detailIntro">
          <p className="eyebrow">Selected</p>
          <h2>{selected.title}</h2>
          <p>{selected.note}</p>
          <div className="detailMeta">
            <span>{selected.region}</span>
            <span>{selected.sport}</span>
            <span>{statusLabel(selected.status)}</span>
          </div>
        </div>
        <div className="detailList">
          <div className="nextUp">
            <strong>{selectedNext ? "Next up" : "Key date"}</strong>
            <span>{selectedNext ? selectedNext.label : selected.keyDateLabel}</span>
            <time>{formatDate(selectedNext?.date ?? selected.keyDate, selected.timezone)}</time>
          </div>
          {(selected.details?.length ? selected.details : selected.phases.map((phase, index) => ({ label: phase, date: selected.keyDate, location: undefined, note: index === 0 ? "Season phase" : undefined }))).map((detail) => (
            <div className="detailRow" key={`${detail.label}-${detail.date}`}>
              <div>
                <strong>{detail.label}</strong>
                <span>{detail.note}</span>
              </div>
              <div className="detailPlace">
                {detail.location ? <MapPin size={15} /> : null}
                <span>{detail.location}</span>
              </div>
              <time>{formatDate(detail.date, selected.timezone)}</time>
            </div>
          ))}
        </div>
      </section>

      <section className="dashboardGrid">
        <div className="panel wide">
          <div className="panelTitle">
            <CalendarDays size={20} />
            <h2>Upcoming Major Events</h2>
          </div>
          <div className="eventList">
            {upcoming.map((item) => (
              <button className={`eventRow ${regionClass(item.region)}`} key={item.id} onClick={() => setSelectedId(item.id)}>
                <div>
                  <strong>{item.keyDateLabel}</strong>
                  <span>
                    {item.title} - {item.sport} - {item.region}
                  </span>
                </div>
                <time>{formatDate(item.keyDate, item.timezone)}</time>
                <ChevronRight size={18} />
              </button>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panelTitle">
            <Globe2 size={20} />
            <h2>Coverage</h2>
          </div>
          <div className="coverage">
            {regionOptions
              .filter((option) => option !== "All")
              .map((option) => (
                <div className={regionClass(option as Region)} key={option}>
                  <span>{option}</span>
                  <strong>{items.filter((item) => item.region === option).length}</strong>
                </div>
              ))}
          </div>
          <p className="muted">Swiss items are red-coded. API-ready entries can later be enriched with scores, tables, and fixtures.</p>
        </div>
      </section>

      <section className="panel full">
        <div className="panelTitle">
          <Clock3 size={20} />
          <h2>Season Windows</h2>
        </div>
        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>Rubrik</th>
                <th>Sport</th>
                <th>Region</th>
                <th>Saison</th>
                <th>Status</th>
                <th>Key Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr className={`${regionClass(item.region)} ${selected.id === item.id ? "selectedRow" : ""}`} key={item.id} onClick={() => setSelectedId(item.id)}>
                  <td>
                    <strong>{item.title}</strong>
                    <span>{item.phases.join(" / ")}</span>
                  </td>
                  <td>{item.sport}</td>
                  <td>{item.region}</td>
                  <td>
                    {formatDate(item.seasonStart, item.timezone)} - {formatDate(item.seasonEnd, item.timezone)}
                  </td>
                  <td>
                    <span className={`status ${item.status.replace(/ /g, "-")}`}>{statusLabel(item.status)}</span>
                  </td>
                  <td>
                    {item.keyDateLabel}
                    <span>{formatDate(item.keyDate, item.timezone)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="missed">
        <div>
          <p className="eyebrow">Did we miss something?</p>
          <h2>Naechsti sinnvolle Rubrike</h2>
        </div>
        <div className="suggestions">
          {missingSuggestions.map((suggestion) => (
            <span key={suggestion}>
              <Plus size={15} />
              {suggestion}
            </span>
          ))}
        </div>
      </section>

      <section className="megaEvents">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Supra big things coming to the US</p>
            <h2>Mega Events Watchlist</h2>
          </div>
          <span>Olympics, World Cups and multi-year anchors</span>
        </div>
        <div className="megaGrid">
          {megaEvents.map((event) => (
            <article className="megaCard" key={event.title}>
              <div>
                <strong>{event.title}</strong>
                <span>{event.location}</span>
              </div>
              <time>{formatDate(event.date, "US")}</time>
              <p>{event.note}</p>
            </article>
          ))}
        </div>
      </section>
      <footer>
        <CheckCircle2 size={18} />
        Works without API key. Curated calendar data first, live providers later.
      </footer>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);