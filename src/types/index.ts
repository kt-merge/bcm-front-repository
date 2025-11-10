// User & Auth Types
export interface User {
  id: string;
  email: string;
  name: string;
  [key: string]: unknown;
}

export interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

// Bid Types
export interface Bid {
  bidder: string;
  amount: number;
  time: string;
}

// Product Types
export interface Product {
  id: number;
  title: string;
  image: string;
  description?: string;
  currentBid: number;
  minBid?: number;
  bids: number;
  timeLeft: string;
  status: string;
  seller?: string;
  condition?: string;
  category?: string;
  bidHistory?: Bid[];
}
