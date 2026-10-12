export type NavigationTab = 
  | 'home' 
  | 'solutions' 
  | 'intelligence' 
  | 'rate-intelligence'
  | 'comparison'
  | 'parity'
  | 'tools' 
  | 'events' 
  | 'benchmark' 
  | 'resources' 
  | 'about' 
  | 'contact';

export interface MarketMetric {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  benchmark: string;
  description: string;
}

export interface ChannelRates {
  directWeb: number;
  bookingCom: number;
  expedia: number;
  agoda: number;
  tripCom: number;
}

export interface HotelRateItem {
  id: string;
  name: string;
  location: string;
  cityArea: string;
  stars: number;
  roomCount?: number;
  tonightRateUSD: number;
  tomorrowRateUSD: number;
  weekendRateUSD: number;
  sevenDayTrend: number[]; // 7 days of historical/forecast rates
  priceChangePercent: number;
  recommendation: 'Low Rate' | 'Normal Rate' | 'High Demand Rate';
  otaRateParity: 'In Parity' | 'OTA Undercut' | 'Direct Cheaper';
  bestChannel: string;
  channelRates?: ChannelRates;
  reviewScore?: number;
  tripAdvisorRank?: string;
  amenities?: string[];
}

export interface EventItem {
  id: string;
  name: string;
  organization: string;
  dates: string;
  venue: string;
  attendeesEstimate: string;
  demandImpact: 'Low' | 'Medium' | 'High';
  recommendedStrategy: {
    adrAction: string;
    restriction: string;
    inventoryPacing: string;
  };
}

export interface CurrencyRates {
  USD: number;
  ETB: number;
  EUR: number;
  GBP: number;
  AED: number;
  SAR: number;
}

export interface ResourceItem {
  id: string;
  title: string;
  category: 'Revenue Management' | 'Distribution' | 'Marketing' | 'Technology' | 'Market Reports' | 'Hospitality Trends';
  readTime: string;
  format: 'PDF Guide' | 'Excel Template' | 'Worksheet' | 'Whitepaper';
  description: string;
  downloadUrl?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
