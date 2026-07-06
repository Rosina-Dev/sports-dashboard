import React from "react";
import ReactDOM from "react-dom/client";
import { CalendarDays, CheckCircle2, ChevronRight, Clock3, MapPin, Plus, Search } from "lucide-react";
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
  | "Marathon"
  | "Triathlon"
  | "Paralympics"
  | "Winter Sports"
  | "World Championships"
  | "Cycling"
  | "Extras";
type Status = "active now" | "upcoming" | "off-season" | "major event soon";

type ScheduleEntry = {
  label: string;
  date: string;
  location?: string;
  note?: string;
  url?: string;
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
type LeagueTeam = {
  name: string;
  market: string;
  state: string;
  conference: string;
};

type LeagueRanking = {
  rank: string;
  team: string;
  state: string;
  record: string;
  note: string;
};

type LeagueDepth = {
  title: string;
  note: string;
  rankingLabel: string;
  rankings: LeagueRanking[];
  teams: LeagueTeam[];
};

type NewsItem = {
  title: string;
  league: string;
  note: string;
  url?: string;
};

type LiveSource = {
  id: string;
  label: string;
  league: string;
  url: string;
  status: "ok" | "warning" | "error" | "seeded";
  checkedAt: string;
  httpStatus?: number;
  headline: string;
  summary: string;
  nextAction: string;
};

type LiveSnapshot = {
  schemaVersion: number;
  generatedAt: string;
  cadence: string;
  sources: LiveSource[];
  newsItems: NewsItem[];
  notes: string[];
};

const today = new Date();
const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
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
  { label: "Round of 16: Brazil vs Norway", date: "2026-07-05", location: "New York New Jersey Stadium", note: "Today, 4:00 PM ET" },
  { label: "Round of 16: Mexico vs England", date: "2026-07-05", location: "Estadio Azteca, Mexico City", note: "Today, 8:00 PM ET" },
  { label: "Round of 16: USA vs Belgium", date: "2026-07-06", location: "North America", note: "Date/time TBD in dashboard data" },
  { label: "Round of 16: Portugal vs Spain", date: "2026-07-06", location: "North America", note: "Date/time TBD in dashboard data" },
  { label: "Round of 16: Argentina vs Egypt", date: "2026-07-07", location: "North America", note: "Date/time TBD in dashboard data" },
  { label: "Round of 16: Switzerland vs Colombia", date: "2026-07-07", location: "North America", note: "Date/time TBD in dashboard data" },
  { label: "Quarterfinals", date: "2026-07-09", location: "North America", note: "July 9-11" },
  { label: "Semifinals", date: "2026-07-14", location: "North America", note: "July 14-15" },
  { label: "Third-place match", date: "2026-07-18", location: "North America" },
  { label: "Final", date: "2026-07-19", location: "New York New Jersey Stadium", note: "World Cup Final" },
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

const tennisMajorEvents: ScheduleEntry[] = [
  { label: "Australian Open", date: "2026-01-12", location: "Melbourne", note: "Grand Slam hard-court major", url: "https://ausopen.com/" },
  { label: "Roland-Garros", date: "2026-05-24", location: "Paris", note: "Grand Slam clay-court major", url: "https://www.rolandgarros.com/" },
  { label: "Wimbledon: daily order of play", date: "2026-07-05", location: "London", note: "Active now; open schedule for today's matches and courts", url: "https://www.wimbledon.com/en_GB/scores/schedule/index.html" },
  { label: "Wimbledon finals weekend", date: "2026-07-11", location: "London", note: "Ladies' final July 11; men's final July 12", url: "https://www.wimbledon.com/" },
  { label: "US Open qualifying", date: "2026-08-24", location: "New York", note: "Qualifying week", url: "https://www.usopen.org/" },
  { label: "US Open main draw", date: "2026-08-31", location: "New York", note: "Grand Slam hard-court major, Aug 31-Sep 13", url: "https://www.usopen.org/" },
  { label: "WTA Finals", date: "2026-11-08", location: "Indian Wells, California", note: "Season-ending WTA championship, Nov 8-15", url: "https://www.wtatennis.com/" },
  { label: "ATP Finals", date: "2026-11-15", location: "Turin", note: "Season-ending ATP championship window", url: "https://www.nittoatpfinals.com/" },
];

const swissTennisEvents: ScheduleEntry[] = [
  { label: "Swiss Open Gstaad", date: "2026-07-13", location: "Gstaad, Switzerland", note: "ATP clay event after Wimbledon", url: "https://swissopengstaad.ch/" },
  { label: "Swiss Indoors qualifying", date: "2026-10-24", location: "Basel", note: "Basel tournament opening weekend", url: "https://www.swissindoorsbasel.ch/" },
  { label: "Swiss Indoors final", date: "2026-11-01", location: "Basel", note: "Basel final", url: "https://www.swissindoorsbasel.ch/" },
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

const worldMarathonMajorEvents: ScheduleEntry[] = [
  { label: "Tokyo Marathon", date: "2026-03-01", location: "Tokyo", note: "World Marathon Major", url: "https://www.worldmarathonmajors.com/" },
  { label: "Boston Marathon", date: "2026-04-20", location: "Boston", note: "World Marathon Major", url: "https://www.baa.org/" },
  { label: "London Marathon", date: "2026-04-26", location: "London", note: "World Marathon Major", url: "https://www.tcslondonmarathon.com/" },
  { label: "Sydney Marathon", date: "2026-08-30", location: "Sydney", note: "World Marathon Major", url: "https://tcssydneymarathon.com/" },
  { label: "Berlin Marathon", date: "2026-09-27", location: "Berlin", note: "World Marathon Major", url: "https://www.bmw-berlin-marathon.com/" },
  { label: "Chicago Marathon", date: "2026-10-11", location: "Chicago", note: "World Marathon Major", url: "https://www.chicagomarathon.com/" },
  { label: "New York City Marathon", date: "2026-11-01", location: "New York City", note: "World Marathon Major", url: "https://www.nyrr.org/tcsnycmarathon" },
];

const ironmanEvents: ScheduleEntry[] = [
  { label: "IRONMAN World Championship", date: "2026-10-10", location: "Kailua-Kona, Hawaii", note: "Men's and women's championship returns to Kona in 2026", url: "https://www.ironman.com/im-world-championship" },
  { label: "IRONMAN 70.3 World Championship", date: "2026-11-14", location: "Global championship", note: "Track final date/location from IRONMAN", url: "https://www.ironman.com/im703-world-championship" },
];

const paraAndOlympicEvents: ScheduleEntry[] = [
  { label: "Milan Cortina 2026 Winter Olympics", date: "2026-02-06", location: "Italy", note: "Winter Olympics window: Feb 6-22, 2026", url: "https://olympics.com/en/olympic-games/milano-cortina-2026" },
  { label: "Milan Cortina 2026 Winter Paralympics", date: "2026-03-06", location: "Italy", note: "Winter Paralympics window: Mar 6-15, 2026", url: "https://www.paralympic.org/milano-cortina-2026" },
  { label: "LA28 Olympic Games", date: "2028-07-14", location: "Los Angeles", note: "Summer Olympics return to the US", url: "https://la28.org/" },
  { label: "LA28 Paralympic Games", date: "2028-08-15", location: "Los Angeles", note: "Summer Paralympics in Los Angeles", url: "https://la28.org/" },
  { label: "Utah 2034 Winter Olympics", date: "2034-02-10", location: "Utah", note: "Future US Winter Games anchor", url: "https://olympics.com/" },
];

const worldChampionshipEvents: ScheduleEntry[] = [
  { label: "World Aquatics Championships", date: "2027-06-26", location: "Budapest, Hungary", note: "Global swimming/diving/water polo/open-water championship window", url: "https://www.worldaquatics.com/" },
  { label: "World Athletics Championships", date: "2027-09-11", location: "Beijing, China", note: "Sep 11-19, 2027", url: "https://worldathletics.org/" },
  { label: "UCI Road World Championships", date: "2026-09-20", location: "Montreal, Canada", note: "Road cycling world championships", url: "https://www.uci.org/" },
];

const leagueDepths: Record<string, LeagueDepth> = {
  mls: {
    title: "MLS league depth",
    note: "Use this as a quick map of the league: team location first, then a standings snapshot for orientation.",
    rankingLabel: "Standings snapshot",
    rankings: [
      { rank: "1", team: "Philadelphia Union", state: "Pennsylvania", record: "East leader", note: "Top Eastern Conference pace" },
      { rank: "2", team: "Inter Miami CF", state: "Florida", record: "East contender", note: "High-attention club and playoff watch" },
      { rank: "3", team: "FC Cincinnati", state: "Ohio", record: "East contender", note: "Regular playoff-level benchmark" },
      { rank: "4", team: "LAFC", state: "California", record: "West leader", note: "Western Conference pace team" },
      { rank: "5", team: "Vancouver Whitecaps FC", state: "British Columbia", record: "West contender", note: "Canadian and Cascadia context" },
    ],
    teams: [
      { name: "Atlanta United FC", market: "Atlanta", state: "Georgia", conference: "East" },
      { name: "Austin FC", market: "Austin", state: "Texas", conference: "West" },
      { name: "Charlotte FC", market: "Charlotte", state: "North Carolina", conference: "East" },
      { name: "Chicago Fire FC", market: "Chicago", state: "Illinois", conference: "East" },
      { name: "FC Cincinnati", market: "Cincinnati", state: "Ohio", conference: "East" },
      { name: "Colorado Rapids", market: "Commerce City/Denver", state: "Colorado", conference: "West" },
      { name: "Columbus Crew", market: "Columbus", state: "Ohio", conference: "East" },
      { name: "D.C. United", market: "Washington", state: "District of Columbia", conference: "East" },
      { name: "FC Dallas", market: "Frisco/Dallas", state: "Texas", conference: "West" },
      { name: "Houston Dynamo FC", market: "Houston", state: "Texas", conference: "West" },
      { name: "Inter Miami CF", market: "Fort Lauderdale/Miami", state: "Florida", conference: "East" },
      { name: "LA Galaxy", market: "Carson/Los Angeles", state: "California", conference: "West" },
      { name: "LAFC", market: "Los Angeles", state: "California", conference: "West" },
      { name: "Minnesota United FC", market: "Saint Paul/Minneapolis", state: "Minnesota", conference: "West" },
      { name: "CF Montreal", market: "Montreal", state: "Quebec", conference: "East" },
      { name: "Nashville SC", market: "Nashville", state: "Tennessee", conference: "East" },
      { name: "New England Revolution", market: "Foxborough/Boston", state: "Massachusetts", conference: "East" },
      { name: "New York City FC", market: "New York City", state: "New York", conference: "East" },
      { name: "New York Red Bulls", market: "Harrison/New York", state: "New Jersey", conference: "East" },
      { name: "Orlando City SC", market: "Orlando", state: "Florida", conference: "East" },
      { name: "Philadelphia Union", market: "Chester/Philadelphia", state: "Pennsylvania", conference: "East" },
      { name: "Portland Timbers", market: "Portland", state: "Oregon", conference: "West" },
      { name: "Real Salt Lake", market: "Sandy/Salt Lake City", state: "Utah", conference: "West" },
      { name: "San Diego FC", market: "San Diego", state: "California", conference: "West" },
      { name: "San Jose Earthquakes", market: "San Jose", state: "California", conference: "West" },
      { name: "Seattle Sounders FC", market: "Seattle", state: "Washington", conference: "West" },
      { name: "Sporting Kansas City", market: "Kansas City", state: "Kansas", conference: "West" },
      { name: "St. Louis City SC", market: "St. Louis", state: "Missouri", conference: "West" },
      { name: "Toronto FC", market: "Toronto", state: "Ontario", conference: "East" },
      { name: "Vancouver Whitecaps FC", market: "Vancouver", state: "British Columbia", conference: "West" },
    ],
  },
  mlb: {
    title: "MLB league depth",
    note: "Baseball is active now; this snapshot highlights division leaders and lets you map all clubs by state/province.",
    rankingLabel: "Division-leader snapshot",
    rankings: [
      { rank: "AL East", team: "New York Yankees", state: "New York", record: "Division race", note: "Typical high-leverage AL East benchmark" },
      { rank: "AL Central", team: "Cleveland Guardians", state: "Ohio", record: "Division race", note: "Central contender watch" },
      { rank: "AL West", team: "Houston Astros", state: "Texas", record: "Division race", note: "West benchmark club" },
      { rank: "NL East", team: "Atlanta Braves", state: "Georgia", record: "Division race", note: "East contender watch" },
      { rank: "NL Central", team: "Chicago Cubs", state: "Illinois", record: "Division race", note: "Central contender watch" },
      { rank: "NL West", team: "Los Angeles Dodgers", state: "California", record: "Division race", note: "West benchmark club" },
    ],
    teams: [
      { name: "Arizona Diamondbacks", market: "Phoenix", state: "Arizona", conference: "NL West" },
      { name: "Atlanta Braves", market: "Atlanta", state: "Georgia", conference: "NL East" },
      { name: "Baltimore Orioles", market: "Baltimore", state: "Maryland", conference: "AL East" },
      { name: "Boston Red Sox", market: "Boston", state: "Massachusetts", conference: "AL East" },
      { name: "Chicago Cubs", market: "Chicago", state: "Illinois", conference: "NL Central" },
      { name: "Chicago White Sox", market: "Chicago", state: "Illinois", conference: "AL Central" },
      { name: "Cincinnati Reds", market: "Cincinnati", state: "Ohio", conference: "NL Central" },
      { name: "Cleveland Guardians", market: "Cleveland", state: "Ohio", conference: "AL Central" },
      { name: "Colorado Rockies", market: "Denver", state: "Colorado", conference: "NL West" },
      { name: "Detroit Tigers", market: "Detroit", state: "Michigan", conference: "AL Central" },
      { name: "Houston Astros", market: "Houston", state: "Texas", conference: "AL West" },
      { name: "Kansas City Royals", market: "Kansas City", state: "Missouri", conference: "AL Central" },
      { name: "Los Angeles Angels", market: "Anaheim/Los Angeles", state: "California", conference: "AL West" },
      { name: "Los Angeles Dodgers", market: "Los Angeles", state: "California", conference: "NL West" },
      { name: "Miami Marlins", market: "Miami", state: "Florida", conference: "NL East" },
      { name: "Milwaukee Brewers", market: "Milwaukee", state: "Wisconsin", conference: "NL Central" },
      { name: "Minnesota Twins", market: "Minneapolis", state: "Minnesota", conference: "AL Central" },
      { name: "New York Mets", market: "New York City", state: "New York", conference: "NL East" },
      { name: "New York Yankees", market: "New York City", state: "New York", conference: "AL East" },
      { name: "Athletics", market: "West Sacramento", state: "California", conference: "AL West" },
      { name: "Philadelphia Phillies", market: "Philadelphia", state: "Pennsylvania", conference: "NL East" },
      { name: "Pittsburgh Pirates", market: "Pittsburgh", state: "Pennsylvania", conference: "NL Central" },
      { name: "San Diego Padres", market: "San Diego", state: "California", conference: "NL West" },
      { name: "San Francisco Giants", market: "San Francisco", state: "California", conference: "NL West" },
      { name: "Seattle Mariners", market: "Seattle", state: "Washington", conference: "AL West" },
      { name: "St. Louis Cardinals", market: "St. Louis", state: "Missouri", conference: "NL Central" },
      { name: "Tampa Bay Rays", market: "Tampa Bay", state: "Florida", conference: "AL East" },
      { name: "Texas Rangers", market: "Arlington/Dallas-Fort Worth", state: "Texas", conference: "AL West" },
      { name: "Toronto Blue Jays", market: "Toronto", state: "Ontario", conference: "AL East" },
      { name: "Washington Nationals", market: "Washington", state: "District of Columbia", conference: "NL East" },
    ],
  },
  nba: {
    title: "NBA league depth",
    note: "NBA is between seasons here, so the snapshot is a context layer for the next season rather than a live table.",
    rankingLabel: "Context snapshot",
    rankings: [
      { rank: "1", team: "Oklahoma City Thunder", state: "Oklahoma", record: "Title-core watch", note: "Recent benchmark for young-contender depth" },
      { rank: "2", team: "Boston Celtics", state: "Massachusetts", record: "East contender", note: "Perennial top-tier East context" },
      { rank: "3", team: "Denver Nuggets", state: "Colorado", record: "West contender", note: "Championship-core benchmark" },
      { rank: "4", team: "Minnesota Timberwolves", state: "Minnesota", record: "West contender", note: "Defense and playoff-depth watch" },
      { rank: "5", team: "New York Knicks", state: "New York", record: "East contender", note: "Big-market playoff watch" },
    ],
    teams: [
      { name: "Atlanta Hawks", market: "Atlanta", state: "Georgia", conference: "East" },
      { name: "Boston Celtics", market: "Boston", state: "Massachusetts", conference: "East" },
      { name: "Brooklyn Nets", market: "Brooklyn/New York", state: "New York", conference: "East" },
      { name: "Charlotte Hornets", market: "Charlotte", state: "North Carolina", conference: "East" },
      { name: "Chicago Bulls", market: "Chicago", state: "Illinois", conference: "East" },
      { name: "Cleveland Cavaliers", market: "Cleveland", state: "Ohio", conference: "East" },
      { name: "Dallas Mavericks", market: "Dallas", state: "Texas", conference: "West" },
      { name: "Denver Nuggets", market: "Denver", state: "Colorado", conference: "West" },
      { name: "Detroit Pistons", market: "Detroit", state: "Michigan", conference: "East" },
      { name: "Golden State Warriors", market: "San Francisco", state: "California", conference: "West" },
      { name: "Houston Rockets", market: "Houston", state: "Texas", conference: "West" },
      { name: "Indiana Pacers", market: "Indianapolis", state: "Indiana", conference: "East" },
      { name: "LA Clippers", market: "Inglewood/Los Angeles", state: "California", conference: "West" },
      { name: "Los Angeles Lakers", market: "Los Angeles", state: "California", conference: "West" },
      { name: "Memphis Grizzlies", market: "Memphis", state: "Tennessee", conference: "West" },
      { name: "Miami Heat", market: "Miami", state: "Florida", conference: "East" },
      { name: "Milwaukee Bucks", market: "Milwaukee", state: "Wisconsin", conference: "East" },
      { name: "Minnesota Timberwolves", market: "Minneapolis", state: "Minnesota", conference: "West" },
      { name: "New Orleans Pelicans", market: "New Orleans", state: "Louisiana", conference: "West" },
      { name: "New York Knicks", market: "New York City", state: "New York", conference: "East" },
      { name: "Oklahoma City Thunder", market: "Oklahoma City", state: "Oklahoma", conference: "West" },
      { name: "Orlando Magic", market: "Orlando", state: "Florida", conference: "East" },
      { name: "Philadelphia 76ers", market: "Philadelphia", state: "Pennsylvania", conference: "East" },
      { name: "Phoenix Suns", market: "Phoenix", state: "Arizona", conference: "West" },
      { name: "Portland Trail Blazers", market: "Portland", state: "Oregon", conference: "West" },
      { name: "Sacramento Kings", market: "Sacramento", state: "California", conference: "West" },
      { name: "San Antonio Spurs", market: "San Antonio", state: "Texas", conference: "West" },
      { name: "Toronto Raptors", market: "Toronto", state: "Ontario", conference: "East" },
      { name: "Utah Jazz", market: "Salt Lake City", state: "Utah", conference: "West" },
      { name: "Washington Wizards", market: "Washington", state: "District of Columbia", conference: "East" },
    ],
  },
  nhl: {
    title: "NHL league depth",
    note: "NHL is between seasons here, so this is a compact map and contender context for the next hockey season.",
    rankingLabel: "Context snapshot",
    rankings: [
      { rank: "1", team: "Florida Panthers", state: "Florida", record: "Cup-core watch", note: "Recent top benchmark" },
      { rank: "2", team: "Edmonton Oilers", state: "Alberta", record: "West contender", note: "High-end star-power benchmark" },
      { rank: "3", team: "Dallas Stars", state: "Texas", record: "West contender", note: "Deep roster watch" },
      { rank: "4", team: "New York Rangers", state: "New York", record: "East contender", note: "Metropolitan benchmark" },
      { rank: "5", team: "Colorado Avalanche", state: "Colorado", record: "West contender", note: "Championship-core context" },
    ],
    teams: [
      { name: "Anaheim Ducks", market: "Anaheim", state: "California", conference: "West" },
      { name: "Boston Bruins", market: "Boston", state: "Massachusetts", conference: "East" },
      { name: "Buffalo Sabres", market: "Buffalo", state: "New York", conference: "East" },
      { name: "Calgary Flames", market: "Calgary", state: "Alberta", conference: "West" },
      { name: "Carolina Hurricanes", market: "Raleigh", state: "North Carolina", conference: "East" },
      { name: "Chicago Blackhawks", market: "Chicago", state: "Illinois", conference: "West" },
      { name: "Colorado Avalanche", market: "Denver", state: "Colorado", conference: "West" },
      { name: "Columbus Blue Jackets", market: "Columbus", state: "Ohio", conference: "East" },
      { name: "Dallas Stars", market: "Dallas", state: "Texas", conference: "West" },
      { name: "Detroit Red Wings", market: "Detroit", state: "Michigan", conference: "East" },
      { name: "Edmonton Oilers", market: "Edmonton", state: "Alberta", conference: "West" },
      { name: "Florida Panthers", market: "Sunrise/Miami", state: "Florida", conference: "East" },
      { name: "Los Angeles Kings", market: "Los Angeles", state: "California", conference: "West" },
      { name: "Minnesota Wild", market: "Saint Paul/Minneapolis", state: "Minnesota", conference: "West" },
      { name: "Montreal Canadiens", market: "Montreal", state: "Quebec", conference: "East" },
      { name: "Nashville Predators", market: "Nashville", state: "Tennessee", conference: "West" },
      { name: "New Jersey Devils", market: "Newark", state: "New Jersey", conference: "East" },
      { name: "New York Islanders", market: "Elmont/New York", state: "New York", conference: "East" },
      { name: "New York Rangers", market: "New York City", state: "New York", conference: "East" },
      { name: "Ottawa Senators", market: "Ottawa", state: "Ontario", conference: "East" },
      { name: "Philadelphia Flyers", market: "Philadelphia", state: "Pennsylvania", conference: "East" },
      { name: "Pittsburgh Penguins", market: "Pittsburgh", state: "Pennsylvania", conference: "East" },
      { name: "San Jose Sharks", market: "San Jose", state: "California", conference: "West" },
      { name: "Seattle Kraken", market: "Seattle", state: "Washington", conference: "West" },
      { name: "St. Louis Blues", market: "St. Louis", state: "Missouri", conference: "West" },
      { name: "Tampa Bay Lightning", market: "Tampa", state: "Florida", conference: "East" },
      { name: "Toronto Maple Leafs", market: "Toronto", state: "Ontario", conference: "East" },
      { name: "Utah Mammoth", market: "Salt Lake City", state: "Utah", conference: "West" },
      { name: "Vancouver Canucks", market: "Vancouver", state: "British Columbia", conference: "West" },
      { name: "Vegas Golden Knights", market: "Las Vegas", state: "Nevada", conference: "West" },
      { name: "Washington Capitals", market: "Washington", state: "District of Columbia", conference: "East" },
      { name: "Winnipeg Jets", market: "Winnipeg", state: "Manitoba", conference: "West" },
    ],
  },
};

const newsItems: NewsItem[] = [
  { title: "World Cup knockout rounds are the main global story", league: "Soccer", note: "Round of 16 matches are active and should lead the dashboard while the tournament is live." },
  { title: "MLB holiday weekend has a full national slate", league: "MLB", note: "Baseball is the biggest US league currently in regular-season action, with all teams in the summer grind." },
  { title: "NBA is in Summer League and offseason mode", league: "NBA", note: "Use team context and offseason movement rather than live standings until the next regular season starts." },
  { title: "NHL is in offseason context mode", league: "NHL", note: "Track roster movement and next-season contender tiers; live standings resume with the regular season." },
  { title: "Tennis and Tour de France remain major global side stories", league: "Global", note: "Wimbledon and the Tour are useful headline anchors alongside the World Cup." },
];
const fallbackLiveSnapshot: LiveSnapshot = {
  schemaVersion: 1,
  generatedAt: "2026-07-06T03:29:36.342Z",
  cadence: "Weekly GitHub Actions refresh: public sports news feeds plus official event-page source checks.",
  sources: [
    { id: "mlb-news", label: "MLB News", league: "MLB", url: "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/news", status: "seeded", checkedAt: "2026-07-06T03:29:36.342Z", headline: "MLB public feed", summary: "Fallback public-source check for baseball headlines.", nextAction: "Refresh baseball headlines and compare against dashboard MLB context." },
    { id: "nba-news", label: "NBA News", league: "NBA", url: "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/news", status: "seeded", checkedAt: "2026-07-06T03:29:36.342Z", headline: "NBA public feed", summary: "Fallback public-source check for NBA offseason headlines.", nextAction: "Refresh offseason and summer-league headline context." },
    { id: "nhl-news", label: "NHL News", league: "NHL", url: "https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/news", status: "seeded", checkedAt: "2026-07-06T03:29:36.342Z", headline: "NHL public feed", summary: "Fallback public-source check for NHL headlines.", nextAction: "Refresh offseason and schedule headline context." },
    { id: "mls-news", label: "MLS News", league: "MLS", url: "https://site.api.espn.com/apis/site/v2/sports/soccer/usa.1/news", status: "seeded", checkedAt: "2026-07-06T03:29:36.342Z", headline: "MLS public feed", summary: "Fallback public-source check for MLS headlines.", nextAction: "Refresh MLS headline context and compare against dashboard standings snapshot." },
    { id: "fifa-world-cup", label: "FIFA World Cup", league: "FIFA", url: "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026", status: "seeded", checkedAt: "2026-07-06T03:29:36.342Z", headline: "FIFA World Cup hub", summary: "Fallback official-source check for major World Cup schedule changes.", nextAction: "Check official World Cup event hub for major schedule/status changes." },
    { id: "wimbledon", label: "Wimbledon", league: "Tennis", url: "https://www.wimbledon.com/en_GB/scores/schedule/index.html", status: "seeded", checkedAt: "2026-07-06T03:29:36.342Z", headline: "Wimbledon order of play", summary: "Fallback official-source check while Wimbledon is active.", nextAction: "Check order of play while Wimbledon is active." },
  ],
  newsItems,
  notes: [
    "The dashboard remains curated for calendar logic, major-event selection, and league context.",
    "This file adds a scheduled public-source freshness layer; it does not replace official league standings APIs.",
  ],
};
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
    phases: ["Round of 16", "Quarterfinals", "Semifinals", "Third-place match", "Final"],
    timezone: "Global",
    note: "Major soccer highlight across the USA, Mexico, and Canada, with both US and Swiss context relevant.",
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
    keyDateLabel: "Final round / season finale",
    phases: ["First half", "Winter break", "Championship/Relegation Group", "Final round"],
    timezone: "CH",
    note: "Swiss football league calendar, useful for weekend planning.",
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
    keyDateLabel: "Promotion / playoff window",
    phases: ["First half", "Winter break", "Second half", "Promotion playoff"],
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
    note: "Swiss ice hockey season with a clear playoff focus.",
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
    note: "Swiss knockout competition tracked separately from the league calendar.",
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
    note: "Basel-specific highlight in the tennis calendar.",
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
  },
  {
    id: "world-marathon-majors",
    title: "World Marathon Majors",
    sport: "Marathon",
    region: "Global",
    seasonStart: "2026-03-01",
    seasonEnd: "2026-11-01",
    keyDate: "2026-08-30",
    keyDateLabel: "Sydney Marathon",
    phases: ["Tokyo", "Boston", "London", "Sydney", "Berlin", "Chicago", "New York City"],
    timezone: "Global",
    note: "The major global marathon circuit, now tracked separately from general track and road running.",
    source: "curated",
    details: worldMarathonMajorEvents,
  },
  {
    id: "ironman",
    title: "IRONMAN / Long-distance Triathlon",
    sport: "Triathlon",
    region: "Global",
    seasonStart: "2026-01-01",
    seasonEnd: "2026-12-31",
    keyDate: "2026-10-10",
    keyDateLabel: "IRONMAN World Championship",
    phases: ["Qualification races", "70.3 worlds", "IRONMAN worlds"],
    timezone: "Global",
    note: "Long-distance triathlon championship layer, with Kona and IRONMAN 70.3 as the main anchors.",
    source: "curated",
    details: ironmanEvents,
  },
  {
    id: "para-olympic-watch",
    title: "Paralympics & Olympic Watch",
    sport: "Paralympics",
    region: "Global",
    seasonStart: "2026-02-06",
    seasonEnd: "2034-02-26",
    keyDate: "2028-08-15",
    keyDateLabel: "LA28 Paralympic Games",
    phases: ["Winter Olympics", "Winter Paralympics", "Summer Olympics", "Summer Paralympics", "Future Winter Games"],
    timezone: "Global",
    note: "Dedicated Olympic and Paralympic watchlist, including winter and summer anchors.",
    source: "curated",
    details: paraAndOlympicEvents,
  },
  {
    id: "winter-olympics",
    title: "Winter Olympics & Winter Sports",
    sport: "Winter Sports",
    region: "Global",
    seasonStart: "2026-02-06",
    seasonEnd: "2034-02-26",
    keyDate: "2034-02-10",
    keyDateLabel: "Utah 2034 Winter Olympics",
    phases: ["Milan Cortina 2026", "Winter Paralympics", "Utah 2034"],
    timezone: "Global",
    note: "Winter Olympics, Winter Paralympics, alpine skiing, and future US winter sport anchors.",
    source: "curated",
    details: paraAndOlympicEvents,
  },
  {
    id: "world-championships",
    title: "World Championships Watchlist",
    sport: "World Championships",
    region: "Global",
    seasonStart: "2026-09-20",
    seasonEnd: "2028-12-31",
    keyDate: "2027-06-26",
    keyDateLabel: "World Aquatics Championships",
    phases: ["Cycling worlds", "Aquatics worlds", "Athletics worlds", "Other global championships"],
    timezone: "Global",
    note: "Cross-sport world championship layer for events that are bigger than a normal season stop.",
    source: "curated",
    details: worldChampionshipEvents,
  },
  {
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
  "Alpine skiing, Schwingen, or more Swiss cycling",
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
  "Marathon",
  "Triathlon",
  "Paralympics",
  "Winter Sports",
  "World Championships",
  "Cycling",
  "Extras",
];

function parseDate(value: string) {
  return new Date(`${value}T12:00:00`);
}

function daysUntil(value: string) {
  const targetDate = parseDate(value);
  const targetDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  return Math.round((targetDay.getTime() - todayDate.getTime()) / MS_PER_DAY);
}

function isToday(value: string) {
  return daysUntil(value) === 0;
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

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(new Date(value));
}
function statusLabel(status: Status) {
  const labels: Record<Status, string> = {
    "active now": "Active now",
    upcoming: "Upcoming",
    "off-season": "Off-season",
    "major event soon": "Major event soon",
  };
  return labels[status];
}

function statusRank(status: Status) {
  const ranks: Record<Status, number> = {
    "major event soon": 0,
    "active now": 1,
    upcoming: 2,
    "off-season": 3,
  };
  return ranks[status];
}

function regionLabel(region: Region) {
  return region === "Schweiz" ? "Switzerland" : region;
}

function regionClass(region: Region) {
  return `region-${region.toLowerCase()}`;
}

function nextDetail(details: ScheduleEntry[] | undefined) {
  if (!details?.length) return undefined;
  return details.find((detail) => daysUntil(detail.date) >= 0) ?? details[details.length - 1];
}

function nextActionDate(item: SportsItem) {
  return nextDetail(item.details)?.date ?? item.keyDate;
}

function App() {
  const [region, setRegion] = React.useState<Region | "All">("All");
  const [sport, setSport] = React.useState<Sport | "All">("All");
  const [query, setQuery] = React.useState("");
  const [selectedId, setSelectedId] = React.useState("world-cup-2026");
  const [liveSnapshot, setLiveSnapshot] = React.useState<LiveSnapshot>(fallbackLiveSnapshot);

  React.useEffect(() => {
    let cancelled = false;
    fetch(`${import.meta.env.BASE_URL}sports-live.json`, { cache: "no-store" })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error(`Sports snapshot returned ${response.status}`)))
      .then((snapshot: LiveSnapshot) => {
        if (!cancelled && Array.isArray(snapshot.sources)) setLiveSnapshot(snapshot);
      })
      .catch(() => {
        if (!cancelled) setLiveSnapshot(fallbackLiveSnapshot);
      });
    return () => { cancelled = true; };
  }, []);

  const enriched = React.useMemo(
    () =>
      items
        .map((item) => ({ ...item, status: getStatus(item), keyIn: daysUntil(nextActionDate(item)) }))
        .sort(
          (a, b) =>
            parseDate(nextActionDate(a)).getTime() - parseDate(nextActionDate(b)).getTime() ||
            statusRank(a.status) - statusRank(b.status) ||
            a.title.localeCompare(b.title),
        ),
    [],
  );

  const visible = enriched.filter((item) => item.status !== "off-season" && daysUntil(nextActionDate(item)) >= 0);

  const filtered = visible.filter((item) => {
    const matchesRegion = region === "All" || item.region === region;
    const matchesSport = sport === "All" || item.sport === sport;
    const text = `${item.title} ${item.sport} ${regionLabel(item.region)} ${item.keyDateLabel}`.toLowerCase();
    return matchesRegion && matchesSport && text.includes(query.toLowerCase());
  });

  const selected = visible.find((item) => item.id === selectedId) ?? visible[0];
  const active = visible.filter((item) => item.status === "active now" || item.status === "major event soon");
  const upcoming = filtered.filter((item) => item.status === "upcoming" || item.status === "major event soon").slice(0, 6);
  const selectedNext = nextDetail(selected.details);
  const selectedToday = selected.details?.filter((detail) => isToday(detail.date)) ?? [];
  const selectedLeagueDepth = leagueDepths[selected.id];
  const liveNewsItems = liveSnapshot.newsItems?.length ? liveSnapshot.newsItems : newsItems;
  const sourceOkCount = liveSnapshot.sources.filter((source) => source.status === "ok").length;
  const sourceStatusLabel = sourceOkCount === liveSnapshot.sources.length
    ? "All scheduled sources checked"
    : sourceOkCount > 0
      ? "Partial scheduled source check"
      : "Scheduled source check pending";

  return (
    <main className="shell">
      <section className="hero">
        <div>
          <p className="eyebrow">USA + Switzerland Sports Calendar</p>
          <h1>Sports Dashboard</h1>
          <p className="intro">Track what is active now, what is coming next, and which season windows matter.</p>
          <a className="athleteLink" href="./swiss-athletes.html">Schweizer Athleten in den USA oeffnen</a>
        </div>
        <div className="heroStats" aria-label="dashboard summary">
          <div>
            <strong>{active.length}</strong>
            <span>Active now</span>
          </div>
          <div>
            <strong>{visible.length}</strong>
            <span>Items</span>
          </div>
          <div>
            <strong>3</strong>
            <span>Regions</span>
          </div>
        </div>
      </section>

      <section className="toolbar" aria-label="filters">
        <label className="searchBox">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search league, event, sport..." />
        </label>
        <div className="segments" aria-label="region filter">
          {regionOptions.map((option) => (
            <button className={`${region === option ? "selected" : ""} ${option === "Schweiz" ? "swissRegister" : ""} ${option === "Global" ? "globalRegister" : ""}`} key={option} onClick={() => setRegion(option)}>
              {option === "All" ? "All" : regionLabel(option)}
            </button>
          ))}
        </div>
        <select value={sport} onChange={(event) => setSport(event.target.value as Sport | "All")} aria-label="sport filter">
          {sportOptions.map((option) => (
            <option key={option} value={option}>
              {option === "All" ? "All sports" : option}
            </option>
          ))}
        </select>
      </section>

      <section className="sectionHeader">
        <div>
          <p className="eyebrow">Calendar</p>
          <h2>Sports & Events</h2>
        </div>
        <span>Select an item to see details</span>
      </section>

      <section className="selectionLayout">
        <div className="itemList" aria-label="sports and events">
          {filtered.map((item) => (
            <button className={`itemRow ${selected.id === item.id ? "isSelected" : ""}`} key={item.id} onClick={() => setSelectedId(item.id)}>
              <div>
                <strong>{item.title}</strong>
                <span>{item.sport} - {item.keyDateLabel}</span>
              </div>
              <div className="itemMeta">
                <span className={`status ${item.status.replace(/ /g, "-")}`}>{statusLabel(item.status)}</span>
                <span className={`regionBadge ${regionClass(item.region)}`}>{regionLabel(item.region)}</span>
              </div>
            </button>
          ))}
        </div>

        <aside className="detailPanel" aria-live="polite">
          <div className="detailIntro">
            <p className="eyebrow">Selected</p>
            <h2>{selected.title}</h2>
            <p>{selected.note}</p>
            <div className="detailMeta">
              <span>{regionLabel(selected.region)}</span>
              <span>{selected.sport}</span>
              <span>{statusLabel(selected.status)}</span>
            </div>
          </div>
          {selectedToday.length ? (
            <div className="todayPanel">
              <strong>Today</strong>
              {selectedToday.map((detail) => (
                <div className="todayMatch" key={`${detail.label}-${detail.date}`}>
                  <span>{detail.label}</span>
                  <time>{formatDate(detail.date, selected.timezone)}</time>
                </div>
              ))}
            </div>
          ) : null}

          <div className="nextUp">
            <strong>{selectedNext ? "Next up" : "Key date"}</strong>
            <span>{selectedNext ? selectedNext.label : selected.keyDateLabel}</span>
            <time>{formatDate(selectedNext?.date ?? selected.keyDate, selected.timezone)}</time>
          </div>
          {selectedLeagueDepth ? (
            <section className="leagueDepth" aria-label={`${selected.title} league depth`}>
              <div>
                <p className="eyebrow">League depth</p>
                <h3>{selectedLeagueDepth.title}</h3>
                <p>{selectedLeagueDepth.note}</p>
              </div>
              <div className="rankingTable" aria-label={selectedLeagueDepth.rankingLabel}>
                <strong>{selectedLeagueDepth.rankingLabel}</strong>
                {selectedLeagueDepth.rankings.map((ranking) => (
                  <div className="rankingRow" key={`${selected.id}-${ranking.rank}-${ranking.team}`}>
                    <span>{ranking.rank}</span>
                    <div>
                      <strong>{ranking.team}</strong>
                      <small>{ranking.state} - {ranking.record}</small>
                    </div>
                    <em>{ranking.note}</em>
                  </div>
                ))}
              </div>
              <div className="teamDirectory">
                <strong>Teams by state/province</strong>
                <div>
                  {selectedLeagueDepth.teams.map((team) => (
                    <span key={`${selected.id}-${team.name}`}>
                      <b>{team.name}</b>
                      <small>{team.market}, {team.state} - {team.conference}</small>
                    </span>
                  ))}
                </div>
              </div>
            </section>
          ) : null}
          <div className="detailList">
            {(selected.details?.length ? selected.details : selected.phases.map((phase, index) => ({ label: phase, date: selected.keyDate, location: undefined, note: index === 0 ? "Season phase" : undefined, url: undefined }))).map((detail) => (
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
        </aside>
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
                    {item.title} - {item.sport} - {regionLabel(item.region)}
                  </span>
                </div>
                <time>{formatDate(item.keyDate, item.timezone)}</time>
                <ChevronRight size={18} />
              </button>
            ))}
          </div>
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
                <th>Item</th>
                <th>Sport</th>
                <th>Region</th>
                <th>Season</th>
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
                  <td>{regionLabel(item.region)}</td>
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
          <h2>Useful additions to consider</h2>
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

      <section className="panel full newsPanel">
        <div className="panelTitle">
          <CalendarDays size={20} />
          <h2>Big-picture Sports News</h2>
        </div>
        <div className="liveStatus">
          <div>
            <strong>{sourceStatusLabel}</strong>
            <span>Last refreshed {formatDateTime(liveSnapshot.generatedAt)}. {liveSnapshot.cadence}</span>
          </div>
          <div className="sourcePills" aria-label="scheduled source checks">
            {liveSnapshot.sources.slice(0, 6).map((source) => (
              <span className={`sourcePill source-${source.status}`} key={source.id}>{source.label}</span>
            ))}
          </div>
        </div>
        <div className="newsGrid">
          {liveNewsItems.map((item) => (
            <article className="newsItem" key={`${item.league}-${item.title}`}>
              <span>{item.league}</span>
              <strong>{item.title}</strong>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="megaEvents">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Major future anchors</p>
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
