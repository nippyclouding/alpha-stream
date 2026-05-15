import React, { useState, useEffect } from 'react';
import { formatNumber, cn } from '../utils';

interface TradeItem {
  id: string;
  changeRate: number;
  price: number;
  volume: number;
  time: string;
  totalVolume: number;
}

const INITIAL_TRADES: TradeItem[] = [
  { id: '1', changeRate: 0.84, price: 9500, volume: 1500, time: '14:20:05', totalVolume: 125000 },
  { id: '2', changeRate: 0.82, price: 9480, volume: 210, time: '14:20:01', totalVolume: 123500 },
  { id: '3', changeRate: 0.81, price: 9470, volume: 50, time: '14:19:55', totalVolume: 123290 },
  { id: '4', changeRate: 0.84, price: 9500, volume: 12000, time: '14:19:48', totalVolume: 123240 },
  { id: '5', changeRate: 0.85, price: 9510, volume: 800, time: '14:19:40', totalVolume: 111240 },
];

export default function ExecutionHistory() {
  const [trades, setTrades] = useState<TradeItem[]>(INITIAL_TRADES);

  useEffect(() => {
    const interval = setInterval(() => {
      const lastTrade = trades[0];
      const newPrice = lastTrade.price + (Math.random() - 0.5) * 40;
      const volume = Math.floor(Math.random() * 2000) + 100;
      const newTrade: TradeItem = {
        id: Math.random().toString(),
        price: Math.round(newPrice),
        volume: volume,
        changeRate: lastTrade.changeRate + (Math.random() - 0.5) * 0.1,
        time: new Date().toLocaleTimeString('ko-KR', { hour12: false }),
        totalVolume: lastTrade.totalVolume + volume,
      };
      setTrades(prev => [newTrade, ...prev.slice(0, 20)]);
    }, 4000);
    return () => clearInterval(interval);
  }, [trades]);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-gray-900">당일 체결 목록</h3>
        <span className="text-[10px] font-bold text-gray-300">실시간</span>
      </div>
      
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <table className="w-full text-left">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter border-b border-gray-50">
              <th className="pb-2 font-black">체결가</th>
              <th className="pb-2 text-right font-black">체결량(주)</th>
              <th className="pb-2 text-right font-black">등락률</th>
              <th className="pb-2 text-right font-black">당일 총 거래량(주)</th>
              <th className="pb-2 text-right font-black">시간</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {trades.map((trade) => (
              <tr key={trade.id} className="group hover:bg-gray-50/50 transition-colors animate-in fade-in slide-in-from-top-1">
                <td className={cn(
                  "py-2.5 text-xs font-bold",
                  trade.changeRate >= 0 ? "text-up" : "text-down"
                )}>
                  {formatNumber(trade.price)}
                </td>
                <td className="py-2.5 text-xs text-right font-bold text-gray-600">
                  {formatNumber(trade.volume)}
                </td>
                <td className={cn(
                  "py-2.5 text-[10px] text-right font-bold",
                  trade.changeRate >= 0 ? "text-up" : "text-down"
                )}>
                  {trade.changeRate >= 0 ? '+' : ''}{trade.changeRate.toFixed(2)}%
                </td>
                <td className="py-2.5 text-xs text-right font-medium text-gray-400">
                  {formatNumber(trade.totalVolume)}
                </td>
                <td className="py-2.5 text-[10px] text-right font-bold text-gray-400">
                  {trade.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
