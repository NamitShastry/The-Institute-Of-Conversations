export interface NavigationItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  subtagline: string;
  contactEmail: string;
  location: string;
  footerNote: string;
  navigation: NavigationItem[];
  socials: Record<string, string>;
}

export interface DirectorData {
  name: string;
  designation: string;
  photo: string;
  focus?: string;
  message: string[];
  signature: string;
  signatureTitle: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  designation: string;
  year?: string;
  photo: string;
  bio?: string;
  rank?: number;
  mentoredTeamIds?: string[];
  social?: string;
}

export interface TeamGroup {
  id: string;
  name: string;
  description: string;
  lead: TeamMember;
  members: TeamMember[];
}

export interface TeamData {
  title: string;
  subtitle: string;
  description: string;
  leadership: TeamMember[];
  mentors: TeamMember[];
  executives: TeamMember[];
  teams: TeamGroup[];
}

export interface SponsorItem {
  id: string;
  tier: string;
  name: string;
  logo: string;
  tag: string;
  url: string;
  revealed: boolean;
}

export interface SponsorTier {
  id: string;
  name: string;
  slotCount: number;
  size: 'grand' | 'prominent' | 'standard';
  items: SponsorItem[];
}

export interface SponsorsData {
  title: string;
  subtitle: string;
  description: string;
  tiers: SponsorTier[];
}

export interface GuestItem {
  id: string;
  name: string;
  designation: string;
  organisation: string;
  photo: string;
  tag: string;
  revealed: boolean;
}

export interface GuestsData {
  title: string;
  subtitle: string;
  marquee: string;
  description: string;
  filterCategories: string[];
  items: GuestItem[];
}

export interface GalleryAlbum {
  id: string;
  name: string;
}

export interface GalleryItem {
  id: string;
  albumId: string;
  title: string;
  caption: string;
  image: string;
  date?: string;
}

export interface GalleryData {
  title: string;
  subtitle: string;
  emptyStateMessage: string;
  emptyStateDescription: string;
  albums: GalleryAlbum[];
  items: GalleryItem[];
}

export interface EventFormat {
  season: string;
  duration: string;
  participants: string;
  setting: string;
  output: string;
}

export interface EventStep {
  step: string;
  title: string;
  detail: string;
}

export interface EventItem {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  season: string;
  seasonMonth: string;
  hook: string;
  whatHappens: string[];
  howItWorks: EventStep[];
  whoCanTakePart: string;
  walkAwayWith: string;
  clubOutput: string;
  format: EventFormat;
  icon: string;
}

export interface EventsData {
  title: string;
  eyebrow: string;
  subtitle: string;
  description: string;
  events: EventItem[];
}

export interface AboutData {
  eyebrow: string;
  headline: string;
  body: string[];
  quote: string;
  quoteHighlight: string;
}
