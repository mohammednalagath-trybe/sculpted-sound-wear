export type Role = "admin" | "member";

export type Member = {
  id: string;
  userId: string; // site-generated
  tezId: string;
  name: string;
  photo: string;
  rank: string;
  upcomingRank: string;
  reward: string;
  upcomingReward: string;
  leftBV: number;
  rightBV: number;
  contact: string;
  email: string;
  leg: "support-a" | "support-b" | "referrals";
  leaderName: string;
};

export const RANKS = [
  "Associate",
  "Silver",
  "Gold",
  "Platinum",
  "Diamond",
  "Crown",
  "Royal Crown",
] as const;

const photo = (seed: string) =>
  `https://i.pravatar.cc/240?u=${encodeURIComponent(seed)}`;

export const superAdmin: Member = {
  id: "u_000",
  userId: "APX-0001",
  tezId: "TEZ-77820",
  name: "Aravind Menon",
  photo: photo("aravind"),
  rank: "Diamond",
  upcomingRank: "Crown",
  reward: "Bali Leadership Retreat",
  upcomingReward: "Lexus ES",
  leftBV: 84200,
  rightBV: 76800,
  contact: "+91 98400 11111",
  email: "aravind@apex.team",
  leg: "support-a",
  leaderName: "—",
};

export const currentMember: Member = {
  id: "u_member_me",
  userId: "APX-0427",
  tezId: "TEZ-90118",
  name: "Anjali Kumar",
  photo: photo("anjali"),
  rank: "Gold",
  upcomingRank: "Platinum",
  reward: "Phuket Trip",
  upcomingReward: "Dubai Summit + ₹50k",
  leftBV: 42300,
  rightBV: 31100,
  contact: "+91 99003 22221",
  email: "anjali@apex.team",
  leg: "support-a",
  leaderName: "Aravind Menon",
};

const make = (
  i: number,
  name: string,
  leg: Member["leg"],
  rank: string,
  left: number,
  right: number,
): Member => ({
  id: `u_${leg}_${i}`,
  userId: `APX-${(1000 + i).toString()}`,
  tezId: `TEZ-${(80000 + i).toString()}`,
  name,
  photo: photo(name),
  rank,
  upcomingRank: RANKS[Math.min(RANKS.indexOf(rank as any) + 1, RANKS.length - 1)],
  reward: "Goa Trip",
  upcomingReward: "Bali Retreat",
  leftBV: left,
  rightBV: right,
  contact: `+91 9${(800000000 + i * 137).toString().slice(0, 9)}`,
  email: `${name.split(" ")[0].toLowerCase()}@apex.team`,
  leg,
  leaderName: "Aravind Menon",
});

export const members: Member[] = [
  make(1, "Anjali Kumar", "support-a", "Gold", 42300, 31100),
  make(2, "Rohit Sharma", "support-a", "Silver", 18200, 9800),
  make(3, "Priya Nair", "support-a", "Platinum", 64500, 51000),
  make(4, "Vikram Iyer", "support-a", "Associate", 4200, 2100),
  make(5, "Deepa Rao", "support-b", "Gold", 38900, 27600),
  make(6, "Suresh Patil", "support-b", "Silver", 14600, 11200),
  make(7, "Megha Joshi", "support-b", "Diamond", 92400, 81100),
  make(8, "Karthik Reddy", "support-b", "Associate", 3100, 1900),
  make(9, "Lakshmi Pillai", "referrals", "Platinum", 71200, 60500),
  make(10, "Arjun Desai", "referrals", "Gold", 44100, 33800),
  make(11, "Sneha Bose", "referrals", "Silver", 16700, 10300),
  make(12, "Imran Khan", "referrals", "Diamond", 88600, 74200),
];

export const allPeople = [superAdmin, ...members];
export const findPerson = (id: string) => allPeople.find((p) => p.id === id);

export type EventItem = {
  id: string;
  title: string;
  date: string; // ISO
  location: string;
  threshold: number; // BV required
  ticket: number;
  description: string;
  banner: string;
  attendees: {
    memberId: string;
    paidTo: string;
    achievedDate: string;
    receiptUrl?: string;
  }[];
};

export const events: EventItem[] = [
  {
    id: "evt_001",
    title: "Diamond Summit — Goa",
    date: "2026-03-12",
    location: "Goa, India",
    threshold: 40000,
    ticket: 12500,
    description:
      "Three days of leadership masterclasses with the top 1% of the network. Beachfront venue, closed-door strategy rooms, founders' dinner.",
    banner:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600",
    attendees: [
      { memberId: "u_support-a_3", paidTo: "Apex Events Pvt Ltd", achievedDate: "2026-01-04" },
      { memberId: "u_support-b_7", paidTo: "Apex Events Pvt Ltd", achievedDate: "2026-01-18" },
      { memberId: "u_referrals_9", paidTo: "Apex Events Pvt Ltd", achievedDate: "2026-02-02" },
    ],
  },
  {
    id: "evt_002",
    title: "Founders' Roundtable — Bengaluru",
    date: "2026-04-22",
    location: "Taj West End, Bengaluru",
    threshold: 25000,
    ticket: 6500,
    description:
      "A working dinner with the founding leaders. Bring one question that matters most to your next 90 days.",
    banner:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600",
    attendees: [
      { memberId: "u_support-a_1", paidTo: "Apex Events Pvt Ltd", achievedDate: "2026-02-20" },
    ],
  },
  {
    id: "evt_003",
    title: "Crown Launch — Dubai",
    date: "2026-05-30",
    location: "Atlantis The Royal, Dubai",
    threshold: 60000,
    ticket: 28000,
    description:
      "Reveal of the new Crown tier rewards. Invite-only. Black tie. Speakers from across three continents.",
    banner:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600",
    attendees: [
      { memberId: "u_referrals_12", paidTo: "Apex Global FZ-LLC", achievedDate: "2026-03-15" },
    ],
  },
];

export const news = [
  {
    id: "n1",
    title: "Quarter closed at 142% of target — thank you, leaders",
    body:
      "We crossed ₹3.2 crore in business volume this quarter, the strongest in our history. Special call-out to the Referrals leg for adding 47 active members.",
    date: "2026-02-28",
    author: "Aravind Menon",
  },
  {
    id: "n2",
    title: "New rank structure live: introducing Royal Crown",
    body:
      "Royal Crown unlocks at 250k combined BV with both legs above 100k. Rewards include a fully-paid international launch trip.",
    date: "2026-02-14",
    author: "Aravind Menon",
  },
  {
    id: "n3",
    title: "Diamond Summit registrations open",
    body: "Self-nominate from the Events page. Eligibility is auto-checked against your business volume.",
    date: "2026-02-01",
    author: "Aravind Menon",
  },
];

export const updates = [
  { id: "u1", title: "Profile L/R values are now self-editable", date: "2026-02-25", body: "Members can now update their own Left and Right business value from their profile. Admin still controls rank and rewards." },
  { id: "u2", title: "Excel export added to Event attendee list", date: "2026-02-18", body: "Admin-only. One-click download of all attendees with payment metadata." },
  { id: "u3", title: "Calendar visibility scoped to top leaders", date: "2026-02-09", body: "Only Diamond and above can now view the super admin schedule." },
];

export const projects = [
  { id: "p1", title: "City expansion — Chennai", status: "In progress", owner: "Priya Nair", due: "2026-04-30" },
  { id: "p2", title: "Onboarding playbook v3", status: "Review", owner: "Aravind Menon", due: "2026-03-15" },
  { id: "p3", title: "Leader certification track", status: "Planning", owner: "Megha Joshi", due: "2026-05-20" },
];

export const documents = [
  { id: "d1", title: "Compensation plan — 2026", size: "2.4 MB", type: "PDF", date: "2026-01-12" },
  { id: "d2", title: "Leader playbook — onboarding", size: "5.1 MB", type: "PDF", date: "2025-11-30" },
  { id: "d3", title: "Rank chart with rewards", size: "780 KB", type: "PDF", date: "2026-02-20" },
  { id: "d4", title: "Training — closing conversations", size: "12 MB", type: "MP4", date: "2026-01-28" },
];

export const media = [
  { id: "m1", title: "Bali Retreat 2025", thumb: "https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?w=900", kind: "album" as const, count: 64 },
  { id: "m2", title: "Founders' Dinner", thumb: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900", kind: "album" as const, count: 28 },
  { id: "m3", title: "Crown Tier reveal — recap", thumb: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900", kind: "video" as const, count: 1 },
  { id: "m4", title: "Diamond Summit — sizzle", thumb: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=900", kind: "video" as const, count: 1 },
];

export const calendarItems = [
  { id: "c1", date: "2026-03-05", title: "Leaders' weekly sync", time: "10:00" },
  { id: "c2", date: "2026-03-12", title: "Diamond Summit — Goa (Day 1)", time: "All day" },
  { id: "c3", date: "2026-03-13", title: "Diamond Summit — Goa (Day 2)", time: "All day" },
  { id: "c4", date: "2026-03-22", title: "1-on-1 with Priya Nair", time: "16:00" },
  { id: "c5", date: "2026-04-02", title: "Onboarding playbook review", time: "11:30" },
  { id: "c6", date: "2026-04-22", title: "Founders' Roundtable — Bengaluru", time: "19:00" },
];