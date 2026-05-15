import React, { createContext, useContext, useState, useEffect } from 'react';
import { Stock, Order, Trade } from './types';
import { INITIAL_STOCKS } from './constants';
import { isMarketOpen } from './utils';

interface AppContextType {
  stocks: Stock[];
  orders: Order[];
  trades: Trade[];
  isLoggedIn: boolean;
  currentUser: { name: string; email: string; balance: number } | null;
  login: (userData: { name: string; email: string }) => void;
  logout: () => void;
  placeOrder: (order: Omit<Order, 'id' | 'status' | 'createdAt'>) => void;
  cancelOrder: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [stocks, setStocks] = useState<Stock[]>(INITIAL_STOCKS);
  const [orders, setOrders] = useState<Order[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; balance: number } | null>(null);

  const login = (userData: { name: string; email: string }) => {
    setIsLoggedIn(true);
    setCurrentUser({ ...userData, balance: 10000000 });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const placeOrder = (orderData: Omit<Order, 'id' | 'status' | 'createdAt'>) => {
    const newOrder: Order = {
      ...orderData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const cancelOrder = (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  // Simulate real-time stock price changes
  useEffect(() => {
    if (!isMarketOpen()) return;

    const interval = setInterval(() => {
      setStocks(prevStocks =>
        prevStocks.map(stock => {
          const change = (Math.random() - 0.5) * (stock.currentPrice * 0.001);
          const newPrice = Math.round(stock.currentPrice + change);
          const changeValue = newPrice - stock.prevClose;
          const changeRate = (changeValue / stock.prevClose) * 100;
          
          return {
            ...stock,
            currentPrice: newPrice,
            changeValue,
            changeRate,
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AppContext.Provider value={{ 
      stocks, 
      orders, 
      trades: [], // Mock trades for simplicity or populate them
      isLoggedIn, 
      currentUser, 
      login, 
      logout, 
      placeOrder, 
      cancelOrder 
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
}
