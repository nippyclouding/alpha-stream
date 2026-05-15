export interface Stock {
  id: string;
  name: string;
  symbol: string;
  currentPrice: number;
  prevClose: number;
  high: number;
  low: number;
  open: number;
  volume: number;
  transactionAmount: number;
  changeRate: number;
  changeValue: number;
  registrationDate: string;
}

export interface Trade {
  id: string;
  stockId: string;
  price: number;
  volume: number;
  time: string;
  type: 'buy' | 'sell';
}

export interface Hoga {
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  stockId: string;
  type: 'buy' | 'sell';
  orderType: 'limit' | 'market';
  price: number;
  quantity: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}
